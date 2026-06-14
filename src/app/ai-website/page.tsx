"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import GenerateStatusCard from "@/components/ai-website/GenerateStatusCard";
import { useLang } from "@/lib/useLang";
import { TEXTS } from "@/lib/translations";

type Vibe = "auto" | "meme" | "degen" | "premium" | "cute" | "cyber" | "retro" | "cosmic";

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
  if (/(ai|bot|gpt|agent|cyber|neural|robot)/.test(txt)) return "cyber";
  if (/(space|moon|mars|orbit|star|rocket|cosmic|galaxy)/.test(txt)) return "cosmic";
  if (/(dog|cat|frog|peng|cute|baby|animal|wif|puppy)/.test(txt)) return "cute";
  if (/(premium|lux|elite|diamond|gold|silver)/.test(txt)) return "premium";
  if (/(degen|ape|100x|pump|casino|fire|defi)/.test(txt)) return "degen";
  if (/(retro|pixel|arcade|8bit|game)/.test(txt)) return "retro";
  return "meme";
}

export default function AIWebsitePage() {
  const [lang] = useLang();
  const t = TEXTS[lang].aiWebsite;

  const [tokenName, setTokenName] = useState("MoonPup");
  const [symbol, setSymbol] = useState("PUP");
  const [mint, setMint] = useState("");
  const [description, setDescription] = useState(
    "A viral Solana memecoin powered by community energy, memes and unstoppable momentum."
  );

  const [vibe, setVibe] = useState<Vibe>("auto");
  const [images, setImages] = useState<string[]>([]); // base64 or URL
  const [logoIndex, setLogoIndex] = useState<number>(0); // which image is the logo
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFetchingDex, setIsFetchingDex] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [dexFound, setDexFound] = useState(false);

  const detected = detectTheme(tokenName, description);
  const finalVibe = vibe === "auto" ? detected : vibe;
  const theme = THEMES[finalVibe];

  const preview = useMemo(() => ({
    title: `${tokenName} enters the timeline.`,
    subtitle: "AI-generated launch website with custom visuals, roadmap, tokenomics, live chart and meme-native branding.",
  }), [tokenName]);

  const fetchDexScreener = useCallback(async (ca: string) => {
    if (!ca || ca.length < 32) return;
    try {
      setIsFetchingDex(true);
      setDexFound(false);
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ca}`);
      const data = await res.json();
      const pair = data?.pairs?.[0];
      if (pair) {
        setDexFound(true);
        if (pair.baseToken?.name) setTokenName(pair.baseToken.name);
        if (pair.baseToken?.symbol) setSymbol(pair.baseToken.symbol.toUpperCase());
        if (pair.baseToken?.name) {
          setDescription(`${pair.baseToken.name} ($${pair.baseToken.symbol}) is a live Solana token. Price: $${parseFloat(pair.priceUsd || "0").toFixed(8)} · Market Cap: ${pair.fdv ? "$" + (pair.fdv / 1_000_000).toFixed(2) + "M" : "N/A"} · 24h Volume: ${pair.volume?.h24 ? "$" + (pair.volume.h24 / 1_000).toFixed(1) + "K" : "N/A"}.`);
        }
        if (pair.info?.imageUrl) { setImages([pair.info.imageUrl]); setLogoIndex(0); }
      }
    } catch {}
    finally {
      setIsFetchingDex(false);
    }
  }, []);

  async function handleGenerate() {
    try {
      setGeneratedUrl("");
      setIsGenerating(true);

      const res = await fetch("/api/ai-website/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenName, symbol, mint, description, logoUrl: images[logoIndex] ?? "", extraImages: images.filter((_, i) => i !== logoIndex), theme }),
      });

      const data = await res.json();
      if (data?.url) setGeneratedUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.slice(0, 5 - images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => {
          const next = [...prev, ev.target?.result as string];
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
    // reset input so same file can be re-added after removal
    e.target.value = "";
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setLogoIndex((prev) => (prev >= idx && prev > 0 ? prev - 1 : prev));
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-white">
      {isGenerating && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.78)", backdropFilter: "blur(22px)", display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ width: "min(580px, 100%)", borderRadius: 36, padding: 36, background: "rgba(8,8,20,.95)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 40px 160px rgba(0,0,0,.7)" }}>
            <div style={{ color: theme.accent, fontWeight: 950, fontSize: 12, letterSpacing: "0.1em", marginBottom: 14 }}>{t.loadingTitle}</div>
            <h2 style={{ fontSize: 42, lineHeight: 0.95, fontWeight: 950, letterSpacing: "-.06em", marginBottom: 10 }}>{t.loadingH2.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</h2>
            <p style={{ color: "rgba(255,255,255,.45)", marginBottom: 24, fontSize: 15 }}>{t.loadingDesc}</p>
            <div style={{ height: 10, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${theme.accent}, ${theme.second})`, animation: "loadingBar 1.5s ease-in-out infinite alternate" }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap" }}>
              {t.steps.map((step: string, i: number) => (
                <span key={step} style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: i === 1 ? theme.accent : "rgba(255,255,255,.5)" }}>
                  {step}
                </span>
              ))}
            </div>
            <style>{`@keyframes loadingBar { from { width: 22%; } to { width: 94%; } }`}</style>
          </div>
        </div>
      )}

      {/* Vibe accent overlay — sits above PremiumBackground from layout */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-18 transition-all duration-700" style={{ background: theme.accent }} />
      </div>

      <SiteNavbar />

      <section className="relative z-10 px-5 pt-28 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-8 items-start">
          <div>
            <div style={{ display: "inline-flex", padding: "10px 18px", borderRadius: 999, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", color: theme.accent, fontSize: 12, fontWeight: 950, letterSpacing: "0.1em", marginBottom: 28 }}>
              ✦ {t.badge}
            </div>

            <h1 style={{ fontSize: "clamp(52px,8vw,108px)", lineHeight: 0.9, letterSpacing: "-0.08em", fontWeight: 950, marginBottom: 22 }}>
              {t.title1}<br />
              <span style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.second})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.title2}
              </span>
            </h1>

            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 18, lineHeight: 1.8, marginBottom: 36, maxWidth: 680 }}>
              {t.desc}
            </p>

            <div className="rounded-[36px] p-6 space-y-4" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(22px)", boxShadow: "0 30px 130px rgba(0,0,0,.45)" }}>

              {/* CA input with auto-fetch */}
              <div style={{ position: "relative" }}>
                <input
                  value={mint}
                  onChange={(e) => { setMint(e.target.value); setDexFound(false); }}
                  onBlur={(e) => fetchDexScreener(e.target.value.trim())}
                  placeholder={t.caPlaceholder}
                  className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none pr-32"
                  style={{ fontFamily: "monospace", fontSize: 13 }}
                />
                {isFetchingDex && (
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: theme.accent, fontWeight: 800 }}>
                    {t.fetching}
                  </div>
                )}
                {dexFound && !isFetchingDex && (
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#14F195", fontWeight: 900, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#14F195", display: "inline-block" }} />
                    {t.foundDex}
                  </div>
                )}
              </div>

              {dexFound && (
                <div style={{ padding: "10px 16px", borderRadius: 16, background: "rgba(20,241,149,.08)", border: "1px solid rgba(20,241,149,.2)", fontSize: 13, color: "#14F195", fontWeight: 800 }}>
                  {t.foundBanner}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <input value={tokenName} onChange={(e) => setTokenName(e.target.value)} placeholder={t.tokenName} className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none" />
                <input value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} placeholder={t.symbol} className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none" />
              </div>

              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder={t.descPlaceholder} className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/10 text-white focus:outline-none resize-none" />

              {/* Multi-image upload */}
              <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 28, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,.4)", marginBottom: 12, letterSpacing: "0.08em" }}>
                  IMAGES <span style={{ color: "rgba(255,255,255,.25)", fontWeight: 600 }}>(up to 5) — click ★ to set as logo</span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {images.map((src, idx) => (
                    <div key={idx} style={{ position: "relative", width: 80, height: 80 }}>
                      <img
                        src={src}
                        alt=""
                        style={{ width: 80, height: 80, borderRadius: 16, objectFit: "cover", border: idx === logoIndex ? `2.5px solid ${theme.accent}` : "2px solid rgba(255,255,255,.12)", cursor: "pointer" }}
                        onClick={() => setLogoIndex(idx)}
                      />
                      {/* Logo badge */}
                      {idx === logoIndex && (
                        <div style={{ position: "absolute", top: 4, left: 4, background: theme.accent, color: "#000", fontSize: 9, fontWeight: 900, padding: "2px 5px", borderRadius: 6 }}>LOGO</div>
                      )}
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: 6, background: "rgba(0,0,0,.7)", border: "none", color: "white", fontSize: 11, cursor: "pointer", display: "grid", placeItems: "center", lineHeight: 1 }}
                      >×</button>
                    </div>
                  ))}

                  {images.length < 5 && (
                    <label style={{ width: 80, height: 80, borderRadius: 16, border: "1.5px dashed rgba(255,255,255,.2)", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}>
                      <span style={{ fontSize: 24, color: "rgba(255,255,255,.3)" }}>+</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
                    </label>
                  )}
                </div>

                {images.length === 0 && (
                  <div style={{ color: "rgba(255,255,255,.3)", fontSize: 13, marginTop: 8 }}>
                    {t.uploadDesc}
                  </div>
                )}
              </div>

              {/* Vibe selector */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,.4)", marginBottom: 10, letterSpacing: "0.08em" }}>{t.styleLabel}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["auto", "meme", "degen", "premium", "cute", "cyber", "retro", "cosmic"] as Vibe[]).map((key) => {
                    const active = vibe === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setVibe(key)}
                        style={{
                          padding: "11px 12px",
                          borderRadius: 16,
                          border: active ? `1.5px solid ${theme.accent}` : "1px solid rgba(255,255,255,.1)",
                          background: active ? `${theme.accent}18` : "rgba(255,255,255,.04)",
                          color: active ? theme.accent : "rgba(255,255,255,.7)",
                          fontWeight: active ? 900 : 700,
                          fontSize: 13,
                          transition: "all 0.15s",
                        }}
                      >
                        {key === "auto" ? "✨ Auto" : `${THEMES[key].emoji} ${THEMES[key].label}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{
                  width: "100%",
                  height: 72,
                  borderRadius: 22,
                  border: "none",
                  background: `linear-gradient(135deg, ${theme.second}, ${theme.accent})`,
                  color: "white",
                  fontWeight: 950,
                  fontSize: 18,
                  boxShadow: `0 22px 80px ${theme.accent}40`,
                  cursor: isGenerating ? "not-allowed" : "pointer",
                  opacity: isGenerating ? 0.7 : 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {isGenerating ? t.generatingBtn : t.generateBtn}
              </button>

              {generatedUrl && <GenerateStatusCard generatedUrl={generatedUrl} />}
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-3 mt-5">
              {t.features.map((f: { icon: string; title: string; desc: string }) => (
                <div key={f.title} className="rounded-[22px] p-4" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{f.title}</div>
                  <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13, marginTop: 2 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div className="rounded-[44px] overflow-hidden sticky top-6" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 30px 150px rgba(0,0,0,.55)" }}>
            <div style={{ minHeight: 860, position: "relative", overflow: "hidden", background: theme.bg, padding: 28 }}>
              <div className="rounded-[28px] p-6 mb-4" style={{ background: "rgba(0,0,0,.38)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(22px)" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div style={{ width: 68, height: 68, borderRadius: 24, overflow: "hidden", display: "grid", placeItems: "center", background: `linear-gradient(135deg, ${theme.accent}, ${theme.second})`, flexShrink: 0 }}>
                    {images[logoIndex] ? <img src={images[logoIndex]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 32 }}>{theme.emoji}</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 950, lineHeight: 1 }}>{tokenName}</div>
                    <div style={{ color: "rgba(255,255,255,.4)", fontWeight: 800, marginTop: 4 }}>${symbol}</div>
                  </div>
                  {dexFound && (
                    <div style={{ marginLeft: "auto", padding: "6px 12px", borderRadius: 999, background: "rgba(20,241,149,.12)", border: "1px solid rgba(20,241,149,.3)", fontSize: 11, fontWeight: 900, color: "#14F195" }}>
                      LIVE
                    </div>
                  )}
                </div>

                <h2 style={{ fontSize: "clamp(48px,5vw,84px)", lineHeight: 0.88, letterSpacing: "-0.08em", fontWeight: 950, marginBottom: 16 }}>
                  {preview.title}
                </h2>
                <p style={{ color: "rgba(255,255,255,.6)", lineHeight: 1.7, fontSize: 16, marginBottom: 24 }}>
                  {preview.subtitle}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button style={{ padding: "14px 22px", borderRadius: 16, border: "none", background: theme.accent, color: "#050509", fontWeight: 950, fontSize: 15 }}>
                    BUY ${symbol}
                  </button>
                  <button style={{ padding: "14px 22px", borderRadius: 16, border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.06)", color: "white", fontWeight: 900, fontSize: 15 }}>
                    JOIN COMMUNITY
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["📊 Live Dex Chart", "🤖 AI Branding", "📋 Tokenomics", "🗺️ Roadmap"].map((item) => (
                  <div key={item} className="rounded-[22px] p-4" style={{ background: "rgba(0,0,0,.38)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(18px)" }}>
                    <div style={{ color: theme.accent, fontSize: 11, fontWeight: 950, marginBottom: 6, letterSpacing: "0.08em" }}>AI GENERATED</div>
                    <div style={{ fontWeight: 900, fontSize: 15 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
