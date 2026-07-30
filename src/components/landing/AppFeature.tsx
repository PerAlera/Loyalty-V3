import React from 'react';
import { Smartphone, Zap, Shield } from 'lucide-react';

const AppFeature = () => {
  return (
    <section className="app-feature section container">
      <div className="feature-grid reverse">
        <div className="feature-visual fade-in-up flex justify-center">
           <div className="mockup-phone">
             <div className="mockup-phone-notch"></div>
             <img src="/hero_phone.png" alt="Peralera App Preview" className="w-full h-auto block" />
           </div>
        </div>
        
        <div className="feature-content fade-in-up">
          <h2 className="text-gradient">Müşterilerinizi İşletmenize Bağlayın.</h2>
          <p>Markanıza özel dijital cüzdan ile müşterilerinize premium bir deneyim sunun ve sadakatlerini kalıcı hale getirin.</p>
          
          <div className="mini-features mt-8">
            <div className="mini-feature card-hover">
              <Smartphone className="w-8 h-8 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>Uygulama İndirme Yok</h4>
            </div>
            <div className="mini-feature card-hover">
              <Zap className="w-8 h-8 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>Saniyeler İçinde İşlem</h4>
            </div>
            <div className="mini-feature card-hover">
              <Shield className="w-8 h-8 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>Üst Düzey Güvenlik</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeature;
