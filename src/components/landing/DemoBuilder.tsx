"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import MobilePreview from './MobilePreview';

const DemoBuilder = () => {
  const [logo, setLogo] = useState<string>(''); // No default logo
  const [mascot, setMascot] = useState<string>('/mascot1.png');
  const [primaryColor, setPrimaryColor] = useState('#5C4033');
  
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleRequestDemo = async () => {
    if (!name || !email) {
      alert("Lütfen adınızı ve e-posta adresinizi girin.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, businessName, email, phone, logo, mascot, primaryColor
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
      } else {
        alert("Gönderim başarısız: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="demo-builder-container">
      <header className="demo-header container">
        <Link href="/" className="btn btn-secondary">&larr; Ana Sayfaya Dön</Link>
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

          <div className="form-section">
            <h3>4. İletişim Bilgileriniz</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input type="text" placeholder="Adınız Soyadınız" value={name} onChange={e => setName(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%' }} />
              <input type="text" placeholder="İşletme Adınız" value={businessName} onChange={e => setBusinessName(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%' }} />
              <input type="email" placeholder="E-posta Adresiniz" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%' }} />
              <input type="tel" placeholder="Telefon Numaranız" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%' }} />
            </div>
          </div>

          <div className="form-action-bottom" style={{ marginTop: '2rem' }}>
            {submitSuccess ? (
              <div style={{ padding: '1rem', backgroundColor: 'var(--success-bg)', color: 'var(--success-color)', borderRadius: '8px', textAlign: 'center', fontWeight: '500' }}>
                Talebiniz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </div>
            ) : (
             <button className="btn btn-primary large-action" onClick={handleRequestDemo} disabled={isSubmitting} style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Gönderiliyor...' : 'Bu Tasarımla İletişime Geç \u2192'}
             </button>
            )}
             {!submitSuccess && <p className="helper-text" style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Talebiniz ekibimize anında iletilecektir.</p>}
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
