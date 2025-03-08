// src/components/layout/Footer.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react'

export default function Footer() {
  const footerRef = useRef(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Animate footer content
      gsap.from('.footer-col', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-container',
          start: 'top bottom-=100',
        }
      })
      
      // Animate data lines in background
      gsap.from('.data-line', {
        height: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-container',
          start: 'top bottom',
        }
      })
    }, footerRef)
    
    return () => ctx.revert()
  }, [])

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, url: 'https://facebook.com/yalors' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com/yalors' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/company/yalors' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com/yalors' }
  ]
  
  const services = [
    'Workflow Automation',
    'AI Chatbots',
    'Process Optimization',
    'Integration Services',
    'Data Analytics'
  ]
  
  const companyLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ]
  
  const resourceLinks = [
    { name: 'Documentation', path: '/docs' },
    { name: 'API Reference', path: '/api-reference' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Help Center', path: '/help' }
  ]

  return (
    <footer ref={footerRef} className="bg-blue-950 pt-16 pb-8 relative overflow-hidden footer-container">
      {/* Animated data lines in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="data-line absolute bottom-0 w-px bg-gradient-to-b from-blue-400 to-blue-600" 
            style={{ 
              left: `${7 + (i * 10)}%`,
              height: `${Math.random() * 40 + 60}%`,
            }}
          />
        ))}
        
        {/* Horizontal data lines */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
            style={{ 
              top: `${20 + (i * 18)}%`,
              left: '0',
              right: '0',
              opacity: 0.15
            }}
          />
        ))}
        
        {/* Glowing dots */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={`dot-${i}`}
            className="absolute rounded-full bg-blue-400"
            style={{ 
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 95}%`,
              opacity: Math.random() * 0.5 + 0.2,
              boxShadow: '0 0 8px rgba(96, 165, 250, 0.6)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="footer-col">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-9 w-36">
                <Image
                  src="/images/yaalors-blanc.png"
                  alt="Yalors Logo"
                  fill
                  className="object-contain  "
                  priority
                />
              </div>

              {/* Animated glow effect on hover */}
              <div className="absolute -inset-1 bg-primary-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            </Link>
            <p className="text-blue-200 mb-6">
              Your trusted partner in automation solutions. Transform your business workflows with our cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 transition-colors duration-300 bg-white/5 p-2 rounded-full hover:bg-white/10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Services
              <span className="ml-2 w-10 h-px bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-4"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Company
              <span className="ml-2 w-10 h-px bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-4"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* <h3 className="text-white font-bold text-lg mt-8 mb-6 flex items-center">
              Resources
              <span className="ml-2 w-10 h-px bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-4"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
          
          <div className="footer-col">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Contact Us
              <span className="ml-2 w-10 h-px bg-blue-400"></span>
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <MapPin className="text-blue-400 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200">Boumhel, Ben Arous, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-400 h-5 w-5 mr-3 flex-shrink-0" />
                <a href="mailto:contact@yalors.tn" className="text-blue-200 hover:text-white transition-colors duration-300">
                  contact@yalors.tn
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-400 h-5 w-5 mr-3 flex-shrink-0" />
                <a href="tel:+21611223344" className="text-blue-200 hover:text-white transition-colors duration-300">
                  +216 90 318 391 
                </a>
              </li>
            </ul>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Ready to get started?</h4>
              <Link 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Yalors. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/privacy-policy"
              className="text-blue-300 text-sm hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service"
              className="text-blue-300 text-sm hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              href="/sitemap"
              className="text-blue-300 text-sm hover:text-white transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .data-line {
          animation: pulse 4s infinite ease-in-out;
        }
      `}</style>
    </footer>
  )
}