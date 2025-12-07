'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/atoms/Button'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useDashboardState } from '@/states/useDashboardState'
import SubmissionPagesViewer from './SubmissionPagesViewer'
import SubmissionQuestionsPanel from './SubmissionQuestionsPanel'

export default function SubmissionCanvas() {
  const { submissions, activeSubmission, setActiveSubmissionId, updateQuestionScore, finalizeSubmission } =
    useSubmissionState()
  const { setSelectedSubmission, updatePanel } = useDashboardState()
  const [activePage, setActivePage] = useState(activeSubmission?.pages?.[0]?.id || null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!activeSubmission && submissions.length > 0) {
      setActiveSubmissionId(submissions[0].id)
    }
  }, [activeSubmission, submissions, setActiveSubmissionId])

  useEffect(() => {
    if (!activeSubmission) return
    setSelectedSubmission(activeSubmission.id)
    updatePanel({ type: 'submission', payload: activeSubmission })
    setActivePage(activeSubmission.pages?.[0]?.id || null)
  }, [activeSubmission, setSelectedSubmission, updatePanel])

  const handleFinalize = () => {
    if (!activeSubmission) return
    const response = finalizeSubmission(activeSubmission.id)
    if (!response?.success) {
      setToast('Mark remaining questions before finalizing.')
      return
    }
    setToast(`Submission finalized • ${response.result.totalScore}/${response.result.maxScore}`)
  }

  const handleOverride = (questionId, score, comment) => {
    if (!activeSubmission) return
    updateQuestionScore(activeSubmission.id, questionId, score, comment)
  }

  if (!activeSubmission) {
    return (
      <div className="sky-card border-dashed text-center text-sm text-[var(--sky-subtle)]">
        No submissions queued yet. Create an exam or import past scripts to start grading.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {toast && (
        <div className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-4 py-3 text-sm text-[var(--sky-text)] shadow-[var(--sky-shadow)]">
          {toast}
        </div>
      )}
      <div className="sky-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="sky-label">Currently grading</p>
            <h3 className="text-xl font-semibold text-[var(--sky-text)]">{activeSubmission.student.name}</h3>
            <p className="text-sm text-[var(--sky-subtle)]">{activeSubmission.student.classRoom}</p>
          </div>
          <div className="flex items-center gap-3 lg:ml-auto">
            <Button variant="outline" size="sm">
              Request re-upload
            </Button>
            <Button variant="primary" size="sm" onClick={handleFinalize}>
              Finalize submission
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-5 space-y-4">
            <SubmissionPagesViewer pages={activeSubmission.pages} activePage={activePage} onSelectPage={setActivePage} />
            <div className="rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]/70 p-4">
              <p className="sky-label">Keyboard</p>
              <p className="text-sm text-[var(--sky-text)] mt-2">
                Use ← → to switch pages,{' '}
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">Ctrl</kbd> +
                number to jump to a question.
              </p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <SubmissionQuestionsPanel submission={activeSubmission} onScoreChange={handleOverride} />
          </div>
        </div>
      </div>
    </div>
  )
}

