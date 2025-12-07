import Stripe from 'stripe'

let stripeInstance = null

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  }
  return stripeInstance
}









