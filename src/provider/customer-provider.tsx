"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ICustomer } from "../models/customer";
import { useAuth } from "./auth-provider";
import { api } from "../lib/axios-api";
import { ApiResponse } from "../lib/api-response";

type CustomerProviderProps = {
  children: React.ReactNode;
};

type CustomerProviderState = {
  profile: ICustomer | null;
  setProfile: React.Dispatch<React.SetStateAction<ICustomer | null>>;
};

const CustomerProviderContext = createContext<
  CustomerProviderState | undefined
>(undefined);

export function CustomerProvider({ children }: CustomerProviderProps) {
  const { isLoggedIn } = useAuth();

  const [profile, setProfile] = useState<ICustomer | null>(null);

  const value: CustomerProviderState = {
    profile,
    setProfile,
  };

  useEffect(() => {
    async function helper() {
      const apiResponse: ApiResponse<ICustomer> = (
        await api.get("/web/get-profile")
      ).data;

      if (apiResponse.status === 404) {
        console.log("profile not found");
        setProfile(null);
      } else {
        setProfile(apiResponse.data);
      }
    }

    if (isLoggedIn) {
      helper();
    } else {
      setProfile(null);
    }
  }, [isLoggedIn]);

  return (
    <CustomerProviderContext.Provider value={value}>
      {children}
    </CustomerProviderContext.Provider>
  );
}

export const useCustomer = () => {
  const context = useContext(CustomerProviderContext);

  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }

  return context;
};
