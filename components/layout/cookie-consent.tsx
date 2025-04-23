'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="schoolkits-cookie-consent"
      style={{
        background: '#2B373B',
        padding: '16px',
        alignItems: 'center',
        zIndex: 9999
      }}
      buttonStyle={{
        background: '#0B80A7',
        color: 'white',
        fontSize: '14px',
        padding: '8px 16px',
        borderRadius: '4px'
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid white',
        color: 'white',
        fontSize: '14px',
        padding: '8px 16px',
        borderRadius: '4px',
        marginRight: '10px'
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. Please see our{' '}
      <Link href="/privacy-policy" className="text-[#4ECDC4] underline">
        Privacy Policy
      </Link>{' '}
      for more information.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
