"use client";

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero section container pt-32 pb-20 flex flex-col items-center justify-center text-center gap-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--primary-color)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Main Content */}
      <div className="hero-content w-full max-w-4xl mx-auto flex flex-col items-center fade-in-up z-10">
        <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Müşterilerinizi <span style={{ color: 'var(--primary-color)' }}>Sadıklaştırın</span>,<br className="hidden md:block" />
          İşletmenizi Büyütün!
        </h1>
        
        <p className="hero-subtitle text-xl md:text-2xl mb-10 text-gray-600 max-w-2xl">
          Peralera, kafe ve restoranlar için geliştirilmiş dijital sadakat
          sistemi ile müşterileri çekirdek kazanmaya teşvik eder,
          tekrar ziyaretleri artırır.
        </p>
        
        <div className="hero-actions flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/demo" className="btn btn-primary px-8 py-4 text-lg shadow-xl shadow-[var(--primary-color)]/20">Demo Talep Et</Link>
          <a href="#how-it-works" className="btn btn-outline px-8 py-4 text-lg bg-white/50 backdrop-blur-sm">Nasıl Çalışır?</a>
        </div>

        {/* Highlight Badge */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100/50">
          <div className="text-amber-700 bg-orange-50 p-2.5 rounded-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm text-gray-900">Uygulama indirme derdi yok!</h4>
            <p className="text-xs text-gray-500 font-medium">Doğrudan tarayıcı üzerinden saniyeler içinde kayıt.</p>
          </div>
        </div>
      </div>
      
      {/* Full Width Visual */}
      <div className="hero-visual w-full max-w-6xl mx-auto mt-8 fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 bg-white">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-32 bottom-0"></div>
          <img 
            src="/hero-composition.jpg" 
            alt="Peralera Ürün Görünümü" 
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;
