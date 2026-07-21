import Link from "next/link";
import { Coffee, Shield, Zap, Smartphone, CheckCircle, BarChart } from "lucide-react";

export default function SaaSLandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header / Nav */}
      <header style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Coffee size={28} color="var(--primary)" />
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Peralera</h1>
        </div>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="#features" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: "500" }}>Özellikler</a>
          <a href="#pricing" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: "500" }}>Fiyatlandırma</a>
          <a href="#contact" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>İletişime Geç</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "6rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "3.5rem", fontWeight: "900", maxWidth: "800px", margin: 0, lineHeight: 1.2 }}>
          Kafeniz için Yeni Nesil <span style={{ color: "var(--primary)" }}>Dijital Sadakat</span> Sistemi
        </h2>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", maxWidth: "600px", margin: 0, lineHeight: 1.5 }}>
          Kağıt kartpostallara veda edin. Müşterilerinize modern bir sadakat programı sunun, bağlılığı artırın ve satışlarınızı katlayın.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <a href="#contact" className="btn-primary" style={{ fontSize: "1.125rem", padding: "1rem 2rem" }}>
            Hemen Başlayın
          </a>
          <Link href="/demo" style={{ padding: "1rem 2rem", fontSize: "1.125rem", color: "var(--text-primary)", backgroundColor: "var(--bg-secondary)", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "500" }}>
            Demoyu İncele
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "5rem 2rem", backgroundColor: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 1rem 0" }}>Neden Peralera?</h3>
            <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", margin: 0 }}>İşletmenizi büyütmek için ihtiyacınız olan her şey tek bir platformda.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {/* Feature 1 */}
            <div className="surface-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Smartphone size={24} color="var(--primary)" />
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Mobil Uyumlu</h4>
              <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>Müşterileriniz hiçbir uygulama indirmeden doğrudan tarayıcı üzerinden QR kodlarını okutarak puan toplayabilirler.</p>
            </div>

            {/* Feature 2 */}
            <div className="surface-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={24} color="var(--primary)" />
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Hızlı Entegrasyon</h4>
              <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>Sisteme kayıt olduğunuz an size özel bir alt-alan adı (subdomain) ve kendi markanızın renkleriyle sisteminiz anında hazır olur.</p>
            </div>

            {/* Feature 3 */}
            <div className="surface-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart size={24} color="var(--primary)" />
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Detaylı İstatistikler</h4>
              <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>Müşterilerinizin sadakat oranlarını, en çok hangi ürünlerin tercih edildiğini yönetici panelinizden anlık olarak takip edin.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="surface-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={24} color="var(--primary)" />
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Güvenli Altyapı</h4>
              <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>İşletmenizin verileri ve müşterilerinizin bilgileri Supabase güvencesiyle yüksek standartlarda şifrelenir ve korunur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Call to action */}
      <section id="contact" style={{ padding: "5rem 2rem", backgroundColor: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 1.5rem 0" }}>İşletmenizi Dijitale Taşıyın</h3>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", margin: "0 0 2.5rem 0", lineHeight: 1.5 }}>
            Size özel fiyatlandırma ve demo talebi için bizimle iletişime geçin. Uzman ekibimiz işletmenize en uygun çözümü sunmak için sizi bekliyor.
          </p>
          
          <div className="surface-card" style={{ padding: "2rem", display: "inline-flex", flexDirection: "column", gap: "1rem", textAlign: "left", width: "100%", maxWidth: "500px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} color="#10b981" />
              <span>Sınırsız müşteri kaydı</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} color="#10b981" />
              <span>Sınırsız QR kod üretimi</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} color="#10b981" />
              <span>İşletmenize özel alt-alan adı (Örn: kafe.peralera.com)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} color="#10b981" />
              <span>Özelleştirilebilir tema renkleri</span>
            </div>
            
            <a href="mailto:hello@peralera.com" className="btn-primary" style={{ marginTop: "1rem", textAlign: "center", padding: "1rem" }}>
              hello@peralera.com'a Yazın
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem", textAlign: "center", borderTop: "1px solid var(--border-color)", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
        <p>&copy; {new Date().getFullYear()} Peralera SaaS Platformu. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
