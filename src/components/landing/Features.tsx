import React from 'react';
import { QrCode, Smartphone, Coffee, Gift, ArrowRight } from 'lucide-react';

const Features = () => {
  const steps = [
    {
      number: "1",
      icon: <QrCode className="w-8 h-8 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />,
      title: "QR Kodu Okutun",
      desc: "Sistemi sizi özel QR kodu sayfasına yönlendirir."
    },
    {
      number: "2",
      icon: <Smartphone className="w-8 h-8 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />,
      title: "Hızlı Kayıt",
      desc: "Ad, telefon numarası ile saniyeler içinde kayıt olursunuz. Uygulama indirme yok!"
    },
    {
      number: "3",
      icon: <Coffee className="w-8 h-8 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />,
      title: "Çekirdek Kazanın",
      desc: "Her harcamanızda çekirdek kazanırsınız. Çekirdekler birikir."
    },
    {
      number: "4",
      icon: <Gift className="w-8 h-8 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />,
      title: "Ödül Kazanın",
      desc: "Yeterli çekirdeğe ulaştığınızda ödüllerinizi alın, tekrar gelin."
    }
  ];

  return (
    <section id="how-it-works" className="section container bg-white py-16">
      <div className="text-center fade-in-up mb-16">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>Nasıl Çalışır?</h2>
        <p className="text-secondary max-w-2xl mx-auto">
          Uygulama indirme derdi yok. Doğrudan tarayıcı üzerinden saniyeler içinde kayıt olur.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 fade-in-up relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="text-center flex-1 relative z-10 px-4">
              <div className="relative inline-block">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold absolute -top-3 -left-3 shadow-sm" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--primary-color)' }}>
                  {step.number}
                </div>
                {step.icon}
              </div>
              <h4 className="font-bold text-sm mb-2 mt-2" style={{ color: 'var(--primary-color)' }}>{step.title}</h4>
              <p className="text-xs text-gray-500">{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center h-24 text-gray-300">
                <ArrowRight className="w-6 h-6" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Features;
