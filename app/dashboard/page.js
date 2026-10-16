'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import {
  WsButton as Button,
  Panel,
  StatusPill,
  ProgressBar,
  Segmented,
  EmptyState,
  ReadSummary,
  TickMark,
  submissionStatus,
  unsureQuestions,
  markedCount,
  fieldClass,
} from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useExamState } from '@/states/useExamState'
import { useUserState } from '@/states/useUserState'
import { usageAmount } from '@/components/dashboard/BillingOverview'
import { formatRwf } from '@/lib/pricing'

// Review cases first, then scripts that are ready to finalize
const queueOrder = { 'needs-review': 0, ready: 1 }

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

export default function DashboardPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { submissions } = useSubmissionState()
  const { exams } = useExamState()
  const { billing } = useUserState()
  const termExams = billing.usage.reduce((sum, row) => sum + row.exams, 0)
  const termAmount = billing.usage.reduce((sum, row) => sum + usageAmount(row), 0)
  const [queueFilter, setQueueFilter] = useState('pending')
  const [notes, setNotes] = useState([])
  const [noteDraft, setNoteDraft] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    setCurrentSection('home')
    updatePanel({ type: 'overview', payload: null })
  }, [setCurrentSection, updatePanel])

  const pending = submissions
    .filter((submission) => submission.status !== 'completed')
    .sort((a, b) => (queueOrder[a.status] ?? 2) - (queueOrder[b.status] ?? 2))
  const needsReview = pending.filter((submission) => submission.status === 'needs-review')
  const ready = pending.filter((submission) => submission.status === 'ready')
  const withUnsure = pending.filter((submission) => unsureQuestions(submission.questions).length > 0)
  const next = pending[0] || null
  const nextExam = next ? exams.find((exam) => exam.id === next.examId) : null

  const queueRows = { pending, review: needsReview, ready, unsure: withUnsure }[queueFilter]

  const summary = pending.length
    ? `${plural(pending.length, 'script')} waiting for you${
        withUnsure.length ? `. ${withUnsure.length === 1 ? 'One has' : `${withUnsure.length} have`} answers Domax wasn’t sure about.` : '.'
      }`
    : 'Nothing is waiting. Every script has been finalized.'

  const addNote = (event) => {
    event.preventDefault()
    const text = noteDraft.trim()
    if (!text) return
    setNotes((prev) => [...prev, { id: Date.now(), text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setNoteDraft('')
    setAddingNote(false)
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader title="Today" subtitle={summary} />

      {/* Next up: the one thing to do now */}
      {next ? (
        <section aria-labelledby="next-up" className="ws-feature rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="min-w-0">
              <p id="next-up" className="text-[13px] font-semibold text-[#8db8ff]">Next up</p>
              <h2 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.035em] text-white font-semibold">
                {next.student.name}
              </h2>
              <p className="mt-1.5 text-[15px] text-white/65">
                {[nextExam?.title, next.student.classRoom].filter(Boolean).join(' · ')}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Questions in this script">
                {next.questions.map((question, index) => {
                  const unsure = unsureQuestions([question]).length > 0
                  const marked = question.teacherScore !== null && question.teacherScore !== undefined
                  return (
                    <li
                      key={question.id || index}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] ${
                        unsure ? 'bg-[#F5A524]/15 text-[#FFC86B]' : 'bg-white/[0.08] text-white/80'
                      }`}
                    >
                      {marked ? (
                        <TickMark className="w-3.5 h-3.5" />
                      ) : (
                        <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${unsure ? 'bg-[#FFC86B]' : 'bg-white/50'}`} />
                      )}
                      <span className="font-semibold">Q{index + 1}</span>
                      <span>{marked ? 'Marked' : unsure ? 'Domax was unsure' : 'Clear suggestion'}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-3">
              <Link
                href={`/dashboard/submissions/${next.id}`}
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-full bg-white text-[#0A3059] text-[15px] font-semibold hover:bg-[#E8F0FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a33]"
              >
                {markedCount(next.questions) ? 'Continue review' : 'Start review'}
                <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="text-[13px] text-white/55 tabular-nums">
                {markedCount(next.questions)} of {next.questions.length} questions marked by you
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-8 flex items-center gap-4">
          <TickMark className="w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-[var(--sky-text)]">All caught up</h2>
            <p className="text-[15px] text-[var(--sky-subtle)] mt-0.5">Every script has been finalized. New uploads will appear here.</p>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
        {/* Queue */}
        <Panel
          title="Queue"
          actions={
            <Link href="/dashboard/submissions" className="text-sm font-medium text-[var(--action-accent)] hover:underline rounded">
              All submissions
            </Link>
          }
          bodyClassName="!px-0 !pb-0"
        >
          <div className="px-5 pb-3">
            <Segmented
              label="Filter queue"
              value={queueFilter}
              onChange={setQueueFilter}
              options={[
                { value: 'pending', label: 'Waiting', count: pending.length },
                { value: 'review', label: 'Needs review', count: needsReview.length },
                { value: 'ready', label: 'Ready', count: ready.length },
                { value: 'unsure', label: 'Unsure', count: withUnsure.length },
              ]}
            />
          </div>

          {queueRows.length === 0 ? (
            <div className="px-5 pb-5">
              <EmptyState
                title={queueFilter === 'pending' ? 'All caught up' : 'Nothing in this view'}
                body={queueFilter === 'pending' ? 'Every script has been finalized.' : 'Try another filter to see the rest of your queue.'}
              />
            </div>
          ) : (
            <ul className="border-t border-[var(--sky-panel-border)] divide-y divide-[var(--sky-panel-border)]">
              {queueRows.map((submission) => {
                const status = submissionStatus(submission.status)
                const marked = markedCount(submission.questions)
                const total = submission.questions.length
                return (
                  <li key={submission.id}>
                    <Link
                      href={`/dashboard/submissions/${submission.id}`}
                      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] items-center gap-x-4 gap-y-1.5 px-5 py-3.5 hover:bg-[var(--sky-surface)] transition-colors"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold text-[var(--sky-text)] truncate">{submission.student.name}</span>
                        <span className="block text-xs text-[var(--sky-subtle)]">{submission.student.classRoom}</span>
                      </span>
                      <span className="hidden sm:block">
                        <StatusPill tone={status.tone}>{status.label}</StatusPill>
                      </span>
                      <ReadSummary questions={submission.questions} className="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto" />
                      <span className="flex items-center gap-3 col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto">
                        <span className="text-[13px] tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">
                          {marked}/{total} marked
                        </span>
                        <svg viewBox="0 0 16 16" className="w-4 h-4 text-[var(--sky-subtle)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--action-accent)]" aria-hidden="true">
                          <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>

        {/* Side column */}
        <div className="space-y-6 min-w-0">
          <Panel
            title="Exams"
            actions={<Link href="/dashboard/exams" className="text-sm font-medium text-[var(--action-accent)] hover:underline rounded">All exams</Link>}
          >
            {exams.length === 0 ? (
              <p className="text-sm text-[var(--sky-subtle)]">No exams yet.</p>
            ) : (
              <ul className="space-y-4">
                {exams.map((exam) => (
                  <li key={exam.id}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <Link href={`/dashboard/exams/${exam.id}`} className="font-medium text-[var(--sky-text)] hover:text-[var(--action-accent)] truncate rounded">
                        {exam.title}
                      </Link>
                      <span className="text-xs tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">
                        {exam.stats.graded}/{exam.stats.total}
                      </span>
                    </div>
                    <ProgressBar
                      value={exam.stats.graded}
                      max={exam.stats.total}
                      tone={exam.stats.graded === exam.stats.total ? 'positive' : 'info'}
                      label={`${exam.title} marking progress`}
                      className="mt-1.5"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title={billing.term}>
            <p className="font-headline text-3xl font-semibold tracking-[-0.03em] text-[var(--sky-text)] tabular-nums">
              {termExams.toLocaleString()}
              <span className="text-base font-medium text-[var(--sky-subtle)] ml-1.5 tracking-normal">exams marked</span>
            </p>
            <p className="text-[13px] text-[var(--sky-subtle)] mt-2 leading-relaxed">
              {formatRwf(termAmount)} so far, invoiced at the end of term.{' '}
              <Link href="/dashboard/billing" className="text-[var(--action-accent)] hover:underline rounded">Billing</Link>
            </p>
          </Panel>

          <Panel
            title="Notes"
            actions={
              !addingNote && (
                <Button variant="secondary" size="xs" onClick={() => setAddingNote(true)}>
                  Add note
                </Button>
              )
            }
          >
            {notes.length === 0 && !addingNote && (
              <p className="text-sm text-[var(--sky-subtle)]">Jot down anything to come back to while you mark.</p>
            )}
            {notes.length > 0 && (
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li key={note.id} className="text-sm">
                    <p className="text-[var(--sky-text)] whitespace-pre-wrap">{note.text}</p>
                    <p className="text-xs text-[var(--sky-subtle)] mt-0.5">{note.time}</p>
                  </li>
                ))}
              </ul>
            )}
            {addingNote && (
              <form onSubmit={addNote} className={`space-y-2 ${notes.length ? 'mt-4' : ''}`}>
                <label htmlFor="home-note" className="sr-only">Note</label>
                <textarea
                  id="home-note"
                  autoFocus
                  rows={3}
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="e.g. Re-check Q3 for S3 Blue after lunch"
                  className={`${fieldClass} h-auto py-2`}
                />
                <p className="text-xs text-[var(--sky-subtle)]">Kept for this session only.</p>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="xs" onClick={() => { setAddingNote(false); setNoteDraft('') }}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="xs" type="submit" disabled={!noteDraft.trim()}>
                    Save note
                  </Button>
                </div>
              </form>
            )}
          </Panel>
        </div>
      </div>
    </div>
  )
}
