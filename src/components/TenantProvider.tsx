"use client";

import React, { createContext, useContext } from "react";

type BusinessInfo = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  theme: string | null;
  coffeeMascot: string | null;
  foodMascot: string | null;
  isFoodEnabled: boolean;
};

const TenantContext = createContext<BusinessInfo | null>(null);

export function TenantProvider({ children, business }: { children: React.ReactNode, business: BusinessInfo }) {
  return (
    <TenantContext.Provider value={business}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
