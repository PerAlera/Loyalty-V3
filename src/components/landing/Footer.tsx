import React from 'react';

const Footer = () => {
  return (
    <footer className="footer section container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">peralera</span>
          </div>
          <p>İşletmeler için dijital sadakat ve kampanya platformu.</p>
        </div>
        
        <div className="footer-links">
          <h4>Ürün</h4>
          <ul>
            <li><a href="#features">Özellikler</a></li>
            <li><a href="#pricing">Fiyatlandırma</a></li>
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
            <li><a href="mailto:hello@peralera.com">hello@peralera.com</a></li>
            <li>+90 538 123 45 67</li>
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
