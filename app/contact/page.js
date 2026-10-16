'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/molecules/Navbar'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Footer from '@/components/organisms/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contactIntents = [
  {
    id: 'sales',
    label: 'Talk to sales',
    description: 'Solo teachers, small collectives, or sponsorship requests.',
    sla: '< 2 hours',
    inbox: 'sales@domax.com',
    prompt: 'Share your grading load, number of classes, and any reimbursement needs.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M8 11h8M8 15h5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'Customer support',
    description: 'Existing workspaces, billing, or entitlements.',
    sla: '15 min • 24/7',
    inbox: 'support@domax.com',
    prompt: 'Describe the assignment, wallet, or past-paper unlock that needs attention.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path
          d="M12 17h.01M5.5 11A6.5 6.5 0 0 1 12 4.5h0A6.5 6.5 0 0 1 18.5 11v1.25a2.25 2.25 0 0 1-2.25 2.25H15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 9v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'partnerships',
    label: 'Partners & integrations',
    description: 'LMS vendors, curriculum creators, teacher communities.',
    sla: 'Same day',
    inbox: 'partners@domax.com',
    prompt: 'Outline your integration surface, API needs, and go-live timeline.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M8 9h8M8 15h8" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          strokeLinecap="round"
        />
        <path d="M9 4v4M15 20v-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const responseFeed = [
  { org: 'Ms. Nyiransabimana (Literature)', type: 'Wallet top-up', status: 'Invoice ready', time: '2m ago' },
  { org: 'Mr. Karekezi (STEM cohort)', type: 'Rubric sync', status: 'Engineer assigned', time: '12m ago' },
  { org: 'Teacher Pod: Kigali Exam Club', type: 'API partnership', status: 'In review', time: '35m ago' },
]

const regionalOffices = [
  { region: 'Kigali', role: 'Teacher Success', hours: '08:00 - 18:00 CAT', phone: '+250 788 000 321' },
  { region: 'Lagos', role: 'Wallet & sponsorship desk', hours: '08:00 - 18:00 WAT', phone: '+234 802 555 1200' },
  { region: 'Remote-first', role: 'Follow-the-sun support', hours: '24/7', phone: '+1 415 555 9811' },
]

export default function ContactPage() {
  const [activeIntent, setActiveIntent] = useState(contactIntents[0].id)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    type: contactIntents[0].id,
    phone: '',
    urgency: 'standard',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

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

    // Form and info cards animation
    if (formRef.current && infoRef.current) {
      const targets = [formRef.current, ...infoRef.current.querySelectorAll('[data-info-card]')]
      gsap.fromTo(
        targets,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
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

  const selectedIntent = contactIntents.find((intent) => intent.id === activeIntent)

  const handleIntentSelect = (intentId) => {
    setActiveIntent(intentId)
    setFormData((prev) => ({ ...prev, type: intentId }))
  }

  return (
    <div className="min-h-screen bg-surface-neutral text-[#0A3059]">
      <Navbar />
      <main className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div ref={headerRef} className="max-w-2xl mb-10 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl font-medium leading-[1.1] tracking-[-0.025em] mb-4">Talk to the Domax team</h1>
              <p className="lede">
                Route your request directly to the squad that can help—sales engineers, billing specialists, or
                integrations.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-ink-2">
                {['24/7 support desks', 'Follow-the-sun coverage', 'SLA-backed responses'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#00cd90]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">
              <div className="space-y-4">
                <fieldset className="rounded-2xl border border-line bg-white p-4 sm:p-5">
                  <legend className="sr-only">Choose an intent</legend>
                  <p className="text-sm font-semibold text-ink mb-3">What can we help with?</p>
                  <div className="grid sm:grid-cols-3 gap-2.5">
                    {contactIntents.map((intent) => {
                      const active = intent.id === activeIntent
                      return (
                        <button
                          key={intent.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleIntentSelect(intent.id)}
                          className={`text-left rounded-xl border p-3.5 transition-all flex flex-col gap-1.5 ${
                            active
                              ? 'border-[#005ffe] bg-[#F0F7FF] ring-1 ring-[#005ffe]'
                              : 'border-line hover:border-line-strong bg-white'
                          }`}
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 ${active ? 'bg-[#005ffe] text-white' : 'bg-[#F0F7FF] text-[#005ffe]'}`}>
                              {intent.icon}
                            </span>
                            {intent.label}
                          </span>
                          <span className="text-[13px] leading-snug text-ink-2">{intent.description}</span>
                          <span className="text-xs text-ink-3 tabular-nums">
                            Response: {intent.sla}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div ref={formRef}>
                  <Card className="p-5 sm:p-7" hover={false}>
                    <h2 className="text-xl sm:text-2xl font-medium mb-6">
                      {selectedIntent?.label || 'Reach out'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                            Name <span className="text-ink-3" aria-hidden="true">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-[#005ffe] focus:ring-2 focus:ring-brand-primary-blue/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                            Email <span className="text-ink-3" aria-hidden="true">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-[#005ffe] focus:ring-2 focus:ring-brand-primary-blue/20 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-ink mb-1.5">
                            Class / community <span className="font-normal text-ink-3">(optional)</span>
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="e.g., Kigali Lit Circle, Grade 11 STEM pod"
                            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-[#005ffe] focus:ring-2 focus:ring-brand-primary-blue/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-[#005ffe] focus:ring-2 focus:ring-brand-primary-blue/20 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <p id="urgency-label" className="block text-sm font-medium text-ink mb-1.5">Urgency</p>
                        <div className="inline-flex p-1 rounded-lg bg-[#F6F8FA] border border-line" role="group" aria-labelledby="urgency-label">
                          {[
                            { id: 'standard', label: 'Standard' },
                            { id: 'priority', label: 'Priority' },
                            { id: 'critical', label: 'Critical' },
                          ].map((option) => (
                            <button
                              type="button"
                              key={option.id}
                              aria-pressed={formData.urgency === option.id}
                              onClick={() => setFormData((prev) => ({ ...prev, urgency: option.id }))}
                              className={`px-3.5 h-8 rounded-md text-sm font-medium ${
                                formData.urgency === option.id
                                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(10,48,89,0.12)]'
                                  : 'text-ink-2 hover:text-ink'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                          Message <span className="text-ink-3" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={selectedIntent?.prompt}
                          className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-[#005ffe] focus:ring-2 focus:ring-brand-primary-blue/20 transition-colors h-auto py-3 leading-relaxed"
                        />
                      </div>

                      {submitted && (
                        <div role="status" className="flex items-center gap-2.5 p-3.5 bg-positive-soft border border-[#BFEBDD] rounded-lg text-sm font-medium text-positive">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          Thank you! We'll get back to you soon.
                        </div>
                      )}

                      <Button type="submit" size="lg" className="w-full">
                        Send message
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>

              <div ref={infoRef} className="space-y-4">
                <div data-info-card className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                  <p className="sky-label mb-2">Current route</p>
                  <h3 className="text-lg font-semibold mb-1">{selectedIntent?.label}</h3>
                  <p className="text-sm text-ink-2 mb-5">{selectedIntent?.description}</p>
                  <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-line text-sm">
                    <div>
                      <dt className="text-ink-3 mb-0.5">Response time</dt>
                      <dd className="font-semibold text-ink tabular-nums">{selectedIntent?.sla}</dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-ink-3 mb-0.5">Primary inbox</dt>
                      <dd><a className="font-semibold text-[#005ffe] hover:underline break-all" href={`mailto:${selectedIntent?.inbox}`}>
                        {selectedIntent?.inbox}
                      </a></dd>
                    </div>
                  </dl>
                </div>

                <Card data-info-card className="p-5 sm:p-6" hover={false}>
                  <h3 className="text-base font-semibold mb-4">Live response board</h3>
                  <ul className="divide-y divide-line text-sm">
                    {responseFeed.map((item) => (
                      <li key={item.org} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                        <span className="w-2 h-2 rounded-full bg-[#00cd90] mt-1.5 flex-shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <p className="text-ink font-semibold">{item.org}</p>
                          <p className="text-ink-2">{item.type} • {item.status}</p>
                        </div>
                        <span className="text-xs text-ink-3 whitespace-nowrap">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card data-info-card className="p-5 sm:p-6" hover={false}>
                  <h3 className="text-base font-semibold mb-4">Regional contact points</h3>
                  <ul className="divide-y divide-line text-sm">
                    {regionalOffices.map((office) => (
                      <li key={office.region} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-ink font-semibold">{office.region}</p>
                          <p className="text-ink-2">{office.role}</p>
                          <p className="text-xs text-ink-3 mt-0.5">{office.hours}</p>
                        </div>
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-[13px] font-medium text-[#005ffe] hover:underline whitespace-nowrap tabular-nums">{office.phone}</a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
