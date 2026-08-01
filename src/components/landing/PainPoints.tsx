import React from 'react';
import { Users, TrendingDown, Megaphone, ClipboardList, CheckCircle2, Bell } from 'lucide-react';
import Link from 'next/link';

const PainPoints = () => {
  return (
    <section className="section container bg-secondary">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>Sorununuz Bizim İçin Net!</h2>
        <p className="text-secondary max-w-2xl mx-auto">
          Sadık müşterileriniz var ama onları kaybetme riskiyle karşı karşıyasınız.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch fade-in-up">
        
        {/* Left: 4 Icons Grid */}
        <div className="lg:w-3/5 grid grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="text-center">
            <Users className="w-10 h-10 mx-auto mb-4 text-gray-700" strokeWidth={1.5} />
            <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--primary-color)' }}>Sadakat programınız yoksa</h4>
            <p className="text-xs text-gray-500">Rakipleriniz müşterilerinizi sizi tercih ettiği için değil, bir avantaj verdiği için alıyor.</p>
          </div>
          
          <div className="text-center">
            <TrendingDown className="w-10 h-10 mx-auto mb-4 text-gray-700" strokeWidth={1.5} />
            <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--primary-color)' }}>Tekrar ziyaretler düşükse</h4>
            <p className="text-xs text-gray-500">Müşteriniz bir daha ne zaman geleceğini hatırlamıyor mu?</p>
          </div>
          
          <div className="text-center">
            <Megaphone className="w-10 h-10 mx-auto mb-4 text-gray-700" strokeWidth={1.5} />
            <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--primary-color)' }}>Pazarlama maliyetleri yüksekse</h4>
            <p className="text-xs text-gray-500">Yeni müşteri kazanmak, mevcut müşteriyi korumaktan daha pahalı.</p>
          </div>
          
          <div className="text-center">
            <ClipboardList className="w-10 h-10 mx-auto mb-4 text-gray-700" strokeWidth={1.5} />
            <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--primary-color)' }}>Müşteri verilerinizi takip edemiyorsanız</h4>
            <p className="text-xs text-gray-500">Kimin ne zaman geldiğini, ne harcadığını bilmiyor musunuz?</p>
          </div>

        </div>

        {/* Right: Solution Box */}
        <div className="lg:w-2/5 p-8 rounded-2xl flex flex-col justify-between relative shadow-lg" style={{ backgroundColor: 'var(--accent-light)' }}>
          <div className="absolute top-6 right-6 bg-primary-color text-white p-2 rounded-full shadow-md" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Bell className="w-5 h-5" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>Çözüm Peralera!</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dijital sadakat kartı ile puan yerine çekirdek sistemi</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>QR kod ile kolay kullanım</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Müşteri verilerinizi takip edin</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>İnaktif müşterileri tespit edin ve tek tıkla tarayıcı bildirimi göndererek kafenize geri çağırın</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Özel kampanya ve duyurular oluşturun</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <Link href="#features" className="btn btn-primary w-full shadow-md text-sm">Tüm Özellikleri İncele</Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default PainPoints;
