'use client'

import { useMemo } from 'react'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useUserState } from '@/states/useUserState'

export default function RightPanel({ variant = 'sidebar' }) {
  const { rightPanelData, selectedExam, selectedSubmission, selectedStudent } = useDashboardState()
  const { findExamById } = useExamState()
  const { findSubmissionById } = useSubmissionState()
  const { findStudentById } = useUserState()

  const submission = useMemo(() => {
    if (rightPanelData?.type === 'submission' && rightPanelData.payload) return rightPanelData.payload
    if (selectedSubmission) return findSubmissionById(selectedSubmission)
    return null
  }, [rightPanelData, selectedSubmission, findSubmissionById])

  const exam = useMemo(() => {
    if (rightPanelData?.type === 'exam' && rightPanelData.payload) return rightPanelData.payload
    if (selectedExam) return findExamById(selectedExam)
    return null
  }, [rightPanelData, selectedExam, findExamById])

  const student = useMemo(() => {
    if (rightPanelData?.type === 'student' && rightPanelData.payload) return rightPanelData.payload
    if (selectedStudent) return findStudentById(selectedStudent)
    return null
  }, [rightPanelData, selectedStudent, findStudentById])

  const renderSubmissionPanel = () => {
    if (!submission) return null
    const questions = submission?.questions || []
    const avg = questions.length
      ? (questions.reduce((sum, q) => sum + (q?.confidence ?? 0), 0) / questions.length).toFixed(2)
      : '—'
    return (
      <div className="space-y-4">
        <section className="sky-card">
          <p className="sky-label">Student</p>
          <h3 className="text-lg font-semibold text-[var(--sky-text)]">{submission.student?.name}</h3>
          <p className="text-sm text-[var(--sky-subtle)]">{submission.student?.classRoom}</p>
          <p className="text-xs text-[var(--sky-subtle)]">Received {submission.receivedAt}</p>
        </section>
        <section className="sky-card space-y-3">
          <div className="flex items-center justify-between">
            <p className="sky-label">Confidence</p>
            <span className="text-sm font-semibold text-[var(--sky-text)]">{avg}</span>
          </div>
          {questions.length ? (
            <div className="space-y-2 text-sm text-[var(--sky-subtle)]">
              {questions.map((question) => (
                <div key={question.id} className="flex items-center justify-between">
                  <span>{question.title}</span>
                  <span className={(question?.confidence ?? 0) >= 0.8 ? 'text-emerald-500' : 'text-amber-500'}>
                    {((question?.confidence ?? 0) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--sky-subtle)]">No question-level insights yet.</p>
          )}
        </section>
        {submission?.aiSummary && (
          <section className="sky-card border border-[#fbe4cc] bg-[#fff8f1] text-[#7a3c16]">
            <p className="sky-label text-[#b45309]">AI summary</p>
            <p className="text-sm">{submission.aiSummary}</p>
            {submission.weakAreas?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {submission.weakAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2 py-1 text-xs font-semibold rounded-full bg-[var(--sky-panel)] border border-[#fcd9b8] text-[#b45309]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        )}
      </div>
    )
  }

  const renderExamPanel = () => {
    if (!exam) return null
    return (
      <div className="space-y-4">
        <section className="sky-card">
          <p className="sky-label">Exam</p>
          <h3 className="text-lg font-semibold text-[var(--sky-text)]">{exam.title}</h3>
          <p className="text-sm text-[var(--sky-subtle)]">
            {exam.level} • {exam.duration}
          </p>
          <p className="text-xs text-[var(--sky-subtle)]">Scheduled {exam.scheduled}</p>
        </section>
        <section className="sky-card space-y-2">
          <p className="sky-label">Completion</p>
          <p className="text-sm text-[var(--sky-text)]">
            {exam.stats?.graded} / {exam.stats?.total} graded
          </p>
          <div className="h-2 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00cd90] to-[#005ffe]"
              style={{ width: `${((exam.stats?.graded ?? 0) / Math.max(exam.stats?.total || 1, 1)) * 100}%` }}
            />
          </div>
          <p className="text-xs text-[var(--sky-subtle)]">
            {exam.stats?.needsReview} need review • {exam.stats?.aiLowConfidence} low-confidence
          </p>
        </section>
      </div>
    )
  }

  const renderStudentPanel = () => {
    if (!student) return null
    return (
      <div className="space-y-4">
        <section className="sky-card">
          <p className="sky-label">Learner</p>
          <h3 className="text-lg font-semibold text-[var(--sky-text)]">{student.name}</h3>
          <p className="text-sm text-[var(--sky-subtle)]">{student.level}</p>
          <p className="text-xs text-[var(--sky-subtle)]">Last active {student.lastActive}</p>
        </section>
        <section className="sky-card space-y-3">
          <div className="flex items-center justify-between">
            <p className="sky-label">Avg. score</p>
            <span className="text-base font-semibold text-[var(--sky-text)]">{student.avgScore}%</span>
          </div>
          <p className="text-xs text-emerald-500">{student.trend} vs last month</p>
          <div className="space-y-2 text-sm text-[var(--sky-subtle)]">
            {student.recentExams?.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between">
                <span>{exam.title}</span>
                <span className="text-[var(--sky-text)] font-semibold">{exam.score}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  let content = null
  if (submission) {
    content = renderSubmissionPanel()
  } else if (exam) {
    content = renderExamPanel()
  } else if (student) {
    content = renderStudentPanel()
  } else {
    content = (
      <div className="space-y-4">
        <section className="sky-card">
          <p className="sky-label">Next steps</p>
          <ul className="space-y-2 text-sm text-[var(--sky-text)]">
            <li>• Triage low-confidence submissions</li>
            <li>• Queue fresh past papers for S3</li>
            <li>• Pin the next live class agenda</li>
          </ul>
        </section>
        <section className="sky-card">
          <p className="sky-label">Shortcuts</p>
          <div className="flex flex-wrap gap-2">
            {['Create exam', 'Open queue', 'Message student'].map((action) => (
              <span key={action} className="px-3 py-1 text-xs font-semibold bg-[var(--sky-surface)] rounded-full text-[var(--sky-text)]">
                {action}
              </span>
            ))}
          </div>
        </section>
      </div>
    )
  }

  const containerClass =
    variant === 'sidebar'
      ? 'rounded-[32px] border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 h-full shadow-[var(--sky-shadow)] overflow-y-auto'
      : 'rounded-[32px] border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 shadow-[var(--sky-shadow)] max-h-[80vh] overflow-y-auto'

  return <div className={containerClass}>{content}</div>
}


