import React from 'react';
import { Smartphone, Wallet, Gift } from 'lucide-react';

const Features = () => {
  return (
    <section id="how-it-works" className="features-step section container">
      <div className="features-header text-center fade-in-up">
        <h2 className="text-gradient">Pürüzsüz Bir Müşteri Deneyimi</h2>
        <p>Müşterileriniz için en zahmetsiz, işletmeniz için en verimli sadakat süreci.</p>
      </div>

      <div className="steps-container mt-12">
        <div className="step card-hover">
          <div className="step-icon-wrapper">
            <Smartphone className="w-8 h-8" style={{ color: 'var(--accent-color)' }} />
          </div>
          <div className="step-number">1</div>
          <h3>QR Teknolojisi</h3>
          <p>Müşteri kasadaki QR kodunu saniyeler içinde akıllı telefonuyla okutur.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step card-hover">
          <div className="step-icon-wrapper">
            <Wallet className="w-8 h-8" style={{ color: 'var(--accent-color)' }} />
          </div>
          <div className="step-number">2</div>
          <h3>Dijital Cüzdan</h3>
          <p>Uygulama indirmeye gerek kalmadan dijital cüzdanda puanlar güvenle birikir.</p>
        </div>
        
        <div className="step-connector"></div>

        <div className="step card-hover">
          <div className="step-icon-wrapper">
            <Gift className="w-8 h-8" style={{ color: 'var(--accent-color)' }} />
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
