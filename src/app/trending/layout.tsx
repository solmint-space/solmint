import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solana Trending Tokens — Live Prices & Movers",
  description:
    "Track live trending Solana tokens in real time. See price changes, market caps, volume and discover the hottest SPL tokens before they pump.",
  alternates: {
    canonical: "https://solmint.space/trending",
  },
  openGraph: {
    title: "Solana Trending Tokens — Live Prices & Movers",
    description:
      "Track live trending Solana tokens in real time. See price changes, market caps, volume and discover the hottest SPL tokens before they pump.",
    url: "https://solmint.space/trending",
    siteName: "SolMint Space",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Solana Trending Tokens" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Trending Tokens — Live Prices & Movers",
    description: "Track live trending Solana tokens in real time on SolMint Space.",
    images: ["/og.svg"],
  },
};

export default function TrendingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
