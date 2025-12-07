'use server'

import { NextResponse } from 'next/server'
import { linkTeacherToSchool } from '@/lib/onboardingStore'

export async function POST(request) {
  try {
    const body = await request.json()
    const { sessionId, teacherName, teacherEmail, schoolCode } = body || {}
    if (!teacherName || !teacherEmail || !schoolCode) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 })
    }

    const { link, school } = await linkTeacherToSchool({
      sessionId,
      teacherName,
      teacherEmail,
      schoolCode,
    })

    return NextResponse.json({
      linked: true,
      link,
      school,
    })
  } catch (error) {
    if (error.code === 'SCHOOL_NOT_FOUND') {
      return NextResponse.json({ error: 'SCHOOL_NOT_FOUND' }, { status: 404 })
    }
    if (error.code === 'MISSING_FIELDS') {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 })
    }
    console.error('link-teacher error', error)
    return NextResponse.json({ error: 'LINK_FAILURE' }, { status: 500 })
  }
}


