import { getDb } from '@/lib/server/db'
import { classByCode, clientKey, json, normaliseCode, recordFailure, tooManyFailures } from '@/lib/server/portal'

export const runtime = 'nodejs'

/** The shared class code opens the class: its papers and class-wide notices. Nothing personal. */
export async function POST(request) {
  const limitKey = clientKey(request, 'code')
  if (tooManyFailures(limitKey)) return json({ error: 'Too many wrong codes. Wait a few minutes and try again.' }, 429)

  const body = await request.json().catch(() => null)
  const cls = body && classByCode(normaliseCode(body.code))
  if (!cls) {
    recordFailure(limitKey)
    return json({ error: 'That code doesn’t match a class. Check it with your teacher.' }, 404)
  }

  const db = getDb()
  const papers = db
    .prepare('SELECT id, title, kind, mime, size, allow_download AS allowDownload, created_at AS createdAt FROM papers WHERE code = ? ORDER BY created_at DESC')
    .all(cls.code)
    .map((paper) => ({ ...paper, allowDownload: Boolean(paper.allowDownload) }))
  const notices = db
    .prepare("SELECT id, subject, body, created_at AS createdAt FROM messages WHERE code = ? AND student_id IS NULL AND direction = 'to_student' ORDER BY created_at DESC LIMIT 20")
    .all(cls.code)
  const { canSeeResults, canSeeAdvice, canAsk } = cls.settings
  return json({ code: cls.code, name: cls.name, level: cls.level, teacherName: cls.teacher_name || null, settings: { canSeeResults, canSeeAdvice, canAsk }, papers, notices })
}
