'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useDashboardState } from '@/states/useDashboardState'
import SubmissionPagesViewer from './SubmissionPagesViewer'
import SubmissionQuestionsPanel from './SubmissionQuestionsPanel'
import { WsButton as Button, ConfirmDialog, Notice, ProgressBar, StatusPill, markedCount, submissionStatus } from './ui'

export default function SubmissionCanvas() {
  const { submissions, activeSubmission, setActiveSubmissionId, updateQuestionScore, finalizeSubmission, finalized } =
    useSubmissionState()
  const { setSelectedSubmission, updatePanel } = useDashboardState()
  const [activePage, setActivePage] = useState(activeSubmission?.pages?.[0]?.id || null)
  const [notice, setNotice] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

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

  // Clear feedback when switching scripts
  const [noticeFor, setNoticeFor] = useState(activeSubmission?.id)
  if (activeSubmission?.id !== noticeFor) {
    setNoticeFor(activeSubmission?.id)
    setNotice(null)
    setConfirmOpen(false)
  }

  const focusQuestion = useCallback((questionIndex) => {
    const input = document.querySelector(`[data-question-input="${questionIndex}"]`)
    if (input) {
      input.scrollIntoView({ block: 'center' })
      input.focus()
    }
  }, [])

  // Keyboard: ← → switch pages, Ctrl/⌘ + number jumps to a question
  useEffect(() => {
    if (!activeSubmission) return undefined
    const onKey = (event) => {
      const target = event.target
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if ((event.ctrlKey || event.metaKey) && /^[1-9]$/.test(event.key)) {
        const questionIndex = Number(event.key) - 1
        if (questionIndex < activeSubmission.questions.length) {
          event.preventDefault()
          focusQuestion(questionIndex)
        }
        return
      }
      if (typing || event.altKey || event.ctrlKey || event.metaKey) return
      const pages = activeSubmission.pages || []
      const index = pages.findIndex((page) => page.id === activePage)
      if (event.key === 'ArrowRight' && index < pages.length - 1) {
        setActivePage(pages[index + 1].id)
      } else if (event.key === 'ArrowLeft' && index > 0) {
        setActivePage(pages[index - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeSubmission, activePage, focusQuestion])

  const handleFinalizeRequest = () => {
    if (!activeSubmission) return
    const pending = activeSubmission.questions.filter((q) => q.teacherScore == null)
    if (pending.length > 0) {
      setNotice({
        tone: 'caution',
        pending: pending.map((q) => ({ id: q.id, title: q.title, index: activeSubmission.questions.indexOf(q) })),
      })
      return
    }
    setNotice(null)
    setConfirmOpen(true)
  }

  const handleFinalizeConfirm = () => {
    setConfirmOpen(false)
    const response = finalizeSubmission(activeSubmission.id)
    if (!response?.success) {
      setNotice({ tone: 'caution', text: 'Mark remaining questions before finalizing.' })
      return
    }
    setNotice({
      tone: 'positive',
      text: `Finalized ${activeSubmission.student.name} · ${response.result.totalScore} / ${response.result.maxScore}`,
    })
  }

  const handleOverride = (questionId, score, comment) => {
    if (!activeSubmission) return
    updateQuestionScore(activeSubmission.id, questionId, score, comment)
  }

  if (!activeSubmission) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--sky-panel-border)] px-6 py-12 text-center text-sm text-[var(--sky-subtle)]">
        No submissions queued yet. Create an exam or import past scripts to start grading.
      </div>
    )
  }

  const status = submissionStatus(activeSubmission.status)
  const total = activeSubmission.questions.length
  const marked = markedCount(activeSubmission.questions)
  const teacherTotal = activeSubmission.questions.reduce((acc, q) => acc + (q.teacherScore ?? 0), 0)
  const maxTotal = activeSubmission.questions.reduce((acc, q) => acc + q.maxScore, 0)
  const isFinalized = activeSubmission.status === 'completed'
  const finalResult = finalized?.[activeSubmission.id]

  return (
    <div className="min-w-0 rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--sky-panel-border)] px-5 py-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-[var(--sky-text)]">{activeSubmission.student.name}</h2>
            <StatusPill tone={status.tone}>{status.label}</StatusPill>
          </div>
          <p className="text-sm text-[var(--sky-subtle)]">
            {activeSubmission.student.classRoom}
            {activeSubmission.receivedAt && <> · received {activeSubmission.receivedAt}</>}
          </p>
        </div>
        <div className="w-full lg:w-56">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[var(--sky-subtle)]">Marked by you</span>
            <span className="font-medium tabular-nums text-[var(--sky-text)]">{marked} of {total}</span>
          </div>
          <ProgressBar value={marked} max={total} tone={marked === total ? 'positive' : 'info'} label="Questions marked" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled
            title="Re-upload requests are not available yet"
          >
            Request re-upload
          </Button>
          <Button variant="primary" size="sm" onClick={handleFinalizeRequest} disabled={isFinalized}>
            {isFinalized ? 'Finalized' : 'Finalize submission'}
          </Button>
        </div>
      </div>

      {/* Feedback */}
      {(notice || (isFinalized && finalResult)) && (
        <div className="px-5 pt-4">
          {notice?.pending ? (
            <Notice tone="caution" onDismiss={() => setNotice(null)}>
              Mark remaining questions before finalizing:{' '}
              {notice.pending.map((q, i) => (
                <span key={q.id}>
                  {i > 0 && ', '}
                  <button type="button" onClick={() => focusQuestion(q.index)} className="font-semibold underline underline-offset-2">
                    Q{q.index + 1} {q.title}
                  </button>
                </span>
              ))}
            </Notice>
          ) : notice ? (
            <Notice tone={notice.tone} onDismiss={() => setNotice(null)}>{notice.text}</Notice>
          ) : (
            <Notice tone="positive">
              Finalized · {finalResult.totalScore} / {finalResult.maxScore}
            </Notice>
          )}
        </div>
      )}

      <div className="grid grid-cols-12 gap-5 p-5">
        {/* Script */}
        <div className="col-span-12 xl:col-span-5 space-y-4">
          <SubmissionPagesViewer pages={activeSubmission.pages} activePage={activePage} onSelectPage={setActivePage} />

          {(activeSubmission.aiSummary || activeSubmission.weakAreas?.length > 0) && (
            <section className="rounded-xl border border-[var(--sky-panel-border)] p-4" aria-label="AI notes">
              <p className="sky-label mb-1.5">AI notes · suggestion only</p>
              {activeSubmission.aiSummary && (
                <p className="text-sm text-[var(--sky-text)] leading-relaxed">{activeSubmission.aiSummary}</p>
              )}
              {activeSubmission.weakAreas?.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {activeSubmission.weakAreas.map((area) => (
                    <li key={area}>
                      <StatusPill tone="caution">{area}</StatusPill>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <p className="hidden lg:block text-xs text-[var(--sky-subtle)]">
            <kbd className="px-1 py-0.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]">←</kbd>{' '}
            <kbd className="px-1 py-0.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]">→</kbd> switch pages ·{' '}
            <kbd className="px-1 py-0.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]">Ctrl</kbd> + number jumps to a question
          </p>
        </div>

        {/* Marking */}
        <div className="col-span-12 xl:col-span-7 space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-[var(--sky-text)]">Questions</h3>
            <p className="text-sm text-[var(--sky-subtle)] tabular-nums">
              Total <span className="font-semibold text-[var(--sky-text)]">{teacherTotal}</span> / {maxTotal}
            </p>
          </div>
          <SubmissionQuestionsPanel submission={activeSubmission} onScoreChange={handleOverride} />
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={`Finalize ${activeSubmission.student.name}'s script?`}
        confirmLabel="Finalize"
        onConfirm={handleFinalizeConfirm}
        onCancel={() => setConfirmOpen(false)}
      >
        <p>
          Total <span className="font-semibold text-[var(--sky-text)] tabular-nums">{teacherTotal} / {maxTotal}</span> from your marks on{' '}
          {total} questions. The script is marked as finalized and the result is recorded with today&apos;s date.
        </p>
      </ConfirmDialog>
    </div>
  )
}
