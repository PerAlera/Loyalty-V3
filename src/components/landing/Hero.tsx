"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero section container pt-24 pb-12 flex flex-col lg:flex-row items-center gap-12">
      
      {/* Left Content */}
      <div className="hero-content lg:w-1/2 flex flex-col justify-center text-left fade-in-up">
        <h1 className="hero-title text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: 'var(--primary-color)' }}>
          Müşterilerinizi <br />
          <span className="opacity-80">Sadıklaştırın,</span> <br />
          İşletmenizi Büyütün!
        </h1>
        
        <p className="hero-subtitle text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          Peralera, kafe ve restoranlar için geliştirilmiş dijital sadakat
          sistemi ile müşterileri çekirdek kazanmaya teşvik eder,
          tekrar ziyaretleri artırır ve işletmenizin gelirini yükseltir.
        </p>
        
        <div className="bg-white rounded-xl p-4 flex items-start gap-4 mb-8 shadow-sm border border-gray-100 max-w-md">
          <div className="text-amber-700 bg-orange-50 p-2 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--primary-color)' }}>Uygulama indirme derdi yok!</h4>
            <p className="text-xs text-gray-500">Doğrudan tarayıcı üzerinden saniyeler içinde kayıt.</p>
          </div>
        </div>
        
        <div className="hero-actions flex gap-4">
          <Link href="/demo" className="btn btn-primary">Demo Talep Et</Link>
          <a href="#how-it-works" className="btn btn-outline">Nasıl Çalışır?</a>
        </div>
      </div>
      
      {/* Right Visual (Hero Composition) */}
      <div className="hero-visual lg:w-1/2 fade-in-up" style={{ animationDelay: '0.4s' }}>
        <img 
          src="/hero-composition.png" 
          alt="Peralera Ürün Görünümü" 
          className="w-full h-auto object-contain drop-shadow-2xl" 
        />
      </div>

    </section>
  );
};

export default Hero;
