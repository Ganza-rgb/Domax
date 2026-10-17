'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { assistant } from '@/lib/aiClient'
import { useWorkspace } from '@/states/useWorkspaceState'

let statusRequest = null
const loadStatus = () => (statusRequest ||= assistant.status().then((r) => (r.ok ? r.data : { enabled: false, unreachable: true })))

const sureness = (c) => (c >= 0.75 ? 'Fairly sure' : c >= 0.45 ? 'Not very sure' : 'Unsure: check carefully')

/**
 * Optional help in the marking room. It runs only when the teacher presses the
 * button, shows its suggestion apart from the teacher's mark, and never saves
 * a mark itself: "Use suggestion" only fills the box, and the teacher still
 * presses Save.
 */
export default function AssistantBox({ exam, question, student, pages, sampleText, onUse }) {
  const { recordSuggestion } = useWorkspace()
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const suggestion = exam.ai?.[student.id]?.[question.id]

  useEffect(() => {
    let cancelled = false
    loadStatus().then((s) => !cancelled && setStatus(s))
    return () => {
      cancelled = true
    }
  }, [])

  if (!status) return null
  if (question.type === 'diagram') return <p className="text-sm text-[var(--sky-subtle)]">Diagrams are always marked by hand.</p>
  if (!status.enabled) {
    return (
      <p className="text-sm text-[var(--sky-subtle)]">
        Marking assistant is off. <Link href="/dashboard/settings#assistant" className="underline">How to turn it on</Link>
      </p>
    )
  }

  const ask = async () => {
    setBusy(true)
    setError('')
    const result = await assistant.suggest({ exam, question, pages, sampleText })
    setBusy(false)
    if (result.ok) recordSuggestion(exam.id, student.id, question.id, result.data)
    else setError(result.error)
  }

  return (
    <div className="rounded-xl border border-[var(--sky-panel-border)] p-4" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Marking assistant <span className="font-normal text-[var(--sky-subtle)]">· suggestion only</span></p>
        <button type="button" onClick={ask} disabled={busy} className="text-sm font-semibold text-[var(--action-accent)] hover:underline disabled:opacity-50">
          {busy ? 'Reading the answer…' : suggestion ? 'Suggest again' : 'Suggest a mark'}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-[var(--vscode-orange)]">{error}</p>}
      {suggestion && (
        <div className="mt-3 space-y-2 text-[15px]">
          <p>
            <span className="font-headline text-2xl font-semibold tabular-nums">{suggestion.score}</span>
            <span className="text-[var(--sky-subtle)]"> / {question.marks} · {sureness(suggestion.confidence)}</span>
          </p>
          {suggestion.reasoning && <p className="text-[var(--sky-text)]">{suggestion.reasoning}</p>}
          {suggestion.matched?.length > 0 && <p className="text-sm text-[var(--sky-subtle)]"><span className="font-semibold text-[var(--sky-text)]">Earned:</span> {suggestion.matched.join('; ')}</p>}
          {suggestion.missing?.length > 0 && <p className="text-sm text-[var(--sky-subtle)]"><span className="font-semibold text-[var(--sky-text)]">Missing:</span> {suggestion.missing.join('; ')}</p>}
          <button type="button" onClick={() => onUse(suggestion.score)} className="min-h-10 px-4 rounded-full border border-[var(--sky-panel-border)] text-sm font-semibold hover:border-[var(--action-accent)]">
            Use {suggestion.score} as my mark
          </button>
          <p className="text-xs text-[var(--sky-subtle)]">Your mark is the one that counts. You still press Save.</p>
        </div>
      )}
    </div>
  )
}
