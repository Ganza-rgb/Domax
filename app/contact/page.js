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
      <main className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto px-4">
            <div ref={headerRef} className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4">Talk to the Domax team</h1>
              <p className="text-base sm:text-lg text-text-muted">
                Route your request directly to the squad that can help—sales engineers, billing specialists, or
                integrations.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#005ffe]">
                <span className="px-4 py-1 rounded-full bg-white border border-white/60">24/7 support desks</span>
                <span className="px-4 py-1 rounded-full bg-white border border-white/60">Follow-the-sun coverage</span>
                <span className="px-4 py-1 rounded-full bg-white border border-white/60">SLA-backed responses</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <div className="space-y-6">
                <div className="rounded-[28px] border border-[#dfe7f5] bg-white p-4 sm:p-6">
                  <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-3">Choose an intent</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {contactIntents.map((intent) => {
                      const active = intent.id === activeIntent
                      return (
                        <button
                          key={intent.id}
                          onClick={() => handleIntentSelect(intent.id)}
                          className={`text-left rounded-2xl border px-4 py-3 transition-all flex flex-col gap-2 ${
                            active
                              ? 'border-[#005ffe] bg-[#005ffe]/10 text-[#005ffe]'
                              : 'border-[#e0e4ff] text-[#0A3059]'
                          }`}
                        >
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#005ffe]">
                              {intent.icon}
                            </span>
                            {intent.label}
                          </span>
                          <span className="text-xs text-gray-500">{intent.description}</span>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                            SLA {intent.sla}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div ref={formRef}>
                  <Card className="p-5 sm:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                      {selectedIntent?.label || 'Reach out'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary-blue focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium mb-2">
                            Class / community (optional)
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="e.g., Kigali Lit Circle, Grade 11 STEM pod"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary-blue focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Urgency</label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { id: 'standard', label: 'Standard' },
                            { id: 'priority', label: 'Priority' },
                            { id: 'critical', label: 'Critical' },
                          ].map((option) => (
                            <button
                              type="button"
                              key={option.id}
                              onClick={() => setFormData((prev) => ({ ...prev, urgency: option.id }))}
                              className={`px-4 py-2 rounded-full border text-sm ${
                                formData.urgency === option.id
                                  ? 'border-[#005ffe] bg-[#005ffe]/10 text-[#005ffe]'
                                  : 'border-gray-200 text-gray-600'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={selectedIntent?.prompt}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary-blue focus:border-transparent"
                        />
                      </div>

                      {submitted && (
                        <div className="p-4 bg-brand-success-start/10 border border-brand-success-start rounded-lg text-brand-success-start">
                          Thank you! We'll get back to you soon.
                        </div>
                      )}

                      <Button type="submit" className="w-full">
                        Send message
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>

              <div ref={infoRef} className="space-y-5">
                <div data-info-card className="rounded-[28px] border border-[#dfe7f5] bg-white p-5">
                  <p className="text-sm font-semibold text-[#005ffe] tracking-[0.3em] mb-2">Current route</p>
                  <h3 className="text-xl font-semibold mb-2">{selectedIntent?.label}</h3>
                  <p className="text-sm text-text-muted mb-4">{selectedIntent?.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">SLA</p>
                      <p className="font-semibold">{selectedIntent?.sla}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Primary inbox</p>
                      <a className="font-semibold text-[#005ffe]" href={`mailto:${selectedIntent?.inbox}`}>
                        {selectedIntent?.inbox}
                      </a>
                    </div>
                  </div>
                </div>

                <Card data-info-card className="p-5">
                  <h3 className="text-lg font-semibold mb-3">Live response board</h3>
                  <ul className="space-y-3 text-sm text-text-muted">
                    {responseFeed.map((item) => (
                      <li key={item.org} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00cd90] mt-2" />
                        <div>
                          <p className="text-[#0A3059] font-semibold">{item.org}</p>
                          <p>{item.type} • {item.status}</p>
                          <p className="text-xs text-gray-400">{item.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card data-info-card className="p-5">
                  <h3 className="text-lg font-semibold mb-3">Regional contact points</h3>
                  <div className="space-y-3 text-sm text-text-muted">
                    {regionalOffices.map((office) => (
                      <div key={office.region} className="border border-[#eef2ff] rounded-2xl p-3">
                        <p className="text-[#0A3059] font-semibold">{office.region}</p>
                        <p>{office.role}</p>
                        <p className="text-xs text-gray-500">{office.hours}</p>
                        <p className="text-xs text-[#005ffe]">{office.phone}</p>
                      </div>
                    ))}
                  </div>
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

