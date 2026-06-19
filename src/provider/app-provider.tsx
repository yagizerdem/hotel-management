"use client";

import { createContext, useContext, useState } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppProviderState = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppProviderContext = createContext<AppProviderState | undefined>(
  undefined,
);

export function AppProvider({ children }: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const value: AppProviderState = {
    isLoading,
    setIsLoading,
  };

  return (
    <AppProviderContext.Provider value={value}>
      {children}
    </AppProviderContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppProviderContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};
