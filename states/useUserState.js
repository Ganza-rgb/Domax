'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const defaultTeacher = {
  id: 'teacher-ava',
  name: 'Ms. Uwase',
  email: 'uwase@example.rw',
  avatar: 'MU',
  school: 'Groupe Scolaire Kigali',
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

const UserStateContext = createContext(undefined)

export function UserStateProvider({ children }) {
  const [teacher, setTeacher] = useState(defaultTeacher)
  const [billing] = useState(defaultBilling)

  const value = useMemo(
    () => ({
      teacher,
      setTeacher,
      billing,
      updatePreferences: (next) =>
        setTeacher((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, ...next },
        })),
    }),
    [teacher, billing]
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








