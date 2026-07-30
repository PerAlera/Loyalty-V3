import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import PainPoints from '@/components/landing/PainPoints';
import Features from '@/components/landing/Features';
import DashboardFeature from '@/components/landing/DashboardFeature';
import AppFeature from '@/components/landing/AppFeature';
import Testimonials from '@/components/landing/Testimonials';
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
          <DashboardFeature />
          <AppFeature />
          <Features />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
