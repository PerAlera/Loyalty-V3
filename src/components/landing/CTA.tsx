"use client";

import Link from 'next/link';

const CTA = () => {
  return (
    <section className="cta section container">
      <div className="cta-banner">
        <h2>Siz de Peralera ile işletmenizi bir adım öne taşıyın.</h2>
        <Link href="/home/demo" className="btn btn-primary">Ücretsiz Demo Talep Et &rarr;</Link>
      </div>
    </section>
  );
};

export default CTA;
