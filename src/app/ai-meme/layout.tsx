import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Memecoin Idea Generator — Solana Token Ideas",
  description:
    "Generate viral Solana memecoin ideas with AI. Based on live trending tokens, get name, symbol, description and logo ready to launch in minutes.",
  alternates: {
    canonical: "https://solmint.space/ai-meme",
  },
  openGraph: {
    title: "AI Memecoin Idea Generator — Solana Token Ideas",
    description:
      "Generate viral Solana memecoin ideas with AI. Based on live trending tokens, get name, symbol, description and logo ready to launch in minutes.",
    url: "https://solmint.space/ai-meme",
    siteName: "SolMint Space",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "AI Memecoin Generator" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Memecoin Idea Generator — Solana Token Ideas",
    description: "Generate viral Solana memecoin ideas with AI on SolMint Space.",
    images: ["/og.svg"],
  },
};

export default function AiMemeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
