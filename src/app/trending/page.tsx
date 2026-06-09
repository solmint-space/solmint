"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/lib/useLang";

const TR = {
  IT: {
    badge: "Live Solana Radar",
    heading1: "Token che stanno",
    heading2: "pompando ora.",
    desc: "Scopri i token Solana live da DexScreener, studia narrativa e momentum, poi usa AI per ricreare una variante originale.",
    trending: "🔥 Trending", gainers: "📈 Gainers", newt: "🆕 Nuovi",
    refresh: "Aggiorna", autoRefresh: "Auto-refresh",
    empty: "Nessun token trovato. Riprova tra qualche secondo.",
    recreateLabel: "Ricrea con AI", inspiredBy: "Ispirato a",
    aiLoading1: "Analizzo trend, metriche e viralità...",
    aiLoading2: "Creo una variante originale ispirata al token.",
    whyViral: "Perché può diventare virale", strategy: "Strategia",
    useToken: "Usa questo token — Apri SolMint",
    age: "Età",
    recreateBtn: "🤖 Ricrea AI",
    newLabel: "Nuovo",
    newTokenLabel: "Nuovo Token",
  },
  EN: {
    badge: "Live Solana Radar",
    heading1: "Tokens that are",
    heading2: "pumping now.",
    desc: "Discover live Solana tokens from DexScreener, study narratives and momentum, then use AI to recreate an original variant.",
    trending: "🔥 Trending", gainers: "📈 Gainers", newt: "🆕 New",
    refresh: "Refresh", autoRefresh: "Auto-refresh",
    empty: "No tokens found. Try again in a few seconds.",
    recreateLabel: "Recreate with AI", inspiredBy: "Inspired by",
    aiLoading1: "Analyzing trends, metrics and virality...",
    aiLoading2: "Creating an original variant inspired by this token.",
    whyViral: "Why it can go viral", strategy: "Strategy",
    useToken: "Use this token — Open SolMint",
    age: "Age",
    recreateBtn: "🤖 Recreate AI",
    newLabel: "New",
    newTokenLabel: "New Token",
  },
} as const;

const NEW_THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48h

interface Token {
  address: string;
  name: string;
  symbol: string;
  icon: string | null;
  description: string;
  links: { label: string; url: string }[];
  marketCap: number;
  price: string;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  age: number | null;
  dexUrl: string;
  isNew?: boolean;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Number(n || 0).toFixed(0)}`;
}

function timeAgo(ts: number | null): string {
  if (!ts) return "—";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return `${Math.max(mins, 0)}m`;
}

function TokenCard({
  token,
  index,
  onRecreate,
  t,
}: {
  token: Token;
  index: number;
  onRecreate: (token: Token) => void;
  t: typeof TR["IT"] | typeof TR["EN"];
}) {
  const [visible, setVisible] = useState(false);
  const isPositive = token.priceChange24h >= 0;
  const isNew = token.age ? (Date.now() - token.age) < NEW_THRESHOLD_MS : false;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 40);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        background: "rgba(255,255,255,0.035)",
        border: isNew ? "1px solid rgba(20,241,149,0.35)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 20,
      }}
      className="group hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="relative z-10">
        {/* Header row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-12 w-12 shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #9945FF44, #14F19533)" }} />
              {token.icon && (
                <img
                  src={token.icon}
                  alt={token.name}
                  className="absolute inset-0 z-20 h-12 w-12 rounded-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              )}
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full text-base font-black text-white" style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}>
                {token.symbol?.[0] || "?"}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-black text-white">
                  {token.name?.length > 18 ? token.name.slice(0, 18) + "…" : token.name}
                </h3>
                {isNew && (
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white" style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}>
                    {t.newLabel}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-bold" style={{ color: "rgba(255,255,255,0.35)" }}>${token.symbol}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.26)" }}>Market Cap</p>
            <p className="text-lg font-black" style={{ color: "#14F195" }}>{formatNum(token.marketCap)}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="mb-0.5 text-[9px] font-bold uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>24h</p>
            <p className="text-sm font-black" style={{ color: isPositive ? "#14F195" : "#ff6b6b" }}>
              {isPositive ? "+" : ""}{Number(token.priceChange24h || 0).toFixed(1)}%
            </p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="mb-0.5 text-[9px] font-bold uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>Volume</p>
            <p className="text-sm font-black text-white">{formatNum(token.volume24h)}</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="mb-0.5 text-[9px] font-bold uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{t.age}</p>
            <p className="text-sm font-black text-white">{timeAgo(token.age)}</p>
          </div>
        </div>

        {/* Description */}
        {token.description && (
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.36)" }}>
            {token.description.length > 90 ? token.description.slice(0, 90) + "…" : token.description}
          </p>
        )}

        {/* Social links */}
        <div className="mb-4 flex items-center gap-2">
          {token.links?.filter((l: any) => l.url).slice(0, 3).map((link: any, i: number) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black no-underline transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.55)" }}
            >
              {link.label === "twitter" ? "𝕏" : link.label === "telegram" ? "✈" : "🌐"}
            </a>
          ))}
          <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            {token.address.slice(0, 6)}…{token.address.slice(-4)}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <a href={token.dexUrl} target="_blank" rel="noopener noreferrer"
            className="rounded-xl py-2.5 text-center text-sm font-black text-white no-underline transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.065)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            DexScreener
          </a>
          <button onClick={() => onRecreate(token)}
            className="rounded-xl border-0 py-2.5 text-sm font-black text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #9945FF, #14F195)", cursor: "pointer" }}
          >
            {t.recreateBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mb-4 h-12 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="mb-3 h-16 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="h-10 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

export default function TrendingPage() {
  const [lang] = useLang();
  const t = TR[lang] ?? TR["EN"];

  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [filter, setFilter] = useState<"trending" | "gainers" | "new">("trending");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [newToast, setNewToast] = useState<{ name: string; symbol: string; icon: string | null } | null>(null);

  const seenAddresses = useRef(new Set<string>());
  const firstLoad = useRef(true);

  const fetchTokens = useCallback(async () => {
    try {
      const res = await fetch(`/api/trending?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      const incoming: Token[] = data.tokens || [];

      const isFirst = firstLoad.current;
      if (isFirst) firstLoad.current = false;

      const mapped = incoming.map((tk: Token) => ({
        ...tk,
        isNew: !isFirst && !seenAddresses.current.has(tk.address),
      }));

      incoming.forEach(tk => seenAddresses.current.add(tk.address));

      const firstNew = mapped.find(tk => tk.isNew);
      if (firstNew) {
        setNewToast({ name: firstNew.name, symbol: firstNew.symbol, icon: firstNew.icon });
        setTimeout(() => setNewToast(null), 4000);
      }

      setTokens(mapped);
      setLastUpdate(new Date());
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchTokens, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchTokens]);

  const recreateWithAI = async (token: Token) => {
    setSelectedToken(token);
    setAiResult(null);
    setAiError("");
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "recreate", tokenData: token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI Error");
      setAiResult(data);
    } catch (e: any) {
      setAiError(e?.message || "Error during AI recreation");
    } finally {
      setAiLoading(false);
    }
  };

  const useAIToken = () => {
    if (!aiResult) return;
    sessionStorage.setItem("aiTokenDraft", JSON.stringify({
      name: aiResult.name || "",
      symbol: aiResult.symbol || "",
      description: aiResult.description || "",
      imageBase64: aiResult.imageBase64 || null,
    }));
    window.location.href = "/?app=true";
  };

  const filtered = [...tokens].sort((a, b) => {
    if (filter === "gainers") return b.priceChange24h - a.priceChange24h;
    if (filter === "new") return (b.age || 0) - (a.age || 0);
    return b.marketCap - a.marketCap;
  });

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#07070f", color: "white" }}>
      <SiteNavbar />

      {/* New token toast */}
      {newToast && (
        <div
          className="fixed bottom-6 right-5 z-[999] flex items-center gap-3 rounded-2xl px-4 py-3 pointer-events-none"
          style={{
            background: "rgba(8,8,20,0.96)",
            border: "1px solid rgba(20,241,149,0.4)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            animation: "toastSlide 3.8s cubic-bezier(.22,1,.36,1) forwards",
            minWidth: 200,
          }}
        >
          <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center font-black text-sm overflow-hidden" style={{ background: "linear-gradient(135deg,#9945FF,#14F195)" }}>
            {newToast.icon
              ? <img src={newToast.icon} alt="" className="h-9 w-9 object-cover rounded-full" />
              : <span>{newToast.symbol?.[0] || "?"}</span>
            }
          </div>
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#14F195" }}>{t.newTokenLabel}</div>
            <div className="font-black text-white text-sm">{newToast.name}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>${newToast.symbol}</div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes toastSlide {
          0%   { transform: translateX(110%); opacity: 0; }
          12%  { transform: translateX(0);    opacity: 1; }
          80%  { transform: translateX(0);    opacity: 1; }
          100% { transform: translateX(110%); opacity: 0; }
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(circle at 50% 0%, rgba(153,69,255,0.14) 0%, transparent 38%), radial-gradient(circle at 85% 28%, rgba(20,241,149,0.08) 0%, transparent 34%), linear-gradient(180deg, #07070f 0%, #090914 45%, #050509 100%)",
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
        }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-6 pt-36 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest"
              style={{ background: "rgba(20,241,149,0.08)", border: "1px solid rgba(20,241,149,0.18)", color: "#14F195" }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#14F195", boxShadow: "0 0 10px #14F195" }} />
              {t.badge}
              {lastUpdate && (
                <span className="normal-case tracking-normal font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                  · {lastUpdate.toLocaleTimeString(lang === "IT" ? "it-IT" : "en-US")}
                </span>
              )}
            </div>

            <h1 className="mx-auto mb-5 max-w-4xl font-black leading-[0.95]"
              style={{ fontSize: "clamp(44px, 8vw, 86px)", letterSpacing: "-0.055em" }}
            >
              {t.heading1}
              <br />
              <span style={{ background: "linear-gradient(90deg, #9945FF, #14F195)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.heading2}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.43)" }}>
              {t.desc}
            </p>
          </div>

          {/* Controls */}
          <div className="mb-8 flex flex-col gap-4 rounded-[24px] p-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="grid grid-cols-3 gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {(["trending", "gainers", "new"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="rounded-lg px-3 py-2.5 text-xs sm:text-sm font-black transition-all"
                  style={{
                    border: "none", cursor: "pointer",
                    background: filter === f ? "linear-gradient(135deg, #9945FF, #14F195)" : "transparent",
                    color: filter === f ? "white" : "rgba(255,255,255,0.42)",
                  }}
                >
                  {f === "trending" ? t.trending : f === "gainers" ? t.gainers : t.newt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.42)" }}>{t.autoRefresh}</span>
              <button onClick={() => setAutoRefresh(!autoRefresh)}
                className="relative h-6 w-11 rounded-full border-0 transition-all"
                style={{ cursor: "pointer", background: autoRefresh ? "linear-gradient(135deg, #9945FF, #14F195)" : "rgba(255,255,255,0.1)" }}
              >
                <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all" style={{ left: autoRefresh ? 22 : 2 }} />
              </button>
              <button onClick={fetchTokens}
                className="rounded-xl px-4 py-2 text-sm font-black transition-all hover:opacity-80"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
              >
                {t.refresh}
              </button>
            </div>
          </div>

          {/* Token grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((token, i) => (
                  <TokenCard key={token.address} token={token} index={i} onRecreate={recreateWithAI} t={t} />
                ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="py-24 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="mb-4 text-5xl">🔍</div>
              <p>{t.empty}</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Modal */}
      {selectedToken && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={() => { if (!aiLoading) { setSelectedToken(null); setAiResult(null); setAiError(""); } }}
        >
          <div onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl rounded-[28px] p-5 sm:p-7"
            style={{ background: "#0b0b16", border: "1px solid rgba(153,69,255,0.3)", boxShadow: "0 0 80px rgba(153,69,255,0.2)" }}
          >
            <div className="mb-6 flex justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "#14F195" }}>{t.recreateLabel}</p>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{t.inspiredBy} {selectedToken.name}</h2>
              </div>
              <button disabled={aiLoading} onClick={() => { setSelectedToken(null); setAiResult(null); setAiError(""); }}
                className="h-10 w-10 rounded-2xl text-2xl text-white"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", cursor: aiLoading ? "not-allowed" : "pointer" }}
              >×</button>
            </div>

            {aiLoading && (
              <div className="py-14 text-center">
                <div className="mb-4 text-5xl">🤖</div>
                <p className="mb-2 font-black text-white">{t.aiLoading1}</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{t.aiLoading2}</p>
              </div>
            )}

            {aiError && (
              <div className="rounded-2xl p-4 text-sm" style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)", color: "#ff6b6b" }}>
                {aiError}
              </div>
            )}

            {aiResult && !aiLoading && (
              <div>
                <div className="mb-5 flex flex-wrap gap-5">
                  {aiResult.imageBase64 ? (
                    <img src={aiResult.imageBase64} alt={aiResult.name} className="h-24 w-24 rounded-full object-cover" style={{ border: "3px solid rgba(153,69,255,0.4)" }} />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full text-4xl font-black" style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}>
                      {aiResult.symbol?.[0] || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-3xl font-black text-white">{aiResult.name}</h3>
                    <p className="mb-3 font-black" style={{ color: "#9945FF" }}>${aiResult.symbol}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{aiResult.description}</p>
                  </div>
                </div>

                {(aiResult.why || aiResult.twist) && (
                  <div className="mb-4 rounded-2xl p-4" style={{ background: "rgba(20,241,149,0.05)", border: "1px solid rgba(20,241,149,0.15)" }}>
                    <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "#14F195" }}>{t.whyViral}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{aiResult.why || aiResult.twist}</p>
                  </div>
                )}

                {aiResult.strategy && (
                  <div className="mb-6 rounded-2xl p-4" style={{ background: "rgba(153,69,255,0.05)", border: "1px solid rgba(153,69,255,0.15)" }}>
                    <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "#9945FF" }}>{t.strategy}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{aiResult.strategy}</p>
                  </div>
                )}

                <button onClick={useAIToken}
                  className="w-full rounded-2xl border-0 p-4 font-black text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #9945FF, #14F195)", cursor: "pointer" }}
                >
                  {t.useToken}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
