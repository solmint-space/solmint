import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  supply: bigint;
  metadataUri: string;
  revokeMint: boolean;
  revokeFreeze: boolean;
  revokeUpdate: boolean;
}

const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

function buildMetadataInstruction(
  metadataPDA: PublicKey,
  mint: PublicKey,
  payer: PublicKey,
  name: string,
  symbol: string,
  uri: string,
  isMutable: boolean
): TransactionInstruction {
  const nameBytes   = Buffer.from(name,   "utf8");
  const symbolBytes = Buffer.from(symbol, "utf8");
  const uriBytes    = Buffer.from(uri,    "utf8");

  // Borsh layout for CreateMetadataAccountV3 (instruction #33)
  const data = Buffer.alloc(
    1 +                        // instruction discriminator
    4 + nameBytes.length +
    4 + symbolBytes.length +
    4 + uriBytes.length +
    2 +                        // seller_fee_basis_points
    1 +                        // creators: Option::None
    1 +                        // collection: Option::None
    1 +                        // uses: Option::None
    1 +                        // is_mutable
    1                          // collection_details: Option::None
  );

  let o = 0;
  data.writeUInt8(33, o++);

  data.writeUInt32LE(nameBytes.length,   o); o += 4; nameBytes.copy(data,   o); o += nameBytes.length;
  data.writeUInt32LE(symbolBytes.length, o); o += 4; symbolBytes.copy(data, o); o += symbolBytes.length;
  data.writeUInt32LE(uriBytes.length,    o); o += 4; uriBytes.copy(data,    o); o += uriBytes.length;

  data.writeUInt16LE(0, o); o += 2; // seller_fee_basis_points = 0
  data.writeUInt8(0, o++);           // creators  = None
  data.writeUInt8(0, o++);           // collection = None
  data.writeUInt8(0, o++);           // uses       = None
  data.writeUInt8(isMutable ? 1 : 0, o++);
  data.writeUInt8(0, o++);           // collection_details = None

  return new TransactionInstruction({
    programId: METADATA_PROGRAM_ID,
    keys: [
      { pubkey: metadataPDA,            isSigner: false, isWritable: true  }, // metadata
      { pubkey: mint,                   isSigner: false, isWritable: false }, // mint
      { pubkey: payer,                  isSigner: true,  isWritable: false }, // mint_authority
      { pubkey: payer,                  isSigner: true,  isWritable: true  }, // payer
      { pubkey: payer,                  isSigner: false, isWritable: false }, // update_authority
      { pubkey: SystemProgram.programId,isSigner: false, isWritable: false }, // system_program
      { pubkey: SYSVAR_RENT_PUBKEY,     isSigner: false, isWritable: false }, // rent
    ],
    data,
  });
}

export async function createToken(
  connection: Connection,
  payer: PublicKey,
  config: TokenConfig,
  walletAdapter: {
    publicKey: PublicKey;
    signTransaction: (tx: Transaction) => Promise<Transaction>;
  }
): Promise<string> {
  const mintKeypair = Keypair.generate();
  const lamports    = await getMinimumBalanceForRentExemptMint(connection);
  const ata         = await getAssociatedTokenAddress(mintKeypair.publicKey, payer);

  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), METADATA_PROGRAM_ID.toBuffer(), mintKeypair.publicKey.toBuffer()],
    METADATA_PROGRAM_ID
  );

  const tx = new Transaction();

  // 1. Create mint account
  tx.add(SystemProgram.createAccount({
    fromPubkey: payer,
    newAccountPubkey: mintKeypair.publicKey,
    space: MINT_SIZE,
    lamports,
    programId: TOKEN_PROGRAM_ID,
  }));

  // 2. Initialize mint (freeze authority = null if revoking, payer otherwise)
  tx.add(createInitializeMintInstruction(
    mintKeypair.publicKey,
    config.decimals,
    payer,
    config.revokeFreeze ? null : payer,
    TOKEN_PROGRAM_ID
  ));

  // 3. Create ATA
  tx.add(createAssociatedTokenAccountInstruction(payer, ata, payer, mintKeypair.publicKey));

  // 4. Mint supply to ATA
  tx.add(createMintToInstruction(
    mintKeypair.publicKey,
    ata,
    payer,
    config.supply * BigInt(10 ** config.decimals)
  ));

  // 5. Create Metaplex metadata (Borsh-encoded, no UMI)
  tx.add(buildMetadataInstruction(
    metadataPDA,
    mintKeypair.publicKey,
    payer,
    config.name,
    config.symbol,
    config.metadataUri,
    !config.revokeUpdate   // isMutable = false when revokeUpdate = true
  ));

  // 6. Revoke mint authority (if requested) — must happen AFTER mintTo
  if (config.revokeMint) {
    tx.add(createSetAuthorityInstruction(
      mintKeypair.publicKey,
      payer,
      AuthorityType.MintTokens,
      null
    ));
  }

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  tx.feePayer        = payer;
  tx.partialSign(mintKeypair); // mint keypair signs for createAccount

  const signed = await walletAdapter.signTransaction(tx);
  const sig    = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });

  await pollConfirm(connection, sig);

  return mintKeypair.publicKey.toString();
}

// Polling instead of confirmTransaction avoids "block height exceeded" false errors
async function pollConfirm(connection: Connection, sig: string, timeoutMs = 90_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { value } = await connection.getSignatureStatuses([sig], { searchTransactionHistory: true });
    const s = value?.[0];
    if (s?.err) throw new Error("Transazione fallita: " + JSON.stringify(s.err));
    if (s?.confirmationStatus === "confirmed" || s?.confirmationStatus === "finalized") return;
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error(`Timeout 90s. Solscan: https://solscan.io/tx/${sig}`);
}
