'use server'

import { NextResponse } from 'next/server'
import { getWalletStorage } from '@/lib/wallet'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const walletId = searchParams.get('walletId')
  const storage = getWalletStorage()
  const wallets = storage.wallets.snapshot()
  const payload = walletId ? wallets.filter((wallet) => wallet.id === walletId) : wallets
  return NextResponse.json({
    wallets: payload,
    count: payload.length,
  })
}











