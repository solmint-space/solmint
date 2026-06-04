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
  const dexContext = input.dexData
    ? `\nLive DexScreener data:\n- Price: ${input.dexData.price || "TBA"}\n- 24h change: ${input.dexData.priceChange24h != null ? input.dexData.priceChange24h + "%" : "N/A"}\n- Volume 24h: ${input.dexData.volume24h || "N/A"}\n- Market Cap: ${input.dexData.marketCap || "N/A"}\n- Liquidity: ${input.dexData.liquidity || "N/A"}`
    : "";

  const prompt = `You are a viral memecoin website copywriter. Create a complete, hype-driven website JSON for this Solana token.

Token Name: ${input.tokenName}
Symbol: $${input.symbol}
Description: ${input.description}${dexContext}

Return ONLY valid JSON (no markdown, no explanation):
{
  "vibe": "one word vibe like: cyber | meme | degen | cosmic | cute | retro | premium",
  "palette": {
    "primary": "#hex color for this token vibe",
    "secondary": "#hex secondary color",
    "accent": "#hex accent color",
    "background": "CSS gradient string for dark background"
  },
  "hero": {
    "badge": "short live badge text e.g. LIVE ON SOLANA",
    "titleLine1": "first line of big hero headline (token name or short phrase)",
    "titleLine2": "second line (impactful phrase like PUMP INCOMING or GOES INFINITE)",
    "subtitle": "1-2 sentence hype description with energy",
    "slogan": "ultra short slogan 3-5 words"
  },
  "about": {
    "title": "lore/story section title",
    "text": "2-3 sentence story about this token, its vibe and why people should ape in"
  },
  "community": {
    "title": "community section call to action headline",
    "text": "2 sentences about the community energy"
  },
  "liveStats": [
    { "label": "Holders", "value": "${input.dexData?.holders || "Growing"}", "change": "Join now" },
    { "label": "Market Cap", "value": "${input.dexData?.marketCap || "Loading"}", "change": "Dex live" },
    { "label": "24H Volume", "value": "${input.dexData?.volume24h || "Live soon"}", "change": "Bullish" },
    { "label": "Liquidity", "value": "${input.dexData?.liquidity || "Locked"}", "change": "Secured" }
  ],
  "liveBuys": [
    { "name": "random crypto username", "amount": "X.XX SOL" },
    { "name": "random crypto username", "amount": "X.XX SOL" },
    { "name": "random crypto username", "amount": "X.XX SOL" },
    { "name": "random crypto username", "amount": "X.XX SOL" }
  ],
  "tokenomics": [
    { "label": "Liquidity", "value": "60%" },
    { "label": "Community", "value": "20%" },
    { "label": "Marketing", "value": "10%" },
    { "label": "Airdrops", "value": "10%" }
  ],
  "security": [
    { "label": "Mint Authority", "value": "Revoked" },
    { "label": "Tax", "value": "0%" },
    { "label": "Supply", "value": "1B" },
    { "label": "LP", "value": "Locked" }
  ],
  "roadmap": [
    { "phase": "Phase 01", "title": "Launch", "text": "Launch and first community forms." },
    { "phase": "Phase 02", "title": "Meme War", "text": "Raids, memes, viral content." },
    { "phase": "Phase 03", "title": "Listings", "text": "DEX visibility and growth." },
    { "phase": "Phase 04", "title": "Domination", "text": "The meme takes over Solana." }
  ],
  "howToBuy": [
    "Get SOL on any exchange",
    "Install Phantom or Backpack",
    "Swap SOL for $${input.symbol} on Jupiter",
    "Hold and join the community"
  ],
  "imagePrompts": {
    "hero": "cinematic digital art: ${input.tokenName} memecoin, vibrant neon, solana blockchain energy",
    "community": "epic community art: ${input.tokenName} token holders, crypto bulls, neon glowing"
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
