import React from 'react';

const DashboardFeature = () => {
  return (
    <section className="dashboard-feature section container">
      <div className="feature-grid">
        <div className="feature-content">
          <h2>Veriye Dayalı Yönetim ile Kontrol Sizde.</h2>
          <p>Gelişmiş yönetim paneli sayesinde müşteri davranışlarını analiz edin, özel kampanyalar oluşturun ve işletmenizin büyüme ivmesini canlı takip edin.</p>
          
          <ul className="feature-checklist">
            <li><span className="check-icon">✓</span> Anlık Performans Raporları</li>
            <li><span className="check-icon">✓</span> Hedefli Kampanya Yönetimi</li>
            <li><span className="check-icon">✓</span> Detaylı Müşteri Segmentasyonu</li>
            <li><span className="check-icon">✓</span> Kullanıcı Dostu Arayüz</li>
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
