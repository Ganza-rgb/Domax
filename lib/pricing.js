export const PAGE_PRICES = {
  primary: 20,
  'o-level': 35,
  'a-level': 50,
}

export const BOOKLET_PRICES = {
  primary: 150,
  'o-level': 200,
  'a-level': 300,
}

export const BUNDLE_OFFERS = [
  { amount: 100000, pages: 8000 },
  { amount: 50000, pages: 3500 },
  { amount: 10000, pages: 600 },
]

export const MINIMUM_CHARGE_RWF = 100

function normalizeLevel(level = '') {
  const key = level.toLowerCase()
  if (key.includes('a')) return 'a-level'
  if (key.includes('o')) return 'o-level'
  return 'primary'
}

export function getPagePrice(level) {
  const normalized = normalizeLevel(level)
  return PAGE_PRICES[normalized]
}

export function getBookletPrice(level) {
  const normalized = normalizeLevel(level)
  return BOOKLET_PRICES[normalized]
}

export function enforceMinimum(amountRwf) {
  return Math.max(amountRwf, MINIMUM_CHARGE_RWF)
}

export function calculatePagesFromBundle(amountRwf) {
  for (const offer of BUNDLE_OFFERS) {
    if (amountRwf >= offer.amount) {
      const remainder = amountRwf - offer.amount
      return { pages: offer.pages, remainder }
    }
  }
  return { pages: 0, remainder: amountRwf }
}

export function applyVoucher(code, summary) {
  if (!code) return summary
  return summary
}

export function getPricingSummary({ type, level, pages = 0, booklets = 0, bundleAmount = 0, addOns = [] }) {
  let amountRwf = 0
  let pagesCredited = 0

  if (type === 'bundle' && bundleAmount > 0) {
    const { pages: bundlePages } = calculatePagesFromBundle(bundleAmount)
    pagesCredited += bundlePages
    amountRwf += bundleAmount
  }

  if (type === 'pages' && pages > 0) {
    const perPage = getPagePrice(level)
    pagesCredited += pages
    amountRwf += pages * perPage
  }

  if (type === 'booklets' && booklets > 0) {
    const perBooklet = getBookletPrice(level)
    amountRwf += booklets * perBooklet
  }

  for (const addOn of addOns) {
    amountRwf += addOn.amount || 0
  }

  return {
    amountRwf: enforceMinimum(amountRwf),
    pagesCredited,
  }
}

