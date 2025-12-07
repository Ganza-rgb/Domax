'use client'

import Button from '@/components/atoms/Button'

export default function ExamDetails({ exam, onOpenSubmission }) {
  if (!exam) {
    return (
      <div className="sky-card border-dashed text-center text-sm text-[var(--sky-subtle)]">
        Select an exam to see its progress.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="sky-card">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div>
            <p className="sky-label">{exam.level}</p>
            <h2 className="text-2xl font-semibold text-[var(--sky-text)]">{exam.title}</h2>
            <p className="text-sm text-[var(--sky-subtle)]">Scheduled {exam.scheduled} • Duration {exam.duration}</p>
          </div>
          <div className="flex gap-2 lg:ml-auto">
            <Button variant="outline" size="sm">
              Export roster
            </Button>
            <Button variant="primary" size="sm">
              Create assignment
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--sky-subtle)]">
          <Stat label="Total submissions" value={exam.stats.total} />
          <Stat label="Graded" value={exam.stats.graded} />
          <Stat label="Needs review" value={exam.stats.needsReview} />
          <Stat label="Low confidence" value={exam.stats.aiLowConfidence} />
        </div>
      </div>

      <div className="sky-card">
        <p className="sky-label mb-4">Submissions</p>
        <div className="space-y-3">
          {exam.submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3 hover:border-[#005ffe] transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--sky-text)]">{submission.student}</p>
                <p className="text-xs text-[var(--sky-subtle)]">{submission.progress}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#005ffe]">
                  {Math.round(submission.aiConfidence * 100)}% AI confidence
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenSubmission && onOpenSubmission(submission)}
                >
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="sky-label text-[0.65rem]">{label}</p>
      <p className="text-xl font-semibold text-[var(--sky-text)] mt-1">{value}</p>
    </div>
  )
}

