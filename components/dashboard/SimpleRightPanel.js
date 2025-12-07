'use client'

import { useMemo } from 'react'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useUserState } from '@/states/useUserState'

export default function SimpleRightPanel() {
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

  // Simple, clear content
  if (submission) {
    const avgConfidence = submission.questions?.length
      ? (submission.questions.reduce((sum, q) => sum + (q?.confidence ?? 0), 0) / submission.questions.length * 100).toFixed(0)
      : '—'

    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-1">Submission Details</h3>
          <p className="text-xs text-[var(--sky-subtle)] mb-4">{submission.student?.name || 'Unknown'}</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--sky-subtle)]">Confidence</span>
              <span className="text-sm font-semibold text-[var(--sky-text)]">{avgConfidence}%</span>
            </div>
            <div className="h-2 bg-[var(--sky-surface)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#005ffe]"
                style={{ width: `${avgConfidence}%` }}
              />
            </div>
          </div>

          {submission.status && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Status: </span>
              <span className="text-xs font-medium text-[var(--sky-text)]">{submission.status}</span>
            </div>
          )}

          {submission.receivedAt && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Received: </span>
              <span className="text-xs text-[var(--sky-text)]">{submission.receivedAt}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (exam) {
    const progress = exam.stats?.total ? ((exam.stats.graded / exam.stats.total) * 100).toFixed(0) : 0

    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-1">Exam Details</h3>
          <p className="text-xs text-[var(--sky-subtle)] mb-4">{exam.title || 'Untitled Exam'}</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--sky-subtle)]">Progress</span>
              <span className="text-sm font-semibold text-[var(--sky-text)]">{progress}%</span>
            </div>
            <div className="h-2 bg-[var(--sky-surface)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#005ffe]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--sky-subtle)] mt-1">
              {exam.stats?.graded || 0} / {exam.stats?.total || 0} graded
            </p>
          </div>

          {exam.level && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Level: </span>
              <span className="text-xs text-[var(--sky-text)]">{exam.level}</span>
            </div>
          )}

          {exam.scheduled && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Scheduled: </span>
              <span className="text-xs text-[var(--sky-text)]">{exam.scheduled}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (student) {
    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-1">Student Details</h3>
          <p className="text-xs text-[var(--sky-subtle)] mb-4">{student.name || 'Unknown'}</p>
        </div>

        <div className="space-y-3">
          {student.avgScore && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Average Score: </span>
              <span className="text-sm font-semibold text-[var(--sky-text)]">{student.avgScore}%</span>
            </div>
          )}

          {student.level && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Level: </span>
              <span className="text-xs text-[var(--sky-text)]">{student.level}</span>
            </div>
          )}

          {student.lastActive && (
            <div>
              <span className="text-xs text-[var(--sky-subtle)]">Last Active: </span>
              <span className="text-xs text-[var(--sky-text)]">{student.lastActive}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default empty state
  return (
    <div className="p-4">
      <p className="text-sm text-[var(--sky-subtle)] text-center py-8">
        Select an item to view details
      </p>
    </div>
  )
}




