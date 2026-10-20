'use client'

import Link from 'next/link'
import { useUserState } from '@/states/useUserState'
import { EXAM_PRICES, EXTRA_PAGE_RWF, examLevel, formatRwf } from '@/lib/pricing'
import { Panel, StatusPill } from './ui'

/** Amount for one level's usage this term, from the shared price list. */
export function usageAmount({ level, exams, extraPages }) {
  const price = examLevel(level)?.price || 0
  return exams * price + extraPages * EXTRA_PAGE_RWF
}

export default function BillingOverview() {
  const { billing } = useUserState()
  const rows = billing.usage.map((row) => ({ ...row, label: examLevel(row.level)?.label || row.level, amount: usageAmount(row) }))
  const examsThisTerm = rows.reduce((sum, row) => sum + row.exams, 0)
  const amountThisTerm = rows.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="space-y-6">
      {/* This term: what's been marked and what it will come to */}
      <section aria-labelledby="term-heading" className="ws-feature rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <p id="term-heading" className="text-[13px] font-semibold text-[#8db8ff]">{billing.term} so far</p>
            <p className="mt-2 font-headline text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] text-white tabular-nums">
              {formatRwf(amountThisTerm)}
            </p>
            <p className="mt-3 text-[15px] text-white/60 tabular-nums">
              for {examsThisTerm.toLocaleString()} exams marked. Invoiced at the end of term.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center min-h-11 px-5 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white/60 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ask about billing
            </Link>
            <p className="text-[13px] text-white/50">Students never pay to see their results.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Panel title="This term by level" bodyClassName="!px-0 !pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Level</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Exams</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Extra pages</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {rows.map((row) => (
                <tr key={row.level}>
                  <th scope="row" className="px-5 py-2.5 text-left font-medium text-[var(--sky-text)]">{row.label}</th>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{row.exams.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--sky-subtle)]">{row.extraPages || '—'}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{formatRwf(row.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[var(--sky-panel-border)]">
                <th scope="row" className="px-5 py-2.5 text-left font-semibold text-[var(--sky-text)]">Total</th>
                <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-[var(--sky-text)]">{examsThisTerm.toLocaleString()}</td>
                <td />
                <td className="px-5 py-2.5 text-right tabular-nums font-semibold text-[var(--sky-text)]">{formatRwf(amountThisTerm)}</td>
              </tr>
            </tfoot>
          </table>
        </Panel>

        <Panel title="Your rates" bodyClassName="!px-0 !pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Level</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Per exam</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Pages included</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {EXAM_PRICES.map((level) => (
                <tr key={level.key}>
                  <th scope="row" className="px-5 py-2.5 text-left font-medium text-[var(--sky-text)]">{level.label}</th>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{formatRwf(level.price)}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{level.includedPages}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-5 py-3 border-t border-[var(--sky-panel-border)] text-[13px] text-[var(--sky-subtle)]">
            Each page over the allowance is {formatRwf(EXTRA_PAGE_RWF)}.
          </p>
        </Panel>
      </div>

      <Panel title="Invoices" bodyClassName="!px-0 !pb-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Invoice</th>
                <th scope="col" className="px-3 py-2 font-medium">Period</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Exams</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Amount</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {billing.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-[var(--sky-text)] tabular-nums">{invoice.id}</p>
                    <p className="text-xs text-[var(--sky-subtle)]">Issued {invoice.issued}</p>
                  </td>
                  <td className="px-3 py-3 text-[var(--sky-text)]">{invoice.period}</td>
                  <td className="px-3 py-3 text-right tabular-nums text-[var(--sky-text)]">{invoice.exams.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right tabular-nums text-[var(--sky-text)]">{formatRwf(invoice.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    <StatusPill tone={invoice.status === 'Paid' ? 'positive' : 'caution'}>{invoice.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
