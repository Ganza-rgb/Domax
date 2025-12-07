'use client'

import Button from '@/components/atoms/Button'
import { useExamState } from '@/states/useExamState'
import { useDashboardState } from '@/states/useDashboardState'

export default function ExamList({ onCreateExam }) {
  const { exams, setActiveExamId } = useExamState()
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
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="sm" onClick={onCreateExam}>
          Create exam
        </Button>
        <Button variant="outline" size="sm">
          Import exam
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <button
            key={exam.id}
            type="button"
            onClick={() => handleSelect(exam.id)}
            className="sky-card text-left transition-all hover:-translate-y-1 hover:border-[#005ffe]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="sky-label">{exam.level}</p>
                <h3 className="text-xl font-semibold text-[var(--sky-text)]">{exam.title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--sky-surface)] text-[#005ffe]">
                {exam.status === 'in-progress' ? 'In progress' : 'Draft'}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-[var(--sky-subtle)]">
              <div>
                <p className="sky-label text-[0.65rem]">Total</p>
                <p className="text-lg font-semibold text-[var(--sky-text)]">{exam.stats.total}</p>
              </div>
              <div>
                <p className="sky-label text-[0.65rem]">Graded</p>
                <p className="text-lg font-semibold text-[var(--sky-text)]">{exam.stats.graded}</p>
              </div>
              <div>
                <p className="sky-label text-[0.65rem]">Review</p>
                <p className="text-lg font-semibold text-[var(--sky-text)]">{exam.stats.needsReview}</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[var(--sky-surface)]/70 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00cd90] to-[#005ffe]"
                style={{ width: `${(exam.stats.graded / exam.stats.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[var(--sky-subtle)] mt-2">Scheduled {exam.scheduled}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

