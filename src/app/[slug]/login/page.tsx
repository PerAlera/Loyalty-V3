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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
          <Image src={business.logo || "/logo.svg"} alt={`${business.name} Logo`} fill style={{ objectFit: "contain" }} priority />
        </div>
        <p className={styles.authSubtitle}>Giriş yapmak için bilgilerinizi girin.</p>

        {error && <div className={styles.errorText}>{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className={styles.authLink}>
          Hesabınız yok mu? <Link href="/register">Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
}
