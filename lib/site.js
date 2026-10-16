// Contact details used across the public site. Set NEXT_PUBLIC_CONTACT_EMAIL
// to the inbox that actually receives pilot requests.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@domax.rw'

// Pilot pricing shown on the public site (RWF per student-subject exam).
// Indicative only: confirmed with each pilot site using measured costs.
// Kept separate from lib/pricing.js, which drives the in-app wallet.
export const EXAM_PRICES = [
  { key: 'university', label: 'University & polytechnic', price: 500, includedPages: 15 },
  { key: 'a-level', label: 'A-Level', price: 350, includedPages: 12 },
  { key: 'o-level', label: 'O-Level', price: 250, includedPages: 8 },
]

export const BATCH_MINIMUM_RWF = 10000

const numberFormatter = new Intl.NumberFormat('en-US')
export const formatRwf = (value) => `RWF ${numberFormatter.format(value)}`

// Builds a mailto: link with the subject and body filled in, so a form can
// hand off to the visitor's own email app instead of pretending to submit.
export function mailtoLink(subject, fields) {
  const body = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
