'use client'

import { getPage } from '@/lib/deviceStore'

/* The teacher's side of the marking assistant. Same result shape as portalClient. */
async function call(url, options = {}) {
  try {
    const response = await fetch(url, { credentials: 'same-origin', ...options })
    const data = await response.json().catch(() => ({}))
    return response.ok ? { ok: true, data } : { ok: false, status: response.status, error: data.error || 'The assistant had a problem.' }
  } catch {
    return { ok: false, status: 0, error: 'Could not reach the server. Is Domax running?' }
  }
}
const post = (url, body) => call(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

/** A page photo from this device as a smaller JPEG data URL, so a local model isn't sent a huge image. */
async function pageToDataUrl(blob, maxSide = 1280) {
  const bitmap = await createImageBitmap(blob)
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.8)
}

export const assistant = {
  status: () => call('/api/ai/status'),

  /** Ask for a suggested mark. Never called automatically. */
  async suggest({ exam, question, pages, sampleText }) {
    const images = []
    if (!sampleText) {
      for (const page of pages.slice(0, 4)) {
        const blob = page.key ? await getPage(page.key).catch(() => null) : null
        if (blob) images.push(await pageToDataUrl(blob).catch(() => null))
      }
    }
    return post('/api/ai/suggest', {
      examTitle: exam.title,
      notes: exam.markingNotes || '',
      materials: (exam.materials || []).filter((m) => m.text && m.kind !== 'paper').map((m) => ({ kind: m.kind, name: m.name, text: m.text })),
      question: { number: question.number, title: question.title, marks: question.marks, type: question.type, modelAnswer: question.modelAnswer, points: question.points },
      answerText: sampleText || '',
      images: images.filter(Boolean),
    })
  },

  advice: (facts) => post('/api/ai/advice', facts),
}
