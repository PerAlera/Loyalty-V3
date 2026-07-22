import React from 'react';

const AppFeature = () => {
  return (
    <section className="app-feature section container">
      <div className="feature-grid reverse">
        <div className="feature-image">
           {/* Reusing hero phone image or you could have a distinct one. We use hero_phone for now, styled differently */}
          <img src="/hero_phone.png" alt="Peralera App Campaigns" className="app-img drop-shadow" />
        </div>
        <div className="feature-content">
          <h2>Müşterilerinizi İşletmenize Bağlayın.</h2>
          <p>Markanıza özel dijital cüzdan ile müşterilerinize premium bir deneyim sunun ve sadakatlerini kalıcı hale getirin.</p>
          
          <div className="mini-features">
            <div className="mini-feature">
              <span className="icon">📱</span>
              <h4>Uygulama İndirme Yok</h4>
            </div>
            <div className="mini-feature">
              <span className="icon">⚡</span>
              <h4>Saniyeler İçinde İşlem</h4>
            </div>
            <div className="mini-feature">
              <span className="icon">🔒</span>
              <h4>Üst Düzey Güvenlik</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-card">
        <h3>İşletmeler Ne Diyor?</h3>
        <p className="quote">"Peralera sayesinde müşterilerimizin geri dönüş oranı ciddi şekilde arttı. Kullanımı çok kolay, panel çok anlaşılır."</p>
        <div className="author">
          <div className="author-avatar">MA</div>
          <div>
            <h4>Mert A.</h4>
            <span>Kahve Dükkanı Sahibi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeature;
