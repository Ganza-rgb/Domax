'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const defaultTeacher = {
  id: 'teacher-ava',
  name: 'Ms. Domax Teacher',
  email: 'ava.teacher@domax.ai',
  avatar: 'DT',
  level: 'O-Level',
  schoolCode: 'DMX-432',
  balancePages: 1240,
  balanceCurrency: 'RWF',
  balanceAmount: 43600,
  preferences: {
    notifications: true,
    autoRelease: false,
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

const defaultTransactions = [
  { id: 'txn-5001', type: 'Top-up', pages: 500, amount: 10000, date: 'Feb 6, 09:20', method: 'Card' },
  { id: 'txn-4997', type: 'Grading spend', pages: -120, amount: -2400, date: 'Feb 5, 17:11', method: 'Wallet' },
  { id: 'txn-4992', type: 'Top-up', pages: 800, amount: 16000, date: 'Feb 2, 15:47', method: 'Mobile money' },
]

const defaultPastPapers = [
  { id: 'paper-p6-math', level: 'P6', title: 'P6 Mathematics 2024', pages: 12, tags: ['Math', 'Multiple choice'] },
  { id: 'paper-s3-chem', level: 'S3', title: 'S3 Chemistry 2023', pages: 18, tags: ['Practical', 'Short answer'] },
  { id: 'paper-s6-lit', level: 'S6', title: 'S6 Literature 2022', pages: 22, tags: ['Essay'] },
]

const UserStateContext = createContext(undefined)

export function UserStateProvider({ children }) {
  const [teacher, setTeacher] = useState(defaultTeacher)
  const [students, setStudents] = useState(defaultStudents)
  const [transactions, setTransactions] = useState(defaultTransactions)
  const [pastPapers] = useState(defaultPastPapers)
  const [balance, setBalance] = useState({
    pagesProcessed: 5240,
    totalCost: 182500,
    levelMix: [
      { level: 'Primary', pages: 1200, cost: 24000 },
      { level: 'O-Level', pages: 3200, cost: 112000 },
      { level: 'A-Level', pages: 840, cost: 46400 },
    ],
  })

  const value = useMemo(
    () => ({
      teacher,
      setTeacher,
      students,
      setStudents,
      transactions,
      setTransactions,
      pastPapers,
      balance,
      setBalance,
      findStudentById: (id) => students.find((student) => student.id === id) || null,
      updatePreferences: (next) =>
        setTeacher((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, ...next },
        })),
    }),
    [teacher, students, transactions, pastPapers, balance]
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








