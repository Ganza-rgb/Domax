'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ProgressBar, Segmented, WsButton as Button, fieldClass, labelClass } from '@/components/dashboard/ui'

/*
 * What a student sees. The shared class code opens the class: papers and
 * class notices. Results and private messages also need the student's own ID
 * number, which gives a short-lived token kept only in this browser tab.
 */
const KIND_LABEL = { paper: 'Past paper', memo: 'Memo', reference: 'Reference' }
const sizeLabel = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`)
const when = (iso) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
const storage = {
  get: (key) => { try { return window.sessionStorage.getItem(key) } catch { return null } },
  set: (key, value) => { try { window.sessionStorage.setItem(key, value) } catch {} },
  remove: (key) => { try { window.sessionStorage.removeItem(key) } catch {} },
}

async function api(url, { token, body } = {}) {
  try {
    const response = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await response.json().catch(() => ({}))
    return response.ok ? { ok: true, data } : { ok: false, status: response.status, error: data.error || 'Something went wrong. Try again.' }
  } catch {
    return { ok: false, status: 0, error: 'No connection. Check your internet and try again.' }
  }
}

function Card({ children, className = '' }) {
  return <section className={`rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 ${className}`}>{children}</section>
}

function Problem({ children }) {
  return <p role="alert" className="mt-3 text-sm text-[var(--vscode-orange)]">{children}</p>
}

function Results({ me }) {
  if (!me.settings.canSeeResults) return <Card><p className="text-[15px] text-[var(--sky-subtle)]">Your teacher has not turned on results for this class.</p></Card>
  if (!me.results.length) return <Card><p className="text-[15px] text-[var(--sky-subtle)]">No results yet. They appear here after your teacher releases them.</p></Card>
  return (
    <div className="space-y-4">
      {me.results.map((r) => {
        const pct = r.max ? Math.round((r.total / r.max) * 100) : 0
        return (
          <Card key={r.examId}>
            <p className="text-sm text-[var(--sky-subtle)]">{r.title} · {when(r.releasedAt)}</p>
            <p className="mt-2 font-headline text-5xl font-semibold tracking-[-0.04em] tabular-nums">
              {r.total}<span className="text-xl font-medium text-[var(--sky-subtle)] tracking-normal"> / {r.max} · {pct}%</span>
            </p>
            <ul className="mt-4 space-y-2.5">
              {r.items.map((item) => (
                <li key={item.title}>
                  <div className="flex justify-between gap-3 text-sm mb-1"><span className="truncate">{item.title}</span><span className="tabular-nums text-[var(--sky-subtle)]">{item.got}/{item.max}</span></div>
                  <ProgressBar value={item.got} max={item.max || 1} tone={item.max && item.got / item.max < 0.5 ? 'caution' : 'info'} label={item.title} />
                </li>
              ))}
            </ul>
            {r.advice && (r.advice.focus?.length > 0 || r.advice.strong?.length > 0 || r.advice.summary) && (
              <div className="mt-5 rounded-xl bg-[var(--sky-surface)] p-4 text-[15px]">
                <p className="font-semibold">{r.advice.focus?.length ? 'Where to focus' : 'How you did'}</p>
                {r.advice.summary && <p className="mt-1.5 text-[var(--sky-text)]">{r.advice.summary}</p>}
                {r.advice.focus?.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {r.advice.focus.map((f) => <li key={f.title}>{f.title} <span className="text-[var(--sky-subtle)]">({f.got}/{f.max})</span></li>)}
                  </ul>
                )}
                {r.advice.strong?.length > 0 && <p className="mt-3 text-sm text-[var(--sky-subtle)]">You did well on: {r.advice.strong.join('; ')}.</p>}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default function StudentPortal() {
  const [codeInput, setCodeInput] = useState('')
  const [cls, setCls] = useState(null)
  const [problem, setProblem] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState('papers')
  const [token, setToken] = useState(null)
  const [me, setMe] = useState(null)
  const [idInput, setIdInput] = useState('')
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState(false)

  const applyClass = useCallback((result) => {
    if (result.ok) {
      storage.set('domax:student:code', result.data.code)
      setCls(result.data)
      setProblem('')
      const saved = storage.get(`domax:student:token:${result.data.code}`)
      if (saved) setToken(saved)
    } else {
      setCls(null)
      setProblem(result.error)
    }
  }, [])

  // A link like /student?code=ABC123 opens the class straight away.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code') || storage.get('domax:student:code')
    if (!code) return
    api('/api/student/enter', { body: { code } }).then(applyClass)
  }, [applyClass])

  // Load the verified student's own data whenever a token appears.
  useEffect(() => {
    if (!token) return undefined
    let cancelled = false
    api('/api/student/me', { token }).then((result) => {
      if (cancelled) return
      if (result.ok) setMe(result.data)
      else {
        storage.remove(`domax:student:token:${cls?.code}`)
        setToken(null)
        setMe(null)
      }
    })
    return () => {
      cancelled = true
    }
  }, [token, cls?.code])

  const openClass = async (event) => {
    event.preventDefault()
    setBusy(true)
    applyClass(await api('/api/student/enter', { body: { code: codeInput } }))
    setBusy(false)
  }

  const verify = async (event) => {
    event.preventDefault()
    setBusy(true)
    const result = await api('/api/student/verify', { body: { code: cls.code, idNumber: idInput } })
    setBusy(false)
    if (!result.ok) return setProblem(result.error)
    setProblem('')
    setIdInput('')
    storage.set(`domax:student:token:${cls.code}`, result.data.token)
    setToken(result.data.token)
  }

  const ask = async (event) => {
    event.preventDefault()
    setBusy(true)
    const result = await api('/api/student/ask', { token, body: { body: question } })
    setBusy(false)
    if (!result.ok) return setProblem(result.error)
    setProblem('')
    setQuestion('')
    setAsked(true)
    api('/api/student/me', { token }).then((r) => r.ok && setMe(r.data))
  }

  const leave = () => {
    storage.remove('domax:student:code')
    if (cls) storage.remove(`domax:student:token:${cls.code}`)
    setCls(null); setToken(null); setMe(null); setCodeInput(''); setTab('papers'); setAsked(false)
  }

  const tabs = cls
    ? [
        { value: 'papers', label: 'Papers', count: cls.papers.length },
        { value: 'notices', label: 'Notices', count: cls.notices.length },
        ...(cls.settings.canSeeResults ? [{ value: 'results', label: 'My results' }] : []),
        ...(cls.settings.canAsk ? [{ value: 'ask', label: 'Ask' }] : []),
      ]
    : []

  const needsId = (tab === 'results' || tab === 'ask') && !me

  return (
    <div data-workspace className="min-h-screen bg-[var(--sky-surface)] text-[var(--sky-text)]">
      <header className="border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
          <Link href="/" className="text-[15px] font-bold tracking-tight">Domax</Link>
          <span className="text-sm text-[var(--sky-subtle)]">Student portal</span>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 space-y-6">
        {!cls ? (
          <Card>
            <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">Enter your class code</h1>
            <p className="mt-2 text-[15px] text-[var(--sky-subtle)]">Your teacher gives one code to the whole class. It opens the papers they have shared.</p>
            <form onSubmit={openClass} className="mt-5">
              <label htmlFor="class-code" className={labelClass}>Class code</label>
              <input
                id="class-code"
                className={`${fieldClass} !h-14 text-center font-mono text-2xl uppercase tracking-[0.2em]`}
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                autoComplete="off"
                autoCapitalize="characters"
                maxLength={8}
                placeholder="ABC-123"
              />
              <Button type="submit" size="lg" className="mt-4 w-full" disabled={busy || codeInput.replace(/[^A-Z0-9]/gi, '').length < 6}>
                {busy ? 'Opening…' : 'Open my class'}
              </Button>
              {problem && <Problem>{problem}</Problem>}
            </form>
          </Card>
        ) : (
          <>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{cls.name}</h1>
                <p className="text-[15px] text-[var(--sky-subtle)]">{me ? `Signed in as ${me.name}` : cls.level}</p>
              </div>
              <button type="button" onClick={leave} className="text-sm text-[var(--sky-subtle)] underline">Leave</button>
            </div>

            <Segmented label="Sections" options={tabs} value={tab} onChange={(v) => { setTab(v); setProblem('') }} fullWidth />

            {tab === 'papers' && (
              cls.papers.length === 0 ? (
                <Card><p className="text-[15px] text-[var(--sky-subtle)]">Your teacher has not shared any papers yet.</p></Card>
              ) : (
                <ul className="space-y-3">
                  {cls.papers.map((p) => (
                    <li key={p.id}>
                      <Card className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium truncate">{p.title}</p>
                          <p className="text-xs text-[var(--sky-subtle)]">{KIND_LABEL[p.kind] || p.kind} · {sizeLabel(p.size)} · {when(p.createdAt)}{p.allowDownload ? '' : ' · view only'}</p>
                        </div>
                        <div className="flex gap-2">
                          {(p.allowDownload || /^(application\/pdf|text\/plain|image\/)/.test(p.mime)) && (
                            <Button size="sm" variant="secondary" href={`/api/student/paper/${p.id}?code=${cls.code}`} target="_blank" rel="noopener noreferrer">Open</Button>
                          )}
                          {p.allowDownload && <Button size="sm" href={`/api/student/paper/${p.id}?code=${cls.code}&download=1`}>Download</Button>}
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              )
            )}

            {tab === 'notices' && (
              cls.notices.length === 0 ? (
                <Card><p className="text-[15px] text-[var(--sky-subtle)]">No notices from your teacher.</p></Card>
              ) : (
                <ul className="space-y-3">
                  {cls.notices.map((n) => (
                    <li key={n.id}><Card><p className="font-medium">{n.subject || 'Notice'}</p><p className="mt-1 text-[15px] whitespace-pre-wrap">{n.body}</p><p className="mt-2 text-xs text-[var(--sky-subtle)]">{when(n.createdAt)}</p></Card></li>
                  ))}
                </ul>
              )
            )}

            {needsId && (
              <Card>
                <h2 className="text-lg font-semibold">Your ID number</h2>
                <p className="mt-1 text-[15px] text-[var(--sky-subtle)]">Results and questions are private, so type your own ID number: your CAMIS, Urubuto or registration number from the school list.</p>
                <form onSubmit={verify} className="mt-4">
                  <label htmlFor="student-id" className={labelClass}>ID number</label>
                  <input id="student-id" className={fieldClass} value={idInput} onChange={(e) => setIdInput(e.target.value)} autoComplete="off" inputMode="text" />
                  <Button type="submit" size="md" className="mt-4" disabled={busy || idInput.trim().length < 3}>{busy ? 'Checking…' : 'Continue'}</Button>
                  {problem && <Problem>{problem}</Problem>}
                </form>
              </Card>
            )}

            {tab === 'results' && me && <Results me={me} />}

            {tab === 'ask' && me && (
              <div className="space-y-4">
                <Card>
                  <form onSubmit={ask}>
                    <label htmlFor="question" className={labelClass}>Ask your teacher</label>
                    <textarea id="question" rows={4} className={`${fieldClass} !h-auto py-2.5`} value={question} onChange={(e) => { setQuestion(e.target.value); setAsked(false) }} placeholder="Which question do you want help with?" />
                    <Button type="submit" size="md" className="mt-3" disabled={busy || !question.trim()}>{busy ? 'Sending…' : 'Send question'}</Button>
                    {asked && <p role="status" className="mt-3 text-sm text-[var(--vscode-green)]">Sent. Your teacher’s reply will appear below.</p>}
                    {problem && <Problem>{problem}</Problem>}
                  </form>
                </Card>
                {me.messages.length > 0 && (
                  <ul className="space-y-3">
                    {me.messages.map((m) => (
                      <li key={m.id}>
                        <Card className={m.direction === 'to_student' ? '' : 'bg-[var(--sky-surface)]'}>
                          <p className="text-xs font-semibold text-[var(--sky-subtle)]">{m.direction === 'to_student' ? 'Your teacher' : 'You'} · {when(m.createdAt)}</p>
                          <p className="mt-1 text-[15px] whitespace-pre-wrap">{m.body}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
        <p className="text-center text-xs text-[var(--sky-subtle)]">Free for students. Your marks are given by your teacher.</p>
      </main>
    </div>
  )
}
