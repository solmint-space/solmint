"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/lib/useLang";
import type { Guide } from "@/data/guides";
import { getGuideTitle, getGuideDesc, getGuideContent, type GuideLang } from "@/data/guidesI18n";

const catColors: Record<string, string> = {
  Basics: "#9945FF",
  Tutorial: "#14F195",
  Sicurezza: "#ff6b6b",
  Marketing: "#FFD700",
  Strategia: "#00D4AA",
  Educazione: "#b57bff",
};

const T = {
  IT: { back: "← Torna alle guide", readTime: "di lettura", related: "Guide correlate", readyCta: "Pronto a creare il tuo token?", readyDesc: "Metti in pratica quello che hai imparato. Crea il token, cura i metadata e prepara il lancio.", readyBtn: "Lancia il tuo token", cats: { Basics: "Basi", Tutorial: "Tutorial", Sicurezza: "Sicurezza", Marketing: "Marketing", Strategia: "Strategia", Educazione: "Educazione" } },
  EN: { back: "← Back to guides", readTime: "read", related: "Related guides", readyCta: "Ready to create your token?", readyDesc: "Put what you've learned into practice. Create the token, manage the metadata and prepare the launch.", readyBtn: "Launch your token", cats: { Basics: "Basics", Tutorial: "Tutorial", Sicurezza: "Security", Marketing: "Marketing", Strategia: "Strategy", Educazione: "Education" } },
  ES: { back: "← Volver a guías", readTime: "lectura", related: "Guías relacionadas", readyCta: "¿Listo para crear tu token?", readyDesc: "Pon en práctica lo que aprendiste. Crea el token y prepara el lanzamiento.", readyBtn: "Lanzar tu token", cats: { Basics: "Básicos", Tutorial: "Tutorial", Sicurezza: "Seguridad", Marketing: "Marketing", Strategia: "Estrategia", Educazione: "Educación" } },
  FR: { back: "← Retour aux guides", readTime: "de lecture", related: "Guides associés", readyCta: "Prêt à créer votre token?", readyDesc: "Mettez en pratique ce que vous avez appris. Créez le token et préparez le lancement.", readyBtn: "Lancer votre token", cats: { Basics: "Bases", Tutorial: "Tutoriel", Sicurezza: "Sécurité", Marketing: "Marketing", Strategia: "Stratégie", Educazione: "Éducation" } },
  PT: { back: "← Voltar às guias", readTime: "leitura", related: "Guias relacionados", readyCta: "Pronto para criar seu token?", readyDesc: "Coloque em prática o que aprendeu. Crie o token e prepare o lançamento.", readyBtn: "Lançar seu token", cats: { Basics: "Básico", Tutorial: "Tutorial", Sicurezza: "Segurança", Marketing: "Marketing", Strategia: "Estratégia", Educazione: "Educação" } },
  DE: { back: "← Zurück zu Guides", readTime: "Lesezeit", related: "Verwandte Guides", readyCta: "Bereit, deinen Token zu erstellen?", readyDesc: "Setze das Gelernte in die Praxis um. Erstelle den Token und bereite den Launch vor.", readyBtn: "Token launchen", cats: { Basics: "Grundlagen", Tutorial: "Tutorial", Sicurezza: "Sicherheit", Marketing: "Marketing", Strategia: "Strategie", Educazione: "Bildung" } },
} as const;

export default function GuidePageClient({ guide, related }: { guide: Guide; related: Guide[] }) {
  const [lang] = useLang();
  const t = T[lang] ?? T["EN"];
  const color = catColors[guide.category] || "#9945FF";

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "140px 24px 48px", position: "relative", zIndex: 1 }}>
      <Link
        href="/guides"
        style={{ marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.035)", color: "rgba(255,255,255,0.62)", cursor: "pointer", fontSize: 13, fontWeight: 800, textDecoration: "none" }}
      >
        {t.back}
      </Link>

      <article>
        <header style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, display: "block" }}>
            {t.cats[guide.category as keyof typeof t.cats] ?? guide.category}
          </span>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 950, letterSpacing: "-0.045em", marginBottom: 16, lineHeight: 1.05 }}>
            {guide.icon} {getGuideTitle(guide.id, lang as GuideLang)}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>
            {getGuideDesc(guide.id, lang as GuideLang)}
          </p>
          <div style={{ display: "flex", gap: 16, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            <span>⏱ {guide.time} {t.readTime}</span>
          </div>
        </header>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32 }}>
          <ReactMarkdown key={lang}
            components={{
              h2: ({ children }) => (
                <div style={{ marginTop: 54, marginBottom: 22 }}>
                  <div style={{ width: 34, height: 3, borderRadius: 99, background: `linear-gradient(90deg, ${color}, transparent)`, marginBottom: 12, boxShadow: `0 0 22px ${color}55` }} />
                  <h2 style={{ fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 950, color: "white", letterSpacing: "-0.04em", lineHeight: 1.15, margin: 0 }}>{children}</h2>
                </div>
              ),
              h3: ({ children }) => (
                <div style={{ marginTop: 34, marginBottom: 16 }}>
                  <div style={{ width: 22, height: 3, borderRadius: 99, background: `linear-gradient(90deg, ${color}, transparent)`, marginBottom: 12, opacity: 0.75 }} />
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0 }}>{children}</h3>
                </div>
              ),
              h4: ({ children }) => (
                <h4 style={{ fontSize: 18, fontWeight: 850, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", lineHeight: 1.25, marginTop: 28, marginBottom: 14 }}>{children}</h4>
              ),
              p: ({ children }) => (
                <p style={{ color: "rgba(255,255,255,0.64)", fontSize: 16, lineHeight: 1.9, marginBottom: 16 }}>{children}</p>
              ),
              strong: ({ children }) => (
                <strong style={{ color: "white", fontWeight: 850 }}>{children}</strong>
              ),
              ul: ({ children }) => (
                <ul style={{ display: "grid", gap: 12, margin: "0 0 18px", padding: 0, listStyle: "none" }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ display: "grid", gap: 12, margin: "0 0 18px", padding: 0, listStyle: "none", counterReset: "item" }}>{children}</ol>
              ),
              li: ({ children }) => (
                <li style={{ color: "rgba(255,255,255,0.72)", fontSize: 16, lineHeight: 1.75, padding: "10px 14px", borderRadius: 16, background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.04)" }}>{children}</li>
              ),
            }}
          >
            {getGuideContent(guide.id, lang as GuideLang, guide.content)}
          </ReactMarkdown>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>{t.related}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {related.map((item) => (
              <Link key={item.id} href={`/guides/${item.id}`} style={{ display: "block", padding: 20, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}>
                <div style={{ color: "white", fontWeight: 900, marginBottom: 6 }}>{item.icon} {getGuideTitle(item.id, lang as GuideLang)}</div>
                <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 14 }}>{getGuideDesc(item.id, lang as GuideLang)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 64, padding: 32, background: "linear-gradient(135deg, rgba(153,69,255,0.1), rgba(20,241,149,0.05))", border: "1px solid rgba(153,69,255,0.2)", borderRadius: 24, textAlign: "center" }}>
        <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>{t.readyCta}</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{t.readyDesc}</p>
        <Link href="/?app=true" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 16, background: "linear-gradient(135deg, #9945FF, #14F195)", color: "white", fontWeight: 800, textDecoration: "none", fontSize: 15 }}>
          {t.readyBtn}
        </Link>
      </div>
    </div>
  );
}
