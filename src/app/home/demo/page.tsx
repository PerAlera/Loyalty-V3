import React from 'react';
import DemoBuilder from '@/components/landing/DemoBuilder';
import '../landing.css';

export default function DemoPage() {
  return (
    <div className="landing-wrapper">
      <div className="app-container">
        <DemoBuilder />
      </div>
    </div>
  );
}
