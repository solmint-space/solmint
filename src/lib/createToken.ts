import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
} from "@solana/spl-token";
import { Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplTokenMetadata,
  createV1,
  TokenStandard,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  fromWeb3JsPublicKey,
  toWeb3JsKeypair,
} from "@metaplex-foundation/umi-web3js-adapters";
import { generateSigner, percentAmount, some, none } from "@metaplex-foundation/umi";

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
  walletAdapter: { publicKey: PublicKey; signTransaction: (tx: Transaction) => Promise<Transaction>; signAllTransactions?: (txs: Transaction[]) => Promise<Transaction[]> }
): Promise<string> {
  const mintKeypair = Keypair.generate();

  // ── Step 1: create mint account via spl-token ─────────────────────────────
  // We use the signTransaction pattern since we don't have the private key
  // createMint from spl-token requires the payer to be a Signer with secretKey.
  // Instead, we build the transaction manually and sign with wallet.
  const {
    Keypair: Web3Keypair,
    SystemProgram,
    Transaction: Web3Transaction,
    SYSVAR_RENT_PUBKEY,
  } = await import("@solana/web3.js");

  const {
    createInitializeMintInstruction,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
    getAssociatedTokenAddress,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    getMinimumBalanceForRentExemptMint,
  } = await import("@solana/spl-token");

  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, payer);

  // ── Step 2: Build SPL token creation tx (createAccount + initMint + createATA + mintTo) ─
  const tokenTx = new Web3Transaction();

  tokenTx.add(
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
      config.revokeFreeze ? null : payer, // freeze authority: null if revoking
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

  // If not revoking mint, we still need to revoke it after minting (handled below)
  // If revoking freeze, it's already null in initializeMint above

  let { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  tokenTx.recentBlockhash = blockhash;
  tokenTx.feePayer = payer;
  tokenTx.partialSign(mintKeypair);

  const signedTokenTx = await walletAdapter.signTransaction(tokenTx);
  const tokenSig = await connection.sendRawTransaction(signedTokenTx.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });

  await confirmWithTimeout(connection, tokenSig, blockhash, lastValidBlockHeight, 90_000);

  // ── Step 3: Create metadata via Metaplex UMI ─────────────────────────────
  const endpoint = (connection as any)._rpcEndpoint || (connection as any).rpcEndpoint || "https://api.mainnet-beta.solana.com";
  const umi = createUmi(endpoint)
    .use(walletAdapterIdentity(walletAdapter as any))
    .use(mplTokenMetadata());

  const mintUmi = fromWeb3JsPublicKey(mintKeypair.publicKey);

  // Build and send metadata creation tx via UMI
  const metadataTxBuilder = createV1(umi, {
    mint: mintUmi,
    authority: umi.identity,
    name: config.name,
    symbol: config.symbol,
    uri: config.metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
    isMutable: !config.revokeUpdate,
    tokenStandard: TokenStandard.Fungible,
  });

  await metadataTxBuilder.sendAndConfirm(umi, {
    confirm: { commitment: "confirmed" },
    send: { skipPreflight: false },
  });

  // ── Step 4: Revoke mint authority if requested ───────────────────────────
  if (config.revokeMint) {
    const { blockhash: bh2, lastValidBlockHeight: lvbh2 } = await connection.getLatestBlockhash("confirmed");
    const revokeTx = new Web3Transaction();
    revokeTx.add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey,
        payer,
        AuthorityType.MintTokens,
        null
      )
    );
    revokeTx.recentBlockhash = bh2;
    revokeTx.feePayer = payer;
    const signedRevoke = await walletAdapter.signTransaction(revokeTx);
    const revokeSig = await connection.sendRawTransaction(signedRevoke.serialize(), {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });
    await confirmWithTimeout(connection, revokeSig, bh2, lvbh2, 60_000);
  }

  return mintKeypair.publicKey.toString();
}

async function confirmWithTimeout(
  connection: Connection,
  sig: string,
  blockhash: string,
  lastValidBlockHeight: number,
  timeoutMs: number
): Promise<void> {
  const result = await Promise.race([
    connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed"),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Timeout conferma transazione (${timeoutMs / 1000}s). Firma: ${sig}`)),
        timeoutMs
      )
    ),
  ]);
  if ((result as any)?.value?.err) {
    throw new Error("Transazione rifiutata: " + JSON.stringify((result as any).value.err));
  }
}
