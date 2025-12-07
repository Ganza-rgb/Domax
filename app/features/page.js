'use client'

import { useEffect, useRef } from 'react'
import Navbar from '@/components/molecules/Navbar'
import GradientHeading from '@/components/atoms/GradientHeading'
import Card from '@/components/atoms/Card'
import Footer from '@/components/organisms/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturesPage() {
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Header animation
      if (headerRef.current) {
        const children = Array.from(headerRef.current.children)
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }
    }, 50)

    // Cards stagger animation
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll('[class*="Card"]'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
  const iconClasses = 'w-7 h-7 stroke-[1.6] text-white'
  const features = [
    {
      title: 'Automated Grading',
      description:
        'AI-powered scoring suggestions with rubric-based consistency. Save hours while maintaining grading quality.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path d="M12 5.25v13.5M6.75 12h10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M7 4.5h10a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 17V7A2.5 2.5 0 0 1 7 4.5Z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      ),
      meta: ['Auto QA gates', 'Manual overrides'],
    },
    {
      title: 'Rubric Editor',
      description:
        'Create and customize rubrics with weighted criteria. Reuse rubrics across assignments and courses.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 7h10M7 12h5M7 17h7M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      meta: ['Weighted criteria', 'Template library'],
    },
    {
      title: 'In-Document Annotations',
      description:
        'Rich inline comments, highlights, and feedback directly on papers. Students see exactly what needs improvement.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M8 21v-4h8v4M6 5.5 12 3l6 2.5V11a8 8 0 0 1-16 0V5.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      meta: ['Smart highlights', 'Comment presets'],
    },
    {
      title: 'Plagiarism Detection',
      description:
        'Integrated originality checks with match highlighting. Protect academic integrity with confidence.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m17.25 17.25 2.75 2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      meta: ['Cross-paper checks', 'Webhook alerts'],
    },
    {
      title: 'Analytics & Reports',
      description:
        'Class-wide performance metrics and grading efficiency reports. Make data-driven decisions about your teaching.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13.5V19M10 9v10M15 5v14M20 11v8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      meta: ['Drill-down cohorts', 'Export-ready'],
    },
    {
      title: 'LMS Integrations',
      description:
        'Seamless integration with Google Classroom, Canvas, Moodle, and more. Sync grades and assignments automatically.',
      icon: (
        <svg className={iconClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M8 7h8M8 12h3M8 17h6M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16 12h.01M16 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      meta: ['Two-way sync', 'Provisioning API'],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="container-custom">
          <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-16 px-4">
            <GradientHeading as="h1" className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" highlightText="educators">
              Powerful features for modern educators
            </GradientHeading>
            <p className="text-base sm:text-lg lg:text-xl text-text-muted max-w-3xl mx-auto">
              Everything you need to streamline grading, provide better feedback, and
              scale your teaching impact.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {features.map((feature, index) => (
              <Card key={feature.title} className="p-5 sm:p-6 lg:p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#005ffe] to-[#0041c2] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#005ffe]/25">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-text-muted mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.meta?.map((meta) => (
                    <span key={meta} className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-[#f0f4ff] text-[#0A3059]">
                      {meta}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

