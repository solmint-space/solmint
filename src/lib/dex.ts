export type DexPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  pairAddress?: string;
  baseToken?: { address?: string; name?: string; symbol?: string };
  quoteToken?: { symbol?: string };
  priceUsd?: string;
  priceNative?: string;
  txns?: {
    m5?: { buys?: number; sells?: number };
    h1?: { buys?: number; sells?: number };
    h24?: { buys?: number; sells?: number };
  };
  volume?: { h24?: number; h6?: number; h1?: number; m5?: number };
  priceChange?: { h24?: number; h6?: number; h1?: number; m5?: number };
  liquidity?: { usd?: number; base?: number; quote?: number };
  fdv?: number;
  marketCap?: number;
  info?: {
    imageUrl?: string;
    header?: string;
    openGraph?: string;
    websites?: { label?: string; url?: string }[];
    socials?: { type?: string; url?: string }[];
  };
};

function formatUsd(n?: number | null) {
  if (!n) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export function formatDexNumber(n?: number | null) {
  return formatUsd(n);
}

export async function getDexData(mint?: string | null) {
  if (!mint) {
    return {
      pair: null,
      chartUrl: "",
      stats: null,
      socials: [],
      websites: [],
      imageUrl: "",
      dexUrl: "",
    };
  }

  try {
    const res = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/solana/${mint}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) throw new Error("Dexscreener request failed");

    const pairs = (await res.json()) as DexPair[];

    const validPairs = Array.isArray(pairs) ? pairs : [];

    const bestPair =
      validPairs
        .filter((p) => p.pairAddress)
        .sort((a, b) => {
          const la = a.liquidity?.usd || 0;
          const lb = b.liquidity?.usd || 0;
          return lb - la;
        })[0] || null;

    if (!bestPair) {
      return {
        pair: null,
        chartUrl: "",
        stats: null,
        socials: [],
        websites: [],
        imageUrl: "",
        dexUrl: "",
      };
    }

    const chartUrl = `https://dexscreener.com/solana/${bestPair.pairAddress}?embed=1&theme=dark&trades=0&info=0`;

    return {
      pair: bestPair,
      chartUrl,
      dexUrl: bestPair.url || "",
      imageUrl: bestPair.info?.imageUrl || "",
      socials: bestPair.info?.socials || [],
      websites: bestPair.info?.websites || [],
      stats: {
        price: bestPair.priceUsd ? `$${bestPair.priceUsd}` : "—",
        marketCap: formatUsd(bestPair.marketCap || bestPair.fdv),
        liquidity: formatUsd(bestPair.liquidity?.usd),
        volume24h: formatUsd(bestPair.volume?.h24),
        change24h:
          typeof bestPair.priceChange?.h24 === "number"
            ? `${bestPair.priceChange.h24.toFixed(2)}%`
            : "—",
        buys24h: bestPair.txns?.h24?.buys || 0,
        sells24h: bestPair.txns?.h24?.sells || 0,
      },
    };
  } catch {
    return {
      pair: null,
      chartUrl: "",
      stats: null,
      socials: [],
      websites: [],
      imageUrl: "",
      dexUrl: "",
    };
  }
}