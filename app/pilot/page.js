'use client'

import { useState } from 'react'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import { Tick } from '@/components/site/ProductVisuals'
import { CONTACT_EMAIL, mailtoLink } from '@/lib/site'

const institutionTypes = [
  'University or polytechnic',
  'Private secondary school',
  'Public secondary school',
  'NGO, sponsor or district',
  'Other',
]

const roles = [
  'Head teacher or principal',
  'Director of studies',
  'Head of department or lecturer',
  'Exams officer or registrar',
  'Programme manager (NGO or district)',
  'Teacher',
  'Other',
]

const inputClass =
  'w-full h-12 px-4 bg-white border border-line-strong rounded-xl text-[15px] text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10'

const asks = [
  'A set of past scripts in two subjects, with consent arranged through you.',
  'Two experienced teachers to mark them independently. We pay for their time.',
  'One live assessment per subject, marked with Domax and signed off by your teachers.',
  'An honest conversation at the end about whether it was worth it.',
]

function Field({ id, label, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {optional && <span className="font-normal text-ink-3"> (optional)</span>}
      </label>
      {children}
    </div>
  )
}

export default function PilotPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    type: '',
    role: '',
    subjects: '',
    scripts: '',
    notes: '',
  })
  const [opened, setOpened] = useState(false)

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    window.location.href = mailtoLink(`Pilot request: ${form.institution}`, [
      ['Name', form.name],
      ['Email', form.email],
      ['Phone', form.phone],
      ['Institution', form.institution],
      ['Type', form.type],
      ['Role', form.role],
      ['Subjects to try', form.subjects],
      ['Scripts marked per term (approx.)', form.scripts],
      ['Notes', form.notes],
    ])
    setOpened(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(60%_70%_at_30%_0%,#E8F0FF_0%,rgba(232,240,255,0)_100%)]"
        />
        <div className="container-custom relative grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,36rem)] gap-14 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="kicker">Pilot</p>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.04em] text-ink mt-4">
              Request a pilot.
            </h1>
            <p className="lede mt-6 max-w-md">
              We’re choosing a small number of pilot sites in Rwanda: universities, polytechnics and
              secondary schools, and the sponsors who support them.
            </p>
            <h2 className="text-xl mt-12">What we’ll ask of you</h2>
            <ul className="mt-5 space-y-4">
              {asks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] text-ink-2 leading-relaxed max-w-md">
                  <Tick className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-ink-3 leading-relaxed mt-8 max-w-md">
              Before any real student data is used, we sign a data-sharing agreement with you. Nothing about
              your students leaves Rwanda without the authorisation the law requires.
            </p>
          </div>

          <div>
            {opened ? (
              <div className="rounded-[28px] border border-line bg-white p-7 sm:p-10 shadow-[0_30px_60px_-40px_rgba(10,48,89,0.4)]">
                <h2 className="text-2xl">Your email app should have opened</h2>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
                  Your details are in a new message to {CONTACT_EMAIL}. Press send and we’ll reply
                  within a few working days. If nothing opened, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setOpened(false)}
                  className="mt-5 text-sm text-ink-3 underline underline-offset-2 hover:text-ink"
                >
                  Back to the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-[28px] border border-line bg-white p-6 sm:p-10 space-y-5 shadow-[0_30px_60px_-40px_rgba(10,48,89,0.4)]">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Your name">
                    <input id="name" name="name" required autoComplete="name" value={form.name} onChange={update} className={inputClass} />
                  </Field>
                  <Field id="role" label="Your role">
                    <select id="role" name="role" required value={form.role} onChange={update} className={inputClass}>
                      <option value="" disabled>Choose one</option>
                      {roles.map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="email" label="Email">
                    <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} className={inputClass} />
                  </Field>
                  <Field id="phone" label="Phone or WhatsApp" optional>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} className={inputClass} />
                  </Field>
                </div>
                <Field id="institution" label="Institution">
                  <input id="institution" name="institution" required autoComplete="organization" value={form.institution} onChange={update} className={inputClass} />
                </Field>
                <Field id="type" label="Type of institution">
                  <select id="type" name="type" required value={form.type} onChange={update} className={inputClass}>
                    <option value="" disabled>Choose one</option>
                    {institutionTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="subjects" label="Subjects you’d like to try" optional>
                    <input id="subjects" name="subjects" placeholder="e.g. Physics, English" value={form.subjects} onChange={update} className={inputClass} />
                  </Field>
                  <Field id="scripts" label="Scripts marked per term" optional>
                    <input id="scripts" name="scripts" inputMode="numeric" placeholder="Roughly" value={form.scripts} onChange={update} className={inputClass} />
                  </Field>
                </div>
                <Field id="notes" label="Anything else we should know" optional>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={update}
                    className={`${inputClass} h-auto py-2.5`}
                  />
                </Field>
                <div className="pt-1">
                  <Button type="submit" size="xl" className="w-full">
                    Send request
                  </Button>
                  <p className="text-xs text-ink-3 mt-3">
                    This opens a pre-filled email to {CONTACT_EMAIL} in your email app.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
