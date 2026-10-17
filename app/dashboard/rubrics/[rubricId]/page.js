'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace, latestVersion, rubricWarnings } from '@/states/useWorkspaceState'

const TYPES = [
  { value: 'structured', label: 'Structured' },
  { value: 'short', label: 'Short answer' },
  { value: 'essay', label: 'Essay' },
  { value: 'calculation', label: 'Calculation' },
  { value: 'diagram', label: 'Diagram (always marked by hand)' },
]

// The first blank question gets a fixed id so server and browser render the same.
const blankQuestion = (number, fixed = false) => ({
  id: fixed ? `q-new-${number}` : `q-${Math.random().toString(36).slice(2, 8)}`,
  number,
  title: '',
  marks: 2,
  type: 'short',
  modelAnswer: '',
  points: [],
})

export default function RubricEditor() {
  const { rubricId } = useParams()
  const router = useRouter()
  const { findRubric, createRubric, saveRubricVersion, exams, loaded } = useWorkspace()
  const isNew = rubricId === 'new'
  const rubric = isNew ? null : findRubric(rubricId)
  const latest = latestVersion(rubric)

  const [name, setName] = useState('')
  const [level, setLevel] = useState('O-Level')
  const [questions, setQuestions] = useState([blankQuestion(1, true)])
  const [savedNote, setSavedNote] = useState('')

  useEffect(() => {
    if (rubric) {
      setName(rubric.name)
      setLevel(rubric.level || 'O-Level')
      setQuestions(latest?.questions?.length ? latest.questions : [blankQuestion(1, true)])
    }
  }, [rubric?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isNew && !rubric) {
    return loaded ? <EmptyState title="This rubric isn’t here" body="It may have been made on another device." action={<Button href="/dashboard/rubrics">All rubrics</Button>} /> : null
  }

  const total = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)
  const warnings = rubricWarnings(questions)
  const usedBy = rubric ? exams.filter((exam) => exam.rubricId === rubric.id) : []

  const change = (index, field, value) => setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)))
  const remove = (index) => setQuestions((prev) => prev.filter((_, i) => i !== index).map((q, i) => ({ ...q, number: i + 1 })))
  const move = (index, delta) =>
    setQuestions((prev) => {
      const next = [...prev]
      const target = index + delta
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next.map((q, i) => ({ ...q, number: i + 1 }))
    })

  const save = () => {
    if (!name.trim()) return
    const clean = questions.map((q, i) => ({ ...q, number: i + 1, marks: Number(q.marks) || 0, points: q.points.filter((p) => p.trim()) }))
    if (isNew) {
      const id = createRubric({ name: name.trim(), level })
      saveRubricVersion(id, { name: name.trim(), level, questions: clean })
      router.replace(`/dashboard/rubrics/${id}`)
      return
    }
    saveRubricVersion(rubric.id, { name: name.trim(), level, questions: clean })
    setSavedNote('Saved. Exams already using this rubric keep the version they started with.')
  }

  return (
    <div className="max-w-3xl space-y-6">
      <WorkspaceHeader
        title={isNew ? 'New rubric' : rubric.name}
        subtitle={isNew ? 'One block per question. You can reuse this rubric in later terms.' : `Version ${latest?.version} · ${questions.length} questions · ${total} marks`}
        actions={
          <Button size="lg" onClick={save} disabled={!name.trim()}>
            {isNew ? 'Save rubric' : 'Save changes'}
          </Button>
        }
      />

      {savedNote && <p role="status" className="rounded-xl bg-[color-mix(in_srgb,var(--vscode-green)_12%,transparent)] px-4 py-3 text-sm">{savedNote}</p>}

      <Panel>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_12rem] gap-4">
          <div>
            <label htmlFor="rubric-name" className={labelClass}>Name</label>
            <input id="rubric-name" className={`${fieldClass} h-11`} placeholder="e.g. S3 Biology · Term 1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="rubric-level" className={labelClass}>Level</label>
            <select id="rubric-level" className={`${fieldClass} h-11`} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>O-Level</option>
              <option>A-Level</option>
              <option>University & polytechnic</option>
            </select>
          </div>
        </div>
      </Panel>

      {questions.map((q, index) => (
        <Panel
          key={q.id}
          title={`Question ${index + 1}`}
          actions={
            <div className="flex gap-1">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="w-8 h-8 rounded-full border border-[var(--sky-panel-border)] disabled:opacity-30" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === questions.length - 1} className="w-8 h-8 rounded-full border border-[var(--sky-panel-border)] disabled:opacity-30" aria-label="Move down">↓</button>
              <button type="button" onClick={() => remove(index)} disabled={questions.length === 1} className="h-8 px-3 rounded-full text-sm text-[var(--vscode-red)] disabled:opacity-30">Remove</button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label htmlFor={`q-${q.id}-title`} className={labelClass}>Question</label>
              <input id={`q-${q.id}-title`} className={fieldClass} value={q.title} onChange={(e) => change(index, 'title', e.target.value)} placeholder="What the students were asked" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`q-${q.id}-marks`} className={labelClass}>Marks</label>
                <input id={`q-${q.id}-marks`} type="number" min={0} className={fieldClass} value={q.marks} onChange={(e) => change(index, 'marks', e.target.value)} />
              </div>
              <div>
                <label htmlFor={`q-${q.id}-type`} className={labelClass}>Type</label>
                <select id={`q-${q.id}-type`} className={fieldClass} value={q.type} onChange={(e) => change(index, 'type', e.target.value)}>
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`q-${q.id}-model`} className={labelClass}>Model answer</label>
              <textarea id={`q-${q.id}-model`} rows={2} className={`${fieldClass} h-auto py-2`} value={q.modelAnswer} onChange={(e) => change(index, 'modelAnswer', e.target.value)} />
            </div>
            <div>
              <label htmlFor={`q-${q.id}-points`} className={labelClass}>
                Points that earn marks <span className="font-normal text-[var(--sky-subtle)]">(one per line)</span>
              </label>
              <textarea
                id={`q-${q.id}-points`}
                rows={3}
                className={`${fieldClass} h-auto py-2`}
                value={q.points.join('\n')}
                onChange={(e) => change(index, 'points', e.target.value.split('\n'))}
                placeholder={'e.g. Water enters by osmosis\nNames haemolysis'}
              />
              <p className="text-xs text-[var(--sky-subtle)] mt-1">In the marking room, ticking points fills in the mark for you.</p>
            </div>
          </div>
        </Panel>
      ))}

      <button
        type="button"
        onClick={() => setQuestions((prev) => [...prev, blankQuestion(prev.length + 1)])}
        className="w-full h-12 rounded-2xl border-2 border-dashed border-[var(--sky-panel-border)] text-[15px] font-semibold text-[var(--sky-subtle)] hover:border-[var(--action-accent)] hover:text-[var(--action-accent)]"
      >
        Add a question
      </button>

      {warnings.length > 0 && (
        <div className="rounded-xl bg-[color-mix(in_srgb,var(--vscode-orange)_12%,transparent)] px-4 py-3 text-sm">
          <p className="font-semibold">Before you set an exam with this rubric:</p>
          <ul className="mt-1 list-disc pl-5">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {rubric && rubric.versions.length > 1 && (
        <Panel title="Earlier versions">
          <ul className="space-y-1 text-sm">
            {rubric.versions.slice().reverse().map((v) => (
              <li key={v.version} className="flex justify-between gap-4">
                <span>Version {v.version} · {v.questions.length} questions</span>
                <span className="text-[var(--sky-subtle)]">
                  {new Date(v.savedAt).toLocaleDateString()}
                  {usedBy.some((e) => e.rubricVersion === v.version) ? ' · used by an exam' : ''}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="flex justify-end">
        <Button size="lg" onClick={save} disabled={!name.trim()}>
          {isNew ? 'Save rubric' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}
