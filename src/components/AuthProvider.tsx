"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { getUserSessionAction } from "@/app/actions/auth";

export type Role = "SUPER_ADMIN" | "ADMIN" | "CASHIER" | "CUSTOMER";

type User = {
  id: string;
  role: Role;
  name: string;
  surname: string;
  phone: string;
  businessId: string;
};

type SessionContextType = {
  data: { user: User } | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const SessionContext = createContext<SessionContextType>({ data: null, status: "loading" });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionContextType>({ data: null, status: "loading" });
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { session: supaSession } } = await supabase.auth.getSession();
      if (!supaSession) {
        setSession({ data: null, status: "unauthenticated" });
        return;
      }
      
      try {
        const sessionData = await getUserSessionAction();
        if (sessionData) {
          setSession({ data: sessionData, status: "authenticated" });
        } else {
          console.log("[AuthProvider] Server action returned null session despite valid supaSession.");
          // Eğer Server Action null dönerse, ancak Supabase session varsa
          // Muhtemelen Prisma'da kullanıcı henüz hazır değil veya cookie tam eşleşmedi.
          // Kullanıcıyı hemen "unauthenticated" yapıp giriş sayfasına atmayalım,
          // sadece Prisma rolleri gelmediği için data.session = null olsun ama status unauthenticated olmasın?
          // Hayır, RoleGuard role bekliyor.
          setSession({ data: null, status: "unauthenticated" });
        }
      } catch (err) {
        console.error("Auth fetch error:", err);
        setSession({ data: null, status: "unauthenticated" });
      }
    }
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        fetchUser();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = '/login'; // Or redirect to home
}
