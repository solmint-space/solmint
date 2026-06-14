import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSiteAI } from "@/lib/aiText";
import { generateSiteImages } from "@/lib/aiImages";

export const maxDuration = 120;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function fetchDexData(mint: string) {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const pair = data?.pairs?.[0];
    if (!pair) return null;

    const fmt = (n?: number) =>
      n == null ? undefined : n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K` : `$${n.toFixed(2)}`;

    return {
      price: pair.priceUsd ? `$${parseFloat(pair.priceUsd).toFixed(8)}` : undefined,
      priceChange24h: pair.priceChange?.h24,
      volume24h: fmt(pair.volume?.h24),
      marketCap: fmt(pair.fdv),
      liquidity: fmt(pair.liquidity?.usd),
      holders: undefined as string | undefined,
      twitter: pair.info?.socials?.find((s: any) => s.type === "twitter")?.url,
      telegram: pair.info?.socials?.find((s: any) => s.type === "telegram")?.url,
      website: pair.info?.websites?.[0]?.url,
      discord: pair.info?.socials?.find((s: any) => s.type === "discord")?.url,
      tokenName: pair.baseToken?.name,
      symbol: pair.baseToken?.symbol,
      imageUrl: pair.info?.imageUrl,
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let tokenName = body.tokenName || "Token";
    let symbol = body.symbol || "TOKEN";
    const mint = body.mint || "";
    let description = body.description || "A Solana memecoin.";
    const logoUrl = body.logoUrl || "";
    const extraImages: string[] = body.extraImages || []; // user-uploaded non-logo images
    const inputTheme = body.theme || {};

    let dexData: Awaited<ReturnType<typeof fetchDexData>> = null;
    let dexSocials: Record<string, string> = {};

    if (mint) {
      dexData = await fetchDexData(mint);
      if (dexData) {
        if (dexData.tokenName) tokenName = dexData.tokenName;
        if (dexData.symbol) symbol = dexData.symbol;
        if (dexData.twitter) dexSocials.twitter = dexData.twitter;
        if (dexData.telegram) dexSocials.telegram = dexData.telegram;
        if (dexData.website) dexSocials.website = dexData.website;
        if (dexData.discord) dexSocials.discord = dexData.discord;
      }
    }

    const slug = slugify(tokenName);

    const aiContent = await generateSiteAI({
      tokenName,
      symbol,
      description,
      dexData: dexData ?? undefined,
    });

    // Use user-uploaded extra images as hero/community overrides; only call HF for missing slots
    const userHero = extraImages[0] || "";
    const userCommunity = extraImages[1] || "";

    let images: { hero: string; community: string };
    if (userHero && userCommunity) {
      // User provided both — skip HF entirely (faster generation)
      images = { hero: userHero, community: userCommunity };
    } else {
      const generated = await generateSiteImages({
        tokenName,
        symbol,
        description,
        vibe: aiContent?.vibe,
        heroPrompt: aiContent?.imagePrompts?.hero,
        communityPrompt: aiContent?.imagePrompts?.community,
      });
      images = {
        hero: userHero || generated.hero,
        community: userCommunity || generated.community,
      };
    }

    const finalLogoUrl = logoUrl || dexData?.imageUrl || "";

    const theme = {
      background:
        aiContent?.palette?.background ||
        inputTheme?.bg ||
        "radial-gradient(circle at 25% -10%, rgba(153,69,255,.42), transparent 35%), radial-gradient(circle at 82% 12%, rgba(20,241,149,.22), transparent 34%), linear-gradient(135deg, #060611, #12051f)",
      primary: aiContent?.palette?.primary || inputTheme?.accent || "#14F195",
      secondary: aiContent?.palette?.secondary || inputTheme?.second || "#9945FF",
      accent: aiContent?.palette?.accent || "#FF4ECD",
      emoji: inputTheme?.emoji || "🚀",
      label: inputTheme?.label || aiContent?.vibe || "AI Meme",
    };

    const { error } = await supabase.from("generated_sites").upsert(
      {
        slug,
        token_name: tokenName,
        symbol,
        mint,
        description,
        logo_url: finalLogoUrl,
        theme,
        content: { ...aiContent, socials: dexSocials },
        images,
      },
      { onConflict: "slug" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      slug,
      url:
        process.env.NODE_ENV === "development"
          ? `/site/${slug}`
          : `https://${slug}.solmint.space`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}
