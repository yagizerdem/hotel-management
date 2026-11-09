"use client";

import { createContext, useContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { ReduxProvider } from "./redux-provider";
import { QueryProvider } from "./query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = Record<string, never>;

const initialState: BaseProviderState = {};

const BaseProviderContext = createContext<BaseProviderState>(initialState);

export function BaseProvider({ children, ...props }: BaseProviderProps) {
  const value: BaseProviderState = {};

  return (
    <ThemeProvider>
      <ReduxProvider>
        <QueryProvider>
          <TooltipProvider>
            <BaseProviderContext.Provider {...props} value={value}>
              {children}
            </BaseProviderContext.Provider>
          </TooltipProvider>
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
