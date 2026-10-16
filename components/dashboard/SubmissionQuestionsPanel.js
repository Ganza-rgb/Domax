'use client'

import ScoreEditor from './ScoreEditor'

export default function SubmissionQuestionsPanel({ submission, onScoreChange }) {
  if (!submission) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--sky-panel-border)] px-4 py-8 text-center text-sm text-[var(--sky-subtle)]">
        Select a submission to begin grading.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {submission.questions.map((question, index) => (
        <ScoreEditor
          key={question.id}
          index={index}
          question={question}
          onChange={(score, comment) => onScoreChange(question.id, score, comment)}
        />
      ))}
    </div>
  )
}
