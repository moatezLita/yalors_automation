import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize reveal animations for elements
 * @param {string} selector - CSS selector for elements to animate
 * @param {Object} options - Animation options
 */
export const initRevealAnimations = (selector = '.reveal-animation', options = {}) => {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.2,
  };

  const mergedOptions = { ...defaults, ...options };

  return gsap.from(selector, {
    y: mergedOptions.y,
    opacity: mergedOptions.opacity,
    duration: mergedOptions.duration,
    stagger: mergedOptions.stagger,
    ease: mergedOptions.ease,
    delay: mergedOptions.delay,
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Text typing animation
 * @param {string} selector - Target element selector
 * @param {string[]} textArray - Array of texts to animate
 * @param {Object} options - Animation options
 */
export const createTypingAnimation = (selector, textArray, options = {}) => {
  const defaults = {
    typeSpeed: 50,
    deleteSpeed: 30,
    delayBetweenTexts: 2000,
    loop: true,
  };

  const settings = { ...defaults, ...options };
  const element = document.querySelector(selector);
  
  if (!element) return;
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timer;

  function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      timer = setTimeout(type, settings.delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      timer = setTimeout(type, 500);
    } else {
      timer = setTimeout(
        type, 
        isDeleting ? settings.deleteSpeed : settings.typeSpeed
      );
    }
  }

  // Start the typing animation
  timer = setTimeout(type, 1000);
  
  // Return cleanup function
  return () => clearTimeout(timer);
};

/**
 * Create a data flow animation
 * @param {string} containerId - Container element ID
 * @param {number} lineCount - Number of data lines to create
 */
export const createDataFlowAnimation = (containerId, lineCount = 10) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear previous lines
  const existingLines = container.querySelectorAll('.data-line');
  existingLines.forEach(line => line.remove());
  
  // Create new lines
  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'data-line';
    
    // Randomize position, delay and duration
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 5 + Math.random() * 5;
    
    line.style.left = `${posX}%`;
    line.style.animationDelay = `${delay}s`;
    line.style.animationDuration = `${duration}s`;
    
    container.appendChild(line);
  }
};

/**
 * Create a smooth scroll animation
 * @param {string} targetId - Target element ID to scroll to
 */
export const smoothScroll = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: 50
    },
    ease: 'power2.inOut'
  });
};

/**
 * Initialize parallax effect for elements
 * @param {string} selector - CSS selector for elements
 * @param {number} intensity - Parallax intensity (1-10)
 */
export const initParallax = (selector, intensity = 3) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const yPos = -self.progress * intensity * 100;
        gsap.to(el, {
          y: yPos,
          ease: 'none',
          overwrite: 'auto'
        });
      }
    });
  });
};