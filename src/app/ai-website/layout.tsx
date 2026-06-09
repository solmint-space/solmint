import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Token Website Generator — Solana Landing Page Creator",
  description:
    "Generate a professional landing page for your Solana token with AI. Custom design, tokenomics, roadmap and social links — ready to share in seconds.",
  alternates: {
    canonical: "https://solmint.space/ai-website",
  },
  openGraph: {
    title: "AI Token Website Generator — Solana Landing Page Creator",
    description:
      "Generate a professional landing page for your Solana token with AI. Custom design, tokenomics, roadmap and social links — ready to share in seconds.",
    url: "https://solmint.space/ai-website",
    siteName: "SolMint Space",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "AI Token Website Generator" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Token Website Generator — Solana Landing Page Creator",
    description: "Generate a professional landing page for your Solana token with AI.",
    images: ["/og.svg"],
  },
};

export default function AiWebsiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
