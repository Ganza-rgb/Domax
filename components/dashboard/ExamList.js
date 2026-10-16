'use client'

import { useExamState } from '@/states/useExamState'
import { useDashboardState } from '@/states/useDashboardState'
import { ProgressBar, StatusPill } from './ui'

const EXAM_STATUS = {
  'in-progress': { label: 'In progress', tone: 'info' },
  draft: { label: 'Draft', tone: 'neutral' },
}

export default function ExamList() {
  const { exams, activeExamId, setActiveExamId } = useExamState()
  const { setSelectedExam, updatePanel } = useDashboardState()

  const handleSelect = (examId) => {
    setActiveExamId(examId)
    setSelectedExam(examId)
    const exam = exams.find((item) => item.id === examId)
    if (exam) {
      updatePanel({ type: 'exam', payload: exam })
    }
  }

  return (
    <ul className="space-y-1" role="list">
      {exams.map((exam) => {
        const isActive = exam.id === activeExamId
        const status = EXAM_STATUS[exam.status] || { label: exam.status, tone: 'neutral' }
        return (
          <li key={exam.id}>
            <button
              type="button"
              onClick={() => handleSelect(exam.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`w-full rounded-lg px-3 py-3 text-left transition-all hover:-translate-y-1 ${
                isActive
                  ? 'bg-[var(--action-accent-soft)] ring-1 ring-inset ring-[var(--action-accent)]'
                  : 'hover:bg-[var(--sky-surface)]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--sky-text)]">{exam.title}</p>
                  <p className="text-xs text-[var(--sky-subtle)]">
                    {exam.level} · {exam.scheduled}
                  </p>
                </div>
                <StatusPill tone={status.tone}>{status.label}</StatusPill>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <ProgressBar
                  value={exam.stats.graded}
                  max={exam.stats.total}
                  tone={exam.stats.graded === exam.stats.total ? 'positive' : 'info'}
                  label={`${exam.title} progress`}
                />
                <span className="text-xs tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">
                  {exam.stats.graded}/{exam.stats.total}
                </span>
              </div>
              {exam.stats.needsReview > 0 && (
                <p className="mt-1.5 text-xs text-[var(--vscode-orange)]">{exam.stats.needsReview} need review</p>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
