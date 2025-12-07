'use server'

import { NextResponse } from 'next/server'
import { markPurchaseCompleted, findPurchase } from '@/lib/purchases'
import { creditWallet } from '@/lib/wallet'

export async function POST(request) {
  const payload = await request.json().catch(() => null)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const data = payload.data || payload
  const purchaseId = data?.tx_ref || data?.meta?.purchaseId
  const walletId = data?.meta?.walletId
  const pagesCredited = Number(data?.meta?.pagesCredited || 0)

  if (data?.status === 'successful' && purchaseId && walletId && pagesCredited > 0) {
    const purchase = findPurchase(purchaseId)
    if (purchase && purchase.status !== 'completed') {
      await creditWallet({ walletId, amountPages: pagesCredited, metadata: { purchaseId } })
      markPurchaseCompleted(purchaseId, {
        providerReference: data?.id || data?.flw_ref || null,
      })
    }
  }

  return NextResponse.json({ received: true })
}

