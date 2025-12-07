'use client'

export default function ScoreEditor({ question, onChange }) {
  if (!question) return null

  const handleScoreChange = (event) => {
    const value = Number(event.target.value)
    const safeValue = Math.min(question.maxScore, Math.max(0, value))
    onChange(safeValue, question.comment)
  }

  return (
    <div className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-3">
      <div className="flex items-center justify-between text-sm font-semibold text-[var(--sky-text)]">
        <span>{question.title}</span>
        <span className="text-xs text-[var(--sky-subtle)]">/ {question.maxScore}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-[var(--sky-subtle)]">
        <div>
          <p className="sky-label text-[0.65rem]">AI</p>
          <p className="text-lg font-semibold text-[var(--sky-text)]">{question.aiScore}</p>
        </div>
        <div>
          <p className="sky-label text-[0.65rem]">Confidence</p>
          <p className={question.confidence >= 0.8 ? 'text-emerald-500 font-semibold' : 'text-amber-500 font-semibold'}>
            {(question.confidence * 100).toFixed(0)}%
          </p>
        </div>
        <div>
          <p className="sky-label text-[0.65rem]">Teacher</p>
          <input
            type="number"
            value={question.teacherScore ?? ''}
            placeholder={question.aiScore}
            onChange={handleScoreChange}
            className="mt-1 w-full rounded-xl border border-[var(--sky-panel-border)] px-2 py-1 text-sm text-[var(--sky-text)] bg-[var(--sky-panel)] focus:outline-none focus:ring-2 focus:ring-[#005ffe]"
          />
        </div>
      </div>
      <textarea
        value={question.comment || ''}
        onChange={(event) => onChange(question.teacherScore ?? null, event.target.value)}
        placeholder="Add inline comment"
        className="mt-2 w-full rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]/70 px-3 py-2 text-xs text-[var(--sky-subtle)] focus:outline-none focus:ring-2 focus:ring-[#005ffe]"
      />
    </div>
  )
}

