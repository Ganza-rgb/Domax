'use client'

import Link from 'next/link'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { EmptyState, WsButton as Button } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'
import { examStatus, StepChip } from '@/components/workspace/examStatus'

export default function ExamsPage() {
  const { exams, findClass, progressOf } = useWorkspace()
  const rows = [...exams]
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    .map((exam) => {
      const progress = progressOf(exam)
      return { exam, cls: findClass(exam.classId), progress, status: examStatus(exam, progress, findClass(exam.classId)) }
    })

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        title="Exams"
        subtitle="Every exam you’ve set, and the step it’s at."
        actions={
          <Button href="/dashboard/exams/new" size="lg" data-tour="create-exam-button">
            New exam
          </Button>
        }
      />

      {rows.length === 0 ? (
        <EmptyState
          title="No exams yet"
          body="Create an exam, print the answer sheets, and Domax walks you through collecting, marking and releasing."
          action={<Button href="/dashboard/exams/new" size="lg">New exam</Button>}
        />
      ) : (
        <ul className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] divide-y divide-[var(--sky-panel-border)] overflow-hidden">
          {rows.map(({ exam, cls, status }) => (
            <li key={exam.id}>
              <Link
                href={`/dashboard/exams/${exam.id}`}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-x-6 gap-y-2 items-center px-5 sm:px-6 py-4 hover:bg-[var(--sky-surface)] transition-colors"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-[var(--sky-text)] truncate group-hover:text-[var(--action-accent)]">{exam.title}</span>
                  <span className="block text-sm text-[var(--sky-subtle)]">{cls?.name || 'No class'}</span>
                </span>
                <span>
                  <StepChip tone={status.tone}>{status.chip}</StepChip>
                </span>
                <span className="text-sm text-[var(--sky-subtle)]">{status.line}</span>
                <svg viewBox="0 0 16 16" className="hidden sm:block w-4 h-4 text-[var(--sky-subtle)] group-hover:text-[var(--action-accent)]" aria-hidden="true">
                  <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
