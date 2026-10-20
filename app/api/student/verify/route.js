import { getDb } from '@/lib/server/db'
import { classByCode, clientKey, json, normaliseCode, recordFailure, signStudent, tooManyFailures } from '@/lib/server/portal'

export const runtime = 'nodejs'

const clean = (value) => String(value || '').toUpperCase().replace(/\s+/g, '')

/**
 * Results and private messages need more than the shared code: the student's
 * own ID number (CAMIS, Urubuto or registration number) from the class list.
 */
export async function POST(request) {
  const limitKey = clientKey(request, 'id')
  if (tooManyFailures(limitKey)) return json({ error: 'Too many wrong attempts. Wait a few minutes and try again.' }, 429)

  const body = await request.json().catch(() => null)
  const cls = body && classByCode(normaliseCode(body.code))
  const wanted = clean(body?.idNumber)
  if (!cls || wanted.length < 3) {
    recordFailure(limitKey)
    return json({ error: 'We couldn’t match that ID number.' }, 404)
  }

  const matches = getDb()
    .prepare('SELECT * FROM students WHERE code = ?')
    .all(cls.code)
    .filter((s) => Object.values(JSON.parse(s.ids || '{}')).some((id) => id && clean(id) === wanted))
  if (matches.length !== 1) {
    recordFailure(limitKey)
    return json({ error: matches.length ? 'That ID is shared by more than one student. Ask your teacher.' : 'We couldn’t match that ID number.' }, 404)
  }
  return json({ token: signStudent(cls.code, matches[0].student_id), name: matches[0].name })
}
