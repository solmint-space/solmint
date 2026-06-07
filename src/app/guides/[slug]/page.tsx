import type { Metadata } from "next";
import PremiumBackground from "@/components/PremiumBackground";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import GuidePageClient from "@/components/guide/GuidePageClient";
import { GUIDES } from "@/data/guides";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function getGuide(slug: string) {
  return GUIDES.find((g) => g.id === slug);
}

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guida non trovata — SolMint Space" };
  return {
    title: `${guide.title} — SolMint Space`,
    description: guide.desc,
    alternates: { canonical: `/guides/${guide.id}` },
    openGraph: {
      title: `${guide.title} — SolMint Space`,
      description: guide.desc,
      url: `https://solmint.space/guides/${guide.id}`,
      siteName: "SolMint Space",
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: guide.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} — SolMint Space`,
      description: guide.desc,
      images: ["/og.svg"],
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = GUIDES.filter((g) => g.id !== guide.id && g.category === guide.category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.desc,
    author: { "@type": "Organization", name: "SolMint" },
    publisher: { "@type": "Organization", name: "SolMint" },
    mainEntityOfPage: `https://solmint.space/guides/${guide.id}`,
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ minHeight: "100vh", background: "#07070f", color: "white" }}>
        <PremiumBackground />
        <SiteNavbar />
        <GuidePageClient guide={guide} related={related} />
        <SiteFooter />
      </main>
    </>
  );
}
