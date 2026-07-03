import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  AuthorityType,
} from "@solana/spl-token";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplTokenMetadata,
  createMetadataAccountV3,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import { fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { none } from "@metaplex-foundation/umi";

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

export async function createToken(
  connection: Connection,
  payer: PublicKey,
  config: TokenConfig,
  walletAdapter: {
    publicKey: PublicKey;
    signTransaction: (tx: Transaction) => Promise<Transaction>;
    signAllTransactions?: (txs: Transaction[]) => Promise<Transaction[]>;
  }
): Promise<string> {
  const mintKeypair = Keypair.generate();

  // ── Tx 1: create mint + ATA + mintTo ─────────────────────────────────────
  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, payer);

  const tx1 = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      config.decimals,
      payer,
      config.revokeFreeze ? null : payer,
      TOKEN_PROGRAM_ID
    ),
    createAssociatedTokenAccountInstruction(payer, ata, payer, mintKeypair.publicKey),
    createMintToInstruction(
      mintKeypair.publicKey,
      ata,
      payer,
      config.supply * BigInt(10 ** config.decimals)
    )
  );

  const { blockhash: bh1, lastValidBlockHeight: lv1 } = await connection.getLatestBlockhash("confirmed");
  tx1.recentBlockhash = bh1;
  tx1.feePayer = payer;
  tx1.partialSign(mintKeypair);

  const signed1 = await walletAdapter.signTransaction(tx1);
  const sig1 = await connection.sendRawTransaction(signed1.serialize(), { skipPreflight: false });
  await pollConfirm(connection, sig1);

  // ── Tx 2: create metadata via Metaplex UMI ───────────────────────────────
  const rpcUrl = (connection as any)._rpcEndpoint
    ?? (connection as any).rpcEndpoint
    ?? "https://api.mainnet-beta.solana.com";

  const umi = createUmi(rpcUrl)
    .use(walletAdapterIdentity(walletAdapter as any))
    .use(mplTokenMetadata());

  const mintPk = fromWeb3JsPublicKey(mintKeypair.publicKey);
  const [metadataPda] = findMetadataPda(umi, { mint: mintPk });

  await createMetadataAccountV3(umi, {
    metadata: metadataPda,
    mint: mintPk,
    mintAuthority: umi.identity,
    payer: umi.identity,
    updateAuthority: umi.identity,
    data: {
      name: config.name,
      symbol: config.symbol,
      uri: config.metadataUri,
      sellerFeeBasisPoints: 0,
      creators: none(),
      collection: none(),
      uses: none(),
    },
    isMutable: !config.revokeUpdate,
    collectionDetails: none(),
  }).sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });

  // ── Tx 3: revoke mint authority if requested ─────────────────────────────
  if (config.revokeMint) {
    const tx3 = new Transaction().add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey,
        payer,
        AuthorityType.MintTokens,
        null
      )
    );
    const { blockhash: bh3, lastValidBlockHeight: lv3 } = await connection.getLatestBlockhash("confirmed");
    tx3.recentBlockhash = bh3;
    tx3.feePayer = payer;
    const signed3 = await walletAdapter.signTransaction(tx3);
    const sig3 = await connection.sendRawTransaction(signed3.serialize(), { skipPreflight: false });
    await pollConfirm(connection, sig3);
  }

  return mintKeypair.publicKey.toString();
}

async function pollConfirm(connection: Connection, sig: string, timeoutMs = 90_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { value } = await connection.getSignatureStatuses([sig], { searchTransactionHistory: true });
    const s = value?.[0];
    if (s?.err) throw new Error("Transazione fallita: " + JSON.stringify(s.err));
    if (s?.confirmationStatus === "confirmed" || s?.confirmationStatus === "finalized") return;
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error(`Timeout 90s. Firma: ${sig}`);
}
