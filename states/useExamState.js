'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const defaultExams = [
  {
    id: 'exam-bio-midterm',
    title: 'S3 Biology Midterm',
    level: 'O-Level',
    scheduled: '2025-02-18',
    status: 'in-progress',
    duration: '2h',
    submissions: [
      { id: 'sub-2101', student: 'Ava Chen', progress: 'Needs manual review', aiConfidence: 0.74, updatedAt: '09:18' },
      { id: 'sub-2102', student: 'Marcus Lee', progress: 'Ready to finalize', aiConfidence: 0.92, updatedAt: '08:57' },
      { id: 'sub-2103', student: 'Sofia Patel', progress: 'AI grading', aiConfidence: 0.63, updatedAt: '08:41' },
    ],
    stats: { total: 38, graded: 26, needsReview: 5, aiLowConfidence: 4 },
  },
  {
    id: 'exam-lit-essay',
    title: 'S5 Literature Essay',
    level: 'A-Level',
    scheduled: '2025-02-11',
    status: 'draft',
    duration: '3h',
    submissions: [
      { id: 'sub-3101', student: 'Liam Niyonsenga', progress: 'Draft saved', aiConfidence: 0.0, updatedAt: 'Yesterday' },
    ],
    stats: { total: 24, graded: 0, needsReview: 0, aiLowConfidence: 0 },
  },
]

const ExamStateContext = createContext(undefined)

export function ExamStateProvider({ children }) {
  const [exams, setExams] = useState(defaultExams)
  const [activeExamId, setActiveExamId] = useState(defaultExams[0]?.id || null)

  const value = useMemo(
    () => ({
      exams,
      setExams,
      activeExamId,
      setActiveExamId,
      activeExam: exams.find((exam) => exam.id === activeExamId) || null,
      findExamById: (id) => exams.find((exam) => exam.id === id) || null,
      updateExamStats: (examId, updater) =>
        setExams((prev) =>
          prev.map((exam) => (exam.id === examId ? { ...exam, stats: updater(exam.stats) } : exam))
        ),
    }),
    [exams, activeExamId]
  )

  return <ExamStateContext.Provider value={value}>{children}</ExamStateContext.Provider>
}

export function useExamState() {
  const context = useContext(ExamStateContext)
  if (!context) {
    throw new Error('useExamState must be used within ExamStateProvider')
  }
  return context
}








