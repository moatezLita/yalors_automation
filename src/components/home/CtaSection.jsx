// src/components/home/CtaSection.js
"use client"

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Calendar, MessageSquare, LightbulbIcon, Check, AlertCircle } from 'lucide-react'

export default function CtaSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const contentRef = useRef(null)
  
  // Form state management
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  
  // Form submission state: 'idle', 'loading', 'success', 'error'
  const [formStatus, setFormStatus] = useState('idle')
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('loading')
    
    try {
      // Import and use the form submission utility
      const { submitContactForm, validateContactForm } = await import('@/utils/formSubmission')
      
      // Validate the form
      const { isValid, errors } = validateContactForm(formState)
      
      if (!isValid) {
        console.error('Form validation errors:', errors)
        throw new Error('Please fill out all required fields correctly')
      }
      
      // Submit the form
      await submitContactForm(formState, 'cta-section')
      
      // Reset form on success
      setFormState({
        name: '',
        email: '',
        company: '',
        message: ''
      })
      setFormStatus('success')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Submission error:', error)
      setFormStatus('error')
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    }
  }
  
  // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
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
      className="py-24 relative overflow-hidden text-white"
      id="contact-cta"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0  -z-10"></div>
      
      {/* Animated background elements */}

      {/* <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
      </div> */}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA Content */}
          <div ref={contentRef}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-primary-700/50 backdrop-blur-sm rounded-full text-primary-200 mb-6"
            >
              <LightbulbIcon size={16} className="mr-2" />
              <span className="text-sm font-medium">Transform your business with automation</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to automate your business processes?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-100 text-lg mb-8 max-w-lg"
            >
              Get in touch with our team today to discover how our automation solutions can 
              streamline your workflows, boost productivity, and drive growth.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-10"
            >
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
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
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
            </motion.div>
          </div>
          
          {/* CTA Form */}
          <div 
            ref={formRef}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
            
            {formStatus === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Message Sent Successfully!</h3>
                    <p className="text-primary-200">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            ) : formStatus === 'error' ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Something went wrong</h3>
                    <p className="text-primary-200">
                      Please try again or contact us directly at contact@yalors.tn
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="John Smith"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="john@company.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="Your Company"
                  value={formState.company}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50"
                  placeholder="Tell us about your automation needs..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={formStatus === 'loading'}
                className={`w-full flex items-center justify-center px-6 py-3 ${
                  formStatus === 'loading' 
                    ? 'bg-primary-600/70 cursor-not-allowed' 
                    : 'bg-primary-500 hover:bg-primary-600'
                } text-white font-bold rounded-md shadow-lg transition-colors duration-300`}
              >
                {formStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <MessageSquare size={18} className="ml-2" />
                  </>
                )}
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