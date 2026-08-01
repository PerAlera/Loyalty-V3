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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch fade-in-up">
        
        {/* Left: 4 Icons Grid */}
        <div className="md:col-span-3 grid grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
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
        <div className="md:col-span-2 p-10 pt-16 rounded-3xl flex flex-col justify-between relative shadow-xl bg-gray-50 border border-gray-100">
          <div className="absolute top-6 left-6 bg-[var(--primary-color)] text-white p-2.5 rounded-full shadow-md">
            <Bell className="w-6 h-6" />
          </div>
          
          <div>
            <h3 className="text-3xl font-extrabold mb-8" style={{ color: 'var(--primary-color)' }}>Çözüm Peralera!</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[var(--accent-color)]" />
                <span className="text-base font-medium text-gray-800">Dijital sadakat kartı ile puan yerine çekirdek sistemi</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[var(--accent-color)]" />
                <span className="text-base font-medium text-gray-800">QR kod ile kolay kullanım</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[var(--accent-color)]" />
                <span className="text-base font-medium text-gray-800">Müşteri verilerinizi takip edin</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[var(--accent-color)]" />
                <span className="text-base font-medium text-gray-800">İnaktif müşterileri tespit edin ve tek tıkla tarayıcı bildirimi göndererek kafenize geri çağırın</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0 text-[var(--accent-color)]" />
                <span className="text-base font-medium text-gray-800">Özel kampanya ve duyurular oluşturun</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-10">
            <Link href="#features" className="btn bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] w-full py-4 text-lg shadow-lg">Tüm Özellikleri İncele</Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default PainPoints;
