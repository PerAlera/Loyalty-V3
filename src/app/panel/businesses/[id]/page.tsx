import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit2, Users, Target, Activity } from "lucide-react";

export default async function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const businessId = resolvedParams.id;

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: {
      settings: true,
      users: {
        select: {
          id: true,
          role: true,
          name: true,
          surname: true,
          phone: true,
          createdAt: true
        }
      }
    }
  });

  if (!business) {
    notFound();
  }

  const transactionsCount = await prisma.transaction.count({
    where: { businessId }
  });

  const qrTokensCount = await prisma.qrToken.count({
    where: { businessId }
  });

  const admins = business.users.filter(u => u.role === "ADMIN");
  const cashiers = business.users.filter(u => u.role === "CASHIER");
  const customers = business.users.filter(u => u.role === "CUSTOMER");

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/" style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--bg-primary)" }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {business.name} 
              <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "1rem", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", fontWeight: "bold" }}>Aktif</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", margin: "0.25rem 0 0 0", fontSize: "0.875rem" }}>
              {business.slug}.{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com'}
            </p>
          </div>
        </div>
        <Link href={`/panel/businesses/${businessId}/edit`} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", textDecoration: "none" }}>
          <Edit2 size={16} /> Düzenle
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {/* Stat Cards */}
        <div className="surface-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={24} color="var(--primary)" />
          </div>
          <div>
            <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.875rem" }}>Toplam Müşteri</p>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{customers.length}</h3>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={24} color="var(--primary)" />
          </div>
          <div>
            <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.875rem" }}>Üretilen QR Kodlar</p>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{qrTokensCount}</h3>
          </div>
        </div>

        <div className="surface-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity size={24} color="var(--primary)" />
          </div>
          <div>
            <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.875rem" }}>Toplam İşlem (İşlem)</p>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{transactionsCount}</h3>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Admins & Cashiers */}
        <div className="surface-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: "0 0 1rem 0", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>Personel</h3>
          
          <h4 style={{ fontSize: "1rem", fontWeight: "600", margin: "1rem 0 0.5rem 0", color: "var(--text-secondary)" }}>Yöneticiler (Admins)</h4>
          {admins.length === 0 ? <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Yönetici bulunamadı.</p> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {admins.map(admin => (
              <div key={admin.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "var(--bg-primary)", borderRadius: "0.5rem" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "500" }}>{admin.name} {admin.surname}</p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)" }}>{admin.phone}</p>
                </div>
                <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "rgba(0,0,0,0.1)", color: "var(--text-primary)" }}>ADMIN</span>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: "1rem", fontWeight: "600", margin: "1.5rem 0 0.5rem 0", color: "var(--text-secondary)" }}>Kasiyerler (Cashiers)</h4>
          {cashiers.length === 0 ? <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Kasiyer bulunamadı.</p> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {cashiers.map(cashier => (
              <div key={cashier.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "var(--bg-primary)", borderRadius: "0.5rem" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "500" }}>{cashier.name} {cashier.surname}</p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)" }}>{cashier.phone}</p>
                </div>
                <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "rgba(0,0,0,0.1)", color: "var(--text-primary)" }}>CASHIER</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Summary */}
        <div className="surface-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: "0 0 1rem 0", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>Ayarlar & Yapılandırma</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Oluşturulma Tarihi</span>
              <span style={{ fontWeight: "500" }}>{new Date(business.createdAt).toLocaleDateString("tr-TR")}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Tema Rengi</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontWeight: "500" }}>{business.theme || "Varsayılan"}</span>
                {business.theme && (
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: business.theme, border: "1px solid rgba(0,0,0,0.1)" }}></div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Kahve Hedef Sayısı</span>
              <span style={{ fontWeight: "500" }}>{business.settings?.requiredCoffees || 10} adet</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Yemek Hedef Puanı</span>
              <span style={{ fontWeight: "500" }}>{business.settings?.requiredFoods || 10} puan</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)" }}>Profil Ödülü (Çekirdek)</span>
              <span style={{ fontWeight: "500" }}>{business.settings?.profileRewardEnabled ? `${business.settings.profileRewardAmount} adet` : "Kapalı"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
