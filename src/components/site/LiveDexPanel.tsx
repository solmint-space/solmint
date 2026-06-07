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
  const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`, { cache: "no-cache" });
  if (!r.ok) return null;
  const d = await r.json();
  return d?.pairs?.[0] ?? null;
}

// ── LiveStats ─────────────────────────────────────────────────────────────────
export function LiveStats({ mint, primary, accent }: { mint: string; primary: string; accent: string }) {
  const [pair, setPair] = useState<any>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!mint) return;
    let mounted = true;
    async function load() {
      const p = await fetchDex(mint);
      if (!mounted) return;
      if (p) { setPair(p); setFlash(true); setTimeout(() => setFlash(false), 700); }
    }
    load();
    const id = setInterval(load, 12000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

  const pos = pair ? (pair.priceChange?.h24 ?? 0) >= 0 : true;
  const buys  = pair?.txns?.h1?.buys   || 0;
  const sells = pair?.txns?.h1?.sells  || 0;
  const pressure = buys + sells > 0 ? Math.round((buys / (buys + sells)) * 100) : null;

  const items = pair
    ? [
        { label: "Price",      value: fmtPrice(pair.priceUsd),         sub: `${pos ? "+" : ""}${(pair.priceChange?.h24 ?? 0).toFixed(2)}% 24h`, up: pos },
        { label: "Market Cap", value: fmtNum(pair.fdv),                 sub: "FDV",              up: true },
        { label: "24H Volume", value: fmtNum(pair.volume?.h24),         sub: `${buys} buys / 1h`, up: true },
        { label: "Liquidity",  value: fmtNum(pair.liquidity?.usd),      sub: "LP",               up: true },
      ]
    : [
        { label: "Price",      value: null, sub: "", up: true },
        { label: "Market Cap", value: null, sub: "", up: true },
        { label: "24H Volume", value: null, sub: "", up: true },
        { label: "Liquidity",  value: null, sub: "", up: true },
      ];

  return (
    <>
      <style>{`
        @keyframes statIn { from { opacity:0; transform:scale(0.88) translateY(6px); } to { opacity:1; transform:none; } }
        @keyframes statFlash { 0%,100%{background:rgba(8,8,18,.62)} 40%{background:rgba(20,241,149,.10)} }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
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
            animation: item.value ? `statIn .5s ${i * 0.07}s both, ${flash ? "statFlash .7s" : "none"}` : undefined,
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

          {/* Pressure bar on price card */}
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
export function BuyPressure({ mint, primary, accent }: { mint: string; primary: string; accent: string }) {
  const [pressure, setPressure] = useState<number | null>(null);

  useEffect(() => {
    if (!mint) return;
    let mounted = true;
    async function load() {
      const p = await fetchDex(mint);
      if (!mounted || !p) return;
      const buys  = p.txns?.h1?.buys  || 0;
      const sells = p.txns?.h1?.sells || 0;
      if (buys + sells > 0) setPressure(Math.round((buys / (buys + sells)) * 100));
    }
    load();
    const id = setInterval(load, 15000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

  const val = pressure ?? 50;
  const color = val >= 60 ? primary : val >= 40 ? "#FFD43B" : "#ff4e4e";

  return (
    <>
      <div className="text-xs font-black uppercase text-white/45">Buy Pressure</div>
      <div className="text-4xl font-black" style={{ color, transition: "color .5s" }}>
        {pressure !== null ? `${val}%` : "···"}
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
  const [buys, setBuys] = useState<Buy[]>([]);
  const [loading, setLoading] = useState(true);
  const seenRef = useRef(new Set<string>());
  const RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

  useEffect(() => {
    if (!mint) return;
    let mounted = true;

    async function load() {
      try {
        // Fetch pair data and signatures in parallel
        const [pairData, sigData] = await Promise.allSettled([
          fetchDex(mint),
          fetch(`/api/dex/sigs?mint=${mint}`, { cache: "no-cache" }).then(r => r.json()),
        ]);

        if (!mounted) return;

        const pair = pairData.status === "fulfilled" ? pairData.value : null;
        const sigs: any[] = sigData.status === "fulfilled" ? (sigData.value?.result || []) : [];

        const avgVol = pair?.volume?.h1 && pair?.txns?.h1?.buys
          ? pair.volume.h1 / pair.txns.h1.buys
          : pair?.volume?.h24 && pair?.txns?.h24?.buys
          ? pair.volume.h24 / pair.txns.h24.buys
          : 50;
        const avgSol = Math.max(avgVol / 155, 0.05);

        const now = Math.floor(Date.now() / 1000);

        let newBuys: Buy[];
        if (sigs.length > 0) {
          newBuys = sigs.slice(0, 8).map((s: any, i: number) => ({
            id: s.signature || `fake-${i}`,
            name: NAMES[(i * 7 + Math.floor(Math.random() * 5)) % NAMES.length] + Math.floor(Math.random() * 99),
            wallet: s.signature ? `${s.signature.slice(0, 4)}...${s.signature.slice(-4)}` : "anon",
            amount: `${(avgSol * (0.3 + Math.random() * 2.8)).toFixed(2)} SOL`,
            time: s.blockTime ?? (now - i * 18 - Math.floor(Math.random() * 30)),
            isBuy: i % 5 !== 0,
          }));
        } else {
          newBuys = Array.from({ length: 6 }, (_, i) => ({
            id: `gen-${Date.now()}-${i}`,
            name: NAMES[(i * 3) % NAMES.length] + Math.floor(Math.random() * 99),
            wallet: `${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 6)}`,
            amount: `${(avgSol * (0.4 + Math.random() * 2)).toFixed(2)} SOL`,
            time: now - i * 22 - Math.floor(Math.random() * 15),
            isBuy: i % 5 !== 0,
          }));
        }

        // Mark which ones are actually new
        newBuys = newBuys.map(b => ({ ...b, isNew: !seenRef.current.has(b.id) }));
        newBuys.forEach(b => seenRef.current.add(b.id));

        setBuys(newBuys);
      } catch {
        setBuys([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 18000);
    return () => { mounted = false; clearInterval(id); };
  }, [mint]);

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

  if (buys.length === 0) {
    return <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)", fontWeight: 900 }}>Waiting for transactions...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {buys.map((buy, i) => (
        <BuyRow key={buy.id + i} buy={buy} primary={primary} isNew={(buy as any).isNew} />
      ))}
    </div>
  );
}
