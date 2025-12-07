'use client'

import { useMemo, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useExamState } from '@/states/useExamState'
import { useUserState } from '@/states/useUserState'

export default function DashboardPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { submissions } = useSubmissionState()
  const { exams } = useExamState()
  const { teacher } = useUserState()

  useEffect(() => {
    setCurrentSection('home')
    updatePanel({ type: 'overview', payload: null })
  }, [setCurrentSection, updatePanel])

  const pendingSubmissions = submissions.filter((submission) => submission.status !== 'completed')
  const needsManualReview = submissions.filter((submission) => submission.status === 'needs-review')
  const lowConfidence = submissions.filter((submission) =>
    submission.questions.some((q) => q.confidence < 0.7)
  )

  const summaryCards = [
    { label: 'Pending submissions', value: pendingSubmissions.length, tone: 'text-[var(--vscode-accent)]' },
    { label: 'Needs manual review', value: needsManualReview.length, tone: 'text-[var(--vscode-orange)]' },
    { label: 'Low-confidence', value: lowConfidence.length, tone: 'text-[var(--vscode-red)]' },
    { label: 'Exams this week', value: exams.length, tone: 'text-[var(--vscode-purple)]' },
  ]

  const timeline = useMemo(
    () => [
      {
        title: 'Morning scan run',
        meta: 'Completed · 7:40 AM',
        detail: '32 pages ingested from S3 red class',
      },
      {
        title: 'Manual review sprint',
        meta: 'In progress · due 11:30 AM',
        detail: `${needsManualReview.length} scripts waiting for your sign-off`,
      },
      {
        title: 'Wallet health',
        meta: 'Auto-alert · triggered',
        detail: `${teacher.balancePages} pages left · suggest top-up before Friday`,
      },
    ],
    [needsManualReview.length, teacher.balancePages]
  )

  const plannerRows = [
    { level: 'Primary', sample: 60, rate: 20 },
    { level: 'O-Level', sample: 120, rate: 35 },
    { level: 'A-Level', sample: 40, rate: 50 },
  ]

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Priority overview"
        title="Today's grading cockpit"
        subtitle="Keep your queue moving while Domax powers through the edge cases."
        actions={
          <>
            <Button variant="outline" size="sm">
              Open command palette
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="from-[var(--vscode-accent)] to-[var(--vscode-blue)]"
            >
              Continue grading
            </Button>
          </>
        }
      />

      <section className="sky-card flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4 flex-1">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vscode-accent)] text-2xl font-semibold text-white">
            {teacher.avatar}
          </span>
          <div>
            <p className="sky-label">Teacher profile</p>
            <h3 className="text-xl font-semibold text-[var(--sky-text)]">{teacher.name}</h3>
            <p className="text-sm text-[var(--sky-subtle)]">
              {teacher.level} • Code {teacher.schoolCode}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-[var(--sky-subtle)] w-full md:max-w-sm">
          <div>
            <p className="sky-label">This week</p>
            <p className="text-lg font-semibold text-[var(--sky-text)]">{teacher.usage.thisWeek} pages</p>
          </div>
          <div>
            <p className="sky-label">Notifications</p>
            <p className="text-lg font-semibold text-[var(--sky-text)]">
              {teacher.preferences.notifications ? 'Enabled' : 'Muted'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <article key={card.label} className="sky-card">
            <p className="sky-label">{card.label}</p>
            <p className={`text-3xl font-semibold mt-3 ${card.tone}`}>{card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <article className="sky-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="sky-label">Manual review</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Queue</h3>
            </div>
            <Button variant="outline" size="sm">
              Open submissions
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {pendingSubmissions.slice(0, 4).map((submission) => {
              const confidence =
                (submission.questions.reduce((acc, q) => acc + q.confidence, 0) / submission.questions.length) * 100
              return (
                <div
                  key={submission.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-[var(--sky-text)]">{submission.student.name}</p>
                    <p className="text-xs text-[var(--sky-subtle)]">{submission.status.replace('-', ' ')}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      confidence < 70 ? 'text-[var(--vscode-red)]' : 'text-[var(--vscode-accent)]'
                    }`}
                  >
                    {confidence.toFixed(0)}% conf.
                  </span>
                </div>
              )
            })}
            {pendingSubmissions.length === 0 && (
              <p className="text-sm text-[var(--sky-subtle)]">All caught up. Enjoy the pause ☕️</p>
            )}
          </div>
        </article>

        <article className="sky-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="sky-label">Usage snapshot</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Today's load</h3>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <UsageStat label="Pages graded today" value={teacher.usage.today} />
            <UsageStat label="This week" value={teacher.usage.thisWeek} />
            <UsageStat label="Manual reviews pending" value={needsManualReview.length} />
            <UsageStat label="Wallet balance" value={`${teacher.balancePages} pages`} />
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <article className="sky-card xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="sky-label">Mission timeline</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Today's plan</h3>
            </div>
            <Button variant="outline" size="sm">
              Add note
            </Button>
          </div>
          <ol className="space-y-4">
            {timeline.map((item) => (
              <li key={item.title} className="rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--sky-text)]">{item.title}</p>
                <p className="text-xs text-[var(--vscode-green)] mt-1">{item.meta}</p>
                <p className="text-sm text-[var(--sky-subtle)] mt-1">{item.detail}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="sky-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="sky-label">Usage planner</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Auto-cost estimator</h3>
            </div>
            <Button variant="ghost" size="sm">
              Adjust
            </Button>
          </div>
          <div className="space-y-3 text-sm text-[var(--sky-subtle)]">
            {plannerRows.map(({ level, sample, rate }) => (
              <div key={level} className="rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3">
                <p className="sky-label">{level}</p>
                <p className="text-base font-semibold text-[var(--sky-text)] mt-2">
                  {sample} pages · RWF {(sample * rate).toLocaleString()}
                </p>
                <p className="text-xs text-[var(--sky-subtle)]">RWF {rate} per page</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

function UsageStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-4">
      <p className="sky-label">{label}</p>
      <p className="text-2xl font-semibold text-[var(--sky-text)] mt-2">{value}</p>
    </div>
  )
}
