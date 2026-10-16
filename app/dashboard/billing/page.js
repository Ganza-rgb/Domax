'use client'

import { useEffect } from 'react'
import Button from '@/components/atoms/Button'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import BillingOverview from '@/components/dashboard/BillingOverview'
import { downloadCsv } from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

export default function BillingPage() {
  const { setCurrentSection } = useDashboardState()
  const { transactions } = useUserState()

  useEffect(() => {
    setCurrentSection('billing')
  }, [setCurrentSection])

  const downloadStatement = () => {
    downloadCsv('domax-statement.csv', [
      ['Transaction', 'Type', 'Date', 'Method', 'Pages', 'Amount (RWF)'],
      ...transactions.map((txn) => [txn.id, txn.type, txn.date, txn.method, txn.pages, txn.amount]),
    ])
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Billing & usage"
        title="Keep credits healthy"
        subtitle="Domax charges per page or booklet with transparent rates."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={downloadStatement} disabled={transactions.length === 0}>
              Download statement
            </Button>
            {/* Online top-up is not wired to a payment flow yet; route to the billing team. */}
            <Button variant="primary" size="sm" href="/contact">
              Top-up wallet
            </Button>
          </>
        }
      />
      <BillingOverview />
    </div>
  )
}
