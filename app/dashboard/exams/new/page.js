'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace, latestVersion } from '@/states/useWorkspaceState'

export default function NewExamPage() {
  const router = useRouter()
  const { classes, rubrics, createExam } = useWorkspace()
  const [form, setForm] = useState({ title: '', classId: '', rubricId: '', pagesPerScript: 4 })

  const cls = classes.find((c) => c.id === form.classId)
  const rubric = rubrics.find((r) => r.id === form.rubricId)
  const questions = latestVersion(rubric)?.questions || []
  const problems = [
    cls && cls.students.length === 0 && 'This class has no students yet. Add them first so Domax can print a sheet for each one.',
    rubric && questions.length === 0 && 'This rubric has no questions yet. Add them before setting the exam.',
  ].filter(Boolean)
  const ready = form.title.trim() && cls && rubric && !problems.length && form.pagesPerScript >= 1

  const submit = (event) => {
    event.preventDefault()
    if (!ready) return
    const id = createExam({ title: form.title.trim(), classId: cls.id, rubricId: rubric.id, pagesPerScript: Number(form.pagesPerScript) })
    router.push(`/dashboard/exams/${id}`)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <WorkspaceHeader title="New exam" subtitle="Three choices, then print the answer sheets." />

      <Panel>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="exam-title" className={labelClass}>Name</label>
            <input
              id="exam-title"
              className={`${fieldClass} h-12 text-base`}
              placeholder="e.g. S3 Biology · End of term"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="exam-class" className={labelClass}>Class</label>
            <select id="exam-class" className={`${fieldClass} h-12 text-base`} value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}>
              <option value="">Choose a class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.students.length} students
                </option>
              ))}
            </select>
            <p className="text-sm text-[var(--sky-subtle)] mt-1.5">
              Not there? <Link href="/dashboard/classes/new" className="text-[var(--action-accent)] hover:underline">Add a class</Link>
            </p>
          </div>

          <div>
            <label htmlFor="exam-rubric" className={labelClass}>Rubric</label>
            <select id="exam-rubric" className={`${fieldClass} h-12 text-base`} value={form.rubricId} onChange={(e) => setForm({ ...form, rubricId: e.target.value })}>
              <option value="">Choose a rubric from your library</option>
              {rubrics.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} · version {latestVersion(r)?.version}
                </option>
              ))}
            </select>
            {rubric && questions.length > 0 && (
              <p className="text-sm text-[var(--sky-subtle)] mt-1.5">
                {questions.length} questions · {questions.reduce((sum, q) => sum + Number(q.marks || 0), 0)} marks
              </p>
            )}
            <p className="text-sm text-[var(--sky-subtle)] mt-1.5">
              Need a new one? <Link href="/dashboard/rubrics/new" className="text-[var(--action-accent)] hover:underline">Write a rubric</Link>
            </p>
          </div>

          <div>
            <label htmlFor="exam-pages" className={labelClass}>Pages each student writes on</label>
            <input
              id="exam-pages"
              type="number"
              min={1}
              max={20}
              className={`${fieldClass} h-12 text-base w-32`}
              value={form.pagesPerScript}
              onChange={(e) => setForm({ ...form, pagesPerScript: Math.max(1, Math.min(20, Number(e.target.value) || 1)) })}
            />
            <p className="text-sm text-[var(--sky-subtle)] mt-1.5">Domax prints this many answer pages per student, each with its own code.</p>
          </div>

          {problems.map((problem) => (
            <p key={problem} className="rounded-xl bg-[color-mix(in_srgb,var(--vscode-orange)_12%,transparent)] text-[var(--sky-text)] text-sm px-4 py-3">
              {problem}
            </p>
          ))}

          <Button type="submit" size="lg" disabled={!ready}>
            Create exam
          </Button>
        </form>
      </Panel>
    </div>
  )
}
