import React from 'react';
import Link from 'next/link';
import { LineChart, Users, Target, LayoutDashboard, CheckCircle2 } from 'lucide-react';

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
            <li><CheckCircle2 className="w-5 h-5 mr-3" style={{ color: 'var(--success-color)' }} /> <span>Kullanıcı Dostu Arayüz</span></li>
          </ul>

          <Link href="/demo" className="btn btn-primary mt-8">Paneli Keşfet &rarr;</Link>
        </div>
        
        <div className="feature-visual bento-grid fade-in-up">
           <div className="bento-item card-hover">
              <LineChart className="w-10 h-10 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>Analitik</h4>
              <p>Gerçek zamanlı metrikler.</p>
           </div>
           <div className="bento-item card-hover">
              <Users className="w-10 h-10 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>CRM</h4>
              <p>Müşteri ilişkileri yönetimi.</p>
           </div>
           <div className="bento-item card-hover">
              <Target className="w-10 h-10 mb-4 mx-auto" style={{ color: 'var(--accent-color)' }} />
              <h4>Kampanyalar</h4>
              <p>Kişiselleştirilmiş teklifler.</p>
           </div>
           <div className="bento-item highlight card-hover">
              <LayoutDashboard className="w-10 h-10 mb-4 mx-auto text-white" />
              <h4 className="text-white">Tek Ekran</h4>
              <p className="text-white" style={{ opacity: 0.8 }}>Tüm kontrol elinizde.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;
