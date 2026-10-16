'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const defaultTeacher = {
  id: 'teacher-ava',
  name: 'Ms. Domax Teacher',
  email: 'ava.teacher@domax.ai',
  avatar: 'DT',
  level: 'O-Level',
  schoolCode: 'DMX-432',
  // Every mark needs the teacher's signature, so there is no auto-release
  // preference.
  preferences: {
    notifications: true,
    language: 'en',
  },
  usage: {
    today: 42,
    thisWeek: 318,
    thisMonth: 1280,
  },
}

const defaultStudents = [
  {
    id: 'stu-001',
    name: 'Ava Chen',
    level: 'O-Level',
    lastActive: '2h ago',
    avgScore: 78,
    trend: '+3.2%',
    recentExams: [
      { id: 'exam-bio-midterm', title: 'Biology Midterm', score: 78, date: 'Feb 8' },
      { id: 'exam-lit-essay', title: 'Literature Essay', score: 84, date: 'Feb 2' },
    ],
  },
  {
    id: 'stu-002',
    name: 'Marcus Lee',
    level: 'O-Level',
    lastActive: '45m ago',
    avgScore: 88,
    trend: '+1.1%',
    recentExams: [
      { id: 'exam-bio-midterm', title: 'Biology Midterm', score: 89, date: 'Feb 8' },
    ],
  },
  {
    id: 'stu-003',
    name: 'Sofia Patel',
    level: 'O-Level',
    lastActive: 'Yesterday',
    avgScore: 72,
    trend: '-0.8%',
    recentExams: [
      { id: 'exam-bio-midterm', title: 'Biology Midterm', score: 70, date: 'Feb 8' },
    ],
  },
]

// Sample billing for the current term. Exams are priced per lib/pricing.js:
// a price per exam, plus a charge for each page over the level's allowance.
const defaultBilling = {
  term: 'Term 1, 2026',
  invoicedOn: 'End of term',
  usage: [
    { level: 'o-level', exams: 120, extraPages: 46 },
    { level: 'a-level', exams: 40, extraPages: 0 },
  ],
  invoices: [
    { id: 'INV-2025-03', period: 'Term 3, 2025', exams: 214, amount: 56350, issued: 'Dec 12, 2025', status: 'Paid' },
    { id: 'INV-2025-02', period: 'Term 2, 2025', exams: 168, amount: 43200, issued: 'Aug 8, 2025', status: 'Paid' },
  ],
}

const defaultPastPapers = [
  { id: 'paper-p6-math', level: 'P6', title: 'P6 Mathematics 2024', pages: 12, tags: ['Math', 'Multiple choice'] },
  { id: 'paper-s3-chem', level: 'S3', title: 'S3 Chemistry 2023', pages: 18, tags: ['Practical', 'Short answer'] },
  { id: 'paper-s6-lit', level: 'S6', title: 'S6 Literature 2022', pages: 22, tags: ['Essay'] },
]

const UserStateContext = createContext(undefined)

export function UserStateProvider({ children }) {
  const [teacher, setTeacher] = useState(defaultTeacher)
  const [students, setStudents] = useState(defaultStudents)
  const [pastPapers] = useState(defaultPastPapers)
  const [billing] = useState(defaultBilling)

  const value = useMemo(
    () => ({
      teacher,
      setTeacher,
      students,
      setStudents,
      pastPapers,
      billing,
      findStudentById: (id) => students.find((student) => student.id === id) || null,
      updatePreferences: (next) =>
        setTeacher((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, ...next },
        })),
    }),
    [teacher, students, pastPapers, billing]
  )

  return <UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>
}

export function useUserState() {
  const context = useContext(UserStateContext)
  if (!context) {
    throw new Error('useUserState must be used within UserStateProvider')
  }
  return context
}








