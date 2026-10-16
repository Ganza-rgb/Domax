'use client'

/**
 * Small building blocks shared by the teacher workspace.
 *
 * Every dashboard page used to re-implement its own card header, stat tile,
 * status pill and empty state with slightly different spacing and colors.
 * These keep them consistent. Colors come from the workspace CSS variables
 * (--sky-*, --vscode-*) so light and dark themes both work.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/* Panel — the standard workspace surface with an optional header row  */
/* ------------------------------------------------------------------ */
export function Panel({ title, meta, actions, children, className = '', bodyClassName = '', as: Tag = 'section', ...props }) {
  const hasHeader = title || meta || actions
  return (
    <Tag
      className={`rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] ${className}`}
      {...props}
    >
      {hasHeader && (
        <header className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
          <div className="min-w-0">
            {meta && <p className="sky-label mb-0.5">{meta}</p>}
            {title && <h2 className="text-[15px] font-semibold text-[var(--sky-text)] leading-snug">{title}</h2>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </header>
      )}
      <div className={hasHeader ? `px-5 pb-5 ${bodyClassName}` : `p-5 ${bodyClassName}`}>{children}</div>
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* StatGroup — several numbers in one strip instead of N separate cards */
/* ------------------------------------------------------------------ */
const toneText = {
  neutral: 'text-[var(--sky-text)]',
  info: 'text-[var(--vscode-accent)]',
  positive: 'text-[var(--vscode-green)]',
  caution: 'text-[var(--vscode-orange)]',
  critical: 'text-[var(--vscode-red)]',
}

export function StatGroup({ items, className = '' }) {
  const cols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5',
  }[items.length] || 'grid-cols-2 lg:grid-cols-4'
  return (
    <dl
      className={`grid ${cols} gap-px overflow-hidden rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel-border)] ${className}`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-[var(--sky-panel)] px-5 py-4">
          <dt className="text-[13px] text-[var(--sky-subtle)]">{item.label}</dt>
          <dd className={`mt-1 text-2xl font-semibold tabular-nums tracking-tight ${toneText[item.tone || 'neutral']}`}>
            {item.value}
          </dd>
          {item.hint && <dd className="mt-0.5 text-xs text-[var(--sky-subtle)]">{item.hint}</dd>}
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------ */
/* StatusPill                                                          */
/* ------------------------------------------------------------------ */
const pillTone = {
  neutral: 'text-[var(--sky-subtle)] bg-[var(--sky-surface)] border-[var(--sky-panel-border)]',
  info: 'text-[var(--vscode-accent)] bg-[color-mix(in_srgb,var(--vscode-accent)_10%,transparent)] border-[color-mix(in_srgb,var(--vscode-accent)_22%,transparent)]',
  positive: 'text-[var(--vscode-green)] bg-[color-mix(in_srgb,var(--vscode-green)_10%,transparent)] border-[color-mix(in_srgb,var(--vscode-green)_22%,transparent)]',
  caution: 'text-[var(--vscode-orange)] bg-[color-mix(in_srgb,var(--vscode-orange)_10%,transparent)] border-[color-mix(in_srgb,var(--vscode-orange)_24%,transparent)]',
  critical: 'text-[var(--vscode-red)] bg-[color-mix(in_srgb,var(--vscode-red)_9%,transparent)] border-[color-mix(in_srgb,var(--vscode-red)_22%,transparent)]',
}

export function StatusPill({ tone = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${pillTone[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/* Submission statuses used by the mock state, mapped to labels and tones. */
const SUBMISSION_STATUS = {
  'needs-review': { label: 'Needs review', tone: 'caution' },
  ready: { label: 'Ready to finalize', tone: 'info' },
  completed: { label: 'Finalized', tone: 'positive' },
}

export function submissionStatus(status) {
  return SUBMISSION_STATUS[status] || { label: String(status || 'Unknown').replace(/-/g, ' '), tone: 'neutral' }
}

/* Average AI confidence (0–1) for a submission's questions. */
export function averageConfidence(questions = []) {
  if (!questions.length) return null
  return questions.reduce((sum, q) => sum + (q?.confidence ?? 0), 0) / questions.length
}

/* Questions that already have a teacher mark. */
export function markedCount(questions = []) {
  return questions.filter((q) => q.teacherScore !== null && q.teacherScore !== undefined).length
}

export const LOW_CONFIDENCE = 0.7

/* ------------------------------------------------------------------ */
/* ProgressBar                                                         */
/* ------------------------------------------------------------------ */
const barTone = {
  info: 'bg-[var(--vscode-accent)]',
  positive: 'bg-[var(--vscode-green)]',
  caution: 'bg-[var(--vscode-orange)]',
  critical: 'bg-[var(--vscode-red)]',
  neutral: 'bg-[var(--sky-subtle)]',
}

export function ProgressBar({ value = 0, max = 100, tone = 'info', label, className = '' }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-1.5 w-full overflow-hidden rounded-full bg-[var(--sky-surface)] ${className}`}
    >
      <div className={`h-full rounded-full ${barTone[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EmptyState                                                          */
/* ------------------------------------------------------------------ */
export function EmptyState({ title, body, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--sky-panel-border)] px-6 py-10 text-center ${className}`}>
      <p className="text-sm font-semibold text-[var(--sky-text)]">{title}</p>
      {body && <p className="mt-1 max-w-sm text-sm text-[var(--sky-subtle)]">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Segmented — compact filter / view switcher                          */
/* ------------------------------------------------------------------ */
export function Segmented({ options, value, onChange, label, className = '', fullWidth = false }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`${fullWidth ? 'flex w-full' : 'inline-flex max-w-full overflow-x-auto'} rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] p-0.5 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium transition-colors ${fullWidth ? 'flex-1 justify-center px-1.5' : 'px-2.5'} ${
              active
                ? 'bg-[var(--sky-panel)] text-[var(--sky-text)] shadow-[0_1px_2px_rgba(10,48,89,0.12)]'
                : 'text-[var(--sky-subtle)] hover:text-[var(--sky-text)]'
            }`}
          >
            {option.label}
            {typeof option.count === 'number' && (
              <span className={`tabular-nums ${active ? 'text-[var(--sky-subtle)]' : ''}`}>{option.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SearchField                                                         */
/* ------------------------------------------------------------------ */
export function SearchField({ value, onChange, placeholder = 'Search', label = 'Search', className = '', ...props }) {
  return (
    <label className={`relative flex items-center ${className}`}>
      <span className="sr-only">{label}</span>
      <svg
        className="pointer-events-none absolute left-2.5 h-4 w-4 text-[var(--sky-subtle)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] pl-8 pr-3 text-sm text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:border-[var(--action-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--action-accent-soft)]"
        {...props}
      />
    </label>
  )
}

/* Standard text input / select / textarea look for workspace forms. */
export const fieldClass =
  'w-full h-10 rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-3 text-sm text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:border-[var(--action-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--action-accent-soft)] read-only:bg-[var(--sky-surface)] read-only:text-[var(--sky-subtle)]'

export const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--sky-text)]'

/* ------------------------------------------------------------------ */
/* ConfirmDialog — for consequential actions                           */
/* ------------------------------------------------------------------ */
export function ConfirmDialog({ open, title, children, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel }) {
  const confirmRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    previousFocus.current = document.activeElement
    confirmRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onCancel?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previousFocus.current?.focus?.()
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(10,22,38,0.45)] p-4 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel?.()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-5 shadow-[var(--sky-shadow)]"
      >
        <h2 id="confirm-dialog-title" className="text-base font-semibold text-[var(--sky-text)]">
          {title}
        </h2>
        <div className="mt-2 text-sm text-[var(--sky-subtle)]">{children}</div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-lg border border-[var(--sky-panel-border)] px-3.5 text-sm font-medium text-[var(--sky-text)] hover:bg-[var(--sky-surface)]"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="h-9 rounded-lg bg-[#005ffe] px-3.5 text-sm font-semibold text-white hover:bg-[#0047cc]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Notice — inline feedback after an action                            */
/* ------------------------------------------------------------------ */
export function Notice({ tone = 'info', children, onDismiss }) {
  return (
    <div
      role="status"
      className={`flex items-start justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-sm ${pillTone[tone]}`}
    >
      <span>{children}</span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} className="-my-0.5 rounded px-1 text-current opacity-70 hover:opacity-100" aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  )
}

/* Download rows as a CSV file in the browser (no server round-trip). */
export function downloadCsv(filename, rows) {
  const escape = (value) => {
    const text = value === null || value === undefined ? '' : String(value)
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const csv = rows.map((row) => row.map(escape).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

/* ------------------------------------------------------------------ */
/* WsButton — workspace button that follows the light/dark theme.      */
/* Same props as components/atoms/Button (variant, size, href, …).     */
/* ------------------------------------------------------------------ */
const wsVariants = {
  primary: 'bg-[#005ffe] text-white hover:bg-[#0047cc] border border-transparent',
  secondary:
    'bg-[var(--sky-panel)] text-[var(--sky-text)] border border-[var(--sky-panel-border)] hover:bg-[var(--sky-surface)] hover:border-[var(--sky-subtle)]',
  ghost: 'text-[var(--sky-text)] border border-transparent hover:bg-[var(--sky-surface)]',
}
wsVariants.outline = wsVariants.secondary

const wsSizes = {
  xs: 'h-7 px-2.5 text-xs',
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-10 px-4 text-sm',
}

export function WsButton({ children, variant = 'primary', size = 'sm', href, className = '', type = 'button', disabled = false, ...props }) {
  const classes = `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sky-panel)] focus-visible:ring-[var(--action-accent)] disabled:cursor-not-allowed disabled:opacity-50 ${wsVariants[variant] || wsVariants.primary} ${wsSizes[size] || wsSizes.sm} ${className}`
  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
