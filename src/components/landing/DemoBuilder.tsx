"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MobilePreview from './MobilePreview';

const DemoBuilder = () => {
  const [logo, setLogo] = useState('/1.svg');
  const [mascot, setMascot] = useState('/mascot1.png');
  const [primaryColor, setPrimaryColor] = useState('#5C4033');

  const handleRequestDemo = () => {
    const subject = encodeURIComponent("Peralera Demo Talebi");
    const body = encodeURIComponent(`Merhaba,\n\nAşağıdaki seçimlerle bir demo uygulaması başlatmak istiyorum:\n\nLogo: ${logo}\nMaskot: ${mascot}\nAna Renk: ${primaryColor}\n\nİletişime geçmenizi bekliyorum.`);
    window.location.href = `mailto:hello@peralera.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="demo-builder-container">
      <header className="demo-header container">
        <Link href="/home" className="btn btn-secondary">&larr; Ana Sayfaya Dön</Link>
        <h2>Uygulamanızı Tasarlayın</h2>
        <div style={{ width: '130px' }}></div> {/* Spacer for flex alignment */}
      </header>

      <div className="demo-builder-content container">
        <div className="demo-form">
          <div className="form-section">
            <h3>1. Firmanızın Logosunu Seçin</h3>
            <div className="options-grid">
              <div className={`option-card ${logo === '/1.svg' ? 'selected' : ''}`} onClick={() => setLogo('/1.svg')}>
                <img src="/1.svg" alt="Logo 1" />
              </div>
              <div className={`option-card ${logo === '/2.svg' ? 'selected' : ''}`} onClick={() => setLogo('/2.svg')}>
                <img src="/2.svg" alt="Logo 2" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>2. Bir Maskot Belirleyin</h3>
            <div className="options-grid">
              <div className={`option-card ${mascot === '/mascot1.png' ? 'selected' : ''}`} onClick={() => setMascot('/mascot1.png')}>
                <img src="/mascot1.png" alt="Koşan Kahve" />
              </div>
              <div className={`option-card ${mascot === '/mascot2.png' ? 'selected' : ''}`} onClick={() => setMascot('/mascot2.png')}>
                <img src="/mascot2.png" alt="Zıplayan Çekirdek" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>3. Uygulama Rengini Seçin</h3>
            <div className="color-options">
              {['#5C4033', '#1F2937', '#DC2626', '#059669', '#2563EB', '#D97706'].map(color => (
                <div 
                  key={color} 
                  className={`color-circle ${primaryColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setPrimaryColor(color)}
                />
              ))}
              <input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="color-picker"
                title="Özel Renk Seç"
              />
            </div>
          </div>

          <div className="form-action-bottom">
             <button className="btn btn-primary large-action" onClick={handleRequestDemo}>
                Bu Tasarımla İletişime Geç &rarr;
             </button>
             <p className="helper-text">Seçimleriniz e-posta ile ekibimize iletilecektir.</p>
          </div>
        </div>

        <div className="demo-preview">
          <MobilePreview logo={logo} mascot={mascot} primaryColor={primaryColor} />
        </div>
      </div>
    </div>
  );
};

export default DemoBuilder;
