'use client'

import { useUserState } from '@/states/useUserState'
import { Panel, StatGroup } from './ui'

const UNIT_PRICES = [
  { label: 'Primary', page: 20, booklet: 150 },
  { label: 'O-Level', page: 35, booklet: 200 },
  { label: 'A-Level', page: 50, booklet: 300 },
]

export default function BillingOverview() {
  const { balance, transactions, teacher } = useUserState()

  return (
    <div className="space-y-6">
      <StatGroup
        items={[
          { label: 'Wallet balance', value: `${teacher.balancePages.toLocaleString()} pages`, hint: `≈ ${formatCurrency(teacher.balanceAmount)}` },
          { label: 'Pages processed', value: balance.pagesProcessed.toLocaleString(), hint: 'Balance refreshes nightly' },
          { label: 'Total cost', value: formatCurrency(balance.totalCost) },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Panel meta="Usage" title="By level" bodyClassName="!px-0 !pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Level</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Pages</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {balance.levelMix.map((mix) => (
                <tr key={mix.level}>
                  <th scope="row" className="px-5 py-2.5 text-left font-medium text-[var(--sky-text)]">{mix.level}</th>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{mix.pages.toLocaleString()}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{formatCurrency(mix.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel meta="Rates" title="Unit prices" bodyClassName="!px-0 !pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Level</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Per page</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Per booklet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {UNIT_PRICES.map((item) => (
                <tr key={item.label}>
                  <th scope="row" className="px-5 py-2.5 text-left font-medium text-[var(--sky-text)]">{item.label}</th>
                  <td className="px-3 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{formatCurrency(item.page)}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-[var(--sky-text)]">{formatCurrency(item.booklet)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <Panel meta="Ledger" title="Recent transactions" bodyClassName="!px-0 !pb-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Transaction</th>
                <th scope="col" className="px-3 py-2 font-medium">Date</th>
                <th scope="col" className="px-3 py-2 font-medium">Method</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Pages</th>
                <th scope="col" className="px-5 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-5 py-2.5">
                    <p className="font-medium text-[var(--sky-text)]">{txn.type}</p>
                    <p className="text-xs text-[var(--sky-subtle)] tabular-nums">{txn.id}</p>
                  </td>
                  <td className="px-3 py-2.5 text-[var(--sky-subtle)] whitespace-nowrap">{txn.date}</td>
                  <td className="px-3 py-2.5 text-[var(--sky-subtle)]">{txn.method}</td>
                  <td className={`px-3 py-2.5 text-right font-semibold tabular-nums ${txn.pages > 0 ? 'text-[var(--vscode-green)]' : 'text-[var(--sky-text)]'}`}>
                    {txn.pages > 0 ? '+' : ''}{txn.pages}
                  </td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-[var(--sky-subtle)] whitespace-nowrap">{formatCurrency(txn.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function formatCurrency(value) {
  return `RWF ${value.toLocaleString()}`
}
