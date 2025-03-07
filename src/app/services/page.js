// src/app/services/page.js
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Bot, 
  Workflow, 
  Sparkles, 
  BarChart4, 
  Briefcase, 
  MessageSquareText, 
  GanttChartSquare, 
  BookUser,
  ArrowRight
} from 'lucide-react'
import ContactCta from '@/components/shared/ContactCta'

export default function ServicesPage() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const featureRef = useRef(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Hero section animation
        gsap.from(heroRef.current.querySelectorAll('.animated-item'), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        })

        // Feature rows fade in
        gsap.from('.feature-row', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 75%",
          }
        })

        // Use case blocks animation
        gsap.from('.use-case-block', {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.use-cases-grid',
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
      {/* Simplified background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 -z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero section with illustration */}
        <section ref={heroRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="animated-item text-4xl md:text-5xl font-bold text-white mb-6">
                  Automation Solutions <br />
                  <span className="text-blue-400">for the Modern Business</span>
                </h1>
                <p className="animated-item text-xl text-blue-100 mb-8 max-w-md">
                  We create intelligent workflows, chatbots, and automation systems that help businesses save time, reduce costs, and improve customer experience.
                </p>
                <div className="animated-item flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition-colors duration-300 flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    href="#solutions" 
                    className="bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg px-6 py-3 transition-colors duration-300"
                  >
                    Explore Solutions
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 pl-0 md:pl-10">
                <div className="animated-item relative">
                  {/* Abstract illustration representing automation */}
                  <div className="w-full h-64 md:h-80 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-400/50 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-300/30 rounded-full"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-1/4 left-1/4 bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                      <Bot className="text-white h-6 w-6" />
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 bg-gradient-to-br from-green-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                      <Workflow className="text-white h-6 w-6" />
                    </div>
                    <div className="absolute bottom-1/3 left-1/3 bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                      <MessageSquareText className="text-white h-6 w-6" />
                    </div>
                    <div className="absolute top-1/3 right-1/3 bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                      <BarChart4 className="text-white h-6 w-6" />
                    </div>
                    
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                      <path d="M200,200 L120,100" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
                      <path d="M200,200 L280,100" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
                      <path d="M200,200 L120,300" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
                      <path d="M200,200 L280,300" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main automation services with interactive elements */}
        <section id="solutions" className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Automation Services</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                From streamlining workflows to creating intelligent chatbots, we provide comprehensive automation solutions.
              </p>
            </div>
            
            <div ref={featureRef} className="space-y-8 md:space-y-16">
              {/* Chatbot Solutions */}
              <div className="feature-row flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-1">
                    <div className="bg-blue-900/70 backdrop-blur rounded-xl p-6 h-full">
                      <div className="chat-interface">
                        <div className="flex items-center border-b border-white/10 pb-3 mb-4">
                          <Bot className="h-6 w-6 text-blue-400 mr-2" />
                          <span className="text-white font-medium">YalorsBot</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex">
                            <div className="bg-blue-800/50 rounded-lg rounded-tl-none p-3 text-sm text-blue-100 ml-auto">
                              I need help setting up my account
                            </div>
                          </div>
                          <div className="flex">
                            <div className="bg-blue-500/40 rounded-lg rounded-tr-none p-3 text-sm text-white max-w-xs">
                              I'd be happy to help! To set up your account, you'll need to follow these steps:
                            </div>
                          </div>
                          <div className="flex">
                            <div className="bg-blue-500/40 rounded-lg rounded-tr-none p-3 text-sm text-white max-w-xs">
                              1. Click the "Register" button in the top menu<br />
                              2. Fill out your details<br />
                              3. Verify your email<br />
                              4. Set up your profile preferences
                            </div>
                          </div>
                          <div className="flex">
                            <div className="bg-blue-800/50 rounded-lg rounded-tl-none p-3 text-sm text-blue-100 ml-auto">
                              Thanks! What about payment options?
                            </div>
                          </div>
                          <div className="flex">
                            <div className="bg-blue-500/40 rounded-lg rounded-tr-none p-3 text-sm text-white max-w-xs">
                              We accept credit cards, PayPal, and bank transfers. Would you like me to explain the process for each?
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 flex">
                          <input type="text" placeholder="Type your message..." className="bg-white/5 rounded-lg px-4 py-2 text-white placeholder-blue-200/50 w-full focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Intelligent Chatbot Solutions
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Our AI-powered chatbots provide instant customer support, qualify leads, and streamline customer interactions across your website, social media platforms, and messaging apps.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">24/7 Customer Support</span>
                        <p className="text-blue-200 text-sm">Provide instant responses to your customers at any time of day.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Personalized Interactions</span>
                        <p className="text-blue-200 text-sm">Tailor conversations based on user behavior and preferences.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Seamless Integration</span>
                        <p className="text-blue-200 text-sm">Connect with your CRM, help desk, and other business tools.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Workflow Automation */}
              <div className="feature-row flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-1">
                    <div className="bg-purple-900/70 backdrop-blur rounded-xl p-6 h-full">
                      <div className="workflow-diagram">
                        <div className="bg-white/10 rounded-xl p-4 mb-4">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <h4 className="text-white font-medium">Lead Form Submission</h4>
                          </div>
                          <svg className="w-6 h-6 text-purple-300 mx-auto" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl p-4 mb-4">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <h4 className="text-white font-medium">Data Validation & Enrichment</h4>
                          </div>
                          <svg className="w-6 h-6 text-purple-300 mx-auto" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        <div className="flex mb-4">
                          <div className="w-1/2 pr-2">
                            <div className="bg-white/10 rounded-xl p-4 h-full">
                              <div className="flex items-center mb-2">
                                <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">3A</span>
                                </div>
                                <h4 className="text-white text-sm font-medium">Lead Scoring</h4>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/2 pl-2">
                            <div className="bg-white/10 rounded-xl p-4 h-full">
                              <div className="flex items-center mb-2">
                                <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">3B</span>
                                </div>
                                <h4 className="text-white text-sm font-medium">CRM Update</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-xl p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">4</span>
                            </div>
                            <h4 className="text-white font-medium">Automated Follow-up</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Workflow Automation
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Automate repetitive business processes to reduce manual work, minimize errors, and allow your team to focus on high-value tasks that drive growth.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                        <Workflow className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Sales Process Automation</span>
                        <p className="text-blue-200 text-sm">Automate lead qualification, follow-ups, and customer onboarding.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                        <Workflow className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Document Processing</span>
                        <p className="text-blue-200 text-sm">Extract data from forms and documents to update your systems automatically.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-500/20 p-1 rounded-full mr-3 mt-1">
                        <Workflow className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Cross-platform Integration</span>
                        <p className="text-blue-200 text-sm">Connect your tools and systems to create seamless workflows.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Data Analytics & Reporting */}
              <div className="feature-row flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-1">
                    <div className="bg-teal-900/70 backdrop-blur rounded-xl p-6 h-full">
                      <div className="analytics-dashboard">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-white font-medium">Performance Analytics</h4>
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-teal-700/50 text-teal-100 text-xs rounded">Daily</span>
                            <span className="px-2 py-1 bg-teal-500/50 text-teal-100 text-xs rounded">Weekly</span>
                            <span className="px-2 py-1 bg-teal-700/50 text-teal-100 text-xs rounded">Monthly</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-teal-300 text-xs mb-1">Conversations</div>
                            <div className="text-white text-xl font-bold">1,458</div>
                            <div className="text-teal-200 text-xs flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              12.5% increase
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-teal-300 text-xs mb-1">Resolution Rate</div>
                            <div className="text-white text-xl font-bold">94.2%</div>
                            <div className="text-teal-200 text-xs flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              3.7% increase
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-teal-300 text-xs">Conversation Trend</div>
                            <div className="text-teal-200 text-xs">Last 7 days</div>
                          </div>
                          <div className="h-12 flex items-end space-x-1">
                            {[35, 45, 30, 60, 75, 50, 65].map((height, i) => (
                              <div key={i} className="flex-1 bg-teal-500/60 rounded-t" style={{ height: `${height}%` }}></div>
                            ))}
                          </div>
                          <div className="flex justify-between text-teal-200/70 text-xs mt-1">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-teal-300 text-xs mb-2">Top Performing Channels</div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-teal-100 text-xs">Website</span>
                              <span className="text-teal-200 text-xs">42%</span>
                            </div>
                            <div className="w-full bg-teal-900/70 rounded-full h-2">
                              <div className="bg-teal-400 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-teal-100 text-xs">Facebook</span>
                              <span className="text-teal-200 text-xs">28%</span>
                            </div>
                            <div className="w-full bg-teal-900/70 rounded-full h-2">
                              <div className="bg-teal-400 h-2 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-teal-100 text-xs">WhatsApp</span>
                              <span className="text-teal-200 text-xs">20%</span>
                            </div>
                            <div className="w-full bg-teal-900/70 rounded-full h-2">
                              <div className="bg-teal-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Analytics & Reporting
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Gain valuable insights from your automated processes with real-time analytics dashboards and detailed reports that help you optimize performance.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-teal-500/20 p-1 rounded-full mr-3 mt-1">
                        <BarChart4 className="h-4 w-4 text-teal-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Performance Tracking</span>
                        <p className="text-blue-200 text-sm">Monitor key metrics and KPIs to measure the success of your automation.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-teal-500/20 p-1 rounded-full mr-3 mt-1">
                        <BarChart4 className="h-4 w-4 text-teal-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Conversation Analytics</span>
                        <p className="text-blue-200 text-sm">Analyze chat interactions to improve response quality and customer satisfaction.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-teal-500/20 p-1 rounded-full mr-3 mt-1">
                        <BarChart4 className="h-4 w-4 text-teal-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Custom Reports</span>
                        <p className="text-blue-200 text-sm">Get tailored reports to make data-driven decisions for your business.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use cases */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Automation Use Cases</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                See how different industries are benefiting from our automation solutions.
              </p>
            </div>
            
            <div className="use-cases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="use-case-block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="p-6">
                  <div className="bg-blue-500/20 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                    <Briefcase className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Customer Service</h3>
                  <p className="text-blue-100 mb-4">
                    Automate customer support with intelligent chatbots that handle common queries, reducing response times and improving satisfaction.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="use-case-block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="p-6">
                  <div className="bg-purple-500/20 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                    <BookUser className="h-7 w-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Lead Generation</h3>
                  <p className="text-blue-100 mb-4">
                    Qualify and nurture leads automatically with personalized communication flows that convert prospects into customers.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="use-case-block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="p-6">
                  <div className="bg-teal-500/20 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                    <GanttChartSquare className="h-7 w-7 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">HR & Recruitment</h3>
                  <p className="text-blue-100 mb-4">
                    Streamline hiring processes with automated candidate screening, interview scheduling, and onboarding workflows.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-teal-400 hover:text-teal-300 inline-flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="use-case-block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="p-6">
                  <div className="bg-orange-500/20 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                    <MessageSquareText className="h-7 w-7 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">E-commerce</h3>
                  <p className="text-blue-100 mb-4">
                    Enhance the shopping experience with product recommendation chatbots, automated order updates, and personalized marketing.
                  </p>
                  <Link 
                    href="/contact" 
                    className="text-orange-400 hover:text-orange-300 inline-flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How we work */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                We follow a proven methodology to create customized automation solutions that meet your business needs.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between max-w-4xl mx-auto">
              <div className="relative pb-12 md:pb-0">
                {/* Timeline connector for desktop */}
                <div className="hidden md:block absolute top-8 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 left-7 -z-10"></div>
                
                <div className="flex flex-col space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Discovery</h3>
                      <p className="text-blue-100">We analyze your current processes and identify automation opportunities.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
                      <p className="text-blue-100">We create a customized solution blueprint tailored to your specific needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Development</h3>
                      <p className="text-blue-100">Our experts build your automation solution using cutting-edge technologies.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">4</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Deployment</h3>
                      <p className="text-blue-100">We implement the solution and integrate it with your existing systems.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 bg-teal-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">5</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Optimization</h3>
                      <p className="text-blue-100">We continuously monitor and refine your solution to improve performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Automate Your Business?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Schedule a free consultation to discover how our automation solutions can help your business save time, reduce costs, and improve customer satisfaction.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300 font-medium rounded-lg px-8 py-3 text-lg"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/projects" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors duration-300 font-medium rounded-lg px-8 py-3 text-lg"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}