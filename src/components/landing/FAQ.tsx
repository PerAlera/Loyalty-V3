"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Müşterilerimin mobil uygulama indirmesi şart mı?",
      answer: "Hayır. Peralera tamamen web tabanlı (PWA) çalışır. Müşterileriniz QR kodu telefonlarının kamerasından okutur okutmaz saniyeler içinde doğrudan dijital cüzdanlarına ulaşırlar. İndirme yok, bekleme yok."
    },
    {
      question: "Sistemin kurulumu ne kadar sürüyor?",
      answer: "Kayıt olduktan sonra 5 dakika içinde sisteminizi kullanmaya başlayabilirsiniz. Hesabınızı oluşturun, QR kodunuzu yazdırın (veya tabletinizde açın) ve puan dağıtmaya hazırsınız."
    },
    {
      question: "Kendi restoranımın logosunu ve renklerini kullanabilir miyim?",
      answer: "Kesinlikle! Peralera tamamen 'White Label' (Markanıza Özel) mantığıyla çalışır. Müşterileriniz QR kodu okuttuğunda sizin kafenizin/restoranınızın logosunu, isimlerini ve sizin belirlediğiniz maskotları görürler."
    },
    {
      question: "Birden fazla şubem ve çalışanım var. Nasıl yöneteceğim?",
      answer: "Profesyonel pakette sınırsız kasiyer yetkilendirmesi yapabilirsiniz. Her çalışan kendi şifresiyle giriş yapar ve siz yönetim panelinden hangi şubede hangi çalışanın kaç puan dağıttığını detaylıca raporlayabilirsiniz."
    },

    {
      question: "Paket değiştirmek veya iptal etmek mümkün mü?",
      answer: "İstediğiniz zaman bir üst veya alt pakete geçiş yapabilirsiniz. Mevcut paketinizi iptal etmek isterseniz, dönem sonuna kadar kullanabilir ve sonrasında yenilemeyebilirsiniz."
    }
  ];

  return (
    <section id="faq" className="faq section container bg-gray-50 py-20">
      <div className="text-center fade-in-up mb-16">
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--primary-color)' }}>Sıkça Sorulan Sorular</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up mx-auto max-w-5xl">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white border transition-colors duration-300 rounded-xl overflow-hidden cursor-pointer ${openIndex === index ? 'border-[var(--accent-color)] shadow-md' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center p-5">
              <h4 className="font-bold text-base text-gray-900 pr-4">{faq.question}</h4>
              <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${openIndex === index ? 'bg-[var(--accent-color)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                {openIndex === index ? '-' : '+'}
              </span>
            </div>
            <div className={`px-5 pb-5 text-sm text-gray-600 leading-relaxed ${openIndex === index ? 'block' : 'hidden'}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
