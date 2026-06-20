"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserCredentials } from "../models/user";
import { api } from "../lib/axios-api";
import { ApiResponse } from "../lib/api-response";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  credentials: IUserCredentials | null;
  setCredentials: Dispatch<React.SetStateAction<IUserCredentials | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
  role: string | null;
  setRole: Dispatch<React.SetStateAction<string | null>>;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<IUserCredentials | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const value: AuthProviderState = {
    credentials,
    setCredentials,
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
  };

  useEffect(() => {
    async function helper() {
      try {
        const apiResponse: ApiResponse<IUserCredentials> = (
          await api.get("/auth/me")
        ).data;

        if (apiResponse.status.toString().startsWith("2")) {
          setCredentials(apiResponse.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user credentials:", error);
      }
    }

    if (isLoggedIn) {
      helper();
    }
  }, []);

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
