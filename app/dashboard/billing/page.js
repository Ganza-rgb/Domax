'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import BillingOverview from '@/components/dashboard/BillingOverview'
import { useDashboardState } from '@/states/useDashboardState'

export default function BillingPage() {
  const { setCurrentSection } = useDashboardState()

  useEffect(() => {
    setCurrentSection('billing')
  }, [setCurrentSection])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Billing & usage"
        title="Keep credits healthy"
        subtitle="Domax charges per page or booklet with transparent rates."
      />
      <BillingOverview />
    </div>
  )
}








