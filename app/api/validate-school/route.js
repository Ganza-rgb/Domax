'use server'

import { NextResponse } from 'next/server'
import { getSchoolByCode } from '@/lib/onboardingStore'

export async function POST(request) {
  try {
    const body = await request.json()
    const { code, type = 'school' } = body || {}
    if (!code) {
      return NextResponse.json({ error: 'CODE_REQUIRED' }, { status: 400 })
    }
    const entity = getSchoolByCode(code, type)
    if (!entity) {
      return NextResponse.json({ valid: false, reason: 'NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({
      valid: true,
      type,
      entity,
      statusLabel:
        entity.approvalsPending && entity.approvalsPending > 0 ? 'Requires finance approval' : 'Ready for onboarding',
    })
  } catch (error) {
    console.error('validate school error', error)
    return NextResponse.json({ error: 'VALIDATION_FAILED' }, { status: 500 })
  }
}











