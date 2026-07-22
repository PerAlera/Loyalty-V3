"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero section container">
      <div className="hero-content">
        <div className="badge">
          <span>🚀</span> Yeni Nesil Sadakat Yönetimi
        </div>
        <h1 className="hero-title text-gradient">
          Müşteri Sadakatini <br /> Geleceğe Taşıyın.
        </h1>
        <p className="hero-subtitle">
          Geleneksel kağıt kartları unutun. İşletmeniz için veri odaklı, %100 dijital sadakat ve kampanya yönetimi ile müşterilerinizi kalıcı hale getirin.
        </p>
        
        <ul className="hero-checklist">
          <li><span className="check-icon">✓</span> Hızlı Entegrasyon</li>
          <li><span className="check-icon">✓</span> Gelişmiş Analitik</li>
          <li><span className="check-icon">✓</span> Kesintisiz Deneyim</li>
        </ul>

        <div className="hero-actions">
          <Link href="/demo" className="btn btn-primary">Ücretsiz Demo Al &rarr;</Link>
          <a href="#how-it-works" className="btn btn-ghost">Nasıl Çalışır? &rsaquo;</a>
        </div>

        <div className="hero-social-proof">
          <div className="avatars">
            <div className="avatar">👩</div>
            <div className="avatar">👨</div>
            <div className="avatar">🧑</div>
            <div className="avatar">👧</div>
          </div>
          <div className="rating">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>Seçkin işletmeler PerAlera ile büyüyor.</p>
          </div>
        </div>
      </div>
      
      <div className="hero-images">
        <div className="mockup-phone">
          <img src="/hero_phone.png" alt="Peralera mobile app showing coffee bean rewards" />
        </div>
        <div className="mockup-qr-stand">
          <img src="/qr_stand.png" alt="Peralera QR Code Stand on a cafe table" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
