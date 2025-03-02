// src/components/effects/FloatingParticles.js
'use client'

import { useEffect, useState } from 'react'

export default function FloatingParticles({ count = 30 }) {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    // Generate random particles only on the client side
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      backgroundColor: i % 3 === 0 ? 'rgba(26, 129, 255, 0.2)' : 
                        i % 3 === 1 ? 'rgba(93, 122, 169, 0.2)' : 
                                      'rgba(221, 125, 14, 0.2)',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 15}s`,
      delay: `${i * 0.2}s`
    }))
    
    setParticles(newParticles)
  }, [count]) // Add count as a dependency to ensure proper updates if count changes

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            backgroundColor: particle.backgroundColor,
            top: particle.top,
            left: particle.left,
            filter: 'blur(1px)',
            animation: `float-particle ${particle.duration} infinite alternate ease-in-out`,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}