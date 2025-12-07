'use client'

import Button from '@/components/atoms/Button'

export default function StudentProfile({ student }) {
  if (!student) {
    return (
      <div className="sky-card border-dashed text-center text-sm text-[var(--sky-subtle)]">
        Select a student to view progress.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="sky-card">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="sky-label">Student</p>
            <h2 className="text-2xl font-semibold text-[var(--sky-text)]">{student.name}</h2>
            <p className="text-sm text-[var(--sky-subtle)]">{student.level}</p>
            <p className="text-xs text-[var(--sky-subtle)]">Last active {student.lastActive}</p>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              Message
            </Button>
            <Button variant="primary" size="sm">
              Share report
            </Button>
          </div>
        </div>
      </div>
      <div className="sky-card">
        <p className="sky-label">Recent exams</p>
        <div className="mt-3 space-y-3">
          {student.recentExams.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--sky-text)]">{exam.title}</p>
                <p className="text-xs text-[var(--sky-subtle)]">{exam.date}</p>
              </div>
              <span className="text-sm font-semibold text-[#005ffe]">{exam.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

