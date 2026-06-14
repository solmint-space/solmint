"use client";

import { useEffect, useRef, useState } from "react";

function fmtNum(n?: number): string {
  if (!n || n === 0) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)         return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function fmtPrice(p?: string): string {
  if (!p) return "—";
  const n = parseFloat(p);
  if (isNaN(n) || n === 0) return "—";
  if (n < 0.000001) return `$${n.toExponential(4)}`;
  if (n < 0.001)    return `$${n.toFixed(8)}`;
  if (n < 1)        return `$${n.toFixed(6)}`;
  return `$${n.toFixed(4)}`;
}

function timeSince(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

async function fetchDex(mint: string) {
  // 1) Try server proxy (Node.js TLS — not affected by Windows Schannel SSL issue)
  try {
    const r = await fetch(`/api/dex/live?mint=${mint}`, {
      cache: "no-cache",
      signal: AbortSignal.timeout(7000),
    });
    if (r.ok) {
      const d = await r.json();
      const pair = d?.pairs?.[0] ?? null;
      if (pair) return pair;
    }
  } catch {}

  // 2) Fallback: direct browser→DexScreener (CORS allowed by DexScreener)
  try {
    const r = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
      { cache: "no-cache", signal: AbortSignal.timeout(7000) }
    );
    if (r.ok) {
      const d = await r.json();
      return d?.pairs?.[0] ?? null;
    }
  } catch {}

  return null;
}

// ── LiveStats ─────────────────────────────────────────────────────────────────
export function LiveStats({ mint, primary, accent }: { mint: string; primary: string; accent: string }) {
  const [pair, setPair] = useState<any>(null);
  const [flash, setFlash] = useState(false);
  const [failCount, setFailCount] = useState(0);

  useEffect(() => {
    if (!mint) return;
    let mounted = true;
    async function load() {
      const p = await fetchDex(mint);
      if (!mounted) return;
      if (p) {
        setPair(p); setFlash(true); setFailCount(0);
        setTimeout(() => setFlash(false), 700);
      } else {
        setFailCount((n) => n + 1);
      }
    }
    load();
    const id = setInterval(load, 8000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

  const pos = pair ? (pair.priceChange?.h24 ?? 0) >= 0 : true;
  const buys  = pair?.txns?.h1?.buys  || pair?.txns?.h6?.buys  || pair?.txns?.h24?.buys  || 0;
  const sells = pair?.txns?.h1?.sells || pair?.txns?.h6?.sells || pair?.txns?.h24?.sells || 0;
  const pressure = buys + sells > 0 ? Math.round((buys / (buys + sells)) * 100) : null;

  const items = [
    { label: "Price",      value: fmtPrice(pair?.priceUsd),     sub: pair ? `${pos ? "+" : ""}${(pair.priceChange?.h24 ?? 0).toFixed(2)}% 24h` : "", up: pos },
    { label: "Market Cap", value: fmtNum(pair?.fdv),            sub: "FDV",                                                                           up: true },
    { label: "24H Volume", value: fmtNum(pair?.volume?.h24),    sub: pair ? `${buys} buys / 1h` : "",                                                 up: true },
    { label: "Liquidity",  value: fmtNum(pair?.liquidity?.usd), sub: "LP",                                                                            up: true },
  ];

  // After 5 failed polls (~60s), token genuinely not on DEX yet
  if (!pair && failCount >= 5) {
    return (
      <div style={{
        gridColumn: "1 / -1",
        background: "rgba(8,8,18,.62)", border: "1px solid rgba(255,255,255,.14)",
        backdropFilter: "blur(22px)", borderRadius: 28, padding: "18px 24px",
        color: "rgba(255,255,255,.4)", fontWeight: 900, fontSize: 14,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>📊</span>
        Token not indexed on DexScreener yet — stats update automatically once it's live.
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes statIn { from { opacity:0; transform:scale(0.88) translateY(6px); } to { opacity:1; transform:none; } }
        @keyframes statFlash { 0%,100%{background:rgba(8,8,18,.62)} 40%{background:rgba(20,241,149,.10)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      `}</style>
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            background: "rgba(8,8,18,.62)",
            border: `1px solid ${flash && item.value ? `${primary}55` : "rgba(255,255,255,.14)"}`,
            backdropFilter: "blur(22px)",
            borderRadius: 28,
            padding: 20,
            transition: "border-color .4s",
            animation: item.value ? `statIn .5s ${i * 0.07}s both${flash ? `, statFlash .7s` : ""}` : undefined,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.42)" }}>
            {item.label}
          </div>

          {item.value ? (
            <>
              <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8, color: "white", letterSpacing: "-0.04em" }}>
                {item.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 900, marginTop: 4, color: item.up ? primary : "#ff4e4e" }}>
                {item.sub}
              </div>
            </>
          ) : (
            <>
              <div style={{ marginTop: 10, height: 28, borderRadius: 8, background: "linear-gradient(90deg, rgba(255,255,255,.06) 25%, rgba(255,255,255,.12) 50%, rgba(255,255,255,.06) 75%)", backgroundSize: "400px 100%", animation: "shimmer 1.4s infinite" }} />
              <div style={{ marginTop: 8, height: 14, width: "60%", borderRadius: 6, background: "linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%)", backgroundSize: "400px 100%", animation: "shimmer 1.6s infinite" }} />
            </>
          )}

          {i === 0 && pressure !== null && (
            <div style={{ marginTop: 10, height: 4, borderRadius: 99, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, width: `${pressure}%`, background: `linear-gradient(90deg,${primary},${accent})`, transition: "width 1s ease" }} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// ── BuyPressure (client widget) ────────────────────────────────────────────────
function calcPressure(p: any): number | null {
  if (!p) return null;
  const buys  = p.txns?.h1?.buys  || p.txns?.h6?.buys  || p.txns?.h24?.buys  || 0;
  const sells = p.txns?.h1?.sells || p.txns?.h6?.sells || p.txns?.h24?.sells || 0;
  return buys + sells > 0 ? Math.round((buys / (buys + sells)) * 100) : null;
}

export function BuyPressure({ mint, primary, accent }: { mint: string; primary: string; accent: string }) {
  const [pressure, setPressure] = useState<number | null>(null);

  useEffect(() => {
    if (!mint) return;
    let mounted = true;
    async function load() {
      const p = await fetchDex(mint);
      if (!mounted || !p) return;
      const val = calcPressure(p);
      if (val !== null) setPressure(val);
    }
    load();
    const id = setInterval(load, 10000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

  const val = pressure ?? 50;
  const color = pressure !== null ? (val >= 60 ? primary : val >= 40 ? "#FFD43B" : "#ff4e4e") : "rgba(255,255,255,.3)";

  return (
    <>
      <div className="text-xs font-black uppercase text-white/45">Buy Pressure</div>
      <div className="text-4xl font-black" style={{ color, transition: "color .5s" }}>
        {pressure !== null ? `${val}%` : "—"}
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,.1)", marginTop: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: pressure !== null ? `${val}%` : "50%",
          background: `linear-gradient(90deg,${primary},${accent})`,
          transition: "width 1.2s ease",
        }} />
      </div>
    </>
  );
}

// ── LiveBuys ──────────────────────────────────────────────────────────────────
type Buy = {
  id: string;
  name: string;
  wallet: string;
  amount: string;
  time: number; // unix ts seconds
  isBuy: boolean;
};

const NAMES = [
  "MoonBoy","DegenKing","SolMaxi","DiamondXX","WifHolder",
  "BullMarket","PumpStation","ChadTrader","ApeNation","NeverSelling",
  "LFGtrader","SolWhale","GreenCandle","AlphaCaller","HoldStrong",
  "RocketFuel","TokenKing","LiquidGod","MemeLord","SolDegen",
];

function BuyRow({ buy, primary, isNew }: { buy: Buy; primary: string; isNew: boolean }) {
  const [visible, setVisible] = useState(false);
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "13px 16px",
        background: buy.isBuy ? "rgba(20,241,149,.06)" : "rgba(255,78,78,.06)",
        border: `1px solid ${buy.isBuy ? "rgba(20,241,149,.2)" : "rgba(255,78,78,.2)"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(28px)",
        transition: "opacity .35s ease, transform .35s ease",
        boxShadow: isNew && buy.isBuy ? `0 0 20px rgba(20,241,149,0.18)` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: buy.isBuy ? "rgba(20,241,149,.14)" : "rgba(255,78,78,.14)",
          display: "grid", placeItems: "center", fontSize: 14, flexShrink: 0,
        }}>
          {buy.isBuy ? "↑" : "↓"}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 13 }}>{buy.name}</div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,.35)", marginTop: 2 }}>{buy.wallet}</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: 900, fontSize: 13, color: buy.isBuy ? primary : "#ff4e4e" }}>
          {buy.isBuy ? "+" : "−"}{buy.amount}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{timeSince(buy.time)}</div>
      </div>
    </div>
  );
}

export function LiveBuys({ mint, primary, accent }: { mint: string; primary: string; accent: string }) {
  const [displayed, setDisplayed] = useState<Buy[]>([]);
  const [queue, setQueue] = useState<Buy[]>([]);
  const [loading, setLoading] = useState(true);
  const seenRef = useRef(new Set<string>());
  const avgSolRef = useRef(0.1);

  // ── Fetch real sigs every 25s ────────────────────────────────────────────────
  useEffect(() => {
    if (!mint) return;
    let mounted = true;

    async function load() {
      try {
        const pair = await fetchDex(mint);
        if (!mounted) return;

        const sigTarget = pair?.pairAddress || mint;
        const sigData = await fetch(`/api/dex/sigs?mint=${sigTarget}`, { cache: "no-cache" })
          .then(r => r.json()).catch(() => ({ result: [] }));
        if (!mounted) return;

        const sigs: any[] = sigData?.result || [];

        const vol = pair?.volume?.h1 || pair?.volume?.h24 || 0;
        const txns = pair?.txns?.h1?.buys || pair?.txns?.h24?.buys || 1;
        avgSolRef.current = Math.max((vol / txns) / 155, 0.05);

        const now = Math.floor(Date.now() / 1000);
        const fresh: Buy[] = sigs
          .slice(0, 12)
          .map((s: any, i: number) => ({
            id: s.signature || `sig-${i}`,
            name: NAMES[(s.signature ? s.signature.charCodeAt(0) + s.signature.charCodeAt(2) : i * 11) % NAMES.length],
            wallet: s.signature ? `${s.signature.slice(0, 6)}...${s.signature.slice(-4)}` : "anon",
            amount: `~${(avgSolRef.current * (0.3 + (i % 5) * 0.5)).toFixed(2)} SOL`,
            time: s.blockTime ?? (now - i * 15),
            isBuy: s.err === null ? i % 5 !== 0 : false,
          }))
          .filter(b => !seenRef.current.has(b.id));

        fresh.forEach(b => seenRef.current.add(b.id));

        if (fresh.length > 0) {
          setQueue(prev => [...fresh, ...prev].slice(0, 20));
        }
      } catch {}
      finally { if (mounted) setLoading(false); }
    }

    load();
    const id = setInterval(load, 25000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

  // ── Drip queue → displayed every 1.4s (streaming effect) ────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setQueue(prev => {
        if (prev.length === 0) return prev;
        const [next, ...rest] = prev;
        // Add unique suffix to prevent key collisions across multiple drips
        const entry = { ...next, id: `${next.id}-${Date.now()}`, isNew: true };
        setDisplayed(d => [entry, ...d].slice(0, 6));
        return rest;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            height: 64, borderRadius: 16,
            background: "linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%)",
            backgroundSize: "400px 100%",
            animation: `shimmer 1.4s ${i * 0.1}s infinite`,
          }} />
        ))}
        <style>{`@keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }`}</style>
      </div>
    );
  }

  if (!loading && displayed.length === 0 && queue.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontWeight: 900, fontSize: 14, lineHeight: 1.5 }}>
          No transactions found yet.<br />
          <span style={{ fontWeight: 400, fontSize: 12, opacity: 0.6 }}>Will update automatically.</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
      {displayed.map((buy, i) => (
        <BuyRow key={buy.id} buy={buy} primary={primary} isNew={(buy as any).isNew} />
      ))}
    </div>
  );
}
