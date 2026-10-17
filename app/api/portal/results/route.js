import { getDb, nowIso } from '@/lib/server/db'
import { classForTeacher, currentTeacher, json } from '@/lib/server/portal'

export const runtime = 'nodejs'

const num = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0)

/**
 * Send released results to the student portal. The teacher's release button
 * is the only caller; the page refuses to call this for an unreleased exam.
 */
export async function POST(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in to send results to students.' }, 401)

  const body = await request.json().catch(() => null)
  const cls = body && classForTeacher(teacher.id, body.classId)
  if (!cls) return json({ error: 'Share the class with students first.' }, 409)
  if (!body.examId || !body.releasedAt || !Array.isArray(body.rows)) return json({ error: 'That request was incomplete.' }, 400)
  if (cls.under16 && !cls.consent_ok) return json({ error: 'Consent for this class has not been recorded.' }, 409)

  const db = getDb()
  const known = new Set(db.prepare('SELECT student_id FROM students WHERE code = ?').all(cls.code).map((s) => s.student_id))
  const upsert = db.prepare(
    `INSERT INTO results (code, exam_id, student_id, exam_title, total, max, items, advice, released_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (code, exam_id, student_id) DO UPDATE SET exam_title = excluded.exam_title, total = excluded.total, max = excluded.max, items = excluded.items, advice = excluded.advice`
  )
  let saved = 0
  db.exec('BEGIN')
  try {
    for (const row of body.rows) {
      if (!known.has(row.studentId)) continue
      const items = (row.items || []).map((i) => ({ title: String(i.title || '').slice(0, 200), got: num(i.got), max: num(i.max) }))
      upsert.run(cls.code, String(body.examId), row.studentId, String(body.examTitle || 'Exam').slice(0, 200), num(row.total), num(row.max), JSON.stringify(items), JSON.stringify(row.advice || {}), String(body.releasedAt))
      saved += 1
    }
    db.exec('COMMIT')
  } catch {
    db.exec('ROLLBACK')
    return json({ error: 'Could not save the results.' }, 500)
  }
  return json({ saved, at: nowIso() })
}
