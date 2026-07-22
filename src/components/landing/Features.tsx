import React from 'react';

const Features = () => {
  return (
    <section id="how-it-works" className="features-step section container">
      <div className="features-header text-center">
        <h2>Pürüzsüz Bir Müşteri Deneyimi</h2>
        <p>Müşterileriniz için en zahmetsiz, işletmeniz için en verimli sadakat süreci.</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">📱</span>
          </div>
          <div className="step-number">1</div>
          <h3>QR Teknolojisi</h3>
          <p>Müşteri kasadaki QR kodunu saniyeler içinde akıllı telefonuyla okutur.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">☕</span>
          </div>
          <div className="step-number">2</div>
          <h3>Dijital Cüzdan</h3>
          <p>Uygulama indirmeye gerek kalmadan dijital cüzdanda puanlar güvenle birikir.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">🎁</span>
          </div>
          <div className="step-number">3</div>
          <h3>Akıllı Ödüller</h3>
          <p>İşletmenizin belirlediği eşiklere ulaşıldığında, müşteriler ödüllerini kolayca kullanır.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
