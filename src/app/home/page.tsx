import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import DashboardFeature from '@/components/landing/DashboardFeature';
import AppFeature from '@/components/landing/AppFeature';
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
          <Features />
          <DashboardFeature />
          <AppFeature />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
