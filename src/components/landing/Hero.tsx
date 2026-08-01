"use client";

import React from 'react';
import Link from 'next/link';
import { Smartphone, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero section container pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative overflow-hidden w-full max-w-7xl mx-auto">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-color)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Left Content */}
      <div className="hero-content flex flex-col justify-center text-left fade-in-up z-10 w-full">
        <h1 className="hero-title text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
          Müşterilerinizi <span className="text-[var(--primary-color)]">Sadıklaştırın</span>,<br />
          İşletmenizi Büyütün!
        </h1>
        
        <p className="hero-subtitle text-lg lg:text-xl mb-8 text-gray-600 max-w-lg">
          Peralera, kafe ve restoranlar için geliştirilmiş dijital sadakat
          sistemi ile müşterileri çekirdek kazanmaya teşvik eder,
          tekrar ziyaretleri artırır.
        </p>
        
        {/* Highlight Box */}
        <div className="bg-white rounded-xl p-4 flex items-start gap-4 mb-10 shadow-sm border border-gray-100 max-w-md">
          <div className="text-[var(--accent-color)] bg-[var(--accent-light)] p-2.5 rounded-lg flex-shrink-0">
            <Smartphone size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-0.5">Uygulama indirme derdi yok!</h4>
            <p className="text-xs text-gray-500 font-medium">Doğrudan tarayıcı üzerinden saniyeler içinde kayıt.</p>
          </div>
        </div>
        
        <div className="hero-actions flex flex-col sm:flex-row gap-4">
          <Link href="/demo" className="btn bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] px-8 py-3.5 text-lg shadow-lg shadow-[var(--primary-color)]/20 transition-all">Demo Talep Et</Link>
          <a href="#how-it-works" className="btn bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-hover)] px-8 py-3.5 text-lg shadow-md transition-all">Nasıl Çalışır?</a>
        </div>
      </div>
      
      {/* Right Visual (Using provided image) */}
      <div className="hero-visual w-full fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
          <img 
            src="/hero-composition.jpg" 
            alt="Peralera Ürün Görünümü" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;
