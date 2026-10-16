'use client'

import { useState } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'

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
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Access codes"
        title="Generate codes for teachers & boards"
        subtitle="Issue time-boxed access codes for teachers and exam institutions. Every code inherits download or seat limits plus automatic expiration windows."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        <Panel meta="Teacher cohort" title="Small group onboarding">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="teacher-seats" className={labelClass}>Seats</label>
                <input
                  id="teacher-seats"
                  type="number"
                  min={1}
                  value={teacherForm.seats}
                  onChange={(e) => setTeacherForm((prev) => ({ ...prev, seats: Number(e.target.value) }))}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="teacher-ttl" className={labelClass}>Expires in (hours)</label>
                <input
                  id="teacher-ttl"
                  type="number"
                  min={1}
                  value={teacherForm.ttlHours}
                  onChange={(e) => setTeacherForm((prev) => ({ ...prev, ttlHours: Number(e.target.value) }))}
                  className={fieldClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="teacher-note" className={labelClass}>
                Cohort note <span className="font-normal text-[var(--sky-subtle)]">(optional)</span>
              </label>
              <input
                id="teacher-note"
                type="text"
                value={teacherForm.note}
                onChange={(e) => setTeacherForm((prev) => ({ ...prev, note: e.target.value }))}
                placeholder="e.g. S3 science department"
                className={fieldClass}
              />
            </div>
            <Button variant="primary" size="md" onClick={handleTeacherGenerate} disabled={isSubmitting}>
              {isSubmitting ? 'Generating…' : 'Generate teacher code'}
            </Button>
            {teacherResult && (
              <GeneratedCode
                code={teacherResult.code}
                details={[`Seats: ${teacherResult.seatLimit}`, `Expires ${new Date(teacherResult.expiresAt).toLocaleString()}`]}
              />
            )}
          </div>
        </Panel>

        <Panel meta="Institutions" title="Board-level provisioning">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inst-seats" className={labelClass}>Seats</label>
                <input
                  id="inst-seats"
                  type="number"
                  min={50}
                  value={institutionForm.seats}
                  onChange={(e) => setInstitutionForm((prev) => ({ ...prev, seats: Number(e.target.value) }))}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="inst-campuses" className={labelClass}>Campuses covered</label>
                <input
                  id="inst-campuses"
                  type="number"
                  min={1}
                  value={institutionForm.campuses}
                  onChange={(e) => setInstitutionForm((prev) => ({ ...prev, campuses: Number(e.target.value) }))}
                  className={fieldClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="inst-ttl" className={labelClass}>Expires in (hours)</label>
              <input
                id="inst-ttl"
                type="number"
                min={24}
                value={institutionForm.ttlHours}
                onChange={(e) => setInstitutionForm((prev) => ({ ...prev, ttlHours: Number(e.target.value) }))}
                className={fieldClass}
              />
            </div>
            <Button variant="primary" size="md" onClick={handleInstitutionGenerate} disabled={isSubmitting}>
              {isSubmitting ? 'Generating…' : 'Generate institution code'}
            </Button>
            {institutionResult && (
              <GeneratedCode
                code={institutionResult.code}
                details={[
                  `Seats: ${institutionResult.seatLimit}`,
                  `Campuses: ${institutionResult.metadata?.campuses || institutionForm.campuses}`,
                  `Expires ${new Date(institutionResult.expiresAt).toLocaleString()}`,
                ]}
              />
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function GeneratedCode({ code, details }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div role="status" className="rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-base font-semibold tracking-wide text-[var(--sky-text)]">{code}</p>
        <button
          type="button"
          onClick={copy}
          className="h-8 rounded-md border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-3 text-[13px] font-medium text-[var(--sky-text)] hover:border-[var(--action-accent)]"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="mt-1 text-[13px] text-[var(--sky-subtle)]">{details.join(' · ')}</p>
    </div>
  )
}
