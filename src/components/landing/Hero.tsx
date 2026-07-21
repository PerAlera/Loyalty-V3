"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero section container">
      <div className="hero-content">
        <div className="badge">
          <span>🎉</span> Dijital Sadakat Platformu
        </div>
        <h1 className="hero-title text-gradient">
          Sadık müşteriler, <br /> daha güçlü işletmeler.
        </h1>
        <p className="hero-subtitle">
          Peralera, kafeler ve yerel işletmeler için dijital sadakat ve kampanya yönetim platformudur.
        </p>
        
        <ul className="hero-checklist">
          <li><span className="check-icon">✓</span> Kolay Kullanım</li>
          <li><span className="check-icon">✓</span> Akıllı İstatistikler</li>
          <li><span className="check-icon">✓</span> Tamamen Dijital</li>
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
            <p>20+ işletme Peralera'yı kullanıyor.</p>
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
