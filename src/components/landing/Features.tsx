import React from 'react';

const Features = () => {
  return (
    <section id="how-it-works" className="features-step section container">
      <div className="features-header text-center">
        <h2>Nasıl Çalışır?</h2>
        <p>Sadece 3 adımda sadakat sistemi hazır.</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">📱</span>
          </div>
          <div className="step-number">1</div>
          <h3>QR Kodunu Okut</h3>
          <p>Müşteri kasadaki QR kodunu okutur.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">☕</span>
          </div>
          <div className="step-number">2</div>
          <h3>Puanını Kazan</h3>
          <p>Her alışverişte puan birikir.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step">
          <div className="step-icon-wrapper">
            <span className="step-icon">🎁</span>
          </div>
          <div className="step-number">3</div>
          <h3>Hediyeni Al</h3>
          <p>Belirlediğiniz ödülleri kazanır.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
