import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import PainPoints from '@/components/landing/PainPoints';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import './landing.css';

export default function HomeLandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="app-container">
        <Header />
        <main>
          <Hero />
          <PainPoints />
          <Features />
          <Stats />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
