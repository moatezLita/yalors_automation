
// src/components/shared/ContactCta.jsx
"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactCta() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to start your project?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Contact us today to discuss your requirements and get a free consultation for your web development project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300 font-medium rounded-lg px-8 py-3"
          >
            Contact Us
          </Link>
          <Link 
            href="/projects" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors duration-300 font-medium rounded-lg px-8 py-3"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </motion.div>
  )
}