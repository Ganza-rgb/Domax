import { getDb, nowIso } from '@/lib/server/db'
import { json, newId, recordFailure, studentFromRequest, tooManyFailures } from '@/lib/server/portal'

export const runtime = 'nodejs'

/** A question from a student to their teacher, if the teacher allows questions. */
export async function POST(request) {
  const auth = studentFromRequest(request)
  if (!auth) return json({ error: 'Sign in again with your ID number.' }, 401)
  const { cls, student } = auth
  if (!cls.settings.canAsk) return json({ error: 'Your teacher has turned questions off for this class.' }, 403)

  const limitKey = `ask:${cls.code}:${student.student_id}`
  if (tooManyFailures(limitKey)) return json({ error: 'You have sent several questions already. Please wait a little.' }, 429)

  const body = await request.json().catch(() => null)
  const text = String(body?.body || '').trim().slice(0, 2000)
  if (!text) return json({ error: 'Write your question first.' }, 400)
  recordFailure(limitKey)
  getDb()
    .prepare("INSERT INTO messages (id, code, student_id, direction, subject, body, created_at) VALUES (?, ?, ?, 'to_teacher', ?, ?, ?)")
    .run(newId('msg'), cls.code, student.student_id, String(body?.subject || '').slice(0, 160) || null, text, nowIso())
  return json({ ok: true })
}
