'use client'

import { useEffect, useMemo } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { Panel, ProgressBar, StatGroup } from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useUserState } from '@/states/useUserState'

export default function AnalyticsPage() {
  const { setCurrentSection } = useDashboardState()
  const { students } = useUserState()
  const { exams } = useExamState()
  const { submissions } = useSubmissionState()

  useEffect(() => {
    setCurrentSection('analytics')
  }, [setCurrentSection])

  const summary = useMemo(() => {
    const avg = students.length ? students.reduce((sum, s) => sum + s.avgScore, 0) / students.length : null
    const graded = exams.reduce((sum, e) => sum + e.stats.graded, 0)
    const total = exams.reduce((sum, e) => sum + e.stats.total, 0)
    const bands = [
      { label: '80% and above', tone: 'positive', count: students.filter((s) => s.avgScore >= 80).length },
      { label: '60–79%', tone: 'info', count: students.filter((s) => s.avgScore >= 60 && s.avgScore < 80).length },
      { label: 'Below 60%', tone: 'caution', count: students.filter((s) => s.avgScore < 60).length },
    ]
    return { avg, graded, total, bands }
  }, [students, exams])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Analytics"
        title="Analytics"
        subtitle="Class performance and marking progress, from finalized scripts."
      />

      <StatGroup
        items={[
          { label: 'Class average', value: summary.avg === null ? '—' : `${Math.round(summary.avg)}%`, hint: `${students.length} students tracked` },
          { label: 'Scripts graded', value: `${summary.graded} / ${summary.total}`, hint: 'Across all exams' },
          { label: 'Finalized by you', value: submissions.filter((s) => s.status === 'completed').length, hint: 'In the review workspace' },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Panel meta="Students" title="Average score bands">
          <ul className="space-y-4">
            {summary.bands.map((band) => (
              <li key={band.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[var(--sky-text)]">{band.label}</span>
                  <span className="font-medium tabular-nums text-[var(--sky-text)]">
                    {band.count} {band.count === 1 ? 'student' : 'students'}
                  </span>
                </div>
                <ProgressBar value={band.count} max={students.length || 1} tone={band.tone} label={`${band.label}: ${band.count} students`} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel meta="Exams" title="Marking completion">
          <ul className="space-y-4">
            {exams.map((exam) => (
              <li key={exam.id}>
                <div className="flex justify-between gap-3 text-sm mb-1.5">
                  <span className="truncate text-[var(--sky-text)]">{exam.title}</span>
                  <span className="font-medium tabular-nums text-[var(--sky-text)] whitespace-nowrap">
                    {exam.stats.total ? Math.round((exam.stats.graded / exam.stats.total) * 100) : 0}%
                  </span>
                </div>
                <ProgressBar value={exam.stats.graded} max={exam.stats.total} label={`${exam.title} completion`} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <p className="text-sm text-[var(--sky-subtle)]">
        Figures are calculated from the students, exams and scripts in your workspace. Trend charts over time are coming soon.
      </p>
    </div>
  )
}
