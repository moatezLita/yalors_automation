// src/components/services/ProcessSteps.jsx
"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery & Research',
    description: 'We begin by understanding your business goals, target audience, and project requirements through in-depth consultation.'
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We create a detailed roadmap outlining the project scope, timeline, technical solutions, and key milestones.'
  },
  {
    number: '03',
    title: 'Design & Prototyping',
    description: 'Our designers create wireframes and interactive prototypes to visualize the user interface and experience.'
  },
  {
    number: '04',
    title: 'Development',
    description: 'Our expert developers build your solution using the latest technologies and following best coding practices.'
  },
  {
    number: '05',
    title: 'Testing & QA',
    description: 'We rigorously test all aspects of your project across devices and browsers to ensure quality and reliability.'
  },
  {
    number: '06',
    title: 'Deployment & Launch',
    description: 'We handle the technical aspects of launching your project and ensure everything runs smoothly.'
  },
]

export default function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="process-step bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 opacity-10 text-8xl font-bold text-white -mt-5 -mr-5">
            {step.number}
          </div>
          <div className="relative z-10">
            <div className="text-blue-400 font-semibold mb-2">{step.number}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
            <p className="text-blue-100">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}