"use client";

import { useEffect, useState } from "react";

export type Lang = "IT" | "EN";

export const LANG_LABELS: Record<Lang, string> = {
  IT: "🇮🇹 IT",
  EN: "🇬🇧 EN",
};

const LS_KEY = "solmint-lang";

function detect(): Lang {
  if (typeof window === "undefined") return "EN";
  const stored = localStorage.getItem(LS_KEY) as Lang | null;
  if (stored === "IT" || stored === "EN") return stored;
  const browser = navigator.language.slice(0, 2).toUpperCase();
  if (browser === "IT") return "IT";
  return "EN";
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => { setLang(detect()); }, []);

  function change(l: Lang) {
    setLang(l);
    localStorage.setItem(LS_KEY, l);
    window.dispatchEvent(new CustomEvent("solmint-lang", { detail: l }));
  }

  return [lang, change];
}
