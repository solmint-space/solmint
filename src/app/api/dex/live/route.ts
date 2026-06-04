import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mint = req.nextUrl.searchParams.get("mint");
  if (!mint) return NextResponse.json({ error: "missing mint" }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
      { next: { revalidate: 20 } }
    );
    if (!res.ok) return NextResponse.json({ pairs: [] });
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=20" },
    });
  } catch {
    return NextResponse.json({ pairs: [] });
  }
}
