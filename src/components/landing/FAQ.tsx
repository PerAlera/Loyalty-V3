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
      question: "POS sistemim ile entegre çalışır mı?",
      answer: "Kurumsal paketlerimizde özel POS entegrasyonu sunuyoruz. Standart paketlerimizde ise POS'tan bağımsız olarak sadece kamerayla QR okutma mantığıyla harici ve çok hızlı çalışır."
    }
  ];

  return (
    <section id="faq" className="faq section container bg-secondary py-16">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>Sıkça Sorulan Sorular</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 fade-in-up mx-auto max-w-4xl">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-gray-200 py-4 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-gray-800">{faq.question}</h4>
              <span className="text-gray-400 font-bold ml-4">{openIndex === index ? '-' : '+'}</span>
            </div>
            <div className={`mt-3 text-xs text-gray-500 leading-relaxed ${openIndex === index ? 'block' : 'hidden'}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
