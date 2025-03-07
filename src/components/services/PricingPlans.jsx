// src/components/services/PricingPlans.jsx
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses just getting started',
      monthly: 499,
      yearly: 4999,
      features: [
        'Responsive Website Design',
        'Up to 5 Pages',
        'Contact Form',
        'Mobile Optimized',
        'Basic SEO Setup',
        '3 Months Support'
      ],
      mostPopular: false
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with specific needs',
      monthly: 999,
      yearly: 9999,
      features: [
        'Everything in Basic',
        'Up to 10 Pages',
        'Content Management System',
        'Blog Setup',
        'E-Commerce (up to 30 products)',
        'Social Media Integration',
        '6 Months Support',
        'Performance Analytics'
      ],
      mostPopular: true
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for established businesses',
      monthly: 1999,
      yearly: 19999,
      features: [
        'Everything in Professional',
        'Unlimited Pages',
        'Custom Functionality',
        'Advanced E-Commerce',
        'Payment Gateway Integration',
        'Multi-language Support',
        'Advanced SEO Optimization',
        '12 Months Priority Support',
        'Monthly Performance Reports'
      ],
      mostPopular: false
    }
  ]

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/10 p-1 rounded-full">
          <div className="flex items-center relative">
            <button 
              className={`py-2 px-6 rounded-full relative z-10 ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-200'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`py-2 px-6 rounded-full relative z-10 ${billingCycle === 'yearly' ? 'text-white' : 'text-blue-200'}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-xs text-green-400">Save 15%</span>
            </button>
            {/* Highlight pill */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" 
              initial={false}
              animate={{
                x: billingCycle === 'monthly' ? 0 : '100%',
                width: '50%',
                translateX: billingCycle === 'monthly' ? 0 : '-100%'
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          </div>
        </div>
      </div>
      
      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`pricing-plan rounded-2xl overflow-hidden ${
              plan.mostPopular 
                ? 'border-2 border-blue-500 relative' 
                : 'border border-white/10'
            }`}
            whileHover={{ y: -5 }}
          >
            {plan.mostPopular && (
              <div className="bg-blue-500 text-white text-center py-1 text-sm font-semibold">
                MOST POPULAR
              </div>
            )}
            <div className={`p-8 ${plan.mostPopular ? 'bg-white/15' : 'bg-white/10'}`}>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-blue-100 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === 'monthly' 
                    ? `${plan.monthly} DT` 
                    : `${plan.yearly} DT`}
                </span>
                <span className="text-blue-200">
                  {billingCycle === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-blue-100">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-4 rounded-lg font-medium ${
                plan.mostPopular 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              } transition-colors duration-300`}>
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-10 text-blue-200">
        <p>Need a custom solution? <a href="/contact" className="text-blue-400 hover:underline">Contact us</a> for a personalized quote.</p>
      </div>
    </div>
  )
}
