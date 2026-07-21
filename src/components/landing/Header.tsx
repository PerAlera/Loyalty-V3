"use client";

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header container">
      <div className="header-logo">
        {/* Placeholder Logo */}
        <span className="logo-icon">🌿</span>
        <span className="logo-text">peralera</span>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link href="#features">Özellikler</Link></li>
          <li><Link href="#how-it-works">Nasıl Çalışır?</Link></li>
          <li><Link href="#pricing">Fiyatlandırma</Link></li>
          <li><Link href="#testimonials">Referanslar</Link></li>
          <li><Link href="#faq">SSS</Link></li>
        </ul>
      </nav>
      <div className="header-actions">
        <Link href="/demo" className="btn btn-primary">Demo Al &rarr;</Link>
      </div>
    </header>
  );
};

export default Header;
