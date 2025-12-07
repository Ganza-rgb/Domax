'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import ExamDetails from '@/components/dashboard/ExamDetails'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function ExamDetailsPage() {
  const params = useParams()
  const examId = Array.isArray(params?.examId) ? params.examId[0] : params?.examId
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { findExamById, setActiveExamId } = useExamState()
  const { setActiveSubmissionId } = useSubmissionState()

  const exam = examId ? findExamById(examId) : null

  useEffect(() => {
    setCurrentSection('exams')
    if (examId) {
      setActiveExamId(examId)
    }
    if (exam) {
      updatePanel({ type: 'exam', payload: exam })
    }
  }, [examId, exam, setCurrentSection, setActiveExamId, updatePanel])

  const handleOpenSubmission = (submission) => {
    setActiveSubmissionId(submission.id)
    updatePanel({ type: 'submission', payload: submission })
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Exam detail"
        title={exam ? exam.title : 'Exam not found'}
        subtitle={exam ? `${exam.stats.graded}/${exam.stats.total} graded` : 'Check exam id'}
      />
      <ExamDetails exam={exam} onOpenSubmission={handleOpenSubmission} />
    </div>
  )
}








