// src/components/home/Technologies.js
"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { 
  FileCode2, Database, Bot, Link, Cloud, Network, Webhook, Braces, Terminal
} from 'lucide-react'

// Custom Python icon since Lucide doesn't have one
const PythonLogo = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={32} height={32}
      {...props}
    >
      <g clipPath="url(#clip0_1_2)">
        <path d="M11.96 0C5.858 0 6.252 2.618 6.252 2.618L6.26 5.315H12.06V6.264H3.915S0 5.75 0 11.914C0 18.08 3.42 17.83 3.42 17.83H5.457V15.04S5.36 11.62 8.9 11.62H14.622S17.855 11.683 17.855 8.543V3.228C17.855 3.228 18.356 0 11.96 0ZM8.75 1.853C9.38 1.853 9.892 2.364 9.892 2.994C9.892 3.625 9.38 4.136 8.75 4.136C8.12 4.136 7.608 3.625 7.608 2.994C7.608 2.364 8.12 1.853 8.75 1.853Z" fill="currentColor"/>
        <path d="M12.04 24C18.142 24 17.748 21.382 17.748 21.382L17.74 18.685H11.94V17.736H20.085S24 18.25 24 12.086C24 5.92 20.58 6.17 20.58 6.17H18.543V8.96S18.64 12.38 15.1 12.38H9.378S6.145 12.317 6.145 15.457V20.772C6.145 20.772 5.644 24 12.04 24ZM15.25 22.147C14.62 22.147 14.108 21.636 14.108 21.006C14.108 20.375 14.62 19.864 15.25 19.864C15.88 19.864 16.392 20.375 16.392 21.006C16.392 21.636 15.88 22.147 15.25 22.147Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const technologies = [
  {
    name: 'Python',
    icon: PythonLogo,
    description: 'Powerful scripting for data processing and backend automation.',
    features: ['Data analysis', 'API integration', 'Process automation']
  },
  {
    name: 'JavaScript',
    icon: FileCode2,
    description: 'Dynamic frontend and Node.js backend automation capabilities.',
    features: ['Web automation', 'Real-time processing', 'UI integration']
  },
  {
    name: 'Databases',
    icon: Database,
    description: 'Efficient data storage and retrieval for automation workflows.',
    features: ['Data warehousing', 'Query optimization', 'Real-time analytics']
  },
  {
    name: 'LLM Models',
    icon: Bot,
    description: 'AI language models for intelligent chatbots and content generation.',
    features: ['Natural language processing', 'Sentiment analysis', 'Content generation']
  },
  {
    name: 'API Integration',
    icon: Link,
    description: 'Seamless connections between different systems and services.',
    features: ['REST APIs', 'GraphQL', 'Custom integrations']
  },
  {
    name: 'Workflow Automation',
    icon: Network,
    description: 'End-to-end process automation for repeatable business tasks.',
    features: ['Process mapping', 'Conditional logic', 'Scheduled triggers']
  },
  {
    name: 'Cloud Infrastructure',
    icon: Cloud,
    description: 'Scalable and reliable infrastructure for hosting automation services.',
    features: ['Auto-scaling', 'Redundancy', 'Global distribution']
  },
  {
    name: 'Webhooks',
    icon: Webhook,
    description: 'Event-driven integrations to connect disparate systems.',
    features: ['Real-time triggers', 'Data transformation', 'Security']
  }
];

export default function Technologies() {
  const sectionRef = useRef(null)
  const techGridRef = useRef(null)
  
      // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Animate section title
    gsap.from('.tech-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })
    
    // Staggered animation for tech items (this is removed as we're using Framer Motion for each item)
    
    // Create the floating code snippets animation
    const codeSnippets = gsap.utils.toArray('.code-snippet')
    codeSnippets.forEach((snippet, index) => {
      // Initial position
      gsap.set(snippet, {
        x: (index % 2 === 0 ? -50 : 50),
        y: 20 * (index - codeSnippets.length / 2),
        opacity: 0,
        rotateZ: (index % 2 === 0 ? -5 : 5)
      })
      
      // Animate in on scroll
      gsap.to(snippet, {
        x: 0,
        opacity: 0.8,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })
      
      // Continuous floating animation
      gsap.to(snippet, {
        y: `+=${(index % 2 === 0 ? 15 : -15)}`,
        rotateZ: (index % 2 === 0 ? 2 : -2),
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      })
    })
    
    // Add hover animation for tech items
    const techItems = gsap.utils.toArray('.tech-item')
    techItems.forEach((item) => {
      const icon = item.querySelector('.tech-icon')
      
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -10,
          boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
          duration: 0.3
        })
        
        gsap.to(icon, {
          scale: 1.2,
          rotate: 10,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
      })
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          duration: 0.3
        })
        
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.3
        })
      })
    })
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef} 
      className="py-20  text-white relative overflow-hidden"
    >
      {/* Floating code snippets in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="code-snippet absolute top-[10%] left-[5%] max-w-xs p-4 bg-gray-800 rounded shadow-lg text-xs font-mono text-green-400">
          {`import pandas as pd\n\ndef process_data(file):\n  data = pd.read_csv(file)\n  # Clean & transform data\n  return data.dropna()`}
        </div>
        
        <div className="code-snippet absolute top-[20%] right-[8%] max-w-xs p-4 bg-gray-800 rounded shadow-lg text-xs font-mono text-blue-400">
          {`async function automateProcess() {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  return processWorkflow(data);\n}`}
        </div>
        
        <div className="code-snippet absolute bottom-[15%] left-[15%] max-w-xs p-4 bg-gray-800 rounded shadow-lg text-xs font-mono text-purple-400">
          {`class LLMBot:\n  def __init__(self):\n    self.model = load_model()\n  \n  def generate(self, prompt):\n    return self.model.predict(prompt)`}
        </div>
        
        <div className="code-snippet absolute bottom-[25%] right-[12%] max-w-xs p-4 bg-gray-800 rounded shadow-lg text-xs font-mono text-yellow-400">
          {`// Event-driven webhook handler\napp.post('/webhook', (req, res) => {\n  const { event, data } = req.body;\n  triggerAutomation(event, data);\n  res.status(200).send();\n});`}
        </div>
      </div>
      
      {/* Glowing dots in background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? 'rgba(26,129,255,0.6)' : 
                               i % 3 === 1 ? 'rgba(93,122,169,0.6)' : 
                                             'rgba(221,125,14,0.6)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 ">
          <h2 className="tech-title section-title  mb-4">Technologies We Use</h2>
          <p className="tech-subtitle section-subtitle max-w-3xl mx-auto">
            Our automation solutions are built using cutting-edge technologies to deliver 
            reliable, scalable, and efficient systems
          </p>
        </div>
        
        <div 
          ref={techGridRef}
          className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="tech-item bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 shadow-lg border border-gray-700 hover:border-primary-500"
            >
              <div className="tech-icon mb-4 text-primary-500 transition-all duration-300">
                {React.createElement(tech.icon, { size: 32, strokeWidth: 1.5 })}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{tech.description}</p>
              
              <div className="space-y-1">
                {tech.features.map((feature, i) => (
                  <p key={i} className="text-xs flex items-center text-gray-300">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mr-2" />
                    {feature}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Technology integration visualization */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full text-lg font-bold shadow-lg hover:bg-primary-700 transition-colors duration-300"
          >
            <Braces size={20} className="mr-2" />
            See how we integrate these technologies
            <Terminal size={20} className="ml-2" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}