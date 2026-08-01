import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer section container py-16" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
      {/* Top Part */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 px-4">
        {/* Brand */}
        <div className="md:col-span-4 lg:col-span-4">
          <div className="flex items-center mb-6">
            <img src="/peralera-logo.svg" alt="PerAlera Logo" className="w-12 h-12 mr-4 brightness-0 invert" />
            <span className="font-extrabold text-2xl text-white">PerAlera <br/><span className="text-sm font-medium text-white/70">Sadakat Sistemi</span></span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed max-w-xs">
            Kafe ve restoranlar için dijital sadakat sistemi. Müşterilerinizi sadıklaştırın, işletmenizi büyütün.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="font-bold text-base mb-6 text-white">Hızlı Linkler</h4>
          <ul className="space-y-4 text-sm font-medium text-white/70">
            <li><a href="/" className="hover:text-white transition-colors">Ana Sayfa</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Özellikler</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır?</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Paketler</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">S.S.S</a></li>
          </ul>
        </div>

        {/* Packages */}
        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="font-bold text-base mb-6 text-white">Paketler</h4>
          <ul className="space-y-4 text-sm font-medium text-white/70">
            <li><a href="#pricing" className="hover:text-white transition-colors">6 Ay Paket</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">9 Ay Paket</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">12 Ay Paket</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="md:col-span-4 lg:col-span-4">
          <h4 className="font-bold text-base mb-6 text-white">İletişim</h4>
          <ul className="space-y-4 text-sm font-medium text-white/70 mb-8">
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 opacity-80" /> +90 553 123 45 67</li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 opacity-80" /> info@peralera.com</li>
            <li className="flex items-center gap-3"><MapPin className="w-5 h-5 opacity-80" /> İstanbul, Türkiye</li>
          </ul>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-white/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 px-4">
        <div className="text-sm text-white/50 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Peralera. Tüm hakları saklıdır.
        </div>
        
        {/* Large Logo Right */}
        <div className="flex items-center opacity-20 hover:opacity-40 transition-opacity">
          <img src="/peralera-logo.svg" alt="PerAlera Logo" className="w-10 h-10 mr-3 brightness-0 invert" />
          <span className="font-black text-2xl tracking-tighter text-white">PerAlera</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
