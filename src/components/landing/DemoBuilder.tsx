"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import MobilePreview from './MobilePreview';

const DemoBuilder = () => {
  const [logo, setLogo] = useState<string>(''); // No default logo
  const [mascot, setMascot] = useState<string>('/mascot1.png');
  const [primaryColor, setPrimaryColor] = useState('#5C4033');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const mascotInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setLogo(fileUrl);
    }
  };

  const handleMascotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setMascot(fileUrl);
    }
  };

  const handleRequestDemo = () => {
    const subject = encodeURIComponent("Peralera Demo Talebi");
    
    const logoText = logo.startsWith('blob:') ? "Özel Logo Yüklendi (Lütfen dosyayı bu e-postaya ekleyin)" : (logo || "Seçilmedi");
    const mascotText = mascot.startsWith('blob:') ? "Özel Maskot Yüklendi (Lütfen dosyayı bu e-postaya ekleyin)" : mascot;
    
    const body = encodeURIComponent(`Merhaba,\n\nAşağıdaki seçimlerle bir demo uygulaması başlatmak istiyorum:\n\nLogo: ${logoText}\nMaskot: ${mascotText}\nAna Renk: ${primaryColor}\n\nİletişime geçmenizi bekliyorum.`);
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
            <h3>1. Firmanızın Logosunu Yükleyin</h3>
            <div className="options-grid">
              <input 
                type="file" 
                accept="image/*" 
                ref={logoInputRef} 
                style={{ display: 'none' }} 
                onChange={handleLogoUpload}
              />
              <div 
                className="option-card upload-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '2rem',
                  border: '2px dashed var(--border-color)',
                  cursor: 'pointer',
                  width: '100%',
                  minHeight: '120px'
                }}
                onClick={() => logoInputRef.current?.click()}
              >
                {logo ? (
                  <>
                    <img src={logo} alt="Uploaded Logo" style={{ maxHeight: '60px', marginBottom: '0.5rem' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Değiştir</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Logo Yükle</span>
                  </>
                )}
              </div>
            </div>
            {logo && (
              <p style={{ fontSize: '0.875rem', color: 'var(--success-color)', marginTop: '0.5rem' }}>
                ✓ Logo başarıyla eklendi.
              </p>
            )}
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
              <div 
                className={`option-card ${mascot.startsWith('blob:') ? 'selected' : ''}`} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '2px dashed var(--border-color)',
                }}
                onClick={() => mascotInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={mascotInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleMascotUpload}
                />
                {mascot.startsWith('blob:') ? (
                  <>
                    <img src={mascot} alt="Uploaded Mascot" style={{ maxHeight: '50px', marginBottom: '0.25rem' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '500', textAlign: 'center' }}>Değiştir</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>➕</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', textAlign: 'center' }}>Kendi Maskotunu<br/>Yükle</span>
                  </>
                )}
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
             <p className="helper-text">Seçimleriniz e-posta ile ekibimize iletilecektir. (Kendi yüklediğiniz dosyaları açılan e-postaya eklemeyi unutmayın)</p>
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
