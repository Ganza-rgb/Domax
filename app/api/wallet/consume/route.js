'use server'

import { NextResponse } from 'next/server'
import { consumePages, creditWallet, getWalletStorage, logConsumption } from '@/lib/wallet'
import { getSchoolByCode } from '@/lib/onboardingStore'

function resolveWalletId({ walletId, billingMode, schoolCode }) {
  if (walletId) return walletId
  if (billingMode === 'school' && schoolCode) {
    const school = getSchoolByCode(schoolCode)
    return school?.walletId || null
  }
  return 'wallet:teacher:personal'
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      walletId,
      pagesNeeded,
      submissionId,
      metadata = {},
      billingMode = 'personal',
      schoolCode,
      teacherEmail,
      action = 'consume',
    } = body

    const pages = Number(pagesNeeded || metadata.pages || 0)
    if (!pages || pages <= 0) {
      return NextResponse.json({ error: 'INVALID_PAGES' }, { status: 400 })
    }

    const resolvedWalletId = resolveWalletId({ walletId, billingMode, schoolCode })
    if (!resolvedWalletId) {
      return NextResponse.json({ error: 'WALLET_NOT_FOUND' }, { status: 404 })
    }

    const enrichedMetadata = {
      ...metadata,
      submissionId,
      billingMode,
      schoolCode,
      teacherEmail,
    }

    if (action === 'refund') {
      await creditWallet({
        walletId: resolvedWalletId,
        amountPages: pages,
        metadata: { ...enrichedMetadata, type: 'refund' },
      })
      const storage = getWalletStorage()
      const wallet = storage.wallets.snapshot().find((item) => item.id === resolvedWalletId)
      return NextResponse.json({
        success: true,
        walletId: resolvedWalletId,
        balance: wallet?.pages ?? null,
        message: 'Credits refunded to wallet.',
      })
    }

    try {
      await consumePages({
        walletId: resolvedWalletId,
        pagesNeeded: pages,
        metadata: enrichedMetadata,
      })
      if (submissionId) {
        await logConsumption({
          walletId: resolvedWalletId,
          submissionId,
          pages,
          metadata: enrichedMetadata,
        })
      }
    } catch (error) {
      if (error.message === 'INSUFFICIENT_CREDITS') {
        return NextResponse.json({ error: 'INSUFFICIENT_CREDITS' }, { status: 402 })
      }
      throw error
    }

    const storage = getWalletStorage()
    const wallet = storage.wallets.snapshot().find((item) => item.id === resolvedWalletId)
    const lowBalance =
      wallet?.lowPagesThreshold !== undefined && wallet?.lowPagesThreshold !== null
        ? wallet.pages <= wallet.lowPagesThreshold
        : false

    return NextResponse.json({
      success: true,
      walletId: resolvedWalletId,
      deductedPages: pages,
      balance: wallet?.pages ?? null,
      lowBalance,
      message: lowBalance
        ? 'Usage recorded. Wallet is running low — consider topping up.'
        : 'Usage recorded successfully.',
    })
  } catch (error) {
    console.error('wallet consume error', error)
    return NextResponse.json({ error: 'CONSUME_FAILED' }, { status: 500 })
  }
}

