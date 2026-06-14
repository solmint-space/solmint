import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

export async function GET(req: NextRequest) {
  const mint = req.nextUrl.searchParams.get("mint");
  if (!mint) return NextResponse.json({ result: [] }, { status: 400 });

  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [mint, { limit: 12, commitment: "confirmed" }],
      }),
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ result: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}
