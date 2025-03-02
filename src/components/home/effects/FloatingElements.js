// src/components/effects/FloatingElements.js
'use client'

import { useEffect, useState } from 'react'

export default function FloatingElements({ 
  count = 5,
  content = '{automation: true}',
  className = "p-3 bg-gray-800/30 backdrop-blur-sm rounded text-xs font-mono text-primary-300"
}) {
  const [elements, setElements] = useState([])
  
  useEffect(() => {
    // Generate random positions only on the client side
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`,
      rotation: `rotate(${Math.random() * 10 - 5}deg)`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${i * 0.7}s`
    }))
    
    setElements(newElements)
  }, [count]) // Add count as a dependency to ensure proper updates if count changes

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className={className}
          style={{
            top: element.top,
            left: element.left,
            transform: element.rotation,
            animation: `float ${element.duration} infinite ease-in-out`,
            animationDelay: element.delay,
          }}
        >
          {content}
        </div>
      ))}
    </div>
  )
}