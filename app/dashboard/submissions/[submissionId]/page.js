'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import SubmissionCanvas from '@/components/dashboard/SubmissionCanvas'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function SubmissionDetailPage() {
  const params = useParams()
  const submissionId = Array.isArray(params?.submissionId) ? params.submissionId[0] : params?.submissionId
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { findSubmissionById, setActiveSubmissionId, activeSubmission } = useSubmissionState()

  useEffect(() => {
    setCurrentSection('submissions')
    if (submissionId) {
      setActiveSubmissionId(submissionId)
    }
  }, [submissionId, setCurrentSection, setActiveSubmissionId])

  useEffect(() => {
    if (activeSubmission) {
      updatePanel({ type: 'submission', payload: activeSubmission })
    }
  }, [activeSubmission, updatePanel])

  const submission = submissionId ? findSubmissionById(submissionId) : null

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Submission"
        title={submission ? submission.student.name : 'Submission not found'}
        subtitle={submission ? submission.status.replace('-', ' ') : 'Check submission id'}
      />
      <SubmissionCanvas />
    </div>
  )
}








