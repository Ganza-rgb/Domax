// Contact details used across the public site. Set NEXT_PUBLIC_CONTACT_EMAIL
// to the inbox that actually receives pilot requests.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@domax.rw'

// Prices live in lib/pricing.js so the site and the app always agree.
export { EXAM_PRICES, EXTRA_PAGE_RWF, BATCH_MINIMUM_RWF, formatRwf, examPrice } from '@/lib/pricing'

// Builds a mailto: link with the subject and body filled in, so a form can
// hand off to the visitor's own email app instead of pretending to submit.
export function mailtoLink(subject, fields) {
  const body = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
