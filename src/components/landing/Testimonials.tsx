import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Mert A.",
      role: "Kahve Dükkanı Sahibi",
      content: "Kağıt kartlardan Peralera'ya geçtikten sonra müşterilerimizin geri dönüş oranı %40 arttı. Kimin ne zaman geldiğini görmek harika.",
      initials: "MA"
    },
    {
      name: "Zeynep Y.",
      role: "Güzellik Salonu İşletmecisi",
      content: "Uygulama indirme zorunluluğu olmaması en büyük artısı. Müşteriler saniyeler içinde QR okutuyor, kampanyalarımız anında ulaşıyor.",
      initials: "ZY"
    },
    {
      name: "Burak K.",
      role: "Restoran Müdürü",
      content: "Yönetim paneli inanılmaz detaylı. Hangi günlerin durgun olduğunu görüp o günlere özel SMS kampanyaları oluşturabiliyoruz. Kesinlikle tavsiye ederim.",
      initials: "BK"
    }
  ];

  return (
    <section id="testimonials" className="testimonials section container">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-gradient">İşletmeler Peralera'yı Neden Seviyor?</h2>
        <p className="text-secondary max-w-2xl mx-auto mt-4">
          Farklı sektörlerden yüzlerce işletme, sadakat programlarını dijitalleştirmek için bize güveniyor.
        </p>
      </div>

      <div className="testimonial-grid fade-in-up">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial-card">
            <div className="stars flex justify-center mb-4 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="quote">"{review.content}"</p>
            <div className="author mt-6">
              <div className="author-avatar font-bold text-white shadow-md">{review.initials}</div>
              <div>
                <h4 className="font-bold">{review.name}</h4>
                <span className="text-secondary text-sm">{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
