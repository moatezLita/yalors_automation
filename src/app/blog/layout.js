// src/app/blog/layout.js

export const metadata = {
  title: 'Blog - Automation Insights | Yalors',
  description: 'Explore our latest articles about automation, chatbots, and workflow optimization to help your business grow.',
  keywords: 'automation blog, chatbots, workflow optimization, business automation, AI',
  openGraph: {
    title: 'Blog - Automation Insights | Yalors',
    description: 'Explore our latest articles about automation, chatbots, and workflow optimization to help your business grow.',
    url: 'https://yalors.tn/blog',
    type: 'website',
    images: [
      {
        url: 'https://yalors.tn/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yalors Blog',
      },
    ],
  },
}

export default function BlogLayout({ children }) {
  return children
}