import { getDb } from '@/lib/server/db'
import { json, studentFromRequest } from '@/lib/server/portal'

export const runtime = 'nodejs'

/** A verified student's own results, advice and private messages. */
export async function GET(request) {
  const auth = studentFromRequest(request)
  if (!auth) return json({ error: 'Sign in again with your ID number.' }, 401)
  const { cls, student } = auth
  const db = getDb()

  const results = cls.settings.canSeeResults
    ? db
        .prepare('SELECT exam_id AS examId, exam_title AS title, total, max, items, advice, released_at AS releasedAt FROM results WHERE code = ? AND student_id = ? ORDER BY released_at DESC')
        .all(cls.code, student.student_id)
        .map((r) => ({ ...r, items: JSON.parse(r.items), advice: cls.settings.canSeeAdvice ? JSON.parse(r.advice) : null }))
    : []
  const messages = db
    .prepare('SELECT id, direction, subject, body, created_at AS createdAt FROM messages WHERE code = ? AND student_id = ? ORDER BY created_at DESC LIMIT 100')
    .all(cls.code, student.student_id)
  return json({ name: student.name, className: cls.name, settings: { canSeeResults: cls.settings.canSeeResults, canSeeAdvice: cls.settings.canSeeAdvice, canAsk: cls.settings.canAsk }, results, messages })
}
