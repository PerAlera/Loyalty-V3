import React from 'react';


const MobilePreview = ({ logo, mascot, primaryColor }: {logo: any, mascot: any, primaryColor: any}) => {
  // We can calculate lighter shades of the primary color for the secondary buttons
  // But for simplicity in this demo, we will use opacity or pre-calculated CSS filters
  
  return (
    <div className="mobile-mockup">
      <div className="mobile-notch"></div>
      <div className="mobile-screen" style={{ '--primary': primaryColor } as React.CSSProperties}>
        
        {/* Header */}
        <div className="mp-header">
          <div className="mp-logo">
            {logo ? <img src={logo} alt="Brand Logo" /> : <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999'}}>Logo</div>}
          </div>
          <div className="mp-greeting">
            Hoş Geldin, Alperen
          </div>
          <div className="mp-profile-icon">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>

        {/* Mascot Carousel */}
        <div className="mp-mascot-section">
          <button className="mp-arrow">&lt;</button>
          <div className="mp-mascot">
            <img src={mascot} alt="Mascot" />
          </div>
          <button className="mp-arrow">&gt;</button>
        </div>

        {/* Points */}
        <div className="mp-points-section">
          <div className="mp-points-header">
            <span className="mp-points-title">Kahve Çekirdekleri</span>
            <span className="mp-points-count">4 / 8</span>
          </div>
          <div className="mp-progress-bar">
            {[1, 2, 3, 4].map(i => (
              <React.Fragment key={i}>
                <div className="mp-point-node filled">✓</div>
                <div className="mp-point-line filled"></div>
              </React.Fragment>
            ))}
            {[5, 6, 7].map(i => (
              <React.Fragment key={i}>
                <div className="mp-point-node"></div>
                <div className="mp-point-line"></div>
              </React.Fragment>
            ))}
            <div className="mp-point-node gift">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mp-actions">
          <button className="mp-btn-large mp-btn-primary" style={{ backgroundColor: primaryColor }}>
            Qr Okut <br/> Kazan
          </button>
          
          <div className="mp-btn-row">
            <button className="mp-btn-small" style={{ backgroundColor: primaryColor + '40', color: primaryColor }}>
              ☕ Kahve Ödülü
            </button>
            <button className="mp-btn-small" style={{ backgroundColor: primaryColor + '40', color: primaryColor }}>
              🍔 Yemek Ödülü
            </button>
          </div>
          
          <button className="mp-btn-large" style={{ backgroundColor: primaryColor + '80', color: '#fff' }}>
            Kampanyalar
          </button>
        </div>

      </div>
    </div>
  );
};

export default MobilePreview;
