"use client";

import { useEffect, useState } from "react";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/lib/useLang";

const NICHES_BY_LANG: Record<string, string[]> = {
  IT: ["Animali","Politica","Gaming","Crypto/AI","Sport","Cibo","Musica","Film/TV","Meme classici","Sorpresa"],
  EN: ["Animals","Politics","Gaming","Crypto/AI","Sports","Food","Music","Film/TV","Classic Memes","Surprise"],
  ES: ["Animales","Política","Gaming","Crypto/IA","Deportes","Comida","Música","Cine/TV","Memes clásicos","Sorpresa"],
  FR: ["Animaux","Politique","Gaming","Crypto/IA","Sports","Nourriture","Musique","Cinéma/TV","Mèmes classiques","Surprise"],
  PT: ["Animais","Política","Gaming","Crypto/IA","Esportes","Comida","Música","Cinema/TV","Memes clássicos","Surpresa"],
  DE: ["Tiere","Politik","Gaming","Crypto/KI","Sport","Essen","Musik","Film/TV","Klassische Memes","Überraschung"],
};
const TONES_BY_LANG: Record<string, string[]> = {
  IT: ["Divertente","Aggressivo","Wholesome","Ironico","Epico","Cringe"],
  EN: ["Funny","Aggressive","Wholesome","Ironic","Epic","Cringe"],
  ES: ["Divertido","Agresivo","Entrañable","Irónico","Épico","Cringe"],
  FR: ["Drôle","Agressif","Bienveillant","Ironique","Épique","Cringe"],
  PT: ["Engraçado","Agressivo","Gentil","Irônico","Épico","Cringe"],
  DE: ["Lustig","Aggressiv","Herzlich","Ironisch","Episch","Cringe"],
};
const MARKETS_BY_LANG: Record<string, string[]> = {
  IT: ["Globale","Italiano","Americano","Asiatico"],
  EN: ["Global","Italian","American","Asian"],
  ES: ["Global","Italiano","Americano","Asiático"],
  FR: ["Global","Italien","Américain","Asiatique"],
  PT: ["Global","Italiano","Americano","Asiático"],
  DE: ["Global","Italienisch","Amerikanisch","Asiatisch"],
};

const TR = {
  IT: {
    heading1: "Crea una meme coin", heading2: "partendo dai trend.",
    desc: "L'AI analizza i token Solana più caldi e genera nome, ticker, descrizione, logo e strategia di lancio.",
    configBadge: "Configura idea", configTitle: "Scegli il DNA del token",
    nicheQ: "Che nicchia vuoi?", toneQ: "Che tono?", marketQ: "Mercato target?",
    nameQ: "Hai un nome in mente? opzionale", namePh: "es. PizzaCoin, DogeMario...",
    generateBtn: "Genera token con AI",
    howTitle: "Come funziona",
    steps: ["Legge i trend Solana live","Trova una narrativa non satura","Crea nome, ticker e lore","Genera logo e strategia"],
    howNote: "Dopo la generazione puoi mandare il concept direttamente al launcher e creare il token.",
    loadingMsg: "L'AI sta creando un concept pronto per il lancio.",
    resultTitle: "Il tuo token AI", regenerate: "Rigenera",
    copyTicker: "copia ticker", useToken: "Usa questo token — Apri SolMint", backTrend: "Torna ai trend",
  },
  EN: {
    heading1: "Create a meme coin", heading2: "from real trends.",
    desc: "AI analyzes the hottest Solana tokens and generates a name, ticker, description, logo and launch strategy.",
    configBadge: "Configure idea", configTitle: "Choose your token DNA",
    nicheQ: "What niche?", toneQ: "What tone?", marketQ: "Target market?",
    nameQ: "Have a name in mind? optional", namePh: "e.g. PizzaCoin, DogeMario...",
    generateBtn: "Generate token with AI",
    howTitle: "How it works",
    steps: ["Reads live Solana trends","Finds an unsaturated narrative","Creates name, ticker and lore","Generates logo and strategy"],
    howNote: "After generation you can send the concept directly to the launcher and create the token.",
    loadingMsg: "AI is creating a launch-ready concept.",
    resultTitle: "Your AI token", regenerate: "Regenerate",
    copyTicker: "copy ticker", useToken: "Use this token — Open SolMint", backTrend: "Back to trends",
  },
  ES: {
    heading1: "Crea una meme coin", heading2: "desde tendencias reales.",
    desc: "La IA analiza los tokens Solana más calientes y genera nombre, ticker, descripción, logo y estrategia de lanzamiento.",
    configBadge: "Configurar idea", configTitle: "Elige el ADN del token",
    nicheQ: "¿Qué nicho?", toneQ: "¿Qué tono?", marketQ: "¿Mercado objetivo?",
    nameQ: "¿Tienes un nombre en mente? opcional", namePh: "ej. PizzaCoin, DogeMario...",
    generateBtn: "Generar token con IA",
    howTitle: "Cómo funciona",
    steps: ["Lee tendencias Solana en vivo","Encuentra una narrativa no saturada","Crea nombre, ticker y lore","Genera logo y estrategia"],
    howNote: "Después de la generación puedes enviar el concepto directamente al launcher y crear el token.",
    loadingMsg: "La IA está creando un concepto listo para lanzar.",
    resultTitle: "Tu token IA", regenerate: "Regenerar",
    copyTicker: "copiar ticker", useToken: "Usar este token — Abrir SolMint", backTrend: "Volver a tendencias",
  },
  FR: {
    heading1: "Créez une meme coin", heading2: "à partir des tendances.",
    desc: "L'IA analyse les tokens Solana les plus chauds et génère nom, ticker, description, logo et stratégie de lancement.",
    configBadge: "Configurer l'idée", configTitle: "Choisissez l'ADN du token",
    nicheQ: "Quel niche?", toneQ: "Quel ton?", marketQ: "Marché cible?",
    nameQ: "Vous avez un nom en tête? optionnel", namePh: "ex. PizzaCoin, DogeMario...",
    generateBtn: "Générer le token avec l'IA",
    howTitle: "Comment ça marche",
    steps: ["Lit les tendances Solana en direct","Trouve un narratif non saturé","Crée nom, ticker et lore","Génère logo et stratégie"],
    howNote: "Après la génération, envoyez le concept directement au launcher et créez le token.",
    loadingMsg: "L'IA crée un concept prêt au lancement.",
    resultTitle: "Votre token IA", regenerate: "Régénérer",
    copyTicker: "copier ticker", useToken: "Utiliser ce token — Ouvrir SolMint", backTrend: "Retour aux tendances",
  },
  PT: {
    heading1: "Crie uma meme coin", heading2: "a partir das tendências.",
    desc: "A IA analisa os tokens Solana mais quentes e gera nome, ticker, descrição, logo e estratégia de lançamento.",
    configBadge: "Configurar ideia", configTitle: "Escolha o DNA do token",
    nicheQ: "Qual nicho?", toneQ: "Qual tom?", marketQ: "Mercado alvo?",
    nameQ: "Tem um nome em mente? opcional", namePh: "ex. PizzaCoin, DogeMario...",
    generateBtn: "Gerar token com IA",
    howTitle: "Como funciona",
    steps: ["Lê tendências Solana ao vivo","Encontra uma narrativa não saturada","Cria nome, ticker e lore","Gera logo e estratégia"],
    howNote: "Após a geração você pode enviar o conceito diretamente ao launcher e criar o token.",
    loadingMsg: "A IA está criando um conceito pronto para lançar.",
    resultTitle: "Seu token IA", regenerate: "Regenerar",
    copyTicker: "copiar ticker", useToken: "Usar este token — Abrir SolMint", backTrend: "Voltar às tendências",
  },
  DE: {
    heading1: "Erstelle eine Meme Coin", heading2: "aus echten Trends.",
    desc: "Die KI analysiert die heißesten Solana-Token und generiert Name, Ticker, Beschreibung, Logo und Startstrategie.",
    configBadge: "Idee konfigurieren", configTitle: "Wähle die Token-DNA",
    nicheQ: "Welche Nische?", toneQ: "Welcher Ton?", marketQ: "Zielmarkt?",
    nameQ: "Hast du einen Namen im Kopf? optional", namePh: "z.B. PizzaCoin, DogeMario...",
    generateBtn: "Token mit KI generieren",
    howTitle: "So funktioniert es",
    steps: ["Liest Solana-Trends live","Findet eine ungesättigte Narrative","Erstellt Name, Ticker und Lore","Generiert Logo und Strategie"],
    howNote: "Nach der Generierung kannst du das Konzept direkt an den Launcher senden und den Token erstellen.",
    loadingMsg: "Die KI erstellt ein startbereites Konzept.",
    resultTitle: "Dein KI-Token", regenerate: "Neu generieren",
    copyTicker: "Ticker kopieren", useToken: "Diesen Token verwenden — SolMint öffnen", backTrend: "Zurück zu Trends",
  },
} as const;

interface AIResult {
  name: string;
  symbol: string;
  description: string;
  imagePrompt: string;
  imageBase64?: string | null;
  why?: string;
  strategy?: string;
  twist?: string;
}

function PillButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-bold transition-all hover:scale-105"
      style={{
        border: active ? "1px solid rgba(20,241,149,0.35)" : "1px solid rgba(255,255,255,0.1)",
        background: active
          ? "linear-gradient(135deg, rgba(153,69,255,0.95), rgba(20,241,149,0.95))"
          : "rgba(255,255,255,0.045)",
        color: active ? "white" : "rgba(255,255,255,0.62)",
        boxShadow: active ? "0 14px 35px rgba(153,69,255,0.22)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function ResultCard({ result, onUse }: { result: AIResult; onUse: () => void }) {
  const [lang] = useLang();
  const t = TR[lang] ?? TR["EN"];
  const copyTicker = async () => {
    await navigator.clipboard.writeText(`$${result.symbol}`);
  };

  return (
    <div
      className="relative overflow-hidden rounded-[34px] p-6 sm:p-8"
      style={{
        background: "linear-gradient(135deg, rgba(153,69,255,0.12), rgba(20,241,149,0.055))",
        border: "1px solid rgba(153,69,255,0.28)",
        boxShadow: "0 0 80px rgba(153,69,255,0.15)",
      }}
    >
      <div
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(153,69,255,0.22)" }}
      />

      <div className="relative z-10">
        <div className="mb-7 flex flex-col gap-6 sm:flex-row">
          {result.imageBase64 ? (
            <img
              src={result.imageBase64}
              alt={result.name}
              className="h-36 w-36 rounded-[32px] object-cover"
              style={{
                border: "3px solid rgba(153,69,255,0.4)",
                boxShadow: "0 22px 60px rgba(0,0,0,0.35)",
              }}
            />
          ) : (
            <div
              className="flex h-36 w-36 items-center justify-center rounded-[32px] text-5xl font-black text-white"
              style={{
                background: "linear-gradient(135deg, #9945FF, #14F195)",
                boxShadow: "0 22px 60px rgba(153,69,255,0.30)",
              }}
            >
              {result.symbol?.[0] || "?"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "#14F195" }}>
              AI Token Concept
            </p>

            <h2 className="mb-2 text-4xl font-black leading-tight text-white">
              {result.name}
            </h2>

            <button
              onClick={copyTicker}
              className="mb-4 rounded-full px-4 py-2 text-sm font-black transition-all hover:scale-105"
              style={{
                color: "#9945FF",
                background: "rgba(153,69,255,0.09)",
                border: "1px solid rgba(153,69,255,0.2)",
              }}
            >
              ${result.symbol} · {t.copyTicker}
            </button>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
              {result.description}
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          {(result.why || result.twist) && (
            <div
              className="rounded-3xl p-5"
              style={{
                background: "rgba(20,241,149,0.055)",
                border: "1px solid rgba(20,241,149,0.16)",
              }}
            >
              <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "#14F195" }}>
                Viral angle
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                {result.why || result.twist}
              </p>
            </div>
          )}

          {result.strategy && (
            <div
              className="rounded-3xl p-5"
              style={{
                background: "rgba(153,69,255,0.06)",
                border: "1px solid rgba(153,69,255,0.18)",
              }}
            >
              <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "#9945FF" }}>
                Launch strategy
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                {result.strategy}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={onUse}
            className="rounded-2xl border-0 p-4 font-black text-white transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #9945FF, #14F195)",
              boxShadow: "0 20px 50px rgba(153,69,255,0.28)",
            }}
          >
            {t.useToken}
          </button>

          <a
            href="/trending"
            className="rounded-2xl p-4 text-center font-black no-underline transition-all hover:scale-[1.02]"
            style={{
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {t.backTrend}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AIMeme() {
  const [lang] = useLang();
  const t = TR[lang] ?? TR["EN"];
  const NICHES = NICHES_BY_LANG[lang] ?? NICHES_BY_LANG["EN"];
  const TONES = TONES_BY_LANG[lang] ?? TONES_BY_LANG["EN"];
  const MARKETS = MARKETS_BY_LANG[lang] ?? MARKETS_BY_LANG["EN"];

  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState({
    niche: "",
    tone: "",
    market: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const msgs = [
    "Analizzo i trend attuali...",
    "Studio narrativa e momentum...",
    "Creo nome e ticker...",
    "Genero il logo AI...",
    "Preparo la strategia...",
  ];

  const isDisabled =
    !Boolean(answers.niche) ||
    !Boolean(answers.tone) ||
    !Boolean(answers.market) ||
    loading;

  const generate = async () => {
    if (isDisabled) return;

    setLoading(true);
    setError("");
    setResult(null);

    let i = 0;
    setLoadingMsg(msgs[0]);

    const msgInterval = setInterval(() => {
      i = (i + 1) % msgs.length;
      setLoadingMsg(msgs[i]);
    }, 3500);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "meme-idea",
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Errore AI");
      }

      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Errore durante la generazione");
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
    }
  };

  const useToken = () => {
    if (!result) return;

    sessionStorage.setItem(
      "aiTokenDraft",
      JSON.stringify({
        name: result.name || "",
        symbol: result.symbol || "",
        description: result.description || "",
        imageBase64: result.imageBase64 || null,
      })
    );

    window.location.href = "/?app=true";
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#07070f", color: "white" }}>
      <SiteNavbar />

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(153,69,255,0.16) 0%, transparent 38%), radial-gradient(circle at 85% 28%, rgba(20,241,149,0.10) 0%, transparent 34%), radial-gradient(circle at 15% 45%, rgba(153,69,255,0.10) 0%, transparent 32%), linear-gradient(180deg, #07070f 0%, #090914 45%, #050509 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(circle at center, black 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 72%)",
          }}
        />
      </div>

      <section className="relative z-10 px-4 sm:px-6 pt-36 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest"
              style={{
                background: "rgba(153,69,255,0.1)",
                border: "1px solid rgba(153,69,255,0.22)",
                color: "#9945FF",
              }}
            >
              🤖 AI Meme Generator
            </div>

            <h1
              className="mx-auto mb-5 max-w-4xl font-black leading-[0.95]"
              style={{
                fontSize: "clamp(44px, 8vw, 86px)",
                letterSpacing: "-0.055em",
              }}
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

          {!loading && !result && (
            <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
              <div
                className="rounded-[34px] p-5 sm:p-7"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.24)",
                }}
              >
                <div className="mb-6">
                  <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "#14F195" }}>
                    {t.configBadge}
                  </p>
                  <h2 className="text-2xl font-black text-white">{t.configTitle}</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.34)" }}>
                      {t.nicheQ}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {NICHES.map(n => (
                        <PillButton
                          key={n}
                          active={answers.niche === n}
                          onClick={() => setAnswers(a => ({ ...a, niche: n }))}
                        >
                          {n}
                        </PillButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.34)" }}>
                      {t.toneQ}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map(t => (
                        <PillButton
                          key={t}
                          active={answers.tone === t}
                          onClick={() => setAnswers(a => ({ ...a, tone: t }))}
                        >
                          {t}
                        </PillButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.34)" }}>
                      {t.marketQ}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {MARKETS.map(m => (
                        <PillButton
                          key={m}
                          active={answers.market === m}
                          onClick={() => setAnswers(a => ({ ...a, market: m }))}
                        >
                          {m}
                        </PillButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.34)" }}>
                      {t.nameQ}
                    </p>
                    <input
                      placeholder={t.namePh}
                      value={answers.name}
                      onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                      className="w-full rounded-2xl px-4 py-4 text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.055)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  {error && (
                    <div
                      className="rounded-2xl p-4 text-sm"
                      style={{
                        background: "rgba(255,60,60,0.08)",
                        border: "1px solid rgba(255,60,60,0.2)",
                        color: "#ff6b6b",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    onClick={generate}
                    disabled={isDisabled}
                    className="w-full rounded-2xl border-0 p-5 text-base font-black text-white transition-all hover:scale-[1.01]"
                    style={{
                      background: isDisabled
                        ? "rgba(255,255,255,0.06)"
                        : "linear-gradient(135deg, #9945FF, #14F195)",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      boxShadow: !isDisabled ? "0 0 55px rgba(153,69,255,0.28)" : "none",
                      opacity: isDisabled ? 0.45 : 1,
                    }}
                  >
                    {t.generateBtn}
                  </button>
                </div>
              </div>

              <aside
                className="rounded-[34px] p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(153,69,255,0.10), rgba(20,241,149,0.045))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="mb-3 text-xs font-black uppercase tracking-widest" style={{ color: "#9945FF" }}>
                  {t.howTitle}
                </p>

                <div className="space-y-4">
                  {t.steps.map((text, idx) => {
                    const n = String(idx + 1).padStart(2, "0");
                    return (
                    <div key={n} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black"
                        style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
                      >
                        {n}
                      </span>
                      <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.72)" }}>
                        {text}
                      </span>
                    </div>
                  );
                  })}
                </div>

                <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {t.howNote}
                </p>
              </aside>
            </div>
          )}

          {loading && (
            <div className="mx-auto max-w-xl py-20 text-center">
              <div
                className="mx-auto mb-8 h-24 w-24 rounded-full"
                style={{
                  border: "3px solid rgba(153,69,255,0.2)",
                  borderTop: "3px solid #9945FF",
                  animation: "spin 1s linear infinite",
                }}
              />

              <p className="mb-2 text-xl font-black text-white">{loadingMsg}</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                {t.loadingMsg}
              </p>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {result && !loading && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-white">{t.resultTitle}</h2>

                <button
                  onClick={() => {
                    setResult(null);
                    setError("");
                  }}
                  className="rounded-2xl px-4 py-2 text-sm font-black transition-all hover:scale-105"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.055)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {t.regenerate}
                </button>
              </div>

              <ResultCard result={result} onUse={useToken} />
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}