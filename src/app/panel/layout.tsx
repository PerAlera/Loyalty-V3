import RoleGuard from "@/components/RoleGuard";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
        <header style={{ padding: "1rem 2rem", backgroundColor: "#fff", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Peralera Super Admin</h1>
          </div>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <a href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: "500" }}>İşletmeler</a>
            <a href="/businesses/new" style={{ color: "var(--primary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: "bold" }}>+ Yeni Ekle</a>
          </nav>
        </header>
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
