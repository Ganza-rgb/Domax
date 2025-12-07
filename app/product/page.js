'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductPage() {
  const products = [
    {
      name: 'CDN',
      description: 'Lightning-fast global CDN that delivers content at the edge with sub-second latency across 82+ countries.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['Global edge network', 'DDoS protection', 'Free SSL', 'Real-time analytics'],
      href: '/product/cdn',
      color: 'from-[#ff7a18] to-[#ffb347]',
    },
    {
      name: 'Stream',
      description: 'A better way to deliver online video with adaptive bitrate streaming and global CDN.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h2M5 18v2a2 2 0 002 2h10a2 2 0 002-2v-2M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Adaptive streaming', 'Video optimization', 'Live streaming', 'Analytics'],
      href: '/product/stream',
      color: 'from-[#5c65ff] to-[#62d5ff]',
    },
    {
      name: 'Storage',
      description: 'The world\'s fastest cloud storage with global edge locations for instant file access.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      features: ['Global edge storage', 'Instant access', 'API integration', '99.99% uptime'],
      href: '/product/storage',
      color: 'from-[#ff7a18] to-[#ff9a62]',
    },
    {
      name: 'Optimizer',
      description: 'Powerful image processing and optimization that reduces file sizes without quality loss.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      features: ['Auto optimization', 'WebP conversion', 'Lazy loading', 'Responsive images'],
      href: '/product/optimizer',
      color: 'from-[#5c65ff] to-[#62d5ff]',
    },
    {
      name: 'DNS',
      description: 'Next-generation DNS routing with global anycast network for ultra-fast resolution.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['Global anycast', 'DDoS protection', 'Fast resolution', 'Easy management'],
      href: '/product/dns',
      color: 'from-[#ff7a18] to-[#ffb347]',
    },
    {
      name: 'Magic Container',
      description: 'The best way to deploy globally with containers that run at the edge.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10l8-4m-8 4L4 7m8 4L20 7" />
        </svg>
      ),
      features: ['Edge containers', 'Auto scaling', 'Zero cold starts', 'Global deployment'],
      href: '/product/magic-container',
      color: 'from-[#5c65ff] to-[#62d5ff]',
    },
    {
      name: 'Edge Scripting',
      description: 'Deploy and run applications at the edge with serverless functions that scale automatically.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ['Serverless functions', 'Edge compute', 'Auto scaling', 'Low latency'],
      href: '/product/edge-scripting',
      color: 'from-[#ff7a18] to-[#ff9a62]',
    },
    {
      name: 'Shield',
      description: 'Security simplified with enterprise-grade DDoS protection and WAF.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['DDoS protection', 'WAF rules', 'Bot protection', 'Real-time monitoring'],
      href: '/product/shield',
      color: 'from-[#5c65ff] to-[#62d5ff]',
    },
    {
      name: 'Font',
      description: 'First privacy-oriented font CDN with zero tracking and GDPR compliance.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      features: ['Privacy-first', 'Zero tracking', 'Fast delivery', 'GDPR compliant'],
      href: '/product/font',
      color: 'from-[#ff7a18] to-[#ffb347]',
    },
  ]

  const heroRef = useRef(null)
  const productsRef = useRef(null)
  const valuePropsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Hero animation
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('div > div')
        if (heroContent) {
          const children = Array.from(heroContent.children)
          gsap.fromTo(children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          )
        }
      }
    }, 50)

    // Products grid animation
    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current.querySelectorAll('[class*="Card"]'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Value props animation
    if (valuePropsRef.current) {
      gsap.fromTo(
        valuePropsRef.current.querySelectorAll('[class*="Card"]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuePropsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.querySelector('div > div').children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-[#04081d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 -right-10 w-96 h-96 bg-gradient-to-br from-[#ffb347] to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#5c65ff] to-transparent blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Everything you need to hop ahead
            </h1>
            <p className="text-xl text-white/80 mb-10">
              A unified platform that brings together CDN, security, and compute into one powerful edge platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/signup">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" href="/pricing">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={productsRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#04081d] mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the tools you need to build faster, scale easier, and deliver better experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                variant="elevated"
                className="p-8 hover:scale-105 transition-transform"
              >
                <Link href={product.href} className="block">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-6`}>
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#04081d] mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[#ff7a18] mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-[#ff7a18] font-semibold group">
                    Learn more
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section ref={valuePropsRef} className="py-20 bg-[#eff3ff]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unified Platform',
                description: 'One platform for CDN, security, and compute. No glue code, no complexity.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Global Edge Network',
                description: '120+ edge locations across 6 continents for unmatched performance.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Simple Pricing',
                description: 'Transparent pricing starting at $1/month with no hidden fees.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((prop, index) => (
              <Card key={index} variant="elevated" className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff7a18] to-[#ffb347] flex items-center justify-center text-white mx-auto mb-6">
                  {prop.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#04081d] mb-4">
                  {prop.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {prop.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-[#04081d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-0 w-80 h-80 bg-gradient-to-br from-[#ff9a62] to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-gradient-to-tr from-[#6a76ff] to-transparent blur-[160px]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Join thousands of teams who deploy faster, save more, and deliver better experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/signup">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


