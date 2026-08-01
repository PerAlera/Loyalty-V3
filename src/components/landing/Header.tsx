"use client";

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header container">
      <div className="header-logo">
        <img src="/peralera-logo.svg" alt="PerAlera Logo" className="logo-icon" style={{ width: '64px', height: 'auto', marginRight: '12px' }} />
        <span className="logo-text text-2xl">PerAlera</span>
      </div>
      <nav className="hidden md:flex">
        <ul className="flex flex-row items-center gap-8 text-base font-bold text-black list-none m-0 p-0">
          <li><Link href="/" className="hover:text-[var(--primary-color)] transition-colors">Ana Sayfa</Link></li>
          <li><Link href="#features" className="hover:text-[var(--primary-color)] transition-colors">Özellikler</Link></li>
          <li><Link href="#how-it-works" className="hover:text-[var(--primary-color)] transition-colors">Nasıl Çalışır?</Link></li>
          <li><Link href="#pricing" className="hover:text-[var(--primary-color)] transition-colors">Paketler</Link></li>
          <li><Link href="#faq" className="hover:text-[var(--primary-color)] transition-colors">S.S.S</Link></li>
          <li><Link href="#contact" className="hover:text-[var(--primary-color)] transition-colors">İletişim</Link></li>
        </ul>
      </nav>

      <div className="header-actions">
        <Link href="/demo" className="btn btn-primary px-6 py-2.5">Demo Talep Et</Link>
      </div>
    </header>
  );
};

export default Header;
