'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ProgressBar, WsButton as Button, fieldClass, labelClass } from '@/components/dashboard/ui'
import { ScoreTrendLine } from '@/components/dashboard/charts'

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

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const pctOf = (got, max) => (max ? Math.round((got / max) * 100) : 0)
const resultPct = (r) => pctOf(r.total, r.max)
const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'D'
// Result items are titled "Q2 · Photosynthesis"; the topic reads better without the number.
const topicName = (title = '') => title.replace(/^Q\d+\s*·\s*/, '')
const fileBadge = (mime = '') => (mime === 'application/pdf' ? 'PDF' : mime.startsWith('image/') ? 'IMG' : mime === 'text/plain' ? 'TXT' : 'DOC')

function dedupeByTitle(items) {
  const seen = new Set()
  const out = []
  for (const item of items) {
    if (seen.has(item.title)) continue
    seen.add(item.title)
    out.push(item)
  }
  return out
}

/* Every question on the latest released exam, compared with the same question on the
   one before when it has the same title. Status comes from the student's own marks;
   "Work on" also covers anything the teacher's advice flagged. */
function topicRows(results) {
  const [latest, prev] = results
  if (!latest) return []
  const flagged = new Set((latest.advice?.focus || []).map((f) => f.title))
  return latest.items.map((item) => {
    const pct = pctOf(item.got, item.max)
    const before = prev?.items.find((p) => p.title === item.title)
    const status = pct >= 80 ? 'strong' : flagged.has(item.title) || pct < 50 ? 'work' : 'steady'
    return { ...item, pct, before, change: before ? pct - pctOf(before.got, before.max) : null, status }
  })
}

const STATUS = {
  strong: { label: 'Strong', tone: 'positive' },
  work: { label: 'Work on', tone: 'caution' },
  steady: { label: 'Steady', tone: 'info' },
}
const TONE = {
  positive: { text: 'text-[var(--vscode-green)]', soft: 'bg-[color-mix(in_srgb,var(--vscode-green)_12%,transparent)]', bar: 'bg-[var(--vscode-green)]', track: 'bg-[color-mix(in_srgb,var(--vscode-green)_18%,transparent)]' },
  caution: { text: 'text-[var(--vscode-orange)]', soft: 'bg-[color-mix(in_srgb,var(--vscode-orange)_12%,transparent)]', bar: 'bg-[var(--vscode-orange)]', track: 'bg-[color-mix(in_srgb,var(--vscode-orange)_18%,transparent)]' },
  info: { text: 'text-[var(--vscode-accent)]', soft: 'bg-[color-mix(in_srgb,var(--vscode-accent)_10%,transparent)]', bar: 'bg-[var(--vscode-accent)]', track: 'bg-[color-mix(in_srgb,var(--vscode-accent)_16%,transparent)]' },
}

// Same inline-SVG technique as the teacher sidebar (components/dashboard/SimpleSidebar.js).
const icons = {
  home: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z',
  papers: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z',
  bell: 'M12 3a1 1 0 0 1 1 1v.08A6.5 6.5 0 0 1 18.5 10.5v3.69l1.4 1.87a1 1 0 0 1-.8 1.6H4.9a1 1 0 0 1-.8-1.6l1.4-1.87V10.5A6.5 6.5 0 0 1 11 4.08V4a1 1 0 0 1 1-1Z M9.5 18.5a2.5 2.5 0 0 0 5 0',
  chart: 'M3 3v18h18M7 16l4-4 4 4 4-4',
  book: 'M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z M20 5.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z',
  up: 'M5 15l7-7 7 7',
  down: 'M5 9l7 7 7-7',
  check: 'M5 12.5l4.5 4.5L19 7.5',
}
const TAB_ICON = { home: 'home', papers: 'papers', notices: 'bell', results: 'chart', study: 'book', ask: 'chat' }

function Icon({ name, className, strokeWidth = 1.75 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  )
}

function Dot({ className = '' }) {
  return <span aria-hidden="true" className={`w-2 h-2 rounded-full bg-[var(--vscode-red)] ${className}`} />
}

function Avatar({ text, className = '' }) {
  return (
    <div className={`w-11 h-11 rounded-full bg-[#0A3059] text-white flex items-center justify-center text-[15px] font-semibold flex-shrink-0 ${className}`}>{text}</div>
  )
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
  return <section className={`rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-6 ${className}`}>{children}</section>
}

function CardTitle({ children, action }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-headline text-[1.3rem] font-semibold tracking-[-0.02em]">{children}</h2>
      {action}
    </div>
  )
}

function TextLink({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-medium text-[var(--action-accent)] hover:underline">
      {children}
    </button>
  )
}

function Problem({ children }) {
  return <p role="alert" className="mt-3 text-sm text-[var(--vscode-orange)]">{children}</p>
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function Sidebar({ tabs, value, onChange, badges, cls, me }) {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 flex-shrink-0 sticky top-0 h-screen gap-7 border-r border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-4 py-6">
      <Link href="/" className="px-2 font-headline text-[22px] font-bold tracking-[-0.02em] text-[var(--sky-text)]">Domax</Link>

      <div className="flex items-center gap-3 rounded-2xl bg-[var(--sky-surface)] p-3">
        <Avatar text={initials(me?.name || cls.name)} />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold">{me?.name || cls.name}</p>
          <p className="truncate text-[13px] text-[var(--sky-subtle)]">{me ? cls.name : cls.level || 'Student portal'}</p>
        </div>
      </div>

      <nav aria-label="Sections" className="flex flex-col gap-1">
        {tabs.map((t) => {
          const active = t.value === value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange(t.value)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 h-11 rounded-xl px-3 text-[15px] transition-colors ${
                active ? 'bg-[var(--action-accent-soft)] text-[var(--action-accent)] font-semibold' : 'text-[var(--sky-subtle)] font-medium hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
              }`}
            >
              <Icon name={TAB_ICON[t.value]} className="w-5 h-5 flex-shrink-0" />
              {t.long || t.label}
              {badges[t.value] ? <Dot className="ml-auto" /> : typeof t.count === 'number' && t.count > 0 && <span className="ml-auto text-xs tabular-nums">{t.count}</span>}
            </button>
          )
        })}
      </nav>

      <p className="mt-auto rounded-2xl border border-[var(--sky-panel-border)] p-3.5 text-[13px] leading-relaxed text-[var(--sky-subtle)]">
        Free for students. Every mark here was given by your teacher.
      </p>
    </aside>
  )
}

/* Phones and tablets: a bottom tab bar. Notices live behind the bell in the header. */
function BottomNav({ tabs, value, onChange, badges }) {
  const items = tabs.filter((t) => t.value !== 'notices')
  return (
    <nav
      aria-label="Sections"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--sky-panel-border)] bg-[var(--sky-panel)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex h-16 max-w-2xl items-stretch justify-around px-1">
        {items.map((t) => {
          const active = t.value === value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange(t.value)}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 ${active ? 'text-[var(--action-accent)]' : 'text-[var(--sky-subtle)]'}`}
            >
              <Icon name={TAB_ICON[t.value]} className="w-[22px] h-[22px]" />
              <span className={`text-[11px] ${active ? 'font-semibold' : 'font-medium'}`}>{t.label}</span>
              {badges[t.value] && <Dot className="absolute top-2 right-[calc(50%-18px)]" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Pieces of the Home and Study screens                                */
/* ------------------------------------------------------------------ */

function ScoreRing({ pct, label, size = 140 }) {
  const r = 58
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 140 140" role="img" aria-label={`${pct} percent`}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="12" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#00cd90" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(c * Math.min(100, pct)) / 100} ${c}`} transform="rotate(-90 70 70)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-headline font-bold leading-none tracking-[-0.04em] ${size >= 130 ? 'text-[2.5rem]' : 'text-[2rem]'}`}>{pct}%</span>
        {label && <span className="mt-1 text-xs text-[#B9C8DD]">{label}</span>}
      </div>
    </div>
  )
}

function Bar({ pct, tone = 'info', track }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full ${track || 'bg-[var(--sky-surface)]'}`}>
      <div className={`h-full rounded-full ${TONE[tone].bar}`} style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} />
    </div>
  )
}

function HeroResult({ results, canStudy, onNavigate }) {
  const [latest, prev] = results
  const pct = resultPct(latest)
  const prevPct = prev ? resultPct(prev) : null
  const delta = prev ? pct - prevPct : null
  const y = (p) => 26 - p * 0.24
  return (
    <section className="flex-[2_1_480px] rounded-3xl bg-[#0A3059] p-6 sm:p-8 text-white flex flex-col gap-5">
      <p className="text-[13px] font-medium text-[#B9C8DD]">Latest result · released {when(latest.releasedAt)}</p>
      <div className="flex flex-wrap items-center gap-6 sm:gap-7">
        <ScoreRing pct={pct} label={`${latest.total} / ${latest.max}`} />
        <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-3">
          <h2 className="font-headline text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">{latest.title}</h2>
          {delta !== null && delta !== 0 && (
            <span className={`self-start inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${delta > 0 ? 'bg-[rgba(0,205,144,0.16)] text-[#7CF0C8]' : 'bg-[rgba(245,178,107,0.16)] text-[#F5B26B]'}`}>
              <Icon name={delta > 0 ? 'up' : 'down'} className="w-3.5 h-3.5" strokeWidth={2.25} />
              {delta > 0 ? 'Up' : 'Down'} {Math.abs(delta)} points since {prev.title}
            </span>
          )}
          {prev && (
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#B9C8DD]">
              <span>{prev.title} {prevPct}%</span>
              <svg width="120" height="28" viewBox="0 0 120 28" aria-hidden="true">
                <polyline points={`6,${y(prevPct)} 114,${y(pct)}`} fill="none" stroke="#5B9BFF" strokeWidth="2" strokeLinecap="round" />
                <circle cx="6" cy={y(prevPct)} r="4" fill="#5B9BFF" />
                <circle cx="114" cy={y(pct)} r="4" fill="#00cd90" />
              </svg>
              <span className="font-semibold text-white">{pct}%</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="button" onClick={() => onNavigate('results')} className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-[#0A3059] hover:bg-[#E8F0FF]">See full result</button>
        {canStudy && (
          <button type="button" onClick={() => onNavigate('study')} className="h-11 rounded-full border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10">My progress</button>
        )}
      </div>
    </section>
  )
}

function NextStep({ results, canAsk, hasPapers, onNavigate }) {
  const focusAll = results.filter((r) => r.advice).flatMap((r) => (r.advice.focus || []).map((f) => ({ ...f, examTitle: r.title })))
  const top = dedupeByTitle(focusAll)[0]

  if (!top) {
    return (
      <Card className="flex-[1_1_300px] flex flex-col gap-3">
        <p className="text-[13px] font-semibold text-[var(--action-accent)]">Your next step</p>
        <h2 className="font-headline text-[1.6rem] font-semibold leading-tight tracking-[-0.03em]">You&apos;re on track</h2>
        <p className="text-[15px] leading-relaxed text-[var(--sky-subtle)]">Nothing stands out as weak in your released exams. Keep revising with the papers your teacher shares.</p>
        {hasPapers && <Button size="md" className="mt-auto" onClick={() => onNavigate('papers')}>Open papers</Button>}
      </Card>
    )
  }

  const pct = pctOf(top.got, top.max)
  const times = focusAll.filter((f) => f.title === top.title).length
  return (
    <Card className="flex-[1_1_300px] flex flex-col gap-3.5">
      <p className="text-[13px] font-semibold text-[var(--action-accent)]">Your next step</p>
      <h2 className="font-headline text-[1.6rem] font-semibold leading-tight tracking-[-0.03em]">Work on {topicName(top.title).toLowerCase()}</h2>
      <p className="text-[15px] leading-relaxed text-[var(--sky-subtle)]">
        You got {top.got} of {top.max}.{top.classPct !== null && top.classPct !== undefined ? ` The class averaged ${top.classPct}%.` : ''}
        {times > 1 ? ` It came up as a weak spot in ${times} exams.` : ''}
      </p>
      <div className="space-y-2.5">
        <div>
          <div className="mb-1.5 flex justify-between text-[13px] text-[var(--sky-subtle)]"><span>You</span><span className="tabular-nums">{pct}%</span></div>
          <Bar pct={pct} tone="caution" />
        </div>
        {top.classPct !== null && top.classPct !== undefined && (
          <div>
            <div className="mb-1.5 flex justify-between text-[13px] text-[var(--sky-subtle)]"><span>Class</span><span className="tabular-nums">{top.classPct}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--sky-surface)]"><div className="h-full rounded-full bg-[var(--sky-panel-border)]" style={{ width: `${top.classPct}%` }} /></div>
          </div>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-1">
        {hasPapers && <Button size="lg" onClick={() => onNavigate('papers')}>Revise with your papers</Button>}
        {canAsk && <TextLink onClick={() => onNavigate('ask')}>Ask my teacher about it</TextLink>}
      </div>
    </Card>
  )
}

function TopicCards({ rows, canStudy, onNavigate }) {
  if (!rows.length) return null
  return (
    <Card className="flex flex-col gap-4">
      <CardTitle action={canStudy && <TextLink onClick={() => onNavigate('study')}>See all topics</TextLink>}>Your topics</CardTitle>
      <div className="flex flex-wrap gap-3.5">
        {rows.slice(0, 6).map((row) => {
          const status = STATUS[row.status]
          const tone = TONE[status.tone]
          return (
            <div key={row.title} className={`flex-[1_1_220px] rounded-2xl p-4 flex flex-col gap-2.5 ${tone.soft}`}>
              <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wide ${tone.text}`}>
                <span>{status.label}</span>
                <span className="normal-case tabular-nums">{row.got} / {row.max}</span>
              </div>
              <p className="truncate text-base font-semibold">{topicName(row.title)}</p>
              <Bar pct={row.pct} tone={status.tone} track={tone.track} />
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function PapersCard({ cls, onNavigate }) {
  const papers = cls.papers.slice(0, 3)
  return (
    <Card className="flex-[1_1_300px] flex flex-col gap-3.5">
      <CardTitle action={cls.papers.length > 3 && <TextLink onClick={() => onNavigate('papers')}>All papers</TextLink>}>Papers to revise</CardTitle>
      {papers.length === 0 ? (
        <p className="text-sm text-[var(--sky-subtle)]">Your teacher hasn&apos;t shared any papers yet.</p>
      ) : (
        papers.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-[var(--sky-surface)] p-3">
            <div className="flex h-12 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--action-accent-soft)] text-[11px] font-bold text-[var(--action-accent)]">{fileBadge(p.mime)}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-[var(--sky-subtle)]">{KIND_LABEL[p.kind] || p.kind} · {p.allowDownload ? sizeLabel(p.size) : 'view only'}</p>
            </div>
            <a href={`/api/student/paper/${p.id}?code=${cls.code}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--action-accent)] hover:underline">Open</a>
          </div>
        ))
      )}
    </Card>
  )
}

function TeacherCard({ cls, onNavigate }) {
  const notice = cls.notices[0]
  return (
    <Card className="flex-[1_1_300px] flex flex-col gap-3.5">
      <CardTitle>From your teacher</CardTitle>
      {notice ? (
        <div className="rounded-2xl bg-[var(--action-accent-soft)] p-4 flex flex-col gap-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-accent)]">Notice · {when(notice.createdAt)}</p>
          <p className="text-[15px] font-semibold">{notice.subject || 'Notice'}</p>
          <p className="line-clamp-3 text-sm leading-relaxed text-[var(--sky-subtle)]">{notice.body}</p>
        </div>
      ) : (
        <p className="text-sm text-[var(--sky-subtle)]">No notices yet.</p>
      )}
      {cls.notices.length > 0 && <div className="mt-auto"><TextLink onClick={() => onNavigate('notices')}>All notices</TextLink></div>}
    </Card>
  )
}

function MessagesCard({ cls, me, hasUnread, onNavigate }) {
  const message = me.messages[0]
  const teacher = cls.teacherName || 'Your teacher'
  return (
    <Card className="flex-[1_1_300px] flex flex-col gap-3.5">
      <CardTitle action={hasUnread && <span className="rounded-full bg-[color-mix(in_srgb,var(--vscode-red)_12%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--vscode-red)]">New</span>}>Messages</CardTitle>
      {message ? (
        <div className="flex gap-3">
          <Avatar text={message.direction === 'to_student' ? initials(teacher) : initials(me.name)} className="!w-9 !h-9 !text-xs" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold">{message.direction === 'to_student' ? teacher : 'You'}</p>
            <p className="line-clamp-3 text-sm leading-relaxed text-[var(--sky-subtle)]">{message.body}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[var(--sky-subtle)]">Stuck on a question? Ask your teacher here.</p>
      )}
      <Button variant="secondary" size="lg" className="mt-auto" onClick={() => onNavigate('ask')}>Ask a question</Button>
    </Card>
  )
}

function VerifyForm({ value, onChange, onSubmit, busy, problem, dark = false }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="student-id" className={dark ? 'mb-1.5 block text-sm font-medium text-[#B9C8DD]' : labelClass}>Your ID number</label>
        <input id="student-id" className={`${fieldClass} !h-12`} value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" inputMode="text" placeholder="CAMIS, Urubuto or registration number" />
      </div>
      <button
        type="submit"
        disabled={busy || value.trim().length < 3}
        className={`h-12 rounded-full px-6 text-[15px] font-semibold disabled:opacity-50 ${dark ? 'bg-white text-[#0A3059]' : 'bg-[#005ffe] text-white'}`}
      >
        {busy ? 'Checking…' : 'Continue'}
      </button>
      {problem && <Problem>{problem}</Problem>}
    </form>
  )
}

function Home({ cls, me, hasUnread, onNavigate, verify }) {
  const results = me?.results || []
  const canStudy = Boolean(me?.settings.canSeeResults && me?.settings.canSeeAdvice)
  const locked = !me && (cls.settings.canSeeResults || cls.settings.canAsk)

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {locked && (
        <section className="rounded-3xl bg-[#0A3059] p-6 sm:p-8 text-white flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#B9C8DD]">Private to you</p>
          <h2 className="font-headline text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">See your results and where to focus</h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-[#B9C8DD]">Type your own ID number from the class list. It stays in this browser tab only.</p>
          <VerifyForm {...verify} dark />
        </section>
      )}

      {me && results.length > 0 && (
        <div className="flex flex-wrap gap-5">
          <HeroResult results={results} canStudy={canStudy} onNavigate={onNavigate} />
          {me.settings.canSeeAdvice && <NextStep results={results} canAsk={cls.settings.canAsk} hasPapers={cls.papers.length > 0} onNavigate={onNavigate} />}
        </div>
      )}

      {me && results.length === 0 && me.settings.canSeeResults && (
        <Card>
          <p className="text-[13px] font-semibold text-[var(--action-accent)]">Results</p>
          <h2 className="mt-2 font-headline text-[1.5rem] font-semibold tracking-[-0.03em]">No results yet</h2>
          <p className="mt-1.5 text-[15px] text-[var(--sky-subtle)]">They appear here after your teacher releases an exam.</p>
        </Card>
      )}

      {me && <TopicCards rows={topicRows(results)} canStudy={canStudy} onNavigate={onNavigate} />}

      <div className="flex flex-wrap gap-5">
        <PapersCard cls={cls} onNavigate={onNavigate} />
        <TeacherCard cls={cls} onNavigate={onNavigate} />
        {me && cls.settings.canAsk && <MessagesCard cls={cls} me={me} hasUnread={hasUnread} onNavigate={onNavigate} />}
      </div>
    </div>
  )
}

/* How a student is doing overall: scores over time, every topic compared exam to exam,
   and what to practise — all from marks the teacher has released. */
function Study({ cls, me, onNavigate }) {
  const results = me.results
  if (!results.length) {
    return (
      <Card>
        <h2 className="font-headline text-[1.5rem] font-semibold tracking-[-0.03em]">Nothing to study yet</h2>
        <p className="mt-1.5 text-[15px] text-[var(--sky-subtle)]">This fills in once your teacher releases a result.</p>
      </Card>
    )
  }

  const [latest, prev] = results
  const delta = prev ? resultPct(latest) - resultPct(prev) : null
  const rows = topicRows(results)
  const gain = rows.filter((r) => r.change > 0).sort((a, b) => b.change - a.change)[0]
  const trend = [...results].reverse().map((r) => ({ examId: r.examId, title: r.title, pct: resultPct(r) }))
  const focus = dedupeByTitle(results.filter((r) => r.advice).flatMap((r) => r.advice.focus || []))[0]
  const strong = dedupeByTitle([
    ...rows.filter((r) => r.status === 'strong').map((r) => ({ title: topicName(r.title) })),
    ...results.filter((r) => r.advice).flatMap((r) => (r.advice.strong || []).map((title) => ({ title: topicName(title) }))),
  ]).slice(0, 6)

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-wrap gap-5">
        <Card className="flex-[2_1_480px] flex flex-col gap-4">
          <CardTitle>Your scores</CardTitle>
          {trend.length > 1 ? (
            <ScoreTrendLine points={trend} height={220} />
          ) : (
            <div className="flex items-center gap-5">
              <span className="font-headline text-[3rem] font-semibold tracking-[-0.04em] tabular-nums">{resultPct(latest)}%</span>
              <p className="text-[15px] text-[var(--sky-subtle)]">{latest.title}. Your progress line appears after your second released exam.</p>
            </div>
          )}
        </Card>

        {(delta !== null || gain) && (
          <div className="flex-[1_1_280px] flex flex-col gap-4">
            {delta !== null && (
              <section className="flex-1 rounded-3xl bg-[#0A3059] p-6 text-white flex flex-col gap-1.5">
                <p className="text-[13px] text-[#B9C8DD]">Change since {prev.title}</p>
                <p className={`font-headline text-[2.75rem] font-bold leading-none tracking-[-0.04em] ${delta >= 0 ? 'text-[#7CF0C8]' : 'text-[#F5B26B]'}`}>{delta > 0 ? `+${delta}` : delta}</p>
                <p className="text-sm text-[#B9C8DD]">points, from {resultPct(prev)}% to {resultPct(latest)}%</p>
              </section>
            )}
            {gain && (
              <Card className="flex-1 flex flex-col gap-1.5">
                <p className="text-[13px] text-[var(--sky-subtle)]">Biggest gain</p>
                <p className="font-headline text-[1.5rem] font-semibold tracking-[-0.02em]">{topicName(gain.title)}</p>
                <p className="text-sm text-[var(--sky-subtle)]">{gain.before.got} / {gain.before.max} → {gain.got} / {gain.max}. Keep going.</p>
              </Card>
            )}
          </div>
        )}
      </div>

      {rows.length > 0 && (
        <Card className="flex flex-col gap-2">
          <CardTitle>Topic by topic</CardTitle>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <thead className="text-xs text-[var(--sky-subtle)]">
                <tr>
                  <th className="py-2 font-semibold">Topic</th>
                  {prev && <th className="py-2 font-semibold">{prev.title}</th>}
                  <th className="py-2 font-semibold">{latest.title}</th>
                  {prev && <th className="py-2 font-semibold">Change</th>}
                  <th className="py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const status = STATUS[row.status]
                  return (
                    <tr key={row.title} className="border-t border-[var(--sky-panel-border)]">
                      <td className="py-3.5 pr-3 font-semibold">{topicName(row.title)}</td>
                      {prev && <td className="py-3.5 pr-3 tabular-nums text-[var(--sky-subtle)]">{row.before ? `${row.before.got} / ${row.before.max}` : 'Not on that exam'}</td>}
                      <td className="py-3.5 pr-3 tabular-nums">{row.got} / {row.max}</td>
                      {prev && (
                        <td className={`py-3.5 pr-3 font-semibold tabular-nums ${row.change > 0 ? 'text-[var(--vscode-green)]' : row.change < 0 ? 'text-[var(--vscode-orange)]' : 'text-[var(--sky-subtle)]'}`}>
                          {row.change === null ? '—' : row.change > 0 ? `+${row.change}` : row.change === 0 ? 'Same' : row.change}
                        </td>
                      )}
                      <td className="py-3.5">
                        <span className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${TONE[status.tone].soft} ${TONE[status.tone].text}`}>{status.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {prev && <p className="mt-1 text-xs text-[var(--sky-subtle)]">Change is in percentage points, for questions with the same title on both exams.</p>}
        </Card>
      )}

      <div className="flex flex-wrap gap-5">
        {focus && (
          <section className="flex-[2_1_420px] rounded-3xl bg-[var(--action-accent-soft)] p-6 sm:p-7 flex flex-col gap-3">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--action-accent)]">Practise</p>
            <h2 className="font-headline text-[1.6rem] font-semibold leading-tight tracking-[-0.03em]">{topicName(focus.title)} practice</h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-[var(--sky-subtle)]">
              Short questions made from your teacher&apos;s marking points, with feedback straight away. Practice never changes your marks.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2.5">
              <button type="button" disabled className="inline-flex h-12 items-center gap-2 rounded-full bg-[#005ffe] px-6 text-[15px] font-semibold text-white opacity-60 cursor-not-allowed">
                Start practice
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">Coming soon</span>
              </button>
              {cls.papers.length > 0 && (
                <button type="button" onClick={() => onNavigate('papers')} className="h-12 rounded-full bg-[var(--sky-panel)] px-5 text-[15px] font-semibold text-[var(--sky-text)] hover:opacity-90">
                  Revise with your papers
                </button>
              )}
            </div>
          </section>
        )}

        {strong.length > 0 && (
          <Card className="flex-[1_1_280px] flex flex-col gap-3">
            <CardTitle>Doing well</CardTitle>
            <ul className="flex flex-col gap-2.5">
              {strong.map((s) => (
                <li key={s.title} className="flex items-center gap-2.5 text-[15px]">
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${TONE.positive.soft} ${TONE.positive.text}`}>
                    <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  {s.title}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[13px] text-[var(--sky-subtle)]">Topics where you scored 80% or more.</p>
          </Card>
        )}
      </div>
    </div>
  )
}

function Results({ me }) {
  if (!me.settings.canSeeResults) return <Card><p className="text-[15px] text-[var(--sky-subtle)]">Your teacher has not turned on results for this class.</p></Card>
  if (!me.results.length) return <Card><p className="text-[15px] text-[var(--sky-subtle)]">No results yet. They appear here after your teacher releases them.</p></Card>
  return (
    <div className="flex flex-col gap-4">
      {me.results.map((r) => (
        <Card key={r.examId}>
          <p className="text-sm text-[var(--sky-subtle)]">{r.title} · {when(r.releasedAt)}</p>
          <p className="mt-2 font-headline text-5xl font-semibold tracking-[-0.04em] tabular-nums">
            {r.total}<span className="text-xl font-medium tracking-normal text-[var(--sky-subtle)]"> / {r.max} · {resultPct(r)}%</span>
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {r.items.map((item) => (
              <li key={item.title}>
                <div className="mb-1 flex justify-between gap-3 text-sm"><span className="truncate">{item.title}</span><span className="tabular-nums text-[var(--sky-subtle)]">{item.got}/{item.max}</span></div>
                <ProgressBar value={item.got} max={item.max || 1} tone={item.max && item.got / item.max < 0.5 ? 'caution' : 'info'} label={item.title} />
              </li>
            ))}
          </ul>
          {r.advice && (r.advice.focus?.length > 0 || r.advice.strong?.length > 0 || r.advice.summary) && (
            <div className="mt-5 rounded-2xl bg-[var(--sky-surface)] p-4 text-[15px]">
              <p className="font-semibold">{r.advice.focus?.length ? 'Where to focus' : 'How you did'}</p>
              {r.advice.summary && <p className="mt-1.5">{r.advice.summary}</p>}
              {r.advice.focus?.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {r.advice.focus.map((f) => <li key={f.title}>{f.title} <span className="text-[var(--sky-subtle)]">({f.got}/{f.max})</span></li>)}
                </ul>
              )}
              {r.advice.strong?.length > 0 && <p className="mt-3 text-sm text-[var(--sky-subtle)]">You did well on: {r.advice.strong.join('; ')}.</p>}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The page                                                            */
/* ------------------------------------------------------------------ */

export default function StudentPortal() {
  const [codeInput, setCodeInput] = useState('')
  const [cls, setCls] = useState(null)
  const [problem, setProblem] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState('home')
  const [token, setToken] = useState(null)
  const [me, setMe] = useState(null)
  const [idInput, setIdInput] = useState('')
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState(false)
  const [seen, setSeen] = useState({ messages: 0, notices: 0 })

  const goTo = (value) => {
    setTab(value)
    setProblem('')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

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

  // "New" dots on Ask and the bell, remembered per browser tab rather than tracked on the server.
  useEffect(() => {
    if (!cls?.code) return
    setSeen({
      messages: Number(storage.get(`domax:student:seenMsgs:${cls.code}`) || 0),
      notices: Number(storage.get(`domax:student:seenNotices:${cls.code}`) || 0),
    })
  }, [cls?.code])

  useEffect(() => {
    if (!cls?.code) return
    if (tab === 'ask' && me) {
      storage.set(`domax:student:seenMsgs:${cls.code}`, String(me.messages.length))
      setSeen((s) => ({ ...s, messages: me.messages.length }))
    }
    if (tab === 'notices') {
      storage.set(`domax:student:seenNotices:${cls.code}`, String(cls.notices.length))
      setSeen((s) => ({ ...s, notices: cls.notices.length }))
    }
  }, [tab, me, cls])

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
    setCls(null); setToken(null); setMe(null); setCodeInput(''); setTab('home'); setAsked(false)
  }

  if (!cls) {
    return (
      <div data-workspace className="min-h-screen bg-[var(--sky-surface)] text-[var(--sky-text)]">
        <header className="border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
          <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
            <Link href="/" className="font-headline text-[18px] font-bold tracking-tight">Domax</Link>
            <span className="text-sm text-[var(--sky-subtle)]">Student portal</span>
          </div>
        </header>
        <main className="mx-auto max-w-xl px-4 py-10 space-y-6">
          <Card>
            <h1 className="font-headline text-[1.9rem] leading-tight font-semibold tracking-[-0.03em]">Enter your class code</h1>
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
          <p className="text-center text-xs text-[var(--sky-subtle)]">Free for students. Your marks are given by your teacher.</p>
        </main>
      </div>
    )
  }

  const tabs = [
    { value: 'home', label: 'Home' },
    ...(cls.settings.canSeeResults ? [{ value: 'results', label: 'Results', long: 'My results' }] : []),
    ...(cls.settings.canSeeResults && cls.settings.canSeeAdvice ? [{ value: 'study', label: 'Study' }] : []),
    { value: 'papers', label: 'Papers', count: cls.papers.length },
    { value: 'notices', label: 'Notices', count: cls.notices.length },
    ...(cls.settings.canAsk ? [{ value: 'ask', label: 'Ask', long: 'Ask my teacher' }] : []),
  ]
  const hasUnread = Boolean(me && me.messages.length > seen.messages)
  const hasNewNotice = cls.notices.length > seen.notices
  const badges = { ask: hasUnread, notices: hasNewNotice }
  const needsId = (tab === 'results' || tab === 'study' || tab === 'ask') && !me
  const firstName = me?.name.split(' ')[0]
  const teacherLine = cls.teacherName ? ` · Taught by ${cls.teacherName}` : ''
  const released = me?.results.length || 0

  const heading = {
    home: { title: `${greeting()}${firstName ? `, ${firstName}` : ''}`, subtitle: `${cls.name}${teacherLine}` },
    results: { title: 'My results', subtitle: `${cls.name}${teacherLine}` },
    study: { title: 'Study', subtitle: released ? `Built from the ${released === 1 ? 'exam' : `${released} exams`} ${cls.teacherName || 'your teacher'} has released.` : cls.name },
    papers: { title: 'Papers', subtitle: 'Past papers, memos and notes your teacher shared with the class.' },
    notices: { title: 'Notices', subtitle: `For everyone in ${cls.name}.` },
    ask: { title: 'Ask my teacher', subtitle: 'Only you and your teacher see these messages.' },
  }[tab]

  const verifyProps = { value: idInput, onChange: setIdInput, onSubmit: verify, busy, problem }

  return (
    <div data-workspace className="min-h-screen bg-[var(--sky-surface)] text-[var(--sky-text)] lg:flex">
      <Sidebar tabs={tabs} value={tab} onChange={goTo} badges={badges} cls={cls} me={me} />

      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-28 lg:pb-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar text={initials(me?.name || cls.name)} className="lg:hidden" />
              <div className="min-w-0">
                <h1 className="font-headline text-[1.75rem] sm:text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.035em]">{heading.title}</h1>
                <p className="mt-1.5 text-[15px] sm:text-base text-[var(--sky-subtle)]">{heading.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => goTo('notices')}
                aria-label={hasNewNotice ? 'Notices, new' : 'Notices'}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[var(--sky-text)] hover:bg-[var(--sky-surface)]"
              >
                <Icon name="bell" className="w-5 h-5" />
                {hasNewNotice && <Dot className="absolute top-2.5 right-2.5 ring-2 ring-[var(--sky-panel)]" />}
              </button>
              <button type="button" onClick={leave} className="h-11 rounded-full border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-4 text-sm font-medium text-[var(--sky-subtle)] hover:text-[var(--sky-text)]">
                Leave class
              </button>
            </div>
          </header>

          {tab === 'home' && <Home cls={cls} me={me} hasUnread={hasUnread} onNavigate={goTo} verify={verifyProps} />}

          {needsId && (
            <Card>
              <h2 className="font-headline text-[1.4rem] font-semibold tracking-[-0.02em]">Your ID number</h2>
              <p className="mt-1 mb-4 text-[15px] text-[var(--sky-subtle)]">Results and questions are private, so type your own ID number: your CAMIS, Urubuto or registration number from the school list.</p>
              <VerifyForm {...verifyProps} />
            </Card>
          )}

          {tab === 'results' && me && <Results me={me} />}

          {tab === 'study' && me && <Study cls={cls} me={me} onNavigate={goTo} />}

          {tab === 'papers' && (
            cls.papers.length === 0 ? (
              <Card><p className="text-[15px] text-[var(--sky-subtle)]">Your teacher has not shared any papers yet.</p></Card>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {cls.papers.map((p) => (
                  <li key={p.id}>
                    <Card className="flex h-full items-center gap-4">
                      <div className="flex h-14 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--action-accent-soft)] text-xs font-bold text-[var(--action-accent)]">{fileBadge(p.mime)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{p.title}</p>
                        <p className="text-xs text-[var(--sky-subtle)]">{KIND_LABEL[p.kind] || p.kind} · {sizeLabel(p.size)} · {when(p.createdAt)}{p.allowDownload ? '' : ' · view only'}</p>
                        <div className="mt-3 flex gap-2">
                          {(p.allowDownload || /^(application\/pdf|text\/plain|image\/)/.test(p.mime)) && (
                            <Button size="sm" variant="secondary" href={`/api/student/paper/${p.id}?code=${cls.code}`} target="_blank" rel="noopener noreferrer">Open</Button>
                          )}
                          {p.allowDownload && <Button size="sm" href={`/api/student/paper/${p.id}?code=${cls.code}&download=1`}>Download</Button>}
                        </div>
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
              <ul className="flex flex-col gap-4">
                {cls.notices.map((n) => (
                  <li key={n.id}>
                    <Card>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--action-accent)]">{when(n.createdAt)}</p>
                      <p className="mt-1.5 text-lg font-semibold">{n.subject || 'Notice'}</p>
                      <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed">{n.body}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            )
          )}

          {tab === 'ask' && me && (
            <div className="flex flex-col gap-4">
              <Card>
                <form onSubmit={ask}>
                  <label htmlFor="question" className={labelClass}>Your question</label>
                  <textarea id="question" rows={4} className={`${fieldClass} !h-auto py-2.5`} value={question} onChange={(e) => { setQuestion(e.target.value); setAsked(false) }} placeholder="Which question do you want help with?" />
                  <Button type="submit" size="lg" className="mt-3" disabled={busy || !question.trim()}>{busy ? 'Sending…' : 'Send question'}</Button>
                  {asked && <p role="status" className="mt-3 text-sm text-[var(--vscode-green)]">Sent. Your teacher’s reply will appear below.</p>}
                  {problem && <Problem>{problem}</Problem>}
                </form>
              </Card>
              {me.messages.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {me.messages.map((m) => {
                    const fromTeacher = m.direction === 'to_student'
                    return (
                      <li key={m.id} className={`flex gap-3 ${fromTeacher ? '' : 'flex-row-reverse'}`}>
                        <Avatar text={fromTeacher ? initials(cls.teacherName || 'Teacher') : initials(me.name)} className="!w-9 !h-9 !text-xs" />
                        <div className={`max-w-[85%] rounded-3xl px-4 py-3 ${fromTeacher ? 'border border-[var(--sky-panel-border)] bg-[var(--sky-panel)]' : 'bg-[var(--action-accent-soft)]'}`}>
                          <p className="text-xs font-semibold text-[var(--sky-subtle)]">{fromTeacher ? cls.teacherName || 'Your teacher' : 'You'} · {when(m.createdAt)}</p>
                          <p className="mt-1 whitespace-pre-wrap text-[15px]">{m.body}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}

          <p className="text-center text-xs text-[var(--sky-subtle)] lg:hidden">Free for students. Every mark here was given by your teacher.</p>
        </div>
      </main>

      <BottomNav tabs={tabs} value={tab} onChange={goTo} badges={badges} />
    </div>
  )
}
