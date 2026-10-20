'use client'

import { useMemo, useState } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Notice, Panel, ProgressBar, StatGroup, StatusPill, downloadCsv, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'
import { analyseAllClasses, focusAdvice, percent } from '@/lib/analytics'
import { assistant } from '@/lib/aiClient'
import { portal } from '@/lib/portalClient'
import Link from 'next/link'

const slug = (text) => text.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

function adviceText(student, analysis, advice) {
  const first = student.name.split(' ').pop()
  const lines = [`Hello ${first},`, `You scored ${Math.round(advice.pct)}% in ${analysis.exam.title}${advice.passed ? '' : `, which is below the ${analysis.pass}% pass mark`}.`]
  if (advice.strong.length) lines.push(`You did well on: ${advice.strong.join('; ')}.`)
  if (advice.focus.length) {
    lines.push('To improve, spend time on:')
    advice.focus.forEach((f) => lines.push(`- ${f.title} (you got ${f.got} of ${f.max}${f.classPct === null ? '' : `, the class average was ${f.classPct}%`})`))
  } else {
    lines.push('Keep going: no topic stood out as weak in this exam.')
  }
  return lines.join('\n')
}

function resultPill(row, pass) {
  if (row.absent) return <StatusPill>Absent</StatusPill>
  if (!row.collected) return <StatusPill>No script</StatusPill>
  if (!row.complete) return <StatusPill tone="info">Marking · {row.markedCount}</StatusPill>
  return row.passed ? <StatusPill tone="positive">Pass</StatusPill> : <StatusPill tone="caution">Below {pass}%</StatusPill>
}

function Trend({ history, examId }) {
  const index = history.findIndex((h) => h.examId === examId)
  if (index < 1) return <span className="text-[var(--sky-subtle)]">–</span>
  const diff = Math.round(history[index].pct - history[index - 1].pct)
  if (diff === 0) return <span className="text-[var(--sky-subtle)]">Same</span>
  return <span className={diff > 0 ? 'text-[var(--vscode-green)]' : 'text-[var(--vscode-orange)]'}>{diff > 0 ? `▲ ${diff}` : `▼ ${Math.abs(diff)}`}</span>
}

export default function ResultsPage() {
  const { classes, exams, rubrics, loaded } = useWorkspace()
  const all = useMemo(() => analyseAllClasses(classes, exams, rubrics), [classes, exams, rubrics])
  const withResults = all.filter((c) => c.analyses.length > 0)

  const [classId, setClassId] = useState('')
  const [examId, setExamId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [note, setNote] = useState(null)
  const [drafts, setDrafts] = useState({})
  const [working, setWorking] = useState(false)

  const current = withResults.find((c) => c.cls.id === classId) || withResults[0]
  const analysis = current?.analyses.find((a) => a.exam.id === examId) || current?.analyses[current.analyses.length - 1]
  const selected = analysis?.rows.find((r) => r.student.id === studentId)
  const selectedClassRow = current?.students.find((s) => s.student.id === studentId)
  const advice = selected?.complete ? focusAdvice(analysis, selected.student.id) : null

  if (!loaded) return null

  if (!withResults.length) {
    return (
      <div className="space-y-6">
        <WorkspaceHeader title="Results" subtitle="How each class and student is doing, worked out from the marks you have given." />
        <EmptyState
          title="No finished marking yet"
          body="Results appear here once every question on at least one script has your mark. Absent students are never counted as zero."
          action={<Button href="/dashboard/exams">Go to exams</Button>}
        />
      </div>
    )
  }

  const hardest = [...analysis.perQuestion].filter((q) => q.avgPct !== null).sort((a, b) => a.avgPct - b.avgPct)[0]
  const needSupport = analysis.complete.filter((r) => !r.passed)

  const exportAnalysis = () => {
    downloadCsv(`${slug(analysis.exam.title)}-results.csv`, [
      ['Student', 'Total', `Out of`, 'Percent', 'Result', ...analysis.questions.map((q) => `Q${q.number} (${q.marks})`)],
      ...analysis.rows.map((r) => [
        r.student.name,
        r.complete ? r.total : '',
        analysis.totalMarks,
        r.complete ? Math.round(r.pct) : '',
        r.absent ? 'Absent' : !r.collected ? 'No script' : !r.complete ? 'Marking' : r.passed ? 'Pass' : 'Below pass mark',
        ...analysis.questions.map((q) => (r.complete ? r.marks[q.id] ?? '' : '')),
      ]),
    ])
  }

  const draftKey = selected ? `${analysis.exam.id}:${selected.student.id}` : ''
  const message = advice ? drafts[draftKey] ?? adviceText(selected.student, analysis, advice) : ''
  const setMessage = (text) => setDrafts((prev) => ({ ...prev, [draftKey]: text }))

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setNote({ tone: 'positive', text: 'Message copied. Paste it into email, WhatsApp or SMS.' })
    } catch {
      setNote({ tone: 'caution', text: 'Your browser blocked copying.' })
    }
  }

  const improveWording = async () => {
    setWorking(true)
    const result = await assistant.advice({
      examTitle: analysis.exam.title,
      pct: advice.pct,
      passMark: analysis.pass,
      focus: advice.focus,
      strong: advice.strong,
    })
    setWorking(false)
    if (!result.ok) {
      setNote({ tone: 'caution', text: result.status === 503 ? 'The marking assistant is off, so your own wording stays. See Settings to turn it on.' : result.error })
      return
    }
    const first = selected.student.name.split(' ').pop()
    setMessage([`Hello ${first},`, result.data.summary, ...(result.data.tips.length ? ['', ...result.data.tips.map((t) => `- ${t}`)] : [])].join('\n'))
    setNote({ tone: 'info', text: 'Reworded by the assistant. Read it and change anything before you send.' })
  }

  const sendMessage = async () => {
    setWorking(true)
    const result = await portal.sendMessage({ classId: current.cls.id, studentId: selected.student.id, subject: `Your result in ${analysis.exam.title}`, body: message })
    setWorking(false)
    if (result.ok) setNote({ tone: 'positive', text: `Sent to ${selected.student.name}. They see it after entering their ID number in the student portal.` })
    else if (result.status === 409) setNote({ tone: 'caution', text: 'Create the class code first so students can receive messages.', href: `/dashboard/classes/${current.cls.id}` })
    else setNote({ tone: 'caution', text: result.error, href: result.status === 401 ? '/login' : null })
  }

  // How often the teacher kept the assistant's suggestions on this exam.
  const suggestions = Object.entries(analysis.exam.ai || {}).flatMap(([studentId, byQuestion]) =>
    Object.entries(byQuestion).map(([questionId, s]) => ({ final: analysis.exam.marks?.[studentId]?.[questionId], suggested: s.score })).filter((x) => x.final !== undefined)
  )
  const kept = suggestions.filter((x) => Math.abs(x.final - x.suggested) < 0.01).length
  const avgGap = suggestions.length ? suggestions.reduce((sum, x) => sum + Math.abs(x.final - x.suggested), 0) / suggestions.length : 0

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        title="Results"
        subtitle="How each class and student is doing, worked out from the marks you have given."
        actions={<Button variant="secondary" size="sm" onClick={exportAnalysis}>Download as spreadsheet</Button>}
      />

      <Panel title="Classes compared" meta="Average across finished exams">
        <div className="overflow-x-auto">
          <table className="w-full sm:min-w-[520px] text-left text-[15px]">
            <thead className="text-xs text-[var(--sky-subtle)]">
              <tr>
                <th className="pb-2 font-medium">Class</th>
                <th className="hidden sm:table-cell pb-2 font-medium">Exams</th>
                <th className="hidden sm:table-cell pb-2 font-medium">Scripts</th>
                <th className="pb-2 font-medium w-[32%]">Average</th>
                <th className="pb-2 font-medium text-right">Pass rate</th>
              </tr>
            </thead>
            <tbody>
              {[...withResults].sort((a, b) => b.mean - a.mean).map((c) => (
                <tr key={c.cls.id} className="border-t border-[var(--sky-panel-border)]">
                  <td className="py-3 pr-3">
                    <button type="button" className="font-medium text-[var(--sky-text)] hover:underline" onClick={() => { setClassId(c.cls.id); setExamId(''); setStudentId('') }}>
                      {c.cls.name}
                    </button>
                  </td>
                  <td className="hidden sm:table-cell py-3 pr-3 tabular-nums">{c.analyses.length}</td>
                  <td className="hidden sm:table-cell py-3 pr-3 tabular-nums">{c.scripts}</td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={c.mean} max={100} tone={c.mean >= 50 ? 'positive' : 'caution'} label={`${c.cls.name} average`} />
                      <span className="w-10 text-right tabular-nums">{percent(c.mean)}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right tabular-nums">{percent(c.passRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {all.length > withResults.length && (
          <p className="mt-3 text-xs text-[var(--sky-subtle)]">
            Not shown yet (no finished marking): {all.filter((c) => !c.analyses.length).map((c) => c.cls.name).join(', ')}.
          </p>
        )}
      </Panel>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="res-class" className={labelClass}>Class</label>
          <select id="res-class" className={`${fieldClass} !w-auto`} value={current.cls.id} onChange={(e) => { setClassId(e.target.value); setExamId(''); setStudentId('') }}>
            {withResults.map((c) => <option key={c.cls.id} value={c.cls.id}>{c.cls.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="res-exam" className={labelClass}>Exam</label>
          <select id="res-exam" className={`${fieldClass} !w-auto`} value={analysis.exam.id} onChange={(e) => { setExamId(e.target.value); setStudentId('') }}>
            {current.analyses.map((a) => <option key={a.exam.id} value={a.exam.id}>{a.exam.title}</option>)}
          </select>
        </div>
      </div>

      <StatGroup
        items={[
          { label: 'Class average', value: percent(analysis.stats.mean), hint: `Median ${percent(analysis.stats.median)}` },
          { label: 'Pass rate', value: percent(analysis.stats.passRate), hint: `Pass mark ${analysis.pass}%`, tone: analysis.stats.passRate !== null && analysis.stats.passRate < 50 ? 'caution' : undefined },
          { label: 'Highest · lowest', value: `${percent(analysis.stats.highest)} · ${percent(analysis.stats.lowest)}` },
          { label: 'Counted', value: `${analysis.stats.n} of ${analysis.rows.length}`, hint: [analysis.inProgress && `${analysis.inProgress} still marking`, analysis.absent && `${analysis.absent} absent`].filter(Boolean).join(' · ') || 'Every script marked' },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Panel title="Spread of scores">
          <ul className="space-y-3">
            {analysis.bands.map((band) => (
              <li key={band.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{band.label}</span>
                  <span className="tabular-nums text-[var(--sky-subtle)]">{band.count} {band.count === 1 ? 'student' : 'students'}</span>
                </div>
                <ProgressBar value={band.count} max={analysis.stats.n || 1} tone={band.min >= analysis.pass ? 'positive' : band.max <= analysis.pass ? 'caution' : 'info'} label={`${band.label}: ${band.count}`} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Question by question" meta="Average score on each question">
          <ul className="space-y-3">
            {analysis.perQuestion.map(({ question, avgPct, zero }) => (
              <li key={question.id}>
                <div className="flex justify-between gap-3 text-sm mb-1">
                  <span className="truncate">Q{question.number} · {question.title}</span>
                  <span className="tabular-nums whitespace-nowrap text-[var(--sky-subtle)]">{percent(avgPct)}{zero ? ` · ${zero} got 0` : ''}</span>
                </div>
                <ProgressBar value={avgPct ?? 0} max={100} tone={avgPct !== null && avgPct < 50 ? 'caution' : 'info'} label={`Question ${question.number} average`} />
              </li>
            ))}
          </ul>
          {hardest && hardest.avgPct < 60 && (
            <p className="mt-4 text-sm text-[var(--sky-subtle)]">
              Hardest for this class: <strong className="text-[var(--sky-text)]">Q{hardest.question.number}</strong> ({percent(hardest.avgPct)}). It may be worth re-teaching.
            </p>
          )}
        </Panel>
      </div>

      {needSupport.length > 0 && (
        <Panel title="Needs support" meta={`Below ${analysis.pass}%`}>
          <ul className="flex flex-wrap gap-2">
            {needSupport.map((r) => (
              <li key={r.student.id}>
                <button type="button" onClick={() => setStudentId(r.student.id)} className="rounded-full border border-[var(--sky-panel-border)] px-3 py-1.5 text-sm hover:border-[var(--action-accent)]">
                  {r.student.name} · {Math.round(r.pct)}%
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_22rem] gap-6 items-start">
        <Panel title="Students" bodyClassName="!px-0 !pb-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[15px]">
              <thead className="text-xs text-[var(--sky-subtle)]">
                <tr>
                  <th className="px-5 pb-2 font-medium">Student</th>
                  <th className="pb-2 font-medium text-right">Score</th>
                  <th className="pb-2 font-medium text-right">%</th>
                  <th className="pb-2 pl-4 font-medium">Result</th>
                  <th className="px-5 pb-2 font-medium text-right">Since last exam</th>
                </tr>
              </thead>
              <tbody>
                {[...analysis.rows].sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1)).map((r) => {
                  const history = current.students.find((s) => s.student.id === r.student.id)?.history || []
                  return (
                    <tr key={r.student.id} className={`border-t border-[var(--sky-panel-border)] ${r.student.id === studentId ? 'bg-[var(--action-accent-soft)]' : ''}`}>
                      <td className="px-5 py-2.5">
                        <button type="button" className="text-left font-medium hover:underline" onClick={() => setStudentId(r.student.id)}>{r.student.name}</button>
                      </td>
                      <td className="py-2.5 text-right tabular-nums">{r.complete ? `${r.total}/${analysis.totalMarks}` : '–'}</td>
                      <td className="py-2.5 text-right tabular-nums">{r.complete ? Math.round(r.pct) : '–'}</td>
                      <td className="py-2.5 pl-4">{resultPill(r, analysis.pass)}</td>
                      <td className="px-5 py-2.5 text-right tabular-nums"><Trend history={history} examId={analysis.exam.id} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={selected ? selected.student.name : 'A student'} meta="Where to focus">
          {!selected ? (
            <p className="text-sm text-[var(--sky-subtle)]">Choose a student to see how they did and where to focus.</p>
          ) : !advice ? (
            <p className="text-sm text-[var(--sky-subtle)]">Advice appears once every question on this script has your mark.</p>
          ) : (
            <div className="space-y-4">
              <p className="font-headline text-4xl font-semibold tracking-[-0.04em] tabular-nums">
                {Math.round(advice.pct)}%
                <span className="ml-2 text-base font-medium tracking-normal text-[var(--sky-subtle)]">{advice.passed ? 'Pass' : `Below ${analysis.pass}%`}</span>
              </p>
              {advice.strong.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[var(--sky-subtle)] mb-1">Doing well</p>
                  <ul className="text-sm list-disc pl-5">{advice.strong.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-[var(--sky-subtle)] mb-1">Focus on</p>
                {advice.focus.length ? (
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {advice.focus.map((f) => (
                      <li key={f.title}>{f.title} <span className="text-[var(--sky-subtle)]">· {f.got}/{f.max}{f.classPct === null ? '' : `, class ${f.classPct}%`}</span></li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--sky-subtle)]">Nothing stands out as weak in this exam.</p>
                )}
              </div>
              {selectedClassRow?.history.length > 1 && (
                <div>
                  <p className="text-xs font-semibold text-[var(--sky-subtle)] mb-1">Across exams</p>
                  <ul className="text-sm space-y-1">
                    {selectedClassRow.history.map((h) => (
                      <li key={h.examId} className="flex justify-between gap-3"><span className="truncate">{h.title}</span><span className="tabular-nums">{Math.round(h.pct)}%</span></li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <label htmlFor="student-message" className="block text-xs font-semibold text-[var(--sky-subtle)] mb-1">Message to this student</label>
                <textarea id="student-message" rows={9} className={`${fieldClass} !h-auto py-2.5 text-sm`} value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button size="sm" onClick={sendMessage} disabled={working || !message.trim()}>Send in Domax</Button>
                  <Button size="sm" variant="secondary" onClick={copyMessage}>Copy</Button>
                  <Button size="sm" variant="secondary" onClick={improveWording} disabled={working}>{working ? 'Working…' : 'Improve wording'}</Button>
                </div>
              </div>
              {note && (
                <Notice tone={note.tone} onDismiss={() => setNote(null)}>
                  {note.text} {note.href && <Link href={note.href} className="font-semibold underline">Open</Link>}
                </Notice>
              )}
            </div>
          )}
        </Panel>
      </div>

      {suggestions.length > 0 && (
        <Panel title="Marking assistant check" meta={analysis.exam.title}>
          <p className="text-[15px]">
            The assistant suggested <strong>{suggestions.length}</strong> {suggestions.length === 1 ? 'mark' : 'marks'} on this exam. You kept <strong>{kept}</strong> ({Math.round((kept / suggestions.length) * 100)}%) and changed {suggestions.length - kept}.
            {suggestions.length - kept > 0 && <> On average your mark was {avgGap.toFixed(1)} {avgGap === 1 ? 'mark' : 'marks'} away from its suggestion.</>}
          </p>
          <p className="mt-2 text-xs text-[var(--sky-subtle)]">This is how you can tell whether the assistant is good enough to trust more. It never replaces your mark.</p>
        </Panel>
      )}

      <p className="text-xs text-[var(--sky-subtle)]">
        Only scripts where every question has your mark are counted. Advice names the questions where a student scored well below the class; it never changes a mark.
      </p>
    </div>
  )
}
