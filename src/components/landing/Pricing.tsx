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
      isPopular: false,
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
            className={`flex flex-col bg-white border ${plan.isPopular ? 'border-primary-color shadow-lg scale-105 z-10' : 'border-gray-200'} rounded-2xl p-8 relative w-full max-w-sm`}
            style={{ borderColor: plan.isPopular ? 'var(--primary-color)' : '' }}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold text-white tracking-widest" style={{ backgroundColor: 'var(--primary-color)' }}>
                {plan.badge}
              </div>
            )}
            
            <h3 className="text-center font-bold text-lg mb-6" style={{ color: 'var(--primary-color)' }}>{plan.name}</h3>
            
            <div className="text-center mb-6">
              <div className="text-red-500 line-through text-sm font-bold opacity-70 mb-1">{plan.oldPrice}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                <span className="text-sm font-bold text-gray-500">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-4 h-4" strokeWidth={3} style={{ color: 'var(--text-primary)' }} />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-full font-bold text-sm transition-colors border-2 ${
              plan.isPopular 
                ? 'text-white border-transparent hover:opacity-90' 
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
