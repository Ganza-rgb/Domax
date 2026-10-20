'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Notice, Panel, StatusPill, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'
import { portal } from '@/lib/portalClient'

const when = (iso) => new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function MessagesPage() {
  const { classes, loaded } = useWorkspace()
  const [classId, setClassId] = useState('')
  const [data, setData] = useState(null)
  const [draft, setDraft] = useState({ to: '', subject: '', body: '' })
  const [replying, setReplying] = useState({})
  const [note, setNote] = useState(null)
  const [busy, setBusy] = useState(false)

  const activeId = classId || classes[0]?.id || ''
  const cls = classes.find((c) => c.id === activeId)

  const apply = useCallback((result) => {
    if (result.ok) setData(result.data)
    else setData({ error: result.error, needsSignIn: result.status === 401, published: false, messages: [], students: [] })
  }, [])

  useEffect(() => {
    if (!activeId) return undefined
    let cancelled = false
    portal.messages(activeId).then((result) => {
      if (cancelled) return
      apply(result)
      if (result.ok && result.data.messages?.some((m) => m.direction === 'to_teacher' && !m.readAt)) portal.markRead(activeId)
    })
    return () => {
      cancelled = true
    }
  }, [activeId, apply])

  const refresh = async () => apply(await portal.messages(activeId))
  const nameOf = useMemo(() => Object.fromEntries((data?.students || []).map((s) => [s.id, s])), [data])

  const send = async (payload, clear) => {
    setBusy(true)
    const result = await portal.sendMessage({ classId: activeId, ...payload })
    setBusy(false)
    if (!result.ok) {
      setNote({ tone: 'caution', text: result.error })
      return
    }
    clear()
    setNote({ tone: 'positive', text: payload.studentId ? 'Sent. The student sees it after entering their ID number.' : 'Posted for the whole class.' })
    refresh()
  }

  if (!loaded) return null
  if (!cls) {
    return (
      <div className="space-y-6">
        <WorkspaceHeader title="Messages" subtitle="Talk to your students without leaving Domax." />
        <EmptyState title="No classes yet" body="Make a class first, then share its code with students." action={<Button href="/dashboard/classes/new">New class</Button>} />
      </div>
    )
  }

  const questions = (data?.messages || []).filter((m) => m.direction === 'to_teacher')
  const sent = (data?.messages || []).filter((m) => m.direction === 'to_student')
  const target = draft.to ? nameOf[draft.to] : null
  const mailRecipients = target ? [target.email].filter(Boolean) : (data?.students || []).map((s) => s.email).filter(Boolean)
  const mailto = `mailto:${target?.email || ''}?${!target && mailRecipients.length ? `bcc=${encodeURIComponent(mailRecipients.join(','))}&` : ''}subject=${encodeURIComponent(draft.subject || `${cls.name} · message from your teacher`)}&body=${encodeURIComponent(draft.body)}`

  return (
    <div className="space-y-6">
      <WorkspaceHeader title="Messages" subtitle="Answer questions, post notices and email students from one place." />

      <div>
        <label htmlFor="msg-class" className={labelClass}>Class</label>
        <select id="msg-class" className={`${fieldClass} !w-auto`} value={activeId} onChange={(e) => { setClassId(e.target.value); setData(null); setNote(null) }}>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {note && <Notice tone={note.tone} onDismiss={() => setNote(null)}>{note.text}</Notice>}

      {!data ? null : !data.published ? (
        <EmptyState
          title={data.needsSignIn ? 'Sign in to use messages' : 'This class isn’t shared with students yet'}
          body={data.error && !data.needsSignIn ? data.error : 'Messages go through the class code. Create it on the class page and students can read notices and ask questions.'}
          action={data.needsSignIn ? <Button href="/login">Sign in</Button> : <Button href={`/dashboard/classes/${cls.id}`}>Open {cls.name}</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_24rem] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <Panel title="Questions from students" meta={data.canAsk ? undefined : 'Questions are turned off for this class'}>
              {questions.length === 0 ? (
                <p className="text-[15px] text-[var(--sky-subtle)]">No questions yet. Students can ask after entering their ID number in the student portal.</p>
              ) : (
                <ul className="space-y-4">
                  {questions.map((m) => (
                    <li key={m.id} className="rounded-xl border border-[var(--sky-panel-border)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{nameOf[m.studentId]?.name || 'A student'}</p>
                        <p className="text-xs text-[var(--sky-subtle)]">{when(m.createdAt)}</p>
                      </div>
                      <p className="mt-2 text-[15px] whitespace-pre-wrap">{m.body}</p>
                      <div className="mt-3 flex gap-2">
                        <label className="sr-only" htmlFor={`reply-${m.id}`}>Reply to {nameOf[m.studentId]?.name}</label>
                        <input id={`reply-${m.id}`} className={fieldClass} placeholder="Write a reply" value={replying[m.id] || ''} onChange={(e) => setReplying({ ...replying, [m.id]: e.target.value })} />
                        <Button size="md" disabled={busy || !(replying[m.id] || '').trim()} onClick={() => send({ studentId: m.studentId, subject: 'Reply to your question', body: replying[m.id] }, () => setReplying({ ...replying, [m.id]: '' }))}>Reply</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Sent" bodyClassName="!px-0 !pb-0">
              {sent.length === 0 ? (
                <p className="px-5 pb-5 text-[15px] text-[var(--sky-subtle)]">Nothing sent yet.</p>
              ) : (
                <ul className="divide-y divide-[var(--sky-panel-border)]">
                  {sent.map((m) => (
                    <li key={m.id} className="px-5 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">{m.subject || 'Message'}</p>
                        <StatusPill tone={m.studentId ? 'info' : 'neutral'}>{m.studentId ? nameOf[m.studentId]?.name || 'Student' : 'Whole class'}</StatusPill>
                      </div>
                      <p className="mt-1 text-sm text-[var(--sky-subtle)] whitespace-pre-wrap">{m.body}</p>
                      <p className="mt-1 text-xs text-[var(--sky-subtle)]">{when(m.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          <Panel title="Write a message">
            <div className="space-y-4">
              <div>
                <label htmlFor="msg-to" className={labelClass}>To</label>
                <select id="msg-to" className={fieldClass} value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })}>
                  <option value="">Everyone in {cls.name}</option>
                  {data.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {!draft.to && <p className="mt-1.5 text-xs text-[var(--sky-subtle)]">Anyone with the class code can read a notice to everyone. Leave out marks and private details.</p>}
              </div>
              <div>
                <label htmlFor="msg-subject" className={labelClass}>Subject <span className="font-normal text-[var(--sky-subtle)]">(optional)</span></label>
                <input id="msg-subject" className={fieldClass} value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} />
              </div>
              <div>
                <label htmlFor="msg-body" className={labelClass}>Message</label>
                <textarea id="msg-body" rows={6} className={`${fieldClass} !h-auto py-2.5`} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="md" disabled={busy || !draft.body.trim()} onClick={() => send({ studentId: draft.to || null, subject: draft.subject, body: draft.body }, () => setDraft({ to: draft.to, subject: '', body: '' }))}>
                  {draft.to ? 'Send to student' : 'Post to class'}
                </Button>
                <Button size="md" variant="secondary" href={mailto} disabled={!draft.body.trim() || (draft.to && !target?.email)}>Email instead</Button>
              </div>
              {draft.to && !target?.email && <p className="text-xs text-[var(--sky-subtle)]">No email address saved for this student. Add one on the <Link href={`/dashboard/classes/${cls.id}`} className="underline">class page</Link>.</p>}
              {!draft.to && mailRecipients.length === 0 && <p className="text-xs text-[var(--sky-subtle)]">No student emails saved yet, so “Email instead” opens a blank To field.</p>}
            </div>
          </Panel>
        </div>
      )}
    </div>
  )
}
