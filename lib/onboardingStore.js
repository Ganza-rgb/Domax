import { randomUUID } from 'crypto'

const STORE_KEY = '__domax_onboarding_store__'

const defaultSchools = [
  {
    code: 'KIG-001',
    name: 'Kigali STEM Academy',
    city: 'Kigali',
    country: 'Rwanda',
    walletId: 'wallet:school:kigali',
    autopay: true,
    approvalsPending: 1,
    contactEmail: 'finance@kigali-stem.rw',
    billingContact: {
      name: 'Chantal Mutesi',
      email: 'procurement@kigali-stem.rw',
    },
    seatsOnboarded: 37,
    seatsTarget: 48,
    gradeBands: ['O-Level', 'A-Level'],
    lastValidatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    code: 'STEM-201',
    name: 'STEM Nation High',
    city: 'Lagos',
    country: 'Nigeria',
    walletId: 'wallet:school:lagos',
    autopay: false,
    approvalsPending: 0,
    contactEmail: 'accounts@stemnation.ng',
    billingContact: {
      name: 'Temi Adeola',
      email: 'procurement@stemnation.ng',
    },
    seatsOnboarded: 112,
    seatsTarget: 150,
    gradeBands: ['O-Level'],
    lastValidatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
]

const defaultInstitutions = [
  {
    code: 'NEC-RW',
    name: 'National Examinations Council of Rwanda',
    country: 'Rwanda',
    contactEmail: 'standards@nec.gov.rw',
    walletId: 'wallet:institution:nec',
    campuses: 4,
    requiresEnterpriseSla: true,
    lastValidatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    code: 'WAEC-NG',
    name: 'West African Examinations Council',
    country: 'Nigeria',
    contactEmail: 'partnerships@waec.org.ng',
    walletId: 'wallet:institution:waec',
    campuses: 12,
    requiresEnterpriseSla: true,
    lastValidatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
]

function cloneEntity(entity) {
  return JSON.parse(JSON.stringify(entity))
}

function bootstrapStore() {
  const schools = new Map()
  const institutions = new Map()

  defaultSchools.forEach((school) => {
    schools.set(school.code.toUpperCase(), cloneEntity(school))
  })

  defaultInstitutions.forEach((institution) => {
    institutions.set(institution.code.toUpperCase(), cloneEntity(institution))
  })

  return {
    sessions: new Map(),
    pendingRequests: [],
    teacherLinks: [],
    schools,
    institutions,
  }
}

export function getOnboardingStore() {
  if (!globalThis[STORE_KEY]) {
    globalThis[STORE_KEY] = bootstrapStore()
  }
  return globalThis[STORE_KEY]
}

function ensureSessionSkeleton(session) {
  return (
    session || {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      history: [],
      data: {
        account: {},
        teacher: {},
        school_admin: {},
        institution_admin: {},
        student: {},
      },
    }
  )
}

export function getSchoolByCode(code, type = 'school') {
  if (!code) return null
  const normalized = code.trim().toUpperCase()
  const store = getOnboardingStore()
  const entity = type === 'institution' ? store.institutions.get(normalized) : store.schools.get(normalized)
  if (!entity) {
    return null
  }
  return cloneEntity(entity)
}

export async function persistOnboardingStep({ sessionId, role, step, payload = {}, finalize = false }) {
  if (!role) {
    throw new Error('ROLE_REQUIRED')
  }
  const store = getOnboardingStore()
  const now = new Date().toISOString()
  const existing = ensureSessionSkeleton(store.sessions.get(sessionId))
  const session = { ...existing }
  session.id = existing.id || sessionId || randomUUID()
  session.data.account = {
    ...(session.data.account || {}),
    ...(payload.account || {}),
  }
  if (payload.roleData) {
    session.data[role] = {
      ...(session.data[role] || {}),
      ...payload.roleData,
    }
  }
  session.step = step
  session.updatedAt = now
  session.finalized = finalize ? true : session.finalized || false
  session.history = [
    ...(session.history || []),
    {
      id: randomUUID(),
      role,
      step,
      reason: payload.reason || 'autosave',
      savedAt: now,
    },
  ]
  store.sessions.set(session.id, session)
  return {
    session,
    created: !sessionId,
  }
}

export async function createPendingRequest({ sessionId, role, payload }) {
  if (!sessionId || !role) {
    throw new Error('INVALID_PENDING_REQUEST')
  }
  const store = getOnboardingStore()
  const request = {
    id: randomUUID(),
    sessionId,
    role,
    status: 'pending',
    createdAt: new Date().toISOString(),
    payload: cloneEntity(payload || {}),
  }
  store.pendingRequests.push(request)
  return request
}

export async function linkTeacherToSchool({ sessionId, teacherName, teacherEmail, schoolCode }) {
  if (!teacherName || !teacherEmail || !schoolCode) {
    const err = new Error('MISSING_FIELDS')
    err.code = 'MISSING_FIELDS'
    throw err
  }
  const normalized = schoolCode.trim().toUpperCase()
  const school = getSchoolByCode(normalized)
  if (!school) {
    const err = new Error('SCHOOL_NOT_FOUND')
    err.code = 'SCHOOL_NOT_FOUND'
    throw err
  }
  const store = getOnboardingStore()
  const link = {
    id: randomUUID(),
    sessionId: sessionId || null,
    teacherName,
    teacherEmail,
    schoolCode: normalized,
    status: 'pending-approval',
    createdAt: new Date().toISOString(),
    nextAction: 'Awaiting finance approval',
  }
  store.teacherLinks.push(link)
  return {
    link,
    school,
  }
}


