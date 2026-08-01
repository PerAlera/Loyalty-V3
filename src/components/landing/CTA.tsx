"use client";

import Link from 'next/link';

import { Smartphone, Zap, Clock } from 'lucide-react';

const CTA = () => {
  return (
    <section className="cta w-full mt-12" style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="flex flex-col xl:flex-row justify-between items-center gap-8 py-12 px-8 w-full max-w-[1400px] mx-auto shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        {/* Left: Text & Button */}
        <div className="z-10 flex flex-col md:flex-row items-center gap-8 xl:w-1/2">
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-black mb-2 text-white tracking-tight">Hemen Başlayın!</h2>
            <p className="text-white/80 text-sm lg:text-base max-w-md leading-relaxed">
              Müşterilerinizi sadıklaştırmak ve işletmenizi büyütmek için ilk adımı atın.
            </p>
          </div>
          <Link href="/demo" className="btn text-white hover:opacity-90 py-3 px-8 text-base shadow-xl font-bold whitespace-nowrap" style={{ backgroundColor: 'var(--accent-color)' }}>
            Demo Talep Et
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex flex-col md:flex-row items-center gap-6 z-10 xl:w-1/2 xl:justify-end">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-0.5">Ücretsiz Demo</h4>
              <p className="text-xs text-white/70">Sistemi ücretsiz deneyin.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-0.5">Hızlı Kurulum</h4>
              <p className="text-xs text-white/70">Dakikalar içinde başlayın.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-0.5">7/24 Destek</h4>
              <p className="text-xs text-white/70">Her zaman yanınızdayız.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
