// Update to tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9deff',
          300: '#7cc3ff',
          400: '#3aa0ff',
          500: '#1a81ff', // Primary brand color
          600: '#0062e3',
          700: '#004cb6',
          800: '#003f94',
          900: '#00357a',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#e4e9f2',
          200: '#cbd4e4',
          300: '#a8b9d1',
          400: '#8097bc',
          500: '#5d7aa9',
          600: '#495f8a',
          700: '#3a4b70',
          800: '#324060',
          900: '#2d3852',
        },
        accent: {
          50: '#fcf4e8',
          100: '#f9e6c7',
          200: '#f3cc8f',
          300: '#ecac4e',
          400: '#e69524',
          500: '#dd7d0e', // Accent color
          600: '#c05d0b',
          700: '#9c430d',
          800: '#7e3710',
          900: '#692e10',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      keyframes: {
        'data-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        // New animations
        'twinkle': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(0.8)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.2)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-15px) rotate(5deg)',
          },
        },
        'float-slow': {
          '0%': {
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-30px) translateX(20px) rotate(5deg)',
          },
          '100%': {
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
          },
        },
        'float-digit': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateY(-100px)',
            opacity: '0',
          },
        },
        'float-particle': {
          '0%': {
            transform: 'translateY(0) translateX(0)',
          },
          '50%': {
            transform: 'translateY(-20px) translateX(20px)',
          },
          '100%': {
            transform: 'translateY(20px) translateX(-20px)',
          },
        },
        'shooting-star': {
          '0%': {
            transform: 'translateX(0) translateY(0)',
            opacity: '1',
            width: '0px',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(300px) translateY(200px)',
            opacity: '0',
            width: '300px',
          },
        },
      },
      animation: {
        'data-flow': 'data-flow 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 15s ease-in-out infinite',
        'float-digit': 'float-digit 5s linear infinite',
        'float-particle': 'float-particle 10s ease-in-out infinite',
        'shooting-star': 'shooting-star 5s linear infinite',
      },
    },
  },
  plugins: [],
}