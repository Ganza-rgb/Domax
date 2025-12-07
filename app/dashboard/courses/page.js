'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'

export default function CoursesPage() {
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const [courses, setCourses] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
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
      alert('Please fill in course name and code')
      return
    }
    // TODO: Save course via API
    setCourses([...courses, { ...newCourse, id: Date.now(), studentCount: 0, examCount: 0 }])
    setNewCourse({ name: '', code: '', level: '', description: '' })
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Course management"
        title="Manage your courses and classes"
        subtitle="Organize students, exams, and assignments by course"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create course'}
          </Button>
        }
      />

      {/* Create form */}
      {showCreateForm && (
        <div className="sky-card space-y-4">
          <h3 className="text-lg font-semibold text-[var(--sky-text)]">New course</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">
                Course name *
              </label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="e.g., Mathematics S3"
                className="w-full px-4 py-2 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">
                Course code *
              </label>
              <input
                type="text"
                value={newCourse.code}
                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                placeholder="e.g., MATH-S3"
                className="w-full px-4 py-2 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">
                Level
              </label>
              <select
                value={newCourse.level}
                onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                className="w-full px-4 py-2 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
              >
                <option value="">Select level</option>
                <option value="primary">Primary</option>
                <option value="o-level">O-Level</option>
                <option value="a-level">A-Level</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">
                Description
              </label>
              <input
                type="text"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Optional description"
                className="w-full px-4 py-2 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateCourse}>
              Create course
            </Button>
          </div>
        </div>
      )}

      {/* Courses list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length === 0 && !showCreateForm ? (
          <div className="col-span-full sky-card text-center py-12">
            <p className="text-[var(--sky-subtle)] mb-4">No courses yet</p>
            <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)}>
              Create your first course
            </Button>
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="sky-card hover:border-[#005ffe] transition-colors cursor-pointer"
              onClick={() => router.push(`/dashboard/courses/${course.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sky-text)]">{course.name}</h3>
                  <p className="text-sm text-[var(--sky-subtle)]">{course.code}</p>
                </div>
                {course.level && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--sky-surface)] text-[var(--sky-text)]">
                    {course.level}
                  </span>
                )}
              </div>
              {course.description && (
                <p className="text-sm text-[var(--sky-subtle)] mb-4">{course.description}</p>
              )}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--sky-panel-border)]">
                <div>
                  <p className="text-xs text-[var(--sky-subtle)] mb-1">Students</p>
                  <p className="text-lg font-semibold text-[var(--sky-text)]">{course.studentCount || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--sky-subtle)] mb-1">Exams</p>
                  <p className="text-lg font-semibold text-[var(--sky-text)]">{course.examCount || 0}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}




