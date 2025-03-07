// src/components/services/ServiceFaq.jsx
"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How long does it take to complete a website?',
    answer: 'The timeline depends on the complexity and scope of your project. Simple websites can be completed in 2-4 weeks, while more complex projects may take 2-3 months. During our initial consultation, we will provide a specific timeline for your project.'
  },
  {
    question: 'Do you provide website maintenance services?',
    answer: 'Yes, we offer various maintenance packages to keep your website secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security monitoring, performance optimization, and technical support.'
  },
  {
    question: 'How much does a website cost?',
    answer: 'Website costs vary based on your requirements, features, and complexity. Our basic packages start at 499 DT, with custom solutions priced according to your specific needs. We provide detailed quotes after understanding your project requirements.'
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely! All our websites are built with responsive design principles, ensuring they look and function perfectly on all devices including smartphones, tablets, and desktops. Mobile optimization is a standard part of our development process.'
  },
  {
    question: 'Can you help with content creation for my website?',
    answer: 'Yes, we offer content creation services including copywriting, image selection, and basic photo editing. We can help craft engaging content that resonates with your target audience and supports your business goals.'
  },
  {
    question: 'Do you offer e-commerce solutions?',
    answer: 'Yes, we specialize in building e-commerce websites using platforms like WooCommerce, Shopify, and custom solutions. We can implement product catalogs, secure payment gateways, inventory management, and other essential e-commerce features.'
  }
]

export default function ServiceFaq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item mb-4">
          <button
            className={`w-full text-left p-4 rounded-lg flex justify-between items-center ${
              openIndex === index 
                ? 'bg-white/15 border-b-0 rounded-b-none' 
                : 'bg-white/10 hover:bg-white/15'
            } border border-white/10 transition-colors duration-300`}
            onClick={() => toggleFaq(index)}
          >
            <span className="text-white font-medium">{faq.question}</span>
            <span className="ml-4 text-blue-300 transform transition-transform duration-300">
              <svg 
                className={`w-5 h-5 transform ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white/5 border border-t-0 border-white/10 rounded-b-lg text-blue-100">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
