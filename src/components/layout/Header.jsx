// src/components/layout/Header.js
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Navigation from './Navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // GSAP animations
  useGSAP(() => {
    // Logo animation
    gsap.from('.header-logo', {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: 'power3.out'
    })
    
    // Navigation items animation
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.7,
      ease: 'back.out(1.7)',
      delay: 0.3
    })
    
    // CTA button animation
    // gsap.from('.cta-button', {
    //   opacity: 0,
    //   scale: 0.8,
    //   duration: 0.5,
    //   ease: 'back.out(1.7)',
    //   delay: 0.8
    // })
    
    // Animated gradient line
    gsap.to('.gradient-line', {
      backgroundPosition: '200% center',
      duration: 8,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
        <div className="gradient-line w-full h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_auto]"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="header-logo relative flex items-center group">
            <div className="relative h-9 w-36">
              <Image 
                src="/images/yaalors-noir.png" 
                alt="Yalors Logo" 
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-primary-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          {/* Desktop Navigation - IMPORTANT: Removed the separate CTA button */}
          <Navigation 
            className="hidden md:flex items-center space-x-8" 
            itemClassName="nav-item" 
          />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-400 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-6 flex flex-col items-end">
              <span 
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}>
              </span>
              <span 
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-1 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}>
              </span>
              <span 
                className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 pt-3 pb-5 backdrop-blur-lg bg-gray-900/80">
          <Navigation 
            mobile={true} 
            closeMobileMenu={() => setMobileMenuOpen(false)} 
          />
        </div>
      </div>
    </header>
  )
}