'use client'

import { useState } from 'react'
import { LOW_CONFIDENCE } from './ui'

/**
 * One question in the review workspace: the AI's suggested mark, the
 * teacher's mark (the only one that counts) and an optional comment.
 *
 * The AI score is a suggestion only. "Use suggestion" copies it into the
 * teacher's mark as an explicit action; nothing is filled in automatically.
 */
export default function ScoreEditor({ question, index, onChange }) {
  // Local draft so the field can be empty while typing. Previously an empty
  // field was stored as 0, which counted as a teacher mark.
  const [draft, setDraft] = useState(question?.teacherScore ?? '')
  const [syncedScore, setSyncedScore] = useState(question?.teacherScore)

  // When the stored mark changes elsewhere (e.g. "Use suggestion"), show it
  if (question?.teacherScore !== syncedScore) {
    setSyncedScore(question?.teacherScore)
    setDraft(question?.teacherScore ?? '')
  }

  if (!question) return null

  const isMarked = question.teacherScore !== null && question.teacherScore !== undefined
  const lowConfidence = question.confidence < LOW_CONFIDENCE
  const inputId = `score-${question.id}`
  const differsFromAi = isMarked && question.teacherScore !== question.aiScore

  const commit = (raw) => {
    if (raw === '' || raw === null) return
    const value = Number(raw)
    if (Number.isNaN(value)) return
    const safeValue = Math.min(question.maxScore, Math.max(0, value))
    onChange(safeValue, question.comment)
  }

  const handleScoreChange = (event) => {
    const raw = event.target.value
    setDraft(raw)
    commit(raw)
  }

  const handleBlur = () => {
    // Show the stored (clamped) value again if the field was left empty or out of range
    setDraft(question.teacherScore ?? '')
  }

  return (
    <article
      className={`rounded-xl border bg-[var(--sky-panel)] p-4 ${
        isMarked ? 'border-[var(--sky-panel-border)]' : 'border-[var(--sky-panel-border)] border-l-[3px] border-l-[var(--action-accent)]'
      }`}
      aria-labelledby={`${inputId}-title`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 id={`${inputId}-title`} className="text-sm font-semibold text-[var(--sky-text)] leading-snug">
          {typeof index === 'number' && <span className="mr-1.5 text-[var(--sky-subtle)] tabular-nums">Q{index + 1}</span>}
          {question.title}
        </h3>
        <span className="text-xs text-[var(--sky-subtle)] whitespace-nowrap tabular-nums">{question.maxScore} marks</span>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:items-end">
        {/* AI suggestion */}
        <div className="rounded-lg bg-[var(--sky-surface)] px-3 py-2.5">
          <p className="text-xs text-[var(--sky-subtle)]">AI suggestion</p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-lg font-semibold tabular-nums text-[var(--sky-text)]">
              {question.aiScore}
              <span className="text-sm font-normal text-[var(--sky-subtle)]"> / {question.maxScore}</span>
            </p>
            <p className={`text-xs font-medium tabular-nums ${lowConfidence ? 'text-[var(--vscode-orange)]' : 'text-[var(--sky-subtle)]'}`}>
              {(question.confidence * 100).toFixed(0)}% confidence{lowConfidence ? ' · check carefully' : ''}
            </p>
            {!isMarked && (
              <button
                type="button"
                onClick={() => onChange(question.aiScore, question.comment)}
                className="ml-auto text-xs font-semibold text-[var(--action-accent)] hover:underline rounded"
              >
                Use suggestion
              </button>
            )}
          </div>
        </div>

        {/* Teacher mark */}
        <div>
          <label htmlFor={inputId} className="block text-xs text-[var(--sky-subtle)] mb-1">
            Your mark
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id={inputId}
              data-question-input={index}
              type="number"
              inputMode="decimal"
              min={0}
              max={question.maxScore}
              step="0.5"
              value={draft}
              placeholder="—"
              onChange={handleScoreChange}
              onBlur={handleBlur}
              aria-describedby={`${inputId}-hint`}
              className={`h-10 w-20 rounded-lg border px-2.5 text-right text-base font-semibold tabular-nums text-[var(--sky-text)] bg-[var(--sky-panel)] focus:outline-none focus:ring-2 focus:ring-[var(--action-accent-soft)] focus:border-[var(--action-accent)] ${
                isMarked ? 'border-[var(--sky-panel-border)]' : 'border-[var(--action-accent)]'
              }`}
            />
            <span className="text-sm text-[var(--sky-subtle)] tabular-nums">/ {question.maxScore}</span>
          </div>
        </div>
      </div>

      <p id={`${inputId}-hint`} className="mt-2 text-xs text-[var(--sky-subtle)]" aria-live="polite">
        {!isMarked
          ? 'Not marked yet — enter a mark or use the suggestion.'
          : differsFromAi
            ? `Marked by you · changed from AI suggestion (${question.aiScore})`
            : 'Marked by you · matches the AI suggestion'}
      </p>

      <label htmlFor={`${inputId}-comment`} className="sr-only">
        Comment for {question.title}
      </label>
      <textarea
        id={`${inputId}-comment`}
        value={question.comment || ''}
        onChange={(event) => onChange(question.teacherScore ?? null, event.target.value)}
        placeholder="Add a comment for the student (optional)"
        rows={2}
        className="mt-2 w-full rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-3 py-2 text-sm text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--action-accent-soft)] focus:border-[var(--action-accent)]"
      />
    </article>
  )
}
