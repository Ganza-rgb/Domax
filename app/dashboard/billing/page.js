'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import BillingOverview from '@/components/dashboard/BillingOverview'
import { WsButton as Button, downloadCsv } from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

export default function BillingPage() {
  const { setCurrentSection } = useDashboardState()
  const { billing } = useUserState()

  useEffect(() => {
    setCurrentSection('billing')
  }, [setCurrentSection])

  const downloadStatement = () => {
    downloadCsv('domax-invoices.csv', [
      ['Invoice', 'Period', 'Issued', 'Exams', 'Amount (RWF)', 'Status'],
      ...billing.invoices.map((invoice) => [invoice.id, invoice.period, invoice.issued, invoice.exams, invoice.amount, invoice.status]),
    ])
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Billing & usage"
        title="Billing"
        subtitle="What this term’s marking comes to, your rates, and past invoices."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={downloadStatement} disabled={billing.invoices.length === 0}>
              Download invoices
            </Button>
          </>
        }
      />
      <BillingOverview />
    </div>
  )
}
