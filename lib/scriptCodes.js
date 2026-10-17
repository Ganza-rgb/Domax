/*
 * The code printed on every answer page. A page is matched to a student only
 * by this code, never by handwriting, name or position in the pile.
 *
 * Format: DOMAX1|<examId>|<studentId>|<page>|<totalPages>
 */
const PREFIX = 'DOMAX1'

export function encodePageCode({ examId, studentId, page, total }) {
  return [PREFIX, examId, studentId, page, total].join('|')
}

export function decodePageCode(text) {
  if (typeof text !== 'string') return null
  const parts = text.trim().split('|')
  if (parts.length !== 5 || parts[0] !== PREFIX) return null
  const [, examId, studentId, pageRaw, totalRaw] = parts
  const page = Number(pageRaw)
  const total = Number(totalRaw)
  if (!examId || !studentId || !Number.isInteger(page) || !Number.isInteger(total) || page < 1 || page > total) {
    return null
  }
  return { examId, studentId, page, total }
}
