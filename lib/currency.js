export function toMinorUnits(amount, currency = 'rwf') {
  // Stripe expects integer of smallest currency unit
  const zeroDecimalCurrencies = ['rwf']
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return Math.round(amount)
  }
  return Math.round(amount * 100)
}









