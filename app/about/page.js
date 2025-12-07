'use client'

import { useEffect, useRef } from 'react'
import Navbar from '@/components/molecules/Navbar'
import GradientHeading from '@/components/atoms/GradientHeading'
import Footer from '@/components/organisms/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const impactStats = [
  { label: 'Papers graded', value: '2.1M+', detail: 'Across 14 education boards' },
  { label: 'Latency per script', value: '6 min', detail: 'Avg time to deliver annotated feedback' },
  { label: 'Educators onboarded', value: '10,800+', detail: 'Teachers, faculties & examiners' },
  { label: 'Accuracy commitment', value: '99%', detail: 'AI + human blended scoring confidence' },
]

const operatingPrinciples = [
  {
    title: 'Outcome-first design',
    description:
      'We co-create with classroom teachers so every surface mirrors a real workflow, not a hypothetical product brief.',
  },
  {
    title: 'Transparent automation',
    description:
      'Educators stay in the loop with explainable AI, detailed audit history, and the ability to override anything in seconds.',
  },
  {
    title: 'Security by default',
    description:
      'From role-based access controls to regional data residency, Domax treats exam content like the critical IP it is.',
  },
]

const milestones = [
  {
    year: '2021',
    title: 'Research sprint',
    detail: 'Partnered with 40 teachers to catalogue grading pain points across Rwanda & Nigeria.',
  },
  {
    year: '2022',
    title: 'Domax Beta',
    detail: 'Launched AI-assisted grading with rubric syncing and instant annotation playback.',
  },
  {
    year: '2023',
    title: 'Enterprise rollout',
    detail: 'National exam councils adopted Domax wallets, unlocking million-script seasons.',
  },
  {
    year: '2024',
    title: 'Autopilot entitlements',
    detail: 'Introduced billing + access controls unified with past-paper libraries.',
  },
]

export default function AboutPage() {
  const containerRef = useRef(null)
  const sectionsRef = useRef(null)

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Page entrance animation
      if (containerRef.current) {
        const children = Array.from(containerRef.current.children)
        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        )
      }
    }, 50)

    // Sections scroll animation
    if (sectionsRef.current) {
      const sections = sectionsRef.current.querySelectorAll('section')
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#0A3059]">
      <Navbar />
      <main ref={containerRef} className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20 lg:pb-24">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" highlightText="Domax">
              About Domax
            </GradientHeading>
            <p className="text-base sm:text-lg lg:text-xl text-text-muted mb-8 sm:mb-12">
              We're on a mission to transform how educators grade and provide feedback to students.
            </p>

            <div ref={sectionsRef} className="prose prose-lg max-w-none">
              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Mission</h2>
                <p className="text-sm sm:text-base text-text-muted mb-3 sm:mb-4">
                  Domax was founded with a simple goal: help educators spend less time on administrative tasks and more
                  time on what matters most—teaching and mentoring students.
                </p>
                <p className="text-sm sm:text-base text-text-muted">
                  We believe that automated grading tools should enhance, not replace, the human connection between
                  teachers and students. Our platform provides powerful automation while ensuring educators remain in
                  control of the grading process.
                </p>
              </section>

              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Values</h2>
                <ul className="space-y-3 text-text-muted">
                  <li className="flex items-start">
                    <span className="text-brand-success-start mr-2">✓</span>
                    <span>
                      <strong>Educator-First:</strong> Every feature is designed with real teacher workflows in mind.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-success-start mr-2">✓</span>
                    <span>
                      <strong>Privacy & Security:</strong> Student data is protected with enterprise-grade security and
                      GDPR compliance.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-success-start mr-2">✓</span>
                    <span>
                      <strong>Accessibility:</strong> Our platform is designed to be usable by everyone, regardless of
                      ability.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-success-start mr-2">✓</span>
                    <span>
                      <strong>Continuous Improvement:</strong> We listen to our users and iterate based on real feedback.
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Join Us</h2>
                <p className="text-sm sm:text-base text-text-muted mb-4 sm:mb-6">
                  We're always looking for talented people who share our passion for education technology.
                </p>
                <a
                  href="/careers"
                  className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-brand-primary-blue text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                >
                  View Open Positions
                </a>
              </section>
            </div>
          </div>
        </div>

        <div className="container-custom px-4 mt-16 space-y-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-[#e0e4ff] bg-gradient-to-b from-white to-[#f8fbff] p-5 shadow-[0_25px_65px_-40px_rgba(10,48,89,0.5)]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#005ffe]/70 mb-2">{stat.label}</p>
                <p className="text-3xl font-semibold mb-1">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-[32px] border border-[#e0e4ff] p-6 bg-gradient-to-b from-white to-[#f8fbff] shadow-[0_30px_90px_-60px_rgba(0,95,254,0.8)]">
              <h3 className="text-2xl font-semibold mb-4">How we operate</h3>
              <p className="text-text-muted mb-6">
                Domax squads pair product strategists with practising educators, so every shipping cycle is grounded in
                real classrooms.
              </p>
              <div className="space-y-4">
                {operatingPrinciples.map((principle) => (
                  <div key={principle.title}>
                    <p className="text-sm font-semibold tracking-[0.2em] text-[#005ffe] uppercase mb-1">
                      {principle.title}
                    </p>
                    <p className="text-sm text-text-muted">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#dfe7f5] p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-4">Milestones</h3>
              <div className="space-y-5">
                {milestones.map((milestone, idx) => (
                  <div key={milestone.year} className="flex gap-4">
                    <div className="text-[#005ffe] font-semibold">{milestone.year}</div>
                    <div>
                      <p className="text-lg font-semibold">{milestone.title}</p>
                      <p className="text-sm text-text-muted">{milestone.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

