'use server'

import { NextResponse } from 'next/server'
import { consumeEntitlement, generateAccessCode, verifyAccessCode } from '@/lib/entitlements'

export async function POST(request) {
  try {
    const body = await request.json()
    const { action = 'verify', code, persona, metadata, downloadLimit, seatLimit, ttlMinutes } = body || {}

    if (action === 'generate') {
      if (!persona) {
        return NextResponse.json({ error: 'PERSONA_REQUIRED' }, { status: 400 })
      }
      const entitlement = generateAccessCode({
        persona,
        metadata,
        downloadLimit,
        seatLimit,
        ttlMinutes,
        createdBy: metadata?.createdBy || 'dashboard',
      })
      return NextResponse.json({ entitlement })
    }

    if (!code) {
      return NextResponse.json({ error: 'CODE_REQUIRED' }, { status: 400 })
    }

    if (action === 'consume') {
      try {
        const entitlement = consumeEntitlement({ code, persona })
        return NextResponse.json({ valid: true, entitlement })
      } catch (error) {
        const statusMap = {
          LIMIT_REACHED: 409,
          INVALID_CODE: 404,
          PERSONA_MISMATCH: 400,
          EXPIRED: 410,
        }
        return NextResponse.json({ valid: false, error: error.code || 'CONSUME_FAILED' }, { status: statusMap[error.code] || 400 })
      }
    }

    const result = verifyAccessCode({ code, persona })
    const status = result.valid ? 200 : result.reason === 'EXPIRED' ? 410 : 404
    return NextResponse.json(result, { status })
  } catch (error) {
    console.error('verify access code error', error)
    return NextResponse.json({ error: 'ACCESS_CODE_FAILURE' }, { status: 500 })
  }
}











