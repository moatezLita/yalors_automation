// src/components/home/ServicesOverview.js
"use client"

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { Database, Workflow, Bot, Link2, Mail, Code } from 'lucide-react'
import BinaryDigits from './effects/BinaryDigits'

const services = [
  {
    id: 'data-automation',
    title: 'Data Automation',
    description: 'Automate data collection, cleaning, and processing workflows to eliminate manual tasks and reduce errors.',
    icon: Database,
    color: 'primary',
    features: ['Data extraction', 'Cleaning & transformation', 'Automated reporting']
  },
  {
    id: 'workflow-optimization',
    title: 'Workflow Optimization',
    description: 'Streamline and optimize business processes to increase productivity and reduce operational costs.',
    icon: Workflow,
    color: 'secondary',
    features: ['Process analysis', 'Bottleneck removal', 'Continuous improvement']
  },
  {
    id: 'llm-chatbots',
    title: 'LLM-Powered Chatbots',
    description: 'Deploy intelligent chatbots powered by large language models to enhance customer support and engagement.',
    icon: Bot,
    color: 'accent',
    features: ['24/7 customer support', 'Personalized responses', 'Multilingual capabilities']
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Connect different software systems seamlessly through custom API integrations for a unified workflow.',
    icon: Link2,
    color: 'primary',
    features: ['System connectivity', 'Data synchronization', 'Custom webhooks']
  },
  {
    id: 'email-automation',
    title: 'Email & Messaging',
    description: 'Set up automated email and messaging workflows that trigger based on specific events or conditions.',
    icon: Mail,
    color: 'secondary',
    features: ['Trigger-based messaging', 'Automated follow-ups', 'Performance analytics']
  },
  {
    id: 'custom-scripts',
    title: 'Custom Automation Scripts',
    description: 'Develop tailor-made Python and JavaScript automation scripts to address your unique business needs.',
    icon: Code,
    color: 'accent',
    features: ['Python & JavaScript', 'Scheduled execution', 'Notification systems']
  }
]

export default function ServicesOverview() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  
  // Add cards to the refs array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Animate section title
    gsap.from('.services-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })
    
    // Staggered animation for service cards
    cardsRef.current.forEach((card, index) => {
      // Animation for the card entrance
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: 0.1 * index,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        }
      })
      
      // Add hover animations
      gsap.set(card, { 
        transformPerspective: 1000,
        transformStyle: 'preserve-3d' 
      })
      
      // Card flip and 3D hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          rotateY: 5,
          rotateX: -5,
          scale: 1.02,
          boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        // Highlight icon
        const icon = card.querySelector('.service-icon')
        gsap.to(icon, {
          scale: 1.2,
          rotateZ: 5,
          duration: 0.3
        })
        
        // Animate feature items
        const features = card.querySelectorAll('.feature-item')
        gsap.to(features, {
          x: 5,
          opacity: 1,
          stagger: 0.05,
          duration: 0.2
        })
        
        // Animate data flow in lines
        const dataLine = card.querySelector('.data-flow-line')
        if (dataLine) {
          gsap.fromTo(dataLine, 
            { strokeDashoffset: 300 },
            { strokeDashoffset: 0, duration: 0.8 }
          )
        }
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out'
        })
        
        // Reset icon
        const icon = card.querySelector('.service-icon')
        gsap.to(icon, {
          scale: 1,
          rotateZ: 0,
          duration: 0.3
        })
        
        // Reset features
        const features = card.querySelectorAll('.feature-item')
        gsap.to(features, {
          x: 0,
          opacity: 0.7,
          stagger: 0.05,
          duration: 0.2
        })
      })
      
      // Create fluid animation on SVG paths
      const dataPath = card.querySelector('.data-flow-path')
      if (dataPath) {
        const serviceData = services[index]
        
        // Define unique path based on service type
        let pathD = ''
        switch(serviceData.id) {
          case 'data-automation':
            pathD = 'M10,25 C30,5 70,45 90,25'
            break
          case 'workflow-optimization':
            pathD = 'M10,25 L30,25 L30,45 L70,45 L70,25 L90,25'
            break
          case 'llm-chatbots':
            pathD = 'M10,35 Q50,10 90,35'
            break
          case 'api-integration':
            pathD = 'M10,25 L30,25 L30,45 L70,45 L70,25 L90,25'
            break
          case 'email-automation':
            pathD = 'M10,15 Q50,55 90,15'
            break
          case 'custom-scripts':
            pathD = 'M10,25 L30,15 L50,25 L70,15 L90,25'
            break
          default:
            pathD = 'M10,25 L90,25'
        }
        
        // Set the path
        dataPath.setAttribute('d', pathD)
        
        // Animate particles along the path
        const particles = card.querySelectorAll('.data-particle')
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            motionPath: {
              path: dataPath,
              align: dataPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: true
            },
            duration: 3 + i * 0.5,
            repeat: -1,
            ease: 'none',
            delay: i * 0.4
          })
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Light space background with soft geometric shapes */}
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient background */}
        <div className="absolute inset-0"></div>
        
        {/* Floating geometric shapes */}
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-lg opacity-20"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              backgroundColor: i % 3 === 0 ? '#1a81ff' : i % 3 === 1 ? '#5d7aa9' : '#dd7d0e',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
              filter: 'blur(40px)',
              animation: `float-slow ${10 + Math.random() * 10}s infinite alternate ease-in-out`,
            }}
          />
        ))} */}
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      {/* Add floating binary digits for tech feel */}
      <BinaryDigits/>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="services-title section-title mb-4">Our Automation Services</h2>
          <p className="services-subtitle section-subtitle">
            Streamline your business processes and enhance productivity with our comprehensive automation solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={addToRefs}
              className={`group relative bg-white dark:bg-gray-800 rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-xl
                ${service.color === 'primary' 
                  ? 'border-t-4 border-primary-500'
                  : service.color === 'secondary'
                    ? 'border-t-4 border-secondary-500'
                    : 'border-t-4 border-accent-500'
                }`}
            >
              {/* Service SVG Animation */}
              <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 70" preserveAspectRatio="none">
                  <path 
                    className="data-flow-path"
                    d="M10,25 L90,25" 
                    fill="none" 
                    stroke="transparent" 
                    strokeWidth="1" 
                  />
                  <path 
                    className="data-flow-line"
                    d="M10,25 L90,25" 
                    fill="none" 
                    stroke={service.color === 'primary' 
                      ? '#1a81ff' 
                      : service.color === 'secondary'
                        ? '#5d7aa9'
                        : '#dd7d0e'
                    } 
                    strokeWidth="1.5"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                    strokeLinecap="round"
                  />
                  
                  {/* Data particles */}
                  {[...Array(3)].map((_, i) => (
                    <circle 
                      key={i}
                      className="data-particle"
                      r="2" 
                      fill={service.color === 'primary' 
                        ? '#1a81ff' 
                        : service.color === 'secondary'
                          ? '#5d7aa9'
                          : '#dd7d0e'
                      }
                    />
                  ))}
                </svg>
              </div>
              
              {/* Service content */}
              <div className="relative z-10">
                <div className={`service-icon inline-flex items-center justify-center p-3 rounded-lg mb-5 text-white
                  ${service.color === 'primary' 
                    ? 'bg-primary-500' 
                    : service.color === 'secondary'
                      ? 'bg-secondary-500'
                      : 'bg-accent-500'
                  }`}
                >
                  <service.icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {service.description}
                </p>
                
                {/* Feature list */}
                <ul className="mb-5 space-y-2">
                  {service.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="feature-item flex items-center text-sm text-gray-600 dark:text-gray-400 opacity-70"
                    >
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/services#${service.id}`}
                  className={`inline-flex items-center font-medium transition-colors
                    ${service.color === 'primary' 
                      ? 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
                      : service.color === 'secondary'
                        ? 'text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300'
                        : 'text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300'
                    }`}
                >
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}