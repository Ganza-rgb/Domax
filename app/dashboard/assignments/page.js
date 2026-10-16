'use client'

import { useState, useEffect } from 'react'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, StatGroup, StatusPill } from '@/components/dashboard/ui'

const STATUS_TONE = { active: 'positive', pending: 'caution', completed: 'neutral' }

export default function AssignmentsPage() {
  const { setCurrentSection } = useDashboardState()
  const [assignments] = useState([])

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
          <Button variant="primary" size="sm" href="/dashboard/upload">
            Create assignment
          </Button>
        }
      />

      <StatGroup
        items={[
          { label: 'Total', value: assignments.length },
          { label: 'Active', value: assignments.filter((a) => a.status === 'active').length },
          { label: 'Pending', value: assignments.filter((a) => a.status === 'pending').length },
          { label: 'Completed', value: assignments.filter((a) => a.status === 'completed').length },
        ]}
      />

      {assignments.length === 0 ? (
        <EmptyState
          title="No assignments yet"
          body="Start by uploading the papers you want to grade."
          action={
            <Button variant="primary" size="sm" href="/dashboard/upload">
              Create your first assignment
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-[var(--sky-panel-border)] rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold text-[var(--sky-text)]">{assignment.title}</h3>
                <p className="text-sm text-[var(--sky-subtle)]">{assignment.course}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-[var(--sky-subtle)]">Submissions</p>
                  <p className="text-sm font-semibold tabular-nums text-[var(--sky-text)]">{assignment.submissionCount || 0}</p>
                </div>
                <StatusPill tone={STATUS_TONE[assignment.status] || 'neutral'}>{assignment.status}</StatusPill>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
