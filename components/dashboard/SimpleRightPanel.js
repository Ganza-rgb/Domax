'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useUserState } from '@/states/useUserState'
import {
  ProgressBar,
  StatusPill,
  ReadSummary,
  markedCount,
  submissionStatus,
} from './ui'

/**
 * Context panel on the right of the workspace.
 *
 * It only appears when something is selected (an exam, a student or a
 * submission), so pages without a selection get the full width. It is hidden
 * on Home, Submissions and Exams, which already show the same details inline.
 */
export default function SimpleRightPanel() {
  const pathname = usePathname()
  const {
    rightPanelData,
    selectedExam,
    selectedSubmission,
    selectedStudent,
    setRightPanelData,
    setSelectedExam,
    setSelectedSubmission,
    setSelectedStudent,
  } = useDashboardState()
  const { findExamById } = useExamState()
  const { findSubmissionById } = useSubmissionState()
  const { findStudentById } = useUserState()

  const submission = useMemo(() => {
    if (rightPanelData?.type === 'submission' && rightPanelData.payload) {
      // Prefer the live record so marks entered elsewhere are reflected.
      return findSubmissionById(rightPanelData.payload.id) || rightPanelData.payload
    }
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

  // Pages that already show the selected record inline don't need the panel
  const hiddenHere =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/submissions') || pathname.startsWith('/dashboard/exams')
  const type = rightPanelData?.type
  // Show the item that matches the current panel type first, then fall back.
  const view =
    (type === 'student' && student && 'student') ||
    (type === 'exam' && exam && 'exam') ||
    (type === 'submission' && submission && 'submission') ||
    (submission && 'submission') ||
    (exam && 'exam') ||
    (student && 'student') ||
    null

  if (hiddenHere || !view) return null

  const close = () => {
    setRightPanelData({ type: 'overview', payload: null })
    setSelectedExam(null)
    setSelectedSubmission(null)
    setSelectedStudent(null)
  }

  return (
    <aside
      aria-label="Details"
      className="hidden xl:flex w-72 flex-shrink-0 flex-col border-l border-[var(--sky-panel-border)] bg-[var(--sky-panel)] overflow-y-auto"
    >
      <div className="flex items-center justify-between h-12 px-4 border-b border-[var(--sky-panel-border)]">
        <p className="sky-label">{view === 'submission' ? 'Submission' : view === 'exam' ? 'Exam' : 'Student'}</p>
        <button
          type="button"
          onClick={close}
          aria-label="Close details"
          className="w-7 h-7 -mr-1 flex items-center justify-center rounded-md text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-5">
        {view === 'submission' && <SubmissionDetails submission={submission} />}
        {view === 'exam' && <ExamDetailsSummary exam={exam} />}
        {view === 'student' && <StudentDetails student={student} />}
      </div>
    </aside>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <dt className="text-[var(--sky-subtle)]">{label}</dt>
      <dd className="font-medium text-[var(--sky-text)] text-right tabular-nums">{children}</dd>
    </div>
  )
}

function OpenLink({ href, children }) {
  return (
    <Link
      href={href}
      className="flex h-9 w-full items-center justify-center rounded-lg border border-[var(--sky-panel-border)] text-sm font-medium text-[var(--sky-text)] hover:bg-[var(--sky-surface)]"
    >
      {children}
    </Link>
  )
}

function SubmissionDetails({ submission }) {
  const status = submissionStatus(submission.status)
  const marked = markedCount(submission.questions)
  const total = submission.questions?.length || 0
  return (
    <>
      <div>
        <h3 className="text-base font-semibold text-[var(--sky-text)]">{submission.student?.name || 'Unknown'}</h3>
        <p className="text-sm text-[var(--sky-subtle)]">{submission.student?.classRoom}</p>
        <div className="mt-2">
          <StatusPill tone={status.tone}>{status.label}</StatusPill>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-[var(--sky-subtle)]">Marked by you</span>
          <span className="font-medium text-[var(--sky-text)] tabular-nums">{marked} / {total}</span>
        </div>
        <ProgressBar value={marked} max={total} tone={marked === total ? 'positive' : 'info'} label="Questions marked" />
      </div>
      <dl className="divide-y divide-[var(--sky-panel-border)] border-y border-[var(--sky-panel-border)]">
        <Row label="Domax’s read">
          <ReadSummary questions={submission.questions} />
        </Row>
        <Row label="Pages">{submission.pages?.length || 0}</Row>
        {submission.receivedAt && <Row label="Received">{submission.receivedAt}</Row>}
      </dl>
      <OpenLink href={`/dashboard/submissions/${submission.id}`}>Open in review</OpenLink>
    </>
  )
}

function ExamDetailsSummary({ exam }) {
  const total = exam.stats?.total || 0
  const graded = exam.stats?.graded || 0
  return (
    <>
      <div>
        <h3 className="text-base font-semibold text-[var(--sky-text)]">{exam.title || 'Untitled exam'}</h3>
        <p className="text-sm text-[var(--sky-subtle)]">{exam.level}</p>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-[var(--sky-subtle)]">Graded</span>
          <span className="font-medium text-[var(--sky-text)] tabular-nums">{graded} / {total}</span>
        </div>
        <ProgressBar value={graded} max={total} label="Exam progress" />
      </div>
      <dl className="divide-y divide-[var(--sky-panel-border)] border-y border-[var(--sky-panel-border)]">
        <Row label="Needs review">{exam.stats?.needsReview ?? 0}</Row>
        <Row label="Unsure answers">{exam.stats?.aiLowConfidence ?? 0}</Row>
        {exam.scheduled && <Row label="Scheduled">{exam.scheduled}</Row>}
        {exam.duration && <Row label="Duration">{exam.duration}</Row>}
      </dl>
      <OpenLink href={`/dashboard/exams/${exam.id}`}>Open exam</OpenLink>
    </>
  )
}

function StudentDetails({ student }) {
  return (
    <>
      <div>
        <h3 className="text-base font-semibold text-[var(--sky-text)]">{student.name || 'Unknown'}</h3>
        <p className="text-sm text-[var(--sky-subtle)]">{student.level}</p>
      </div>
      <dl className="divide-y divide-[var(--sky-panel-border)] border-y border-[var(--sky-panel-border)]">
        {typeof student.avgScore === 'number' && <Row label="Average score">{student.avgScore}%</Row>}
        {student.trend && <Row label="Trend">{student.trend}</Row>}
        {student.lastActive && <Row label="Last active">{student.lastActive}</Row>}
      </dl>
      {student.recentExams?.length > 0 && (
        <div>
          <p className="sky-label mb-1">Recent exams</p>
          <ul className="divide-y divide-[var(--sky-panel-border)]">
            {student.recentExams.map((exam) => (
              <li key={exam.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-[var(--sky-text)] truncate pr-3">{exam.title}</span>
                <span className="font-medium tabular-nums text-[var(--sky-text)]">{exam.score}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <OpenLink href={`/dashboard/students/${student.id}`}>Open profile</OpenLink>
    </>
  )
}
