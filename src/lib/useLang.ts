"use client";

import { useEffect, useState } from "react";

export type Lang = "IT" | "EN" | "ES" | "FR" | "PT" | "DE";

export const LANG_LABELS: Record<Lang, string> = {
  IT: "🇮🇹 IT", EN: "🇬🇧 EN", ES: "🇪🇸 ES",
  FR: "🇫🇷 FR", PT: "🇧🇷 PT", DE: "🇩🇪 DE",
};

const LS_KEY = "solmint-lang";

function detect(): Lang {
  if (typeof window === "undefined") return "EN";
  const stored = localStorage.getItem(LS_KEY) as Lang | null;
  if (stored && stored in LANG_LABELS) return stored;
  const browser = navigator.language.slice(0, 2).toUpperCase();
  if (browser === "IT") return "IT";
  if (browser === "ES") return "ES";
  if (browser === "FR") return "FR";
  if (browser === "PT") return "PT";
  if (browser === "DE") return "DE";
  return "EN";
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => { setLang(detect()); }, []);

  function change(l: Lang) {
    setLang(l);
    localStorage.setItem(LS_KEY, l);
    // Sync SiteNavbar (other components read localStorage)
    window.dispatchEvent(new CustomEvent("solmint-lang", { detail: l }));
  }

  return [lang, change];
}
