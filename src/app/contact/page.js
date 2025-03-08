// src/app/contact/page.js
"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react'
import Head from 'next/head'

export default function ContactPage() {
  const pageRef = useRef(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null) // 'success', 'error', 'loading', or null
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
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
      await submitContactForm(formState, 'contact-page')
      
      // Form submitted successfully
      setFormStatus('success')
      
      // Reset form after success
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      })
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 5000)
    }
  }

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.from('.contact-header > *', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        })

        // Contact info cards
        gsap.from('.contact-card', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-info-section',
            start: "top 75%",
          }
        })
        
        // Form animation
        gsap.from('.contact-form', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.form-section',
            start: "top 75%",
          }
        })
        
        // Animate map container
        gsap.from('.map-container', {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.map-container',
            start: "top 75%",
          }
        })
      }, pageRef)

      return () => ctx.revert() // Cleanup animations on unmount
    }

    setTimeout(() => {
      initAnimations()
    }, 300)

  }, [])
  
  // List of services for dropdown
  const services = [
    "Chatbot Development",
    "Workflow Automation",
    "Data Analytics & Reporting",
    "Integration Services",
    "Custom Automation Solutions",
    "Automation Consulting",
    "Other"
  ]

  return (
    <div ref={pageRef} className="relative min-h-screen pt-20 pb-16 overflow-hidden">
      {/* SEO metadata */}
      <Head>
        <title>Contact Us | Yalors - Automation Solutions for Your Business</title>
        <meta name="description" content="Get in touch with Yalors for all your automation needs. Let us help you streamline your workflow and boost productivity." />
        <meta name="keywords" content="contact yalors, automation services, workflow automation, Tunisia tech" />
        <meta property="og:title" content="Contact Yalors - Automation Solutions" />
        <meta property="og:description" content="Contact our team of automation experts to discuss how we can transform your business processes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yalors.tn/contact" />
        <link rel="canonical" href="https://yalors.tn/contact" />
      </Head>
      
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 -z-20"></div>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated dots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="contact-header text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Ready to transform your business with automation? Contact us today for a free consultation.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact info section */}
        <section className="py-8 contact-info-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="contact-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <a href="mailto:contact@yalors.tn" className="text-blue-200 hover:text-blue-100 transition-colors">
                  contact@yalors.tn
                </a>
              </div>
              
              <div className="contact-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <a href="tel:+21690318391" className="text-blue-200 hover:text-blue-100 transition-colors">
                  +216 90 318 391 
                </a>
              </div>
              
              <div className="contact-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-blue-200">
                  123 Innovation Street<br />
                  Tech District, Tunisia
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Form and map section */}
        <section className="py-12 md:py-16 form-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact form */}
              <div className="contact-form bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-white font-medium mb-1">Message Sent Successfully!</h3>
                        <p className="text-blue-100">
                          Thank you for contacting us. We&apos;ll get back to you as soon as possible.
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
                        <p className="text-blue-100">
                          Please try again or contact us directly at contact@yalors.tn
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-blue-200 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-blue-200 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="company" className="block text-blue-200 mb-2">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-blue-200 mb-2">Service Interested In</label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="" className="bg-blue-900">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service} className="bg-blue-900">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-blue-200 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className={`w-full py-3 px-4 font-medium rounded-lg flex items-center justify-center ${
                      formStatus === 'loading'
                        ? 'bg-blue-600/50 text-white/70 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } transition-colors`}
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
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Map or Office hours section */}
              <div className="map-container bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Our Office</h2>
                
                {/* Map placeholder - In a real implementation, you would integrate Google Maps or another map provider */}
                <div className="relative w-full h-64 bg-blue-800/40 rounded-lg mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-blue-300/70" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
                    <p className="text-white font-medium">123 Innovation Street, Tech District, Tunisia</p>
                  </div>
                </div>
                
                {/* Office hours */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Office Hours</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-300 mt-0.5 mr-2" />
                      <div>
                        <p className="text-white font-medium">Monday - Friday</p>
                        <p className="text-blue-200">9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-300 mt-0.5 mr-2" />
                      <div>
                        <p className="text-white font-medium">Saturday</p>
                        <p className="text-blue-200">10:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-300 mt-0.5 mr-2" />
                      <div>
                        <p className="text-white font-medium">Sunday</p>
                        <p className="text-blue-200">Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Direct contact info */}
                  <div className="pt-4 border-t border-white/10 mt-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Direct Contact</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-300 mr-3" />
                        <a href="mailto:contact@yalors.tn" className="text-blue-200 hover:text-blue-100 transition-colors">
                          contact@yalors.tn
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-300 mr-3" />
                        <a href="tel:+21690318391" className="text-blue-200 hover:text-blue-100 transition-colors">
                          +216 90 318 391
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-blue-200">Find answers to common questions about our services</p>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">How soon can you start working on my project?</h3>
                  <p className="text-blue-200">We typically begin new projects within 2-3 business days after the initial consultation and agreement. For urgent needs, we can often accommodate rush timelines.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">What types of businesses do you work with?</h3>
                  <p className="text-blue-200">We work with businesses of all sizes, from startups to large enterprises, across various industries including healthcare, finance, e-commerce, education, and manufacturing.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Do you offer ongoing support after implementation?</h3>
                  <p className="text-blue-200">Yes, we provide comprehensive post-implementation support packages tailored to your needs, including maintenance, updates, troubleshooting, and training.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">How do you handle data security?</h3>
                  <p className="text-blue-200">Data security is our top priority. We implement industry-standard encryption, secure authentication methods, and regular security audits to ensure your data remains protected.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}