import { getDb, nowIso } from '@/lib/server/db'
import { classForTeacher, currentTeacher, json, newId } from '@/lib/server/portal'

export const runtime = 'nodejs'

/** Everything said in a class, newest first, with who it is from or for. */
export async function GET(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const cls = classForTeacher(teacher.id, new URL(request.url).searchParams.get('classId'))
  if (!cls) return json({ published: false, messages: [], students: [] })
  const db = getDb()
  const students = db.prepare('SELECT student_id AS id, name, email, phone FROM students WHERE code = ? ORDER BY name').all(cls.code)
  const messages = db
    .prepare('SELECT id, student_id AS studentId, direction, subject, body, created_at AS createdAt, read_at AS readAt FROM messages WHERE code = ? ORDER BY created_at DESC LIMIT 300')
    .all(cls.code)
  return json({ published: true, code: cls.code, students, messages, canAsk: Boolean(cls.settings.canAsk) })
}

/** A message from the teacher to the whole class (studentId null) or one student. */
export async function POST(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const body = await request.json().catch(() => null)
  const cls = body && classForTeacher(teacher.id, body.classId)
  if (!cls) return json({ error: 'Share the class with students first.' }, 409)
  const text = String(body.body || '').trim().slice(0, 4000)
  if (!text) return json({ error: 'Write a message first.' }, 400)
  const db = getDb()
  const studentId = body.studentId || null
  if (studentId && !db.prepare('SELECT 1 FROM students WHERE code = ? AND student_id = ?').get(cls.code, studentId)) return json({ error: 'That student isn’t in this class.' }, 404)
  const id = newId('msg')
  db.prepare("INSERT INTO messages (id, code, student_id, direction, subject, body, created_at) VALUES (?, ?, ?, 'to_student', ?, ?, ?)").run(id, cls.code, studentId, String(body.subject || '').slice(0, 160) || null, text, nowIso())
  return json({ id })
}

/** Mark a student's questions as read. */
export async function PATCH(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const body = await request.json().catch(() => null)
  const cls = body && classForTeacher(teacher.id, body.classId)
  if (!cls) return json({ error: 'Class not found.' }, 404)
  getDb().prepare("UPDATE messages SET read_at = ? WHERE code = ? AND direction = 'to_teacher' AND read_at IS NULL").run(nowIso(), cls.code)
  return json({ ok: true })
}
