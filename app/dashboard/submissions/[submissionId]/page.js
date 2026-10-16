'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import SubmissionCanvas from '@/components/dashboard/SubmissionCanvas'
import SubmissionQueue from '@/components/dashboard/SubmissionQueue'
import { EmptyState } from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function SubmissionDetailPage() {
  const params = useParams()
  const router = useRouter()
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

  if (!submission) {
    return (
      <div>
        <WorkspaceHeader meta="Submission" title="Submission not found" subtitle="Check the link, or pick a script from the queue." />
        <EmptyState
          title="This script isn't in your workspace"
          body={`No submission matches “${submissionId}”.`}
          action={
            <Link
              href="/dashboard/submissions"
              className="inline-flex h-9 items-center rounded-lg bg-[#005ffe] px-3.5 text-sm font-semibold text-white hover:bg-[#0047cc]"
            >
              Back to submissions
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <WorkspaceHeader
        meta="Submissions workspace"
        title="Review and finalize scripts"
        subtitle="AI does the heavy lifting, you focus on the edge cases."
      />
      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
        <SubmissionQueue onSelect={(item) => router.push(`/dashboard/submissions/${item.id}`)} />
        <SubmissionCanvas />
      </div>
    </div>
  )
}
