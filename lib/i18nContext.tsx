"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import es from "@/i18n/es.json";
import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";
import pt from "@/i18n/pt.json";

const translations = { es, en, fr, pt };

export type Locale = "es" | "en" | "fr" | "pt";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && ["es", "en", "fr", "pt"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}