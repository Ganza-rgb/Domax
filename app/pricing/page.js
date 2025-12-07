'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  getPricingSummary,
  PAGE_PRICES,
  BOOKLET_PRICES,
  BUNDLE_OFFERS,
  MINIMUM_CHARGE_RWF,
} from '@/lib/pricing'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LEVEL_LABELS = {
  primary: 'Primary & lower secondary',
  'o-level': 'O-Level',
  'a-level': 'A-Level',
}

const levelMeta = {
  primary: {
    blurb: 'Perfect for continuous assessment, homework, and quick marking runs.',
    highlights: ['Short answer & quizzes', 'Handwritten homework', 'Reading logs'],
  },
  'o-level': {
    blurb: 'Great for structured essays and timed exams with rubric guardrails.',
    highlights: ['Exam prep packs', 'Shared rubric packs', 'Mixed media assignments'],
  },
  'a-level': {
    blurb: 'Designed for coursework, extended essays, and project booklets.',
    highlights: ['Research papers', 'Capstone projects', 'Portfolio grading'],
  },
}

const billingModes = [
  { id: 'pages', label: 'Pages', description: 'Exact usage, per graded page', badge: 'Most popular' },
  { id: 'booklets', label: 'Booklets', description: 'Per completed exam booklet' },
  { id: 'bundle', label: 'Wallet bundles', description: 'Prefund credits & auto-assign' },
]

const guardrails = [
  {
    title: 'Wallet-first billing',
    description: 'Top up once, spend credits across your assignments, and pause whenever you like.',
  },
  {
    title: 'Student unlock codes',
    description: 'Share past-paper or assignment codes so learners access feedback for free.',
  },
  {
    title: 'Live audit trail',
    description: 'Every deduction is logged with assignment IDs, rubric snapshots, and timestamps.',
  },
]

const faqItems = [
  {
    id: 'minimum',
    question: 'What is the minimum charge?',
    answer:
      'Each wallet top-up needs to meet the minimum charge so we can provision AI capacity. You can distribute that balance across as many classes or grading runs as you like.',
  },
  {
    id: 'pages',
    question: 'Do unused pages expire?',
    answer:
      'No. Credits remain available until consumed. You control any optional expiry rules from your wallet settings if you want to keep budgets tidy.',
  },
  {
    id: 'bundles',
    question: 'How do bundles work?',
    answer:
      'Bundles pre-allocate a larger pool of pages at a predictable price. The moment payment clears, credits hit your wallet and we send receipts you can forward to finance or reimbursement portals.',
  },
  {
    id: 'currency',
    question: 'Can we pay in other currencies?',
    answer:
      'Yes. Stripe handles USD/EUR cards, while Flutterwave & Paystack cover regional wallets so solo teachers can top up wherever they teach.',
  },
]

const numberFormatter = new Intl.NumberFormat('en-US')
const formatRwf = (value = 0) => `RWF ${numberFormatter.format(value)}`

export default function PricingPage() {
  const heroRef = useRef(null)
  const matrixRef = useRef(null)
  const estimatorRef = useRef(null)
  const faqRef = useRef(null)

  const [billingType, setBillingType] = useState('pages')
  const [level, setLevel] = useState('o-level')
  const [pages, setPages] = useState(800)
  const [booklets, setBooklets] = useState(45)
  const [bundleIndex, setBundleIndex] = useState(0)
  const [activeFaq, setActiveFaq] = useState(faqItems[0].id)

  const selectedBundle = BUNDLE_OFFERS[bundleIndex] || BUNDLE_OFFERS[BUNDLE_OFFERS.length - 1]

  const estimatorSummary = useMemo(() => {
    if (billingType === 'bundle') {
      return getPricingSummary({
        type: 'bundle',
        level,
        bundleAmount: selectedBundle?.amount || 0,
      })
    }
    if (billingType === 'booklets') {
      return getPricingSummary({
        type: 'booklets',
        level,
        booklets,
      })
    }
    return getPricingSummary({
      type: 'pages',
      level,
      pages,
    })
  }, [billingType, level, pages, booklets, selectedBundle])

  const effectiveUnitRate = useMemo(() => {
    if (billingType === 'pages') return PAGE_PRICES[level]
    if (billingType === 'booklets') return BOOKLET_PRICES[level]
    if (selectedBundle?.pages) {
      return Math.round(selectedBundle.amount / selectedBundle.pages)
    }
    return 0
  }, [billingType, level, selectedBundle])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('[data-animate="hero"]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
        )
      }
      const matrixCards = matrixRef.current?.querySelectorAll('[data-animate="matrix-card"]')
      if (matrixCards?.length) {
        gsap.fromTo(
          matrixCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: matrixRef.current,
              start: 'top 80%',
            },
          }
        )
      }
      if (estimatorRef.current) {
        gsap.fromTo(
          estimatorRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: estimatorRef.current,
              start: 'top 85%',
            },
          }
        )
      }
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll('[data-animate="faq"]'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, 40)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const baselinePages = estimatorSummary.pagesCredited || pages
  const heroStats = [
    { label: 'Page credits from', value: `${formatRwf(PAGE_PRICES.primary)}/page` },
    { label: 'Minimum wallet top-up', value: formatRwf(MINIMUM_CHARGE_RWF) },
    { label: 'Bundle boost', value: `${numberFormatter.format(BUNDLE_OFFERS[0].pages)} pages` },
  ]

  return (
    <div className="min-h-screen bg-white text-[#0A3059]">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-b from-[#E6F2FF] via-white to-white"
        >
          <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-16 items-center px-4">
            <div data-animate="hero">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 border border-white text-xs font-semibold tracking-[0.25em] text-[#005ffe] mb-4">
                PRICING
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-5">
                Precision grading,
                <br />
                only pay for what you use.
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Wallet-based billing tuned for solo teachers—load only what you need, invite unlimited students for free, and export clean receipts for reimbursement or tax purposes.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Button variant="primary" size="md" href="/signup">
                  Launch Domax
                </Button>
                <Button variant="ghost" size="md" href="/contact">
                  Talk to billing
                </Button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3" data-animate="hero">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-lg p-4 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold text-[#0A3059]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-animate="hero"
              className="bg-white rounded-[32px] border border-[#e0e4ff] shadow-[0_35px_85px_-45px_rgba(10,48,89,0.75)] p-6 lg:p-8 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#005ffe]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00cd90]/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase text-gray-500">Live wallet preview</p>
                    <p className="text-xl font-semibold mt-1">{LEVEL_LABELS[level]}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#005ffe] bg-[#005ffe]/10 px-3 py-1 rounded-full capitalize">
                    {billingType}
                  </span>
                </div>
                <div className="rounded-2xl border border-[#eef2ff] bg-[#f8fbff] p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Estimated invoice</span>
                    <span className="text-xl font-semibold text-[#0A3059]">{formatRwf(estimatorSummary.amountRwf)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Credits unlocked</span>
                    <span className="text-base font-semibold text-[#005ffe]">
                      {numberFormatter.format(baselinePages)} pages
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00cd90] to-[#005ffe]"
                      style={{ width: `${Math.min(100, (baselinePages / 10000) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-[#eef2ff] p-4">
                    <p className="text-gray-500 mb-1">Unit rate</p>
                    <p className="text-lg font-semibold">{formatRwf(effectiveUnitRate)}</p>
                    <p className="text-xs text-gray-400">{billingType === 'booklets' ? 'per booklet' : 'per page'}</p>
                  </div>
                  <div className="rounded-2xl border border-[#eef2ff] p-4">
                    <p className="text-gray-500 mb-1">Minimum top-up</p>
                    <p className="text-lg font-semibold">{formatRwf(MINIMUM_CHARGE_RWF)}</p>
                    <p className="text-xs text-gray-400">once per wallet</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Audit-ready ledger</span>
                  <span>Webhook receipts enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Level matrix & bundles */}
        <section ref={matrixRef} className="py-16 lg:py-20 bg-white">
          <div className="container-custom px-4">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-3">LEVEL-BASED PRICING</p>
              <h2 className="text-3xl font-semibold leading-tight mb-4">Transparent tariffs for every curriculum.</h2>
              <p className="text-gray-600">
                Choose the level that matches your scripts. You can mix levels inside the same wallet; Domax tracks
                consumption for you.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.keys(PAGE_PRICES).map((key) => (
                <div
                  key={key}
                  data-animate="matrix-card"
                  className="rounded-3xl border border-[#e0e4ff] bg-gradient-to-b from-white to-[#f8fbff] p-6 shadow-[0_30px_80px_-60px_rgba(10,48,89,0.9)]"
                >
                  <div className="mb-4">
                    <p className="text-xs uppercase text-gray-500 tracking-[0.2em]">{LEVEL_LABELS[key]}</p>
                    <h3 className="text-2xl font-semibold mt-2">{formatRwf(PAGE_PRICES[key])} / page</h3>
                    <p className="text-gray-500 mt-1">{levelMeta[key].blurb}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Booklet processing</span>
                      <span className="font-semibold text-[#0A3059]">{formatRwf(BOOKLET_PRICES[key])}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Bundle effective rate</span>
                      <span className="font-semibold text-[#005ffe]">
                        {formatRwf(Math.round(BUNDLE_OFFERS[BUNDLE_OFFERS.length - 1].amount / BUNDLE_OFFERS[BUNDLE_OFFERS.length - 1].pages))}/page
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    {levelMeta[key].highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00cd90]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" onClick={() => setLevel(key)}>
                    Align wallet to {LEVEL_LABELS[key]}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-[32px] border border-[#dfe7f5] bg-[#f8fbff] p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                  <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-2">BUNDLES</p>
                  <h3 className="text-2xl font-semibold">Prefund larger campaigns in one click.</h3>
                  <p className="text-gray-600 mt-2">
                    Bundles load thousands of pages instantly with detailed receipts for your budgeting or reimbursement workflow.
                  </p>
                </div>
                <Button variant="primary" size="sm" href="/contact">
                  Chat with a Domax coach
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {BUNDLE_OFFERS.map((bundle, idx) => (
                  <label
                    key={bundle.amount}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                      bundleIndex === idx
                        ? 'border-[#005ffe] bg-white shadow-lg shadow-[#005ffe]/10'
                        : 'border-[#dfe7f5] bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase text-gray-500">Bundle value</p>
                        <p className="text-xl font-semibold">{formatRwf(bundle.amount)}</p>
                      </div>
                      <input
                        type="radio"
                        name="bundle"
                        checked={bundleIndex === idx}
                        onChange={() => setBundleIndex(idx)}
                        className="w-4 h-4 accent-[#005ffe]"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Credits delivered:{' '}
                      <span className="font-semibold text-[#0A3059]">
                        {numberFormatter.format(bundle.pages)} pages
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Effective rate {formatRwf(Math.round(bundle.amount / bundle.pages))} / page
                    </p>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section ref={estimatorRef} className="py-16 lg:py-24 bg-gradient-to-b from-[#F5F9FF] to-white">
          <div className="container-custom px-4">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-3">ESTIMATOR</p>
              <h2 className="text-3xl font-semibold leading-tight mb-4">Model your spend in seconds.</h2>
              <p className="text-gray-600">
                Adjust pages, booklets, or bundle size. Domax enforces minimums automatically and shows how many credits
                hit your wallet before you pay.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#dfe7f5] bg-white/80 backdrop-blur-lg shadow-[0_50px_120px_-80px_rgba(0,95,254,0.8)] p-6 lg:p-10">
              <div className="flex flex-wrap gap-3 mb-8">
                {billingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setBillingType(mode.id)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                      billingType === mode.id
                        ? 'bg-[#005ffe] text-white shadow-lg shadow-[#005ffe]/20'
                        : 'bg-[#f0f7ff] text-[#0A3059]'
                    }`}
                  >
                    {mode.label}
                    {mode.badge && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-white/80">{mode.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.keys(LEVEL_LABELS).map((key) => (
                        <button
                          key={key}
                          onClick={() => setLevel(key)}
                          className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-all ${
                            level === key
                              ? 'border-[#005ffe] bg-[#005ffe]/10 text-[#005ffe]'
                              : 'border-[#e0e4ff] text-[#0A3059]'
                          }`}
                        >
                          {LEVEL_LABELS[key]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {billingType === 'pages' && (
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Pages to grade</span>
                        <span className="font-semibold text-[#0A3059]">{numberFormatter.format(pages)}</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="20000"
                        step="50"
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-full accent-[#005ffe]"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>100</span>
                        <span>20k</span>
                      </div>
                    </div>
                  )}

                  {billingType === 'booklets' && (
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Booklets per cycle</span>
                        <span className="font-semibold text-[#0A3059]">{numberFormatter.format(booklets)}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        step="5"
                        value={booklets}
                        onChange={(e) => setBooklets(Number(e.target.value))}
                        className="w-full accent-[#005ffe]"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>10</span>
                        <span>500</span>
                      </div>
                    </div>
                  )}

                  {billingType === 'bundle' && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-3">Select bundle</p>
                      <div className="space-y-3">
                        {BUNDLE_OFFERS.map((bundle, idx) => (
                          <button
                            key={bundle.amount}
                            onClick={() => setBundleIndex(idx)}
                            className={`w-full text-left rounded-2xl border px-4 py-3 transition-all ${
                              bundleIndex === idx
                                ? 'border-[#005ffe] bg-[#005ffe]/5 text-[#005ffe]'
                                : 'border-[#dfe7f5] text-[#0A3059]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-sm">
                              <span>{formatRwf(bundle.amount)}</span>
                              <span>{numberFormatter.format(bundle.pages)} pages</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-[#e0e4ff] bg-[#f8fbff] p-6 space-y-5">
                  <div>
                    <p className="text-xs uppercase text-gray-500 tracking-[0.25em] mb-2">Estimated charge</p>
                    <p className="text-4xl font-semibold leading-tight">{formatRwf(estimatorSummary.amountRwf)}</p>
                    <p className="text-gray-500 text-sm mt-2">Minimum enforced automatically</p>
                  </div>
                  <div className="rounded-2xl border border-white bg-white p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Credits delivered</span>
                      <span className="text-lg font-semibold text-[#005ffe]">
                        {numberFormatter.format(estimatorSummary.pagesCredited || booklets * 12 || selectedBundle?.pages || 0)}{' '}
                        pages
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      For booklets we approximate 12 pages per booklet for forecasting purposes.
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Unit rate</span>
                      <span className="font-semibold">{formatRwf(effectiveUnitRate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wallet minimum</span>
                      <span className="font-semibold">{formatRwf(MINIMUM_CHARGE_RWF)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto top-up ready</span>
                      <span className="font-semibold text-[#00cd90]">Yes</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button variant="primary" size="md" href="/dashboard">
                      Purchase credits
                    </Button>
                    <Button variant="outline" size="md" href="/contact">
                      Export quote PDF
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Need procurement paperwork? Our team issues signed invoices the moment you trigger a wallet load.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guardrails */}
        <section className="py-16 bg-white">
          <div className="container-custom px-4">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-3">USAGE GUARDRAILS</p>
              <h2 className="text-3xl font-semibold leading-tight mb-4">Finance-grade controls built in.</h2>
              <p className="text-gray-600">
                Every wallet is audit ready with approvals, role-based limits, and automated digests so procurement sleeps
                easy.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {guardrails.map((item) => (
                <div key={item.title} className="rounded-3xl border border-[#e0e4ff] p-6 bg-gradient-to-b from-white to-[#f8fbff]">
                  <div className="w-12 h-12 rounded-2xl bg-[#005ffe]/10 text-[#005ffe] flex items-center justify-center mb-4 text-xl">
                    •
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="py-16 lg:py-20 bg-[#f5f9ff]">
          <div className="container-custom px-4">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-3">FAQ</p>
              <h2 className="text-3xl font-semibold leading-tight mb-4">Answers that shorten your procurement cycle.</h2>
              <p className="text-gray-600">Still unsure? Our billing engineers can join your finance call.</p>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq) => {
                const open = activeFaq === faq.id
                return (
                  <div
                    key={faq.id}
                    data-animate="faq"
                    className="rounded-3xl border border-[#dfe7f5] bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(open ? null : faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <div>
                        <p className="text-lg font-semibold">{faq.question}</p>
                      </div>
                      <span className="text-2xl text-[#005ffe]">{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] text-[#0A3059] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-0 w-80 h-80 bg-gradient-to-br from-[#00cd90] to-transparent blur-[120px] opacity-40" />
            <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-gradient-to-tr from-[#005ffe] to-transparent blur-[160px] opacity-30" />
          </div>
          <div className="container-custom relative z-10 text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Ready to connect grading to your finance stack?
            </h2>
            <p className="text-base sm:text-lg text-[#0A3059]/70 max-w-2xl mx-auto mb-8">
              Spin up a wallet, invite teachers, and watch Domax reconcile every paper automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button variant="primary" size="md" href="/signup">
                Start free workspace
              </Button>
              <Button variant="outline" size="md" href="/contact">
                Schedule pricing review
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
