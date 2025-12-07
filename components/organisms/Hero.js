'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const illustrationRef = useRef(null)
  const floatingElementsRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          ctaRef.current.children,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          statsRef.current.children,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          illustrationRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.2,
          })
        }
      })

      // Parallax effect on scroll
      gsap.to(illustrationRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#00cd90]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#005ffe]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content - Left Side */}
          <div className="lg:col-span-6 text-center lg:text-left">

            <h1 
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-4 sm:mb-6 leading-[1.1] tracking-tight"
            >
              Grade papers in{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] bg-clip-text text-transparent">
                  seconds
                </span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  viewBox="0 0 200 12" 
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M2 9C50 3 150 3 198 9" 
                    stroke="url(#underline-gradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00cd90" />
                      <stop offset="100%" stopColor="#2DD4BF" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              , not hours
            </h1>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              The AI-powered platform that automates grading, provides rich feedback, and gives you back your most valuable resource—time.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
              <Link
                href="/signup"
                className="group relative px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#00cd90]/30 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Free Trial
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00b080] to-[#20C4AB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href="/demo"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-[#0A3059] text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-[#005ffe] hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-1">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">Time Saved</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-1">4.9/5</div>
                <div className="text-xs sm:text-sm text-gray-600">User Rating</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-1">2M+</div>
                <div className="text-xs sm:text-sm text-gray-600">Papers Graded</div>
              </div>
            </div>
          </div>

          {/* Illustration - Right Side */}
          <div ref={illustrationRef} className="lg:col-span-6 relative">
            {/* Main illustration container */}
            <div className="relative">
              {/* Floating cards/papers */}
              <div 
                ref={el => floatingElementsRef.current[0] = el}
                className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-32 sm:w-40 lg:w-48 bg-white rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 transform -rotate-6 z-10"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0A3059]">Grade: A</span>
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-4/5" />
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-3/5" />
                </div>
              </div>

              <div 
                ref={el => floatingElementsRef.current[1] = el}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-28 sm:w-36 lg:w-44 bg-white rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 transform rotate-3 z-10"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#005ffe] to-[#0047cc] rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#0A3059]">Instant</span>
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-full" />
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-3/4" />
                </div>
              </div>

              <div 
                ref={el => floatingElementsRef.current[2] = el}
                className="absolute -top-2 -right-4 sm:-top-4 sm:-right-6 w-24 sm:w-32 lg:w-36 bg-white backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-3 border border-[#FF9F43]/20 transform rotate-6 z-10"
              >
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#FF9F43] mb-1">95%</div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
              </div>

              {/* Main dashboard illustration */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Dashboard header */}
                <div className="bg-gradient-to-r from-[#0A3059] to-[#005ffe] px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg backdrop-blur-sm" />
                      <div>
                        <div className="h-2 sm:h-3 bg-white/80 rounded w-20 sm:w-24 mb-1 sm:mb-1.5" />
                        <div className="h-1.5 sm:h-2 bg-white/60 rounded w-12 sm:w-16" />
                      </div>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  {/* Paper preview */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-3 bg-gray-300 rounded w-32" />
                      <div className="px-3 py-1 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] rounded-full">
                        <div className="h-2 w-12 bg-white rounded" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2.5 bg-gray-300 rounded w-full" />
                      <div className="h-2.5 bg-gray-300 rounded w-11/12" />
                      <div className="h-2.5 bg-gray-300 rounded w-4/5" />
                      <div className="h-2.5 bg-gray-200 rounded w-full" />
                      <div className="h-2.5 bg-gray-200 rounded w-10/12" />
                    </div>
                    
                    {/* Inline comment */}
                    <div className="mt-4 bg-white rounded-lg p-3 border-l-4 border-[#00cd90] shadow-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-[#00cd90] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-gray-300 rounded w-full" />
                          <div className="h-2 bg-gray-300 rounded w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scoring rubric */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Content', score: '95%', color: 'from-[#00cd90] to-[#2DD4BF]' },
                      { label: 'Grammar', score: '88%', color: 'from-[#005ffe] to-[#0047cc]' },
                      { label: 'Structure', score: '92%', color: 'from-[#FF9F43] to-[#FF8C43]' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                        <div className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#00cd90]/5 to-[#005ffe]/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}