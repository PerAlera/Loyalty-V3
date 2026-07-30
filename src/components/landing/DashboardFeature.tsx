import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const DashboardFeature = () => {
  return (
    <section className="dashboard-feature section container">
      <div className="feature-grid">
        <div className="feature-content fade-in-up">
          <h2 className="text-gradient">Veriye Dayalı Yönetim ile Kontrol Sizde.</h2>
          <p>Gelişmiş yönetim paneli sayesinde müşteri davranışlarını analiz edin, özel kampanyalar oluşturun ve işletmenizin büyüme ivmesini canlı takip edin.</p>
          
          <ul className="feature-checklist mt-8">
            <li><CheckCircle2 className="w-5 h-5 mr-3" style={{ color: 'var(--success-color)' }} /> <span>Anlık Performans Raporları</span></li>
            <li><CheckCircle2 className="w-5 h-5 mr-3" style={{ color: 'var(--success-color)' }} /> <span>Hedefli Kampanya Yönetimi</span></li>
            <li><CheckCircle2 className="w-5 h-5 mr-3" style={{ color: 'var(--success-color)' }} /> <span>Detaylı Müşteri Segmentasyonu</span></li>
            <li><CheckCircle2 className="w-5 h-5 mr-3" style={{ color: 'var(--success-color)' }} /> <span>Şube Bazlı Yönetim</span></li>
          </ul>

          <Link href="/demo" className="btn btn-primary mt-8">Paneli Keşfet &rarr;</Link>
        </div>
        
        <div className="feature-visual fade-in-up">
           <div className="mockup-browser right-float">
             <div className="mockup-browser-header">
               <div className="mockup-dots"><span></span><span></span><span></span></div>
             </div>
             <img src="/dashboard.png" alt="Yönetim Paneli" className="w-full h-auto block" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;
