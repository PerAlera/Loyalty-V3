"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-client";

export default function PanelLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Super admin için e-postayı telefon numarasıyla birleştiriyoruz
    const email = `${phone}@peralera.com`;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Giriş başarısız. Lütfen telefon veya şifrenizi kontrol edin.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-primary)" }}>
      <div className="surface-card fade-in" style={{ padding: "3rem", width: "100%", maxWidth: "450px", borderRadius: "1rem", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--text-primary)", margin: 0 }}>Peralera</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>Super Admin Girişi</p>
        </div>

        {error && <div style={{ padding: "0.75rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "0.5rem", marginBottom: "1.5rem", fontSize: "0.875rem", textAlign: "center" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Yönetici Telefon Numarası</label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="5550000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: "100%", marginTop: "0.5rem", padding: "0.875rem" }}
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
