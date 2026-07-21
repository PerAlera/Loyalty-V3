"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

type User = {
  id: string;
  role: string;
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
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setSession({ data: data.session, status: "authenticated" });
          } else {
            setSession({ data: null, status: "unauthenticated" });
          }
        } else {
          setSession({ data: null, status: "unauthenticated" });
        }
      } catch {
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
