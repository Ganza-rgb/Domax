import { getDb, nowIso } from '@/lib/server/db'
import { MAX_PAPER_BYTES, classForTeacher, currentTeacher, json, newId, safeFilename } from '@/lib/server/portal'

export const runtime = 'nodejs'

const KINDS = ['paper', 'memo', 'reference']

/** Share a file with every student in a class. */
export async function POST(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in to share files with students.' }, 401)

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  const cls = classForTeacher(teacher.id, String(form?.get('classId') || ''))
  if (!cls) return json({ error: 'Share the class with students first, then add papers.' }, 409)
  if (!file || typeof file === 'string' || !file.size) return json({ error: 'Choose a file to share.' }, 400)
  if (file.size > MAX_PAPER_BYTES) return json({ error: 'That file is over 25 MB.' }, 413)

  const kind = KINDS.includes(form.get('kind')) ? form.get('kind') : 'paper'
  const title = String(form.get('title') || file.name).trim().slice(0, 160) || file.name
  const allowDownload = String(form.get('allowDownload')) !== 'false'
  const id = newId('pap')
  getDb()
    .prepare('INSERT INTO papers (id, code, title, kind, filename, mime, size, allow_download, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(id, cls.code, title, kind, safeFilename(file.name), file.type || 'application/octet-stream', file.size, allowDownload ? 1 : 0, Buffer.from(await file.arrayBuffer()), nowIso())
  return json({ id, title, kind, size: file.size, allowDownload })
}

function ownedPaper(teacher, id) {
  const row = getDb().prepare('SELECT p.id, c.teacher_id FROM papers p JOIN classes c ON c.code = p.code WHERE p.id = ?').get(id)
  return row && row.teacher_id === teacher.id ? row : null
}

export async function PATCH(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const body = await request.json().catch(() => null)
  if (!body?.id || !ownedPaper(teacher, body.id)) return json({ error: 'That paper isn’t here.' }, 404)
  getDb().prepare('UPDATE papers SET allow_download = ? WHERE id = ?').run(body.allowDownload ? 1 : 0, body.id)
  return json({ ok: true })
}

export async function DELETE(request) {
  const teacher = await currentTeacher()
  if (!teacher) return json({ error: 'Sign in first.' }, 401)
  const id = new URL(request.url).searchParams.get('id')
  if (!id || !ownedPaper(teacher, id)) return json({ error: 'That paper isn’t here.' }, 404)
  getDb().prepare('DELETE FROM papers WHERE id = ?').run(id)
  return json({ ok: true })
}
