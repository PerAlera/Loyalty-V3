import React from 'react';
import { Users, QrCode, RefreshCcw, ThumbsUp, BellRing } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-gray-500 mx-auto mb-2" />,
      number: "27",
      title: "Kayıtlı Müşteri",
      desc: "2 haftada sisteme kayıt olan müşteri sayısı."
    },
    {
      icon: <QrCode className="w-6 h-6 text-gray-500 mx-auto mb-2" />,
      number: "224",
      title: "QR Okutma",
      desc: "2 haftada gerçekleşen toplam QR kod okuma sayısı."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-gray-500 mx-auto mb-2" />,
      number: "12",
      title: "Tekrar Ziyaret",
      desc: "2 haftada işletmeye tekrar gelen müşteri sayısı."
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-gray-500 mx-auto mb-2" />,
      number: "%95+",
      title: "Memnuniyet",
      desc: "Hem müşteriler hem de ekibimiz sisteme olumlu tepki verdi."
    },
    {
      icon: <BellRing className="w-6 h-6 text-gray-500 mx-auto mb-2" />,
      number: "%90+",
      title: "Bildirim Açma",
      desc: "Müşterilerin %90'ı tarayıcı bildirimlerine izin verdi."
    }
  ];

  return (
    <section className="section container bg-secondary py-16">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>Gerçek Sonuçlar</h2>
        <p className="text-xs text-gray-500 italic">Pilot işletmelerimizde elde ettiğimiz sonuçlar (2 haftalık örnek veriler).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-5xl mx-auto fade-in-up">
        {stats.map((stat, index) => {
          // Irregular grid logic: first 2 items take 3 columns each (2 items in row), last 3 items take 2 columns each (3 items in row)
          const colSpanClass = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
          
          return (
            <div key={index} className={`bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 ${colSpanClass}`}>
              <div className="w-14 h-14 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--accent-color)]">
                {stat.icon}
              </div>
              <div className="text-5xl font-extrabold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>{stat.number}</div>
              <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--primary-color)' }}>{stat.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{stat.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
