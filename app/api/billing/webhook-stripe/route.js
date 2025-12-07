'use server'

import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { markPurchaseCompleted, findPurchase } from '@/lib/purchases'
import { creditWallet } from '@/lib/wallet'

export async function POST(request) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ received: true, skipped: true })
  }

  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const purchaseId = paymentIntent.metadata?.purchaseId
    const walletId = paymentIntent.metadata?.walletId
    const pagesCredited = Number(paymentIntent.metadata?.pagesCredited || 0)

    if (purchaseId && walletId && pagesCredited > 0) {
      const purchase = findPurchase(purchaseId)
      if (purchase && purchase.status !== 'completed') {
        await creditWallet({ walletId, amountPages: pagesCredited, metadata: { purchaseId } })
        markPurchaseCompleted(purchaseId, {
          providerReference: paymentIntent.id,
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}

