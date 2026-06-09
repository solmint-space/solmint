import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Server-side cache (best-effort on Vercel — stateless between cold starts)
let cacheData: any = null;
let cacheTime = 0;
const CACHE_MS = 5000;

// Search terms rotati ad ogni request per varietà
const SEARCH_POOLS = [
  ["pump", "sol", "meme"],
  ["cat", "dog", "pepe"],
  ["moon", "elon", "ai"],
  ["degen", "ape", "based"],
  ["solana", "coin", "token"],
];
let searchRotation = 0;

export async function GET() {
  if (cacheData && Date.now() - cacheTime < CACHE_MS) {
    return NextResponse.json(cacheData);
  }

  try {
    const terms = SEARCH_POOLS[searchRotation % SEARCH_POOLS.length];
    searchRotation++;

    // Fetch TUTTI in parallelo: boosts + profiles + new pairs + search terms
    const fetches = [
      fetch("https://api.dexscreener.com/token-boosts/latest/v1",   { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/token-boosts/top/v1",      { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/token-profiles/latest/v1", { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/latest/dex/pairs/solana",  { headers: { Accept: "application/json" }, cache: "no-store" }),
      ...terms.map(q =>
        fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(q)}`, { headers: { Accept: "application/json" }, cache: "no-store" })
      ),
    ];

    const results = await Promise.allSettled(fetches);

    const boostsLatest = results[0].status === "fulfilled" && results[0].value.ok ? await results[0].value.json() : [];
    const boostsTop    = results[1].status === "fulfilled" && results[1].value.ok ? await results[1].value.json() : [];
    const profiles     = results[2].status === "fulfilled" && results[2].value.ok ? await results[2].value.json() : [];

    // Latest pairs from Solana (for "New" tab)
    let latestPairsData: any = {};
    if (results[3].status === "fulfilled" && results[3].value.ok) {
      latestPairsData = await results[3].value.json();
    }
    const latestPairs: any[] = (latestPairsData.pairs || []).filter((p: any) => p.chainId === "solana").slice(0, 30);

    // Raccoglie tutti i pairs dalle ricerche
    let searchPairs: any[] = [...latestPairs];
    for (let i = 4; i < results.length; i++) {
      const r = results[i];
      if (r.status === "fulfilled" && r.value.ok) {
        const d = await r.value.json();
        const sp = (d.pairs || []).filter((p: any) => p.chainId === "solana");
        searchPairs = [...searchPairs, ...sp];
      }
    }

    // Token dai boosts/profiles (hanno tokenAddress)
    const rawTokens = [
      ...(Array.isArray(boostsLatest) ? boostsLatest : []),
      ...(Array.isArray(boostsTop)    ? boostsTop    : []),
      ...(Array.isArray(profiles)     ? profiles     : []),
    ].filter((t: any) => t.chainId === "solana" && t.tokenAddress);

    // Deduplication per address
    const seen = new Set<string>();
    const uniqueTokens: any[] = [];
    for (const t of rawTokens) {
      if (!seen.has(t.tokenAddress)) { seen.add(t.tokenAddress); uniqueTokens.push(t); }
    }

    // Aggiungi token dalle ricerche che non sono già nella lista
    for (const p of searchPairs) {
      const addr = p.baseToken?.address;
      if (!addr || seen.has(addr)) continue;
      seen.add(addr);
      uniqueTokens.push({
        tokenAddress: addr,
        chainId: "solana",
        icon: p.info?.imageUrl || null,
        description: p.info?.description || "",
        links: p.info?.socials || [],
        _directPair: p, // già abbiamo il pair
      });
    }

    const tokenAddresses = uniqueTokens.map((t: any) => t.tokenAddress).slice(0, 60);

    // Batch market data in parallelo
    const batchSize = 30;
    const batchFetches = [];
    for (let i = 0; i < tokenAddresses.length; i += batchSize) {
      const batch = tokenAddresses.slice(i, i + batchSize);
      batchFetches.push(
        fetch(`https://api.dexscreener.com/tokens/v1/solana/${batch.join(",")}`, {
          headers: { Accept: "application/json" }, cache: "no-store",
        })
      );
    }
    const batchResults = await Promise.allSettled(batchFetches);

    let pairs: any[] = [...searchPairs]; // search pairs già li abbiamo
    for (const r of batchResults) {
      if (r.status === "fulfilled" && r.value.ok) {
        const d = await r.value.json();
        if (Array.isArray(d)) pairs = [...pairs, ...d];
      }
    }

    // Mappa: per ogni token address → miglior pair (massimo volume)
    const tokenMap = new Map<string, any>();
    for (const pair of pairs) {
      const addr = pair.baseToken?.address;
      if (!addr) continue;
      const old = tokenMap.get(addr);
      if (!old || (pair.volume?.h24 || 0) > (old.volume?.h24 || 0)) tokenMap.set(addr, pair);
    }

    const BAD = ["nazi", "hitler", "nigger", "porn", "sex", "rape", "kill", "terror", "isis", "kkk"];

    const enriched = uniqueTokens
      .map((t: any) => {
        const pair = t._directPair ? (tokenMap.get(t.tokenAddress) || t._directPair) : tokenMap.get(t.tokenAddress);
        return {
          address: t.tokenAddress,
          name: pair?.baseToken?.name || t.description?.split(" ").slice(0, 3).join(" ") || "Unknown",
          symbol: pair?.baseToken?.symbol || "???",
          icon: t.icon || t.imageUrl || pair?.info?.imageUrl || `https://dd.dexscreener.com/ds-data/tokens/solana/${t.tokenAddress}.png`,
          description: t.description || pair?.info?.description || "",
          links: t.links || pair?.info?.socials || [],
          marketCap: pair?.marketCap || pair?.fdv || 0,
          price: pair?.priceUsd || "0",
          priceChange24h: pair?.priceChange?.h24 || 0,
          volume24h: pair?.volume?.h24 || 0,
          liquidity: pair?.liquidity?.usd || 0,
          age: pair?.pairCreatedAt || null,
          dexUrl: pair?.url || `https://dexscreener.com/solana/${t.tokenAddress}`,
          chainId: "solana",
        };
      })
      .filter((t: any) => {
        if (!t.marketCap && !t.volume24h) return false;
        const check = (t.name + " " + t.symbol + " " + t.description).toLowerCase();
        return !BAD.some(w => check.includes(w));
      })
      .sort((a: any, b: any) => b.volume24h - a.volume24h)
      .slice(0, 60);

    const result = { tokens: enriched, updatedAt: Date.now(), total: enriched.length };
    cacheData = result;
    cacheTime = Date.now();
    return NextResponse.json(result);
  } catch (e: any) {
    console.error("Trending API error:", e?.message);
    if (cacheData) return NextResponse.json(cacheData);
    return NextResponse.json({ tokens: [], updatedAt: Date.now(), total: 0 });
  }
}
