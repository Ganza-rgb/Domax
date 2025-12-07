'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import SubmissionCanvas from '@/components/dashboard/SubmissionCanvas'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function SubmissionsPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { submissions, setActiveSubmissionId, activeSubmission } = useSubmissionState()

  useEffect(() => {
    setCurrentSection('submissions')
    if (activeSubmission) {
      updatePanel({ type: 'submission', payload: activeSubmission })
    }
  }, [setCurrentSection, activeSubmission, updatePanel])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Submissions workspace"
        title="Review and finalize scripts"
        subtitle="AI does the heavy lifting, you focus on the edge cases."
      />
      <section className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <article className="sky-card max-h-[80vh] overflow-y-auto" data-tour="submission-queue">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="sky-label">Queue</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Triage list</h3>
            </div>
            <span className="text-xs text-[var(--sky-subtle)]">{submissions.length} scripts</span>
          </div>
          <div className="space-y-3">
            {submissions.map((submission) => {
              const isActive = activeSubmission?.id === submission.id
              return (
                <button
                  key={submission.id}
                  type="button"
                  onClick={() => setActiveSubmissionId(submission.id)}
                  className={`w-full text-left rounded-2xl border px-4 py-3 text-sm transition-all ${
                    isActive
                      ? 'border-[#005ffe] bg-[#f0f4ff] text-[var(--sky-text)] shadow-lg'
                      : 'border-[var(--sky-panel-border)] text-[var(--sky-text)] hover:border-[#b9c6ff]'
                  }`}
                >
                  <p className="font-semibold">{submission.student.name}</p>
                  <p className="text-xs text-[var(--sky-subtle)]">{submission.status.replace('-', ' ')}</p>
                </button>
              )
            })}
            {submissions.length === 0 && (
              <p className="text-sm text-[var(--sky-subtle)]">No scripts yet. Create an exam to begin.</p>
            )}
          </div>
        </article>

        <SubmissionCanvas />
      </section>
    </div>
  )
}
