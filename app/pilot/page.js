'use client'

import { useState } from 'react'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
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
  'w-full h-11 px-3.5 bg-white border border-line-strong rounded-md text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15'

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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,34rem)] gap-12 lg:gap-20">
          <div className="max-w-md">
            <h1 className="text-4xl sm:text-5xl text-ink">Request a pilot</h1>
            <p className="lede mt-5">
              We’re choosing a small number of pilot sites in Rwanda: universities, polytechnics and
              secondary schools, and the sponsors who support them.
            </p>
            <h2 className="text-xl mt-10">What we’ll ask of you</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-ink-2 leading-relaxed list-disc pl-5 marker:text-ink-3">
              <li>A set of past scripts in two subjects, with student consent arranged through you.</li>
              <li>Two experienced teachers to mark them independently. We pay for their time.</li>
              <li>One live assessment per subject, marked with Domax and signed off by your teachers.</li>
              <li>An honest conversation at the end about whether it was worth it.</li>
            </ul>
            <p className="text-[15px] text-ink-2 leading-relaxed mt-6">
              Before any real student data is used, we sign a data-sharing agreement with you. Nothing
              about your students leaves Rwanda without the authorisation the law requires.
            </p>
          </div>

          <div>
            {opened ? (
              <div className="rounded-lg border border-line p-6 sm:p-8">
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
              <form onSubmit={handleSubmit} className="rounded-lg border border-line p-5 sm:p-7 space-y-5">
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
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
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
