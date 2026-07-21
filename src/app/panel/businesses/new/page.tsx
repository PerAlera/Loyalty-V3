"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    theme: "#f43f5e",
    adminName: "",
    adminSurname: "",
    adminPhone: "",
    adminPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/super-admin/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "İşletme oluşturulurken bir hata oluştu.");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--bg-primary)" }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Yeni İşletme Ekle</h2>
          <p style={{ color: "var(--text-secondary)", margin: "0.25rem 0 0 0" }}>Yeni bir kiracı ve yönetici hesabı oluşturun.</p>
        </div>
      </div>

      {error && (
        <div style={{ padding: "1rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "0.5rem", marginBottom: "2rem", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="surface-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* İşletme Bilgileri */}
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>İşletme Bilgileri</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">İşletme Adı</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Örn: Peralera Cafe" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="slug">Subdomain (Slug)</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input type="text" id="slug" name="slug" className="form-input" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 }} placeholder="örn: pera" value={formData.slug} onChange={handleChange} required />
                <div style={{ padding: "0.75rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderTopRightRadius: "0.5rem", borderBottomRightRadius: "0.5rem", color: "var(--text-secondary)" }}>
                  .{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com'}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="theme">Tema Rengi (Primary Color)</label>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input type="color" id="theme" name="theme" value={formData.theme} onChange={handleChange} style={{ width: "50px", height: "50px", padding: "0", border: "none", borderRadius: "0.5rem", cursor: "pointer" }} />
                <span style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>{formData.theme}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yönetici Bilgileri */}
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Yönetici (Admin) Hesabı</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="form-group">
              <label className="form-label" htmlFor="adminName">Ad</label>
              <input type="text" id="adminName" name="adminName" className="form-input" value={formData.adminName} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="adminSurname">Soyad</label>
              <input type="text" id="adminSurname" name="adminSurname" className="form-input" value={formData.adminSurname} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adminPhone">Telefon Numarası</label>
              <input type="tel" id="adminPhone" name="adminPhone" className="form-input" placeholder="5551234567" value={formData.adminPhone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adminPassword">Geçici Şifre</label>
              <input type="text" id="adminPassword" name="adminPassword" className="form-input" placeholder="Admin giriş şifresi" value={formData.adminPassword} onChange={handleChange} required minLength={6} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: "150px", justifyContent: "center" }}>
            {loading ? "Oluşturuluyor..." : <><Save size={20} /> İşletmeyi Kaydet</>}
          </button>
        </div>

      </form>
    </div>
  );
}
