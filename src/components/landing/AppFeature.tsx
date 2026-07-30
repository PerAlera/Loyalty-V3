import React from 'react';
import { Smartphone, Zap, Shield, Sparkles } from 'lucide-react';

const AppFeature = () => {
  return (
    <section className="app-feature section container">
      <div className="feature-grid reverse">
        <div className="feature-visual premium-card flex flex-col items-center justify-center text-center p-12 fade-in-up" style={{ minHeight: '400px' }}>
          <div className="glass-icon-container mb-6">
            <Sparkles className="w-16 h-16" style={{ color: 'var(--accent-color)' }} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Modern ve Kesintisiz</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Müşterileriniz için tamamen pürüzsüz bir dijital deneyim. Kart taşımaya veya uygulama indirmeye son.</p>
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

      <div className="testimonial-card fade-in-up">
        <h3>İşletmeler Ne Diyor?</h3>
        <p className="quote">"Peralera sayesinde müşterilerimizin geri dönüş oranı ciddi şekilde arttı. Kullanımı çok kolay, panel çok anlaşılır."</p>
        <div className="author mt-6">
          <div className="author-avatar font-bold text-white shadow-md">MA</div>
          <div>
            <h4 className="font-bold">Mert A.</h4>
            <span style={{ color: 'var(--text-secondary)' }}>Kahve Dükkanı Sahibi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeature;
