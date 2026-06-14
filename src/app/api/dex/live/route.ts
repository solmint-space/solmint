import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never cache this route

export async function GET(req: NextRequest) {
  const mint = req.nextUrl.searchParams.get("mint");
  if (!mint) return NextResponse.json({ pairs: [] }, { status: 400 });

  // Try token endpoint first, then search as fallback
  const urls = [
    `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
    `https://api.dexscreener.com/latest/dex/search/?q=${mint}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const pairs: any[] = data?.pairs ?? [];
      if (pairs.length > 0) {
        return NextResponse.json(
          { pairs },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
    } catch {}
  }

  return NextResponse.json({ pairs: [] }, { headers: { "Cache-Control": "no-store" } });
}
