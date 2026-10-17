import { rubricVersion } from '@/states/useWorkspaceState'

/*
 * Results analysis from the marks a teacher has given. Nothing here is
 * estimated: a student only counts once every question on their script has a
 * teacher's mark, and absent students are never counted as zero.
 */

export const DEFAULT_PASS = 50

const round1 = (n) => Math.round(n * 10) / 10
const mean = (values) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : null)
const median = (values) => {
  if (!values.length) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export const BANDS = [
  { key: '0-19', label: '0–19%', min: 0, max: 20 },
  { key: '20-39', label: '20–39%', min: 20, max: 40 },
  { key: '40-59', label: '40–59%', min: 40, max: 60 },
  { key: '60-79', label: '60–79%', min: 60, max: 80 },
  { key: '80-100', label: '80–100%', min: 80, max: 101 },
]

export function analyseExam(exam, cls, rubric) {
  const questions = rubricVersion(rubric, exam.rubricVersion)?.questions || []
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
  const pass = exam.passMark ?? DEFAULT_PASS
  const students = cls?.students || []

  const rows = students.map((student) => {
    const script = exam.scripts?.[student.id]
    const marks = exam.marks?.[student.id] || {}
    const absent = script?.status === 'absent'
    const collected = script?.status === 'collected'
    const markedCount = questions.filter((q) => marks[q.id] !== undefined && marks[q.id] !== null).length
    const complete = collected && questions.length > 0 && markedCount === questions.length
    const total = questions.reduce((sum, q) => sum + Number(marks[q.id] ?? 0), 0)
    const pct = complete && totalMarks ? (total / totalMarks) * 100 : null
    return { student, absent, collected, markedCount, complete, total, pct, passed: pct === null ? null : pct >= pass, marks }
  })

  const complete = rows.filter((r) => r.complete)
  const pcts = complete.map((r) => r.pct)

  const perQuestion = questions.map((q) => {
    const got = complete.map((r) => Number(r.marks[q.id] ?? 0))
    const avgPct = got.length ? (mean(got) / q.marks) * 100 : null
    return {
      question: q,
      avgPct,
      full: got.filter((g) => g >= q.marks).length,
      zero: got.filter((g) => g === 0).length,
      n: got.length,
    }
  })

  const bands = BANDS.map((band) => ({ ...band, count: pcts.filter((p) => p >= band.min && p < band.max).length }))

  return {
    exam,
    cls,
    questions,
    totalMarks,
    pass,
    rows,
    complete,
    inProgress: rows.filter((r) => r.collected && !r.complete).length,
    absent: rows.filter((r) => r.absent).length,
    perQuestion,
    bands,
    stats: {
      n: complete.length,
      mean: pcts.length ? round1(mean(pcts)) : null,
      median: pcts.length ? round1(median(pcts)) : null,
      highest: pcts.length ? round1(Math.max(...pcts)) : null,
      lowest: pcts.length ? round1(Math.min(...pcts)) : null,
      passRate: pcts.length ? Math.round((complete.filter((r) => r.passed).length / complete.length) * 100) : null,
    },
  }
}

/** Every exam of a class, plus each student's average across the exams they completed. */
export function analyseClass(cls, exams, rubrics) {
  const analyses = exams
    .filter((exam) => exam.classId === cls.id)
    .map((exam) => analyseExam(exam, cls, rubrics.find((r) => r.id === exam.rubricId)))
    .filter((a) => a.stats.n > 0)
    .sort((a, b) => new Date(a.exam.createdAt) - new Date(b.exam.createdAt))

  const students = cls.students.map((student) => {
    const history = analyses
      .map((a) => ({ examId: a.exam.id, title: a.exam.title, pass: a.pass, row: a.rows.find((r) => r.student.id === student.id) }))
      .filter((h) => h.row?.complete)
      .map((h) => ({ examId: h.examId, title: h.title, pct: h.row.pct, passed: h.row.passed }))
    return { student, history, avgPct: history.length ? round1(mean(history.map((h) => h.pct))) : null }
  })

  const examMeans = analyses.map((a) => a.stats.mean)
  const allRows = analyses.flatMap((a) => a.complete)
  return {
    cls,
    analyses,
    students,
    mean: examMeans.length ? round1(mean(examMeans)) : null,
    passRate: allRows.length ? Math.round((allRows.filter((r) => r.passed).length / allRows.length) * 100) : null,
    scripts: allRows.length,
  }
}

export function analyseAllClasses(classes, exams, rubrics) {
  return classes.map((cls) => analyseClass(cls, exams, rubrics))
}

/** Questions where this student did clearly worse than the class: where to focus next. */
export function studentFocus(analysis, studentId, limit = 3) {
  const row = analysis.rows.find((r) => r.student.id === studentId)
  if (!row?.complete) return []
  return analysis.perQuestion
    .map(({ question, avgPct }) => {
      const got = Number(row.marks[question.id] ?? 0)
      const pct = (got / question.marks) * 100
      return { question, got, max: question.marks, pct, classPct: avgPct, gap: avgPct === null ? 0 : avgPct - pct }
    })
    .filter((item) => item.pct < 60 && item.gap > 0)
    .sort((a, b) => b.gap - a.gap || a.pct - b.pct)
    .slice(0, limit)
}

/** Plain-language advice built only from the marks. An assistant may rephrase it; it never changes the facts. */
export function focusAdvice(analysis, studentId) {
  const row = analysis.rows.find((r) => r.student.id === studentId)
  if (!row?.complete) return null
  const focus = studentFocus(analysis, studentId)
  const strong = analysis.perQuestion
    .map(({ question }) => ({ question, pct: (Number(row.marks[question.id] ?? 0) / question.marks) * 100 }))
    .filter((item) => item.pct >= 80)
    .slice(0, 2)
  return {
    pct: round1(row.pct),
    passed: row.passed,
    focus: focus.map((f) => ({ title: f.question.title, got: f.got, max: f.max, classPct: f.classPct === null ? null : Math.round(f.classPct) })),
    strong: strong.map((s) => s.question.title),
  }
}

export const percent = (n) => (n === null || n === undefined ? '–' : `${Math.round(n)}%`)
