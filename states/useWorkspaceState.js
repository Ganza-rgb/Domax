'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { seedClasses, seedExams, seedLog, seedRubrics } from '@/states/workspaceSeed'

/*
 * Everything a teacher works with: classes, the rubric library, exams with
 * their scripts and marks, and an append-only activity log.
 *
 * Prototype storage: saved in this browser only (page photos live in
 * lib/deviceStore). Nothing is sent anywhere. The rules below are the ones a
 * server will enforce later: an exam's step is derived from its facts, an
 * empty mark is never saved as 0, and nothing is released without the
 * teacher's explicit action.
 */

const STORAGE_KEY = 'domax:workspace:v1'

const newId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`

export const STEPS = [
  { key: 'prepare', label: 'Prepare' },
  { key: 'collect', label: 'Collect' },
  { key: 'mark', label: 'Mark' },
  { key: 'release', label: 'Release' },
]

export function rubricVersion(rubric, version) {
  if (!rubric) return null
  return rubric.versions.find((v) => v.version === version) || rubric.versions[rubric.versions.length - 1]
}

export function latestVersion(rubric) {
  return rubric?.versions[rubric.versions.length - 1] || null
}

/** Everything a screen needs to know about where an exam stands. */
export function examProgress(exam, cls, rubric) {
  const students = cls?.students || []
  const questions = rubricVersion(rubric, exam.rubricVersion)?.questions || []
  const scripts = exam.scripts || {}

  const absent = students.filter((s) => scripts[s.id]?.status === 'absent')
  const collected = students.filter((s) => scripts[s.id]?.status === 'collected')
  const missing = students.filter((s) => !scripts[s.id])
  const incomplete = collected
    .map((s) => {
      const have = new Set(scripts[s.id].pages.map((p) => p.page))
      const lacking = Array.from({ length: exam.pagesPerScript }, (_, i) => i + 1).filter((n) => !have.has(n))
      return { student: s, lacking }
    })
    .filter((row) => row.lacking.length)
  const retakes = collected.flatMap((s) =>
    scripts[s.id].pages.filter((p) => p.problems?.length).map((p) => ({ student: s, page: p.page, problems: p.problems }))
  )

  const isMarked = (studentId, questionId) => {
    const value = exam.marks?.[studentId]?.[questionId]
    return value !== undefined && value !== null
  }
  const perQuestion = questions.map((question) => ({
    question,
    done: collected.filter((s) => isMarked(s.id, question.id)).length,
    total: collected.length,
  }))
  const marksNeeded = collected.length * questions.length
  const marksDone = perQuestion.reduce((sum, row) => sum + row.done, 0)

  let step = 'done'
  if (!exam.rubricId || !exam.sheetsPrintedAt) step = 'prepare'
  else if (missing.length || incomplete.length || exam.unassigned?.length) step = 'collect'
  else if (marksDone < marksNeeded) step = 'mark'
  else if (!exam.releasedAt) step = 'release'

  return {
    step,
    students,
    questions,
    collected,
    absent,
    missing,
    incomplete,
    retakes,
    perQuestion,
    marksDone,
    marksNeeded,
    isMarked,
    totalMarks: questions.reduce((sum, question) => sum + Number(question.marks || 0), 0),
  }
}

/** Problems a teacher should fix in a rubric before the exam is sat. */
export function rubricWarnings(questions = []) {
  const warnings = []
  if (!questions.length) warnings.push('Add at least one question.')
  questions.forEach((question, i) => {
    const label = `Question ${i + 1}`
    if (!question.title?.trim()) warnings.push(`${label} has no wording.`)
    if (!(Number(question.marks) > 0)) warnings.push(`${label} has no marks.`)
    if (question.type !== 'diagram' && !question.modelAnswer?.trim()) warnings.push(`${label} has no model answer.`)
  })
  return warnings
}

const seedState = () => ({ classes: seedClasses, rubrics: seedRubrics, exams: seedExams, log: seedLog })

const WorkspaceContext = createContext(undefined)

export function WorkspaceStateProvider({ children }) {
  const [state, setState] = useState(seedState)
  const [loaded, setLoaded] = useState(false)
  const skipSave = useRef(true)

  // Load what this browser saved, after the first render so server and client match.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved?.exams && saved?.classes && saved?.rubrics) setState(saved)
    } catch {
      // Unreadable saved data: keep the example workspace.
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (skipSave.current) {
      skipSave.current = false
      return
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage full or blocked: the session keeps working, it just isn't kept.
    }
  }, [state, loaded])

  const update = useCallback((recipe) => setState((prev) => recipe(prev)), [])

  const withLog = (prev, entry) => [...prev.log, { id: newId('log'), at: new Date().toISOString(), ...entry }]

  const updateExam = useCallback(
    (examId, change, logEntry) =>
      update((prev) => ({
        ...prev,
        exams: prev.exams.map((exam) => (exam.id === examId ? change(exam) : exam)),
        log: logEntry ? withLog(prev, { examId, ...logEntry }) : prev.log,
      })),
    [update]
  )

  const actions = useMemo(
    () => ({
      /* Exams */
      createExam({ title, classId, rubricId, pagesPerScript }) {
        const id = newId('exm')
        update((prev) => {
          const rubric = prev.rubrics.find((r) => r.id === rubricId)
          return {
            ...prev,
            exams: [
              ...prev.exams,
              {
                id,
                title,
                classId,
                rubricId,
                rubricVersion: latestVersion(rubric)?.version || 1,
                pagesPerScript,
                createdAt: new Date().toISOString(),
                sheetsPrintedAt: null,
                scripts: {},
                sample: {},
                unassigned: [],
                marks: {},
                releasedAt: null,
              },
            ],
            log: withLog(prev, { examId: id, action: 'Exam created', detail: title }),
          }
        })
        return id
      },
      markSheetsPrinted(examId) {
        updateExam(examId, (exam) => ({ ...exam, sheetsPrintedAt: new Date().toISOString() }), { action: 'Header sheets printed' })
      },
      addPage(examId, { studentId, page, key, problems = [] }, how = 'Read from page code') {
        updateExam(
          examId,
          (exam) => {
            const script = exam.scripts[studentId]?.status === 'collected' ? exam.scripts[studentId] : { status: 'collected', pages: [] }
            const pages = [...script.pages.filter((p) => p.page !== page), { page, kind: 'photo', key, problems }].sort((a, b) => a.page - b.page)
            return { ...exam, scripts: { ...exam.scripts, [studentId]: { status: 'collected', pages } } }
          },
          { action: 'Page collected', detail: `${how} · page ${page}`, studentId }
        )
      },
      keepPage(examId, studentId, page) {
        updateExam(
          examId,
          (exam) => ({
            ...exam,
            scripts: {
              ...exam.scripts,
              [studentId]: { ...exam.scripts[studentId], pages: exam.scripts[studentId].pages.map((p) => (p.page === page ? { ...p, problems: [] } : p)) },
            },
          }),
          { action: 'Page kept as readable', detail: `page ${page}`, studentId }
        )
      },
      /** Only before any marking: switch the exam to a newer rubric version. */
      switchRubricVersion(examId, version) {
        updateExam(
          examId,
          (exam) => (Object.values(exam.marks || {}).some((m) => Object.keys(m).length) ? exam : { ...exam, rubricVersion: version }),
          { action: 'Rubric version changed', detail: `version ${version}` }
        )
      },
      addUnassigned(examId, { key, reason }) {
        updateExam(examId, (exam) => ({ ...exam, unassigned: [...(exam.unassigned || []), { id: newId('unk'), key, reason }] }))
      },
      removeUnassigned(examId, unassignedId) {
        updateExam(examId, (exam) => ({ ...exam, unassigned: exam.unassigned.filter((u) => u.id !== unassignedId) }))
      },
      setAbsent(examId, studentId, absent) {
        updateExam(
          examId,
          (exam) => {
            const scripts = { ...exam.scripts }
            if (absent) scripts[studentId] = { status: 'absent', pages: [] }
            else delete scripts[studentId]
            return { ...exam, scripts }
          },
          { action: absent ? 'Marked absent' : 'Absence undone', studentId }
        )
      },
      setMark(examId, studentId, questionId, value) {
        updateExam(
          examId,
          (exam) => {
            const marks = { ...exam.marks, [studentId]: { ...(exam.marks[studentId] || {}) } }
            if (value === null || value === undefined || value === '') delete marks[studentId][questionId]
            else marks[studentId][questionId] = Number(value)
            return { ...exam, marks }
          },
          { action: value === null || value === '' ? 'Mark cleared' : 'Mark saved', detail: `${questionId}${value === null || value === '' ? '' : ` · ${value}`}`, studentId }
        )
      },
      /** Only ever called from the teacher's release button. */
      release(examId) {
        updateExam(examId, (exam) => (exam.releasedAt ? exam : { ...exam, releasedAt: new Date().toISOString() }), {
          action: 'Results released to students',
        })
      },

      /* Rubrics: every save is a new version; old versions stay for past exams. */
      createRubric({ name, level }) {
        const id = newId('rub')
        update((prev) => ({
          ...prev,
          rubrics: [...prev.rubrics, { id, name, level, versions: [{ version: 1, savedAt: new Date().toISOString(), questions: [] }] }],
        }))
        return id
      },
      saveRubricVersion(rubricId, { name, level, questions }) {
        update((prev) => ({
          ...prev,
          rubrics: prev.rubrics.map((rubric) => {
            if (rubric.id !== rubricId) return rubric
            const last = latestVersion(rubric)
            const unchanged = JSON.stringify(last?.questions) === JSON.stringify(questions)
            const versions =
              unchanged || (last && !last.questions.length && rubric.versions.length === 1)
                ? rubric.versions.map((v, i) => (i === rubric.versions.length - 1 ? { ...v, questions, savedAt: new Date().toISOString() } : v))
                : [...rubric.versions, { version: (last?.version || 0) + 1, savedAt: new Date().toISOString(), questions }]
            return { ...rubric, name, level, versions }
          }),
        }))
      },
      duplicateRubric(rubricId) {
        const id = newId('rub')
        update((prev) => {
          const source = prev.rubrics.find((r) => r.id === rubricId)
          if (!source) return prev
          return {
            ...prev,
            rubrics: [
              ...prev.rubrics,
              { id, name: `${source.name} (copy)`, level: source.level, versions: [{ version: 1, savedAt: new Date().toISOString(), questions: latestVersion(source).questions }] },
            ],
          }
        })
        return id
      },

      /* Classes */
      createClass({ name, level, under16 }) {
        const id = newId('cls')
        update((prev) => ({ ...prev, classes: [...prev.classes, { id, name, level, under16, consent: null, students: [] }] }))
        return id
      },
      addStudents(classId, rows) {
        update((prev) => ({
          ...prev,
          classes: prev.classes.map((cls) =>
            cls.id === classId
              ? {
                  ...cls,
                  students: [
                    ...cls.students,
                    ...rows.map((row) => ({ id: newId('stu'), name: row.name.trim(), ids: { camis: row.camis || '', urubuto: row.urubuto || '', regNo: row.regNo || '' } })),
                  ],
                }
              : cls
          ),
        }))
      },
      removeStudent(classId, studentId) {
        update((prev) => ({
          ...prev,
          classes: prev.classes.map((cls) => (cls.id === classId ? { ...cls, students: cls.students.filter((s) => s.id !== studentId) } : cls)),
        }))
      },
      recordConsent(classId, consent) {
        update((prev) => ({
          ...prev,
          classes: prev.classes.map((cls) => (cls.id === classId ? { ...cls, consent: { ...consent, recordedOn: new Date().toISOString() } } : cls)),
          log: withLog(prev, { action: 'Consent recorded', detail: consent.basis, classId }),
        }))
      },

      resetExampleWorkspace() {
        setState(seedState())
      },
    }),
    [update, updateExam]
  )

  const value = useMemo(
    () => ({
      ...state,
      loaded,
      ...actions,
      findExam: (id) => state.exams.find((exam) => exam.id === id) || null,
      findClass: (id) => state.classes.find((cls) => cls.id === id) || null,
      findRubric: (id) => state.rubrics.find((rubric) => rubric.id === id) || null,
      progressOf: (exam) =>
        examProgress(
          exam,
          state.classes.find((cls) => cls.id === exam.classId),
          state.rubrics.find((rubric) => rubric.id === exam.rubricId)
        ),
    }),
    [state, loaded, actions]
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error('useWorkspace must be used within WorkspaceStateProvider')
  return context
}
