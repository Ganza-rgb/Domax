'use client'

import { useEffect } from 'react'
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
      {/* Same workspace as a single script: the work gets the space. */}
      <h1 className="sr-only">Submissions</h1>
      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
        <div className="order-2 xl:order-none min-w-0">
          <SubmissionQueue onSelect={(submission) => setActiveSubmissionId(submission.id)} />
        </div>
        <div className="order-1 xl:order-none min-w-0">
          <SubmissionCanvas />
        </div>
      </div>
    </div>
  )
}
