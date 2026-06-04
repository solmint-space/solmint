"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import GenerateStatusCard from "@/components/ai-website/GenerateStatusCard";

type Vibe =
  | "auto"
  | "meme"
  | "degen"
  | "premium"
  | "cute"
  | "cyber"
  | "retro"
  | "cosmic";

type Theme = {
  label: string;
  accent: string;
  second: string;
  bg: string;
  emoji: string;
  headline: string;
};

const THEMES: Record<Exclude<Vibe, "auto">, Theme> = {
  meme: {
    label: "Meme Viral",
    accent: "#14F195",
    second: "#9945FF",
    emoji: "🚀",
    headline: "chaotic viral meme universe",
    bg: "radial-gradient(circle at 20% 10%, rgba(20,241,149,0.35), transparent 28%), radial-gradient(circle at 80% 0%, rgba(153,69,255,0.32), transparent 32%), linear-gradient(135deg, #130b2a, #06120f)",
  },
  degen: {
    label: "Degen Launch",
    accent: "#ff5f57",
    second: "#9945FF",
    emoji: "🔥",
    headline: "high-energy degen launch arena",
    bg: "radial-gradient(circle at 20% 10%, rgba(255,95,87,0.32), transparent 30%), radial-gradient(circle at 80% 20%, rgba(153,69,255,0.35), transparent 34%), linear-gradient(135deg, #170708, #07070f)",
  },
  premium: {
    label: "Premium Coin",
    accent: "#6FA8FF",
    second: "#14F195",
    emoji: "💎",
    headline: "premium crypto brand landing page",
    bg: "radial-gradient(circle at 30% 0%, rgba(111,168,255,0.36), transparent 30%), radial-gradient(circle at 80% 20%, rgba(20,241,149,0.16), transparent 32%), linear-gradient(135deg, #06111f, #050509)",
  },
  cute: {
    label: "Cute Animal",
    accent: "#FF4ECD",
    second: "#FFD43B",
    emoji: "🐶",
    headline: "cute playful character world",
    bg: "radial-gradient(circle at 20% 0%, rgba(255,78,205,0.38), transparent 32%), radial-gradient(circle at 85% 20%, rgba(255,212,59,0.22), transparent 34%), linear-gradient(135deg, #23071d, #07070f)",
  },
  cyber: {
    label: "Cyber AI",
    accent: "#00E7FF",
    second: "#9945FF",
    emoji: "🤖",
    headline: "futuristic cyber AI protocol",
    bg: "radial-gradient(circle at 25% 0%, rgba(0,231,255,0.34), transparent 30%), radial-gradient(circle at 85% 15%, rgba(153,69,255,0.34), transparent 34%), linear-gradient(135deg, #02151a, #050509)",
  },
  retro: {
    label: "Retro Arcade",
    accent: "#FFD43B",
    second: "#FF4ECD",
    emoji: "🕹️",
    headline: "retro arcade meme site",
    bg: "radial-gradient(circle at 20% 0%, rgba(255,212,59,0.32), transparent 30%), radial-gradient(circle at 85% 20%, rgba(255,78,205,0.28), transparent 34%), linear-gradient(135deg, #201506, #12071c)",
  },
  cosmic: {
    label: "Cosmic AI",
    accent: "#2F7BFF",
    second: "#00E7FF",
    emoji: "🪐",
    headline: "space empire crypto website",
    bg: "radial-gradient(circle at 35% -10%, rgba(47,123,255,0.36), transparent 32%), radial-gradient(circle at 80% 15%, rgba(0,231,255,0.16), transparent 36%), linear-gradient(135deg, #01040b, #050509)",
  },
};

function detectTheme(name: string, desc: string): Exclude<Vibe, "auto"> {
  const txt = `${name} ${desc}`.toLowerCase();

  if (/(ai|bot|gpt|agent|cyber|neural)/.test(txt)) return "cyber";
  if (/(space|moon|mars|orbit|star|rocket)/.test(txt)) return "cosmic";
  if (/(dog|cat|frog|peng|cute|baby|animal)/.test(txt)) return "cute";
  if (/(premium|lux|elite|diamond|gold)/.test(txt)) return "premium";
  if (/(degen|ape|100x|pump|casino|fire)/.test(txt)) return "degen";
  if (/(retro|pixel|arcade|8bit)/.test(txt)) return "retro";

  return "meme";
}

export default function AIWebsitePage() {
  const [tokenName, setTokenName] = useState("MoonPup");
  const [symbol, setSymbol] = useState("PUP");
  const [mint, setMint] = useState("");
  const [description, setDescription] = useState(
    "A viral Solana memecoin powered by community energy, memes and unstoppable momentum."
  );

  const [vibe, setVibe] = useState<Vibe>("auto");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const detected = detectTheme(tokenName, description);
  const finalVibe = vibe === "auto" ? detected : vibe;
  const theme = THEMES[finalVibe];

  const preview = useMemo(() => {
    return {
      title: `${tokenName} enters the timeline.`,
      subtitle:
        "AI-generated launch website with custom visuals, roadmap, tokenomics, live chart integration and meme-native branding.",
    };
  }, [tokenName]);

  async function handleGenerate() {
    try {
      setGeneratedUrl("");
      setIsGenerating(true);

      const res = await fetch("/api/ai-website/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenName,
          symbol,
          mint,
          description,
          logoUrl: logoPreview,
          theme,
        }),
      });

      const data = await res.json();

      if (data?.url) {
        setGeneratedUrl(data.url);
      }
    } catch (err) {
      console.error(err);
      alert("Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-white" style={{ background: "#040406" }}>
      {isGenerating && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,.72)",
            backdropFilter: "blur(18px)",
            display: "grid",
            placeItems: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              borderRadius: 34,
              padding: 32,
              background: "rgba(10,10,20,.92)",
              border: "1px solid rgba(255,255,255,.12)",
              boxShadow: "0 40px 140px rgba(0,0,0,.6)",
            }}
          >
            <div style={{ color: theme.accent, fontWeight: 950, marginBottom: 14 }}>
              AI IS BUILDING YOUR MEMECOIN WEBSITE
            </div>

            <h2
              style={{
                fontSize: 42,
                lineHeight: 0.95,
                fontWeight: 950,
                letterSpacing: "-.06em",
                marginBottom: 24,
              }}
            >
              Generating visuals,
              <br />
              layout & launch page.
            </h2>

            <div
              style={{
                height: 14,
                borderRadius: 999,
                background: "rgba(255,255,255,.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "72%",
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${theme.accent}, ${theme.second})`,
                  animation: "loadingBar 1.2s ease-in-out infinite alternate",
                }}
              />
            </div>

            <p style={{ color: "rgba(255,255,255,.5)", marginTop: 18, lineHeight: 1.6 }}>
              Creating AI copy, theme, token sections, visuals and live chart setup...
            </p>

            <style>{`
              @keyframes loadingBar {
                from { width: 28%; transform: translateX(0); }
                to { width: 92%; transform: translateX(8%); }
              }
            `}</style>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: theme.bg }} />

        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <nav className="relative z-20 px-5 py-5">
        <div
          className="max-w-7xl mx-auto rounded-full px-5 py-4 flex items-center justify-between"
          style={{
            background: "rgba(5,5,12,.62)",
            border: "1px solid rgba(255,255,255,.1)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Link href="/" className="text-white no-underline font-black text-xl">
            SolMint Space
          </Link>

          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,.65)",
              textDecoration: "none",
              fontWeight: 900,
            }}
          >
            ← Home
          </Link>
        </div>
      </nav>

      <section className="relative z-10 px-5 pt-8 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-6 items-start">
          <div>
            <div
              style={{
                display: "inline-flex",
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.1)",
                color: theme.accent,
                fontSize: 12,
                fontWeight: 950,
                marginBottom: 26,
              }}
            >
              ✦ AI MEMECOIN WEBSITE ENGINE
            </div>

            <h1
              style={{
                fontSize: "clamp(54px,8vw,108px)",
                lineHeight: 0.9,
                letterSpacing: "-0.08em",
                fontWeight: 950,
                marginBottom: 24,
              }}
            >
              Generate
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${theme.accent}, ${theme.second})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                launch sites.
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,.62)",
                fontSize: 18,
                lineHeight: 1.8,
                marginBottom: 34,
                maxWidth: 700,
              }}
            >
              AI creates a complete memecoin launch experience with visuals,
              branding, tokenomics, live chart integration and meme-native design.
            </p>

            <div
              className="rounded-[34px] p-6 space-y-5"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 120px rgba(0,0,0,.42)",
              }}
            >
              <input
                value={mint}
                onChange={(e) => setMint(e.target.value)}
                placeholder="Paste Solana token mint..."
                className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="Token Name"
                  className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none"
                />

                <input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Symbol"
                  className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none"
                />
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none resize-none"
              />

              <label
                className="rounded-[28px] p-5 flex items-center gap-4 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px dashed rgba(255,255,255,.18)",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 24,
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.second})`,
                  }}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 32 }}>🖼️</span>
                  )}
                </div>

                <div>
                  <div style={{ fontWeight: 900 }}>Upload token artwork</div>
                  <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13, marginTop: 4 }}>
                    AI uses this for branding and visuals.
                  </div>
                </div>

                <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["auto", "meme", "degen", "premium", "cute", "cyber", "retro", "cosmic"] as Vibe[]).map((key) => {
                  const active = vibe === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setVibe(key)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 18,
                        border: active ? `1px solid ${theme.accent}` : "1px solid rgba(255,255,255,.1)",
                        background: active ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)",
                        color: "white",
                        fontWeight: 850,
                        fontSize: 13,
                      }}
                    >
                      {key === "auto" ? "✨ Auto" : `${THEMES[key].emoji} ${THEMES[key].label}`}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{
                  width: "100%",
                  height: 74,
                  borderRadius: 24,
                  border: "none",
                  background: `linear-gradient(135deg, ${theme.second}, ${theme.accent})`,
                  color: "white",
                  fontWeight: 950,
                  fontSize: 18,
                  boxShadow: "0 22px 70px rgba(153,69,255,.35)",
                  cursor: isGenerating ? "not-allowed" : "pointer",
                  opacity: isGenerating ? 0.7 : 1,
                }}
              >
                {isGenerating ? "Generating AI Website..." : "Generate Website — FREE"}
              </button>

              {generatedUrl && <GenerateStatusCard generatedUrl={generatedUrl} />}
            </div>
          </div>

          <div
            className="rounded-[42px] overflow-hidden"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.1)",
              boxShadow: "0 30px 140px rgba(0,0,0,.5)",
            }}
          >
            <div
              style={{
                minHeight: 820,
                position: "relative",
                overflow: "hidden",
                background: theme.bg,
                padding: 32,
              }}
            >
              <div
                className="rounded-[30px] p-6"
                style={{
                  background: "rgba(0,0,0,.35)",
                  border: "1px solid rgba(255,255,255,.1)",
                  backdropFilter: "blur(22px)",
                }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 28,
                      overflow: "hidden",
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.second})`,
                    }}
                  >
                    {logoPreview ? (
                      <img src={logoPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 36 }}>{theme.emoji}</span>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: 28, fontWeight: 950 }}>{tokenName}</div>
                    <div style={{ color: "rgba(255,255,255,.45)", fontWeight: 800 }}>${symbol}</div>
                  </div>
                </div>

                <h2
                  style={{
                    fontSize: "clamp(56px,6vw,92px)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.08em",
                    fontWeight: 950,
                    marginBottom: 20,
                  }}
                >
                  {preview.title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.65)",
                    lineHeight: 1.8,
                    fontSize: 18,
                    maxWidth: 720,
                    marginBottom: 28,
                  }}
                >
                  {preview.subtitle}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    style={{
                      padding: "16px 22px",
                      borderRadius: 18,
                      border: "none",
                      background: theme.accent,
                      color: "#050509",
                      fontWeight: 950,
                      fontSize: 16,
                    }}
                  >
                    BUY ${symbol}
                  </button>

                  <button
                    style={{
                      padding: "16px 22px",
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,.1)",
                      background: "rgba(255,255,255,.06)",
                      color: "white",
                      fontWeight: 900,
                      fontSize: 16,
                    }}
                  >
                    JOIN COMMUNITY
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {["Live Dex Chart", "AI Meme Branding", "Tokenomics & Roadmap"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[28px] p-5"
                    style={{
                      background: "rgba(0,0,0,.35)",
                      border: "1px solid rgba(255,255,255,.08)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <div style={{ color: theme.accent, fontSize: 12, fontWeight: 950, marginBottom: 8 }}>
                      AI GENERATED
                    </div>

                    <div style={{ fontWeight: 900, fontSize: 18, lineHeight: 1.4 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}