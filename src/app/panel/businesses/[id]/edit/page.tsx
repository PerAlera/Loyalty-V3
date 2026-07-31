"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Store, UploadCloud, Trash2 } from "lucide-react";

export default function EditBusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const businessId = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    theme: "",
    logo: "",
    coffeeMascot: "",
    foodMascot: "",
    isFoodEnabled: true
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/super-admin/businesses/${businessId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.business.name || "",
            slug: data.business.slug || "",
            theme: data.business.theme || "",
            logo: data.business.logo || "",
            coffeeMascot: data.business.coffeeMascot || "",
            foodMascot: data.business.foodMascot || "",
            isFoodEnabled: data.business.isFoodEnabled ?? true
          });
          setIsActive(data.business.isActive ?? true);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchBusiness();
  }, [businessId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "coffeeMascot" | "foodMascot") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading({ ...uploading, [field]: true });
    
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("path", field);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, [field]: data.url });
      } else {
        alert("Dosya yüklenemedi: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (err) {
      console.error(err);
      alert("Dosya yükleme sırasında bağlantı hatası oluştu.");
    }

    setUploading({ ...uploading, [field]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/super-admin/businesses/${businessId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("İşletme başarıyla güncellendi.");
        router.push(`/panel/businesses/${businessId}`);
      } else {
        const data = await res.json();
        alert(data.error || "Güncelleme sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası.");
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Bu işletmeyi kapatmak istediğinize emin misiniz? İşletmenin bağlantısı geçici olarak ulaşılamaz hale gelecektir.")) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/super-admin/businesses/${businessId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("İşletme başarıyla kapatıldı.");
        setIsActive(false);
      } else {
        const data = await res.json();
        alert(data.error || "Kapatma sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası.");
    }
    setSaving(false);
  };

  const handleRestore = async () => {
    if (!window.confirm("Bu işletmeyi tekrar aktif hale getirmek istediğinize emin misiniz?")) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/super-admin/businesses/${businessId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESTORE" })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`İşletme başarıyla tekrar aktif edildi. Yeni bağlantı: ${data.slug}`);
        setIsActive(true);
        setFormData({ ...formData, slug: data.slug });
      } else {
        const data = await res.json();
        alert(data.error || "Açma sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası.");
    }
    setSaving(false);
  };

  const handlePermanentDelete = async () => {
    if (!window.confirm("DİKKAT: Bu işletmeyi KALICI OLARAK silmek üzeresiniz! Müşteriler, cüzdanlar ve tüm geçmiş veriler geri döndürülemez şekilde silinecektir. Devam etmek istiyor musunuz?")) {
      return;
    }

    const confirmText = window.prompt("İşlemi onaylamak için 'SİL' yazın:");
    if (confirmText !== "SİL") {
      alert("İşlem iptal edildi.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/super-admin/businesses/${businessId}?action=permanent`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("İşletme kalıcı olarak silindi.");
        router.push("/panel");
      } else {
        const data = await res.json();
        alert(data.error || "Silme sırasında bir hata oluştu.");
        setSaving(false);
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center" }}>Yükleniyor...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem", paddingBottom: "5rem" }}>
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href={`/panel/businesses/${businessId}`} style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--bg-primary)" }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Store color="var(--primary)" /> İşletmeyi Düzenle
        </h1>
      </div>

      <div className="surface-card">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <h2 style={{ fontSize: "1.125rem", margin: 0 }}>Temel Bilgiler</h2>
          
          <div className="form-group">
            <label className="form-label">İşletme Adı</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subdomain (Slug)</label>
            <input
              type="text"
              className="form-input"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              required
            />
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Örn: <strong>{formData.slug || "starbucks"}</strong>.{process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com'}
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Tema Rengi (Hex Kodu)</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input 
                type="color" 
                value={formData.theme || "#000000"} 
                onChange={e => setFormData({ ...formData, theme: e.target.value })}
                style={{ width: "50px", height: "42px", padding: "0", cursor: "pointer", border: "1px solid var(--border-color)", borderRadius: "var(--radius)" }}
              />
              <input 
                type="text" 
                className="form-input" 
                value={formData.theme} 
                onChange={e => setFormData({ ...formData, theme: e.target.value })}
                placeholder="#000000"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={formData.isFoodEnabled} 
                onChange={e => setFormData({ ...formData, isFoodEnabled: e.target.checked })}
                style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }}
              />
              Yemek Sadakat Sistemi Aktif
            </label>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.25rem", marginLeft: "1.7rem" }}>
              Bu özellik kapatıldığında restoran/yemek ile ilgili puanlama ve istatistik özellikleri (hem müşteri hem yönetici panelinde) tamamen gizlenir.
            </p>
          </div>

          <hr style={{ borderColor: "var(--border-color)", margin: "1rem 0" }} />
          <h2 style={{ fontSize: "1.125rem", margin: 0 }}>Medya ve Görseller</h2>

          <div className="form-group">
            <label className="form-label">İşletme Logosu</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {formData.logo && (
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                  <img src={formData.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <label className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <UploadCloud size={18} /> {uploading.logo ? "Yükleniyor..." : "Logo Seç ve Yükle"}
                  <input type="file" accept=".png, image/png, .jpg, .jpeg, .svg, image/svg+xml" style={{ display: "none" }} onChange={(e) => handleUpload(e, "logo")} disabled={uploading.logo} />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Kahve Ödül Maskotu</label>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              {["/kahve.svg", "/mascot1.png", "/mascot2.png"].map(url => (
                <div 
                  key={url} 
                  onClick={() => setFormData({ ...formData, coffeeMascot: url })}
                  style={{ 
                    width: "80px", height: "80px", 
                    border: formData.coffeeMascot === url ? "2px solid var(--primary)" : "1px solid var(--border-color)", 
                    borderRadius: "8px", overflow: "hidden", cursor: "pointer", padding: "0.5rem",
                    backgroundColor: formData.coffeeMascot === url ? "rgba(244, 63, 94, 0.05)" : "transparent"
                  }}
                  title="Hazır Maskot Seç"
                >
                  <img src={url} alt="Hazır Maskot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {formData.coffeeMascot && !["/1.svg", "/2.svg"].includes(formData.coffeeMascot) && (
                <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                  <img src={formData.coffeeMascot} alt="Özel Maskot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <label className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <UploadCloud size={18} /> {uploading.coffeeMascot ? "Yükleniyor..." : "Kendi Maskotunu Yükle"}
                  <input type="file" accept=".svg, image/svg+xml, image/png, image/jpeg" style={{ display: "none" }} onChange={(e) => handleUpload(e, "coffeeMascot")} disabled={uploading.coffeeMascot} />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Yemek Ödül Maskotu</label>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              {["/yemek1.svg", "/yemek2.svg"].map(url => (
                <div 
                  key={url} 
                  onClick={() => setFormData({ ...formData, foodMascot: url })}
                  style={{ 
                    width: "80px", height: "80px", 
                    border: formData.foodMascot === url ? "2px solid var(--primary)" : "1px solid var(--border-color)", 
                    borderRadius: "8px", overflow: "hidden", cursor: "pointer", padding: "0.5rem",
                    backgroundColor: formData.foodMascot === url ? "rgba(244, 63, 94, 0.05)" : "transparent"
                  }}
                  title="Hazır Maskot Seç"
                >
                  <img src={url} alt="Hazır Maskot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {formData.foodMascot && !["/1.svg", "/2.svg"].includes(formData.foodMascot) && (
                <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                  <img src={formData.foodMascot} alt="Özel Maskot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <label className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <UploadCloud size={18} /> {uploading.foodMascot ? "Yükleniyor..." : "Kendi Maskotunu Yükle"}
                  <input type="file" accept=".svg, image/svg+xml, image/png, image/jpeg" style={{ display: "none" }} onChange={(e) => handleUpload(e, "foodMascot")} disabled={uploading.foodMascot} />
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={saving} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
            <Save size={20} /> {saving ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
          </button>
        </form>
      </div>

      <div className="surface-card" style={{ marginTop: "2rem", border: "1px solid rgba(220, 38, 38, 0.2)", backgroundColor: "rgba(220, 38, 38, 0.02)" }}>
        <h2 style={{ fontSize: "1.125rem", margin: "0 0 1rem 0", color: "#dc2626" }}>Tehlikeli Bölge</h2>
        
        {isActive ? (
          <>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Bu işletmeyi kapattığınızda artık bağlantısına ulaşılamayacak ve sistemde aktif olarak görünmeyecektir. İstediğiniz zaman geri açabilirsiniz.
            </p>
            <button 
              type="button" 
              onClick={handleDelete} 
              disabled={saving}
              style={{ 
                display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", 
                backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", 
                padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: saving ? "not-allowed" : "pointer", fontWeight: "bold", width: "100%", marginBottom: "1rem"
              }}
            >
              <Store size={20} /> İşletmeyi Dondur (Kapat)
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Bu işletme şu an kapalı durumda. Tekrar aktif hale getirerek müşterilerin erişimini sağlayabilirsiniz.
            </p>
            <button 
              type="button" 
              onClick={handleRestore} 
              disabled={saving}
              style={{ 
                display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", 
                backgroundColor: "var(--primary)", color: "white", border: "none", 
                padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: saving ? "not-allowed" : "pointer", fontWeight: "bold", width: "100%", marginBottom: "1rem"
              }}
            >
              <Store size={20} /> İşletmeyi Geri Aç (Aktifleştir)
            </button>
          </>
        )}

        <div style={{ borderTop: "1px solid rgba(220,38,38,0.2)", margin: "1.5rem 0", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Bu işletmeyi kalıcı olarak sildiğinizde, içerisindeki tüm müşteriler, cüzdanlar ve işlem geçmişi veritabanından tamamen silinecektir. Bu işlem GERİ ALINAMAZ.
          </p>
          <button 
            type="button" 
            onClick={handlePermanentDelete} 
            disabled={saving}
            style={{ 
              display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", 
              backgroundColor: "#dc2626", color: "white", border: "none", 
              padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: saving ? "not-allowed" : "pointer", fontWeight: "bold", width: "100%"
            }}
          >
            <Trash2 size={20} /> İşletmeyi KALICI Olarak Sil
          </button>
        </div>
      </div>
    </div>
  );
}
