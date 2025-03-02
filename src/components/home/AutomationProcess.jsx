// src/components/home/AutomationProcess.js
"use client"

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { ClipboardList, Palette, Code2, TestTube, Upload, HeartPulse } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Analysis',
    description: 'We analyze your current workflows and identify automation opportunities to maximize efficiency.',
    icon: ClipboardList,
    color: 'primary',
    animation: {
      path: 'M10,20 Q30,0 50,20 Q70,40 90,20',
      particleCount: 5
    }
  },
  {
    id: 2,
    title: 'Design',
    description: 'Our experts design custom automation solutions tailored to your specific business requirements.',
    icon: Palette,
    color: 'secondary',
    animation: {
      path: 'M10,20 L30,20 L50,10 L70,20 L90,20',
      particleCount: 4
    }
  },
  {
    id: 3,
    title: 'Development',
    description: 'We build your automation solution using cutting-edge technologies including Python, APIs, and LLMs.',
    icon: Code2,
    color: 'accent',
    animation: {
      path: 'M10,15 L30,15 L30,25 L50,25 L50,15 L70,15 L70,25 L90,25',
      particleCount: 6
    }
  },
  {
    id: 4,
    title: 'Testing',
    description: 'Rigorous testing ensures your automation processes work flawlessly in all scenarios.',
    icon: TestTube,
    color: 'primary',
    animation: {
      path: 'M10,20 C30,10 70,30 90,20',
      particleCount: 5
    }
  },
  {
    id: 5,
    title: 'Deployment',
    description: 'We seamlessly integrate the automation solution into your existing workflow with minimal disruption.',
    icon: Upload,
    color: 'secondary',
    animation: {
      path: 'M10,25 Q25,5 50,25 Q75,45 90,25',
      particleCount: 4
    }
  },
  {
    id: 6,
    title: 'Support',
    description: 'Continuous monitoring and support ensure your automation solutions evolve with your business needs.',
    icon: HeartPulse,
    color: 'accent',
    animation: {
      path: 'M10,20 L30,10 L50,20 L70,10 L90,20',
      particleCount: 5
    }
  }
]

export default function AutomationProcess() {
  const sectionRef = useRef(null)
  const processRef = useRef(null)
  const canvasRef = useRef(null)
  const stepsRefs = useRef([])

  // Add steps to refs array
  const addToStepRefs = (el) => {
    if (el && !stepsRefs.current.includes(el)) {
      stepsRefs.current.push(el)
    }
  }

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Make canvas responsive
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      return { width, height }
    }
    
    let dims = resizeCanvas()
    window.addEventListener('resize', () => {
      dims = resizeCanvas()
    })
    
    // Create nodes and connections for network visualization
    const nodes = []
    const numNodes = 50
    
    // Create initial nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * dims.width,
        y: Math.random() * dims.height,
        radius: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: i % 3 === 0 
          ? 'rgba(26, 129, 255, 0.5)' 
          : i % 3 === 1 
            ? 'rgba(93, 122, 169, 0.5)' 
            : 'rgba(221, 125, 14, 0.5)'
      })
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, dims.width, dims.height)
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        
        // Bounce off walls
        if (node.x < 0 || node.x > dims.width) node.vx *= -1
        if (node.y < 0 || node.y > dims.height) node.vy *= -1
        
        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })
      
      // Draw connections between close nodes
      ctx.globalAlpha = 0.2
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.strokeStyle = 'rgba(26, 129, 255, ' + (1 - distance / 100) + ')'
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      
      ctx.globalAlpha = 1
      
      animationFrameId = window.requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // GSAP animations with timeline
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate section title
    gsap.from('.process-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })

    // Create a timeline for the process steps
    stepsRefs.current.forEach((step, index) => {
      // Animate each step on scroll
      gsap.from(step, {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      })
      
      // Animate the step number with pulsing effect
      const stepNumber = step.querySelector('.step-number')
      if (stepNumber) {
        gsap.to(stepNumber, {
          scale: 1.1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1
        })
      }
      
      // Animate the icon
      const icon = step.querySelector('.step-icon')
      if (icon) {
        gsap.from(icon, {
          rotate: -30,
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          }
        })
      }
      
      // Animate the data flow
      const dataFlow = step.querySelector('.data-flow-path')
      if (dataFlow) {
        gsap.from(dataFlow, {
          strokeDashoffset: 300,
          duration: 1.5,
          delay: 0.3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          }
        })
      }
      
      // Animate each feature dot in the visualization
      const featureDots = step.querySelectorAll('.feature-dot')
      if (featureDots.length) {
        gsap.from(featureDots, {
          scale: 0,
          opacity: 0,
          stagger: 0.2,
          duration: 0.5,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          }
        })
      }
      
      // Connect steps with lines
      if (index < steps.length - 1) {
        const connector = document.querySelector(`.connector-${index}`)
        if (connector) {
          gsap.from(connector, {
            height: 0,
            duration: 0.8,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: connector,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.5
            }
          })
        }
      }
    })
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden bg-gray-900 text-white"
    >
      {/* Starry background similar to technologies section */}
      <div className="absolute inset-0 bg-gray-900 -z-10">
        {/* Stars */}
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: i % 5 === 0 ? '#3aa0ff' : i % 5 === 1 ? '#dd7d0e' : 'white',
              opacity: Math.random() * 0.7 + 0.3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s ease-in-out`,
            }}
          />
        ))}
        
        {/* Nebula effects */}
        <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-primary-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent-600/5 rounded-full filter blur-3xl"></div>
        
        {/* Shooting stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white"
            style={{
              top: `${Math.random() * 50}%`,
              left: '0%',
              boxShadow: '0 0 3px 1px white',
              animation: `shooting-star ${5 + Math.random() * 10}s infinite linear ${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Background canvas for particle animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="process-title section-title mb-4">Our Automation Process</h2>
          <p className="process-subtitle section-subtitle">
            A streamlined approach to transform your manual workflows into efficient automated systems
          </p>
        </div>
        
        {/* Process Steps */}
        <div 
          ref={processRef}
          className="relative mx-auto max-w-4xl"
        >
          {steps.map((step, index) => (
            <div 
              key={step.id}
              ref={addToStepRefs}
              className={`flex items-stretch mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Step number column */}
              <div className="relative flex flex-col items-center w-24 flex-shrink-0">
                <div className={`step-number flex items-center justify-center w-16 h-16 rounded-full text-white text-xl font-bold relative z-10 
                  ${step.color === 'primary' 
                    ? 'bg-primary-500'
                    : step.color === 'secondary'
                      ? 'bg-secondary-500'
                      : 'bg-accent-500'
                  }`}
                >
                  {step.id}
                </div>
                
                {/* Connector line to next step */}
                {index < steps.length - 1 && (
                  <div 
                    className={`connector-${index} absolute top-16 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 left-1/2 transform -translate-x-1/2`}
                    style={{ height: 'calc(100% + 2rem)' }}
                  />
                )}
              </div>
              
              {/* Step content card */}
              <div className={`flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative ${
                index % 2 === 0 ? 'ml-6' : 'mr-6'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`step-icon p-3 rounded-full mr-4 text-white
                    ${step.color === 'primary' 
                      ? 'bg-primary-500'
                      : step.color === 'secondary'
                        ? 'bg-secondary-500'
                        : 'bg-accent-500'
                    }`}
                  >
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">{step.description}</p>
                
                {/* Visual representation of the step */}
                <div className="relative h-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 p-2">
                  <svg width="100%" height="100%" viewBox="0 0 100 40" className="overflow-visible">
                    {/* Path for data flow */}
                    <path 
                      d={step.animation.path} 
                      fill="none" 
                      stroke={step.color === 'primary' 
                        ? 'rgba(26, 129, 255, 0.2)' 
                        : step.color === 'secondary'
                          ? 'rgba(93, 122, 169, 0.2)'
                          : 'rgba(221, 125, 14, 0.2)'
                      } 
                      strokeWidth="2"
                    />
                    
                    {/* Animated data flow path */}
                    <path 
                      className="data-flow-path" 
                      d={step.animation.path} 
                      fill="none" 
                      stroke={step.color === 'primary' 
                        ? 'rgba(26, 129, 255, 0.8)' 
                        : step.color === 'secondary'
                          ? 'rgba(93, 122, 169, 0.8)'
                          : 'rgba(221, 125, 14, 0.8)'
                      } 
                      strokeWidth="2"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                    />
                    
                    {/* Feature dots along path */}
                    {step.animation.path.split(' ').filter(part => part.includes(',')).map((point, i) => {
                      const [x, y] = point.replace(/[A-Z,]/g, '').split(',')
                      return (
                        <circle 
                          key={i}
                          className="feature-dot"
                          cx={x} 
                          cy={y} 
                          r="3" 
                          fill={step.color === 'primary' 
                            ? '#1a81ff' 
                            : step.color === 'secondary'
                              ? '#5d7aa9'
                              : '#dd7d0e'
                          }
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}