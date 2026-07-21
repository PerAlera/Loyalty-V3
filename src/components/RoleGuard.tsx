"use client";

import { useSession  } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      // Sonsuz döngüyü önle: Eğer zaten login veya register sayfasındaysak yönlendirme yapma
      if (pathname === "/login" || pathname === "/register" || pathname?.endsWith("/login") || pathname?.endsWith("/register")) {
        return;
      }
      router.push("/login");
      return;
    }

    if (session?.user?.role && !allowedRoles.includes(session.user.role)) {
      router.push("/");
    }
  }, [session, status, router, allowedRoles, pathname]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Eğer giriş sayfasındaysak, yetki kontrolü yapmadan içeriği (login formunu) göster
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname?.endsWith("/login") || pathname?.endsWith("/register");
  
  if (isAuthPage) {
    return <>{children}</>;
  }

  if (status === "unauthenticated" || (session?.user?.role && !allowedRoles.includes(session.user.role))) {
    return null;
  }

  return <>{children}</>;
}
