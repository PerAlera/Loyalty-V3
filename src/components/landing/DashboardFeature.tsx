import React from 'react';

const DashboardFeature = () => {
  return (
    <section className="dashboard-feature section container">
      <div className="feature-grid">
        <div className="feature-content">
          <h2>İşletmeniz Her Şeyi Görsün, Siz Yönetin.</h2>
          <p>Tüm verileriniz tek panelde. Müşterilerinizi tanıyın, kampanyalarınızı yönetin, büyümenizi takip edin.</p>
          
          <ul className="feature-checklist">
            <li><span className="check-icon">✓</span> Gerçek zamanlı istatistikler</li>
            <li><span className="check-icon">✓</span> Kampanya oluşturma</li>
            <li><span className="check-icon">✓</span> Müşteri analizleri</li>
            <li><span className="check-icon">✓</span> Kolay yönetim paneli</li>
          </ul>

          <button className="btn btn-primary mt-4">Paneli Keşfet &rarr;</button>
        </div>
        <div className="feature-image">
          <img src="/dashboard.png" alt="Peralera Dashboard Preview" className="dashboard-img shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;
