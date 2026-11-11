"use client";

import { createContext, Suspense, useContext, useEffect } from "react";
import { ThemeProvider } from "@provider/theme-provider";
import { ReduxProvider } from "@provider/redux-provider";
import { QueryProvider } from "@provider/query-provider";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { useAppDispatch } from "@store/store";
import { clearUser, setUser } from "@store/slice/auth-slice";
import { me } from "@/src/actions/auth-actions";

/**
 * Loads the signed-in user into the auth slice once, on first load. It has
 * to render inside ReduxProvider: BaseProvider's own body sits above the
 * store, so it can't dispatch.
 */
function AuthSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await me();
      if (response.success && response.data) {
        dispatch(setUser(response.data));
      } else {
        // Leave "unknown", so the UI knows nobody is signed in.
        dispatch(clearUser());
      }
    }
    fetchData();
  }, [dispatch]);

  return null;
}

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = Record<string, never>;

const initialState: BaseProviderState = {};

const BaseProviderContext = createContext<BaseProviderState>(initialState);

export function BaseProvider({ children, ...props }: BaseProviderProps) {
  const value: BaseProviderState = {};

  return (
    <Suspense>
      <ThemeProvider>
        <ReduxProvider>
          <AuthSync />
          <QueryProvider>
            <TooltipProvider>
              <BaseProviderContext.Provider {...props} value={value}>
                {children}
              </BaseProviderContext.Provider>
            </TooltipProvider>
          </QueryProvider>
        </ReduxProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
