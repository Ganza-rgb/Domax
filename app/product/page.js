'use client'

import { useEffect, useRef } from 'react'
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
      name: 'Automated Grading Engine',
      description: 'AI-powered scoring suggestions with rubric-based consistency. Our machine learning models analyze student submissions and provide intelligent feedback at scale.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
        </svg>
      ),
      features: ['ML-powered scoring', 'Instant feedback', 'Consistency checks', 'Quality assurance'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'Rubric System',
      description: 'Create, customize, and apply rubrics with weighted criteria. Build reusable rubric templates that standardize grading across your institution.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      features: ['Weighted criteria', 'Template library', 'Custom scales', 'Reusable rubrics'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'In-Document Annotations',
      description: 'Provide inline comments, highlights, and suggestions directly on student papers. Rich formatting tools help deliver clear, actionable feedback.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16a1 1 0 001 1h8a1 1 0 001-1V4m0 0a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1m0 0h4a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1" />
        </svg>
      ),
      features: ['Comment threads', 'Color highlights', 'Suggestions', 'Drawing tools'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Comprehensive insights into class performance, submission metrics, and grading patterns. Track student progress and identify areas for intervention.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['Performance charts', 'Trend analysis', 'Grade distribution', 'Export reports'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'Batch Processing',
      description: 'Grade entire classes of submissions in one workflow. Bulk upload, grade, and distribute feedback efficiently with our streamlined batch interface.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ['Bulk uploads', 'Parallel grading', 'Batch publishing', 'Progress tracking'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'LMS Integrations',
      description: 'Seamless integration with Google Classroom, Canvas, Blackboard, and other LMS platforms. Sync assignments and grades automatically.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      features: ['Google Classroom', 'Canvas sync', 'Grade return', 'Auto-sync'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'Plagiarism Detection',
      description: 'Built-in plagiarism detection powered by Turnitin and Copyscape integrations. Identify originality issues and protect academic integrity.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      features: ['Originality scoring', 'Source matching', 'Detailed reports', 'Threshold alerts'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
    },
    {
      name: 'Student Code System',
      description: 'Generate unlimited access codes for students. Share one code for entire classes or personalized codes for individual students.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      features: ['Unlimited codes', 'Redeemable credits', 'Usage tracking', 'Bulk generation'],
      color: 'from-[#00cd90] to-[#2dd4bf]',
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
      <section ref={heroRef} className="pt-24 pb-16 bg-white text-[#0A3059] relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute -top-40 -right-20 w-[28rem] h-[28rem] bg-gradient-to-br from-[#e6fffb] to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#e6f0ff] to-transparent blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Powerful Grading Tools Built for Educators
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Everything you need to grade faster, provide better feedback, and scale your teaching. From automated scoring to comprehensive analytics.
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
            <h2 className="text-4xl font-bold text-[#0A3059] mb-4">
              Complete Feature Set
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All the tools you need to transform your grading workflow and provide meaningful feedback to students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                variant="elevated"
                className="p-6 hover:scale-105 transition-transform h-full flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-4 flex-shrink-0`}>
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A3059] mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-xs text-gray-600">
                      <svg
                        className="w-4 h-4 text-[#00cd90] mr-2 flex-shrink-0"
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section ref={valuePropsRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0A3059] mb-4">
              Why educators love Domax
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Practical tools that speed up grading, improve feedback, and keep students engaged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Save Hours Every Week',
                description:
                  'Automate repetitive scoring and apply rubrics consistently so you can spend more time teaching.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Better Student Feedback',
                description:
                  'Give inline, actionable comments and clear rubric-aligned explanations that help students improve.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h-2m0 0H8m4 0V6m0 4v4m-8-8a8 8 0 1116 0 8 8 0 01-16 0z" />
                  </svg>
                ),
              },
              {
                title: 'Consistent Grading at Scale',
                description:
                  'Reusable rubric templates and QA checks keep grading fair and comparable across classes and terms.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((prop, index) => (
              <Card key={index} variant="elevated" className="p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00cd90] to-[#2dd4bf] flex items-center justify-center text-white mx-auto mb-6">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A3059] mb-3">{prop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{prop.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          <div className="absolute top-10 -right-20 w-80 h-80 bg-gradient-to-br from-[#e6fffb] to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#e6f0ff] to-transparent blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to transform your grading?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Join thousands of educators who are saving time and improving student outcomes with Domax.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/signup">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


