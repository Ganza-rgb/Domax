'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import PastPapersList from '@/components/dashboard/PastPapersList'
import { useDashboardState } from '@/states/useDashboardState'

export default function PastPapersPage() {
  const { setCurrentSection } = useDashboardState()

  useEffect(() => {
    setCurrentSection('past-papers')
  }, [setCurrentSection])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Past papers"
        title="Browse, download, or assign past papers"
        subtitle="Students can access these for free using your class code."
      />
      <PastPapersList />
    </div>
  )
}
