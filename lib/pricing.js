/*
 * Domax pricing: one price per exam (one student's script for one subject),
 * with a page allowance per level and a published charge for each page over
 * it. Institutions are invoiced per term; public schools are covered by a
 * sponsor. Students never pay. Primary isn't offered yet.
 *
 * This is the single source for prices shown on the public site and in the app.
 */
export const EXAM_PRICES = [
  { key: 'university', label: 'University & polytechnic', price: 500, includedPages: 15 },
  { key: 'a-level', label: 'A-Level', price: 350, includedPages: 12 },
  { key: 'o-level', label: 'O-Level', price: 250, includedPages: 8 },
]

// Charged for each page beyond a level's allowance.
export const EXTRA_PAGE_RWF = 25

// Smallest invoice for a batch, so very small batches still cover setup.
export const BATCH_MINIMUM_RWF = 10000

const numberFormatter = new Intl.NumberFormat('en-US')
export const formatRwf = (value) => `RWF ${numberFormatter.format(Math.round(value))}`

export function examLevel(key) {
  return EXAM_PRICES.find((level) => level.key === key) || null
}

/** Price of one exam of `pages` pages at `levelKey`. */
export function examPrice(levelKey, pages = 0) {
  const level = examLevel(levelKey)
  if (!level) return 0
  const extraPages = Math.max(0, pages - level.includedPages)
  return level.price + extraPages * EXTRA_PAGE_RWF
}

/*
 * ---------------------------------------------------------------------------
 * Legacy page-credit model. Only the dormant payment routes
 * (app/api/billing/*, app/api/wallet/*) still use it; nothing in the app calls
 * them. Replace together with those routes when invoicing is built.
 * ---------------------------------------------------------------------------
 */
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

