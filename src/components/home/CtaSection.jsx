// src/components/home/CtaSection.js
"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Calendar, MessageSquare, LightbulbIcon } from 'lucide-react'

export default function CtaSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const contentRef = useRef(null)
  
  // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Animate the background lines
    const lines = gsap.utils.toArray('.cta-line')
    lines.forEach((line, index) => {
      gsap.from(line, {
        width: 0,
        duration: 1.5,
        delay: index * 0.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
    })
    
    // Animate the content
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
      }
    })
    
    // Animate the form
    gsap.from(formRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%',
      }
    })
    
    // Animate the dots
    const dots = gsap.utils.toArray('.animated-dot')
    dots.forEach((dot) => {
      gsap.to(dot, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 1.5 + Math.random(),
        delay: Math.random() * 0.5,
        ease: 'sine.inOut'
      })
    })
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden  text-white"
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="cta-line absolute h-px bg-primary-500/30" 
            style={{ 
              top: `${10 + i * 20}%`,
              left: 0,
              right: 0,
            }}
          />
        ))} */}
        
        {/* Background floating dots */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="animated-dot absolute w-2 h-2 rounded-full bg-primary-500/40"
            style={{ 
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 90 + 5}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA Content */}
          <div ref={contentRef}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-700/50 backdrop-blur-sm rounded-full text-primary-200 mb-6">
              <LightbulbIcon size={16} className="mr-2" />
              <span className="text-sm font-medium">Transform your business with automation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to automate your business processes?
            </h2>
            
            <p className="text-primary-100 text-lg mb-8 max-w-lg">
              Get in touch with our team today to discover how our automation solutions can 
              streamline your workflows, boost productivity, and drive growth.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Zap size={20} className="text-primary-300" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Fast Implementation</h3>
                  <p className="text-primary-200 text-sm">Deploy solutions in weeks, not months</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Zap size={20} className="text-primary-300" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Ongoing Support</h3>
                  <p className="text-primary-200 text-sm">24/7 assistance from our expert team</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="flex items-center px-6 py-3 bg-white text-primary-700 font-bold rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Schedule a Demo
                <Calendar size={18} className="ml-2" />
              </Link>
              
              <Link 
                href="/services"
                className="flex items-center px-6 py-3 border border-white text-white font-bold rounded-md hover:bg-primary-800 transition-colors duration-300"
              >
                Explore Services
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          
          {/* CTA Form */}
          <div 
            ref={formRef}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="Your Company"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="Tell us about your automation needs..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-md shadow-lg transition-colors duration-300"
              >
                Send Message
                <MessageSquare size={18} className="ml-2" />
              </button>
            </form>
            
            <p className="text-sm text-center mt-4 text-primary-200">
              We'll get back to you within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}