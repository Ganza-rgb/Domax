'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { useDashboardState } from '@/states/useDashboardState'

export default function AnalyticsPage() {
  const { setCurrentSection } = useDashboardState()

  useEffect(() => {
    setCurrentSection('analytics')
  }, [setCurrentSection])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Analytics"
        title="Performance insights"
        subtitle="Track grading trends and class performance"
      />
      <div className="sky-card">
        <p className="text-sm text-[var(--sky-subtle)]">Analytics dashboard coming soon...</p>
      </div>
    </div>
  )
}
