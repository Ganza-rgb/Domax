'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useWorkspace } from '@/states/useWorkspaceState'
import { ScriptPage } from '@/components/workspace/examStatus'
import { TickMark } from '@/components/dashboard/ui'
import AssistantBox from '@/components/workspace/AssistantBox'

/*
 * The marking room: one question across the whole class, names hidden,
 * nothing else on screen. Marks save as the teacher moves on; an empty mark
 * is never saved as 0.
 */
export default function MarkingRoom() {
  const { examId } = useParams()
  const router = useRouter()
  const { findExam, progressOf, setMark, loaded } = useWorkspace()
  const exam = findExam(examId)
  const progress = exam ? progressOf(exam) : null
  const questions = progress?.questions || []
  const scripts = progress?.collected || []

  const [qIndex, setQIndex] = useState(null)
  const [sIndex, setSIndex] = useState(0)
  const [draft, setDraft] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [ticked, setTicked] = useState([])
  const lastKey = useRef(0)

  const question = qIndex === null ? null : questions[qIndex]
  const student = scripts[sIndex]
  const saved = question && student ? exam.marks?.[student.id]?.[question.id] : undefined
  const max = Number(question?.marks || 0)
  const leaveHref = `/dashboard/exams/${examId}?step=mark`

  const firstUnmarked = useCallback(
    (q) => scripts.findIndex((s) => exam.marks?.[s.id]?.[q.id] === undefined),
    [scripts, exam]
  )

  // Start on the question in the link, else the first unfinished one.
  useEffect(() => {
    if (!exam || qIndex !== null || !questions.length) return
    const requested = new URLSearchParams(window.location.search).get('q')
    let index = questions.findIndex((q) => q.id === requested)
    if (index < 0) index = Math.max(0, questions.findIndex((q) => firstUnmarked(q) >= 0))
    setQIndex(index)
    setSIndex(Math.max(0, firstUnmarked(questions[index])))
  }, [exam, questions, qIndex, firstUnmarked])

  // Show the saved mark when arriving at a script.
  useEffect(() => {
    setDraft(saved === undefined || saved === null ? '' : String(saved))
    setTicked([])
  }, [student?.id, question?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const remaining = useMemo(
    () => (question ? scripts.filter((s) => exam.marks?.[s.id]?.[question.id] === undefined).length : 0),
    [question, scripts, exam]
  )

  const commit = useCallback(() => {
    if (!question || !student || draft === '') return
    const value = Math.min(max, Math.max(0, Number(draft)))
    if (Number.isNaN(value)) return
    if (value !== saved) setMark(exam.id, student.id, question.id, value)
  }, [question, student, draft, max, saved, setMark, exam])

  const goTo = useCallback(
    (index) => {
      commit()
      setSIndex((index + scripts.length) % scripts.length)
      setPageIndex(0)
    },
    [commit, scripts.length]
  )

  const saveAndNext = useCallback(() => {
    if (draft === '') return
    commit()
    // Next unmarked script after this one, wrapping round; stay put if this was the last.
    const order = scripts.map((_, i) => (sIndex + 1 + i) % scripts.length)
    const next = order.find((i) => i !== sIndex && exam.marks?.[scripts[i].id]?.[question.id] === undefined)
    if (next !== undefined) {
      setSIndex(next)
      setPageIndex(0)
    }
  }, [draft, commit, scripts, sIndex, exam, question])

  const switchQuestion = (index) => {
    commit()
    const q = questions[index]
    setQIndex(index)
    setSIndex(Math.max(0, firstUnmarked(q)))
    setPageIndex(0)
  }

  // Keyboard: numbers set the mark, Enter saves and moves on, arrows move, Esc leaves.
  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest?.('input, textarea, select')) return
      if (/^[0-9]$/.test(event.key)) {
        const now = Date.now()
        setDraft((prev) => {
          const combined = max >= 10 && now - lastKey.current < 900 ? `${prev}${event.key}` : event.key
          return Number(combined) <= max ? combined : event.key
        })
        lastKey.current = now
      } else if (event.key === '.' && max > 1) {
        setDraft((prev) => (prev && !prev.includes('.') ? `${prev}.5` : prev))
      } else if (event.key === 'Backspace') {
        setDraft('')
      } else if (event.key === 'Enter') {
        event.preventDefault()
        saveAndNext()
      } else if (event.key === 'ArrowRight') {
        goTo(sIndex + 1)
      } else if (event.key === 'ArrowLeft') {
        goTo(sIndex - 1)
      } else if (event.key === 'Escape') {
        commit()
        router.push(leaveHref)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [max, saveAndNext, goTo, sIndex, commit, router, leaveHref])

  // A point worth more than one mark says so at the end, e.g. "Osmosis: water only (2)".
  const pointValue = (point) => Number(/\((\d+(?:\.\d+)?)\)\s*$/.exec(point)?.[1] || 1)

  const toggleTick = (index) => {
    setTicked((prev) => {
      const next = prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      const sum = next.reduce((total, i) => total + pointValue(question.points[i]), 0)
      setDraft(next.length ? String(Math.min(max, sum)) : '')
      return next
    })
  }

  if (!loaded) return null
  if (!exam || !questions.length || !scripts.length) {
    return (
      <div className="fixed inset-0 z-[60] bg-[var(--sky-surface)] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-semibold">Nothing to mark yet</h1>
          <p className="text-[var(--sky-subtle)] mt-2">Collect the scripts first, then come back here.</p>
          <Link href={exam ? `/dashboard/exams/${exam.id}` : '/dashboard/exams'} className="inline-flex mt-5 min-h-11 px-5 items-center rounded-full bg-[var(--action-accent)] text-white font-semibold">
            Back to the exam
          </Link>
        </div>
      </div>
    )
  }
  if (!question || !student) return null

  const script = exam.scripts[student.id]
  const pages = script?.pages || []
  const page = pages[Math.min(pageIndex, pages.length - 1)]
  const sampleText = exam.sample?.[student.id]?.[question.id]
  const questionDone = remaining === 0
  const markButtons = max <= 20 ? Array.from({ length: max + 1 }, (_, i) => i) : null

  return (
    <div className="fixed inset-0 z-[60] bg-[var(--sky-surface)] flex flex-col text-[var(--sky-text)]">
      {/* Top bar */}
      <header className="flex items-center justify-between gap-3 px-4 sm:px-6 h-14 border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
        <div className="flex items-center gap-2 min-w-0">
          <button type="button" onClick={() => switchQuestion(qIndex - 1)} disabled={qIndex === 0} className="w-8 h-8 rounded-full border border-[var(--sky-panel-border)] disabled:opacity-30" aria-label="Previous question">‹</button>
          <p className="text-[15px] font-semibold truncate">
            Question {question.number} <span className="font-normal text-[var(--sky-subtle)]">of {questions.length} · {max} marks</span>
          </p>
          <button type="button" onClick={() => switchQuestion(qIndex + 1)} disabled={qIndex === questions.length - 1} className="w-8 h-8 rounded-full border border-[var(--sky-panel-border)] disabled:opacity-30" aria-label="Next question">›</button>
        </div>
        <p className="hidden sm:block text-sm text-[var(--sky-subtle)] tabular-nums">
          Script {sIndex + 1} of {scripts.length} · {remaining} left on this question
        </p>
        <button
          type="button"
          onClick={() => {
            commit()
            router.push(leaveHref)
          }}
          className="text-sm font-semibold px-3 h-9 rounded-full border border-[var(--sky-panel-border)] hover:bg-[var(--sky-surface)]"
        >
          Done for now <span className="hidden sm:inline text-[var(--sky-subtle)] font-normal">· Esc</span>
        </button>
      </header>

      <div className="h-1 bg-[var(--sky-panel-border)]">
        <div className="h-full bg-[var(--vscode-green)] transition-all" style={{ width: `${((scripts.length - remaining) / scripts.length) * 100}%` }} />
      </div>

      {questionDone && saved !== undefined && draft === String(saved) ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <TickMark className="w-12 h-12 mx-auto" />
            <h1 className="text-2xl font-semibold mt-4">Question {question.number} is marked for everyone</h1>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {qIndex < questions.length - 1 ? (
                <button type="button" onClick={() => switchQuestion(qIndex + 1)} className="min-h-12 px-6 rounded-full bg-[var(--action-accent)] text-white font-semibold">
                  Next: Question {questions[qIndex + 1].number}
                </button>
              ) : (
                <Link href={`/dashboard/exams/${exam.id}`} className="inline-flex items-center min-h-12 px-6 rounded-full bg-[var(--action-accent)] text-white font-semibold">
                  Back to the exam
                </Link>
              )}
              <button type="button" onClick={() => setDraft('')} className="min-h-12 px-6 rounded-full border border-[var(--sky-panel-border)] font-semibold">
                Review the marks
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          {/* The answer */}
          <section className="min-h-0 overflow-y-auto p-4 sm:p-6 bg-[var(--sky-surface)] border-b lg:border-b-0 lg:border-r border-[var(--sky-panel-border)]">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-sm text-[var(--sky-subtle)]">Script {sIndex + 1} · name hidden while you mark</p>
              {pages.length > 1 && script?.pages[0]?.kind === 'photo' && (
                <div className="flex gap-1">
                  {pages.map((p, i) => (
                    <button
                      key={p.page}
                      type="button"
                      onClick={() => setPageIndex(i)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold ${i === pageIndex ? 'bg-[var(--action-accent)] text-white' : 'bg-[var(--sky-panel)] border border-[var(--sky-panel-border)]'}`}
                      aria-label={`Page ${p.page}`}
                    >
                      {p.page}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ScriptPage page={page} sampleText={sampleText} className="max-w-2xl mx-auto" />
          </section>

          {/* Marking */}
          <section className="min-h-0 overflow-y-auto p-4 sm:p-6 bg-[var(--sky-panel)] flex flex-col gap-5">
            <div>
              <p className="text-sm text-[var(--sky-subtle)]">Question {question.number}</p>
              <h1 className="text-xl font-semibold tracking-[-0.02em] mt-0.5">{question.title}</h1>
              {question.type === 'diagram' && <p className="text-sm text-[var(--sky-subtle)] mt-1">Diagram: mark it from the drawing.</p>}
            </div>

            {question.points?.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Marking points <span className="font-normal text-[var(--sky-subtle)]">· tick what the answer earns</span></p>
                <ul className="space-y-1">
                  {question.points.map((point, index) => (
                    <li key={point}>
                      <button
                        type="button"
                        onClick={() => toggleTick(index)}
                        aria-pressed={ticked.includes(index)}
                        className={`w-full flex items-start gap-2.5 text-left rounded-lg px-3 py-2 text-[15px] transition-colors ${ticked.includes(index) ? 'bg-[color-mix(in_srgb,var(--vscode-green)_12%,transparent)]' : 'hover:bg-[var(--sky-surface)]'}`}
                      >
                        {ticked.includes(index) ? (
                          <TickMark className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        ) : (
                          <span aria-hidden="true" className="w-5 h-5 rounded-full border-2 border-[var(--sky-panel-border)] flex-shrink-0 mt-0.5" />
                        )}
                        {point}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {question.modelAnswer && (
              <details className="rounded-xl bg-[var(--sky-surface)] px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold">Model answer</summary>
                <p className="text-[15px] text-[var(--sky-text)] mt-2 leading-relaxed">{question.modelAnswer}</p>
              </details>
            )}

            <AssistantBox
              exam={exam}
              question={question}
              student={student}
              pages={pages}
              sampleText={sampleText}
              onUse={(score) => {
                setDraft(String(score))
                setTicked([])
              }}
            />

            <div>
              <p className="text-sm font-semibold mb-2">Your mark</p>
              {markButtons ? (
                <div className="flex flex-wrap gap-2">
                  {markButtons.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDraft(String(n))}
                      aria-pressed={draft === String(n)}
                      className={`w-12 h-12 rounded-xl text-lg font-semibold tabular-nums border transition-colors ${
                        draft === String(n) ? 'bg-[var(--action-accent)] border-[var(--action-accent)] text-white' : 'border-[var(--sky-panel-border)] hover:border-[var(--action-accent)]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              ) : (
                <input type="number" min={0} max={max} value={draft} onChange={(e) => setDraft(e.target.value)} className="h-12 w-28 rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-3 text-lg" aria-label="Your mark" />
              )}
              {draft.includes('.') && <p className="text-sm text-[var(--sky-subtle)] mt-2">Half mark: {draft}</p>}
            </div>

            <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={saveAndNext}
                disabled={draft === ''}
                className="min-h-12 px-7 rounded-full bg-[var(--action-accent)] text-white text-[15px] font-semibold disabled:opacity-40"
              >
                {remaining <= 1 && saved === undefined ? 'Save' : 'Save and next'}
              </button>
              <button type="button" onClick={() => goTo(sIndex - 1)} className="min-h-12 px-4 rounded-full border border-[var(--sky-panel-border)] font-semibold" aria-label="Previous script">←</button>
              <button type="button" onClick={() => goTo(sIndex + 1)} className="min-h-12 px-4 rounded-full border border-[var(--sky-panel-border)] font-semibold" aria-label="Next script">→</button>
              <p className="hidden md:block text-xs text-[var(--sky-subtle)] w-full">Type the number, then Enter. ← → to move between scripts.</p>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
