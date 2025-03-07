// src/app/pricing/page.js
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Check, 
  Zap, 
  Building, 
  Rocket, 
  ArrowRight, 
  BadgeCheck,
  Shield,
  Users,
  BarChart,
  Headphones
} from 'lucide-react'

export default function PricingPage() {
  const pageRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.from(headerRef.current.querySelectorAll('.animate-header'), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        })

        // Plans fade in
        gsap.from('.pricing-plan', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.pricing-container',
            start: "top 75%",
          }
        })

        // FAQ items
        gsap.from('.faq-item', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.faq-section',
            start: "top 80%",
          }
        })
      }, pageRef)

      return () => ctx.revert() // Cleanup animations on unmount
    }

    setTimeout(() => {
      initAnimations()
    }, 300)

  }, [])

  return (
    <div ref={pageRef} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Simplified background - clean gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 -z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header section */}
        <section ref={headerRef} className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="animate-header text-4xl md:text-5xl font-bold text-white mb-6">
              Flexible Plans for Your Business Needs
            </h1>
            <p className="animate-header text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Choose the right automation solution package for your organization size and requirements.
            </p>
            <div className="animate-header bg-white/10 backdrop-blur-sm rounded-lg py-3 px-6 max-w-2xl mx-auto mb-8">
              <p className="text-blue-100">
                <span className="text-blue-400 font-medium">Looking for a custom solution?</span> Our packages are customizable to fit your unique business requirements.
              </p>
            </div>
          </div>
        </section>
        
        {/* Pricing plans section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="pricing-container grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <motion.div 
                className="pricing-plan bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, borderColor: 'rgba(147, 197, 253, 0.3)' }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Starter</h3>
                      <p className="text-blue-200 text-sm">For small businesses</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Building className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-end">
                      <span className="text-white text-3xl font-bold">Custom Pricing</span>
                    </div>
                    <p className="text-blue-200 mt-2 text-sm">Based on your specific needs</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Basic automation workflows</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Simple chatbot configuration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Standard reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Up to 2 customizations</span>
                    </li>
                  </ul>
                  
                  <Link 
                    href="/contact"
                    className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white font-medium rounded-lg text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </motion.div>
              
              {/* Business Plan */}
              <motion.div 
                className="pricing-plan bg-gradient-to-b from-blue-900/80 to-indigo-900/80 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-blue-400/30 relative"
                whileHover={{ y: -5, borderColor: 'rgba(96, 165, 250, 0.5)' }}
              >
                <div className="absolute top-0 inset-x-0 bg-blue-500 text-white text-center py-1 text-xs font-medium">
                  MOST POPULAR
                </div>
                <div className="p-6 md:p-8 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Business</h3>
                      <p className="text-blue-200 text-sm">For growing companies</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Rocket className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-end">
                      <span className="text-white text-3xl font-bold">Custom Pricing</span>
                    </div>
                    <p className="text-blue-200 mt-2 text-sm">Tailored for your business</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Advanced automation workflows</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">AI-powered chatbots</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Advanced analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Priority email & chat support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Up to 5 integrations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Monthly performance reviews</span>
                    </li>
                  </ul>
                  
                  <Link 
                    href="/contact"
                    className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-medium rounded-lg text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </motion.div>
              
              {/* Enterprise Plan */}
              <motion.div 
                className="pricing-plan bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, borderColor: 'rgba(147, 197, 253, 0.3)' }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Enterprise</h3>
                      <p className="text-blue-200 text-sm">For large organizations</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Zap className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-end">
                      <span className="text-white text-3xl font-bold">Custom Pricing</span>
                    </div>
                    <p className="text-blue-200 mt-2 text-sm">Enterprise-grade solutions</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Enterprise-grade automations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Custom AI solutions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Advanced security features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">24/7 dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Unlimited integrations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100">Custom training & onboarding</span>
                    </li>
                  </ul>
                  
                  <Link 
                    href="/contact"
                    className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white font-medium rounded-lg text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features comparison */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Yalors</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Our automation solutions come with premium features designed to give your business a competitive edge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BadgeCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Premium Quality</h3>
                <p className="text-blue-100">
                  Enterprise-grade automation solutions built with the latest technologies for reliability and performance.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure & Compliant</h3>
                <p className="text-blue-100">
                  Built-in security features and compliance with industry standards to protect your sensitive data.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Expert Support</h3>
                <p className="text-blue-100">
                  Dedicated support team to help you get the most out of your automation solutions.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Data-Driven</h3>
                <p className="text-blue-100">
                  Advanced analytics and reporting to track performance and make data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-12 md:py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Find answers to common questions about our pricing and services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="faq-item bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">How is pricing determined?</h3>
                  <p className="text-blue-100">
                    Our pricing is customized based on your specific business needs, including the complexity of the automation solutions, number of integrations, and level of support required. Contact our sales team for a personalized quote.
                  </p>
                </div>
                
                <div className="faq-item bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Can I upgrade my plan later?</h3>
                  <p className="text-blue-100">
                    Yes, you can easily upgrade your plan as your business grows. Our team will work with you to ensure a smooth transition to a higher tier with minimal disruption to your operations.
                  </p>
                </div>
                
                <div className="faq-item bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Is there a free trial available?</h3>
                  <p className="text-blue-100">
                    We offer free consultations and demos to help you understand how our solutions can benefit your business. In some cases, we can arrange a limited trial period for specific features.
                  </p>
                </div>
                
                <div className="faq-item bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">What kind of support is included?</h3>
                  <p className="text-blue-100">
                    All plans include access to our support team, with response times and support channels varying by plan level. Enterprise plans include a dedicated account manager and 24/7 priority support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Contact our sales team today to discuss your specific needs and get a customized quote for your automation solution.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-300 font-medium rounded-lg px-8 py-4 text-lg"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}