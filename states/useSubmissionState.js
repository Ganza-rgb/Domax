'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const defaultSubmissions = [
  {
    id: 'sub-2101',
    examId: 'exam-bio-midterm',
    student: {
      id: 'stu-001',
      name: 'Ava Chen',
      classRoom: 'S3 • Blue',
      avatar: 'AC',
    },
    status: 'needs-review',
    receivedAt: '09:12',
    aiSummary: 'AI spotted weak evidence on question 3 and medium confidence on diagram labeling.',
    weakAreas: ['Evidence depth', 'Diagram annotations'],
    pages: [
      { id: 'page-1', label: 'Page 1', thumbnail: '/illustrations/empty-states/placeholder-1.svg' },
      { id: 'page-2', label: 'Page 2', thumbnail: '/illustrations/empty-states/placeholder-2.svg' },
      { id: 'page-3', label: 'Page 3', thumbnail: '/illustrations/empty-states/placeholder-3.svg' },
    ],
    questions: [
      {
        id: 'bio-q1',
        title: 'Cell structure labeling',
        maxScore: 10,
        aiScore: 8,
        confidence: 0.86,
        teacherScore: null,
        comment: '',
      },
      {
        id: 'bio-q2',
        title: 'Essay: importance of mitochondria',
        maxScore: 15,
        aiScore: 11,
        confidence: 0.64,
        teacherScore: null,
        comment: '',
      },
      {
        id: 'bio-q3',
        title: 'Short response: osmosis example',
        maxScore: 5,
        aiScore: 3,
        confidence: 0.58,
        teacherScore: null,
        comment: '',
      },
    ],
  },
  {
    id: 'sub-2102',
    examId: 'exam-bio-midterm',
    student: {
      id: 'stu-002',
      name: 'Marcus Lee',
      classRoom: 'S3 • Blue',
      avatar: 'ML',
    },
    status: 'ready',
    receivedAt: '08:43',
    aiSummary: 'All rubric rows confident above 0.9. Suggested release without manual review.',
    weakAreas: [],
    pages: [
      { id: 'page-1', label: 'Page 1', thumbnail: '/illustrations/empty-states/placeholder-1.svg' },
      { id: 'page-2', label: 'Page 2', thumbnail: '/illustrations/empty-states/placeholder-2.svg' },
    ],
    questions: [
      {
        id: 'bio-q1',
        title: 'Cell structure labeling',
        maxScore: 10,
        aiScore: 9,
        confidence: 0.93,
        teacherScore: 9,
        comment: 'Looks good.',
      },
      {
        id: 'bio-q2',
        title: 'Essay: importance of mitochondria',
        maxScore: 15,
        aiScore: 14,
        confidence: 0.9,
        teacherScore: 14,
        comment: '',
      },
      {
        id: 'bio-q3',
        title: 'Short response: osmosis example',
        maxScore: 5,
        aiScore: 5,
        confidence: 0.96,
        teacherScore: 5,
        comment: '',
      },
    ],
  },
]

const SubmissionStateContext = createContext(undefined)

export function SubmissionStateProvider({ children }) {
  const [submissions, setSubmissions] = useState(defaultSubmissions)
  const [activeSubmissionId, setActiveSubmissionId] = useState(defaultSubmissions[0]?.id || null)
  const [finalized, setFinalized] = useState({})

  const updateQuestionScore = (submissionId, questionId, score, comment) => {
    setSubmissions((prev) =>
      prev.map((submission) => {
        if (submission.id !== submissionId) return submission
        return {
          ...submission,
          questions: submission.questions.map((question) =>
            question.id === questionId
              ? {
                  ...question,
                  teacherScore: score ?? question.teacherScore,
                  comment: comment !== undefined ? comment : question.comment,
                }
              : question
          ),
        }
      })
    )
  }

  const finalizeSubmission = (submissionId) => {
    const submission = submissions.find((item) => item.id === submissionId)
    if (!submission) return null
    const ungraded = submission.questions.filter((q) => q.teacherScore == null)
    if (ungraded.length > 0) {
      return { success: false, reason: 'UNMARKED_QUESTIONS', pending: ungraded.map((q) => q.id) }
    }
    const result = {
      id: submission.id,
      totalScore: submission.questions.reduce((acc, q) => acc + (q.teacherScore ?? 0), 0),
      maxScore: submission.questions.reduce((acc, q) => acc + q.maxScore, 0),
      releasedAt: new Date().toISOString(),
    }
    setFinalized((prev) => ({ ...prev, [submissionId]: result }))
    setSubmissions((prev) =>
      prev.map((item) => (item.id === submissionId ? { ...item, status: 'completed' } : item))
    )
    return { success: true, result }
  }

  const value = useMemo(
    () => ({
      submissions,
      setSubmissions,
      activeSubmissionId,
      setActiveSubmissionId,
      activeSubmission: submissions.find((item) => item.id === activeSubmissionId) || null,
      findSubmissionById: (id) => submissions.find((item) => item.id === id) || null,
      updateQuestionScore,
      finalizeSubmission,
      finalized,
    }),
    [submissions, activeSubmissionId, finalized]
  )

  return <SubmissionStateContext.Provider value={value}>{children}</SubmissionStateContext.Provider>
}

export function useSubmissionState() {
  const context = useContext(SubmissionStateContext)
  if (!context) {
    throw new Error('useSubmissionState must be used within SubmissionStateProvider')
  }
  return context
}

