'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import StudentList from '@/components/dashboard/StudentList'
import { Panel, StatGroup } from '@/components/dashboard/ui'
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
        label: 'Doing well',
        value: students.filter((student) => student.avgScore >= 80).length,
        hint: '≥ 80% average',
      },
      {
        label: 'Below 60%',
        value: students.filter((student) => student.avgScore < 60).length,
        hint: 'Average across finalized scripts',
      },
      {
        label: 'Not seen lately',
        value: students.filter((student) => student.lastActive?.includes('days')).length,
        hint: 'No activity for days',
      },
    ],
    [students]
  )

  // Built from the roster, not written by hand: who has a low average or is slipping.
  const worthALook = students
    .map((student) => ({
      ...student,
      reasons: [
        student.avgScore < 75 && `${student.avgScore}% average`,
        String(student.trend || '').startsWith('-') && `down ${String(student.trend).slice(1)} recently`,
      ].filter(Boolean),
    }))
    .filter((student) => student.reasons.length)

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Students"
        title="Students"
        subtitle="Profiles update automatically when exams are finalized."
      />

      <StatGroup items={cohorts} />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
        <Panel title="Your students">
          <StudentList />
        </Panel>

        <Panel title="Worth a look">
          {worthALook.length === 0 ? (
            <p className="text-sm text-[var(--sky-subtle)]">No one stands out right now. Everyone is averaging 75% or more and holding steady.</p>
          ) : (
            <ul className="divide-y divide-[var(--sky-panel-border)]">
              {worthALook.map((student) => (
                <li key={student.id}>
                  <Link
                    href={`/dashboard/students/${student.id}`}
                    className="group flex items-center justify-between gap-3 py-3 first:pt-0"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--sky-text)] group-hover:text-[var(--action-accent)]">{student.name}</span>
                      <span className="block text-[13px] text-[var(--vscode-orange)] mt-0.5">{student.reasons.join(' · ')}</span>
                    </span>
                    <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0 text-[var(--sky-subtle)] group-hover:text-[var(--action-accent)]" aria-hidden="true">
                      <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-[var(--sky-subtle)] mt-4">Based on finalized scripts only.</p>
        </Panel>
      </div>
    </div>
  )
}
