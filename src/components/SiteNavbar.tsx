"use client";

import { useEffect, useState } from "react";

type Lang = "IT" | "EN";

const NAV: Record<Lang, [string, string][]> = {
  IT: [["Features","/#features"],["Come funziona","/#come-funziona"],["Prezzi","/#prezzi"],["Trending","/trending"],["Guide","/guides"],["AI Meme","/ai-meme"],["AI Website","/ai-website"]],
  EN: [["Features","/#features"],["How it works","/#come-funziona"],["Pricing","/#prezzi"],["Trending","/trending"],["Guides","/guides"],["AI Meme","/ai-meme"],["AI Website","/ai-website"]],
};

const LAUNCH: Record<Lang, string> = {
  IT: "Lancia App",
  EN: "Launch App",
};

const LANG_LABELS: Record<Lang, string> = {
  IT: "🇮🇹 IT",
  EN: "🇬🇧 EN",
};

function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#snl)" />
      <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2" fill="none" />
      <path d="M16 10V8M16 24v-2M10 16H8M24 16h-2" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="snl" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#9945FF" /><stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    const stored = localStorage.getItem("solmint-lang") as Lang | null;
    if (stored === "IT" || stored === "EN") {
      setLang(stored);
    } else {
      const browser = navigator.language.slice(0, 2).toUpperCase();
      setLang(browser === "IT" ? "IT" : "EN");
    }
    const handler = (e: any) => setLang(e.detail as Lang);
    window.addEventListener("solmint-lang", handler);
    return () => window.removeEventListener("solmint-lang", handler);
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem("solmint-lang", l);
    window.dispatchEvent(new CustomEvent("solmint-lang", { detail: l }));
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = NAV[lang];
  const launchLabel = LAUNCH[lang];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300"
      style={{
        background: scrolled || mobileOpen ? "rgba(5,5,14,0.88)" : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(28px)" : "none",
        borderBottom: scrolled || mobileOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          <Logo size={34} />
          <div className="leading-tight">
            <span className="block font-black text-lg tracking-tight text-white">SolMint Space</span>
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.28)" }}>
              Solana Token Launcher
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="px-3 py-2 rounded-full text-xs font-bold transition-all"
              style={{ color: "rgba(255,255,255,0.52)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.52)"; e.currentTarget.style.background = "transparent"; }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-2">
          <select
            value={lang}
            onChange={e => changeLang(e.target.value as Lang)}
            className="text-xs font-black rounded-full px-3 py-2 appearance-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white", outline: "none" }}
          >
            {(Object.keys(LANG_LABELS) as Lang[]).map(code => (
              <option key={code} value={code} style={{ background: "#0a0a14", color: "white" }}>
                {LANG_LABELS[code]}
              </option>
            ))}
          </select>

          <a
            href="/?app=true"
            className="px-5 py-2.5 rounded-full text-sm font-black text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#9945FF,#14F195)", boxShadow: "0 10px 30px rgba(153,69,255,0.3)" }}
          >
            {launchLabel}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Menu"
        >
          <span className="relative w-5 h-4 block">
            <span className="absolute left-0 top-0 w-5 h-0.5 bg-white transition-all duration-300" style={{ transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="absolute left-0 top-2 w-5 h-0.5 bg-white transition-all duration-300" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="absolute left-0 bottom-0 w-5 h-0.5 bg-white transition-all duration-300" style={{ transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden max-w-7xl mx-auto pt-3">
          <div className="rounded-[24px] p-4" style={{ background: "rgba(8,8,20,0.97)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 28px 90px rgba(0,0,0,0.6)" }}>
            <div className="grid gap-2 mb-4">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold"
                  style={{ color: "rgba(255,255,255,0.82)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {label}
                  <span style={{ color: "rgba(255,255,255,0.24)" }}>→</span>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={lang}
                onChange={e => { changeLang(e.target.value as Lang); setMobileOpen(false); }}
                className="rounded-xl py-3 px-4 text-sm font-black appearance-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
              >
                {(Object.keys(LANG_LABELS) as Lang[]).map(code => (
                  <option key={code} value={code} style={{ background: "#0a0a14", color: "white" }}>
                    {LANG_LABELS[code]}
                  </option>
                ))}
              </select>

              <a
                href="/?app=true"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 rounded-xl text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg,#9945FF,#14F195)" }}
              >
                {launchLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
