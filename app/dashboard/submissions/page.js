'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import SubmissionCanvas from '@/components/dashboard/SubmissionCanvas'
import SubmissionQueue from '@/components/dashboard/SubmissionQueue'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function SubmissionsPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { setActiveSubmissionId, activeSubmission } = useSubmissionState()

  useEffect(() => {
    setCurrentSection('submissions')
    if (activeSubmission) {
      updatePanel({ type: 'submission', payload: activeSubmission })
    }
  }, [setCurrentSection, activeSubmission, updatePanel])

  return (
    <div>
      <WorkspaceHeader
        meta="Submissions workspace"
        title="Review and finalize scripts"
        subtitle="AI does the heavy lifting, you focus on the edge cases."
      />
      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
        <SubmissionQueue onSelect={(submission) => setActiveSubmissionId(submission.id)} />
        <SubmissionCanvas />
      </div>
    </div>
  )
}
