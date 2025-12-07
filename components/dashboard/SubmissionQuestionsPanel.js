'use client'

import ScoreEditor from './ScoreEditor'

export default function SubmissionQuestionsPanel({ submission, onScoreChange }) {
  if (!submission) {
    return (
      <div className="sky-card border-dashed text-center text-sm text-[var(--sky-subtle)]">
        Select a submission to begin grading.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {submission.questions.map((question) => (
        <ScoreEditor
          key={question.id}
          question={question}
          onChange={(score, comment) => onScoreChange(question.id, score, comment)}
        />
      ))}
    </div>
  )
}

