"use client";

import Link from 'next/link';

const CTA = () => {
  return (
    <section className="cta section container">
      <div className="cta-banner">
        <h2>PerAlera ile işletmenizin dijital dönüşümünü bugün başlatın.</h2>
        <Link href="/demo" className="btn btn-primary">Ücretsiz Demo Talep Et &rarr;</Link>
      </div>
    </section>
  );
};

export default CTA;
