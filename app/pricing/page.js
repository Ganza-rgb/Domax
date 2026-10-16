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
          className="pt-32 sm:pt-36 pb-16 lg:pb-24 bg-[linear-gradient(180deg,#F0F7FF_0%,#FFFFFF_60%)]"
        >
          <div className="container-custom grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div data-animate="hero">
              <p className="eyebrow mb-4">Pricing</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-medium leading-[1.08] tracking-[-0.025em] mb-5">
                Precision grading,
                <br />
                only pay for what you use.
              </h1>
              <p className="lede mb-8 max-w-xl">
                Wallet-based billing tuned for solo teachers—load only what you need, invite unlimited students for free, and export clean receipts for reimbursement or tax purposes.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-10">
                <Button variant="primary" size="lg" href="/signup">
                  Launch Domax
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Talk to billing
                </Button>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-xl overflow-hidden border border-line bg-line" data-animate="hero">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white px-4 py-3.5"
                  >
                    <dt className="text-xs text-ink-3 mb-0.5">{stat.label}</dt>
                    <dd className="text-base font-semibold text-ink tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              data-animate="hero"
              className="bg-white rounded-2xl border border-line shadow-pop p-6 lg:p-7 relative overflow-hidden"
            >
              <div className="relative z-10 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-ink-3">Live wallet preview</p>
                    <p className="text-lg font-semibold mt-0.5">{LEVEL_LABELS[level]}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#005ffe] bg-[#F0F7FF] border border-[#D6E6FF] px-2.5 py-1 rounded-md capitalize">
                    {billingType}
                  </span>
                </div>
                <div className="rounded-xl bg-[#F6F8FA] p-4 space-y-3">
                  <div className="flex items-baseline justify-between text-sm text-ink-2">
                    <span>Estimated invoice</span>
                    <span className="text-2xl font-semibold text-ink tabular-nums">{formatRwf(estimatorSummary.amountRwf)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-ink-2">
                    <span>Credits unlocked</span>
                    <span className="font-semibold text-ink tabular-nums">
                      {numberFormatter.format(baselinePages)} pages
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E3E8EF] overflow-hidden" role="presentation">
                    <div
                      className="h-full rounded-full bg-[#005ffe]"
                      style={{ width: `${Math.min(100, (baselinePages / 10000) * 100)}%` }}
                    />
                  </div>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-line border-y border-line text-sm">
                  <div className="py-3.5 pr-4">
                    <dt className="text-ink-3 mb-0.5">Unit rate</dt>
                    <dd className="text-lg font-semibold tabular-nums">{formatRwf(effectiveUnitRate)}</dd>
                    <dd className="text-xs text-ink-3">{billingType === 'booklets' ? 'per booklet' : 'per page'}</dd>
                  </div>
                  <div className="py-3.5 pl-4">
                    <dt className="text-ink-3 mb-0.5">Minimum top-up</dt>
                    <dd className="text-lg font-semibold tabular-nums">{formatRwf(MINIMUM_CHARGE_RWF)}</dd>
                    <dd className="text-xs text-ink-3">once per wallet</dd>
                  </div>
                </dl>
                <div className="flex items-center justify-between text-xs text-ink-3">
                  <span>Audit-ready ledger</span>
                  <span>Webhook receipts enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Level matrix & bundles */}
        <section ref={matrixRef} className="section-spacing bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Level-based pricing</p>
              <h2 className="text-3xl sm:text-4xl font-medium mb-4">Transparent tariffs for every curriculum.</h2>
              <p className="lede">
                Choose the level that matches your scripts. You can mix levels inside the same wallet; Domax tracks
                consumption for you.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {Object.keys(PAGE_PRICES).map((key) => (
                <div
                  key={key}
                  data-animate="matrix-card"
                  className={`rounded-2xl border bg-white p-6 sm:p-7 flex flex-col transition-colors ${
                    level === key ? 'border-[#005ffe] ring-1 ring-[#005ffe]' : 'border-line'
                  }`}
                >
                  <div className="mb-5">
                    <p className="text-sm font-medium text-ink-2">{LEVEL_LABELS[key]}</p>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold font-headline tracking-tight tabular-nums">{formatRwf(PAGE_PRICES[key])}</span>
                      <span className="text-sm text-ink-3">/ page</span>
                    </p>
                    <p className="text-[15px] text-ink-2 mt-3 leading-relaxed">{levelMeta[key].blurb}</p>
                  </div>
                  <dl className="divide-y divide-line border-y border-line mb-5 text-sm">
                    <div className="flex justify-between py-2.5">
                      <dt className="text-ink-2">Booklet processing</dt>
                      <dd className="font-semibold text-ink tabular-nums">{formatRwf(BOOKLET_PRICES[key])}</dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-ink-2">Bundle effective rate</dt>
                      <dd className="font-semibold text-ink tabular-nums">
                        {formatRwf(Math.round(BUNDLE_OFFERS[BUNDLE_OFFERS.length - 1].amount / BUNDLE_OFFERS[BUNDLE_OFFERS.length - 1].pages))}/page
                      </dd>
                    </div>
                  </dl>
                  <ul className="space-y-2 text-sm text-ink-2 mb-6">
                    {levelMeta[key].highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2.5">
                        <svg className="w-3.5 h-3.5 text-[#007A56] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={level === key ? 'primary' : 'secondary'}
                    size="md"
                    className="mt-auto w-full"
                    onClick={() => setLevel(key)}
                    aria-pressed={level === key}
                  >
                    {level === key ? 'Wallet aligned' : `Align wallet to ${LEVEL_LABELS[key]}`}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-line bg-[#F6F8FA] p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
                <div className="max-w-xl">
                  <p className="eyebrow mb-2">Bundles</p>
                  <h3 className="text-2xl font-semibold">Prefund larger campaigns in one click.</h3>
                  <p className="text-ink-2 mt-2 leading-relaxed">
                    Bundles load thousands of pages instantly with detailed receipts for your budgeting or reimbursement workflow.
                  </p>
                </div>
                <Button variant="secondary" size="md" href="/contact">
                  Chat with a Domax coach
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-3" role="radiogroup" aria-label="Bundle">
                {BUNDLE_OFFERS.map((bundle, idx) => (
                  <label
                    key={bundle.amount}
                    className={`rounded-xl border p-4 cursor-pointer transition-all bg-white ${
                      bundleIndex === idx
                        ? 'border-[#005ffe] ring-1 ring-[#005ffe]'
                        : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-ink-3">Bundle value</p>
                        <p className="text-xl font-semibold tabular-nums">{formatRwf(bundle.amount)}</p>
                      </div>
                      <input
                        type="radio"
                        name="bundle"
                        checked={bundleIndex === idx}
                        onChange={() => setBundleIndex(idx)}
                        className="w-4 h-4 mt-1 accent-[#005ffe]"
                      />
                    </div>
                    <p className="text-sm text-ink-2">
                      Credits delivered:{' '}
                      <span className="font-semibold text-ink tabular-nums">
                        {numberFormatter.format(bundle.pages)} pages
                      </span>
                    </p>
                    <p className="text-xs text-ink-3 mt-1 tabular-nums">
                      Effective rate {formatRwf(Math.round(bundle.amount / bundle.pages))} / page
                    </p>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Estimator */}
        <section ref={estimatorRef} className="section-spacing bg-[#F6F8FA] border-y border-line">
          <div className="container-custom">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Estimator</p>
              <h2 className="text-3xl sm:text-4xl font-medium mb-4">Model your spend in seconds.</h2>
              <p className="lede">
                Adjust pages, booklets, or bundle size. Domax enforces minimums automatically and shows how many credits
                hit your wallet before you pay.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white overflow-hidden grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-6 lg:p-8 space-y-7">
                <div>
                  <p id="billing-mode-label" className="text-sm font-semibold text-ink mb-2.5">Billing mode</p>
                  <div className="inline-flex flex-wrap p-1 rounded-lg bg-[#F6F8FA] border border-line" role="group" aria-labelledby="billing-mode-label">
                    {billingModes.map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        aria-pressed={billingType === mode.id}
                        onClick={() => setBillingType(mode.id)}
                        className={`rounded-md px-3.5 h-9 text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                          billingType === mode.id
                            ? 'bg-white text-ink shadow-[0_1px_2px_rgba(10,48,89,0.12)]'
                            : 'text-ink-2 hover:text-ink'
                        }`}
                      >
                        {mode.label}
                        {mode.badge && (
                          <span className="text-[11px] font-semibold text-[#007A56] bg-positive-soft px-1.5 py-0.5 rounded">{mode.badge}</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-ink-3 mt-2">{billingModes.find((mode) => mode.id === billingType)?.description}</p>
                </div>

                <div>
                  <p id="level-label" className="text-sm font-semibold text-ink mb-2.5">Level</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="group" aria-labelledby="level-label">
                    {Object.keys(LEVEL_LABELS).map((key) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={level === key}
                        onClick={() => setLevel(key)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-semibold text-left sm:text-center transition-all ${
                          level === key
                            ? 'border-[#005ffe] bg-[#F0F7FF] text-[#005ffe]'
                            : 'border-line text-ink hover:border-line-strong'
                        }`}
                      >
                        {LEVEL_LABELS[key]}
                      </button>
                    ))}
                  </div>
                </div>

                {billingType === 'pages' && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2.5">
                      <label htmlFor="estimator-pages" className="font-semibold text-ink">Pages to grade</label>
                      <span className="font-semibold text-ink tabular-nums">{numberFormatter.format(pages)}</span>
                    </div>
                    <input
                      id="estimator-pages"
                      type="range"
                      min="100"
                      max="20000"
                      step="50"
                      value={pages}
                      onChange={(e) => setPages(Number(e.target.value))}
                      className="w-full accent-[#005ffe]"
                    />
                    <div className="flex justify-between text-xs text-ink-3 mt-1 tabular-nums">
                      <span>100</span>
                      <span>20k</span>
                    </div>
                  </div>
                )}

                {billingType === 'booklets' && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2.5">
                      <label htmlFor="estimator-booklets" className="font-semibold text-ink">Booklets per cycle</label>
                      <span className="font-semibold text-ink tabular-nums">{numberFormatter.format(booklets)}</span>
                    </div>
                    <input
                      id="estimator-booklets"
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={booklets}
                      onChange={(e) => setBooklets(Number(e.target.value))}
                      className="w-full accent-[#005ffe]"
                    />
                    <div className="flex justify-between text-xs text-ink-3 mt-1 tabular-nums">
                      <span>10</span>
                      <span>500</span>
                    </div>
                  </div>
                )}

                {billingType === 'bundle' && (
                  <div>
                    <p className="text-sm font-semibold text-ink mb-2.5">Select bundle</p>
                    <div className="space-y-2">
                      {BUNDLE_OFFERS.map((bundle, idx) => (
                        <button
                          key={bundle.amount}
                          type="button"
                          aria-pressed={bundleIndex === idx}
                          onClick={() => setBundleIndex(idx)}
                          className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                            bundleIndex === idx
                              ? 'border-[#005ffe] bg-[#F0F7FF] text-[#005ffe]'
                              : 'border-line text-ink hover:border-line-strong'
                          }`}
                        >
                          <div className="flex items-center justify-between text-sm font-medium tabular-nums">
                            <span>{formatRwf(bundle.amount)}</span>
                            <span>{numberFormatter.format(bundle.pages)} pages</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#0A3059] text-white p-6 lg:p-8 flex flex-col gap-5" aria-live="polite">
                <div>
                  <p className="text-sm text-white/70 mb-1">Estimated charge</p>
                  <p className="text-4xl sm:text-5xl font-semibold font-headline tracking-tight tabular-nums text-white">{formatRwf(estimatorSummary.amountRwf)}</p>
                  <p className="text-white/60 text-sm mt-2">Minimum enforced automatically</p>
                </div>
                <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-white/70">Credits delivered</dt>
                    <dd className="font-semibold tabular-nums">
                      {numberFormatter.format(estimatorSummary.pagesCredited || booklets * 12 || selectedBundle?.pages || 0)}{' '}
                      pages
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-white/70">Unit rate</dt>
                    <dd className="font-semibold tabular-nums">{formatRwf(effectiveUnitRate)}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-white/70">Wallet minimum</dt>
                    <dd className="font-semibold tabular-nums">{formatRwf(MINIMUM_CHARGE_RWF)}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-white/70">Auto top-up ready</dt>
                    <dd className="font-semibold text-[#7FE3C3]">Yes</dd>
                  </div>
                </dl>
                <p className="text-xs text-white/60 -mt-2">
                  For booklets we approximate 12 pages per booklet for forecasting purposes.
                </p>
                <div className="flex flex-col gap-2.5 mt-auto">
                  <Button variant="primary-blue" size="lg" href="/dashboard">
                    Purchase credits
                  </Button>
                  <Button variant="light" size="lg" href="/contact">
                    Export quote PDF
                  </Button>
                </div>
                <p className="text-xs text-white/60">
                  Need procurement paperwork? Our team issues signed invoices the moment you trigger a wallet load.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guardrails */}
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
              <div>
                <p className="eyebrow mb-3">Usage guardrails</p>
                <h2 className="text-3xl sm:text-4xl font-medium mb-4">Finance-grade controls built in.</h2>
                <p className="lede">
                  Every wallet is audit ready with approvals, role-based limits, and automated digests so procurement sleeps
                  easy.
                </p>
              </div>
              <ol className="divide-y divide-line border-y border-line">
                {guardrails.map((item, index) => (
                  <li key={item.title} className="py-6 grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="text-sm font-semibold text-[#005ffe] tabular-nums pt-1">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg font-semibold mb-1.5">{item.title}</h3>
                      <p className="text-ink-2 leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={faqRef} className="section-spacing bg-[#F6F8FA] border-t border-line">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
              <div>
                <p className="eyebrow mb-3">FAQ</p>
                <h2 className="text-3xl sm:text-4xl font-medium mb-4">Answers that shorten your procurement cycle.</h2>
                <p className="lede">Still unsure? Our billing engineers can join your finance call.</p>
              </div>
              <div className="divide-y divide-line border-y border-line">
                {faqItems.map((faq) => {
                  const open = activeFaq === faq.id
                  return (
                    <div
                      key={faq.id}
                      data-animate="faq"
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`faq-${faq.id}`}
                        onClick={() => setActiveFaq(open ? null : faq.id)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left rounded-md"
                      >
                        <span className="text-base sm:text-lg font-semibold">{faq.question}</span>
                        <span aria-hidden="true" className="w-7 h-7 rounded-full border border-line-strong flex items-center justify-center text-ink-2 flex-shrink-0">
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                            <path d="M2 6h8" />
                            {!open && <path d="M6 2v8" />}
                          </svg>
                        </span>
                      </button>
                      {open && (
                        <div id={`faq-${faq.id}`} className="pb-6 pr-12 text-ink-2 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A3059] text-white">
          <div className="container-custom py-20 sm:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 max-w-2xl mx-auto">
              Ready to connect grading to your finance stack?
            </h2>
            <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto mb-9">
              Spin up a wallet, invite teachers, and watch Domax reconcile every paper automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary-blue" size="xl" href="/signup">
                Start free workspace
              </Button>
              <Button variant="light" size="xl" href="/contact">
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
