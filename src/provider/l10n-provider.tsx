"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/src/dictionaries/dictionaries";

type DictionaryValue = string | Dictionary;
type Dictionary = {
  [key: string]: DictionaryValue;
};

type L10nProviderProps = {
  children: React.ReactNode;
  lang: Locale;
  dictionary: Dictionary;
};

type L10nProviderState = {
  lang: Locale;
  dictionary: Dictionary;
  t: (key: string) => string;
};

const L10nProviderContext = createContext<L10nProviderState | undefined>(
  undefined,
);

function getNestedValue(
  dictionary: Dictionary,
  key: string,
): string | undefined {
  const value = key
    .split(".")
    .reduce<DictionaryValue | undefined>((current, part) => {
      if (current && typeof current === "object" && part in current) {
        return current[part];
      }

      return undefined;
    }, dictionary);

  return typeof value === "string" ? value : undefined;
}

export function L10nProvider({
  children,
  lang,
  dictionary,
}: L10nProviderProps) {
  const t = (key: string) => getNestedValue(dictionary, key) ?? key;

  return (
    <L10nProviderContext.Provider value={{ lang, dictionary, t }}>
      {children}
    </L10nProviderContext.Provider>
  );
}

export function useL10n() {
  const context = useContext(L10nProviderContext);

  if (!context) {
    throw new Error("useL10n must be used within a L10nProvider");
  }

  return context;
}
