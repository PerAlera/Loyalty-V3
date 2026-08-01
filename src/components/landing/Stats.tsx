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

      <div className="flex flex-wrap justify-center gap-4 fade-in-up">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 text-center w-48 shadow-sm">
            {stat.icon}
            <div className="text-3xl font-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>{stat.number}</div>
            <h4 className="font-bold text-xs mb-2" style={{ color: 'var(--primary-color)' }}>{stat.title}</h4>
            <p className="text-[10px] text-gray-500 leading-tight">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
