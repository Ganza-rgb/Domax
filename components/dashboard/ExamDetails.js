'use client'

import Link from 'next/link'
import Button from '@/components/atoms/Button'
import { useSubmissionState } from '@/states/useSubmissionState'
import { EmptyState, ProgressBar, StatGroup, LOW_CONFIDENCE, downloadCsv } from './ui'

export default function ExamDetails({ exam, onOpenSubmission, hideTitle = false }) {
  const { findSubmissionById } = useSubmissionState()

  if (!exam) {
    return <EmptyState title="Select an exam" body="Choose an exam on the left to see its progress." />
  }

  const exportProgress = () => {
    downloadCsv(`${exam.title.replace(/\s+/g, '-').toLowerCase()}-progress.csv`, [
      ['Exam', 'Level', 'Student', 'Progress', 'AI confidence', 'Last update'],
      ...exam.submissions.map((s) => [
        exam.title,
        exam.level,
        s.student,
        s.progress,
        `${Math.round(s.aiConfidence * 100)}%`,
        s.updatedAt,
      ]),
    ])
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {!hideTitle && (
            <>
              <p className="sky-label">{exam.level}</p>
              <h2 className="text-xl font-semibold text-[var(--sky-text)]">{exam.title}</h2>
            </>
          )}
          <p className="text-sm text-[var(--sky-subtle)]">
            {hideTitle && <>{exam.level} · </>}Scheduled {exam.scheduled} · Duration {exam.duration}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="secondary" size="sm" onClick={exportProgress} disabled={exam.submissions.length === 0}>
            Export CSV
          </Button>
          <Button variant="secondary" size="sm" disabled title="Assignment creation is not available yet">
            Create assignment
          </Button>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-[var(--sky-subtle)]">Graded</span>
          <span className="font-medium tabular-nums text-[var(--sky-text)]">
            {exam.stats.graded} of {exam.stats.total}
          </span>
        </div>
        <ProgressBar value={exam.stats.graded} max={exam.stats.total} label="Exam progress" />
      </div>

      <StatGroup
        items={[
          { label: 'Total submissions', value: exam.stats.total },
          { label: 'Graded', value: exam.stats.graded },
          { label: 'Needs review', value: exam.stats.needsReview, tone: exam.stats.needsReview ? 'caution' : 'neutral' },
          { label: 'Low confidence', value: exam.stats.aiLowConfidence, tone: exam.stats.aiLowConfidence ? 'caution' : 'neutral' },
        ]}
      />

      <div>
        <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-2">Recent submissions</h3>
        {exam.submissions.length === 0 ? (
          <EmptyState title="No submissions yet" body="Scripts appear here once they are uploaded for this exam." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[var(--sky-panel-border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                  <th scope="col" className="px-4 py-2 font-medium">Student</th>
                  <th scope="col" className="px-3 py-2 font-medium">Progress</th>
                  <th scope="col" className="px-3 py-2 font-medium">AI confidence</th>
                  <th scope="col" className="px-3 py-2 font-medium">Updated</th>
                  <th scope="col" className="px-4 py-2"><span className="sr-only">Action</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sky-panel-border)]">
                {exam.submissions.map((submission) => {
                  const reviewable = Boolean(findSubmissionById(submission.id))
                  const low = submission.aiConfidence > 0 && submission.aiConfidence < LOW_CONFIDENCE
                  return (
                    <tr key={submission.id} className="hover:bg-[var(--sky-surface)]">
                      <td className="px-4 py-2.5 font-medium text-[var(--sky-text)]">{submission.student}</td>
                      <td className="px-3 py-2.5 text-[var(--sky-subtle)]">{submission.progress}</td>
                      <td className={`px-3 py-2.5 tabular-nums ${low ? 'text-[var(--vscode-orange)] font-semibold' : 'text-[var(--sky-subtle)]'}`}>
                        {submission.aiConfidence > 0 ? `${Math.round(submission.aiConfidence * 100)}%` : '—'}
                      </td>
                      <td className="px-3 py-2.5 tabular-nums text-[var(--sky-subtle)]">{submission.updatedAt}</td>
                      <td className="px-4 py-2.5 text-right">
                        {reviewable ? (
                          <Link
                            href={`/dashboard/submissions/${submission.id}`}
                            onClick={() => onOpenSubmission && onOpenSubmission(submission)}
                            className="inline-flex h-8 items-center rounded-md border border-[var(--sky-panel-border)] px-3 text-[13px] font-medium text-[var(--sky-text)] hover:border-[var(--action-accent)] hover:text-[var(--action-accent)]"
                          >
                            Review
                          </Link>
                        ) : (
                          <span className="text-xs text-[var(--sky-subtle)]">Not ready</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
