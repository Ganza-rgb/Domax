'use server'

import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getPricingSummary } from '@/lib/pricing'
import { toMinorUnits } from '@/lib/currency'
import { getStripe } from '@/lib/stripe'
import { createFlutterwavePayment } from '@/lib/mobilePayments'
import { createPendingPurchase } from '@/lib/purchases'
import { getWalletStorage } from '@/lib/wallet'

export async function POST(request) {
  const body = await request.json()
  const {
    buyerId,
    walletId = body.buyerId,
    type,
    level,
    pages,
    booklets,
    bundleAmount,
    addOns = [],
    paymentMethod = 'card',
    currency = 'rwf',
  } = body

  const summary = getPricingSummary({
    type,
    level,
    pages,
    booklets,
    bundleAmount,
    addOns,
  })

  if (!buyerId || !walletId) {
    return NextResponse.json({ error: 'buyerId and walletId are required' }, { status: 400 })
  }

  const purchaseId = crypto.randomUUID()
  const walletStorage = getWalletStorage()
  walletStorage.wallets.ensure(walletId)

  const metadata = {
    buyerId,
    walletId,
    type,
    level,
    pages,
    booklets,
    bundleAmount,
    pagesCredited: summary.pagesCredited,
    paymentMethod,
    purchaseId,
  }

  let responseDetails = {}

  if (paymentMethod === 'card') {
    const stripe = getStripe()
    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: toMinorUnits(summary.amountRwf, currency),
        currency,
        metadata,
        automatic_payment_methods: { enabled: true },
      })
      responseDetails = {
        provider: 'stripe',
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }
    } else {
      responseDetails = {
        provider: 'stripe',
        clientSecret: `mock_${purchaseId}`,
        paymentIntentId: `mock_pi_${purchaseId}`,
        mocked: true,
      }
    }
  } else if (paymentMethod === 'mobile_money') {
    const flutterwavePayload = {
      tx_ref: purchaseId,
      amount: summary.amountRwf,
      currency: 'RWF',
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/billing/success`,
      customer: {
        email: body.email || 'customer@example.com',
        name: body.fullName || 'Domax Customer',
      },
      meta: metadata,
    }

    const flutterwaveResponse = await createFlutterwavePayment(flutterwavePayload)
    responseDetails = {
      provider: 'flutterwave',
      checkoutLink: flutterwaveResponse?.data?.link || 'https://checkout.flutterwave.com/mock',
      reference: flutterwaveResponse?.data?.reference || `mock-${purchaseId}`,
    }
  } else if (paymentMethod === 'invoice') {
    responseDetails = {
      provider: 'invoice',
      instructions: 'Invoice will be sent to your email within 1 business day.',
    }
  } else {
    return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 })
  }

  createPendingPurchase({
    id: purchaseId,
    buyerId,
    walletId,
    amountRwf: summary.amountRwf,
    pagesCredited: summary.pagesCredited,
    provider: paymentMethod,
    metadata,
  })

  return NextResponse.json({
    purchaseId,
    amountRwf: summary.amountRwf,
    pagesCredited: summary.pagesCredited,
    ...responseDetails,
  })
}

