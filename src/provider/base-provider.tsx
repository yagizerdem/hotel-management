"use client";

import { createContext, useContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { L10nProvider } from "./l10n-provider";

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = {};

const initialState: BaseProviderState = {};

const BaseProviderContext = createContext<BaseProviderState | undefined>(
  undefined,
);

export function BaseProvider({ children }: BaseProviderProps) {
  const value: BaseProviderState = {};

  return (
    <ThemeProvider>
      <BaseProviderContext.Provider value={value}>
        {children}
      </BaseProviderContext.Provider>
    </ThemeProvider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (!context) {
    throw new Error("useBase must be used within a BaseProvider");
  }

  return context;
};
