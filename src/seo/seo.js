// src/lib/seo.js
export const defaultMetadata = {
    title: "Yalors - Professional Web Development Services",
    description: "Yalors provides top-quality web development services for businesses looking to establish a strong online presence. Contact us for custom website development.",
    keywords: "web development, web design, Tunisia, professional websites, custom development",
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://yalors.tn',
      site_name: 'Yalors',
      images: [
        {
          url: 'https://yalors.tn/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Yalors - Web Development',
        },
      ],
    },
    twitter: {
      handle: '@yalors',
      site: '@yalors',
      cardType: 'summary_large_image',
    },
  };
  
  export function generateMetadata({ title, description, path = "" }) {
    const url = `https://yalors.tn${path}`;
    
    return {
      title: title ? `${title} | Yalors` : defaultMetadata.title,
      description: description || defaultMetadata.description,
      keywords: defaultMetadata.keywords,
      metadataBase: new URL('https://yalors.tn'),
      alternates: {
        canonical: url,
      },
      openGraph: {
        ...defaultMetadata.openGraph,
        title: title ? `${title} | Yalors` : defaultMetadata.title,
        description: description || defaultMetadata.description,
        url,
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: title ? `${title} | Yalors` : defaultMetadata.title,
        description: description || defaultMetadata.description,
      },
    };
  }
  