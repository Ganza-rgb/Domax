'use client'

import Button from '@/components/atoms/Button'

const formatCurrency = (value, currency = 'NGN') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2,
  }).format(value)

export default function WalletBadge({ wallet, onBuyCredits, onRefresh }) {
  if (!wallet) {
    return (
      <div className="p-6 rounded-2xl border border-dashed border-gray-300 bg-white shadow-sm">
        <p className="text-sm text-gray-500">Loading wallet details…</p>
      </div>
    )
  }

  const totalValue = wallet.pricePerPage ? wallet.pages * wallet.pricePerPage : null
  const lowBalance =
    wallet.lowPagesThreshold !== undefined && wallet.lowPagesThreshold !== null
      ? wallet.pages <= wallet.lowPagesThreshold
      : false

  return (
    <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-primary-blue">{wallet.label || 'Wallet'}</p>
          <h3 className="text-3xl font-semibold text-[#0A3059] mt-2">
            {totalValue !== null ? formatCurrency(totalValue, wallet.currency) : `${wallet.pages} credits`}
          </h3>
          <p className="text-sm text-text-muted">{wallet.pages.toLocaleString()} grading pages available</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => onBuyCredits(wallet)}>
            Buy credits
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-text-muted">
        <div>
          <p className="uppercase text-xs tracking-[0.2em] text-gray-400">Per page</p>
          <p className="font-semibold text-[#0A3059]">
            {wallet.pricePerPage ? formatCurrency(wallet.pricePerPage, wallet.currency) : '—'}
          </p>
        </div>
        <div>
          <p className="uppercase text-xs tracking-[0.2em] text-gray-400">Low balance guard</p>
          <p className="font-semibold text-[#0A3059]">
            {wallet.lowPagesThreshold ? `${wallet.lowPagesThreshold.toLocaleString()} pages` : 'Not set'}
          </p>
        </div>
      </div>
      {lowBalance && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Wallet is under the safety threshold. Auto top-up is recommended.
        </div>
      )}
    </div>
  )
}











