import React from 'react';

const Footer = () => {
  return (
    <footer className="footer section container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="header-logo" style={{ marginBottom: '1rem' }}>
            <img src="/peralera-logo.svg" alt="PerAlera Logo" className="logo-icon" style={{ width: '32px', height: 'auto', marginRight: '8px' }} />
            <span className="logo-text">PerAlera</span>
          </div>
          <p>İşletmeler için dijital sadakat ve kampanya platformu.</p>
        </div>
        
        <div className="footer-links">
          <h4>Ürün</h4>
          <ul>
            <li><a href="#features">Özellikler</a></li>
            <li><a href="#how-it-works">Nasıl Çalışır?</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Şirket</h4>
          <ul>
            <li><a href="#about">Hakkımızda</a></li>
            <li><a href="#privacy">Gizlilik Politikası</a></li>
            <li><a href="#terms">KVKK</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>İletişim</h4>
          <ul>
            <li><a href="mailto:alperen@peralera.com">alperen@peralera.com</a></li>
            <li className="social-icons">
               <a href="#">IG</a>
               <a href="#">IN</a>
               <a href="#">LI</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Peralera. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
