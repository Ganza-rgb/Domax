'use client'

import { useEffect, useMemo } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import StudentList from '@/components/dashboard/StudentList'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

export default function StudentsPage() {
  const { setCurrentSection } = useDashboardState()
  const { students } = useUserState()

  useEffect(() => {
    setCurrentSection('students')
  }, [setCurrentSection])

  const cohorts = useMemo(
    () => [
      {
        label: 'High performers',
        count: students.filter((student) => student.avgScore >= 80).length,
        detail: '≥ 80% average',
      },
      {
        label: 'Needs attention',
        count: students.filter((student) => student.avgScore < 60).length,
        detail: '< 60% average',
      },
      {
        label: 'Dormant',
        count: students.filter((student) => student.lastActive?.includes('days')).length,
        detail: 'Inactive last 7 days',
      },
    ],
    [students]
  )

  const signals = [
    {
      title: 'Confidence dips',
      body: '4 students had AI low-confidence flags on algebra section. Plan a micro-lesson review.',
    },
    {
      title: 'Reading comprehension',
      body: 'Average accuracy improved 12% after adding hints—keep the approach for next cycle.',
    },
    {
      title: 'Upcoming past-paper sprint',
      body: 'Assign P6 literacy set to Blue and Green cohorts to balance workloads.',
    },
  ]

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Students"
        title="Monitor class performance"
        subtitle="Profiles update automatically when exams are finalized."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cohorts.map((cohort) => (
          <article key={cohort.label} className="sky-card">
            <p className="sky-label">{cohort.label}</p>
            <p className="text-3xl font-semibold text-[var(--sky-text)] mt-3">{cohort.count}</p>
            <p className="text-xs text-[var(--sky-subtle)] mt-2">{cohort.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-5">
        <article className="sky-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="sky-label">Roster</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Active learners</h3>
            </div>
          </div>
          <StudentList onCreateStudent={() => {}} />
        </article>

        <article className="sky-card space-y-4">
          <div>
            <p className="sky-label">Signals</p>
            <h3 className="text-xl font-semibold text-[var(--sky-text)]">Teaching cues</h3>
          </div>
          <div className="space-y-3 text-sm text-[var(--sky-subtle)]">
            {signals.map((signal) => (
              <div key={signal.title} className="rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--sky-text)]">{signal.title}</p>
                <p className="text-xs mt-1">{signal.body}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

