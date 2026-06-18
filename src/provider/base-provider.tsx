"use client";

import { createContext, useContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";

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
      <AuthProvider>
        <BaseProviderContext.Provider value={value}>
          {children}
        </BaseProviderContext.Provider>
      </AuthProvider>
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
