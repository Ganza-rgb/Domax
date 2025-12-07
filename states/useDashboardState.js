'use client'

import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const DashboardStateContext = createContext(undefined)

export function DashboardStateProvider({ children }) {
  const [currentSection, setCurrentSection] = useState('home')
  const [selectedExam, setSelectedExam] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [rightPanelData, setRightPanelData] = useState({ type: 'overview', payload: null })

  const updatePanel = useCallback((next) => setRightPanelData(next), [])

  const value = useMemo(
    () => ({
      currentSection,
      setCurrentSection,
      selectedExam,
      setSelectedExam,
      selectedSubmission,
      setSelectedSubmission,
      selectedStudent,
      setSelectedStudent,
      rightPanelData,
      setRightPanelData,
      updatePanel,
    }),
    [currentSection, selectedExam, selectedSubmission, selectedStudent, rightPanelData, updatePanel]
  )

  return <DashboardStateContext.Provider value={value}>{children}</DashboardStateContext.Provider>
}

export function useDashboardState() {
  const context = useContext(DashboardStateContext)
  if (!context) {
    throw new Error('useDashboardState must be used within DashboardStateProvider')
  }
  return context
}

