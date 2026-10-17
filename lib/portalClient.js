'use client'

import { analyseExam, focusAdvice } from '@/lib/analytics'

/*
 * The teacher's side of the student portal. Every call returns
 * { ok, data } or { ok: false, status, error } so screens can show a plain
 * message instead of handling exceptions.
 */
async function call(url, options = {}) {
  try {
    const response = await fetch(url, { credentials: 'same-origin', ...options })
    const data = await response.json().catch(() => ({}))
    if (response.ok) return { ok: true, data }
    return { ok: false, status: response.status, error: data.error || 'Something went wrong. Try again.' }
  } catch {
    return { ok: false, status: 0, error: 'Could not reach the server. Is Domax running?' }
  }
}

const jsonBody = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

export const portal = {
  status: (classId) => call(`/api/portal/class?classId=${encodeURIComponent(classId)}`),

  publishClass: (cls, settings) =>
    call(
      '/api/portal/class',
      jsonBody('POST', {
        classId: cls.id,
        name: cls.name,
        level: cls.level,
        under16: Boolean(cls.under16),
        consentOk: Boolean(cls.consent),
        settings,
        students: cls.students.map((s) => ({ id: s.id, name: s.name, ids: s.ids, email: s.email || '', phone: s.phone || '' })),
      })
    ),

  addPaper(classId, file, { title, kind, allowDownload }) {
    const form = new FormData()
    form.set('classId', classId)
    form.set('title', title || file.name)
    form.set('kind', kind || 'paper')
    form.set('allowDownload', String(Boolean(allowDownload)))
    form.set('file', file, file.name)
    return call('/api/portal/papers', { method: 'POST', body: form })
  },
  setPaperDownload: (id, allowDownload) => call('/api/portal/papers', jsonBody('PATCH', { id, allowDownload })),
  removePaper: (id) => call(`/api/portal/papers?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),

  /** Only for an exam the teacher has released: sends each finished student's marks and focus advice. */
  pushResults(cls, exam, rubric) {
    const analysis = analyseExam(exam, cls, rubric)
    const rows = analysis.complete.map((row) => ({
      studentId: row.student.id,
      total: row.total,
      max: analysis.totalMarks,
      items: analysis.questions.map((q) => ({ title: `Q${q.number} · ${q.title}`, got: Number(row.marks[q.id] ?? 0), max: q.marks })),
      advice: focusAdvice(analysis, row.student.id),
    }))
    return call('/api/portal/results', jsonBody('POST', { classId: cls.id, examId: exam.id, examTitle: exam.title, releasedAt: exam.releasedAt, rows }))
  },

  messages: (classId) => call(`/api/portal/messages?classId=${encodeURIComponent(classId)}`),
  sendMessage: (payload) => call('/api/portal/messages', jsonBody('POST', payload)),
  markRead: (classId) => call('/api/portal/messages', jsonBody('PATCH', { classId })),
}

export const studentLink = (code) => `${window.location.origin}/student${code ? `?code=${code}` : ''}`

export function invitationText(className, display) {
  const code = display.replace('-', '')
  return `Hello! Your teacher has shared ${className} on Domax. Open ${studentLink(code)} (class code ${display}) to see the papers and notices. To see your results, also type your ID number.`
}
