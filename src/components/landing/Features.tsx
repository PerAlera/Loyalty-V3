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

      <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-start md:items-stretch gap-4 md:gap-2 lg:gap-4 relative mt-12 w-full max-w-7xl mx-auto px-0 md:px-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="text-center flex-1 relative z-10 px-2 md:px-4 group min-w-[120px] md:min-w-0 w-[45%] md:w-auto mb-8 md:mb-0">
              <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl mb-4 md:mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold absolute -top-2 -right-2 md:-top-3 md:-right-3 shadow-md bg-[var(--accent-color)] text-white ring-4 ring-white">
                  {step.number}
                </div>
                {step.icon}
              </div>
              <h4 className="font-extrabold text-sm md:text-lg mb-2 md:mb-3" style={{ color: 'var(--primary-color)' }}>{step.title}</h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:flex flex-shrink-0 items-start pt-6 text-gray-300">
                <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Features;
