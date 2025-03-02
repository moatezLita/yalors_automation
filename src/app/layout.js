// src/app/layout.js
import { Inter, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { NextSeo } from 'next-seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata = {
  title: {
    default: 'Yalors | Automation Services & Solutions',
    template: '%s | Yalors Automation'
  },
  description: 'Yalors provides cutting-edge automation solutions for businesses. We specialize in data automation, workflow optimization, LLM-powered chatbots, and custom API integrations.',
  keywords: ['automation', 'data processing', 'chatbots', 'workflow automation', 'API integration', 'business automation', 'LLM', 'Python automation'],
  openGraph: {
    title: 'Yalors | Automation Services & Solutions',
    description: 'Cutting-edge automation solutions for modern businesses. Transform your workflows with Yalors.',
    url: 'https://yalors.com',
    siteName: 'Yalors Automation',
    images: [
      {
        url: 'https://yalors.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yalors Automation Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yalors | Automation Services & Solutions',
    description: 'Cutting-edge automation solutions for modern businesses. Transform your workflows with Yalors.',
    images: ['https://yalors.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },
  alternates: {
    canonical: 'https://yalors.com',
    languages: {
      'en-US': 'https://yalors.com',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}