'use client'

import { useState, useEffect } from 'react'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Notice, Panel, StatusPill, fieldClass, labelClass } from '@/components/dashboard/ui'

const LEVEL_LABELS = { primary: 'Primary', 'o-level': 'O-Level', 'a-level': 'A-Level' }

export default function CoursesPage() {
  const { setCurrentSection } = useDashboardState()
  const [courses, setCourses] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [error, setError] = useState(null)
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    level: '',
    description: '',
  })

  useEffect(() => {
    setCurrentSection('courses')
    // TODO: Load courses from API
  }, [setCurrentSection])

  const handleCreateCourse = () => {
    if (!newCourse.name || !newCourse.code) {
      setError('Please fill in course name and code.')
      return
    }

    // TODO: Save course via API
    setCourses([...courses, { ...newCourse, id: Date.now(), studentCount: 0, examCount: 0 }])
    setNewCourse({ name: '', code: '', level: '', description: '' })
    setError(null)
    setShowCreateForm(false)
  }

  const cancel = () => {
    setShowCreateForm(false)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Course management"
        title="Manage your courses and classes"
        subtitle="Organize students, exams, and assignments by course"
        actions={
          <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)} disabled={showCreateForm}>
            Create course
          </Button>
        }
      />

      {/* Create form */}
      {showCreateForm && (
        <Panel meta="New" title="New course">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleCreateCourse()
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="course-name" className={labelClass}>Course name</label>
                <input
                  id="course-name"
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g., Mathematics S3"
                  aria-invalid={Boolean(error && !newCourse.name)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="course-code" className={labelClass}>Course code</label>
                <input
                  id="course-code"
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  placeholder="e.g., MATH-S3"
                  aria-invalid={Boolean(error && !newCourse.code)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="course-level" className={labelClass}>
                  Level <span className="font-normal text-[var(--sky-subtle)]">(optional)</span>
                </label>
                <select
                  id="course-level"
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                  className={fieldClass}
                >
                  <option value="">Select level</option>
                  <option value="primary">Primary</option>
                  <option value="o-level">O-Level</option>
                  <option value="a-level">A-Level</option>
                </select>
              </div>
              <div>
                <label htmlFor="course-description" className={labelClass}>
                  Description <span className="font-normal text-[var(--sky-subtle)]">(optional)</span>
                </label>
                <input
                  id="course-description"
                  type="text"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Optional description"
                  className={fieldClass}
                />
              </div>
            </div>

            {error && <Notice tone="caution">{error}</Notice>}

            <div className="flex justify-end gap-2 border-t border-[var(--sky-panel-border)] pt-4">
              <Button variant="secondary" size="sm" onClick={cancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Create course
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Courses list */}
      {courses.length === 0 ? (
        !showCreateForm && (
          <EmptyState
            title="No courses yet"
            body="Courses group your students, exams and assignments by class."
            action={
              <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)}>
                Create your first course
              </Button>
            }
          />
        )
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <li key={course.id} className="rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-semibold text-[var(--sky-text)]">{course.name}</h3>
                  <p className="text-sm text-[var(--sky-subtle)]">{course.code}</p>
                </div>
                {course.level && <StatusPill>{LEVEL_LABELS[course.level] || course.level}</StatusPill>}
              </div>
              {course.description && <p className="text-sm text-[var(--sky-subtle)]">{course.description}</p>}
              <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-[var(--sky-panel-border)] pt-3">
                <div>
                  <dt className="text-xs text-[var(--sky-subtle)]">Students</dt>
                  <dd className="text-lg font-semibold tabular-nums text-[var(--sky-text)]">{course.studentCount || 0}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--sky-subtle)]">Exams</dt>
                  <dd className="text-lg font-semibold tabular-nums text-[var(--sky-text)]">{course.examCount || 0}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
