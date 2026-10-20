'use client'

import Link from 'next/link'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'

export default function ClassesPage() {
  const { classes, exams } = useWorkspace()

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        title="Classes"
        subtitle="Your students, with their IDs from CAMIS, Urubuto or the university, so marks always land against the right person."
        actions={
          <Button href="/dashboard/classes/new" size="lg" data-tour="new-class-button">
            New class
          </Button>
        }
      />

      {classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          body="Add a class and its students, or import the list from a spreadsheet."
          action={<Button href="/dashboard/classes/new" size="lg">New class</Button>}
        />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => {
            const examCount = exams.filter((exam) => exam.classId === cls.id).length
            return (
              <li key={cls.id}>
                <Link
                  href={`/dashboard/classes/${cls.id}`}
                  className="group block h-full rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 sm:p-6 hover:border-[var(--action-accent)] transition-colors"
                >
                  <p className="text-lg font-semibold group-hover:text-[var(--action-accent)]">{cls.name}</p>
                  <p className="text-sm text-[var(--sky-subtle)] mt-0.5">
                    {cls.level} · {cls.students.length} students · {examCount} exam{examCount === 1 ? '' : 's'}
                  </p>
                  {cls.under16 && (
                    <p className={`text-sm mt-3 ${cls.consent ? 'text-[var(--sky-subtle)]' : 'text-[var(--vscode-orange)]'}`}>
                      {cls.consent ? 'Under 16 · consent recorded' : 'Under 16 · consent not recorded yet'}
                    </p>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
