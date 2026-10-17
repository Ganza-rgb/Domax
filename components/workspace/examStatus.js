'use client'

import { useEffect, useState } from 'react'
import { STEPS } from '@/states/useWorkspaceState'
import { getPage } from '@/lib/deviceStore'

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

/**
 * What an exam needs next, in teacher words: a chip, one line of progress,
 * and the single action to take.
 */
export function examStatus(exam, progress, cls = null) {
  const href = `/dashboard/exams/${exam.id}`
  switch (progress.step) {
    case 'prepare':
      return {
        tone: 'idle',
        chip: 'Prepare',
        line: exam.rubricId ? 'Print the answer sheets before the exam' : 'Choose a rubric',
        action: 'Continue preparing',
        href,
      }
    case 'collect': {
      const left = progress.missing.length
      const pagesToFix = progress.incomplete.length + (exam.unassigned?.length || 0)
      return {
        tone: 'warn',
        chip: left ? `Collect · ${left} missing` : 'Collect · pages to fix',
        line: `${progress.collected.length} of ${progress.students.length - progress.absent.length} scripts collected`,
        action: left ? 'Find missing scripts' : `Fix ${plural(pagesToFix, 'page')}`,
        href: `${href}?step=collect`,
      }
    }
    case 'mark': {
      const nextQuestion = progress.perQuestion.find((row) => row.done < row.total)
      const doneQuestions = progress.perQuestion.filter((row) => row.done === row.total).length
      return {
        tone: 'info',
        chip: `Mark · Question ${nextQuestion?.question.number ?? ''}`,
        line: `${doneQuestions} of ${progress.questions.length} questions done`,
        action: 'Continue marking',
        href: `${href}/mark`,
      }
    }
    case 'release':
      if (cls?.under16 && !cls.consent) {
        return {
          tone: 'warn',
          chip: 'Consent needed',
          line: 'Marked. Record consent for this class before releasing',
          action: 'Record consent',
          href: `/dashboard/classes/${cls.id}`,
        }
      }
      return {
        tone: 'ok',
        chip: 'Ready to release',
        line: `All ${plural(progress.collected.length, 'script')} marked`,
        action: 'Review and release',
        href: `${href}?step=release`,
      }
    default:
      return { tone: 'done', chip: 'Released', line: `Released ${new Date(exam.releasedAt).toLocaleDateString()}`, action: 'Open', href: `${href}?step=release` }
  }
}

const chipTones = {
  idle: 'bg-[var(--sky-surface)] text-[var(--sky-subtle)] border-[var(--sky-panel-border)]',
  warn: 'bg-[color-mix(in_srgb,var(--vscode-orange)_12%,transparent)] text-[var(--vscode-orange)] border-transparent',
  info: 'bg-[var(--action-accent-soft)] text-[var(--action-accent)] border-transparent',
  ok: 'bg-[color-mix(in_srgb,var(--vscode-green)_12%,transparent)] text-[var(--vscode-green)] border-transparent',
  done: 'bg-[var(--sky-surface)] text-[var(--sky-subtle)] border-[var(--sky-panel-border)]',
}

export function StepChip({ tone, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${chipTones[tone]}`}>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

/** The four steps, with done / current / upcoming states. Click to view a step. */
export function StepBar({ current, viewing, onSelect }) {
  const currentIndex = current === 'done' ? STEPS.length : STEPS.findIndex((s) => s.key === current)
  return (
    <ol className="grid grid-cols-4 gap-1.5 sm:gap-2" aria-label="Exam steps">
      {STEPS.map((step, index) => {
        const done = index < currentIndex
        const isCurrent = index === currentIndex
        const isViewing = step.key === viewing
        return (
          <li key={step.key}>
            <button
              type="button"
              onClick={() => onSelect(step.key)}
              aria-current={isViewing ? 'step' : undefined}
              className={`w-full text-left rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 transition-colors border ${
                isViewing ? 'border-[var(--action-accent)] ring-2 ring-[var(--action-accent-soft)]' : 'border-transparent'
              } ${
                isCurrent
                  ? 'bg-[var(--action-accent)] text-white'
                  : done
                    ? 'bg-[color-mix(in_srgb,var(--vscode-green)_12%,transparent)] text-[var(--vscode-green)]'
                    : 'bg-[var(--sky-panel)] text-[var(--sky-subtle)] hover:text-[var(--sky-text)]'
              }`}
            >
              <span className="block text-[11px] font-semibold opacity-80">{done ? 'Done' : isCurrent ? 'Now' : `Step ${index + 1}`}</span>
              <span className="block text-[13px] sm:text-[15px] font-semibold leading-tight">
                {done ? '✓ ' : ''}
                {step.label}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/** A page of a script: a photo from this device, or a sample page drawn as lined paper. */
export function ScriptPage({ page, sampleText, className = '' }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (page?.kind !== 'photo' || !page.key) return undefined
    let objectUrl = null
    let cancelled = false
    getPage(page.key)
      .then((blob) => {
        if (cancelled || !blob) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [page?.kind, page?.key])

  if (page?.kind === 'photo') {
    return url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={`Page ${page.page}`} className={`w-full rounded-md border border-[var(--sky-panel-border)] bg-white ${className}`} />
    ) : (
      <div className={`aspect-[3/4] rounded-md border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] flex items-center justify-center text-sm text-[var(--sky-subtle)] ${className}`}>
        Loading page {page.page}…
      </div>
    )
  }

  return (
    <div className={`paper relative rounded-md border border-[#E7E0D3] px-5 sm:px-7 py-5 min-h-[14rem] ${className}`}>
      <span aria-hidden="true" className="absolute left-4 top-0 bottom-0 w-px bg-[#EBB3B3]" />
      <p className="relative font-hand text-[1.4rem] leading-[34px] text-[#1F2E57]">{sampleText || 'No answer written.'}</p>
      <span className="absolute right-3 bottom-2 text-[11px] text-[#8A94A6]">Sample script</span>
    </div>
  )
}
