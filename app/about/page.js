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
      {/* GSAP fades in the two direct children of <main> and each <section>
          inside the story column — keep that structure. */}
      <main ref={containerRef} className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl mb-5" highlightText="Domax">
              About Domax
            </GradientHeading>
            <p className="lede mb-12 pb-12 border-b border-line">
              We're on a mission to transform how educators grade and provide feedback to students.
            </p>

            <div ref={sectionsRef} className="prose max-w-none">
              <section className="mb-12">
                <h2>Our Mission</h2>
                <p>
                  Domax was founded with a simple goal: help educators spend less time on administrative tasks and more
                  time on what matters most—teaching and mentoring students.
                </p>
                <p>
                  We believe that automated grading tools should enhance, not replace, the human connection between
                  teachers and students. Our platform provides powerful automation while ensuring educators remain in
                  control of the grading process.
                </p>
              </section>

              <section className="mb-12">
                <h2>Our Values</h2>
                <ul className="!list-none !pl-0 space-y-3">
                  <li className="flex items-start !pl-0">
                    <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#007A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>
                      <strong>Educator-First:</strong> Every feature is designed with real teacher workflows in mind.
                    </span>
                  </li>
                  <li className="flex items-start !pl-0">
                    <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#007A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>
                      <strong>Privacy & Security:</strong> Student data is protected with enterprise-grade security and
                      GDPR compliance.
                    </span>
                  </li>
                  <li className="flex items-start !pl-0">
                    <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#007A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>
                      <strong>Accessibility:</strong> Our platform is designed to be usable by everyone, regardless of
                      ability.
                    </span>
                  </li>
                  <li className="flex items-start !pl-0">
                    <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#007A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>
                      <strong>Continuous Improvement:</strong> We listen to our users and iterate based on real feedback.
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2>Join Us</h2>
                <p className="mb-6">
                  We're always looking for talented people who share our passion for education technology.
                </p>
                <a
                  href="/careers"
                  className="inline-flex items-center min-h-11 px-5 bg-[#005ffe] text-white text-[15px] font-semibold rounded-lg hover:bg-[#0047cc] transition-all no-underline"
                >
                  View Open Positions
                </a>
              </section>
            </div>
          </div>
        </div>

        <div className="container-custom mt-20 sm:mt-24 space-y-16 sm:space-y-20">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-5 sm:p-6"
              >
                <dt className="text-sm font-medium text-ink-2">{stat.label}</dt>
                <dd className="text-3xl sm:text-4xl font-semibold font-headline tracking-tight tabular-nums mt-2">{stat.value}</dd>
                <dd className="text-sm text-ink-3 mt-1">{stat.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">How we operate</h2>
              <p className="text-ink-2 leading-relaxed mb-8">
                Domax squads pair product strategists with practising educators, so every shipping cycle is grounded in
                real classrooms.
              </p>
              <div className="divide-y divide-line border-y border-line">
                {operatingPrinciples.map((principle) => (
                  <div key={principle.title} className="py-5">
                    <p className="text-[15px] font-semibold text-ink mb-1">
                      {principle.title}
                    </p>
                    <p className="text-sm text-ink-2 leading-relaxed">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Milestones</h2>
              <ol className="relative border-l border-line ml-1.5 space-y-8">
                {milestones.map((milestone, idx) => (
                  <li key={milestone.year} className="pl-7 relative">
                    <span aria-hidden="true" className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#005ffe]" />
                    <p className="text-sm font-semibold text-[#005ffe] tabular-nums">{milestone.year}</p>
                    <p className="text-lg font-semibold mt-0.5">{milestone.title}</p>
                    <p className="text-sm text-ink-2 leading-relaxed mt-1">{milestone.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
