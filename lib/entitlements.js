'use server'

import { randomUUID } from 'crypto'

const STORE_KEY = '__domax_entitlements_store__'

const defaultSeeds = [
  {
    code: 'DOM-STU-MATH',
    persona: 'student',
    downloadLimit: 5,
    ttlMinutes: 60 * 24,
    metadata: { gradeLevel: 'O-Level', subject: 'Mathematics' },
  },
  {
    code: 'DOM-STU-SCIENCE',
    persona: 'student',
    downloadLimit: 3,
    ttlMinutes: 60 * 12,
    metadata: { gradeLevel: 'A-Level', subject: 'Physics' },
  },
  {
    code: 'DOM-TEACH-GROUP',
    persona: 'teacher',
    seatLimit: 10,
    ttlMinutes: 60 * 72,
    metadata: { campus: 'Kigali STEM Academy' },
  },
  {
    code: 'DOM-INST-ACCESS',
    persona: 'institution',
    seatLimit: 250,
    ttlMinutes: 60 * 120,
    metadata: { region: 'East Africa' },
  },
]

function bootstrapStore() {
  const codes = new Map()
  const audits = []
  defaultSeeds.forEach((seed) => {
    const expiresAt = new Date(Date.now() + seed.ttlMinutes * 60 * 1000).toISOString()
    codes.set(seed.code.toUpperCase(), {
      id: randomUUID(),
      code: seed.code.toUpperCase(),
      persona: seed.persona,
      downloadsRemaining: seed.downloadLimit ?? null,
      maxDownloads: seed.downloadLimit ?? null,
      seatLimit: seed.seatLimit ?? null,
      metadata: seed.metadata || {},
      createdBy: 'system@domax.ai',
      createdAt: new Date().toISOString(),
      expiresAt,
    })
  })
  return { codes, audits }
}

function getStore() {
  if (!globalThis[STORE_KEY]) {
    globalThis[STORE_KEY] = bootstrapStore()
  }
  return globalThis[STORE_KEY]
}

function normalizeCode(code) {
  return code?.trim().toUpperCase()
}

function sanitize(entitlement) {
  return JSON.parse(JSON.stringify(entitlement))
}

function ensureValidPersona(persona) {
  if (!persona) return
  const allowed = new Set(['student', 'teacher', 'institution'])
  if (!allowed.has(persona)) {
    const err = new Error('UNSUPPORTED_PERSONA')
    err.code = 'UNSUPPORTED_PERSONA'
    throw err
  }
}

export function verifyAccessCode({ code, persona }) {
  if (!code) {
    const err = new Error('CODE_REQUIRED')
    err.code = 'CODE_REQUIRED'
    throw err
  }
  if (persona) {
    ensureValidPersona(persona)
  }
  const normalized = normalizeCode(code)
  const store = getStore()
  const entry = store.codes.get(normalized)
  if (!entry) {
    return { valid: false, reason: 'NOT_FOUND' }
  }
  if (persona && entry.persona !== persona) {
    return { valid: false, reason: 'PERSONA_MISMATCH' }
  }
  if (new Date(entry.expiresAt).getTime() < Date.now()) {
    return { valid: false, reason: 'EXPIRED', expiresAt: entry.expiresAt }
  }
  return {
    valid: true,
    entitlement: sanitize(entry),
  }
}

function generateCodeForPersona(persona) {
  const prefixMap = {
    student: 'STU',
    teacher: 'TEA',
    institution: 'INST',
  }
  const base = prefixMap[persona] || 'DOM'
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `DOM-${base}-${suffix}`
}

export function generateAccessCode({ persona, createdBy, downloadLimit, seatLimit, ttlMinutes = 60 * 24, metadata = {} }) {
  ensureValidPersona(persona)
  const code = generateCodeForPersona(persona)
  const store = getStore()
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString()
  const entry = {
    id: randomUUID(),
    code,
    persona,
    downloadsRemaining: persona === 'student' ? downloadLimit ?? 5 : null,
    maxDownloads: persona === 'student' ? downloadLimit ?? 5 : null,
    seatLimit: persona === 'student' ? null : seatLimit ?? (persona === 'teacher' ? 5 : 250),
    metadata,
    createdBy: createdBy || 'dashboard',
    createdAt: new Date().toISOString(),
    expiresAt,
  }
  store.codes.set(code.toUpperCase(), entry)
  store.audits.push({
    type: 'entitlement.generated',
    persona,
    code,
    createdBy: entry.createdBy,
    createdAt: entry.createdAt,
  })
  return sanitize(entry)
}

export function consumeEntitlement({ code, persona }) {
  const normalized = normalizeCode(code)
  const store = getStore()
  const verification = verifyAccessCode({ code: normalized, persona })
  if (!verification.valid) {
    const err = new Error(verification.reason || 'INVALID_CODE')
    err.code = verification.reason || 'INVALID_CODE'
    throw err
  }
  const entry = store.codes.get(normalized)
  if (entry.persona !== 'student') {
    return sanitize(entry)
  }
  if (entry.downloadsRemaining === null) {
    return sanitize(entry)
  }
  if (entry.downloadsRemaining <= 0) {
    const err = new Error('LIMIT_REACHED')
    err.code = 'LIMIT_REACHED'
    throw err
  }
  entry.downloadsRemaining -= 1
  store.audits.push({
    type: 'entitlement.consumed',
    code: entry.code,
    persona: entry.persona,
    consumedAt: new Date().toISOString(),
  })
  return sanitize(entry)
}











