import prisma from "@/lib/prisma";
import Link from "next/link";
import { Coffee, Settings, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuperAdminDashboard() {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { users: true }
      }
    }
  });

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Tüm İşletmeler</h2>
          <p style={{ color: "var(--text-secondary)", margin: "0.25rem 0 0 0" }}>Sistemdeki kiracıları yönetin.</p>
        </div>
        <Link href="/businesses/new" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>+ Yeni İşletme</span>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {businesses.map((business) => (
          <div key={business.id} className="surface-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative", opacity: business.isActive ? 1 : 0.6 }}>
            <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: business.theme || "var(--primary)" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Coffee size={24} color={business.isActive ? "var(--primary)" : "var(--text-secondary)"} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {business.name}
                  {!business.isActive && <span style={{ fontSize: "0.7rem", padding: "0.1rem 0.4rem", borderRadius: "1rem", backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#dc2626", fontWeight: "bold" }}>KAPATILDI</span>}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>{business.slug}.{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com'}</p>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                <Users size={16} />
                <span>{business._count.users} Kullanıcı</span>
              </div>
              <Link href={`/businesses/${business.id}`} style={{ color: "var(--primary)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", fontWeight: "500" }}>
                <Settings size={16} /> Ayarlar
              </Link>
            </div>
          </div>
        ))}

        {businesses.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", backgroundColor: "var(--bg-primary)", borderRadius: "0.5rem", color: "var(--text-secondary)" }}>
            Henüz hiç işletme eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
