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
      <section ref={heroRef} className="relative bg-white text-[#0A3059] overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        {/* Decorative wash. Note: the hero GSAP call selects the first `div > div`
            in this section, which resolves to the first child below. Keep this
            structure so the existing animation behaves exactly as before. */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,#F0F7FF_0%,rgba(240,247,255,0)_100%)]" />
          <div className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(0,205,144,0.10),rgba(0,205,144,0))]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-medium text-[#4A5D75] mb-6">
                {heroStatusChips.map((chip, index) => (
                  <span key={chip} className="inline-flex items-center gap-2.5">
                    {index > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#CFD8E3]" />}
                    {chip}
                  </span>
                ))}
              </div>

              <GradientHeading
                as="h1"
                className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem]"
                highlightText="smarter"
              >
                Automate grading with modern AI workflows
              </GradientHeading>
              <p className="lede mt-5 max-w-xl">
                Domax pairs AI scoring with your rubric, annotations, and analytics so every class
                gets faster feedback without sacrificing quality.
              </p>

              <form onSubmit={handleHeroSignup} className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-xl">
                <label className="w-full sm:flex-1 h-12 rounded-lg border border-[#CFD8E3] bg-white px-3.5 flex items-center gap-2.5 focus-within:border-[#005ffe] focus-within:ring-2 focus-within:ring-[#005ffe]/15 transition-colors">
                  <svg className="w-[18px] h-[18px] text-[#5B6B82] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(event) => setHeroEmail(event.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 min-w-0 bg-transparent text-[15px] text-[#0A3059] placeholder:text-[#5B6B82] focus:outline-none"
                    aria-label="Work email"
                    required
                  />
                </label>
                <Button type="submit" variant="primary" size="xl" className="whitespace-nowrap">
                  Start free trial
                </Button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5B6B82]">
                <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-[#005ffe] hover:text-[#0047cc] rounded">
                  Book a live demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <span>SOC2-ready • Cancel anytime • Support included</span>
              </div>

              <ol className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 border-t border-[#E3E8EF] pt-6">
                {heroWorkflowSteps.map((step, index) => (
                  <li key={step.title}>
                    <p className="text-sm font-semibold text-[#0A3059]">
                      <span className="text-[#005ffe] tabular-nums mr-1.5">{String(index + 1).padStart(2, '0')}</span>
                      {step.title}
                    </p>
                    <p className="text-sm text-[#4A5D75] leading-relaxed mt-1">{step.description}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-center gap-3 text-sm text-[#4A5D75]">
                <div className="flex -space-x-2" aria-hidden="true">
                  {['AC', 'ML', 'SP'].map((initials, index) => (
                    <div
                      key={initials}
                      className={`w-8 h-8 rounded-full ring-2 ring-white flex items-center justify-center text-[11px] font-semibold ${
                        ['bg-[#E3F8F1]', 'bg-[#E8F0FF]', 'bg-[#FFF4E5]'][index]
                      } text-[#0A3059]`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p>Trusted by 12,000+ teachers running high-volume grading from their classrooms.</p>
              </div>
            </div>

            <div className="w-full max-w-xl mx-auto lg:mr-0">
              <div
                className="rounded-2xl border border-[#E3E8EF] bg-white shadow-pop"
                onMouseEnter={() => setHeroDemoPaused(true)}
                onMouseLeave={() => setHeroDemoPaused(false)}
                onFocus={() => setHeroDemoPaused(true)}
                onBlur={() => setHeroDemoPaused(false)}
              >
                <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 border-b border-[#E3E8EF]">
                  <div>
                    <p className="text-sm font-semibold text-[#0A3059]">Domax demo</p>
                    <p className="text-xs text-[#5B6B82]">See how grading runs in real time</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#007A56]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00cd90]" aria-hidden="true" />
                    Live preview
                  </span>
                </div>

                <div className="px-5 pt-4">
                  <div className="flex sm:inline-flex w-full sm:w-auto p-1 rounded-lg bg-[#F6F8FA] border border-[#E3E8EF]" role="tablist" aria-label="Demo views">
                    {heroDemoPanels.map((panel, index) => {
                      const isActivePanel = heroDemoIndex === index
                      return (
                        <button
                          key={panel.id}
                          type="button"
                          role="tab"
                          aria-selected={isActivePanel}
                          onClick={() => setHeroDemoIndex(index)}
                          className={`flex-1 sm:flex-none px-3 min-h-8 py-1.5 leading-tight rounded-md text-xs font-semibold transition-colors ${
                            isActivePanel
                              ? 'bg-white text-[#0A3059] shadow-[0_1px_2px_rgba(10,48,89,0.12)]'
                              : 'text-[#4A5D75] hover:text-[#0A3059]'
                          }`}
                        >
                          {panel.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="p-5 min-h-[300px] flex flex-col gap-4">
                  <dl className="grid grid-cols-3 divide-x divide-[#E3E8EF] rounded-lg border border-[#E3E8EF]">
                    {heroDemoSummary.map((item) => (
                      <div key={item.label} className="px-3.5 py-2.5">
                        <dt className="text-xs text-[#5B6B82]">{item.label}</dt>
                        <dd className="text-lg font-semibold text-[#0A3059] tabular-nums">{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {heroDemoPanels[heroDemoIndex]?.id === 'live' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-px rounded-lg overflow-hidden border border-[#E3E8EF] bg-[#E3E8EF]">
                        {heroStatHighlights.map((stat) => (
                          <div key={stat.label} className="bg-white px-3.5 py-3">
                            <p className="text-xl font-semibold text-[#0A3059] tabular-nums">{stat.value}</p>
                            <p className="text-xs text-[#5B6B82] mt-0.5">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-[#0A3059]">AI comment stream</p>
                          <span className="text-xs font-semibold text-[#007A56]">+18%</span>
                        </div>
                        <div className="space-y-2">
                          {heroFeedbackSnippets.slice(0, 2).map((snippet) => (
                            <div key={snippet.text} className="rounded-lg bg-[#F6F8FA] px-3.5 py-2.5">
                              <p className="text-xs font-semibold text-[#005ffe] mb-0.5">{snippet.badge}</p>
                              <p className="text-sm text-[#0A3059] leading-relaxed">{snippet.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {heroDemoPanels[heroDemoIndex]?.id === 'alerts' && (
                    <ul className="divide-y divide-[#E3E8EF] rounded-lg border border-[#E3E8EF]">
                      {heroAttentionAlerts.map((alert) => (
                        <li key={alert.title} className="px-3.5 py-3 flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF9F43] flex-shrink-0" aria-hidden="true" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0A3059]">{alert.title}</p>
                            <p className="text-xs text-[#4A5D75] mt-0.5">{alert.detail}</p>
                          </div>
                          <span className="text-xs font-semibold text-[#005ffe] whitespace-nowrap">{alert.action}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {heroDemoPanels[heroDemoIndex]?.id === 'delivery' && (
                    <div className="space-y-3">
                      <ul className="divide-y divide-[#E3E8EF] rounded-lg border border-[#E3E8EF]">
                        {heroSuccessTimeline.map((item) => (
                          <li key={item.title} className="px-3.5 py-3 flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs text-[#5B6B82] tabular-nums">{item.time}</p>
                              <p className="text-sm font-semibold text-[#0A3059]">{item.title}</p>
                              <p className="text-xs text-[#4A5D75]">{item.detail}</p>
                            </div>
                            <span className="text-xs font-semibold text-[#007A56]">{item.status}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-lg border border-dashed border-[#CFD8E3] px-3.5 py-3 space-y-2" aria-hidden="true">
                        {heroSkeletonRows.map((_, index) => (
                          <div
                            key={`skeleton-${index}`}
                            className="h-2.5 rounded-full bg-gradient-to-r from-[#eef2ff] via-white to-[#eef2ff] animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#E3E8EF] text-xs text-[#5B6B82]">
                    <span>Auto-updating every 5s</span>
                    <span className="tabular-nums">AI draft ETA 3m 12s</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-[#5B6B82]">
                <svg className="w-4 h-4 text-[#007A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SOC2, FERPA, and GDPR-ready with regional data hosting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities. The GSAP call animates every <div> in this section,
          so the div structure below is intentionally unchanged. */}
      <section ref={trustBadgesRef} className="py-14 sm:py-16 bg-[#F6F8FA] border-y border-[#E3E8EF]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow text-center w-full mb-8">Everything you need to grade smarter</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-left">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E3F8F1] text-[#007A56] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] text-[#0A3059] font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section ref={pillarsRef} className="section-spacing bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {productPillars.map((pillar, index) => (
            // `rounded-3xl` is the GSAP selector hook for this section; the
            // element itself is transparent, so the radius is not visible.
            <div key={pillar.title} className="rounded-3xl hover:-translate-y-1 transition-all">
              <div className="border-t-2 border-[#0A3059] pt-6">
                <p className="text-sm font-semibold text-[#005ffe] tabular-nums mb-3">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="text-2xl font-semibold text-[#0A3059] mb-3">{pillar.title}</h3>
                <p className="text-[15px] text-[#4A5D75] leading-relaxed">{pillar.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section ref={valueCardsRef} className="pb-20 sm:pb-24 bg-white">
        <div className="container-custom">
          <div className="border-t border-[#E3E8EF]">
            {valueCards.map((card) => (
              // `rounded-3xl` is the GSAP selector hook for this section.
              <div key={card.title} className="rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-3 md:gap-12 py-8 sm:py-10 border-b border-[#E3E8EF]">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#0A3059]">{card.title}</h3>
                  <p className="text-base text-[#4A5D75] leading-relaxed max-w-xl">{card.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product ecosystem — interactive overview of the platform */}
      <section ref={productEcosystemRef} className="section-spacing bg-[#F6F8FA] border-t border-[#E3E8EF]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-6">
            <p className="eyebrow mb-3">Product ecosystem</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0A3059]">Everything you need to grade smarter</h2>
            <p className="lede mt-4">
              A complete platform for automated grading, feedback, and analytics.
            </p>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-[1100px] aspect-3/2">
              <div className="absolute inset-[18%] rounded-full border border-[#CFD8E3]"></div>
              <div className="absolute inset-[28%] rounded-full border border-dashed border-[#E3E8EF]"></div>

              {/* Connector lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {ecosystemPositions.map((pos, index) => (
                  <line
                    key={`connector-${index}`}
                    x1="50"
                    y1="50"
                    x2={pos.left}
                    y2={pos.top}
                    stroke={activeEcosystemIndex === index ? '#005ffe' : 'rgba(10,48,89,0.10)'}
                    strokeWidth={activeEcosystemIndex === index ? 1.5 : 1}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
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
                    className={`block w-2.5 h-2.5 rounded-full ${
                      activeEcosystemIndex === index ? 'bg-[#005ffe]' : 'bg-[#CFD8E3]'
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
                      className={`w-[25rem] max-w-[17.5rem] bg-white border ${
                        isActive ? 'border-[#005ffe] ring-4 ring-[#005ffe]/10' : 'border-[#E3E8EF]'
                      } rounded-xl px-4 py-3.5 flex items-center gap-3.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ffe]`}
                      onMouseEnter={() => setActiveEcosystemIndex(index)}
                      onFocus={() => setActiveEcosystemIndex(index)}
                      onClick={() => setActiveEcosystemIndex(index)}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5 transition-colors ${
                          isActive
                            ? 'bg-[#005ffe] text-white'
                            : 'bg-[#F0F7FF] text-[#005ffe]'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-[#0A3059] font-body tracking-normal">{item.name}</h3>
                        <p className="text-[13px] text-[#4A5D75] leading-snug mt-0.5">{item.description}</p>
                      </div>
                    </button>
                  </div>
                )
              })}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-48 h-48 xl:w-60 xl:h-60 rounded-full bg-[#0A3059] ring-8 ring-white shadow-pop flex items-center justify-center p-7">
                  <div className="text-white space-y-3" aria-live="polite">

                    {currentDetail && (
                      <div className="mx-auto">
                        <p className="text-[15px] font-semibold text-white mb-1">
                          {currentDetail.title}
                        </p>
                        <p className="text-[13px] text-white/75 leading-snug">
                          {currentDetail.description}
                        </p>
                      </div>
                    )}

                    {activeDetailList.length > 1 && (
                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        {activeDetailList.map((_, idx) => (
                          <button
                            key={`detail-dot-${idx}`}
                            type="button"
                            onClick={() => setActiveDetailIndex(idx)}
                            className={`transition-all duration-200 ${
                              idx === detailIndex
                                ? 'w-5 h-1.5 rounded-full bg-white'
                                : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Show insight ${idx + 1}`}
                            aria-current={idx === detailIndex ? 'true' : undefined}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
            {ecosystemItems.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`bg-white border ${
                  activeEcosystemIndex === index ? 'border-[#005ffe]' : 'border-[#E3E8EF]'
                } rounded-xl p-4 hover:border-[#005ffe] transition-all flex items-start gap-3.5 text-left`}
                onMouseEnter={() => setActiveEcosystemIndex(index)}
                onFocus={() => setActiveEcosystemIndex(index)}
                onClick={() => setActiveEcosystemIndex(index)}
                aria-pressed={activeEcosystemIndex === index}
              >
                <div className="w-10 h-10 rounded-lg bg-[#F0F7FF] text-[#005ffe] flex items-center justify-center flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0A3059] font-body tracking-normal">{item.name}</h3>
                  <p className="text-sm text-[#4A5D75] mt-0.5">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Simple to start. Built to scale. */}
      <FeaturesDropdown />

      {/* Built for teachers */}
      <section className="section-spacing bg-white border-t border-[#E3E8EF]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <p className="eyebrow mb-3">Trusted worldwide</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#0A3059]">
                Built for teachers, trusted by their students
              </h2>
              <p className="lede mt-5">
                Domax gives classroom teachers the same AI power as enterprise teams—without the bureaucracy. Keep grading fast, keep context-rich feedback flowing, and let students revisit annotated work through the free portals unlocked by your access codes.
              </p>
              <dl className="mt-10 grid grid-cols-3 border-t border-[#E3E8EF]">
                {[
                  { value: '1.5M+', label: 'Papers Graded' },
                  { value: '10K+', label: 'Active Educators' },
                  { value: '50+', label: 'Countries' },
                ].map((stat, index) => (
                  <div key={stat.label} className={`pt-5 ${index > 0 ? 'pl-5 border-l border-[#E3E8EF]' : ''}`}>
                    <dd className="text-3xl sm:text-4xl font-semibold text-[#0A3059] tabular-nums font-headline tracking-tight">{stat.value}</dd>
                    <dt className="text-sm text-[#4A5D75] mt-1">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right globe visualization */}
            <div className="w-full h-80 sm:h-96 lg:h-[500px]">
              <DomaxGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0A3059] text-white">
        <div className="container-custom py-20 sm:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7FE3C3] mb-4">Ready to get started?</p>
          <h2 className="text-3xl sm:text-[2.75rem] font-semibold text-white max-w-2xl mx-auto leading-tight">
            Start grading smarter in minutes
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto mt-5">
            Join thousands of educators who save hours every week while delivering better feedback to their students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
            <Button
              href="/signup"
              variant="primary-blue"
              size="xl"
            >
              Try FREE for 14 Days
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              href="/contact"
              variant="light"
              size="xl"
            >
              Schedule a Demo
            </Button>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/75 mt-8">
            {['Free 14-day trial', 'No credit card required', 'Cancel anytime'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00cd90]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  )
}
