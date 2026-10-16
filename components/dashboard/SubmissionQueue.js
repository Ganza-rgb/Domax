'use client'

import { useMemo, useState } from 'react'
import { useSubmissionState } from '@/states/useSubmissionState'
import { Segmented, SearchField, StatusPill, markedCount, submissionStatus } from './ui'

/**
 * Searchable, filterable list of scripts shown beside the review workspace.
 * `onSelect` decides what choosing a script does (select in place, or navigate).
 */
export default function SubmissionQueue({ onSelect }) {
  const { submissions, activeSubmission } = useSubmissionState()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('open')

  const counts = useMemo(
    () => ({
      open: submissions.filter((s) => s.status !== 'completed').length,
      'needs-review': submissions.filter((s) => s.status === 'needs-review').length,
      ready: submissions.filter((s) => s.status === 'ready').length,
      completed: submissions.filter((s) => s.status === 'completed').length,
      all: submissions.length,
    }),
    [submissions]
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return submissions.filter((submission) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'open' ? submission.status !== 'completed' : submission.status === filter)
      const matchesQuery =
        !q ||
        submission.student.name.toLowerCase().includes(q) ||
        (submission.student.classRoom || '').toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [submissions, filter, query])

  return (
    <section
      className="flex min-w-0 flex-col rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] xl:max-h-[calc(100vh-9rem)] xl:sticky xl:top-0"
      data-tour="submission-queue"
      aria-label="Submission queue"
    >
      <div className="space-y-3 border-b border-[var(--sky-panel-border)] p-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-semibold text-[var(--sky-text)]">Queue</h2>
          <span className="text-xs text-[var(--sky-subtle)] tabular-nums">{submissions.length} scripts</span>
        </div>
        <SearchField value={query} onChange={setQuery} placeholder="Search student or class" label="Search scripts" />
        <Segmented
          label="Filter scripts"
          fullWidth
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'open', label: 'Open', count: counts.open },
            { value: 'needs-review', label: 'Review', count: counts['needs-review'] },
            { value: 'ready', label: 'Ready', count: counts.ready },
            { value: 'completed', label: 'Done', count: counts.completed },
          ]}
        />
      </div>

      <ul className="flex-1 overflow-y-auto p-2" role="list">
        {visible.map((submission) => {
          const isActive = activeSubmission?.id === submission.id
          const status = submissionStatus(submission.status)
          const marked = markedCount(submission.questions)
          return (
            <li key={submission.id}>
              <button
                type="button"
                onClick={() => onSelect(submission)}
                aria-current={isActive ? 'true' : undefined}
                className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-[var(--action-accent-soft)] ring-1 ring-inset ring-[var(--action-accent)]'
                    : 'hover:bg-[var(--sky-surface)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-[var(--sky-text)]">{submission.student.name}</p>
                  <span className="text-xs tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">
                    {marked}/{submission.questions.length}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-[var(--sky-subtle)]">{submission.student.classRoom}</p>
                  <StatusPill tone={status.tone}>{status.label}</StatusPill>
                </div>
              </button>
            </li>
          )
        })}
        {visible.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-[var(--sky-subtle)]">
            {submissions.length === 0
              ? 'No scripts yet. Create an exam to begin.'
              : query
                ? `No scripts match “${query}”.`
                : 'Nothing in this view.'}
          </li>
        )}
      </ul>
    </section>
  )
}
