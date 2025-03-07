// src/components/seo/StructuredData.js
'use client';

import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Yalors",
    "url": "https://yalors.tn",
    "logo": "https://yalors.tn/logo.png",
    "sameAs": [
      "https://twitter.com/yalors",
      "https://www.facebook.com/yalors",
      "https://www.linkedin.com/company/yalors"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tunisia",
      "addressCountry": "TN"
    },
    "telephone": "+216-XX-XXX-XXX",
    "email": "contact@yalors.tn",
    "description": "Professional web development services with AI-powered live chat support",
    "priceRange": "$$",
    "potentialAction": {
      "@type": "ContactAction",
      "name": "Live Chat Support",
      "description": "Get instant help through our AI-powered chat support"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
}