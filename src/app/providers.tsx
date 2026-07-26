"use client";

import { AuthProvider as SessionProvider } from "@/components/AuthProvider";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error("SW registration failed", err));
    }
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
