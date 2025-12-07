'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import StudentProfile from '@/components/dashboard/StudentProfile'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

export default function StudentDetailsPage() {
  const params = useParams()
  const studentId = Array.isArray(params?.studentId) ? params.studentId[0] : params?.studentId
  const { setCurrentSection, updatePanel, setSelectedStudent } = useDashboardState()
  const { findStudentById } = useUserState()

  const student = studentId ? findStudentById(studentId) : null

  useEffect(() => {
    setCurrentSection('students')
    if (studentId) {
      setSelectedStudent(studentId)
    }
    if (student) {
      updatePanel({ type: 'student', payload: student })
    }
  }, [studentId, student, setCurrentSection, setSelectedStudent, updatePanel])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Student profile"
        title={student ? student.name : 'Student not found'}
        subtitle={student ? `${student.level} • Avg ${student.avgScore}%` : 'Check student id'}
      />
      <StudentProfile student={student} />
    </div>
  )
}








