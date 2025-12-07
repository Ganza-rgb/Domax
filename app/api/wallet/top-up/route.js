'use server'

import { NextResponse } from 'next/server'
import { creditWallet, getWalletStorage } from '@/lib/wallet'

export async function POST(request) {
  try {
    const body = await request.json()
    const { walletId, pages, source = 'dashboard', metadata = {} } = body || {}
    if (!walletId || !pages || pages <= 0) {
      return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 })
    }
    await creditWallet({
      walletId,
      amountPages: pages,
      metadata: { source, ...metadata },
    })
    const storage = getWalletStorage()
    const [wallet] = storage.wallets.snapshot().filter((item) => item.id === walletId)
    return NextResponse.json({
      success: true,
      wallet,
    })
  } catch (error) {
    console.error('wallet top-up error', error)
    return NextResponse.json({ error: 'TOP_UP_FAILED' }, { status: 500 })
  }
}











