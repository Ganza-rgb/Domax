'use client'

import { useEffect, useState } from 'react'
import { Panel, StatusPill } from '@/components/dashboard/ui'
import { assistant } from '@/lib/aiClient'

/** Whether the marking assistant is set up, and how to turn it on. Never shows secrets. */
export default function AssistantStatus() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    assistant.status().then((r) => !cancelled && setStatus(r.ok ? r.data : { error: r.error, needsSignIn: r.status === 401 }))
    return () => {
      cancelled = true
    }
  }, [])

  const on = status?.enabled && status?.available
  return (
    <Panel id="assistant" title="Marking assistant" meta="Optional" actions={status && (on ? <StatusPill tone="positive">On</StatusPill> : <StatusPill tone={status.enabled ? 'caution' : 'neutral'}>{status.enabled ? 'Not running' : 'Off'}</StatusPill>)}>
      <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
        Suggests a mark for one answer when you ask, with its reasons. It reads your memo and notes. It never saves a mark: yours is the one that counts, and every suggestion is recorded next to your final mark.
      </p>
      {!status ? null : status.error ? (
        <p className="mt-3 text-sm text-[var(--sky-subtle)]">{status.needsSignIn ? 'Sign in to see the assistant’s status.' : status.error}</p>
      ) : on ? (
        <p className="mt-3 text-sm">Using <strong>{status.model}</strong> at {status.address}. {status.local ? 'Running on this computer or your network: student work does not leave it.' : 'Running on a remote address you have allowed.'}</p>
      ) : status.enabled ? (
        <p className="mt-3 text-sm text-[var(--vscode-orange)]">Set to use {status.model}, but nothing answers at {status.address}. Start your model server.</p>
      ) : (
        <div className="mt-3 text-sm text-[var(--sky-subtle)] space-y-2">
          <p>{status.reason}</p>
          <p>To turn it on: run a local model server (for example Ollama or LM Studio), then add these lines to <code>.env.local</code> and restart Domax:</p>
          <pre className="overflow-x-auto rounded-lg bg-[var(--sky-surface)] p-3 text-xs">{`AI_BASE_URL=http://localhost:11434/v1\nAI_MODEL=<the model name your server shows>`}</pre>
          <p>Reading handwriting from photos needs a model that can see images. Typed answers work with any text model. Student work is only ever sent to this computer or your own network.</p>
        </div>
      )}
    </Panel>
  )
}
