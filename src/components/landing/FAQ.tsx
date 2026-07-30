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
    <section id="faq" className="faq section container">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-gradient">Sıkça Sorulan Sorular</h2>
        <p className="text-secondary mt-4">Aklınıza takılan tüm soruların cevapları burada.</p>
      </div>

      <div className="faq-container fade-in-up mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-question">
              <h4 className="font-bold text-lg">{faq.question}</h4>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </div>
            <div className={`faq-answer ${openIndex === index ? 'block' : 'hidden'}`}>
              <p className="text-secondary mt-4 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
