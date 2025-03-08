// src/app/layout.js
import { Inter, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import { defaultMetadata } from '@/seo/seo';
import Header from '@/components/layout/Header';
import ChatButtonWrapper from '@/components/chat/ChatButtonWrapper';
import StructuredData from '@/seo/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  ...defaultMetadata,
  // Add additional structured data for chat support
  alternates: {
    canonical: 'https://yalors.tn',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/yalors-noir-favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* Enhanced meta description for chat support */}
        <meta name="description" content="Professional web development services with 24/7 live chat support to answer all your questions." />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatButtonWrapper />
        <StructuredData />
      </body>
    </html>
  );
}