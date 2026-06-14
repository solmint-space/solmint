type SiteAIInput = {
  tokenName: string;
  symbol: string;
  description: string;
  dexData?: {
    price?: string;
    priceChange24h?: number;
    volume24h?: string;
    marketCap?: string;
    liquidity?: string;
    holders?: string;
    twitter?: string;
    telegram?: string;
    website?: string;
    discord?: string;
  };
};

const geminiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter(Boolean) as string[];

const groqKeys = [
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
].filter(Boolean) as string[];

export async function generateSiteAI(input: SiteAIInput) {
  const hasDex = !!input.dexData;
  const dexContext = hasDex
    ? `\n\n🔴 LIVE DEXSCREENER DATA (use these EXACT real numbers in the website):\n- Price: ${input.dexData!.price || "TBA"}\n- 24h Change: ${input.dexData!.priceChange24h != null ? input.dexData!.priceChange24h + "%" : "N/A"}\n- 24h Volume: ${input.dexData!.volume24h || "N/A"}\n- Market Cap / FDV: ${input.dexData!.marketCap || "N/A"}\n- Liquidity: ${input.dexData!.liquidity || "N/A"}\n- Twitter: ${input.dexData!.twitter || "N/A"}\n- Telegram: ${input.dexData!.telegram || "N/A"}\n- Website: ${input.dexData!.website || "N/A"}`
    : "\n\n⚠️ No DexScreener data available. Create engaging placeholder stats.";

  const prompt = `You are the world's best viral memecoin website copywriter. Generate a UNIQUE, CREATIVE website for this specific Solana token. Every field must be tailored to THIS token — no generic text.

Token Name: ${input.tokenName}
Symbol: $${input.symbol}
Description: ${input.description}${dexContext}

CRITICAL RULES:
- HERO TITLE: titleLine1 must be the token name or a short punchy version. titleLine2 must be a hype phrase SPECIFIC to this token's theme (NOT generic "TO THE MOON" or "GOES INFINITE" unless thematically perfect).
- ABOUT: Write real lore/story for THIS specific token. Reference the description, make it feel like a cult.
- ROADMAP: 4 phases with CREATIVE titles and texts specific to this token's meme/theme. NOT generic "Launch / Meme War / Listings / Domination".
- TOKENOMICS: Choose percentages that add up to 100%. Be creative with labels (e.g. "Dev Fund", "Staking", "Burn", etc). Vary the percentages.
- SECURITY: Always include Mint Authority (Revoked), Tax (0%), Supply (1B), LP (Locked).
- IMAGE PROMPTS: Write vivid, detailed AI art prompts specific to this token's theme and mascot.
- COLOR PALETTE: Choose colors that fit the token's vibe (not always green/purple).

Return ONLY valid JSON (no markdown, no explanation):
{
  "vibe": "one of: cyber | meme | degen | cosmic | cute | retro | premium",
  "palette": {
    "primary": "#hexcolor matching the token vibe",
    "secondary": "#hexcolor complementary",
    "accent": "#hexcolor for highlights",
    "background": "CSS radial/linear gradient string, dark"
  },
  "hero": {
    "badge": "short badge text like LIVE ON SOLANA or PUMP ON SOLANA",
    "titleLine1": "${input.tokenName}",
    "titleLine2": "UNIQUE HYPE PHRASE FOR THIS TOKEN",
    "subtitle": "2 sentences of hype specific to this token's theme",
    "slogan": "3-5 word slogan unique to this token"
  },
  "about": {
    "title": "Creative lore section title for ${input.tokenName}",
    "text": "2-3 sentences of real lore/story specific to ${input.tokenName}, its origin and why the community is rallying around it"
  },
  "community": {
    "title": "UNIQUE COMMUNITY CTA FOR $${input.symbol}",
    "text": "2 sentences about the ${input.tokenName} community energy and why holders are here"
  },
  "tokenomics": [
    { "label": "CHOOSE A CREATIVE LABEL", "value": "XX%" },
    { "label": "CHOOSE A CREATIVE LABEL", "value": "XX%" },
    { "label": "CHOOSE A CREATIVE LABEL", "value": "XX%" },
    { "label": "CHOOSE A CREATIVE LABEL", "value": "XX%" }
  ],
  "security": [
    { "label": "Mint Authority", "value": "Revoked" },
    { "label": "Tax", "value": "0%" },
    { "label": "Supply", "value": "1B" },
    { "label": "LP", "value": "Locked" }
  ],
  "roadmap": [
    { "phase": "Phase 01", "title": "CREATIVE PHASE TITLE FOR ${input.tokenName}", "text": "2 sentences describing this phase specific to the token theme" },
    { "phase": "Phase 02", "title": "CREATIVE PHASE TITLE", "text": "2 sentences specific to this token" },
    { "phase": "Phase 03", "title": "CREATIVE PHASE TITLE", "text": "2 sentences specific to this token" },
    { "phase": "Phase 04", "title": "CREATIVE PHASE TITLE", "text": "2 sentences describing the ultimate goal" }
  ],
  "howToBuy": [
    "Get SOL from Coinbase, Binance or Kraken",
    "Download Phantom or Backpack wallet",
    "Go to Jupiter.ag and swap SOL for $${input.symbol}",
    "Welcome to the ${input.tokenName} army — hold and shill"
  ],
  "imagePrompts": {
    "hero": "Ultra-detailed cinematic digital art: ${input.tokenName} memecoin mascot, [DESCRIBE SPECIFIC VISUAL based on token theme], dramatic neon lighting, dark background, 4K hyper-realistic, no text, no watermark",
    "community": "Vibrant celebration scene: crowd of ${input.tokenName} fans, [DESCRIBE SPECIFIC VISUALS], explosive energy, confetti, rocket ships, neon glow, no text, no watermark"
  }
}`;

  for (const key of geminiKeys) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.95 },
          }),
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const json = extractJson(text);

      if (json?.hero && json?.palette) return json;
    } catch {}
  }

  for (const key of groqKeys) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.9,
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;
      const json = extractJson(text);

      if (json?.hero && json?.palette) return json;
    } catch {}
  }

  return buildFallback(input);
}

function buildFallback(input: SiteAIInput) {
  return {
    vibe: "meme",
    palette: {
      primary: "#14F195",
      secondary: "#9945FF",
      accent: "#FF4ECD",
      background: "radial-gradient(circle at 20% 0%, rgba(153,69,255,.55), transparent 36%), linear-gradient(135deg,#050509,#16051f)",
    },
    hero: {
      badge: "LIVE ON SOLANA",
      titleLine1: input.tokenName,
      titleLine2: "GOES INFINITE",
      subtitle: input.description,
      slogan: `${input.symbol} to the moon`,
    },
    about: {
      title: `The ${input.tokenName} Lore`,
      text: `${input.tokenName} is a community-driven Solana memecoin built for memes, momentum and holders. ${input.description}`,
    },
    community: {
      title: `JOIN THE ${input.symbol} ARMY`,
      text: `Memes, raids, holders and timeline energy. ${input.symbol} belongs to the community.`,
    },
    liveStats: [
      { label: "Holders", value: input.dexData?.holders || "Growing", change: "Join now" },
      { label: "Market Cap", value: input.dexData?.marketCap || "Loading", change: "Dex live" },
      { label: "24H Volume", value: input.dexData?.volume24h || "Live soon", change: "Bullish" },
      { label: "Liquidity", value: input.dexData?.liquidity || "Locked", change: "Secured" },
    ],
    liveBuys: [
      { name: "MoonWalker", amount: "2.45 SOL" },
      { name: "DegenKing", amount: "1.12 SOL" },
      { name: "SolanaMaxi", amount: "0.89 SOL" },
      { name: "DiamondHands", amount: "3.21 SOL" },
    ],
    tokenomics: [
      { label: "Liquidity", value: "60%" },
      { label: "Community", value: "20%" },
      { label: "Marketing", value: "10%" },
      { label: "Airdrops", value: "10%" },
    ],
    security: [
      { label: "Mint Authority", value: "Revoked" },
      { label: "Tax", value: "0%" },
      { label: "Supply", value: "1B" },
      { label: "LP", value: "Locked" },
    ],
    roadmap: [
      { phase: "Phase 01", title: "Launch", text: "Token goes live and the first community forms." },
      { phase: "Phase 02", title: "Meme War", text: "Raids, memes, content and viral energy." },
      { phase: "Phase 03", title: "Listings", text: "Chart visibility, community growth and partnerships." },
      { phase: "Phase 04", title: "Domination", text: "The meme spreads across Solana." },
    ],
    howToBuy: [
      "Get SOL on any exchange",
      "Install Phantom or Backpack",
      `Swap SOL for $${input.symbol} on Jupiter`,
      "Hold and join the community",
    ],
    imagePrompts: {
      hero: `cinematic digital art: ${input.tokenName} memecoin, vibrant neon, solana blockchain energy`,
      community: `epic community art: ${input.tokenName} token holders, crypto bulls, neon glowing`,
    },
  };
}

function extractJson(text?: string) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {}

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

// ─── Meme idea generation (used by /api/ai) ──────────────────────────────────

export async function generateMemeIdea(niche: string, tone: string, market: string, trending: string[]) {
  const trendContext = trending.length > 0 ? `\nCurrent trending Solana tokens: ${trending.slice(0, 8).join(", ")}` : "";

  const prompt = `You are a viral memecoin strategist. Create a complete token launch concept.

Niche: ${niche}
Tone: ${tone}
Market: ${market}${trendContext}

Return ONLY valid JSON:
{
  "name": "Token Name",
  "symbol": "TICK",
  "description": "2-3 sentence hype description",
  "imagePrompt": "detailed AI image generation prompt for the token logo",
  "why": "why this will go viral",
  "strategy": "3 key launch strategies"
}`;

  for (const key of groqKeys) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.95,
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const json = extractJson(data?.choices?.[0]?.message?.content);
      if (json?.name) return json;
    } catch {}
  }

  for (const key of geminiKeys) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const json = extractJson(data?.candidates?.[0]?.content?.parts?.[0]?.text);
      if (json?.name) return json;
    } catch {}
  }

  return null;
}

export async function recreateToken(tokenName: string, tokenDesc: string, trending: string[]) {
  const prompt = `Create a new memecoin inspired by "${tokenName}": ${tokenDesc}

Make it unique — different name, twist, stronger narrative.
Current trending: ${trending.slice(0, 6).join(", ")}

Return ONLY valid JSON:
{
  "name": "New Token Name",
  "symbol": "TICK",
  "description": "2-3 sentence description",
  "imagePrompt": "detailed AI image generation prompt",
  "why": "why this twist works",
  "twist": "what makes it different",
  "strategy": "launch strategy"
}`;

  for (const key of groqKeys) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.95,
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const json = extractJson(data?.choices?.[0]?.message?.content);
      if (json?.name) return json;
    } catch {}
  }

  return null;
}
