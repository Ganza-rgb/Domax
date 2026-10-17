'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WsButton as Button, Panel, ConfirmDialog, ProgressBar, TickMark, downloadCsv, fieldClass } from '@/components/dashboard/ui'
import { useWorkspace, latestVersion, rubricVersion, rubricWarnings } from '@/states/useWorkspaceState'
import { processPhoto } from '@/lib/capture'
import { portal } from '@/lib/portalClient'
import { putPage, deletePage } from '@/lib/deviceStore'
import { ScriptPage } from '@/components/workspace/examStatus'
import Materials from '@/components/workspace/Materials'

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`
const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '')

function Row({ label, children, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3.5 border-b border-[var(--sky-panel-border)] last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm text-[var(--sky-subtle)]">{label}</p>
        <div className="text-[15px] text-[var(--sky-text)] mt-0.5">{children}</div>
      </div>
      {action}
    </div>
  )
}

function Big({ value, of, tone }) {
  return (
    <p className={`font-headline text-[2.25rem] leading-none font-semibold tracking-[-0.04em] tabular-nums ${tone === 'warn' ? 'text-[var(--vscode-orange)]' : 'text-[var(--sky-text)]'}`}>
      {value}
      {of !== undefined && <span className="text-lg font-medium text-[var(--sky-subtle)] tracking-normal"> of {of}</span>}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Step 1: Prepare                                                      */
/* ------------------------------------------------------------------ */
export function PrepareStep({ exam, cls, rubric, progress }) {
  const { switchRubricVersion } = useWorkspace()
  const version = rubricVersion(rubric, exam.rubricVersion)
  const newest = latestVersion(rubric)
  const warnings = rubricWarnings(version?.questions)
  const anyMarks = progress.marksDone > 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6 items-start">
      <Panel title="What this exam uses">
        <Row label="Class" action={<Button variant="secondary" size="sm" href={`/dashboard/classes/${cls?.id}`}>Open class</Button>}>
          {cls?.name} · {plural(cls?.students.length || 0, 'student')}
          {cls?.under16 && (
            <span className={`block text-sm mt-0.5 ${cls.consent ? 'text-[var(--sky-subtle)]' : 'text-[var(--vscode-orange)]'}`}>
              {cls.consent ? `Consent recorded ${formatDate(cls.consent.recordedOn)}` : 'Students are under 16: record consent before releasing results'}
            </span>
          )}
        </Row>
        <Row label="Rubric" action={<Button variant="secondary" size="sm" href={`/dashboard/rubrics/${rubric?.id}`}>Open rubric</Button>}>
          {rubric?.name} · version {version?.version}
          <span className="block text-sm text-[var(--sky-subtle)] mt-0.5">
            {plural(version?.questions.length || 0, 'question')} · {progress.totalMarks} marks
          </span>
          {newest && version && newest.version !== version.version && (
            <span className="block text-sm mt-1.5">
              Version {newest.version} is newer.{' '}
              {anyMarks ? (
                <span className="text-[var(--sky-subtle)]">Marking has started, so this exam keeps version {version.version}.</span>
              ) : (
                <button type="button" className="text-[var(--action-accent)] font-semibold hover:underline" onClick={() => switchRubricVersion(exam.id, newest.version)}>
                  Use version {newest.version}
                </button>
              )}
            </span>
          )}
        </Row>
        <Row label="Answer pages per student">{exam.pagesPerScript}</Row>
        {warnings.length > 0 && (
          <div className="mt-4 rounded-xl bg-[color-mix(in_srgb,var(--vscode-orange)_12%,transparent)] px-4 py-3 text-sm">
            <p className="font-semibold text-[var(--sky-text)]">Fix these in the rubric before the exam:</p>
            <ul className="mt-1 list-disc pl-5 text-[var(--sky-text)]">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </Panel>

      <Panel title="Answer sheets">
        <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
          Each student gets {plural(exam.pagesPerScript, 'page')} with their own code. The code is how Domax knows whose page it is, so students
          write on these sheets instead of plain paper.
        </p>
        <div className="mt-5">
          <Button href={`/dashboard/exams/${exam.id}/sheets`} size="lg" className="w-full">
            {exam.sheetsPrintedAt ? 'Print sheets again' : 'Print answer sheets'}
          </Button>
        </div>
        {exam.sheetsPrintedAt && (
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--sky-subtle)]">
            <TickMark className="w-4 h-4" /> Printed {formatDate(exam.sheetsPrintedAt)}
          </p>
        )}
      </Panel>

      <div className="lg:col-span-2">
        <Materials exam={exam} cls={cls} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 2: Collect                                                      */
/* ------------------------------------------------------------------ */
export function CollectStep({ exam, cls, progress }) {
  const { addPage, addUnassigned, removeUnassigned, setAbsent, keepPage } = useWorkspace()
  const [results, setResults] = useState([])
  const [busy, setBusy] = useState(false)
  const [assign, setAssign] = useState({})
  const studentsById = Object.fromEntries((cls?.students || []).map((s) => [s.id, s]))
  const expected = progress.students.length - progress.absent.length

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    for (const file of files) {
      const id = `${Date.now()}-${Math.random()}`
      setResults((prev) => [{ id, tone: 'working', text: `Reading ${file.name}…` }, ...prev].slice(0, 8))
      const set = (tone, text) => setResults((prev) => prev.map((r) => (r.id === id ? { id, tone, text } : r)))
      try {
        const { blob, code, problems } = await processPhoto(file)
        const key = `page-${exam.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        if (code && code.examId !== exam.id) {
          set('warn', 'This page belongs to a different exam. It was not added.')
          continue
        }
        await putPage(key, blob)
        const student = code && studentsById[code.studentId]
        if (student) {
          addPage(exam.id, { studentId: student.id, page: code.page, key, problems })
          set(problems.length ? 'warn' : 'ok', `${student.name} · page ${code.page} of ${code.total}${problems.length ? ` · ${problems.join(' and ')}, retake it` : ''}`)
        } else {
          addUnassigned(exam.id, { key, reason: code ? 'This student isn’t in the class list.' : 'The code couldn’t be read.' })
          set('warn', 'Couldn’t read the code. Choose the student below.')
        }
      } catch (error) {
        set('warn', error.message || 'This photo couldn’t be read.')
      }
    }
    setBusy(false)
  }

  const assignPage = (item) => {
    const choice = assign[item.id] || {}
    if (!choice.studentId || !choice.page) return
    addPage(exam.id, { studentId: choice.studentId, page: Number(choice.page), key: item.key }, 'Assigned by teacher')
    removeUnassigned(exam.id, item.id)
  }

  const discard = (item) => {
    deletePage(item.key).catch(() => {})
    removeUnassigned(exam.id, item.id)
  }

  const resultTone = { ok: 'text-[var(--vscode-green)]', warn: 'text-[var(--vscode-orange)]', working: 'text-[var(--sky-subtle)]' }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-6 items-start">
      <div className="space-y-6 min-w-0">
        <Panel title="Photograph the scripts">
          <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
            Take a photo of each page, in any order. Domax reads the code on the page and files it under the right student.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <label className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full bg-[var(--action-accent)] text-white text-[15px] font-semibold cursor-pointer ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              {busy ? 'Reading photos…' : 'Take photos'}
              <input type="file" accept="image/*" capture="environment" multiple className="sr-only" onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }} />
            </label>
            <label className={`inline-flex items-center justify-center min-h-12 px-6 rounded-full border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[var(--sky-text)] text-[15px] font-semibold cursor-pointer ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
              Choose photos
              <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }} />
            </label>
          </div>
          {results.length > 0 && (
            <ul className="mt-5 space-y-1.5" aria-live="polite">
              {results.map((r) => (
                <li key={r.id} className={`text-sm ${resultTone[r.tone]}`}>
                  {r.tone === 'ok' ? '✓ ' : r.tone === 'warn' ? '! ' : ''}
                  {r.text}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 text-xs text-[var(--sky-subtle)]">
            Photos are kept on this device, so this works without internet. In this prototype nothing is uploaded yet.
          </p>
        </Panel>

        {exam.unassigned?.length > 0 && (
          <Panel title={`Choose the student (${exam.unassigned.length})`}>
            <p className="text-sm text-[var(--sky-subtle)] mb-4">Domax couldn’t read the code on these pages, so it won’t guess. Look at each one and choose.</p>
            <ul className="space-y-5">
              {exam.unassigned.map((item) => (
                <li key={item.id} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-4">
                  <ScriptPage page={{ kind: 'photo', key: item.key, page: '?' }} />
                  <div className="space-y-2.5 min-w-0">
                    <p className="text-sm text-[var(--sky-subtle)]">{item.reason}</p>
                    <select
                      aria-label="Student"
                      className={fieldClass}
                      value={assign[item.id]?.studentId || ''}
                      onChange={(e) => setAssign({ ...assign, [item.id]: { ...assign[item.id], studentId: e.target.value } })}
                    >
                      <option value="">Whose page is this?</option>
                      {(cls?.students || []).map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    <select
                      aria-label="Page number"
                      className={fieldClass}
                      value={assign[item.id]?.page || ''}
                      onChange={(e) => setAssign({ ...assign, [item.id]: { ...assign[item.id], page: e.target.value } })}
                    >
                      <option value="">Which page?</option>
                      {Array.from({ length: exam.pagesPerScript }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Page {i + 1} of {exam.pagesPerScript}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <Button size="md" onClick={() => assignPage(item)} disabled={!assign[item.id]?.studentId || !assign[item.id]?.page}>
                        Save
                      </Button>
                      <Button size="md" variant="ghost" onClick={() => discard(item)}>
                        Discard photo
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </div>

      <div className="space-y-6 min-w-0">
        <Panel>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[var(--sky-subtle)] mb-2">Collected</p>
              <Big value={progress.collected.length} of={expected} />
            </div>
            <div>
              <p className="text-sm text-[var(--sky-subtle)] mb-2">Pages to fix</p>
              <Big value={progress.incomplete.length + progress.retakes.length} tone={progress.incomplete.length + progress.retakes.length ? 'warn' : ''} />
            </div>
          </div>
        </Panel>

        <Panel title={`Missing (${progress.missing.length})`}>
          {progress.missing.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-[var(--sky-subtle)]"><TickMark className="w-4 h-4" /> Everyone’s script is in.</p>
          ) : (
            <ul className="space-y-1.5">
              {progress.missing.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 rounded-lg bg-[var(--sky-surface)] px-3 py-2">
                  <span className="text-[15px]">{s.name}</span>
                  <Button size="xs" variant="secondary" onClick={() => setAbsent(exam.id, s.id, true)}>Absent</Button>
                </li>
              ))}
            </ul>
          )}
          {progress.absent.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-[var(--sky-subtle)] mb-1.5">Absent</p>
              <ul className="space-y-1">
                {progress.absent.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                    <span>{s.name}</span>
                    <button type="button" className="text-[var(--action-accent)] hover:underline" onClick={() => setAbsent(exam.id, s.id, false)}>Undo</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>

        {(progress.incomplete.length > 0 || progress.retakes.length > 0) && (
          <Panel title="Pages to fix">
            <ul className="space-y-2 text-[15px]">
              {progress.incomplete.map(({ student, lacking }) => (
                <li key={student.id}>
                  <span className="font-medium">{student.name}</span>
                  <span className="text-[var(--sky-subtle)]"> · page {lacking.join(', ')} missing</span>
                </li>
              ))}
              {progress.retakes.map(({ student, page, problems }) => (
                <li key={`${student.id}-${page}`} className="flex flex-wrap items-center justify-between gap-2">
                  <span>
                    <span className="font-medium">{student.name}</span>
                    <span className="text-[var(--sky-subtle)]"> · page {page} {problems.join(' and ')}</span>
                  </span>
                  <button type="button" className="text-sm text-[var(--action-accent)] hover:underline" onClick={() => keepPage(exam.id, student.id, page)}>
                    It’s readable
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--sky-subtle)] mt-3">To fix a page, photograph it again. The new photo replaces the old one.</p>
          </Panel>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 3: Mark                                                         */
/* ------------------------------------------------------------------ */
export function MarkStep({ exam, progress }) {
  const next = progress.perQuestion.find((row) => row.done < row.total)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6 items-start">
      <Panel title="Questions">
        {progress.collected.length === 0 ? (
          <p className="text-[15px] text-[var(--sky-subtle)]">Collect the scripts first. Marking starts once they’re in.</p>
        ) : (
          <ul className="divide-y divide-[var(--sky-panel-border)]">
            {progress.perQuestion.map(({ question, done, total }) => (
              <li key={question.id} className="py-3.5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 items-center">
                <div className="min-w-0">
                  <p className="text-[15px] font-medium truncate">
                    <span className="text-[var(--sky-subtle)] tabular-nums mr-2">Q{question.number}</span>
                    {question.title}
                  </p>
                  <ProgressBar value={done} max={total} tone={done === total ? 'positive' : 'info'} label={`Question ${question.number} progress`} className="mt-2" />
                </div>
                <Link
                  href={`/dashboard/exams/${exam.id}/mark?q=${question.id}`}
                  className="text-sm font-semibold text-[var(--action-accent)] hover:underline whitespace-nowrap"
                >
                  {done === total ? `Done · ${done}/${total}` : `${done}/${total} · Mark`}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Marking room">
        <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
          You mark one question for the whole class, then the next. Names are hidden while you mark. Everything saves as you go.
        </p>
        <div className="mt-5">
          <Button href={`/dashboard/exams/${exam.id}/mark${next ? `?q=${next.question.id}` : ''}`} size="lg" className="w-full" disabled={progress.collected.length === 0}>
            {progress.marksDone ? 'Continue marking' : 'Start marking'}
          </Button>
        </div>
        <p className="text-sm text-[var(--sky-subtle)] mt-3 tabular-nums">
          {progress.marksDone} of {progress.marksNeeded} marks given
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Step 4: Release & record                                             */
/* ------------------------------------------------------------------ */
export function ReleaseStep({ exam, cls, progress }) {
  const { release, findRubric } = useWorkspace()
  const [confirming, setConfirming] = useState(false)
  const [sent, setSent] = useState(null)
  const [sending, setSending] = useState(false)

  // Only ever runs for an exam the teacher has released.
  const sendToPortal = async (releasedExam) => {
    setSending(true)
    const result = await portal.pushResults(cls, releasedExam, findRubric(exam.rubricId))
    setSending(false)
    if (result.ok) setSent({ tone: 'positive', text: `${result.data.saved} students can now see their results in the student portal.` })
    else if (result.status === 409) setSent({ tone: 'caution', text: result.error, href: `/dashboard/classes/${cls.id}`, link: 'Open the class' })
    else if (result.status === 401) setSent({ tone: 'caution', text: result.error, href: '/login', link: 'Sign in' })
    else setSent({ tone: 'caution', text: result.error })
  }
  const [previewId, setPreviewId] = useState(progress.collected[0]?.id || '')
  const preview = progress.collected.find((s) => s.id === previewId)
  const allMarked = progress.marksNeeded > 0 && progress.marksDone === progress.marksNeeded
  const consentOk = !cls?.under16 || Boolean(cls?.consent)
  const canRelease = allMarked && consentOk && progress.missing.length === 0 && !exam.releasedAt
  const totalFor = (studentId) => progress.questions.reduce((sum, q) => sum + Number(exam.marks?.[studentId]?.[q.id] ?? 0), 0)

  const exportSheet = () => {
    downloadCsv(`${exam.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-marks.csv`, [
      ['Student', 'CAMIS ID', 'Urubuto ID', 'Registration no.', ...progress.questions.map((q) => `Q${q.number} (${q.marks})`), `Total (${progress.totalMarks})`, 'Status'],
      ...progress.students.map((s) => {
        const absent = exam.scripts?.[s.id]?.status === 'absent'
        return [
          s.name, s.ids?.camis, s.ids?.urubuto, s.ids?.regNo,
          ...progress.questions.map((q) => (absent ? '' : exam.marks?.[s.id]?.[q.id] ?? '')),
          absent ? '' : totalFor(s.id),
          absent ? 'Absent' : 'Marked',
        ]
      }),
    ])
  }

  const checks = [
    { ok: progress.missing.length === 0, text: progress.missing.length ? `${plural(progress.missing.length, 'script')} still missing` : 'Every script is in or marked absent' },
    { ok: allMarked, text: allMarked ? `All ${plural(progress.collected.length, 'script')} marked by you` : `${progress.marksNeeded - progress.marksDone} marks still to give` },
    ...(cls?.under16 ? [{ ok: consentOk, text: consentOk ? 'Consent recorded for this class' : 'Students are under 16: record consent first', href: `/dashboard/classes/${cls.id}` }] : []),
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6 items-start">
      <div className="space-y-6 min-w-0">
        {exam.releasedAt ? (
          <section className="ws-feature rounded-2xl p-6 sm:p-7">
            <p className="text-[13px] font-semibold text-[#8db8ff]">Released</p>
            <p className="mt-2 text-2xl font-semibold text-white">Results released on {formatDate(exam.releasedAt)}</p>
            <p className="mt-2 text-[15px] text-white/65">Released by you. Every mark was given by a teacher.</p>
            <div className="mt-5">
              <Button size="md" variant="secondary" onClick={() => sendToPortal(exam)} disabled={sending}>
                {sending ? 'Sending…' : sent?.tone === 'positive' ? 'Send again' : 'Send to the student portal'}
              </Button>
            </div>
            {sent && (
              <p className={`mt-3 text-sm ${sent.tone === 'positive' ? 'text-white' : 'text-[#ffd8a8]'}`}>
                {sent.text} {sent.href && <Link href={sent.href} className="font-semibold underline">{sent.link}</Link>}
              </p>
            )}
          </section>
        ) : (
          <Panel title="Before you release">
            <ul className="space-y-2">
              {checks.map((c) => (
                <li key={c.text} className="flex items-center gap-3 rounded-lg bg-[var(--sky-surface)] px-3.5 py-2.5 text-[15px]">
                  {c.ok ? <TickMark className="w-5 h-5 flex-shrink-0" /> : <span aria-hidden="true" className="w-5 h-5 rounded-full border-2 border-[var(--vscode-orange)] flex-shrink-0" />}
                  <span className="flex-1">{c.text}</span>
                  {!c.ok && c.href && <Link href={c.href} className="text-sm font-semibold text-[var(--action-accent)] hover:underline">Fix</Link>}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button size="lg" onClick={() => setConfirming(true)} disabled={!canRelease}>
                Release results to {plural(progress.collected.length, 'student')}
              </Button>
            </div>
          </Panel>
        )}

        <Panel title="Record the marks">
          <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
            A mark sheet with every student’s IDs, so it lines up with the school’s other systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="md" onClick={exportSheet} disabled={!allMarked}>Mark sheet (Excel)</Button>
            <Button size="md" variant="secondary" disabled title="Needs a sample CAMIS file from a school so the layout matches exactly">File for CAMIS</Button>
            <Button size="md" variant="secondary" disabled title="Needs a sample Urubuto import sheet so the layout matches exactly">File for Urubuto</Button>
          </div>
          <p className="text-xs text-[var(--sky-subtle)] mt-3">CAMIS and Urubuto files arrive once we have a sample of each format from a school.</p>
        </Panel>
      </div>

      <Panel title="What a student sees">
        {progress.collected.length === 0 ? (
          <p className="text-sm text-[var(--sky-subtle)]">No scripts yet.</p>
        ) : (
          <>
            <select aria-label="Preview for student" className={fieldClass} value={previewId} onChange={(e) => setPreviewId(e.target.value)}>
              {progress.collected.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {preview && (
              <div className="mt-4 rounded-2xl border border-[var(--sky-panel-border)] p-4">
                <p className="text-xs text-[var(--sky-subtle)]">{exam.title}</p>
                <p className="mt-2 font-headline text-4xl font-semibold tracking-[-0.04em] tabular-nums">
                  {totalFor(preview.id)}
                  <span className="text-lg text-[var(--sky-subtle)] font-medium tracking-normal"> / {progress.totalMarks}</span>
                </p>
                <ul className="mt-3 space-y-1 text-sm">
                  {progress.questions.map((q) => (
                    <li key={q.id} className="flex justify-between gap-3 rounded-md bg-[var(--sky-surface)] px-2.5 py-1.5">
                      <span className="truncate">Q{q.number} · {q.title}</span>
                      <span className="tabular-nums font-medium">{exam.marks?.[preview.id]?.[q.id] ?? '–'}/{q.marks}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--sky-subtle)] mt-3">Free for the student. They can ask their teacher for a remark.</p>
              </div>
            )}
          </>
        )}
      </Panel>

      <ConfirmDialog
        open={confirming}
        title={`Release results to ${plural(progress.collected.length, 'student')}?`}
        confirmLabel="Release results"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          release(exam.id)
          setConfirming(false)
          sendToPortal({ ...exam, releasedAt: new Date().toISOString() })
        }}
      >
        Students will see their marks in the student portal if you have shared the class code. Released results can’t be taken back, but a student can still ask for a remark.
      </ConfirmDialog>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Activity: the exam's permanent record                                */
/* ------------------------------------------------------------------ */
export function ExamActivity({ exam, cls }) {
  const { log } = useWorkspace()
  const [open, setOpen] = useState(false)
  const names = Object.fromEntries((cls?.students || []).map((s) => [s.id, s.name]))
  const entries = log.filter((entry) => entry.examId === exam.id).slice().reverse()
  const shown = open ? entries : entries.slice(0, 5)
  return (
    <Panel
      title="Activity"
      actions={entries.length > 5 && (
        <button type="button" className="text-sm font-semibold text-[var(--action-accent)] hover:underline" onClick={() => setOpen(!open)}>
          {open ? 'Show less' : `Show all ${entries.length}`}
        </button>
      )}
    >
      {entries.length === 0 ? (
        <p className="text-sm text-[var(--sky-subtle)]">Nothing yet.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {shown.map((entry) => (
            <li key={entry.id} className="flex flex-wrap justify-between gap-x-4">
              <span>
                <span className="font-medium">{entry.action}</span>
                {entry.studentId && names[entry.studentId] && <span className="text-[var(--sky-subtle)]"> · {names[entry.studentId]}</span>}
                {entry.detail && <span className="text-[var(--sky-subtle)]"> · {entry.detail}</span>}
              </span>
              <span className="text-[var(--sky-subtle)] tabular-nums">{new Date(entry.at).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-[var(--sky-subtle)] mt-4">This record can’t be edited.</p>
    </Panel>
  )
}
