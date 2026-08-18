"use client";

import React from 'react';
import { Check, Minus } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "STANDART PAKET",
      subtitle: "Temel Dijital Sadakat Sistemi",
      oldPrice: "",
      price: "10.000 TL",
      period: "/ Yıllık Abonelik",
      setupFee: "(Kurulum Ücretsiz)",
      features: [
        { text: "Sadece QR ile Puan Toplama ve Ödül Verme", included: true },
        { text: "Sınırsız Şube Müşterisi", included: true },
        { text: "Standart Panel Erişimi", included: true },
        { text: "Detaylı İstatistikler & Müşteri Analizi", included: false },
        { text: "Yeni Özellik Güncellemeleri", included: false },
        { text: "7/24 VIP WhatsApp Desteği", included: false }
      ],
      isPopular: false,
      buttonText: "Bu Paketi Seç"
    },
    {
      name: "VIP BÜYÜME PAKETİ",
      subtitle: "İşletmenizi Büyütecek Tüm Özellikler",
      badge: "En Çok Tercih Edilen",
      oldPrice: "25.000 TL",
      price: "17.500 TL",
      period: "/ Yıllık Abonelik",
      setupFee: "(Kurulum Ücretsiz)",
      features: [
        { text: "QR ile Puan Toplama ve Ödül Verme", included: true },
        { text: "Sınırsız Şube Müşterisi", included: true },
        { text: "Detaylı İstatistikler & Müşteri Analizi", included: true },
        { text: "Gelişmiş Bildirim Gönderme", included: true },
        { text: "Sisteme Eklenecek Tüm Yeni Premium Güncellemeler", included: true },
        { text: "7/24 Birebir VIP WhatsApp Desteği", included: true }
      ],
      isPopular: true,
      buttonText: "Bu Paketi Seç"
    }
  ];

  return (
    <section id="pricing" className="section container bg-white py-16">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Peralera Fiyatları</h2>
        <p className="text-secondary">İşletmenize en uygun paketi seçin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-up w-full max-w-4xl mx-auto px-4 items-stretch">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`flex flex-col bg-white border ${plan.isPopular ? 'border-[var(--primary-color)] shadow-2xl scale-105 z-10' : 'border-gray-200 shadow-sm'} rounded-[2rem] p-8 relative w-full h-full transition-transform duration-300`}
            style={{ 
              borderColor: plan.isPopular ? 'var(--primary-color)' : '',
              backgroundColor: plan.isPopular ? 'var(--primary-color)' : 'white'
            }}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full px-5 py-1.5 text-xs font-bold text-white tracking-widest shadow-md" style={{ backgroundColor: 'var(--accent-color)' }}>
                {plan.badge}
              </div>
            )}
            
            <h3 className={`text-center font-extrabold text-2xl mb-1 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <p className={`text-center text-sm font-medium mb-6 ${plan.isPopular ? 'text-green-100' : 'text-gray-500'}`}>{plan.subtitle}</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`} strokeWidth={3} />
                  ) : (
                    <Minus className={`w-5 h-5 flex-shrink-0 ${plan.isPopular ? 'text-green-200/50' : 'text-gray-300'}`} strokeWidth={3} />
                  )}
                  <span className={`text-sm font-medium ${feature.included ? (plan.isPopular ? 'text-white' : 'text-gray-700') : (plan.isPopular ? 'text-green-100/60 line-through' : 'text-gray-400 line-through')}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-center mb-8 border-t pt-6" style={{ borderColor: plan.isPopular ? 'rgba(255,255,255,0.1)' : 'var(--border-color)' }}>
              {plan.oldPrice && <div className={`line-through text-sm font-bold mb-1 ${plan.isPopular ? 'text-green-100' : 'text-gray-400'}`}>{plan.oldPrice}</div>}
              <div className="flex items-baseline justify-center gap-1 flex-wrap">
                <span className={`text-4xl font-black tracking-tight ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
              </div>
              <div className={`mt-2 text-sm font-bold ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.period}</div>
              <div className={`mt-1 text-xs font-medium ${plan.isPopular ? 'text-green-100' : 'text-gray-500'}`}>{plan.setupFee}</div>
            </div>

            <button className={`w-full py-4 rounded-full font-bold text-base transition-all shadow-md ${
              plan.isPopular 
                ? 'bg-white text-gray-900 hover:shadow-lg' 
                : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
            }`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 text-sm font-medium text-gray-500 max-w-2xl mx-auto px-4">
        💳 Kredi kartı ile ödeme ve tüm kartlara taksit imkanımız bulunmaktadır.<br/>
        <span className="text-xs text-gray-400">(Kredi kartı ödemelerinde hizmet sağlayıcı komisyonları uygulanır.)</span>
      </div>
    </section>
  );
};

export default Pricing;
