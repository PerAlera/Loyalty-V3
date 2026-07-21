"use client";

import { AuthProvider as SessionProvider } from "@/components/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
