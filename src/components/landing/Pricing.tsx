"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="pricing section container">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-gradient">Şeffaf Fiyatlandırma</h2>
        <p className="text-secondary max-w-2xl mx-auto mt-4">
          Gizli ücret yok, sürpriz maliyet yok. İşletmenizin büyüklüğüne en uygun planı seçin.
        </p>
        
        <div className="billing-toggle mt-8 flex justify-center items-center gap-4">
          <span className={!isAnnual ? "font-bold text-primary" : "text-secondary"}>Aylık</span>
          <button 
            className={`toggle-switch ${isAnnual ? 'active' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className="toggle-knob"></div>
          </button>
          <span className={isAnnual ? "font-bold text-primary" : "text-secondary"}>
            Yıllık <span className="badge text-xs ml-2 bg-green-100 text-green-700">%20 İndirim</span>
          </span>
        </div>
      </div>

      <div className="pricing-grid fade-in-up">
        {/* Starter Plan */}
        <div className="pricing-card">
          <h3>Başlangıç</h3>
          <p className="text-secondary mb-6">Küçük işletmeler ve butik kafeler için ideal.</p>
          <div className="price mb-6">
            <span className="currency">₺</span>
            <span className="amount">{isAnnual ? '499' : '599'}</span>
            <span className="period">/ay</span>
          </div>
          <ul className="pricing-features mb-8">
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> 500 Aktif Müşteri</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> QR Okuma ve Puan Verme</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> Temel Raporlama</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> 1 Şube / 2 Kasiyer</li>
          </ul>
          <Link href="/demo" className="btn btn-secondary w-full block text-center">Hemen Başla</Link>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card highlight">
          <div className="popular-badge">En Çok Tercih Edilen</div>
          <h3 className="text-white">Profesyonel</h3>
          <p className="text-white opacity-80 mb-6">Büyüyen işletmeler ve zincir şubeler için.</p>
          <div className="price mb-6 text-white">
            <span className="currency">₺</span>
            <span className="amount">{isAnnual ? '999' : '1199'}</span>
            <span className="period text-white opacity-80">/ay</span>
          </div>
          <ul className="pricing-features text-white mb-8">
            <li><CheckCircle2 className="w-5 h-5 text-white mr-3" /> Sınırsız Aktif Müşteri</li>
            <li><CheckCircle2 className="w-5 h-5 text-white mr-3" /> Gelişmiş CRM ve Segmentasyon</li>
            <li><CheckCircle2 className="w-5 h-5 text-white mr-3" /> SMS ve Push Kampanyaları</li>
            <li><CheckCircle2 className="w-5 h-5 text-white mr-3" /> 5 Şube / Sınırsız Kasiyer</li>
          </ul>
          <Link href="/demo" className="btn w-full block text-center" style={{ backgroundColor: 'white', color: 'var(--accent-color)' }}>Ücretsiz Dene</Link>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card">
          <h3>Kurumsal</h3>
          <p className="text-secondary mb-6">Büyük zincirler ve özel entegrasyon isteyenler için.</p>
          <div className="price mb-6">
            <span className="amount text-3xl">Özel Teklif</span>
          </div>
          <ul className="pricing-features mb-8">
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> Kendi Markanıza Özel Tasarım</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> POS Entegrasyonu</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> Özel API Erişimi</li>
            <li><CheckCircle2 className="w-5 h-5 text-accent mr-3" /> 7/24 Özel Destek Uzmanı</li>
          </ul>
          <Link href="/demo" className="btn btn-secondary w-full block text-center">İletişime Geç</Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
