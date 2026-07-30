import React from 'react';
import { Trash2, TrendingDown, UsersRound, ArrowRight } from 'lucide-react';

const PainPoints = () => {
  return (
    <section className="pain-points section container">
      <div className="text-center fade-in-up mb-12">
        <h2 className="text-gradient">Eski Yöntemler İşletmenize Neler Kaybettiriyor?</h2>
        <p className="text-secondary max-w-2xl mx-auto mt-4">
          Kağıt sadakat kartları sadece çevreye zarar vermekle kalmaz, aynı zamanda işletmenizin büyümesini de engeller.
        </p>
      </div>

      <div className="bento-grid fade-in-up">
        <div className="bento-item pain-card">
          <Trash2 className="w-12 h-12 text-red-500 mb-4 mx-auto" />
          <h4 className="text-lg font-bold mb-2">Kaybolan veya Unutulan Kartlar</h4>
          <p className="text-secondary">Müşterilerinizin %60'ı kağıt kartlarını kaybeder veya evde unutur. Bu da sadakat programının etkisini sıfıra indirir.</p>
        </div>
        
        <div className="bento-item pain-card">
          <TrendingDown className="w-12 h-12 text-red-500 mb-4 mx-auto" />
          <h4 className="text-lg font-bold mb-2">Sıfır Müşteri Verisi</h4>
          <p className="text-secondary">Kağıt kart kullanan müşterilerinizin kim olduğunu, ne sıklıkla geldiğini veya ne harcadığını bilemezsiniz.</p>
        </div>
        
        <div className="bento-item pain-card">
          <UsersRound className="w-12 h-12 text-red-500 mb-4 mx-auto" />
          <h4 className="text-lg font-bold mb-2">İletişim Eksikliği</h4>
          <p className="text-secondary">Müşteriniz dükkandan çıktığı an bağınız kopar. Onlara yeni bir kampanya duyurma şansınız yoktur.</p>
        </div>

        <div className="bento-item highlight flex items-center justify-center flex-col">
          <h4 className="text-white text-xl mb-2">Çözüm Peralera'da</h4>
          <p className="text-white opacity-80 mb-4">%100 dijital, veriye dayalı ve kesintisiz iletişim.</p>
          <a href="#how-it-works" className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'var(--accent-color)' }}>Sistemi İncele <ArrowRight className="w-4 h-4 ml-2 inline" /></a>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
