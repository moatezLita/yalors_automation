// src/components/home/Testimonials.js
"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import FloatingParticles from './effects/FloatingParticles'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Director of Operations, TechFlow Inc.',
    image: '/images/testimonials/profile-1.svg',
    content: 'Yalors transformed our data processing workflows. What used to take our team days now happens automatically in minutes. The ROI has been incredible, and their support team is always there when we need them.',
    rating: 5,
    company: 'TechFlow Inc.',
    metrics: {
      efficiency: '+87%',
      cost: '-35%'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, GrowthScale',
    image: '/images/testimonials/profile-2.svg',
    content: 'The custom API integration Yalors built for us connects our CRM, marketing platform, and analytics tools seamlessly. Our data flows automatically, and we finally have a single source of truth. Game changer!',
    rating: 5,
    company: 'GrowthScale',
    metrics: {
      time: '-68%',
      accuracy: '+92%'
    }
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Customer Support Lead, ServeCo',
    image: '/images/testimonials/profile-3.svg',
    content: 'Our support team was overwhelmed with repetitive requests. Yalors built us an LLM-powered chatbot that handles 65% of queries automatically. Our team can now focus on complex issues, and customer satisfaction is up!',
    rating: 5,
    company: 'ServeCo',
    metrics: {
      resolution: '-40%',
      satisfaction: '+28%'
    }
  },
  {
    id: 4,
    name: 'David Miller',
    role: 'Finance Director, InvestGroup',
    image: '/images/testimonials/profile-4.svg',
    content: 'The automated reporting system Yalors built saves us countless hours every month. Financial reports that took days to compile now generate with a single click, with perfect accuracy every time.',
    rating: 5,
    company: 'InvestGroup',
    metrics: {
      time: '-75%',
      accuracy: '+99.8%'
    }
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // GSAP animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Animate section title
    gsap.from('.testimonials-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })
    
    // We're now using Framer Motion for the testimonial cards
    
    // Create the floating quotes animation
    const quotes = document.querySelectorAll('.floating-quote')
    quotes.forEach((quote, index) => {
      gsap.to(quote, {
        y: (index % 2 === 0) ? 15 : -15,
        rotate: (index % 2 === 0) ? 10 : -10,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5
      })
    })
  }, { scope: sectionRef })
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  // Calculate which slides to show based on viewport size
  // This is approximation - in production you'd use a hook for window size
  const getVisibleSlides = () => {
    // For mobile, just show the current slide
    let slidesToShow = [testimonials[currentSlide]]
    
    // For larger screens, show current and next slides
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      slidesToShow = [
        testimonials[currentSlide],
        testimonials[(currentSlide + 1) % testimonials.length]
      ]
      
      // For even larger screens, show three slides
      if (window.innerWidth >= 1280) {
        slidesToShow = [
          testimonials[currentSlide],
          testimonials[(currentSlide + 1) % testimonials.length],
          testimonials[(currentSlide + 2) % testimonials.length]
        ]
      }
    }
    
    return slidesToShow
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-20 e relative overflow-hidden"
    >
      {/* Light space background with soft particles */}
      <div className="absolute inset-0 -z-10">
        {/* White background with subtle texture */}
        {/* <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(26, 129, 255, 0.03), transparent 25%), radial-gradient(circle at 70% 20%, rgba(221, 125, 14, 0.03), transparent 25%)',
          backgroundSize: '100px 100px',
        }}></div> */}
        
        {/* Floating particles */}
        {/* {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: i % 3 === 0 ? 'rgba(26, 129, 255, 0.2)' : 
                               i % 3 === 1 ? 'rgba(93, 122, 169, 0.2)' : 
                                             'rgba(221, 125, 14, 0.2)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              animation: `float-particle ${10 + Math.random() * 15}s infinite alternate ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))} */}
        <FloatingParticles count={30} />
        
        {/* Light beams */}
        {/* <div className="absolute top-0 -right-20 w-80 h-screen bg-gradient-to-b from-primary-500/5 to-transparent transform rotate-12"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-screen bg-gradient-to-b from-accent-500/5 to-transparent transform -rotate-12"></div> */}
      </div>
      
      {/* Floating quote marks for decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-quote absolute top-20 left-[10%] text-primary-300 opacity-50">
          <Quote size={80} />
        </div>
        <div className="floating-quote absolute top-1/3 right-[15%] text-accent-300 opacity-50">
          <Quote size={50} />
        </div>
        <div className="floating-quote absolute bottom-1/4 left-[20%] text-secondary-300 opacity-50">
          <Quote size={60} />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonials-title section-title mb-4">What Our Clients Say</h2>
          <p className="testimonials-subtitle section-subtitle">
            Discover how businesses are transforming their operations with our automation solutions
          </p>
        </div>
        
        {/* Slider for testimonials */}
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Mobile navigation controls */}
          <div className="flex justify-center space-x-4 mb-8 md:hidden">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Desktop navigation controls */}
          <button 
            onClick={prevSlide}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 z-10 transition-transform duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 z-10 transition-transform duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Testimonial cards */}
          <div 
            ref={sliderRef}
            className="flex flex-wrap justify-center gap-6"
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentSlide
              const isVisible = (index >= currentSlide && index < currentSlide + 3) || 
                              (currentSlide + 3 > testimonials.length && index < (currentSlide + 3) % testimonials.length)
              
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                    scale: isActive ? 1.05 : 1
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`testimonial-card w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col
                    ${isActive ? 'border-2 border-primary-500' : 'border border-gray-200 dark:border-gray-700'}
                    ${!isVisible ? 'hidden' : ''}
                  `}
                >
                  {/* Top section with quote icon */}
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                      <Quote size={24} />
                    </div>
                    
                    {/* Star rating */}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="flex-grow">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  {/* Client info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-900">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    {/* Impact metrics */}
                    <div className="flex flex-col items-end">
                      {Object.entries(testimonial.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">{key}:</span>
                          <span className={`font-bold ${value.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-primary-600 dark:text-primary-400'}`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}