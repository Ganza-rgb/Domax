'use client'

import Link from 'next/link'
import { useWorkspace } from '@/states/useWorkspaceState'
import { useUserState } from '@/states/useUserState'
import { examStatus, StepChip } from '@/components/workspace/examStatus'
import { TickMark } from '@/components/dashboard/ui'

// What needs doing soonest comes first: missing scripts, then marking, then release.
const urgency = { collect: 0, mark: 1, release: 2, prepare: 3 }

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function TodayPage() {
  const { exams, findClass, progressOf } = useWorkspace()
  const { teacher } = useUserState()

  const rows = exams
    .map((exam) => {
      const progress = progressOf(exam)
      return { exam, cls: findClass(exam.classId), progress, status: examStatus(exam, progress) }
    })
    .filter((row) => row.progress.step !== 'done')
    .sort((a, b) => urgency[a.progress.step] - urgency[b.progress.step])

  return (
    <div className="max-w-4xl space-y-7">
      <header>
        <h1 className="text-[2rem] sm:text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.035em]">
          {greeting()}, {teacher.name}
        </h1>
        <p className="text-[17px] text-[var(--sky-subtle)] mt-2">
          {rows.length
            ? `${rows.length} exam${rows.length === 1 ? ' needs' : 's need'} you. Start with the one at the top.`
            : 'Nothing needs you right now.'}
        </p>
      </header>

      {rows.length === 0 ? (
        <section className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <TickMark className="w-10 h-10 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">All your exams are done</h2>
            <p className="text-[15px] text-[var(--sky-subtle)] mt-1">When you set a new exam, it will appear here with its next step.</p>
          </div>
          <Link href="/dashboard/exams/new" className="inline-flex items-center justify-center min-h-11 px-5 rounded-full bg-[var(--action-accent)] text-white text-sm font-semibold">
            New exam
          </Link>
        </section>
      ) : (
        <ul className="space-y-3">
          {rows.map(({ exam, cls, progress, status }, index) => (
            <li
              key={exam.id}
              className={`rounded-2xl border bg-[var(--sky-panel)] p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-8 md:items-center ${
                index === 0 ? 'border-[var(--action-accent)] shadow-[0_0_0_3px_var(--action-accent-soft)]' : 'border-[var(--sky-panel-border)]'
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="font-body text-lg font-semibold tracking-[-0.01em] text-[var(--sky-text)]">{exam.title}</h2>
                  <StepChip tone={status.tone}>{status.chip}</StepChip>
                </div>
                <p className="text-[15px] text-[var(--sky-subtle)] mt-1">
                  {cls?.name} · {status.line}
                </p>
                {progress.step === 'collect' && progress.missing.length > 0 && (
                  <p className="text-sm text-[var(--sky-text)] mt-2">
                    Missing: {progress.missing.slice(0, 3).map((s) => s.name).join(', ')}
                    {progress.missing.length > 3 ? ` and ${progress.missing.length - 3} more` : ''}
                  </p>
                )}
              </div>
              <Link
                href={status.href}
                className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full text-[15px] font-semibold transition-colors ${
                  index === 0
                    ? 'bg-[var(--action-accent)] text-white hover:opacity-90'
                    : 'border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
                }`}
              >
                {status.action}
                <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-[var(--sky-subtle)]">
        <Link href="/dashboard/exams" className="text-[var(--action-accent)] hover:underline">See all exams</Link>
        {' · '}
        <Link href="/dashboard/exams/new" className="text-[var(--action-accent)] hover:underline">New exam</Link>
      </p>
    </div>
  )
}
