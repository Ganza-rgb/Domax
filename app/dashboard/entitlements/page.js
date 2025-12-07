'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'

export default function EntitlementsPage() {
  const [teacherForm, setTeacherForm] = useState({ seats: 5, ttlHours: 72, note: '' })
  const [institutionForm, setInstitutionForm] = useState({ seats: 150, ttlHours: 120, campuses: 3 })
  const [teacherResult, setTeacherResult] = useState(null)
  const [institutionResult, setInstitutionResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTeacherGenerate = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/verify-access-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          persona: 'teacher',
          seatLimit: teacherForm.seats,
          ttlMinutes: teacherForm.ttlHours * 60,
          metadata: { cohort: teacherForm.note || undefined, createdBy: 'dashboard' },
        }),
      })
      const result = await response.json()
      setTeacherResult(result.entitlement)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInstitutionGenerate = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/verify-access-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          persona: 'institution',
          seatLimit: institutionForm.seats,
          ttlMinutes: institutionForm.ttlHours * 60,
          metadata: { campuses: institutionForm.campuses, createdBy: 'dashboard' },
        }),
      })
      const result = await response.json()
      setInstitutionResult(result.entitlement)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-surface-neutral py-24">
      <div className="container-custom space-y-10">
        <header>
          <p className="text-xs uppercase font-semibold text-brand-primary-blue">Entitlement studio</p>
          <h1 className="text-4xl font-bold text-[#0A3059] mt-2">Generate codes for teachers & boards</h1>
          <p className="text-text-muted max-w-2xl mt-3">
            Issue time-boxed access codes for teachers and exam institutions. Every code inherits download or seat limits plus
            automatic expiration windows.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-400">Teacher cohort</p>
              <h2 className="text-2xl font-semibold text-[#0A3059]">Small group onboarding</h2>
            </div>
            <label className="text-sm font-semibold text-[#0A3059]">
              Seats
              <input
                type="number"
                min={1}
                value={teacherForm.seats}
                onChange={(e) => setTeacherForm((prev) => ({ ...prev, seats: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <label className="text-sm font-semibold text-[#0A3059]">
              Expires in (hours)
              <input
                type="number"
                min={1}
                value={teacherForm.ttlHours}
                onChange={(e) => setTeacherForm((prev) => ({ ...prev, ttlHours: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <label className="text-sm font-semibold text-[#0A3059]">
              Cohort note
              <input
                type="text"
                value={teacherForm.note}
                onChange={(e) => setTeacherForm((prev) => ({ ...prev, note: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <Button variant="primary" onClick={handleTeacherGenerate} disabled={isSubmitting}>
              {isSubmitting ? 'Generating…' : 'Generate teacher code'}
            </Button>
            {teacherResult && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <p className="font-semibold">{teacherResult.code}</p>
                <p>
                  Seats: {teacherResult.seatLimit} · Expires {new Date(teacherResult.expiresAt).toLocaleString()}
                </p>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-400">Institutions</p>
              <h2 className="text-2xl font-semibold text-[#0A3059]">Board-level provisioning</h2>
            </div>
            <label className="text-sm font-semibold text-[#0A3059]">
              Seats
              <input
                type="number"
                min={50}
                value={institutionForm.seats}
                onChange={(e) => setInstitutionForm((prev) => ({ ...prev, seats: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <label className="text-sm font-semibold text-[#0A3059]">
              Campuses covered
              <input
                type="number"
                min={1}
                value={institutionForm.campuses}
                onChange={(e) => setInstitutionForm((prev) => ({ ...prev, campuses: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <label className="text-sm font-semibold text-[#0A3059]">
              Expires in (hours)
              <input
                type="number"
                min={24}
                value={institutionForm.ttlHours}
                onChange={(e) => setInstitutionForm((prev) => ({ ...prev, ttlHours: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
              />
            </label>
            <Button variant="primary" onClick={handleInstitutionGenerate} disabled={isSubmitting}>
              {isSubmitting ? 'Generating…' : 'Generate institution code'}
            </Button>
            {institutionResult && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-brand-primary-blue">
                <p className="font-semibold">{institutionResult.code}</p>
                <p>
                  Seats: {institutionResult.seatLimit} · Campuses: {institutionResult.metadata?.campuses || institutionForm.campuses}
                </p>
                <p>Expires {new Date(institutionResult.expiresAt).toLocaleString()}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}




