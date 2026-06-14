import { supabase } from "@/lib/supabase";
import { LiveStats, LiveBuys, BuyPressure } from "@/components/site/LiveDexPanel";

type PageProps = { params: Promise<{ slug: string }> };

function safeArray(value: any, fallback: any[]) {
  return Array.isArray(value) && value.length ? value : fallback;
}

async function fetchPairData(mint: string): Promise<any> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
      { next: { revalidate: 30 } }
    );
    const data = await res.json();
    return data?.pairs?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function GeneratedSitePage({ params }: PageProps) {
  const { slug } = await params;

  const { data } = await supabase
    .from("generated_sites")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white grid place-items-center">
        <h1 className="text-4xl font-black">Site not found</h1>
      </main>
    );
  }

  const content = data.content || {};
  const theme = data.theme || {};
  const images = data.images || {};

  const palette = content.palette || {};
  const primary = palette.primary || theme.primary || "#14F195";
  const secondary = palette.secondary || theme.secondary || "#9945FF";
  const accent = palette.accent || theme.accent || "#FF4ECD";

  const heroImg = images.hero || "";
  const communityImg = images.community || "";

  const bg =
    palette.background ||
    theme.background ||
    `radial-gradient(circle at 20% 0%, ${secondary}55, transparent 36%), radial-gradient(circle at 80% 10%, ${primary}30, transparent 34%), linear-gradient(135deg,#050509,#16051f)`;

  const hero = content.hero || {};
  const about = content.about || {};
  const community = content.community || {};
  const socials = content.socials || {};

  const tokenomics = safeArray(content.tokenomics, [
    { label: "Liquidity", value: "60%" },
    { label: "Community", value: "20%" },
    { label: "Marketing", value: "10%" },
    { label: "Airdrops", value: "10%" },
  ]);

  const security = safeArray(content.security, [
    { label: "Mint Authority", value: "Revoked" },
    { label: "Tax", value: "0%" },
    { label: "Supply", value: "1B" },
    { label: "LP", value: "Locked" },
  ]);

  const roadmap = safeArray(content.roadmap, [
    { phase: "Phase 01", title: "Launch", text: "Token goes live and the first community forms." },
    { phase: "Phase 02", title: "Meme War", text: "Raids, memes, content and viral energy." },
    { phase: "Phase 03", title: "Listings", text: "Chart visibility, community growth and partnerships." },
    { phase: "Phase 04", title: "Domination", text: "The meme spreads across Solana." },
  ]);

  const howToBuy = safeArray(content.howToBuy, [
    "Get SOL on any exchange",
    "Install Phantom or Backpack",
    `Swap SOL for $${data.symbol} on Jupiter`,
    "Hold and join the community",
  ]);

  // Pair address for chart embed (server-side fetch — if it fails, chart falls back to mint)
  let pairAddress = "";
  if (data.mint) {
    try {
      const pd = await fetchPairData(data.mint);
      pairAddress = pd?.pairAddress || "";
    } catch {}
  }

  // embed=1 + trades=0 + info=0 → mostra solo il grafico prezzo
  const chartSrc = pairAddress
    ? `https://dexscreener.com/solana/${pairAddress}?embed=1&theme=dark&trades=0&info=0`
    : data.mint
    ? `https://dexscreener.com/solana/${data.mint}?embed=1&theme=dark&trades=0&info=0`
    : null;

  const socialLinks = [
    { label: "𝕏 Twitter", href: socials.twitter },
    { label: "✈️ Telegram", href: socials.telegram },
    { label: "🌐 Website", href: socials.website },
    { label: "💬 Discord", href: socials.discord },
    {
      label: "📊 Dexscreener",
      href: data.mint ? `https://dexscreener.com/solana/${data.mint}` : null,
    },
  ].filter((s) => s.href);

  return (
    <main className="min-h-screen text-white overflow-hidden" style={{ background: "#030306" }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-24px) rotate(2deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(18px) rotate(-3deg)} }
        @keyframes pulse { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        .glass {
          background:rgba(8,8,18,.62);
          border:1px solid rgba(255,255,255,.14);
          backdrop-filter:blur(22px);
          box-shadow:0 30px 120px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.08);
        }
        .mega { text-shadow:0 0 30px ${primary}55,0 0 80px ${secondary}44; }
      `}</style>

      {/* ── Background ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: heroImg
              ? `linear-gradient(180deg,rgba(3,3,6,.45) 0%,rgba(3,3,6,.92) 60%),url(${heroImg}) center/cover`
              : bg,
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(circle at center,black,transparent 78%)",
          }}
        />
        <div className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full blur-[130px]" style={{ background: primary, opacity: 0.22 }} />
        <div className="absolute top-1/4 -right-44 w-[680px] h-[680px] rounded-full blur-[150px]" style={{ background: secondary, opacity: 0.18 }} />
        <div className="absolute bottom-0 left-1/3 w-[460px] h-[460px] rounded-full blur-[120px]" style={{ background: accent, opacity: 0.14 }} />
      </div>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <nav className="relative z-20 px-5 py-4">
        <div className="max-w-7xl mx-auto glass rounded-full px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {data.logo_url ? (
              <img src={data.logo_url} alt={data.token_name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20" />
            ) : (
              <div className="w-12 h-12 rounded-full grid place-items-center text-2xl" style={{ background: `linear-gradient(135deg,${primary},${accent})` }}>🚀</div>
            )}
            <div>
              <div className="font-black leading-none">{data.token_name}</div>
              <div className="text-xs opacity-55 font-black">${data.symbol}</div>
            </div>
          </div>

          <div className="hidden md:flex gap-5 text-xs font-black uppercase tracking-widest text-white/55">
            <a href="#chart" className="hover:text-white transition-colors">Chart</a>
            <a href="#about" className="hover:text-white transition-colors">Lore</a>
            <a href="#tokenomics" className="hover:text-white transition-colors">Tokenomics</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>

          <a
            href={data.mint ? `https://dexscreener.com/solana/${data.mint}` : "#"}
            target="_blank"
            className="px-5 py-3 rounded-full font-black text-black text-sm"
            style={{ background: `linear-gradient(135deg,${primary},${accent})` }}
          >
            BUY ${data.symbol}
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 pt-10 pb-8 min-h-[88vh] grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
        <div className="relative min-w-0">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-black uppercase tracking-widest mb-6"
            style={{ color: primary }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: primary, animation: "pulse 1.4s infinite" }} />
            {hero.badge || "LIVE ON SOLANA"}
          </div>

          <h1
            className="mega font-black mb-7"
            style={{
              fontSize: "clamp(36px, 4.8vw, 88px)",
              lineHeight: 0.88,
              letterSpacing: "-0.06em",
            }}
          >
            {hero.titleLine1 || data.token_name}
            <br />
            <span style={{ color: primary }}>{hero.titleLine2 || "GOES WILD"}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/70 leading-relaxed max-w-2xl mb-8">
            {hero.subtitle || data.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-7">
            <a
              href="#chart"
              className="px-7 py-5 rounded-2xl font-black text-black text-lg"
              style={{ background: `linear-gradient(135deg,${primary},${accent})`, boxShadow: `0 22px 70px ${primary}55` }}
            >
              📊 VIEW LIVE CHART
            </a>
            <a
              href={data.mint ? `https://dexscreener.com/solana/${data.mint}` : "#"}
              target="_blank"
              className="px-7 py-5 rounded-2xl font-black text-lg glass"
            >
              ⚡ BUY ${data.symbol}
            </a>
          </div>

          {data.mint && (
            <div className="glass inline-flex max-w-full px-4 py-3 rounded-2xl text-xs sm:text-sm text-white/50 break-all font-mono">
              CA: {data.mint}
            </div>
          )}
        </div>

        {/* Hero visual */}
        <div className="relative min-h-[580px]">
          <div className="absolute inset-0 rounded-[48px] glass overflow-hidden">
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center,${primary}33,transparent 48%)` }} />
            <div className="absolute inset-x-0 top-0 h-1/2 opacity-20" style={{ background: `linear-gradient(180deg,${secondary},transparent)`, animation: "scan 7s linear infinite" }} />

            {heroImg && (
              <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="glass rounded-[28px] p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
                    {hero.slogan || `$${data.symbol}`}
                  </div>
                  <div className="text-xl font-black tracking-[-.04em] leading-tight">
                    {data.token_name} · Solana
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs font-black uppercase text-white/45">Community</div>
                  <div className="text-xl font-black" style={{ color: accent }}>🔥 LIVE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo floating */}
          <div
            className="absolute -left-4 top-10 w-32 h-32 lg:w-44 lg:h-44 rounded-[32px] ring-4 ring-white/20 shadow-2xl overflow-hidden"
            style={{ animation: "floatA 4.5s ease-in-out infinite", flexShrink: 0 }}
          >
            {data.logo_url ? (
              <img src={data.logo_url} alt={data.token_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-6xl font-black" style={{ background: `linear-gradient(135deg,${primary},${accent})` }}>
                {data.symbol?.[0] || "?"}
              </div>
            )}
          </div>

          {/* Buy Pressure */}
          <div className="absolute right-3 top-16 glass rounded-[28px] p-5 w-48" style={{ animation: "floatB 5s ease-in-out infinite" }}>
            {data.mint ? (
              <BuyPressure mint={data.mint} primary={primary} accent={accent} />
            ) : (
              <>
                <div className="text-xs font-black uppercase text-white/45">Buy Pressure</div>
                <div className="text-4xl font-black" style={{ color: primary }}>—</div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────────── */}
      <section className="relative z-10 px-5 pb-8">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-black/70 py-5">
          <div
            className="flex gap-16 whitespace-nowrap text-4xl sm:text-5xl font-black tracking-[-.06em]"
            style={{ animation: "ticker 22s linear infinite", color: primary }}
          >
            {["BUY", "HOLD", "MOON", "SOLANA", "DEGEN", "LFG", "WAGMI", "GEM"].flatMap((w, i) => [
              <span key={`a${i}`}>${data.symbol} {w} ✦</span>,
              <span key={`b${i}`}>${data.symbol} {w} ✦</span>,
            ])}
          </div>
        </div>
      </section>

      {/* ── Live Stats — solo se c'è il mint ─────────────────────── */}
      {data.mint && (
        <section className="relative z-10 max-w-7xl mx-auto px-5 pb-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LiveStats mint={data.mint} primary={primary} accent={accent} />
        </section>
      )}

      {/* ── Chart + Live Buys — solo se c'è il mint ─────────────── */}
      {data.mint && (
        <section id="chart" className="relative z-10 max-w-7xl mx-auto px-5 pb-8 grid lg:grid-cols-[1fr_.42fr] gap-5">
          <div className="glass rounded-[38px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em]">${data.symbol} LIVE CHART</h2>
                <p className="text-white/45 text-sm mt-1">Powered by DexScreener</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-black text-sm" style={{ color: primary }}>
                <span className="w-2 h-2 rounded-full" style={{ background: primary, animation: "pulse 1.2s infinite" }} />
                LIVE
              </div>
            </div>

            {chartSrc ? (
              <iframe
                src={chartSrc}
                className="w-full h-[580px] rounded-[28px] bg-black border border-white/10"
                title={`${data.token_name} chart`}
              />
            ) : (
              <div className="h-[580px] rounded-[28px] glass grid place-items-center text-center px-8">
                <div>
                  <div className="text-5xl mb-4">📊</div>
                  <div className="text-white/60 font-black text-lg">Chart loading — pair not indexed yet.</div>
                  <div className="text-white/35 text-sm mt-2 font-black">CA: {data.mint}</div>
                </div>
              </div>
            )}
          </div>

          <div className="glass rounded-[38px] p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl sm:text-3xl font-black tracking-[-.04em]">LIVE BUYS</h3>
              <span className="text-xs font-black px-2 py-1 rounded-full" style={{ background: `${primary}22`, color: primary, border: `1px solid ${primary}44` }}>
                LIVE
              </span>
            </div>
            <LiveBuys mint={data.mint} primary={primary} accent={accent} />
          </div>
        </section>
      )}

      {/* ── About / Lore ─────────────────────────────────────────── */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-5 pb-8 grid lg:grid-cols-[.85fr_1fr] gap-5">
        <div className="glass rounded-[38px] overflow-hidden relative min-h-[420px]">
          <div className="absolute inset-0">
            {communityImg ? (
              <img src={communityImg} alt="" className="w-full h-full object-cover opacity-75" />
            ) : (
              <div className="w-full h-full" style={{ background: `radial-gradient(circle at 30% 20%,${accent}55,transparent 35%),radial-gradient(circle at 80% 70%,${primary}44,transparent 40%)` }} />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-7">
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: primary }}>AI VISUAL WORLD</div>
            <h2 className="text-5xl font-black tracking-[-.06em]">Built around the meme.</h2>
          </div>
        </div>

        <div className="glass rounded-[38px] p-8">
          <div className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: accent }}>LORE</div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-[-.07em] leading-[.88] mb-6">
            {about.title || `The ${data.token_name} Lore`}
          </h2>
          <p className="text-xl text-white/65 leading-relaxed">
            {about.text || data.description}
          </p>
        </div>
      </section>

      {/* ── Tokenomics + Security ────────────────────────────────── */}
      <section id="tokenomics" className="relative z-10 max-w-7xl mx-auto px-5 pb-8 grid lg:grid-cols-[1fr_.8fr] gap-5">
        <div className="glass rounded-[38px] p-8">
          <h2 className="text-6xl font-black tracking-[-.07em] mb-7">TOKENOMICS</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tokenomics.map((item: any, i: number) => (
              <div key={i} className="rounded-[28px] p-6 bg-white/8 border border-white/10 relative overflow-hidden">
                <div className="absolute -right-7 -bottom-9 text-[120px] font-black opacity-5">{item.value}</div>
                <div className="text-xs font-black uppercase tracking-widest text-white/45">{item.label}</div>
                <div className="text-5xl font-black mt-3" style={{ color: i % 2 ? accent : primary }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[38px] p-8">
          <h2 className="text-5xl font-black tracking-[-.06em] mb-7">SECURITY</h2>
          <div className="grid gap-4">
            {security.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between rounded-2xl p-5 bg-black/35 border border-white/10">
                <span className="text-white/55 font-black">{item.label}</span>
                <span className="text-2xl font-black" style={{ color: i % 2 ? accent : primary }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ──────────────────────────────────────────────── */}
      <section id="roadmap" className="relative z-10 max-w-7xl mx-auto px-5 pb-8">
        <div className="glass rounded-[42px] p-8">
          <h2 className="text-6xl sm:text-8xl font-black tracking-[-.08em] mb-9">
            ROAD<span style={{ color: primary }}>MAP</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {roadmap.map((r: any, i: number) => (
              <div key={i} className="rounded-[30px] p-6 bg-white/8 border border-white/10 relative overflow-hidden min-h-[260px]">
                <div className="absolute -right-5 -top-7 text-[150px] opacity-5 font-black">{i + 1}</div>
                <div className="w-14 h-14 rounded-2xl grid place-items-center text-black font-black text-xl mb-6" style={{ background: i % 2 ? accent : primary }}>
                  {i + 1}
                </div>
                <div className="text-xs uppercase tracking-widest font-black text-white/40">{r.phase}</div>
                <h3 className="text-2xl font-black tracking-[-.04em] my-2">{r.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────────────── */}
      <section id="community" className="relative z-10 max-w-7xl mx-auto px-5 pb-14 grid lg:grid-cols-[1fr_.7fr] gap-5">
        <div className="glass rounded-[42px] p-8">
          <div className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: primary }}>COMMUNITY</div>
          <h2 className="text-6xl sm:text-8xl font-black tracking-[-.08em] leading-[.86] mb-6">
            {community.title || `JOIN THE $${data.symbol} ARMY`}
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            {community.text || `Memes, raids, holders and timeline energy. $${data.symbol} belongs to the community.`}
          </p>

          <div className="flex flex-wrap gap-3">
            {socialLinks.length > 0
              ? socialLinks.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-2xl font-black text-black flex items-center gap-2 text-sm"
                    style={{ background: i % 2 ? accent : primary }}
                  >
                    {s.label}
                  </a>
                ))
              : ["𝕏 Twitter", "✈️ Telegram", "📊 Dexscreener"].map((x, i) => (
                  <span
                    key={x}
                    className="px-6 py-4 rounded-2xl font-black text-black opacity-50 text-sm"
                    style={{ background: i % 2 ? accent : primary }}
                  >
                    {x}
                  </span>
                ))}
          </div>
        </div>

        <div className="glass rounded-[42px] p-8">
          <h3 className="text-3xl sm:text-4xl font-black tracking-[-.05em] mb-7">HOW TO BUY</h3>
          <div className="grid gap-5">
            {howToBuy.map((step: string, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full grid place-items-center text-black font-black text-xl flex-shrink-0"
                  style={{ background: i % 2 ? accent : primary }}
                >
                  {i + 1}
                </div>
                <div className="font-black text-lg leading-tight">{step}</div>
              </div>
            ))}
          </div>

          <a
            href={data.mint ? `https://dexscreener.com/solana/${data.mint}` : "#"}
            target="_blank"
            className="mt-9 block text-center px-6 py-5 rounded-2xl font-black text-black text-lg"
            style={{ background: `linear-gradient(135deg,${primary},${accent})` }}
          >
            BUY ${data.symbol} NOW
          </a>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 px-5 pb-10">
        <div className="max-w-7xl mx-auto glass rounded-[32px] p-6 flex items-center justify-between gap-4 flex-wrap text-sm">
          <div className="text-white/40 font-black">
            {data.token_name} — Built on Solana
          </div>
          <div className="flex gap-4">
            <a href="/" className="text-white/40 hover:text-white font-black transition-colors">SolMint Space</a>
            {data.mint && (
              <a
                href={`https://solscan.io/token/${data.mint}`}
                target="_blank"
                className="text-white/40 hover:text-white font-black transition-colors"
              >
                Solscan
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
