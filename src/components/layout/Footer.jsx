// src/components/layout/Footer.js
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function Footer() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.from('.footer-content', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-container',
        start: 'top bottom-=100',
      }
    })
  }, [])

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 relative overflow-hidden footer-container">
      {/* Animated data lines in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="data-line" 
            style={{ 
              left: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 footer-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-48">
                <Image 
                  src="/images/logo.svg" 
                  alt="Yalors Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your trusted partner in automation solutions. Transform your business workflows with our cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github', 'instagram'].map(social => (
                <a 
                  key={social}
                  href={`https://${social}.com/yalors`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {['Data Automation', 'Workflow Optimization', 'AI Chatbots', 'API Integration', 'Custom Solutions'].map(service => (
                <li key={service}>
                  <Link href={`/services`} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Blog', 'Case Studies', 'Careers', 'Contact'].map(page => (
                <li key={page}>
                  <Link href={`/${page.toLowerCase().replace(' ', '-')}`} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Have questions about our automation services?
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
              <p>hello@yalors.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Yalors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(link => (
              <Link 
                key={link}
                href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}