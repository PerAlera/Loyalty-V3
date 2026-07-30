"use client";

import React from 'react';
import Link from 'next/link';
import { Rocket, ChevronRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero section container">
      <div className="hero-content text-center fade-in-up">
        <div className="badge mx-auto mb-6">
          <Rocket className="w-4 h-4 mr-2 inline" /> Yeni Nesil Sadakat Yönetimi
        </div>
        <h1 className="hero-title text-gradient">
          Müşteri Sadakatini <br /> Geleceğe Taşıyın.
        </h1>
        <p className="hero-subtitle mx-auto">
          Geleneksel kağıt kartları unutun. İşletmeniz için veri odaklı, %100 dijital sadakat ve kampanya yönetimi ile müşterilerinizi kalıcı hale getirin.
        </p>
        
        <div className="hero-actions justify-center mt-8">
          <Link href="/demo" className="btn btn-primary btn-lg">Ücretsiz Demo Al <ChevronRight className="w-5 h-5 ml-1 inline" /></Link>
          <a href="#how-it-works" className="btn btn-secondary btn-lg">Nasıl Çalışır?</a>
        </div>

        <div className="hero-social-proof justify-center mt-12">
          <div className="rating flex items-center justify-center gap-3">
            <div className="stars flex" style={{ color: '#F59E0B' }}>
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Seçkin işletmeler PerAlera ile büyüyor.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
