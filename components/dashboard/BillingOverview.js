'use client'

import Button from '@/components/atoms/Button'
import { useUserState } from '@/states/useUserState'

const UNIT_PRICES = {
  pages: [
    { label: 'Primary', rate: 20 },
    { label: 'O-Level', rate: 35 },
    { label: 'A-Level', rate: 50 },
  ],
  booklets: [
    { label: 'Primary', rate: 150 },
    { label: 'O-Level', rate: 200 },
    { label: 'A-Level', rate: 300 },
  ],
}

export default function BillingOverview() {
  const { balance, transactions } = useUserState()

  return (
    <div className="space-y-5">
      <div className="sky-card">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="sky-label">Usage snapshot</p>
            <h2 className="text-2xl font-semibold text-[var(--sky-text)]">
              {balance.pagesProcessed.toLocaleString()} pages processed
            </h2>
            <p className="text-sm text-[var(--sky-subtle)]">
              Total cost {formatCurrency(balance.totalCost)} • Balance refreshes nightly
            </p>
          </div>
          <div className="flex gap-3 ml-auto">
            <Button variant="primary" size="sm">
              Top-up wallet
            </Button>
            <Button variant="outline" size="sm">
              Download statement
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {balance.levelMix.map((mix) => (
            <div
              key={mix.level}
              className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]/70 p-4"
            >
              <p className="sky-label text-[0.7rem]">{mix.level}</p>
              <p className="text-lg font-semibold text-[var(--sky-text)]">{mix.pages.toLocaleString()} pages</p>
              <p className="text-sm text-[var(--sky-subtle)]">{formatCurrency(mix.cost)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sky-card">
        <p className="sky-label">Unit prices</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-2xl border border-[var(--sky-panel-border)] p-4">
            <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-3">Per page</h3>
            <div className="space-y-2 text-sm text-[var(--sky-subtle)]">
              {UNIT_PRICES.pages.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="font-semibold text-[var(--sky-text)]">{formatCurrency(item.rate)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--sky-panel-border)] p-4">
            <h3 className="text-sm font-semibold text-[var(--sky-text)] mb-3">Per booklet</h3>
            <div className="space-y-2 text-sm text-[var(--sky-subtle)]">
              {UNIT_PRICES.booklets.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="font-semibold text-[var(--sky-text)]">{formatCurrency(item.rate)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sky-card">
        <p className="sky-label mb-4">Recent transactions</p>
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--sky-panel-border)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--sky-text)]">{txn.type}</p>
                <p className="text-xs text-[var(--sky-subtle)]">
                  {txn.date} • {txn.method}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${txn.pages > 0 ? 'text-[#00cd90]' : 'text-[#d97706]'}`}>
                  {txn.pages > 0 ? '+' : ''}{txn.pages} pages
                </p>
                <p className="text-xs text-[var(--sky-subtle)]">{formatCurrency(txn.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatCurrency(value) {
  return `RWF ${value.toLocaleString()}`
}

