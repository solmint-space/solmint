const HF_KEY = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
const PINATA_JWT = process.env.PINATA_JWT;

async function generateFluxImage(prompt: string): Promise<ArrayBuffer | null> {
  if (!HF_KEY) return null;
  try {
    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width: 1024, height: 1024, num_inference_steps: 4 },
        }),
        signal: AbortSignal.timeout(60000),
      }
    );
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("image")) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function uploadToPinata(buffer: ArrayBuffer, filename: string): Promise<string> {
  if (!PINATA_JWT) return "";
  try {
    const blob = new Blob([buffer], { type: "image/png" });
    const form = new FormData();
    form.append("file", blob, filename);
    form.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: { Authorization: `Bearer ${PINATA_JWT}` },
      body: form,
    });
    if (!res.ok) return "";
    const data = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch {
    return "";
  }
}

async function generateAndUpload(prompt: string, filename: string): Promise<string> {
  const buffer = await generateFluxImage(prompt);
  if (!buffer) return "";
  const url = await uploadToPinata(buffer, filename);
  if (url) return url;
  // Fallback: return base64 if Pinata fails
  return `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
}

export type ImageInput = {
  tokenName: string;
  symbol: string;
  description: string;
  vibe?: string;
  heroPrompt?: string;
  communityPrompt?: string;
};

export async function generateSiteImages(input: ImageInput) {
  const baseStyle =
    input.vibe === "cute"
      ? "cute colorful kawaii mascot illustration, vibrant pastel colors, playful cartoon style, no text"
      : input.vibe === "cyber"
      ? "futuristic cyberpunk neon art, dark background, glowing circuits, digital matrix aesthetic, cinematic"
      : input.vibe === "cosmic"
      ? "space galaxy cosmic art, stars nebula planets, cinematic sci-fi, epic scale, dramatic lighting"
      : input.vibe === "retro"
      ? "retro 80s synthwave neon grid, pixel art vibes, arcade aesthetic, vivid neon colors"
      : input.vibe === "premium"
      ? "premium luxury minimalist crypto art, sleek dark background, gold accents, high-end branding"
      : input.vibe === "degen"
      ? "explosive high-energy crypto degen art, wild colors, neon, chaotic meme energy, bold"
      : "viral meme coin art, neon glowing colors, crypto bull market energy, explosive, dark background";

  const heroPrompt =
    input.heroPrompt ||
    `${baseStyle}, iconic mascot character representing "${input.tokenName}" crypto token ($${input.symbol}), centered composition, full-bleed hero banner, dramatic cinematic lighting, ultra detailed, hyper-realistic rendering, no text, no letters, no watermark, 4K quality`;

  const communityPrompt =
    input.communityPrompt ||
    `${baseStyle}, vibrant community celebration artwork for "${input.tokenName}" ($${input.symbol}) crypto token, group of diverse cartoon characters with rocket ships and moon, explosive energy, confetti and neon glows, no text, no letters, no watermark, vibrant high-contrast colors`;

  const [heroUrl, communityUrl] = await Promise.all([
    generateAndUpload(heroPrompt, `${input.symbol.toLowerCase()}-hero.png`),
    generateAndUpload(communityPrompt, `${input.symbol.toLowerCase()}-community.png`),
  ]);

  return { hero: heroUrl, community: communityUrl };
}
