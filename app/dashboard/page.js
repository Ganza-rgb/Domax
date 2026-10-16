'use client'

import { useMemo, useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/atoms/Button'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import {
  Panel,
  StatGroup,
  StatusPill,
  ProgressBar,
  Segmented,
  EmptyState,
  submissionStatus,
  averageConfidence,
  markedCount,
  fieldClass,
  LOW_CONFIDENCE,
} from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useExamState } from '@/states/useExamState'
import { useUserState } from '@/states/useUserState'

// Review cases first, then scripts that are ready to finalize
const queueOrder = { 'needs-review': 0, ready: 1 }

export default function DashboardPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { submissions } = useSubmissionState()
  const { exams } = useExamState()
  const { teacher } = useUserState()
  const [queueFilter, setQueueFilter] = useState('pending')
  const [notes, setNotes] = useState([])
  const [noteDraft, setNoteDraft] = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [editingPlanner, setEditingPlanner] = useState(false)
  const [plannerRows, setPlannerRows] = useState([
    { level: 'Primary', sample: 60, rate: 20 },
    { level: 'O-Level', sample: 120, rate: 35 },
    { level: 'A-Level', sample: 40, rate: 50 },
  ])

  useEffect(() => {
    setCurrentSection('home')
    updatePanel({ type: 'overview', payload: null })
  }, [setCurrentSection, updatePanel])

  const pendingSubmissions = submissions
    .filter((submission) => submission.status !== 'completed')
    .sort((a, b) => (queueOrder[a.status] ?? 2) - (queueOrder[b.status] ?? 2))
  const needsManualReview = submissions.filter((submission) => submission.status === 'needs-review')
  const lowConfidence = submissions.filter((submission) =>
    submission.questions.some((q) => q.confidence < LOW_CONFIDENCE)
  )
  const nextSubmission = pendingSubmissions[0] || null

  const queueRows = {
    pending: pendingSubmissions,
    review: needsManualReview,
    ready: submissions.filter((submission) => submission.status === 'ready'),
    low: lowConfidence.filter((submission) => submission.status !== 'completed'),
  }[queueFilter]

  const timeline = useMemo(
    () => [
      {
        title: 'Morning scan run',
        meta: 'Completed · 7:40 AM',
        detail: '32 pages ingested from S3 red class',
        tone: 'positive',
      },
      {
        title: 'Manual review sprint',
        meta: 'In progress · due 11:30 AM',
        detail: `${needsManualReview.length} scripts waiting for your sign-off`,
        tone: 'info',
      },
      {
        title: 'Wallet health',
        meta: 'Auto-alert · triggered',
        detail: `${teacher.balancePages} pages left · suggest top-up before Friday`,
        tone: 'caution',
      },
    ],
    [needsManualReview.length, teacher.balancePages]
  )

  const addNote = (event) => {
    event.preventDefault()
    const text = noteDraft.trim()
    if (!text) return
    setNotes((prev) => [...prev, { id: Date.now(), text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setNoteDraft('')
    setAddingNote(false)
  }

  const plannerTotal = plannerRows.reduce((sum, row) => sum + row.sample * row.rate, 0)

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Priority overview"
        title="Today's grading cockpit"
        subtitle="Keep your queue moving while Domax powers through the edge cases."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => window.__openCommandPalette?.()}>
              Search
            </Button>
            {nextSubmission ? (
              <Button variant="primary" size="sm" href={`/dashboard/submissions/${nextSubmission.id}`}>
                Continue grading
              </Button>
            ) : (
              <Button variant="primary" size="sm" disabled>
                All caught up
              </Button>
            )}
          </>
        }
      />

      {/* Who is signed in — one line instead of a full card */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--sky-subtle)] -mt-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A3059] text-[11px] font-semibold text-white">
          {teacher.avatar}
        </span>
        <span className="font-medium text-[var(--sky-text)]">{teacher.name}</span>
        <span aria-hidden="true">·</span>
        <span>{teacher.level}</span>
        <span aria-hidden="true">·</span>
        <span>Code {teacher.schoolCode}</span>
        <span aria-hidden="true">·</span>
        <Link href="/dashboard/settings" className="hover:text-[var(--sky-text)] rounded">
          Notifications {teacher.preferences.notifications ? 'on' : 'muted'}
        </Link>
      </div>

      <StatGroup
        items={[
          { label: 'Pending submissions', value: pendingSubmissions.length },
          { label: 'Needs manual review', value: needsManualReview.length, tone: needsManualReview.length ? 'caution' : 'neutral' },
          { label: 'Low-confidence', value: lowConfidence.length, tone: lowConfidence.length ? 'caution' : 'neutral', hint: `Any answer below ${Math.round(LOW_CONFIDENCE * 100)}%` },
          { label: 'Exams this week', value: exams.length },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Primary column */}
        <div className="space-y-6 min-w-0">
          <Panel
            meta="Manual review"
            title="Queue"
            actions={
              <Link href="/dashboard/submissions" className="text-sm font-medium text-[var(--action-accent)] hover:underline rounded">
                Open submissions
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
                  { value: 'pending', label: 'All pending', count: pendingSubmissions.length },
                  { value: 'review', label: 'Needs review', count: needsManualReview.length },
                  { value: 'ready', label: 'Ready', count: submissions.filter((s) => s.status === 'ready').length },
                  { value: 'low', label: 'Low confidence', count: lowConfidence.filter((s) => s.status !== 'completed').length },
                ]}
              />
            </div>

            {queueRows.length === 0 ? (
              <div className="px-5 pb-5">
                <EmptyState
                  title={queueFilter === 'pending' ? 'All caught up' : 'Nothing in this view'}
                  body={queueFilter === 'pending' ? 'Every script has been finalized. Enjoy the pause.' : 'Try another filter to see the rest of your queue.'}
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                      <th scope="col" className="px-5 py-2 font-medium">Student</th>
                      <th scope="col" className="px-3 py-2 font-medium">Status</th>
                      <th scope="col" className="px-3 py-2 font-medium">Marked</th>
                      <th scope="col" className="px-3 py-2 font-medium">AI confidence</th>
                      <th scope="col" className="px-5 py-2"><span className="sr-only">Action</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--sky-panel-border)]">
                    {queueRows.map((submission) => {
                      const status = submissionStatus(submission.status)
                      const avg = averageConfidence(submission.questions)
                      const marked = markedCount(submission.questions)
                      const total = submission.questions.length
                      return (
                        <tr key={submission.id} className="hover:bg-[var(--sky-surface)]">
                          <td className="px-5 py-3">
                            <p className="font-semibold text-[var(--sky-text)]">{submission.student.name}</p>
                            <p className="text-xs text-[var(--sky-subtle)]">{submission.student.classRoom}</p>
                          </td>
                          <td className="px-3 py-3">
                            <StatusPill tone={status.tone}>{status.label}</StatusPill>
                          </td>
                          <td className="px-3 py-3 tabular-nums text-[var(--sky-text)] whitespace-nowrap">
                            {marked} / {total}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2 min-w-[7rem]">
                              <ProgressBar
                                value={avg === null ? 0 : avg * 100}
                                tone={avg !== null && avg < LOW_CONFIDENCE ? 'caution' : 'info'}
                                label={`AI confidence for ${submission.student.name}`}
                                className="w-16"
                              />
                              <span className={`tabular-nums text-xs ${avg !== null && avg < LOW_CONFIDENCE ? 'text-[var(--vscode-orange)] font-semibold' : 'text-[var(--sky-subtle)]'}`}>
                                {avg === null ? '—' : `${Math.round(avg * 100)}%`}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <Link
                              href={`/dashboard/submissions/${submission.id}`}
                              className="inline-flex h-8 items-center rounded-md border border-[var(--sky-panel-border)] px-3 text-[13px] font-medium text-[var(--sky-text)] hover:border-[var(--action-accent)] hover:text-[var(--action-accent)]"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <Panel
            meta="Mission timeline"
            title="Today's plan"
            actions={
              !addingNote && (
                <Button variant="secondary" size="xs" onClick={() => setAddingNote(true)}>
                  Add note
                </Button>
              )
            }
          >
            <ol className="relative space-y-4 border-l border-[var(--sky-panel-border)] ml-1">
              {timeline.map((item) => (
                <li key={item.title} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--sky-panel)] ${
                      { positive: 'bg-[var(--vscode-green)]', info: 'bg-[var(--vscode-accent)]', caution: 'bg-[var(--vscode-orange)]' }[item.tone]
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="text-sm font-semibold text-[var(--sky-text)]">{item.title}</p>
                    <p className="text-xs text-[var(--sky-subtle)]">{item.meta}</p>
                  </div>
                  <p className="text-sm text-[var(--sky-subtle)] mt-0.5">{item.detail}</p>
                </li>
              ))}
              {notes.map((note) => (
                <li key={note.id} className="relative pl-5">
                  <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--sky-panel)] bg-[var(--sky-subtle)]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="text-sm font-semibold text-[var(--sky-text)]">Note</p>
                    <p className="text-xs text-[var(--sky-subtle)]">{note.time}</p>
                  </div>
                  <p className="text-sm text-[var(--sky-subtle)] mt-0.5 whitespace-pre-wrap">{note.text}</p>
                </li>
              ))}
            </ol>
            {addingNote && (
              <form onSubmit={addNote} className="mt-4 space-y-2">
                <label htmlFor="plan-note" className="sr-only">Note</label>
                <textarea
                  id="plan-note"
                  autoFocus
                  rows={2}
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="e.g. Re-check Q3 answers for S3 Blue after lunch"
                  className={`${fieldClass} h-auto py-2`}
                />
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-[var(--sky-subtle)]">Notes are kept for this session only.</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="xs" onClick={() => { setAddingNote(false); setNoteDraft('') }}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="xs" type="submit" disabled={!noteDraft.trim()}>
                      Add note
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Panel>
        </div>

        {/* Supporting column */}
        <div className="space-y-6 min-w-0">
          <Panel meta="Usage snapshot" title="Today's load">
            <dl className="divide-y divide-[var(--sky-panel-border)] text-sm">
              <div className="flex items-center justify-between py-2.5 first:pt-0">
                <dt className="text-[var(--sky-subtle)]">Pages graded today</dt>
                <dd className="font-semibold tabular-nums text-[var(--sky-text)]">{teacher.usage.today}</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[var(--sky-subtle)]">This week</dt>
                <dd className="font-semibold tabular-nums text-[var(--sky-text)]">{teacher.usage.thisWeek} pages</dd>
              </div>
              <div className="flex items-center justify-between py-2.5 last:pb-0">
                <dt className="text-[var(--sky-subtle)]">Wallet balance</dt>
                <dd className="font-semibold tabular-nums text-[var(--sky-text)]">
                  <Link href="/dashboard/billing" className="hover:text-[var(--action-accent)] rounded">
                    {teacher.balancePages.toLocaleString()} pages
                  </Link>
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel meta="Exams" title="Marking progress" actions={<Link href="/dashboard/exams" className="text-sm font-medium text-[var(--action-accent)] hover:underline rounded">All exams</Link>}>
            <ul className="space-y-4">
              {exams.map((exam) => (
                <li key={exam.id}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <Link href={`/dashboard/exams/${exam.id}`} className="font-medium text-[var(--sky-text)] hover:text-[var(--action-accent)] truncate rounded">
                      {exam.title}
                    </Link>
                    <span className="text-xs tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">
                      {exam.stats.graded} / {exam.stats.total}
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
          </Panel>

          <Panel
            meta="Usage planner"
            title="Auto-cost estimator"
            actions={
              <Button variant="secondary" size="xs" onClick={() => setEditingPlanner((v) => !v)} aria-pressed={editingPlanner}>
                {editingPlanner ? 'Done' : 'Adjust'}
              </Button>
            }
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[var(--sky-subtle)]">
                  <th scope="col" className="pb-2 font-medium">Level</th>
                  <th scope="col" className="pb-2 font-medium text-right">Pages</th>
                  <th scope="col" className="pb-2 font-medium text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sky-panel-border)]">
                {plannerRows.map((row, index) => (
                  <tr key={row.level}>
                    <th scope="row" className="py-2 text-left font-medium text-[var(--sky-text)]">
                      {row.level}
                      <span className="block text-xs font-normal text-[var(--sky-subtle)]">RWF {row.rate} per page</span>
                    </th>
                    <td className="py-2 text-right tabular-nums text-[var(--sky-text)]">
                      {editingPlanner ? (
                        <input
                          type="number"
                          min="0"
                          step="10"
                          value={row.sample}
                          aria-label={`${row.level} pages`}
                          onChange={(event) => {
                            const sample = Math.max(0, Number(event.target.value) || 0)
                            setPlannerRows((rows) => rows.map((r, i) => (i === index ? { ...r, sample } : r)))
                          }}
                          className={`${fieldClass} h-8 w-20 text-right`}
                        />
                      ) : (
                        row.sample
                      )}
                    </td>
                    <td className="py-2 text-right tabular-nums text-[var(--sky-text)]">RWF {(row.sample * row.rate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--sky-panel-border)]">
                  <th scope="row" className="pt-2.5 text-left font-semibold text-[var(--sky-text)]">Total</th>
                  <td className="pt-2.5 text-right tabular-nums text-[var(--sky-subtle)]">
                    {plannerRows.reduce((sum, row) => sum + row.sample, 0)}
                  </td>
                  <td className="pt-2.5 text-right font-semibold tabular-nums text-[var(--sky-text)]">RWF {plannerTotal.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </Panel>
        </div>
      </div>
    </div>
  )
}
