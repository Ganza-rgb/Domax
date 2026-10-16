'use client'

import { useEffect, useMemo } from 'react'
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
        label: 'High performers',
        value: students.filter((student) => student.avgScore >= 80).length,
        hint: '≥ 80% average',
      },
      {
        label: 'Needs attention',
        value: students.filter((student) => student.avgScore < 60).length,
        hint: '< 60% average',
      },
      {
        label: 'Dormant',
        value: students.filter((student) => student.lastActive?.includes('days')).length,
        hint: 'Inactive last 7 days',
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

      <StatGroup items={cohorts} />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
        <Panel meta="Roster" title="Active learners">
          <StudentList />
        </Panel>

        <Panel meta="Signals" title="Teaching cues">
          <ul className="divide-y divide-[var(--sky-panel-border)]">
            {signals.map((signal) => (
              <li key={signal.title} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-[var(--sky-text)]">{signal.title}</p>
                <p className="text-sm text-[var(--sky-subtle)] mt-0.5 leading-relaxed">{signal.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
