import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

let lastTokens: string[] = [];
let cacheData: any = null;
let cacheTime = 0;
const CACHE_MS = 6000;

export async function GET() {
  if (cacheData && Date.now() - cacheTime < CACHE_MS) {
    return NextResponse.json(cacheData);
  }

  try {
    // Fetch tutti e 4 gli endpoint in parallelo
    const [profilesRes, boostsLatestRes, boostsTopRes, searchRes] = await Promise.allSettled([
      fetch("https://api.dexscreener.com/token-profiles/latest/v1", { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/token-boosts/latest/v1", { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/token-boosts/top/v1", { headers: { Accept: "application/json" }, cache: "no-store" }),
      fetch("https://api.dexscreener.com/latest/dex/search?q=pump", { headers: { Accept: "application/json" }, cache: "no-store" }),
    ]);

    const profiles   = profilesRes.status    === "fulfilled" && profilesRes.value.ok    ? await profilesRes.value.json()    : [];
    const boostsLatest = boostsLatestRes.status === "fulfilled" && boostsLatestRes.value.ok ? await boostsLatestRes.value.json() : [];
    const boostsTop  = boostsTopRes.status    === "fulfilled" && boostsTopRes.value.ok    ? await boostsTopRes.value.json()    : [];
    const searchData = searchRes.status       === "fulfilled" && searchRes.value.ok       ? await searchRes.value.json()       : {};

    // Combina tutti i token Solana
    const rawTokens = [
      ...(Array.isArray(boostsLatest) ? boostsLatest : []),
      ...(Array.isArray(profiles)     ? profiles     : []),
      ...(Array.isArray(boostsTop)    ? boostsTop    : []),
    ].filter((t: any) => t.chainId === "solana" && t.tokenAddress);

    // Deduplica
    const uniqueTokens = rawTokens.filter(
      (t: any, i: number, arr: any[]) =>
        arr.findIndex((x: any) => x.tokenAddress === t.tokenAddress) === i
    );

    const tokenAddresses = uniqueTokens.map((t: any) => t.tokenAddress).slice(0, 60);

    // Fetch dati di mercato — tutti i batch in parallelo
    const batchSize = 30;
    const batches: string[][] = [];
    for (let i = 0; i < tokenAddresses.length; i += batchSize) {
      batches.push(tokenAddresses.slice(i, i + batchSize));
    }

    const batchResults = await Promise.allSettled(
      batches.map(batch =>
        fetch(`https://api.dexscreener.com/tokens/v1/solana/${batch.join(",")}`, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        })
      )
    );

    let pairs: any[] = [];
    for (const result of batchResults) {
      if (result.status === "fulfilled" && result.value.ok) {
        const data = await result.value.json();
        if (Array.isArray(data)) pairs = [...pairs, ...data];
      }
    }

    // Aggiungi pair dalla search pump
    const searchPairs = ((searchData.pairs || []) as any[]).filter((p: any) => p.chainId === "solana");
    pairs = [...pairs, ...searchPairs];

    // Mappa migliore pair per ogni token
    const tokenMap = new Map<string, any>();
    pairs.forEach((pair: any) => {
      const addr = pair.baseToken?.address;
      if (!addr) return;
      const old = tokenMap.get(addr);
      if (!old || (pair.volume?.h24 || 0) > (old.volume?.h24 || 0)) {
        tokenMap.set(addr, pair);
      }
    });

    // Arricchisci anche con token dai pairs non presenti nella lista originale
    pairs.forEach((pair: any) => {
      const addr = pair.baseToken?.address;
      if (!addr) return;
      if (!uniqueTokens.find((t: any) => t.tokenAddress === addr)) {
        uniqueTokens.push({
          tokenAddress: addr,
          chainId: "solana",
          icon: pair.info?.imageUrl || null,
          description: pair.info?.description || "",
          links: pair.info?.socials || [],
        });
      }
    });

    const previousSet = new Set(lastTokens);

    const BAD_WORDS = ["nazi", "hitler", "nigger", "porn", "sex", "rape", "kill", "terror", "isis", "kkk"];

    const enriched = uniqueTokens
      .map((t: any) => {
        const pair = tokenMap.get(t.tokenAddress);
        return {
          address: t.tokenAddress,
          name: pair?.baseToken?.name || t.description?.split(" ").slice(0, 3).join(" ") || "Unknown",
          symbol: pair?.baseToken?.symbol || "???",
          icon:
            t.icon ||
            t.imageUrl ||
            pair?.info?.imageUrl ||
            `https://dd.dexscreener.com/ds-data/tokens/solana/${t.tokenAddress}.png`,
          description: t.description || pair?.info?.description || "",
          links: t.links || pair?.info?.websites || pair?.info?.socials || [],
          marketCap: pair?.marketCap || pair?.fdv || 0,
          price: pair?.priceUsd || "0",
          priceChange24h: pair?.priceChange?.h24 || 0,
          volume24h: pair?.volume?.h24 || 0,
          liquidity: pair?.liquidity?.usd || 0,
          age: pair?.pairCreatedAt || null,
          dexUrl: pair?.url || `https://dexscreener.com/solana/${t.tokenAddress}`,
          chainId: "solana",
          isNew: lastTokens.length > 0 && !previousSet.has(t.tokenAddress),
        };
      })
      .filter((t: any) => {
        if (!t.marketCap && !t.volume24h) return false;
        const nameCheck = (t.name + " " + t.symbol + " " + t.description).toLowerCase();
        return !BAD_WORDS.some(w => nameCheck.includes(w));
      })
      .sort((a: any, b: any) => {
        if (b.isNew !== a.isNew) return Number(b.isNew) - Number(a.isNew);
        return b.volume24h - a.volume24h;
      })
      .slice(0, 60);

    lastTokens = enriched.map((t: any) => t.address);

    const result = { tokens: enriched, updatedAt: Date.now(), total: enriched.length };
    cacheData = result;
    cacheTime = Date.now();
    return NextResponse.json(result);
  } catch (e: any) {
    console.error("Trending API error:", e?.message || e);
    if (cacheData) return NextResponse.json(cacheData);
    return NextResponse.json({ tokens: [], updatedAt: Date.now(), total: 0 });
  }
}
