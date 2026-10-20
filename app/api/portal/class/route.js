import { getDb, nowIso } from '@/lib/server/db'
import { DEFAULT_SETTINGS, classForTeacher, currentTeacher, displayCode, json, newClassCode } from '@/lib/server/portal'

export const runtime = 'nodejs'

const text = (value, max = 200) => String(value ?? '').trim().slice(0, max)

/** Publish a class (or update it): one shared code for every student in it. */
export async function POST(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in to share this class with students.' }, 401)

  const body = await request.json().catch(() => null)
  if (!body?.classId || !Array.isArray(body.students)) return json({ error: 'That request was incomplete.' }, 400)
  const under16 = Boolean(body.under16)
  const consentOk = !under16 || Boolean(body.consentOk)
  if (!consentOk) return json({ error: 'These students are under 16. Record consent for the class first.' }, 409)

  const settings = { ...DEFAULT_SETTINGS, ...(body.settings || {}) }
  const db = getDb()
  const existing = classForTeacher(teacher.id, body.classId)
  const code = existing?.code || newClassCode()
  const stamp = nowIso()

  db.exec('BEGIN')
  try {
    if (existing) {
      db.prepare('UPDATE classes SET name = ?, level = ?, under16 = ?, consent_ok = ?, settings = ?, updated_at = ? WHERE code = ?').run(
        text(body.name), text(body.level), under16 ? 1 : 0, consentOk ? 1 : 0, JSON.stringify(settings), stamp, code
      )
    } else {
      db.prepare('INSERT INTO classes (code, teacher_id, class_id, name, level, under16, consent_ok, settings, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
        code, teacher.id, text(body.classId), text(body.name), text(body.level), under16 ? 1 : 0, consentOk ? 1 : 0, JSON.stringify(settings), stamp, stamp
      )
    }
    db.prepare('DELETE FROM students WHERE code = ?').run(code)
    const insert = db.prepare('INSERT INTO students (code, student_id, name, ids, email, phone) VALUES (?, ?, ?, ?, ?, ?)')
    for (const s of body.students.slice(0, 500)) {
      insert.run(code, text(s.id), text(s.name), JSON.stringify({ camis: text(s.ids?.camis, 40), urubuto: text(s.ids?.urubuto, 40), regNo: text(s.ids?.regNo, 40) }), text(s.email) || null, text(s.phone, 40) || null)
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    return json({ error: 'Could not save the class.' }, 500)
  }

  const withId = body.students.filter((s) => s.ids?.camis || s.ids?.urubuto || s.ids?.regNo).length
  return json({ code, display: displayCode(code), settings, studentsWithId: withId, students: body.students.length })
}

/** What is published for a class: its code, settings, shared papers and unread questions. */
export async function GET(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const classId = new URL(request.url).searchParams.get('classId')
  const cls = classForTeacher(teacher.id, classId)
  if (!cls) return json({ published: false })
  const db = getDb()
  const papers = db.prepare('SELECT id, title, kind, filename, mime, size, allow_download AS allowDownload, created_at AS createdAt FROM papers WHERE code = ? ORDER BY created_at DESC').all(cls.code).map((paper) => ({ ...paper, allowDownload: Boolean(paper.allowDownload) }))
  const roster = db.prepare('SELECT ids FROM students WHERE code = ?').all(cls.code)
  const studentsWithId = roster.filter((s) => Object.values(JSON.parse(s.ids || '{}')).some(Boolean)).length
  const unread = db.prepare("SELECT COUNT(*) AS n FROM messages WHERE code = ? AND direction = 'to_teacher' AND read_at IS NULL").get(cls.code).n
  const results = db.prepare('SELECT exam_id AS examId, exam_title AS title, COUNT(*) AS students, MAX(released_at) AS releasedAt FROM results WHERE code = ? GROUP BY exam_id').all(cls.code)
  return json({ published: true, code: cls.code, display: displayCode(cls.code), settings: cls.settings, papers, unread, results, students: roster.length, studentsWithId })
}
