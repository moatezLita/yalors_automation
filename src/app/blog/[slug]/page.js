// src/app/blog/[slug]/page.jsx
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft,
  Share2,
  Tag,
  ChevronRight
} from 'lucide-react'

import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogData'

export default function BlogPostPage() {
  const { slug } = useParams()
  const pageRef = useRef(null)
  
  // Get the blog post by slug
  const post = getBlogPostBySlug(slug)
  
  // Get related posts
  const relatedPosts = getRelatedPosts(post, 3)
  
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Simple animations
    const initAnimations = () => {
      const ctx = gsap.context(() => {
        // Content animation
        gsap.from('.post-content > *', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        })
        
        // Related posts animation
        gsap.from('.related-post', {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.related-posts-section',
            start: "top 80%",
          }
        })
      }, pageRef)

      return () => ctx.revert() // Cleanup animations on unmount
    }

    if (post) {
      setTimeout(() => {
        initAnimations()
      }, 300)
    }
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-blue-100 mb-6">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Simplified background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 -z-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-blue-300">
            <Link href="/" className="hover:text-blue-100">Home</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/blog" className="hover:text-blue-100">Blog</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-blue-100 truncate max-w-xs">{post.title}</span>
          </div>
        </div>
        
        {/* Article header */}
        <header className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <span className="mx-3 text-blue-400">•</span>
              <span className="text-sm text-blue-300 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.date}
              </span>
              <span className="mx-3 text-blue-400">•</span>
              <span className="text-sm text-blue-300 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                {post.author.split(' ').map(name => name[0]).join('')}
              </div>
              <div>
                <span className="block text-white font-medium">{post.author}</span>
                <span className="text-blue-200 text-sm">{post.authorPosition}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Article content */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            <div 
              className="post-content prose prose-lg prose-invert max-w-none text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            
            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-blue-300 flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Tags:
                </span>
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/blog?tag=${tag}`}
                    className="text-sm bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full hover:bg-blue-500/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Social share */}
            <div className="mt-6 flex items-center">
              <span className="text-blue-300 mr-3 flex items-center">
                <Share2 className="w-4 h-4 mr-1" />
                Share:
              </span>
              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-500/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-500/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 hover:bg-blue-500/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 py-12 related-posts-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="related-post block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-colors"
                  >
                    <div className="p-5">
                      <span className="text-xs font-medium bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full mb-3 inline-block">
                        {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-blue-100 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <span className="text-xs text-blue-300 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Back to blog */}
        <div className="container mx-auto px-4 py-6 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  )
}