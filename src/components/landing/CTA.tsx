"use client";

import Link from 'next/link';

import { Smartphone, Zap, Clock } from 'lucide-react';

const CTA = () => {
  return (
    <section className="cta section container mt-12 mb-20 px-4">
      <div className="flex flex-col items-center text-center py-16 px-8 rounded-3xl max-w-5xl mx-auto shadow-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--primary-color)' }}>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        {/* Top: Text & Button */}
        <div className="mb-16 z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Hemen Başlayın!</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl leading-relaxed">
            Müşterilerinizi sadıklaştırmak ve işletmenizi büyütmek için ilk adımı atın. Saniyeler içinde dijital sadakat sisteminize kavuşun.
          </p>
          <Link href="/demo" className="btn text-white hover:opacity-90 py-4 px-10 text-lg shadow-xl font-bold" style={{ backgroundColor: 'var(--accent-color)' }}>
            Demo Talep Et
          </Link>
        </div>

        {/* Bottom: Icons */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 pt-10 border-t border-white/10 z-10">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">Ücretsiz Demo</h4>
              <p className="text-sm text-white/70">Sistemi ücretsiz deneyin.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">Hızlı Kurulum</h4>
              <p className="text-sm text-white/70">Dakikalar içinde başlayın.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-1">7/24 Destek</h4>
              <p className="text-sm text-white/70">Her zaman yanınızdayız.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
