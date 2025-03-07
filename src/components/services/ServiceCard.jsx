// src/components/services/ServiceCard.jsx
"use client"

import { motion } from 'framer-motion'
import { Code, ShoppingCart, Smartphone, Layout, TrendingUp, Server } from 'lucide-react'

export default function ServiceCard({ service }) {
  // Get the correct icon based on the service icon string
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'code':
        return <Code className="w-6 h-6" />;
      case 'shopping-cart':
        return <ShoppingCart className="w-6 h-6" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'layout':
        return <Layout className="w-6 h-6" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      className="service-card bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 mr-4">
            {getIcon(service.icon)}
          </div>
          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
        </div>
        
        <p className="text-blue-100 mb-6">
          {service.description}
        </p>
        
        <ul className="space-y-2 mb-4">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-blue-200">
              <span className="bg-green-500/20 rounded-full w-2 h-2 mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className="mt-2 py-2 px-4 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/20 transition-colors duration-300 w-full">
          Learn More
        </button>
      </div>
    </motion.div>
  )
}