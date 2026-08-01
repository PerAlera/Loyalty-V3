"use client";

import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "6 Ay Paket",
      oldPrice: "12.000 TL",
      price: "10.800 TL",
      period: "/ 6 Ay",
      features: [
        "Kurulum Bedeli: 10.000 TL",
        "Dijital Sadakat Sistemi",
        "Müşteri Takip ve Analiz",
        "Tarayıcı Bildirimi Özelliği",
        "Kampanya Yönetimi",
        "Teknik Destek"
      ],
      isPopular: false,
      buttonText: "Bu Paketi Seç"
    },
    {
      name: "9 Ay Paket",
      badge: "AVANTAJLI",
      oldPrice: "16.200 TL",
      price: "15.300 TL",
      period: "/ 9 Ay",
      features: [
        "Kurulum Bedeli: 10.000 TL",
        "Dijital Sadakat Sistemi",
        "Müşteri Takip ve Analiz",
        "Tarayıcı Bildirimi Özelliği",
        "Kampanya Yönetimi",
        "Teknik Destek"
      ],
      isPopular: true,
      buttonText: "Bu Paketi Seç"
    },
    {
      name: "12 Ay Paket",
      badge: "EN EKONOMİK",
      oldPrice: "19.200 TL",
      price: "18.000 TL",
      period: "/ 12 Ay",
      features: [
        "Kurulum Bedeli: 10.000 TL",
        "Dijital Sadakat Sistemi",
        "Müşteri Takip ve Analiz",
        "Tarayıcı Bildirimi Özelliği",
        "Kampanya Yönetimi",
        "Teknik Destek"
      ],
      isPopular: true,
      buttonText: "Bu Paketi Seç"
    }
  ];

  return (
    <section id="pricing" className="section container bg-white py-16">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>Paketlerimiz</h2>
        <p className="text-secondary">İşletmeniz için en uygun paketi seçin.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 fade-in-up">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`flex flex-col bg-white border ${plan.isPopular ? 'border-[var(--primary-color)] shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm'} rounded-3xl p-8 relative w-full max-w-sm transition-transform duration-300`}
            style={{ borderColor: plan.isPopular ? 'var(--primary-color)' : '' }}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full px-5 py-1.5 text-xs font-bold text-white tracking-widest shadow-md" style={{ backgroundColor: 'var(--accent-color)' }}>
                {plan.badge}
              </div>
            )}
            
            <h3 className="text-center font-extrabold text-xl mb-6" style={{ color: 'var(--primary-color)' }}>{plan.name}</h3>
            
            <div className="text-center mb-8">
              <div className="text-gray-400 line-through text-sm font-bold mb-1">{plan.oldPrice}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                <span className="text-sm font-bold text-gray-500">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} style={{ color: 'var(--accent-color)' }} />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-full font-bold text-base transition-all shadow-md ${
              plan.isPopular 
                ? 'text-white border-transparent hover:shadow-lg' 
                : 'bg-white hover:bg-gray-50'
            }`} style={{ 
              backgroundColor: plan.isPopular ? 'var(--primary-color)' : 'white',
              borderColor: plan.isPopular ? 'transparent' : 'var(--border-color)',
              color: plan.isPopular ? 'white' : 'var(--text-primary)'
            }}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-6 text-xs text-gray-500">
        Fiyatlarımıza KDV dahildir.
      </div>
    </section>
  );
};

export default Pricing;
