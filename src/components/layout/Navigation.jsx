// src/components/layout/Navigation.js
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About Us', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation({ mobile = false, closeMobileMenu, className = '', itemClassName = '' }) {
  const pathname = usePathname()

  const renderNavItems = () => {
    return navItems.map((item) => {
      const isActive = pathname === item.path
      
      return (
        <li key={item.name} className={itemClassName}>
          {mobile ? (
            <Link 
              href={item.path}
              className={`block py-2 px-3 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-500 bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={closeMobileMenu}
            >
              {item.name}
            </Link>
          ) : (
            <Link 
              href={item.path}
              className="relative px-3 py-2 font-medium dark:text-gray-700 text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="navigation-underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-500 dark:bg-primary-400"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          )}
        </li>
      )
    })
  }

  return mobile ? (
    <ul className="space-y-1">
      {renderNavItems()}
      <li>
        <Link 
          href="/contact"
          className="block w-full mt-4 py-2 px-4 rounded-md text-center font-medium bg-primary-500 text-white hover:bg-primary-600"
          onClick={closeMobileMenu}
        >
          Get Started
        </Link>
      </li>
    </ul>
  ) : (
    <div className={className}>
      <ul className="flex space-x-4">
        {renderNavItems()}
      </ul>
      <Link 
        href="/contact"
        className="ml-6 btn-primary cta-button"
      >
        Get Started
      </Link>
    </div>
  )
}