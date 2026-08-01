"use client";

import Link from 'next/link';

import { Smartphone, Zap, Clock } from 'lucide-react';

const CTA = () => {
  return (
    <section className="cta section container mt-0" style={{ backgroundColor: '#493121', color: 'white' }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-8 rounded-xl max-w-6xl mx-auto">
        
        {/* Left: Text & Button */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl font-extrabold mb-2 text-white">Hemen Başlayın!</h2>
          <p className="text-white opacity-80 text-sm mb-6 max-w-sm">Müşterilerinizi sadıklaştırmak ve işletmenizi büyütmek için ilk adımı atın.</p>
          <Link href="/demo" className="btn bg-white hover:bg-gray-100 text-sm py-2 px-6" style={{ color: '#493121' }}>Demo Talep Et</Link>
        </div>

        {/* Right: Icons */}
        <div className="md:w-1/2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Ücretsiz Demo</h4>
              <p className="text-[10px] text-white opacity-70">Sistemi ücretsiz deneyin.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Hızlı Kurulum</h4>
              <p className="text-[10px] text-white opacity-70">Dakikalar içinde başlayın.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">7/24 Destek</h4>
              <p className="text-[10px] text-white opacity-70">Her zaman yanınızdayız.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;
