"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";

import { createClient } from "@/lib/supabase-client";
import { useTenant } from "@/components/TenantProvider";

export default function LoginPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const supabase = createClient();
  const business = useTenant();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  // Şifre sıfırlama state'leri
  const [isResetMode, setIsResetMode] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isResetMode) {
      if (newPassword !== confirmPassword) {
        setError("Şifreler birbiriyle uyuşmuyor.");
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            name,
            surname,
            newPassword,
            slug: params.slug
          })
        });
        
        const data = await res.json();
        if (res.ok) {
          setSuccess("Şifreniz başarıyla güncellendi, giriş yapılıyor...");
          // Başarılı olursa otomatik giriş yapıyoruz.
          const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';
          const email = `${phone}@${params.slug}.${baseDomain}`;
          
          await supabase.auth.signInWithPassword({
            email,
            password: newPassword,
          });
          
          router.push("/");
          router.refresh();
        } else {
          setError(data.error || "Bilgiler eşleşmedi, lütfen kontrol edin.");
        }
      } catch (err) {
        setError("Bir hata oluştu.");
      }
      setLoading(false);
      return;
    }

    // Normal Login İşlemi
    const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';
    const email = `${phone}@${params.slug}.${baseDomain}`;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Giriş başarısız. Telefon numaranızı veya şifrenizi kontrol edin.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`fade-in ${styles.authCard}`}>
        <div style={{ width: "120px", height: "120px", position: "relative", margin: "0 auto 1rem auto" }}>
          {business.logo && <Image src={business.logo} alt={`${business.name} Logo`} fill style={{ objectFit: "contain" }} priority />}
        </div>
        <p className={styles.authSubtitle}>
          {isResetMode ? "Şifrenizi sıfırlamak için bilgilerinizi girin." : "Giriş yapmak için bilgilerinizi girin."}
        </p>

        {error && <div className={styles.errorText}>{error}</div>}
        {success && <div style={{ color: "var(--success)", fontSize: "0.875rem", marginBottom: "1rem", textAlign: "center" }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          
          {isResetMode && (
            <>
              <div className={styles.formGroup}>
                <label className="form-label" htmlFor="name">Ad</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className="form-label" htmlFor="surname">Soyad</label>
                <input
                  id="surname"
                  type="text"
                  className="form-input"
                  placeholder="Yılmaz"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label className="form-label" htmlFor="phone">Telefon Numarası</label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="5551234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {!isResetMode ? (
            <div className={styles.formGroup}>
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
          ) : (
            <>
              <div className={styles.formGroup}>
                <label className="form-label" htmlFor="newPassword">Yeni Şifre</label>
                <input
                  id="newPassword"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className="form-label" htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? "Lütfen bekleyin..." : (isResetMode ? "Şifreyi Sıfırla" : "Giriş Yap")}
          </button>
        </form>

        <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.875rem" }}>
          {!isResetMode ? (
            <button 
              type="button" 
              onClick={() => { setIsResetMode(true); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: "bold", cursor: "pointer", padding: "0.5rem" }}
            >
              Şifremi Unuttum
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => { setIsResetMode(false); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--text-secondary)", fontWeight: "bold", cursor: "pointer", padding: "0.5rem" }}
            >
              Giriş Ekranına Dön
            </button>
          )}
        </div>

        <div className={styles.authLink} style={{ marginTop: "0.5rem" }}>
          Hesabınız yok mu? <Link href="/register">Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
}
