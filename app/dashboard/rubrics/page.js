'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState } from '@/components/dashboard/ui'
import { useWorkspace, latestVersion, rubricWarnings } from '@/states/useWorkspaceState'

export default function RubricsPage() {
  const router = useRouter()
  const { rubrics, exams, duplicateRubric } = useWorkspace()

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        title="Rubrics"
        subtitle="Your marking schemes. Write one once and reuse it next term. Every change is saved as a new version."
        actions={
          <Button href="/dashboard/rubrics/new" size="lg" data-tour="create-rubric-button">
            New rubric
          </Button>
        }
      />

      {rubrics.length === 0 ? (
        <EmptyState
          title="No rubrics yet"
          body="A rubric lists each question, its marks, the model answer and the points that earn credit."
          action={<Button href="/dashboard/rubrics/new" size="lg">New rubric</Button>}
        />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rubrics.map((rubric) => {
            const latest = latestVersion(rubric)
            const questions = latest?.questions || []
            const total = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
            const usedBy = exams.filter((exam) => exam.rubricId === rubric.id).length
            const warnings = rubricWarnings(questions)
            return (
              <li key={rubric.id} className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 sm:p-6 flex flex-col gap-4">
                <div>
                  <Link href={`/dashboard/rubrics/${rubric.id}`} className="text-lg font-semibold hover:text-[var(--action-accent)]">
                    {rubric.name}
                  </Link>
                  <p className="text-sm text-[var(--sky-subtle)] mt-0.5">
                    {rubric.level} · version {latest?.version} · {questions.length} questions · {total} marks
                  </p>
                </div>
                <p className="text-sm text-[var(--sky-subtle)]">
                  {usedBy ? `Used by ${usedBy} exam${usedBy === 1 ? '' : 's'}` : 'Not used yet'}
                  {warnings.length > 0 && <span className="text-[var(--vscode-orange)]"> · {warnings.length} thing{warnings.length === 1 ? '' : 's'} to fix</span>}
                </p>
                <div className="mt-auto flex gap-2">
                  <Button href={`/dashboard/rubrics/${rubric.id}`} variant="secondary" size="md">Open</Button>
                  <Button variant="ghost" size="md" onClick={() => router.push(`/dashboard/rubrics/${duplicateRubric(rubric.id)}`)}>
                    Duplicate
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
