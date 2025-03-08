// src/app/page.js
"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import Technologies from '@/components/home/Technologies'
import Testimonials from '@/components/home/Testimonials'
import CtaSection from '@/components/home/CtaSection'

export default function Home() {
  const pageRef = useRef(null)
  const skyRef = useRef(null)
  const starsRef = useRef(null)
  const moonRef = useRef(null)
  const sunRef = useRef(null)
  const weatherEnabled = useRef(false)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Create stars dynamically with improved celestial effects
    const createStars = () => {
      if (!starsRef.current) return

      // Clear existing stars
      starsRef.current.innerHTML = ''

      // Create stars based on screen size - increased density
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 800)

      // Create star clusters and distributions
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div')

        // Variable star sizes with some larger stars
        const isLargeStar = Math.random() < 0.05
        const size = isLargeStar ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5

        // Randomize star colors (white, blue-ish, yellow-ish)
        const colorRoll = Math.random()
        let starColor = '#FFFFFF' // Default white

        if (isLargeStar) {
          if (colorRoll < 0.3) {
            starColor = '#FFF4E0' // Warm yellow star
          } else if (colorRoll < 0.6) {
            starColor = '#E0F4FF' // Blue-ish star
          }
        }

        // Set star properties
        star.className = 'absolute rounded-full'
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.backgroundColor = starColor
        star.style.top = `${Math.random() * 100}%`
        star.style.left = `${Math.random() * 100}%`
        star.style.opacity = 0

        // Larger stars get glow effects
        if (isLargeStar) {
          star.style.boxShadow = `0 0 ${size * 2}px ${size / 2}px ${starColor}`
        }

        // Add shimmer animation with random duration
        gsap.to(star, {
          opacity: Math.random() * 0.6 + 0.4,
          duration: isLargeStar ? 2 : 1,
          delay: Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          repeatDelay: Math.random() * 4
        })

        starsRef.current.appendChild(star)
      }

      // Create nebulas (colorful cloudy areas)
      const numNebulas = 3;
      for (let i = 0; i < numNebulas; i++) {
        const nebula = document.createElement('div')
        const width = 150 + Math.random() * 200
        const height = 150 + Math.random() * 200

        // Generate random colors for nebulas
        const hue = Math.floor(Math.random() * 360)
        const nebulaColor = `hsla(${hue}, 70%, 60%, 0.06)`

        nebula.className = 'absolute rounded-full'
        nebula.style.width = `${width}px`
        nebula.style.height = `${height}px`
        nebula.style.top = `${Math.random() * 80}%`
        nebula.style.left = `${Math.random() * 80}%`
        nebula.style.background = nebulaColor
        nebula.style.filter = 'blur(30px)'
        nebula.style.transform = `rotate(${Math.random() * 360}deg)`
        nebula.style.opacity = 0

        // Animate nebula
        gsap.to(nebula, {
          opacity: 0.6,
          duration: 1,
          delay: 0.5,
        })

        // Gentle pulsing
        gsap.to(nebula, {
          scale: 1.1,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        starsRef.current.appendChild(nebula)
      }

      // Create more visible shooting stars
      for (let i = 0; i < 8; i++) {
        const shootingStar = document.createElement('div')
        shootingStar.className = 'absolute w-0.5 h-0.5 bg-white rounded-full'
        shootingStar.style.top = `${Math.random() * 70}%`
        shootingStar.style.left = '0%'
        shootingStar.style.opacity = 0

        // Create better trail
        shootingStar.style.boxShadow = '0 0 6px 2px rgba(255, 255, 255, 0.8), 0 0 12px 6px rgba(255, 255, 255, 0.3)'

        // Animate shooting star with more frequent appearances
        gsap.to(shootingStar, {
          left: '100%',
          top: `+=${Math.random() * 20 - 10}%`,
          opacity: 1,
          width: '150px',
          duration: 2 + Math.random() * 3,
          delay: 3 + Math.random() * 10,
          repeat: -1,
          repeatDelay: 6 + Math.random() * 15, // More frequent shooting stars
          ease: "power2.in",
          onRepeat: () => {
            shootingStar.style.top = `${Math.random() * 70}%`
          }
        })

        starsRef.current.appendChild(shootingStar)
      }
    }

    // Weather & Aurora Effects System
    const setupWeatherSystem = () => {
      let currentWeather = 'clear';

      // Create northern lights/aurora effect
      const createAuroraEffect = () => {
        const auroraContainer = document.getElementById('aurora-container');
        if (!auroraContainer) return;

        // Create aurora layers with different colors and opacities
        const colors = [
          'rgba(16, 185, 129, 0.1)',  // Teal
          'rgba(139, 92, 246, 0.1)',  // Purple
          'rgba(6, 182, 212, 0.08)',  // Cyan
        ];

        // Clear previous auroras if any
        auroraContainer.innerHTML = '';

        // Create layers
        colors.forEach((color, i) => {
          const auroraLayer = document.createElement('div');
          auroraLayer.className = 'absolute inset-x-0 top-0 h-[30vh] origin-bottom';
          auroraLayer.style.background = `linear-gradient(to bottom, transparent, ${color}, transparent)`;
          auroraLayer.style.transform = 'translateY(-100%)';
          auroraLayer.style.filter = 'blur(20px)';
          auroraLayer.style.opacity = '0';

          auroraContainer.appendChild(auroraLayer);

          // Animate layer in
          gsap.to(auroraLayer, {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: i * 0.5,
          });

          // Continuous wave animation
          const waveAnimation = () => {
            gsap.to(auroraLayer, {
              scaleY: 1 + Math.random() * 0.3,
              duration: 5 + Math.random() * 5,
              ease: "sine.inOut",
              onComplete: () => {
                gsap.to(auroraLayer, {
                  scaleY: 1,
                  duration: 5 + Math.random() * 5,
                  ease: "sine.inOut",
                  onComplete: waveAnimation
                });
              }
            });

            // Horizontal movement
            gsap.to(auroraLayer, {
              x: -50 + Math.random() * 100,
              duration: 15 + Math.random() * 10,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          };

          waveAnimation();
        });
      };

      // Function to create rain
      const createRainEffect = () => {
        if (currentWeather === 'rain') return;

        currentWeather = 'rain';
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        weatherContainer.innerHTML = '';

        // Create raindrops
        for (let i = 0; i < 150; i++) {
          const raindrop = document.createElement('div');
          raindrop.className = 'absolute bg-blue-300/40 rounded-full';

          // Random sizes for raindrops
          const width = Math.random() * 1 + 0.5;
          const height = Math.random() * 6 + 4;

          raindrop.style.width = `${width}px`;
          raindrop.style.height = `${height}px`;
          raindrop.style.left = `${Math.random() * 100}%`;
          raindrop.style.top = `-${height}px`;
          raindrop.style.opacity = '0.7';

          // Animate raindrops
          gsap.to(raindrop, {
            y: '100vh',
            duration: 0.8 + Math.random() * 0.6,
            repeat: -1,
            delay: Math.random() * 2,
            ease: 'none'
          });

          weatherContainer.appendChild(raindrop);
        }

        gsap.to(weatherContainer, { opacity: 1, duration: 1 });

        // Add distant thunder effect
        const createThunder = () => {
          if (currentWeather !== 'rain') return;

          const thunder = document.createElement('div');
          thunder.className = 'fixed inset-0 bg-white';
          thunder.style.opacity = '0';
          thunder.style.zIndex = '5';
          thunder.style.pointerEvents = 'none';

          weatherContainer.appendChild(thunder);

          // Flash effect
          gsap.to(thunder, {
            opacity: Math.random() * 0.2 + 0.05,
            duration: 0.1,
            onComplete: () => {
              gsap.to(thunder, {
                opacity: 0,
                duration: 0.1,
                delay: 0.1,
                onComplete: () => {
                  // Sometimes double flash
                  if (Math.random() > 0.6) {
                    gsap.to(thunder, {
                      opacity: Math.random() * 0.1 + 0.02,
                      duration: 0.1,
                      delay: 0.1,
                      onComplete: () => {
                        gsap.to(thunder, {
                          opacity: 0,
                          duration: 0.2,
                          onComplete: () => {
                            thunder.remove();
                          }
                        });
                      }
                    });
                  } else {
                    thunder.remove();
                  }
                }
              });
            }
          });

          // Schedule next thunder
          if (currentWeather === 'rain') {
            setTimeout(createThunder, 5000 + Math.random() * 20000);
          }
        };

        // Start thunder after a delay
        setTimeout(createThunder, 3000 + Math.random() * 5000);
      };

      // Function to create snow
      const createSnowEffect = () => {
        if (currentWeather === 'snow') return;

        currentWeather = 'snow';
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        weatherContainer.innerHTML = '';

        // Create snowflakes
        for (let i = 0; i < 100; i++) {
          const snowflake = document.createElement('div');
          snowflake.className = 'absolute bg-white rounded-full';

          // Random sizes for snowflakes
          const size = Math.random() * 3 + 2;

          snowflake.style.width = `${size}px`;
          snowflake.style.height = `${size}px`;
          snowflake.style.left = `${Math.random() * 100}%`;
          snowflake.style.top = `-${size}px`;
          snowflake.style.opacity = '0.8';
          snowflake.style.filter = 'blur(0.3px)';

          // Animate snowflakes with swaying motion
          gsap.to(snowflake, {
            y: '100vh',
            x: `+=${Math.random() * 100 - 50}`,
            rotation: Math.random() * 360,
            duration: 5 + Math.random() * 5,
            repeat: -1,
            delay: Math.random() * 3,
            ease: 'none'
          });

          weatherContainer.appendChild(snowflake);
        }

        gsap.to(weatherContainer, { opacity: 1, duration: 1 });
      };

      // Function to clear weather
      const clearWeather = () => {
        if (currentWeather === 'clear') return;

        currentWeather = 'clear';
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        gsap.to(weatherContainer, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            weatherContainer.innerHTML = '';
          }
        });
      };

      // Random weather changes
      const changeWeatherRandomly = () => {
        if (!weatherEnabled.current) return;

        // Weighted random selection favoring rain in Tunisia (very rare snow)
        const random = Math.random();
        if (random < 0.35) {
          clearWeather(); // 30% chance of clear weather
        } else if (random < 0.70) {
          createRainEffect(); // 35% chance of rain
        } else {
          createSnowEffect(); // 30% chance of snow (rare in Tunisia!)
        }

        // Schedule next weather change
        setTimeout(changeWeatherRandomly, 20000 + Math.random() * 40000); // Change every 20-60 seconds
      };

      // Enable aurora effect
      const enableAurora = () => {
        const auroraContainer = document.getElementById('aurora-container');
        if (!auroraContainer) return;

        gsap.to(auroraContainer, {
          opacity: 1,
          duration: 1,
          onComplete: createAuroraEffect
        });
      };

      // Disable aurora effect
      const disableAurora = () => {
        const auroraContainer = document.getElementById('aurora-container');
        if (!auroraContainer) return;

        gsap.to(auroraContainer, {
          opacity: 0,
          duration: 1
        });
      };

      // Make weather controls globally accessible
      window.weatherControls = {
        rain: createRainEffect,
        snow: createSnowEffect,
        clear: clearWeather,
        aurora: {
          enable: enableAurora,
          disable: disableAurora
        },
        auto: {
          enable: () => {
            weatherEnabled.current = true;
            changeWeatherRandomly();
          },
          disable: () => {
            weatherEnabled.current = false;
            clearWeather();
          }
        }
      };

      // Setup scroll triggers for weather
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: "40% top", // After night starts
        end: "60% center",
        onEnter: () => {
          weatherEnabled.current = true;
          enableAurora();
          setTimeout(changeWeatherRandomly, 5000);
        },
        onLeaveBack: () => {
          weatherEnabled.current = false;
          disableAurora();
          clearWeather();
        }
      });
    };

    // Initialize page-wide animations
    const initAnimations = () => {
      // Log to confirm animations are running
      console.log('Initializing animations')

      const ctx = gsap.context(() => {
        // Create day-night cycle effect
        const skyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "50% bottom", // Make transition happen over a longer scroll distance
            scrub: 1, // Slower scrubbing for more gradual change
          }
        })

        // Sky color transitions with sunset effect
        skyTimeline.to(skyRef.current, {
          background: "linear-gradient(to bottom, #FF8C42, #FDB87D, #F4B9B8)", // Sunset colors
          duration: 0.3,
          ease: "power1.in"
        })

        // Then transition to night
        skyTimeline.to(skyRef.current, {
          background: "linear-gradient(to bottom, #090c1d, #171933)", // Deep night colors
          duration: 0.7,
          ease: "power1.out"
        })

        // Stars visibility - fade in during sunset
        skyTimeline.to('.stars-container', {
          opacity: 1,
          ease: "power2.in"
        }, "<0.3")

        // Sun animation (move down, change color and fade out)
        skyTimeline.to(sunRef.current, {
          y: '15vh',
          backgroundColor: "#FF5E3A", // Deeper sunset orange
          boxShadow: "0 0 100px 30px rgba(255,94,58,0.8)",
          scale: 1.2,
          duration: 0.3,
          ease: "power1.in"
        }, "<0")

        // Complete sun set
        skyTimeline.to(sunRef.current, {
          y: '30vh',
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, ">")

        // Moon animation (rise up with glow effect)
        skyTimeline.fromTo(moonRef.current,
          { y: '30vh', opacity: 0, scale: 0.7 },
          { y: '-5vh', opacity: 1, scale: 1, boxShadow: "0 0 50px 15px rgba(255,255,255,0.4)", ease: "power2.out", duration: 0.5 },
          "<0.2"
        )

        // Add constellation patterns to stars
        const addConstellations = () => {
          const constellationPatterns = [
            // Big Dipper-like pattern
            [
              { x: 20, y: 30 }, { x: 25, y: 32 }, { x: 30, y: 35 },
              { x: 35, y: 37 }, { x: 40, y: 34 }, { x: 45, y: 30 },
              { x: 50, y: 25 }
            ],
            // Orion-like pattern
            [
              { x: 65, y: 20 }, { x: 70, y: 15 }, { x: 75, y: 10 },
              { x: 70, y: 25 }, { x: 70, y: 35 },
              { x: 65, y: 30 }, { x: 75, y: 30 }
            ],
            // Cassiopeia-like W pattern
            [
              { x: 80, y: 60 }, { x: 85, y: 55 }, { x: 90, y: 60 },
              { x: 95, y: 55 }, { x: 100, y: 60 }
            ]
          ];

          // Create brighter stars for constellations
          constellationPatterns.forEach(pattern => {
            // Create constellation stars
            pattern.forEach(point => {
              const star = document.createElement('div');
              star.className = 'absolute rounded-full';
              star.style.width = '3px';
              star.style.height = '3px';
              star.style.backgroundColor = '#FFFFFF';
              star.style.boxShadow = '0 0 6px 2px rgba(255, 255, 255, 0.8)';
              star.style.top = `${point.y}%`;
              star.style.left = `${point.x}%`;
              star.style.opacity = '0';

              // Make constellation stars appear with the night sky
              gsap.to(star, {
                opacity: 0.9,
                duration: 1,
                delay: 0.5
              });

              starsRef.current.appendChild(star);
            });

            // Draw constellation lines
            for (let i = 0; i < pattern.length - 1; i++) {
              const line = document.createElement('div');
              const startPoint = pattern[i];
              const endPoint = pattern[i + 1];

              // Calculate line properties
              const length = Math.sqrt(
                Math.pow(endPoint.x - startPoint.x, 2) +
                Math.pow(endPoint.y - startPoint.y, 2)
              );

              const angle = Math.atan2(
                endPoint.y - startPoint.y,
                endPoint.x - startPoint.x
              ) * (180 / Math.PI);

              // Style the line
              line.className = 'absolute bg-white/10 origin-left';
              line.style.height = '1px';
              line.style.width = `${length}%`;
              line.style.top = `${startPoint.y}%`;
              line.style.left = `${startPoint.x}%`;
              line.style.transform = `rotate(${angle}deg)`;
              line.style.opacity = '0';

              // Animate line appearance
              gsap.to(line, {
                opacity: 0.3,
                duration: 1.5,
                delay: 1
              });

              starsRef.current.appendChild(line);
            }
          });
        };

        // Call constellation function when stars are created
        skyTimeline.add(() => {
          setTimeout(addConstellations, 500);
        }, 0.5);

        // Clouds animation
        const clouds = document.querySelectorAll('.cloud')
        clouds.forEach((cloud, i) => {
          gsap.to(cloud, {
            x: i % 2 === 0 ? '-100vw' : '100vw',
            opacity: 0,
            scrollTrigger: {
              trigger: pageRef.current,
              start: "top top",
              end: "30% top",
              scrub: 2
            }
          })
        })

        // Smooth scroll to sections
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            const target = document.querySelector(targetId)
            if (target) {
              gsap.to(window, {
                duration: 1,
                scrollTo: {
                  y: target,
                  offsetY: 80
                },
                ease: 'power2.inOut'
              })
            }
          })
        })
      }, pageRef)

      // Initialize weather system
      setupWeatherSystem();

      return () => ctx.revert() // Cleanup animations on unmount
    }

    createStars()
    window.addEventListener('resize', createStars)

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const animations = initAnimations()
    }, 500)

    return () => {
      window.removeEventListener('resize', createStars)
    }
  }, [])

  return (
    <div ref={pageRef} className="relative min-h-[600vh] overflow-hidden">
      {/* Sky background with day-night transition */}
      <div
        ref={skyRef}
        className="fixed inset-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-700 -z-20"
      >
        {/* Improved Sun with rays */}
        <div
          ref={sunRef}
          className="absolute top-10 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_0_80px_30px_rgba(255,204,0,0.8)] -z-10"
        >
          {/* Sun rays */}
          <div className="absolute inset-0 w-full h-full animate-spin-slow">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-16 bg-yellow-300/50 rounded-full origin-top"
                style={{ transform: `translate(-50%, 0) rotate(${i * 30}deg)` }}
              ></div>
            ))}
          </div>
          {/* Sun core glow */}
          <div className="absolute inset-0 rounded-full bg-white/30 w-1/3 h-1/3 top-1/3 left-1/3"></div>
        </div>

        {/* Improved Moon with detailed craters and glow */}
        <div
          ref={moonRef}
          className="absolute top-20 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-[0_0_40px_15px_rgba(255,255,255,0.4)] opacity-0 -z-10 overflow-hidden"
        >
          {/* Moon texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_10%_20%,rgba(100,100,100,0.8)_0%,transparent_60%)]"></div>

          {/* Moon craters - more realistic with shadows */}
          <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gray-200 border-t border-l border-white/20 shadow-inner"></div>
          <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-gray-300 border-t border-l border-white/20 shadow-inner"></div>
          <div className="absolute top-4 left-12 w-2 h-2 rounded-full bg-gray-300 border-t border-l border-white/20 shadow-inner"></div>
          <div className="absolute top-12 left-3 w-3 h-3 rounded-full bg-gray-300 border-t border-l border-white/20 shadow-inner"></div>
          <div className="absolute top-12 left-7 w-1.5 h-1.5 rounded-full bg-gray-200 border-t border-l border-white/20 shadow-inner"></div>
          <div className="absolute top-6 left-7 w-2.5 h-2.5 rounded-full bg-gray-300 border-t border-l border-white/20 shadow-inner"></div>
        </div>

        {/* Clouds */}
        <div className="cloud absolute top-[10%] left-[10%] w-40 h-16 bg-white rounded-full before:content-[''] before:absolute before:top-[-40%] before:left-[25%] before:w-[60%] before:h-[140%] before:bg-white before:rounded-full after:content-[''] after:absolute after:top-[-60%] after:left-[40%] after:w-[50%] after:h-[180%] after:bg-white after:rounded-full"></div>

        <div className="cloud absolute top-[15%] right-[15%] w-32 h-12 bg-white rounded-full before:content-[''] before:absolute before:top-[-40%] before:left-[25%] before:w-[60%] before:h-[140%] before:bg-white before:rounded-full after:content-[''] after:absolute after:top-[-60%] after:left-[40%] after:w-[50%] after:h-[180%] after:bg-white after:rounded-full"></div>

        <div className="cloud absolute top-[25%] left-[30%] w-36 h-14 bg-white rounded-full before:content-[''] before:absolute before:top-[-40%] before:left-[25%] before:w-[60%] before:h-[140%] before:bg-white before:rounded-full after:content-[''] after:absolute after:top-[-60%] after:left-[40%] after:w-[50%] after:h-[180%] after:bg-white after:rounded-full"></div>
      </div>

      {/* Stars container (initially invisible) */}
      <div
        ref={starsRef}
        className="stars-container fixed inset-0 opacity-0 -z-15 pointer-events-none"
      />

      {/* Northern Lights / Aurora container */}
      <div className="fixed inset-0 pointer-events-none -z-18 opacity-0 transition-opacity duration-1000" id="aurora-container">
        {/* Aurora layers will be added by JS */}
      </div>

      {/* Weather effects container */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-0 transition-opacity duration-1000" id="weather-container">
        {/* Weather elements will be added by JS */}
      </div>

      {/* Content sections - Make sure these have transparent backgrounds */}
      <div className="relative z-10"> {/* Wrap content in relative container with higher z-index */}
        <HeroSection />
        <ServicesOverview />
        <Technologies />
        {/* <Testimonials /> */}
        <CtaSection />
      </div>

      {/* Add subtle floating particles that gradually increase as you scroll */}
      <div className="fixed inset-0 pointer-events-none -z-18">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const delay = Math.random() * 5;
          const duration = 15 + Math.random() * 20;

          return (
            <div
              key={i}
              className="particle absolute rounded-full bg-white/10"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: '100%',
                opacity: 0,
                filter: 'blur(1px)',
                transform: `translateY(0)`,
                animation: `float-particle ${duration}s infinite ease-in-out ${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        
        @keyframes spin-slow {
          0% { transform: translate(-50%, 0) rotate(0deg); }
          100% { transform: translate(-50%, 0) rotate(360deg); }
        }
        
        @keyframes float-star {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}