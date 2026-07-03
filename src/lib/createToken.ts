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

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

function createMetadataInstruction(
  metadataPDA: PublicKey,
  mint: PublicKey,
  payer: PublicKey,
  name: string,
  symbol: string,
  uri: string,
  isMutable: boolean
): TransactionInstruction {
  const nameBytes = Buffer.from(name, "utf8");
  const symbolBytes = Buffer.from(symbol, "utf8");
  const uriBytes = Buffer.from(uri, "utf8");

  // Pre-calculate exact size to avoid any buffer issues
  const dataSize =
    1 +          // instruction discriminator
    4 + nameBytes.length +
    4 + symbolBytes.length +
    4 + uriBytes.length +
    2 +          // seller_fee_basis_points
    1 +          // creators: Option::None
    1 +          // collection: Option::None
    1 +          // uses: Option::None
    1 +          // is_mutable
    1;           // collection_details: Option::None

  const data = Buffer.alloc(dataSize);
  let offset = 0;

  // CreateMetadataAccountV3 discriminator
  data.writeUInt8(33, offset++);

  data.writeUInt32LE(nameBytes.length, offset); offset += 4;
  nameBytes.copy(data, offset); offset += nameBytes.length;

  data.writeUInt32LE(symbolBytes.length, offset); offset += 4;
  symbolBytes.copy(data, offset); offset += symbolBytes.length;

  data.writeUInt32LE(uriBytes.length, offset); offset += 4;
  uriBytes.copy(data, offset); offset += uriBytes.length;

  data.writeUInt16LE(0, offset); offset += 2; // seller_fee_basis_points
  data.writeUInt8(0, offset++);               // creators: None
  data.writeUInt8(0, offset++);               // collection: None
  data.writeUInt8(0, offset++);               // uses: None
  data.writeUInt8(isMutable ? 1 : 0, offset++);
  data.writeUInt8(0, offset++);               // collection_details: None

  return new TransactionInstruction({
    programId: METADATA_PROGRAM_ID,
    keys: [
      // Accounts order matches CreateMetadataAccountV3 on-chain program
      { pubkey: metadataPDA,               isSigner: false, isWritable: true  }, // metadata
      { pubkey: mint,                       isSigner: false, isWritable: false }, // mint
      { pubkey: payer,                      isSigner: true,  isWritable: false }, // mint_authority
      { pubkey: payer,                      isSigner: true,  isWritable: true  }, // payer
      { pubkey: payer,                      isSigner: false, isWritable: false }, // update_authority (not a separate signer)
      { pubkey: SystemProgram.programId,    isSigner: false, isWritable: false }, // system_program
      { pubkey: SYSVAR_RENT_PUBKEY,         isSigner: false, isWritable: false }, // rent
    ],
    data,
  });
}

export async function createToken(
  connection: Connection,
  payer: PublicKey,
  config: TokenConfig,
  signTransaction: (tx: Transaction) => Promise<Transaction>
): Promise<string> {
  const mintKeypair = Keypair.generate();
  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, payer);

  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mintKeypair.publicKey.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  const tx = new Transaction();

  tx.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  tx.add(
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      config.decimals,
      payer,
      payer,
      TOKEN_PROGRAM_ID
    )
  );

  tx.add(
    createAssociatedTokenAccountInstruction(
      payer, ata, payer, mintKeypair.publicKey
    )
  );

  tx.add(
    createMintToInstruction(
      mintKeypair.publicKey,
      ata,
      payer,
      config.supply * BigInt(10 ** config.decimals)
    )
  );

  tx.add(
    createMetadataInstruction(
      metadataPDA,
      mintKeypair.publicKey,
      payer,
      config.name,
      config.symbol,
      config.metadataUri,
      !config.revokeUpdate
    )
  );

  if (config.revokeFreeze) {
    tx.add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey, payer, AuthorityType.FreezeAccount, null
      )
    );
  }

  if (config.revokeMint) {
    tx.add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey, payer, AuthorityType.MintTokens, null
      )
    );
  }

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  tx.feePayer = payer;
  tx.partialSign(mintKeypair);

  const signed = await signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });

  // confirmTransaction with 90s timeout — avoids hanging forever if RPC is slow
  const confirmResult = await Promise.race([
    connection.confirmTransaction(
      { signature: sig, blockhash, lastValidBlockHeight },
      "confirmed"
    ),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout conferma transazione (90s). Controlla Solscan con la firma: " + sig)), 90_000)
    ),
  ]);

  if ((confirmResult as any)?.value?.err) {
    throw new Error("Transazione rifiutata dalla chain: " + JSON.stringify((confirmResult as any).value.err));
  }

  return mintKeypair.publicKey.toString();
}