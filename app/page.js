'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GlobeVisualization from '@/components/organisms/GlobeVisualization'
import DomaxGlobe from '@/components/organisms/DomaxGlobe'
import FeaturesDropdown from '@/components/organisms/FeaturesDropdown'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const trustBadges = [
  'AI-powered grading',
  'Rubric-based scoring',
  'In-document annotations',
  'LMS integrations',
  'Batch processing',
  'Plagiarism detection',
  'Real-time analytics',
  '14-day free trial',
]

const productPillars = [
  {
    title: 'Grade faster.',
    copy:
      'Automate paper grading with AI-powered feedback and rubric-based scoring. Cut grading time by 80% while delivering consistent, actionable feedback to every student.',
  },
  {
    title: 'Annotate smarter.',
    copy:
      'Provide in-document annotations, comments, and suggestions directly on student papers. Give personalized feedback that helps students improve.',
  },
  {
    title: 'Scale effortlessly.',
    copy:
      'Handle every stack of submissions with batch processing, reusable rubrics, and shareable student codes that keep past papers, reworks, and insights free for your class.',
  },
]

const valueCards = [
  {
    title: 'Automated Grading + Analytics',
    copy:
      'One unified platform that combines AI-powered grading, detailed analytics, and comprehensive feedback tools. Everything you need to grade smarter, not harder.',
  },
  {
    title: 'Designed purely for teachers',
    copy:
      'Join thousands of teachers who unite grading, analytics, and free student portals. Every invite code you share unlocks past papers and insights at no extra cost.',
  },
  {
    title: 'Simple, transparent pricing',
    copy:
      'Predictable plans made for solo teachers. Load credits as you need them, invite unlimited students for free, and only pay for the pages you actually grade.',
  },
]

const heroStatusChips = ['2.1M+ papers graded', 'Unlimited student codes', '14-day free trial']

const heroWorkflowSteps = [
  {
    title: 'Upload',
    description: 'Sync your LMS or drop DOCX/PDF files in seconds.',
  },
  {
    title: 'Grade',
    description: 'Blend AI scoring with your rubric for consistent results.',
  },
  {
    title: 'Deliver',
    description: 'Share annotated feedback instantly with every student.',
  },
]

const heroStatHighlights = [
  { label: 'Avg turnaround', value: '6 min' },
  { label: 'Classes synced', value: '128' },
  { label: 'Hours saved / week', value: '24+' },
  { label: 'Annot. accuracy', value: '99%' },
]

const heroFeedbackSnippets = [
  {
    badge: 'AI comment',
    text: 'Great evidence! Tie paragraph 2 back to your thesis for clarity.',
  },
  {
    badge: 'Rubric • Clarity',
    text: 'Revise intro to preview the argument before data appears.',
  },
  {
    badge: 'Next step',
    text: 'Add citations for the climate dataset you referenced in section 3.',
  },
]

const heroReviewQueue = [
  {
    name: 'Ava Chen',
    type: 'Analytical Essay',
    status: 'Ready to release',
    trend: '+12%',
  },
  {
    name: 'Marcus Lee',
    type: 'Lab Report',
    status: 'Pending reviewer',
    trend: '+4%',
  },
  {
    name: 'Sofia Patel',
    type: 'Short Answer',
    status: 'AI draft complete',
    trend: 'Now',
  },
]

const heroDemoSummary = [
  { label: 'Active', value: '42' },
  { label: 'Alerts', value: '4' },
  { label: 'Synced classes', value: '128' },
]

const heroAttentionAlerts = [
  {
    title: 'Balance low',
    detail: 'AI credits at 8%. Add funds to avoid pausing grading runs.',
    action: 'Add credits',
  },
  {
    title: 'Rubric mapping needed',
    detail: 'History 201 rubric missing criteria for AI scoring.',
    action: 'Map rubric',
  },
  {
    title: 'Human review required',
    detail: '12 essays flagged for manual check before release.',
    action: 'Open queue',
  },
]

const heroSuccessTimeline = [
  {
    time: '10:24 AM',
    title: '312 essays delivered',
    detail: 'Environmental Science, Period 4',
    status: 'Sent',
  },
  {
    time: '09:58 AM',
    title: 'Feedback pack ready',
    detail: 'ELA Sophomore Benchmark',
    status: 'Ready',
  },
  {
    time: '09:42 AM',
    title: 'Annotations synced to LMS',
    detail: 'Intro to Economics',
    status: 'Synced',
  },
]

const heroSkeletonRows = Array.from({ length: 3 })

const heroDemoPanels = [
  {
    id: 'live',
    label: 'Live grading',
    description: 'Realtime performance',
    type: 'stats',
  },
  {
    id: 'alerts',
    label: 'Needs attention',
    description: 'Alerts to resolve',
    type: 'feedback',
  },
  {
    id: 'delivery',
    label: 'Corrections sent',
    description: 'Recent deliveries',
    type: 'queue',
  },
]

const ecosystemItems = [
  {
    name: 'Automated Grading',
    description: 'AI-powered grading that delivers consistent, actionable feedback in seconds.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Analytics Dashboard',
    description: 'Track student performance, identify trends, and make data-driven decisions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: 'Smart Rubrics',
    description: 'Create, customize, and apply rubrics that ensure consistent, fair grading.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    name: 'Batch Processing',
    description: 'Grade hundreds of papers simultaneously with automated workflows.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    name: 'LMS Integrations',
    description: 'Seamlessly sync with Canvas, Blackboard, Moodle, and Google Classroom.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
      </svg>
    ),
  },
  {
    name: 'AI Feedback',
    description: 'Generate personalized, constructive feedback that helps students improve.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: 'In-Document Annotations',
    description: 'Add comments, highlights, and suggestions directly on student papers.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    name: 'Plagiarism Detection',
    description: 'Ensure academic integrity with instant similarity checking.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const ecosystemPositions = [
  { top: 12, left: 50 },
  { top: 26, left: 74 },
  { top: 50, left: 86 },
  { top: 74, left: 74 },
  { top: 88, left: 50 },
  { top: 74, left: 26 },
  { top: 50, left: 14 },
  { top: 26, left: 26 },
]

const ecosystemDetailLists = [
  [
    { title: 'Smart rubrics', description: 'Align AI scoring to class-specific rubrics without extra setup.' },
    { title: 'Consistency control', description: 'Lock answer keys so every student gets the same criteria.' },
    { title: 'Inline suggestions', description: 'Surface ready-to-send comments tied to rubric rows.' },
    { title: 'Batch uploads', description: 'Drag in 100+ assignments and grade them in parallel.' },
    { title: 'Reviewer queue', description: 'Route escalations to co-teachers before releasing grades.' },
  ],
  [
    { title: 'Cohort trends', description: 'Spot performance shifts across classes and semesters instantly.' },
    { title: 'Skill gap heatmaps', description: 'See which rubric criteria need reteaching at a glance.' },
    { title: 'Benchmarks', description: 'Compare parallel classes or teaching groups without extra sheets.' },
    { title: 'Export ready', description: 'Share CSV, PDF, or dashboard links with co-teachers or guardians in seconds.' },
    { title: 'Alert triggers', description: 'Get notified when accuracy or completion drops below targets.' },
  ],
  [
    { title: 'Template library', description: 'Start from humanities, STEM, or language-ready rubric packs.' },
    { title: 'AI draft assist', description: 'Generate criteria phrasing that matches your tone and rigor.' },
    { title: 'Shared collections', description: 'Publish rubrics for teams so everyone grades the same way.' },
    { title: 'Version control', description: 'Track rubric edits and roll back when standards change.' },
    { title: 'Weighted points', description: 'Mix holistic and analytic scoring within one template.' },
  ],
  [
    { title: 'Queue monitoring', description: 'Watch progress indicators as hundreds of files process.' },
    { title: 'Bulk feedback', description: 'Apply reusable comment sets across similar submissions.' },
    { title: 'Auto notifications', description: 'Let students know when feedback is ready without extra work.' },
    { title: 'Error recovery', description: 'Retry failed uploads automatically with version history.' },
    { title: 'Throughput insights', description: 'See how long big batches take so you can plan ahead.' },
  ],
  [
    { title: 'Single sign-on', description: 'Give educators and students one-click access via your LMS.' },
    { title: 'Grade sync', description: 'Push final scores straight into Canvas, Blackboard, or Moodle.' },
    { title: 'Roster import', description: 'Keep class lists aligned with SIS changes automatically.' },
    { title: 'Deep links', description: 'Jump from LMS assignments directly into annotated Domax papers.' },
    { title: 'Webhooks & APIs', description: 'Trigger workflows or analytics pipelines from grading events.' },
  ],
  [
    { title: 'Tone controls', description: 'Switch between encouraging, direct, or formal voice instantly.' },
    { title: 'Language support', description: 'Deliver feedback in 15+ languages with localized idioms.' },
    { title: 'Evidence callouts', description: 'Cite sentences or paragraphs that informed the AI score.' },
    { title: 'Revision nudges', description: 'Give students actionable next steps with linked resources.' },
    { title: 'Parent-friendly summary', description: 'Auto-generate plain language overviews for guardians.' },
  ],
  [
    { title: 'Highlight presets', description: 'Save color-coded markup sets for grammar, structure, or style.' },
    { title: 'Comment macros', description: 'Insert high-quality reusable comments with keyboard shortcuts.' },
    { title: 'Voice notes', description: 'Record quick audio feedback for nuanced explanations.' },
    { title: 'Rubric pins', description: 'Pin rubric evidence directly to passages for faster reviews.' },
    { title: 'Student replies', description: 'Let learners respond inline to clarify or ask questions.' },
  ],
  [
    { title: 'Web + database scan', description: 'Check submissions against billions of sources in seconds.' },
    { title: 'Similarity maps', description: 'Visualize matched passages with percentage confidence.' },
    { title: 'Citation coach', description: 'Guide students to fix references instead of just flagging issues.' },
    { title: 'Flag workflows', description: 'Escalate suspicious work to lead teachers with one click.' },
    { title: 'Policy templates', description: 'Apply class or exam-specific thresholds and remediation steps.' },
  ],
]

export default function Home() {
  const heroRef = useRef(null)
  const trustBadgesRef = useRef(null)
  const pillarsRef = useRef(null)
  const valueCardsRef = useRef(null)
  const productEcosystemRef = useRef(null)
  const [heroEmail, setHeroEmail] = useState('')
  const [heroDemoIndex, setHeroDemoIndex] = useState(0)
  const [heroDemoPaused, setHeroDemoPaused] = useState(false)
  const [activeEcosystemIndex, setActiveEcosystemIndex] = useState(0)
  const [activeDetailIndex, setActiveDetailIndex] = useState(0)
  const activeEcosystemItem = ecosystemItems[activeEcosystemIndex] || ecosystemItems[0]
  const activeDetailList =
    ecosystemDetailLists[activeEcosystemIndex] || ecosystemDetailLists[0] || []
  const detailIndex =
    activeDetailList.length > 0 ? activeDetailIndex % activeDetailList.length : 0
  const currentDetail = activeDetailList[detailIndex] || null

  const handleHeroSignup = (event) => {
    event.preventDefault()
    setHeroEmail('')
  }

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

    // Trust badges animation
    if (trustBadgesRef.current) {
      gsap.fromTo(
        trustBadgesRef.current.querySelectorAll('div'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trustBadgesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Pillars animation
    if (pillarsRef.current) {
      gsap.fromTo(
        pillarsRef.current.querySelectorAll('div[class*="rounded-3xl"]'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Value cards animation
    if (valueCardsRef.current) {
      gsap.fromTo(
        valueCardsRef.current.querySelectorAll('div[class*="rounded-3xl"]'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valueCardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Product ecosystem animation
    if (productEcosystemRef.current) {
      gsap.fromTo(
        productEcosystemRef.current.querySelectorAll('[data-ecosystem-card]'),
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productEcosystemRef.current,
            start: 'top 70%',
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

  useEffect(() => {
    setActiveDetailIndex(0)
  }, [activeEcosystemIndex])

  useEffect(() => {
    if (heroDemoPaused) {
      return
    }
    const interval = setInterval(() => {
      setHeroDemoIndex((prev) => (prev + 1) % heroDemoPanels.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroDemoPaused])

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] text-[#0A3059] overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-32 -right-10 w-96 h-96 bg-gradient-to-br from-[#00cd90] to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#005ffe] to-transparent blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-3">
                {heroStatusChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full bg-white/70 border border-[#d7e3ff] text-xs font-semibold text-[#0A3059] shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <GradientHeading
                  as="h1"
                  className="text-3xl sm:text-4xl lg:text-5xl"
                  highlightText="smarter"
                >
                  Automate grading with modern AI workflows
                </GradientHeading>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                  Domax pairs AI scoring with your rubric, annotations, and analytics so every class
                  gets faster feedback without sacrificing quality.
                </p>
              </div>

              <form onSubmit={handleHeroSignup} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 rounded-2xl border border-[#dfe5ff] bg-white px-4 py-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12l-4 4-4-4m8-4l-4-4-4 4" />
                  </svg>
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(event) => setHeroEmail(event.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 bg-transparent text-sm sm:text-base text-[#0A3059] placeholder:text-gray-400 focus:outline-none"
                    aria-label="Work email"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="whitespace-nowrap">
                  Start free trial
                </Button>
              </form>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
                <Button href="/contact" variant="outline" size="md" className="sm:w-auto w-full">
                  Book a live demo
                </Button>
                <p className="text-xs sm:text-sm">SOC2-ready • Cancel anytime • Support included</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {heroWorkflowSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-[#e4e9ff] bg-white p-4 shadow-[0_20px_60px_-45px_rgba(10,48,89,0.4)]"
                  >
                    <p className="text-xs font-semibold text-[#005ffe] uppercase tracking-[0.2em] mb-2">
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 text-sm text-gray-600">
                <div className="flex -space-x-3">
                  {['AC', 'ML', 'SP'].map((initials, index) => (
                    <div
                      key={initials}
                      className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-semibold ${
                        ['bg-[#d6f5ea]', 'bg-[#e0e8ff]', 'bg-[#ffe7d6]'][index]
                      } text-[#0A3059]`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p>Trusted by 12,000+ teachers running high-volume grading from their classrooms.</p>
              </div>
            </div>

            <div className="max-w-2xl w-full mx-auto">
              <div
                className="rounded-[28px] border border-[#dfe3ff] bg-white p-5 sm:p-6 shadow-[0_45px_110px_-60px_rgba(10,48,89,0.45)]"
                onMouseEnter={() => setHeroDemoPaused(true)}
                onMouseLeave={() => setHeroDemoPaused(false)}
                onFocus={() => setHeroDemoPaused(true)}
                onBlur={() => setHeroDemoPaused(false)}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0A3059]">Domax demo</p>
                    <p className="text-xs text-gray-500">See how grading runs in real time</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f7ff] text-[#005ffe]">
                    Live preview
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {heroDemoPanels.map((panel, index) => {
                    const isActivePanel = heroDemoIndex === index
                    return (
                      <button
                        key={panel.id}
                        type="button"
                        onClick={() => setHeroDemoIndex(index)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          isActivePanel
                            ? 'bg-[#005ffe] text-white'
                            : 'bg-[#f0f4ff] text-[#0A3059] hover:bg-[#e4ecff]'
                        }`}
                      >
                        {panel.label}
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-2xl border border-[#ecf0ff] bg-[#f8faff] p-4 min-h-[280px] flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {heroDemoSummary.map((item) => (
                      <div
                        key={item.label}
                        className="px-3 py-2 rounded-xl bg-white border border-[#e8ecff] min-w-[110px]"
                      >
                        <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">{item.label}</p>
                        <p className="text-lg font-bold text-[#0A3059]">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {heroDemoPanels[heroDemoIndex]?.id === 'live' && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0A3059]">Queue health</p>
                        <p className="text-xs text-gray-500">Rubrics deployed • Accuracy trending up</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {heroStatHighlights.map((stat) => (
                          <div key={stat.label} className="rounded-xl bg-white p-3 border border-[#e8ecff]">
                            <p className="text-xl font-bold text-[#0A3059]">{stat.value}</p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl bg-white border border-[#e8ecff] p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-[#0A3059]">AI comment stream</p>
                            <p className="text-xs text-gray-500">Updating every few seconds</p>
                          </div>
                          <span className="text-xs font-semibold text-[#00cd90]">+18%</span>
                        </div>
                        <div className="space-y-2">
                          {heroFeedbackSnippets.slice(0, 2).map((snippet) => (
                            <div key={snippet.text} className="rounded-lg bg-[#f8faff] px-3 py-2">
                              <p className="text-[10px] uppercase tracking-[0.3em] text-[#005ffe] mb-1">
                                {snippet.badge}
                              </p>
                              <p className="text-sm text-[#0A3059] leading-relaxed">{snippet.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {heroDemoPanels[heroDemoIndex]?.id === 'alerts' && (
                    <div className="space-y-3">
                      {heroAttentionAlerts.map((alert) => (
                        <div
                          key={alert.title}
                          className="rounded-2xl bg-white border border-[#ffe4cc] px-4 py-3 flex items-start justify-between gap-4"
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#d97706]">{alert.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{alert.detail}</p>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#005ffe] hover:text-[#0047cc] whitespace-nowrap"
                          >
                            {alert.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {heroDemoPanels[heroDemoIndex]?.id === 'delivery' && (
                    <div className="space-y-3">
                      {heroSuccessTimeline.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl bg-white border border-[#e4e9ff] px-4 py-3 flex items-start justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{item.time}</p>
                            <p className="text-sm font-semibold text-[#0A3059]">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.detail}</p>
                          </div>
                          <span className="text-xs font-semibold text-[#00cd90]">{item.status}</span>
                        </div>
                      ))}
                      <div className="rounded-2xl border border-dashed border-[#dfe3ff] bg-white px-4 py-3 space-y-2">
                        {heroSkeletonRows.map((_, index) => (
                          <div
                            key={`skeleton-${index}`}
                            className="h-3 rounded-full bg-gradient-to-r from-[#eef2ff] via-white to-[#eef2ff] animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/60 text-xs text-gray-500">
                    <span>Auto-updating every 5s</span>
                    <span>AI draft ETA 3m 12s</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                <svg className="w-4 h-4 text-[#00cd90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SOC2, FERPA, and GDPR-ready with regional data hosting.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section ref={trustBadgesRef} className="py-10 sm:py-12 lg:py-16 bg-[#eff3ff]">
        <div className="container-custom">
          <div className="text-center max-w-5xl mx-auto">
            <p className="text-base sm:text-lg font-semibold text-[#0A3059] mb-6 sm:mb-8">Everything you need to grade smarter</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 text-left">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] text-white flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#0A3059] font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section ref={pillarsRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {productPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl sm:rounded-3xl border border-[#eceeff] p-5 sm:p-6 lg:p-8 shadow-[0_25px_65px_-40px_rgba(10,48,89,0.15)] hover:-translate-y-1 transition-all bg-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A3059] mb-3 sm:mb-4">{pillar.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <GradientHeading as="h2" className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" highlightText="smarter">
                Start grading smarter today
              </GradientHeading>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                Get started in seconds with AI-powered grading that saves you hours every week. No credit card required, no commitments, no catch.
              </p>
              <Button
                href="/signup"
                variant="primary"
                size="md"
              >
                Try FREE for 14 Days
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
            <div className="rounded-2xl sm:rounded-3xl border-2 border-[#d8ddff] bg-white p-6 sm:p-8 lg:p-10 text-center shadow-xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-gray-500 mb-3 sm:mb-4">GRADING EFFICIENCY</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#005ffe]">80%</p>
              <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4">average time saved per assignment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section ref={valueCardsRef} className="py-12 sm:py-16 lg:py-20 bg-[#eff3ff]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {valueCards.map((card) => (
            <div key={card.title} className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 lg:p-8 border border-[#e0e4ff] shadow-[0_40px_90px_-50px_rgba(10,48,89,0.2)]">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A3059] mb-3 sm:mb-4">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{card.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hop to the edge and never look back - Circular Product Layout */}
      <section ref={productEcosystemRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-20 sm:mb-8 lg:mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#005ffe] mb-3 sm:mb-4">PRODUCT ECOSYSTEM</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-4 sm:mb-6">Everything you need to grade smarter</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              A complete platform for automated grading, feedback, and analytics.
            </p>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-[1500px] aspect-3/2">
              <div className="absolute inset-[18%] rounded-full border-2 border-[#d8ddff]/70"></div>
              <div className="absolute inset-[28%] rounded-full border border-[#eef2ff]/70"></div>

              {/* Connector lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {ecosystemPositions.map((pos, index) => (
                  <line
                    key={`connector-${index}`}
                    x1="50"
                    y1="50"
                    x2={pos.left}
                    y2={pos.top}
                    stroke={activeEcosystemIndex === index ? '#005ffe' : 'rgba(0,95,254,0.12)'}
                    strokeWidth={activeEcosystemIndex === index ? 1.5 : 1}
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              {ecosystemPositions.map((pos, index) => (
                <div
                  key={`node-${index}`}
                  className="absolute pointer-events-none"
                  style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className={`block w-3 h-3 rounded-full ${
                      activeEcosystemIndex === index ? 'bg-[#005ffe]' : 'bg-[#cdd8ff]'
                    }`}
                  />
                </div>
              ))}

              {ecosystemItems.map((item, index) => {
                const position = ecosystemPositions[index] || { top: 50, left: 50 }
                const isActive = activeEcosystemIndex === index
                return (
                  <div
                    key={item.name}
                    className="absolute"
                    style={{
                      top: `${position.top}%`,
                      left: `${position.left}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      data-ecosystem-card
                      className={`w-[25rem] max-w-xs bg-white border ${
                        isActive ? 'border-[#005ffe] shadow-2xl shadow-[#005ffe]/15' : 'border-[#e0e4ff]'
                      } rounded-3xl px-5 py-4 flex items-center gap-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_-40px_rgba(10,48,89,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ffe]`}
                      onMouseEnter={() => setActiveEcosystemIndex(index)}
                      onFocus={() => setActiveEcosystemIndex(index)}
                      onClick={() => setActiveEcosystemIndex(index)}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl transition-colors ${
                          isActive
                            ? 'bg-gradient-to-br from-[#005ffe] to-[#0047cc] text-white shadow-lg shadow-[#005ffe]/30'
                            : 'bg-[#f0f7ff] text-[#005ffe]'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#0A3059]">{item.name}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </button>
                  </div>
                )
              })}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-44 h-44 xl:w-62 xl:h-62 rounded-full bg-gradient-to-br from-[#005ffe] to-[#0047cc] border-4 border-white shadow-[0_35px_80px_-45px_rgba(0,71,204,0.9)] flex items-center justify-center p-6">
                  <div className="text-white space-y-4">

                    {currentDetail && (
                      <div className="mx-auto">
                        <p className="text-base font-semibold text-white mb-1">
                          {currentDetail.title}
                        </p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {currentDetail.description}
                        </p>
                      </div>
                    )}

                    {activeDetailList.length > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-1">
                        {activeDetailList.map((_, idx) => (
                          <button
                            key={`detail-dot-${idx}`}
                            type="button"
                            onClick={() => setActiveDetailIndex(idx)}
                            className={`transition-all duration-200 ${
                              idx === detailIndex
                                ? 'w-6 h-2 rounded-full bg-white'
                                : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Show insight ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/tablet fallback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mb-10 sm:mb-12">
            {ecosystemItems.map((item, index) => (
              <div
                key={item.name}
                className={`bg-white border ${
                  activeEcosystemIndex === index ? 'border-[#005ffe] shadow-lg' : 'border-[#e0e4ff]'
                } rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#005ffe] transition-all flex items-start gap-4 text-left`}
                onMouseEnter={() => setActiveEcosystemIndex(index)}
                onFocus={() => setActiveEcosystemIndex(index)}
                onClick={() => setActiveEcosystemIndex(index)}
                role="button"
                tabIndex={0}
              >
                <div className="w-14 h-14 rounded-xl bg-[#f0f7ff] text-[#005ffe] flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0A3059]">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-[#d8ddff]">
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#005ffe] mb-2 font-semibold">DOMAX GRADING PLATFORM</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">1.5M+</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Papers Graded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">80%</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">10K+</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Educators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">99%</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple to start. Built to scale. - Interactive Dropdown Section */}
      <FeaturesDropdown />

      {/* A global network built for more than speed */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#005ffe] mb-3 sm:mb-4">TRUSTED WORLDWIDE</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A3059] mb-4 sm:mb-6">
                Built for teachers, trusted by their students
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                Domax gives classroom teachers the same AI power as enterprise teams—without the bureaucracy. Keep grading fast, keep context-rich feedback flowing, and let students revisit annotated work through the free portals unlocked by your access codes.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">1.5M+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Papers Graded</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">10K+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Active Educators</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005ffe] mb-1 sm:mb-2">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Countries</p>
                </div>
              </div>
            </div>

            {/* Right globe visualization */}
            <div className="w-full h-80 sm:h-96 lg:h-[500px]">
              <DomaxGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Build faster */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#eff3ff]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-[#d8ddff] bg-white p-6 sm:p-8 lg:p-10 shadow-xl">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#005ffe] mb-3 sm:mb-4">EDUCATORS FIRST</p>
            <GradientHeading as="h2" className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" highlightText="minutes">
              Get started in minutes
            </GradientHeading>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Start grading smarter from day one with AI-powered feedback, intuitive rubrics, and seamless integrations. Every feature designed to save you time.
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0A3059]">2 min</p>
                <p className="text-xs sm:text-sm text-gray-500">Average setup time</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#0A3059]">80%</p>
                <p className="text-xs sm:text-sm text-gray-500">Time saved per assignment</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-[#e0e4ff] p-6 sm:p-8 lg:p-10 shadow-xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#005ffe] mb-3 sm:mb-4 font-semibold">WORKFLOW</p>
            <ul className="space-y-4 sm:space-y-6 text-[#0A3059]">
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm sm:text-base">1</div>
                <div>
                  <p className="text-sm sm:text-base font-semibold">Upload student papers</p>
                  <p className="text-xs sm:text-sm text-gray-500">Support for PDF, DOCX, and more formats.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm sm:text-base">2</div>
                <div>
                  <p className="text-sm sm:text-base font-semibold">Apply your rubric</p>
                  <p className="text-xs sm:text-sm text-gray-500">Use AI-powered grading or customize your own criteria.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm sm:text-base">3</div>
                <div>
                  <p className="text-sm sm:text-base font-semibold">Review & deliver feedback</p>
                  <p className="text-xs sm:text-sm text-gray-500">Get instant results with detailed analytics and feedback.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-0 w-80 h-80 bg-gradient-to-br from-[#00cd90] to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-gradient-to-tr from-[#005ffe] to-transparent blur-[160px]" />
        </div>
        <div className="container-custom relative z-10 text-center px-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#005ffe] mb-3 sm:mb-4 font-semibold">READY TO GET STARTED?</p>
          <GradientHeading as="h2" className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6" highlightText="smarter">
            Start grading smarter in minutes
          </GradientHeading>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-10">
            Join thousands of educators who save hours every week while delivering better feedback to their students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
            <Button
              href="/signup"
              variant="primary"
              size="md"
            >
              Try FREE for 14 Days
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="md"
            >
              Schedule a Demo
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00cd90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00cd90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00cd90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
