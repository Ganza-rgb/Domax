'use client'

import { useEffect, useMemo, useState } from 'react'
import Button from '@/components/atoms/Button'

const formatCurrency = (value, currency = 'NGN') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2,
  }).format(value)

export default function BuyCreditsModal({ open, wallet, onClose, onConfirm }) {
  const minPages = wallet?.minimumPurchasePages || 250
  const [pages, setPages] = useState(minPages)

  useEffect(() => {
    if (open) {
      setPages(minPages)
    }
  }, [open, minPages])

  const total = useMemo(() => {
    if (!wallet?.pricePerPage) return 0
    return pages * wallet.pricePerPage
  }, [pages, wallet])

  if (!open || !wallet) {
    return null
  }

  const bundleOptions = [minPages, minPages * 2, minPages * 4].map((value, index) => ({
    value,
    label: `${value.toLocaleString()} pages`,
    note: index === 0 ? 'Starter' : index === 1 ? 'Core team' : 'Department drop',
  }))

  const belowMinimum = pages < minPages

  const handleConfirm = () => {
    if (belowMinimum) return
    onConfirm?.({ pages, wallet })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary-blue">Buy credits</p>
            <h3 className="text-2xl font-semibold text-[#0A3059] mt-2">{wallet.label}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-[#0A3059]">Pages to purchase</label>
          <input
            type="number"
            min={minPages}
            step={minPages}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary-blue"
          />
          {belowMinimum && (
            <p className="text-xs text-amber-600">Minimum purchase is {minPages.toLocaleString()} pages.</p>
          )}
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Bundle math</p>
          <div className="grid grid-cols-3 gap-3">
            {bundleOptions.map((bundle) => (
              <button
                key={bundle.value}
                type="button"
                onClick={() => setPages(bundle.value)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  pages === bundle.value ? 'border-brand-primary-blue bg-[#f0f7ff]' : 'border-gray-200 hover:border-brand-primary-blue/60'
                }`}
              >
                <p className="text-sm font-semibold text-[#0A3059]">{bundle.label}</p>
                <p className="text-xs text-gray-500">{bundle.note}</p>
                {wallet.pricePerPage && (
                  <p className="text-sm text-brand-primary-blue mt-2">
                    {formatCurrency(bundle.value * wallet.pricePerPage, wallet.currency)}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-surface-neutral px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Total</p>
            <p className="text-xl font-semibold text-[#0A3059]">
              {wallet.pricePerPage ? formatCurrency(total, wallet.currency) : `${pages} pages`}
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={handleConfirm} disabled={belowMinimum}>
            Charge wallet
          </Button>
        </div>
      </div>
    </div>
  )
}











