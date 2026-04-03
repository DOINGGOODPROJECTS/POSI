"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { messages, type Lang } from "./messages";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  messages: (typeof messages)["en"];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "posi-lang";
const COOKIE_KEY = "posi-lang";

function detectPreferredLang(): Lang {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const preferred = detectPreferredLang();
    if (preferred === "en") return;
    const id = window.setTimeout(() => setLangState(preferred), 0);
    return () => window.clearTimeout(id);
  }, []);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // ignore
    }

    document.cookie = `${COOKIE_KEY}=${nextLang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, messages: messages[lang] }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider />");
  }
  return ctx;
}
