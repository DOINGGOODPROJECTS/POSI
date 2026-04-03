"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../i18n/LanguageProvider";
import type { Lang } from "../i18n/messages";

const FLAG_BY_LANG: Record<Lang, { src: string; alt: string }> = {
  en: { src: "/flags/us.svg", alt: "English" },
  fr: { src: "/flags/fr.svg", alt: "Français" },
};

export function LanguageSwitcher() {
  const { lang, setLang, messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    }

    if (!open) return;
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function choose(nextLang: Lang) {
    setLang(nextLang);
    setOpen(false);
  }

  const currentFlag = FLAG_BY_LANG[lang];

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-button"
        aria-label={messages.language.current}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <img
          className="lang-flag"
          src={currentFlag.src}
          alt=""
          aria-hidden="true"
        />
        <span className="lang-caret" aria-hidden="true" />
      </button>

      {open ? (
        <div className="lang-menu" role="menu" aria-label={messages.language.current}>
          <button
            type="button"
            role="menuitem"
            className="lang-menu-item"
            onClick={() => choose("fr")}
          >
            <img
              className="lang-flag"
              src={FLAG_BY_LANG.fr.src}
              alt=""
              aria-hidden="true"
            />
            <span>{messages.language.french}</span>
          </button>
          <button
            type="button"
            role="menuitem"
            className="lang-menu-item"
            onClick={() => choose("en")}
          >
            <img
              className="lang-flag"
              src={FLAG_BY_LANG.en.src}
              alt=""
              aria-hidden="true"
            />
            <span>{messages.language.english}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

