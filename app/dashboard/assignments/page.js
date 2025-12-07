'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'

export default function AssignmentsPage() {
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    setCurrentSection('assignments')
    // TODO: Load assignments from API
  }, [setCurrentSection])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Assignment management"
        title="Manage assignments and tasks"
        subtitle="Create, schedule, and track assignments across your courses"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/dashboard/upload')}
          >
            Create assignment
          </Button>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sky-card">
          <p className="text-xs text-[var(--sky-subtle)] mb-1">Total</p>
          <p className="text-2xl font-semibold text-[var(--sky-text)]">{assignments.length}</p>
        </div>
        <div className="sky-card">
          <p className="text-xs text-[var(--sky-subtle)] mb-1">Active</p>
          <p className="text-2xl font-semibold text-[var(--sky-text)]">
            {assignments.filter((a) => a.status === 'active').length}
          </p>
        </div>
        <div className="sky-card">
          <p className="text-xs text-[var(--sky-subtle)] mb-1">Pending</p>
          <p className="text-2xl font-semibold text-[var(--sky-text)]">
            {assignments.filter((a) => a.status === 'pending').length}
          </p>
        </div>
        <div className="sky-card">
          <p className="text-xs text-[var(--sky-subtle)] mb-1">Completed</p>
          <p className="text-2xl font-semibold text-[var(--sky-text)]">
            {assignments.filter((a) => a.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Assignments list */}
      {assignments.length === 0 ? (
        <div className="sky-card text-center py-12">
          <p className="text-[var(--sky-subtle)] mb-4">No assignments yet</p>
          <Button variant="primary" size="sm" onClick={() => router.push('/dashboard/upload')}>
            Create your first assignment
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="sky-card hover:border-[#005ffe] transition-colors cursor-pointer"
              onClick={() => router.push(`/dashboard/assignments/${assignment.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--sky-text)] mb-1">{assignment.title}</h3>
                  <p className="text-sm text-[var(--sky-subtle)]">{assignment.course}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[var(--sky-subtle)]">Submissions</p>
                    <p className="text-sm font-semibold text-[var(--sky-text)]">
                      {assignment.submissionCount || 0}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      assignment.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : assignment.status === 'pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}




