// src/components/BinaryDigits.js
'use client'

import { useEffect, useState } from 'react'

export default function BinaryDigits() {
  const [digits, setDigits] = useState([])
  
  useEffect(() => {
    // Generate random positions only on the client side
    const newDigits = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      value: Math.random() > 0.5 ? '1' : '0',
      duration: `${3 + Math.random() * 5}s`,
      delay: `${i * 0.3}s`
    }))
    
    setDigits(newDigits)
  }, []) // Empty dependency array ensures this runs once after mount (client-side only)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {digits.map((digit) => (
        <div
          key={digit.id}
          className="absolute text-primary-300/20 text-xs font-mono"
          style={{
            top: digit.top,
            left: digit.left,
            animation: `float-digit ${digit.duration} infinite linear`,
            animationDelay: digit.delay,
          }}
        >
          {digit.value}
        </div>
      ))}
    </div>
  )
}