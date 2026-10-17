'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { WsButton as Button, EmptyState, Notice, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { portal, invitationText } from '@/lib/portalClient'

const KIND_LABEL = { paper: 'Past paper', memo: 'Memo', reference: 'Reference' }
const sizeLabel = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`)

function Check({ id, checked, onChange, label, hint, disabled }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 py-2.5 cursor-pointer">
      <input id={id} type="checkbox" className="mt-1 h-4 w-4 accent-[var(--action-accent)]" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>
        <span className="block text-[15px] text-[var(--sky-text)]">{label}</span>
        {hint && <span className="block text-sm text-[var(--sky-subtle)]">{hint}</span>}
      </span>
    </label>
  )
}

/**
 * One code for the whole class. With it students open the papers and notices
 * the teacher shares. To see their own results or ask a question they also
 * give their own ID number from the class list.
 */
export default function StudentAccess({ cls }) {
  const [status, setStatus] = useState({ loading: true })
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [upload, setUpload] = useState({ title: '', kind: 'paper', allowDownload: true })
  const fileRef = useRef(null)

  const applyStatus = useCallback((result) => {
    if (result.ok) setStatus({ loading: false, ...result.data })
    else setStatus({ loading: false, published: false, error: result.error, needsSignIn: result.status === 401 })
  }, [])

  const load = useCallback(async () => applyStatus(await portal.status(cls.id)), [applyStatus, cls.id])

  useEffect(() => {
    let cancelled = false
    portal.status(cls.id).then((result) => {
      if (!cancelled) applyStatus(result)
    })
    return () => {
      cancelled = true
    }
  }, [cls.id, applyStatus])

  const publish = async (settings) => {
    setBusy(true)
    setNotice(null)
    const result = await portal.publishClass(cls, settings || status.settings)
    setBusy(false)
    if (!result.ok) {
      setNotice({ tone: 'caution', text: result.error, needsSignIn: result.status === 401 })
      return
    }
    await load()
    setNotice({ tone: 'positive', text: status.published ? 'Student list and settings updated.' : 'Class code created. Share it with your students.' })
  }

  const toggle = (key) => (value) => publish({ ...status.settings, [key]: value })

  const copy = async (text, done) => {
    try {
      await navigator.clipboard.writeText(text)
      setNotice({ tone: 'positive', text: done })
    } catch {
      setNotice({ tone: 'caution', text: 'Your browser blocked copying. Select the text and copy it yourself.' })
    }
  }

  const sendPaper = async (event) => {
    event.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setBusy(true)
    const result = await portal.addPaper(cls.id, file, upload)
    setBusy(false)
    if (!result.ok) {
      setNotice({ tone: 'caution', text: result.error })
      return
    }
    if (fileRef.current) fileRef.current.value = ''
    setUpload({ title: '', kind: 'paper', allowDownload: status.settings?.defaultDownload ?? true })
    await load()
    setNotice({ tone: 'positive', text: 'Shared with every student in this class.' })
  }

  if (status.loading) return null

  const emails = cls.students.map((s) => s.email).filter(Boolean)
  const invite = status.published ? invitationText(cls.name, status.display) : ''
  const blocked = cls.under16 && !cls.consent

  return (
    <div className="space-y-6">
      <Panel title="Student access" meta="One code for the whole class" data-tour="student-access">
        {notice && (
          <div className="mb-4">
            <Notice tone={notice.tone} onDismiss={() => setNotice(null)}>
              {notice.text} {notice.needsSignIn && <Link href="/login" className="font-semibold underline">Sign in</Link>}
            </Notice>
          </div>
        )}

        {!status.published ? (
          <div>
            <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
              Give every student the same code. With it they open the past papers and notices you share. To see their own results or ask you a question,
              they also type their own ID number from the class list.
            </p>
            {status.error && <p className="mt-3 text-sm text-[var(--vscode-orange)]">{status.error}{status.needsSignIn && <> <Link href="/login" className="font-semibold underline">Sign in</Link></>}</p>}
            {blocked && <p className="mt-3 text-sm text-[var(--vscode-orange)]">These students are under 16. Record consent above before sharing.</p>}
            <div className="mt-5">
              <Button size="md" onClick={() => publish()} disabled={busy || blocked || cls.students.length === 0}>
                {busy ? 'Creating…' : 'Create class code'}
              </Button>
              {cls.students.length === 0 && <span className="ml-3 text-sm text-[var(--sky-subtle)]">Add students first.</span>}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[var(--sky-surface)] px-5 py-4">
              <p className="text-sm text-[var(--sky-subtle)]">Class code</p>
              <p className="mt-1 font-mono text-4xl font-semibold tracking-[0.12em] text-[var(--sky-text)]" aria-label={`Class code ${status.display.split('').join(' ')}`}>{status.display}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="md" onClick={() => copy(status.display, 'Code copied.')}>Copy code</Button>
              <Button size="md" variant="secondary" onClick={() => copy(invite, 'Invitation copied. Paste it into WhatsApp, SMS or email.')}>Copy invitation</Button>
              <Button size="md" variant="secondary" href={`https://wa.me/?text=${encodeURIComponent(invite)}`} target="_blank" rel="noopener noreferrer">WhatsApp</Button>
              <Button
                size="md"
                variant="secondary"
                href={`mailto:?${emails.length ? `bcc=${encodeURIComponent(emails.join(','))}&` : ''}subject=${encodeURIComponent(`${cls.name} on Domax`)}&body=${encodeURIComponent(invite)}`}
              >
                {emails.length ? `Email ${emails.length} students` : 'Email'}
              </Button>
            </div>
            <p className="text-sm text-[var(--sky-subtle)]">
              {status.students} students · {status.studentsWithId} with an ID number (needed to see results).
              {status.studentsWithId < status.students && ' Add the missing IDs, then update the list.'}
              {cls.students.length !== status.students && ` The class now has ${cls.students.length}: update the list to match.`}
            </p>

            <div className="divide-y divide-[var(--sky-panel-border)] border-t border-[var(--sky-panel-border)] pt-1">
              <p className="pt-3 text-sm font-semibold text-[var(--sky-text)]">What students can do</p>
              <Check id="p-read" checked disabled label="Read the papers and notices you share" hint="Always on: this is what the class code is for." />
              <Check id="p-results" checked={status.settings.canSeeResults} onChange={toggle('canSeeResults')} disabled={busy} label="See their own results" hint="Only after you release an exam, and only with their ID number." />
              <Check id="p-advice" checked={status.settings.canSeeAdvice} onChange={toggle('canSeeAdvice')} disabled={busy || !status.settings.canSeeResults} label="See where to focus" hint="The questions they scored low on compared with the class." />
              <Check id="p-ask" checked={status.settings.canAsk} onChange={toggle('canAsk')} disabled={busy} label="Ask you questions" hint="Their questions arrive in Messages." />
              <Check id="p-dl" checked={status.settings.defaultDownload} onChange={toggle('defaultDownload')} disabled={busy} label="Download papers by default" hint="New papers start as downloadable. You can change each paper." />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => publish()} disabled={busy}>Update student list</Button>
              {status.unread > 0 && <Button size="sm" href="/dashboard/messages">{status.unread} new {status.unread === 1 ? 'question' : 'questions'}</Button>}
            </div>
          </div>
        )}
      </Panel>

      {status.published && (
        <Panel title="Papers for students" meta="Shared with the whole class at once">
          {status.papers.length === 0 ? (
            <EmptyState title="Nothing shared yet" body="Add a past paper or memo below. Every student with the class code sees it straight away." />
          ) : (
            <ul className="divide-y divide-[var(--sky-panel-border)] rounded-xl border border-[var(--sky-panel-border)]">
              {status.papers.map((paper) => (
                <li key={paper.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium">{paper.title}</p>
                    <p className="text-xs text-[var(--sky-subtle)]">{KIND_LABEL[paper.kind] || paper.kind} · {sizeLabel(paper.size)} · {paper.allowDownload ? 'Download allowed' : 'View only'}</p>
                  </div>
                  <Button size="xs" variant="secondary" onClick={async () => { await portal.setPaperDownload(paper.id, !paper.allowDownload); load() }}>
                    {paper.allowDownload ? 'Make view only' : 'Allow download'}
                  </Button>
                  <Button size="xs" variant="ghost" onClick={async () => { await portal.removePaper(paper.id); load() }} aria-label={`Stop sharing ${paper.title}`}>Remove</Button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={sendPaper} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_12rem] gap-4">
              <div>
                <label htmlFor="paper-title" className={labelClass}>Title</label>
                <input id="paper-title" className={fieldClass} placeholder="e.g. S3 Biology · 2024 end of term" value={upload.title} onChange={(e) => setUpload({ ...upload, title: e.target.value })} />
              </div>
              <div>
                <label htmlFor="paper-kind" className={labelClass}>Type</label>
                <select id="paper-kind" className={fieldClass} value={upload.kind} onChange={(e) => setUpload({ ...upload, kind: e.target.value })}>
                  <option value="paper">Past paper</option>
                  <option value="memo">Memo</option>
                  <option value="reference">Reference</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="paper-file" className={labelClass}>File</label>
              <input id="paper-file" ref={fileRef} type="file" required accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx" className="block w-full text-sm" />
              <p className="mt-1.5 text-xs text-[var(--sky-subtle)]">PDF is best: it opens on any phone. “View only” works for PDFs and images; Word files are always downloads.</p>
            </div>
            <Check id="paper-dl" checked={upload.allowDownload} onChange={(v) => setUpload({ ...upload, allowDownload: v })} label="Students can download it" hint="View only hides the download button. It can’t stop a student saving what they can see." />
            <Button type="submit" size="md" disabled={busy}>{busy ? 'Sharing…' : 'Share with the class'}</Button>
          </form>
        </Panel>
      )}
    </div>
  )
}
