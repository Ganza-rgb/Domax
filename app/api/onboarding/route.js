'use server'

import { NextResponse } from 'next/server'
import { createPendingRequest, persistOnboardingStep } from '@/lib/onboardingStore'

function hasMeaningfulPayload(payload = {}) {
  return Object.values(payload).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value !== null) {
      return hasMeaningfulPayload(value)
    }
    return Boolean(value)
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { sessionId, role, step, data = {}, finalize = false, reason = 'manual' } = body || {}
    if (!role || typeof step === 'undefined') {
      return NextResponse.json({ error: 'ROLE_AND_STEP_REQUIRED' }, { status: 400 })
    }

    const { account = {}, roleData = {} } = data
    if (!hasMeaningfulPayload(account) && !hasMeaningfulPayload(roleData)) {
      return NextResponse.json(
        {
          skipped: true,
          message: 'Nothing to persist for this payload.',
        },
        { status: 200 }
      )
    }

    const { session, created } = await persistOnboardingStep({
      sessionId,
      role,
      step,
      finalize,
      payload: {
        account,
        roleData,
        reason,
      },
    })

    let pendingRequest = null
    if (finalize && ['school_admin', 'institution_admin'].includes(role)) {
      pendingRequest = createPendingRequest({
        sessionId: session.id,
        role,
        payload: session.data[role],
      })
    }

    return NextResponse.json({
      sessionId: session.id,
      created,
      savedAt: session.updatedAt,
      finalize,
      pendingRequest,
    })
  } catch (error) {
    console.error('onboarding save failed', error)
    return NextResponse.json(
      {
        error: 'ONBOARDING_SAVE_FAILED',
        message: error.message,
      },
      { status: 500 }
    )
  }
}


