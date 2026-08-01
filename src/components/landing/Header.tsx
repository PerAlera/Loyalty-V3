"use client";

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header container">
      <div className="header-logo">
        <img src="/peralera-logo.svg" alt="PerAlera Logo" className="logo-icon" style={{ width: '48px', height: 'auto', marginRight: '12px' }} />
        <span className="logo-text">PerAlera</span>
      </div>
      <nav className="desktop-nav">
        <ul>
          <li><Link href="/">Ana Sayfa</Link></li>
          <li><Link href="#features">Özellikler</Link></li>
          <li><Link href="#how-it-works">Nasıl Çalışır?</Link></li>
          <li><Link href="#pricing">Paketler</Link></li>
          <li><Link href="#faq">S.S.S</Link></li>
          <li><Link href="#contact">İletişim</Link></li>
        </ul>
      </nav>

      <div className="header-actions">
        <Link href="/demo" className="btn btn-primary">Demo Talep Et</Link>
      </div>
    </header>
  );
};

export default Header;
