// src/components/home/HeroSection.js
"use client"

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { Bot, Database, Zap, ArrowRight, Code, BarChart3, Network, Workflow } from 'lucide-react'
import FloatingElements from './effects/FloatingElements'

export default function HeroSection() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)

  // Canvas animation for automation flow
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
    
    // Create automation flow nodes
    const nodes = [
      { x: dims.width * 0.15, y: dims.height * 0.3, radius: 12, color: '#1a81ff', type: 'input' },
      { x: dims.width * 0.4, y: dims.height * 0.15, radius: 14, color: '#3aa0ff', type: 'process' },
      { x: dims.width * 0.6, y: dims.height * 0.4, radius: 15, color: '#5d7aa9', type: 'process' },
      { x: dims.width * 0.8, y: dims.height * 0.25, radius: 13, color: '#dd7d0e', type: 'output' },
      { x: dims.width * 0.3, y: dims.height * 0.6, radius: 14, color: '#3aa0ff', type: 'process' },
      { x: dims.width * 0.65, y: dims.height * 0.7, radius: 13, color: '#dd7d0e', type: 'output' },
    ]
    
    // Create connections between nodes
    const connections = [
      { from: 0, to: 1 },
      { from: 0, to: 4 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 4, to: 2 },
      { from: 2, to: 5 },
    ]
    
    // Create data particles
    const particles = connections.map(conn => ({
      connection: conn,
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.002,
      size: 3 + Math.random() * 2,
      active: true,
      color: '#1a81ff'
    }))
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, dims.width, dims.height)
      
      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = 'rgba(26, 129, 255, 0.2)'
        ctx.lineWidth = 2
        ctx.stroke()
      })
      
      // Draw and update particles
      particles.forEach((particle) => {
        const fromNode = nodes[particle.connection.from]
        const toNode = nodes[particle.connection.to]
        
        // Update progress
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
          particle.size = 3 + Math.random() * 2
          particle.speed = 0.002 + Math.random() * 0.002
        }
        
        // Calculate position
        const x = fromNode.x + (toNode.x - fromNode.x) * particle.progress
        const y = fromNode.y + (toNode.y - fromNode.y) * particle.progress
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.7
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.globalAlpha = 0.9
        ctx.fill()
      })
      
      // Draw nodes
      nodes.forEach((node) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3)
        gradient.addColorStop(0, `${node.color}40`) // 25% opacity
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Main circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = 1
        ctx.fill()
        
        // Inner highlight
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fill()
      })
      
      animationFrameId = window.requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // GSAP animations
  useGSAP(() => {
    // Main title animation
    const titleSplit = titleRef.current.innerText.split(' ')
    const titleElements = []
    
    // Clear the original content
    titleRef.current.innerHTML = ''
    
    // Create spans for animation
    titleSplit.forEach((word, i) => {
      const wordSpan = document.createElement('span')
      wordSpan.className = 'inline-block'
      
      // Special treatment for "Automation"
      if (word === 'Automation') {
        wordSpan.classList.add('text-primary-500')
      }
      
      // Split into characters for more detailed animation
      const chars = word.split('')
      chars.forEach((char) => {
        const charSpan = document.createElement('span')
        charSpan.className = 'inline-block opacity-0'
        charSpan.textContent = char
        titleElements.push(charSpan)
        wordSpan.appendChild(charSpan)
      })
      
      // Add space after word
      if (i < titleSplit.length - 1) {
        const space = document.createElement('span')
        space.className = 'inline-block'
        space.innerHTML = '&nbsp;'
        titleRef.current.appendChild(wordSpan)
        titleRef.current.appendChild(space)
      } else {
        titleRef.current.appendChild(wordSpan)
      }
    })
    
    // Animate title characters
    gsap.to(titleElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: 'power3.out',
      onStart: () => {
        gsap.set(titleElements, { y: 30, rotationX: -90 })
      }
    })
    
    // Animate subtitle
    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.7,
      ease: 'power3.out'
    })
    
    // Animate CTA buttons
    gsap.from(ctaRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.5,
      delay: 1,
      ease: 'power2.out'
    })
    
    // Stats counter animation
    const statsElements = document.querySelectorAll('.stat-value')
    statsElements.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-value'), 10)
      
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        delay: 1.2,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
        }
      })
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Animated starry background */}
      <div className="absolute inset-0  -z-10">
        {/* Stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: 'white',
              opacity: Math.random() * 0.7 + 0.3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s ease-in-out`,
            }}
          />
        ))}
        
        {/* Glowing nebulas */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-accent-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Add floating code particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute p-3 bg-gray-800/30 backdrop-blur-sm rounded text-xs font-mono text-primary-300"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
              animation: `float ${5 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {`{automation: true}`}
          </div>
        ))}
      </div> */}
      {/* <FloatingElements count={5} content="{automation: true}" /> */}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 
              ref={titleRef}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 dark:text-white mb-6"
            >
              Intelligent Automation Solutions for Your Business
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Transform your business processes with Yalors' cutting-edge automation services. 
              We simplify workflows, clean data, and integrate powerful AI solutions to boost your efficiency.
            </p>
            
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <Link 
                href="/services" 
                className="btn-primary flex items-center"
              >
                Explore Services
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <Link 
                href="/contact" 
                className="btn-secondary flex items-center"
              >
                Book a Demo
                <Zap size={18} className="ml-2" />
              </Link>
            </div>
            
            {/* Animated stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { value: 98, label: 'Efficiency Increase', symbol: '%' },
                { value: 150, label: 'Happy Clients', symbol: '+' },
                { value: 24, label: 'Support', symbol: '/7' },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                  className="text-center p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm"
                >
                  <div className="flex justify-center items-baseline">
                    <span 
                      className="stat-value text-2xl font-bold text-primary-500" 
                      data-value={stat.value}
                    >
                      0
                    </span>
                    <span className="text-2xl font-bold text-primary-500">{stat.symbol}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Interactive automation visualization */}
          <div ref={visualRef} className="relative">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full" 
              />
              
              {/* Floating icons */}
              <div className="absolute inset-0">
                {[
                  { icon: <Bot size={24} />, top: '15%', left: '15%', delay: 0, bg: 'primary' },
                  { icon: <Database size={24} />, top: '10%', left: '30%', delay: 0.2, bg: 'secondary' },
                  { icon: <Code size={24} />, top: '60%', left: '30%', delay: 0.4, bg: 'primary' },
                  { icon: <BarChart3 size={24} />, top: '70%', left: '65%', delay: 0.6, bg: 'accent' },
                  { icon: <Network size={24} />, top: '25%', left: '80%', delay: 0.8, bg: 'accent' },
                  { icon: <Workflow size={24} />, top: '40%', left: '60%', delay: 1, bg: 'secondary' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 1.2 + item.delay,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 200
                    }}
                    className={`absolute p-3 rounded-full shadow-lg text-white ${
                      item.bg === 'primary' 
                        ? 'bg-primary-500' 
                        : item.bg === 'secondary'
                          ? 'bg-secondary-500'
                          : 'bg-accent-500'
                    }`}
                    style={{ 
                      top: item.top, 
                      left: item.left,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
              
              {/* Card overlays with data visualization */}
              {/* <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="absolute top-[40%] right-[0%] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl w-48"
              >
                <div className="text-sm font-medium mb-2">Processing Data</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <motion.div 
                    className="bg-primary-600 h-2.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>70% Complete</span>
                  <span>12MB/s</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.8 }}
                className="absolute bottom-[15%] left-[10%] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl w-44"
              >
                <div className="text-sm font-medium mb-2">Automation Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Active & Running</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">Last update: 2m ago</div>
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}