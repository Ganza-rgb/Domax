import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { dataDir, getDb } from '@/lib/server/db'

/* Helpers shared by the teacher-side and student-side portal routes. */

export const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** The signed-in teacher, or null. Every route that writes goes through this. */
export async function currentTeacher() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  return email ? { id: email, name: session.user.name || email } : null
}

/* ---------------- class code ---------------- */

// No 0/O, 1/I/L: a code is read aloud and copied from a board.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function newClassCode() {
  const db = getDb()
  for (let i = 0; i < 20; i += 1) {
    const code = Array.from({ length: 6 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join('')
    if (!db.prepare('SELECT 1 FROM classes WHERE code = ?').get(code)) return code
  }
  throw new Error('Could not make a unique class code')
}

export const normaliseCode = (value) => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
export const displayCode = (code) => `${code.slice(0, 3)}-${code.slice(3)}`

export function classByCode(code) {
  const row = getDb().prepare('SELECT * FROM classes WHERE code = ?').get(normaliseCode(code))
  return row ? { ...row, settings: JSON.parse(row.settings || '{}') } : null
}

export function classForTeacher(teacherId, classId) {
  const row = getDb().prepare('SELECT * FROM classes WHERE teacher_id = ? AND class_id = ?').get(teacherId, classId)
  return row ? { ...row, settings: JSON.parse(row.settings || '{}') } : null
}

export const DEFAULT_SETTINGS = { canSeeResults: true, canSeeAdvice: true, canAsk: true, defaultDownload: true }

/* ---------------- student sessions ---------------- */

function secret() {
  if (process.env.NEXTAUTH_SECRET) return process.env.NEXTAUTH_SECRET
  const file = path.join(dataDir(), '.secret')
  try {
    return fs.readFileSync(file, 'utf8')
  } catch {
    fs.mkdirSync(dataDir(), { recursive: true })
    const value = crypto.randomBytes(32).toString('hex')
    fs.writeFileSync(file, value, { mode: 0o600 })
    return value
  }
}

export const signStudent = (code, studentId) => jwt.sign({ code, sid: studentId }, secret(), { expiresIn: '12h' })

/** The student behind a Bearer token, checked against the roster, or null. */
export function studentFromRequest(request) {
  const header = request.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return null
  try {
    const { code, sid } = jwt.verify(token, secret())
    const cls = classByCode(code)
    const student = cls && getDb().prepare('SELECT * FROM students WHERE code = ? AND student_id = ?').get(code, sid)
    return student ? { cls, student } : null
  } catch {
    return null
  }
}

/* ---------------- guess limiting ---------------- */

const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 8

export const clientKey = (request, scope) => `${scope}:${(request.headers.get('x-forwarded-for') || 'local').split(',')[0].trim()}`

export function tooManyFailures(key) {
  const db = getDb()
  db.prepare('DELETE FROM attempts WHERE at < ?').run(Date.now() - WINDOW_MS)
  return db.prepare('SELECT COUNT(*) AS n FROM attempts WHERE key = ?').get(key).n >= MAX_FAILURES
}

export const recordFailure = (key) => getDb().prepare('INSERT INTO attempts (key, at) VALUES (?, ?)').run(key, Date.now())

/* ---------------- files ---------------- */

export const MAX_PAPER_BYTES = 25 * 1024 * 1024
// Shown in the browser as they are; anything else is always a download.
export const INLINE_SAFE = (mime) => mime === 'application/pdf' || mime === 'text/plain' || (/^image\//.test(mime) && mime !== 'image/svg+xml')
export const safeFilename = (name) => String(name || 'file').replace(/[^\w.\- ]+/g, '_').slice(0, 120)
export const newId = (prefix) => `${prefix}_${crypto.randomBytes(6).toString('hex')}`
