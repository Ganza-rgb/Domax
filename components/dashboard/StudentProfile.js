'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WsButton as Button, EmptyState, Notice, Panel, StatGroup } from './ui'

export default function StudentProfile({ student }) {
  const [copied, setCopied] = useState(null)

  if (!student) {
    return (
      <EmptyState
        title="Student not found"
        body="This student isn't on your roster."
        action={
          <Link
            href="/dashboard/students"
            className="inline-flex h-9 items-center rounded-lg bg-[#005ffe] px-3.5 text-sm font-semibold text-white hover:bg-[#0047cc]"
          >
            Back to students
          </Link>
        }
      />
    )
  }

  const shareReport = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied('Link to this report copied to the clipboard.')
    } catch {
      setCopied('Could not access the clipboard. Copy the address bar link instead.')
    }
  }

  const best = student.recentExams.reduce((max, exam) => Math.max(max, exam.score), 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--sky-subtle)]">Last active {student.lastActive}</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled title="Messaging is not available yet">
            Message
          </Button>
          <Button variant="primary" size="sm" onClick={shareReport}>
            Share report
          </Button>
        </div>
      </div>

      {copied && <Notice tone="positive" onDismiss={() => setCopied(null)}>{copied}</Notice>}

      <StatGroup
        items={[
          { label: 'Average score', value: `${student.avgScore}%` },
          { label: 'Trend', value: student.trend, tone: String(student.trend).startsWith('-') ? 'critical' : 'positive' },
          { label: 'Best recent result', value: `${best}%` },
        ]}
      />

      <Panel meta="History" title="Recent exams" bodyClassName="!px-0 !pb-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
              <th scope="col" className="px-5 py-2 font-medium">Exam</th>
              <th scope="col" className="px-3 py-2 font-medium">Date</th>
              <th scope="col" className="px-5 py-2 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sky-panel-border)]">
            {student.recentExams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-5 py-2.5 font-medium text-[var(--sky-text)]">
                  <Link href={`/dashboard/exams/${exam.id}`} className="hover:text-[var(--action-accent)] rounded">
                    {exam.title}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-[var(--sky-subtle)]">{exam.date}</td>
                <td className="px-5 py-2.5 text-right font-semibold tabular-nums text-[var(--sky-text)]">{exam.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}
