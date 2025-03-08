// src/app/about-us/page.js
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Clock, 
  Star, 
  Target, 
  Lightbulb,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Image from 'next/image'

export default function AboutUsPage() {
  const pageRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.from(headerRef.current.querySelectorAll('.animate-header'), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        })

        // Timeline animation
        gsap.from('.timeline-item', {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.timeline-section',
            start: "top 75%",
          }
        })

        // Values section animation
        gsap.from('.value-card', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.values-section',
            start: "top 75%",
          }
        })

        // Team section animation
        gsap.from('.team-member', {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.team-section',
            start: "top 80%",
          }
        })

        // Stats count up animation
        const statsElements = document.querySelectorAll('.stat-number');
        statsElements.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          
          ScrollTrigger.create({
            trigger: '.stats-section',
            start: "top 80%",
            onEnter: () => {
              let start = 0;
              const duration = 2;
              const interval = 20;
              const increment = target / (duration * 1000 / interval);
              
              const counter = setInterval(() => {
                start += increment;
                if (start >= target) {
                  stat.textContent = target;
                  clearInterval(counter);
                } else {
                  stat.textContent = Math.floor(start);
                }
              }, interval);
            },
            once: true
          });
        });

      }, pageRef)

      return () => ctx.revert() // Cleanup animations on unmount
    }

    setTimeout(() => {
      initAnimations()
    }, 300)

  }, [])

  // Team members data
  const teamMembers = [
    {
      name: 'Moatez Litaiem',
      position: 'Founder & CEO',
      bio: 'Expert in automation and Web Developement',
      image: '/images/team/profile_picture.jpg'
    },
    {
      name: 'Zaineb Boujelbene',
      position: 'CTO',
      bio: 'Expert in machine learning and conversation design',
      image: '/images/team/zainebbo.png'
    },
    // {
    //   name: 'Anis Khelifi',
    //   position: 'Head of Engineering',
    //   bio: 'Leading our development team with technical excellence',
    //   image: '/images/team/anis.jpg'
    // },
    // {
    //   name: 'Yasmine Trabelsi',
    //   position: 'UX/UI Designer',
    //   bio: 'Creating intuitive and engaging user experiences',
    //   image: '/images/team/yasmine.jpg'
    // }
  ]

  return (
    <div ref={pageRef} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Simplified background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 -z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header section */}
        <section ref={headerRef} className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="animate-header text-4xl md:text-5xl font-bold text-white mb-6">
                We Make Automation <span className="text-blue-400">Simple</span>
              </h1>
              <p className="animate-header text-xl text-blue-100 mb-8">
                Yalors is a team of automation experts dedicated to helping businesses streamline their operations, improve customer experiences, and drive growth through intelligent solutions.
              </p>
              <div className="animate-header flex flex-wrap justify-center gap-4 mb-12">
                <Link 
                  href="/contact" 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/services" 
                  className="btn bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Our Services
                </Link>
              </div>
              
              {/* Key facts */}
              <div className="animate-header grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Trusted Partner</h3>
                  <p className="text-blue-200 text-sm">Serving businesses across industries with tailored automation solutions</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation Focused</h3>
                  <p className="text-blue-200 text-sm">Constantly improving our solutions with the latest in AI and automation</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-teal-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Results Driven</h3>
                  <p className="text-blue-200 text-sm">Committed to delivering measurable business outcomes for our clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our story section */}
        {/* <section className="py-16 md:py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-blue-100 mb-6">
                  Founded in 2020 in Tunisia, Yalors began with a simple mission: to make powerful automation accessible to businesses of all sizes. Our founders recognized that while many companies wanted to embrace automation, they often lacked the technical expertise or resources to implement it effectively.
                </p>
                <p className="text-blue-100 mb-6">
                  We started by developing chatbot solutions for customer service, which quickly expanded to comprehensive workflow automation as we saw the transformative impact of our technology on our clients&apos; operations.
                </p>
                <p className="text-blue-100 mb-8">
                  Today, Yalors has grown into a leading automation solutions provider serving clients across multiple industries. Our team combines technical expertise with business acumen to deliver solutions that create real value.
                </p> */}
                
                {/* Vision / Mission */}
                {/* <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                      <Zap className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-white font-medium block mb-1">Our Vision</span>
                      <p className="text-blue-200 text-sm">To create a world where businesses can harness the full potential of automation to thrive in the digital age.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-1 rounded-full mr-3 mt-1">
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-white font-medium block mb-1">Our Mission</span>
                      <p className="text-blue-200 text-sm">To deliver innovative, reliable, and accessible automation solutions that help our clients save time, reduce costs, and improve customer experiences.</p>
                    </div>
                  </div>
                </div>
              </div> */}
              
              {/* <div className="lg:w-1/2"> */}
                {/* Timeline */}
                {/* <div className="timeline-section relative pl-8 border-l border-blue-500/30">
                  <div className="timeline-item relative mb-12">
                    <div className="absolute -left-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2">2020 - Foundation</h3>
                      <p className="text-blue-100">Yalors was founded with the vision of making automation accessible to all businesses.</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item relative mb-12">
                    <div className="absolute -left-10 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2">2021 - First Major Client</h3>
                      <p className="text-blue-100">Secured our first major enterprise client and launched our chatbot platform.</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item relative mb-12">
                    <div className="absolute -left-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2">2022 - Expansion</h3>
                      <p className="text-blue-100">Expanded our services to include workflow automation and doubled our team size.</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item relative">
                    <div className="absolute -left-10 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-2">2023 - Today</h3>
                      <p className="text-blue-100">Continuing to innovate and grow, serving clients across multiple industries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Stats section */}
        <section className="py-16 stats-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 text-center">
                <span className="stat-number block text-4xl font-bold text-white mb-2" data-target="50">0</span>
                <span className="text-blue-200">Clients</span>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-700/20 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 text-center">
                <span className="stat-number block text-4xl font-bold text-white mb-2" data-target="100">0</span>
                <span className="text-blue-200">Projects Completed</span>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10 text-center">
                <span className="stat-number block text-4xl font-bold text-white mb-2" data-target="15">0</span>
                <span className="text-blue-200">Team Members</span>
              </div>
              
              <div className="bg-gradient-to-br from-teal-600/20 to-teal-700/20 backdrop-blur-sm rounded-xl p-6 border border-teal-500/10 text-center">
                <span className="stat-number block text-4xl font-bold text-white mb-2" data-target="3">0</span>
                <span className="text-blue-200">Years of Excellence</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our values */}
        <section className="py-16 md:py-24 bg-white/5 values-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Values</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                These core principles guide everything we do at Yalors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
                <p className="text-blue-100">
                  We strive for excellence in everything we do, from the solutions we build to the service we provide our clients.
                </p>
              </div>
              
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-blue-100">
                  We embrace creativity and continuously seek better ways to solve problems and create value for our clients.
                </p>
              </div>
              
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Integrity</h3>
                <p className="text-blue-100">
                  We act with honesty and transparency in all our interactions, building trust with our clients and partners.
                </p>
              </div>
              
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Collaboration</h3>
                <p className="text-blue-100">
                  We believe in the power of teamwork and partnership, working closely with our clients to achieve shared goals.
                </p>
              </div>
              
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Adaptability</h3>
                <p className="text-blue-100">
                  We embrace change and continuously evolve our skills and solutions to meet emerging challenges.
                </p>
              </div>
              
              <div className="value-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Efficiency</h3>
                <p className="text-blue-100">
                  We value time and resources, striving to deliver maximum value through optimized processes and solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 md:py-24 team-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet Our Team</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                The passionate experts behind our automation solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto justify-center">
  {teamMembers.map((member, index) => (
    <motion.div
      key={index}
      className="team-member bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
      whileHover={{ y: -5, borderColor: 'rgba(147, 197, 253, 0.3)' }}
    >
      <div className="aspect-square bg-gradient-to-br from-blue-900 to-indigo-900 relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={index === 0} // Prioritize first image for better LCP
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-300 mb-3">{member.position}</p>
        <p className="text-blue-100 text-sm">{member.bio}</p>
      </div>
    </motion.div>
  ))}
</div>
            
            <div className="text-center mt-12">
              <Link 
                href="/careers" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
              >
                Join our growing team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Contact us today to discover how our automation solutions can help your business save time, reduce costs, and improve customer experiences.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-300 font-medium rounded-lg px-8 py-4 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}