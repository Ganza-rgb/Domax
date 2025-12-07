'use client'

import Button from '@/components/atoms/Button'
import { useUserState } from '@/states/useUserState'
import { useDashboardState } from '@/states/useDashboardState'

export default function StudentList({ onCreateStudent }) {
  const { students } = useUserState()
  const { setSelectedStudent, updatePanel } = useDashboardState()

  const handleSelect = (studentId) => {
    setSelectedStudent(studentId)
    const student = students.find((item) => item.id === studentId)
    if (student) {
      updatePanel({ type: 'student', payload: student })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="sm" onClick={onCreateStudent}>
          Add student
        </Button>
        <Button variant="outline" size="sm">
          Import roster
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {students.map((student) => (
          <button
            key={student.id}
            type="button"
            onClick={() => handleSelect(student.id)}
            className="sky-card text-left hover:border-[#005ffe] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--sky-text)]">{student.name}</h3>
                <p className="text-xs text-[var(--sky-subtle)]">{student.level}</p>
              </div>
              <span className="text-xs font-semibold text-[#00cd90]">{student.trend}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-[var(--sky-subtle)]">
              <span>Average score</span>
              <span className="text-[var(--sky-text)] font-semibold">{student.avgScore}%</span>
            </div>
            <p className="text-xs text-[var(--sky-subtle)] mt-2">Last active {student.lastActive}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

