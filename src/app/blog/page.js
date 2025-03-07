// src/app/blog/page.js
"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock,
  Search,
  Tag
} from 'lucide-react'

import { 
  blogPosts, 
  getAllCategories, 
  getFeaturedPosts, 
  getPostsByCategory, 
  searchPosts 
} from '@/data/blogData'

export default function BlogPage() {
  const pageRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Blog posts animation
        gsap.from('.blog-post', {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.blog-grid',
            start: "top 80%",
          }
        })
      }, pageRef)

      return () => ctx.revert() // Cleanup animations on unmount
    }

    setTimeout(() => {
      initAnimations()
    }, 300)

  }, [])

  // Filter posts when search or category changes
  useEffect(() => {
    let posts = getPostsByCategory(activeCategory);
    
    if (searchTerm) {
      posts = searchPosts(searchTerm).filter(post => 
        activeCategory === 'all' || post.category === activeCategory
      );
    }
    
    setFilteredPosts(posts);
  }, [searchTerm, activeCategory]);

  // Categories for filter
  const categories = [
    { id: "all", label: "All Articles" },
    ...getAllCategories().map(cat => ({
      id: cat.name,
      label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1).replace('-', ' '),
      count: cat.count
    }))
  ]

  // Get featured posts
  const featuredPosts = getFeaturedPosts();

  return (
    <div ref={pageRef} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Simplified background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 -z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Automation Insights
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Latest articles, guides, and insights about automation, chatbots, and workflow optimization.
              </p>
              
              {/* Search input */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-blue-300" />
                </div>
                <input
                  type="text"
                  className="block w-full p-4 pl-10 bg-white/10 border border-blue-400/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <motion.div
                    key={post.id}
                    className="blog-post bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                    whileHover={{ y: -5, borderColor: 'rgba(147, 197, 253, 0.3)' }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-xs font-medium bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                          {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="mx-2 text-blue-400">•</span>
                        <span className="text-xs text-blue-300 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </span>
                        <span className="mx-2 text-blue-400">•</span>
                        <span className="text-xs text-blue-300 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-300 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-blue-100 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                            {post.author.split(' ').map(name => name[0]).join('')}
                          </div>
                          <span className="text-blue-200 text-sm">{post.author}</span>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                          Read more
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Category filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-blue-100 hover:bg-white/20'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label} {category.count && `(${category.count})`}
                </button>
              ))}
            </div>
            
            {/* All blog posts grid */}
            <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.length > 0 ? filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  className="blog-post bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                  whileHover={{ y: -5, borderColor: 'rgba(147, 197, 253, 0.3)' }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                        {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className="mx-2 text-blue-400">•</span>
                      <span className="text-xs text-blue-300 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-300 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-blue-100 mb-4 text-sm">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-blue-200 text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                      
                      <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
                    <Tag className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                    <p className="text-blue-100">
                      We couldn&apos;t find any articles matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                    {searchTerm && (
                      <button 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => setSearchTerm("")}
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredPosts.length > 6 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-blue-100 hover:bg-white/20 transition-colors">
                    Previous
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white/10 text-blue-100 hover:bg-white/20 transition-colors flex items-center justify-center">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white/10 text-blue-100 hover:bg-white/20 transition-colors flex items-center justify-center">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-blue-100 hover:bg-white/20 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Stay Updated on Automation Trends
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Subscribe to our newsletter to receive the latest articles, guides, and industry insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-blue-200 text-sm mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}