'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserState } from '@/states/useUserState'
import { useThemeState } from '@/states/useThemeState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'

const pageTitles = {
  '/dashboard': 'Home',
  '/dashboard/upload': 'Upload',
  '/dashboard/exams': 'Exams',
  '/dashboard/submissions': 'Submissions',
  '/dashboard/rubrics': 'Rubrics',
  '/dashboard/courses': 'Courses',
  '/dashboard/assignments': 'Assignments',
  '/dashboard/students': 'Students',
  '/dashboard/past-papers': 'Past papers',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/billing': 'Billing',
  '/dashboard/entitlements': 'Access codes',
  '/dashboard/settings': 'Settings',
}

export default function SimpleTopBar() {
  const pathname = usePathname()
  const { teacher, findStudentById } = useUserState()
  const { toggleTheme, isDark } = useThemeState()
  const { findExamById } = useExamState()
  const { findSubmissionById } = useSubmissionState()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  // Breadcrumb: section, then the record name on detail routes
  const basePath = pathname.split('/').slice(0, 3).join('/')
  const sectionTitle = pageTitles[basePath] || 'Dashboard'
  const recordId = pathname.split('/')[3]
  let recordTitle = null
  if (recordId) {
    if (basePath === '/dashboard/exams') recordTitle = findExamById(recordId)?.title || 'Exam'
    else if (basePath === '/dashboard/submissions') recordTitle = findSubmissionById(recordId)?.student?.name || 'Submission'
    else if (basePath === '/dashboard/students') recordTitle = findStudentById(recordId)?.name || 'Student'
    else recordTitle = decodeURIComponent(recordId)
  }

  const iconButton =
    'w-8 h-8 flex items-center justify-center rounded-md text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)] transition-colors'

  return (
    <header className="h-14 border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)] flex items-center justify-between gap-4 px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-1.5 text-sm min-w-0">
          <li className="hidden sm:block">
            <Link href="/dashboard" className="text-[var(--sky-subtle)] hover:text-[var(--sky-text)] rounded">Domax</Link>
          </li>
          <li aria-hidden="true" className="hidden sm:block text-[var(--sky-panel-border)]">/</li>
          <li className="min-w-0">
            {recordTitle ? (
              <Link href={basePath} className="text-[var(--sky-subtle)] hover:text-[var(--sky-text)] rounded">
                {sectionTitle}
              </Link>
            ) : (
              <span className="font-medium text-[var(--sky-text)]" aria-current="page">{sectionTitle}</span>
            )}
          </li>
          {recordTitle && (
            <>
              <li aria-hidden="true" className="text-[var(--sky-panel-border)]">/</li>
              <li className="min-w-0 truncate font-medium text-[var(--sky-text)]" aria-current="page">{recordTitle}</li>
            </>
          )}
        </ol>
      </nav>

      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-4 text-[13px] text-[var(--sky-subtle)] mr-1">
          <Link href="/dashboard/billing" className="hover:text-[var(--sky-text)] rounded">
            Balance <span className="text-[var(--sky-text)] font-semibold tabular-nums">{(teacher?.balancePages || 0).toLocaleString()} pages</span>
          </Link>
          <span>
            Today <span className="text-[var(--sky-text)] font-semibold tabular-nums">{teacher?.usage?.today || 0} graded</span>
          </span>
        </div>

        {/* Command palette trigger */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined' && window.__openCommandPalette) {
              window.__openCommandPalette()
            }
          }}
          className="hidden md:flex items-center gap-2 h-8 pl-2.5 pr-1.5 rounded-md border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[13px] text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:border-[var(--action-accent)] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <span className="pr-6">Search</span>
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[11px] font-sans">
            {isMac ? '⌘K' : 'Ctrl K'}
          </kbd>
        </button>
        <button
          type="button"
          onClick={() => window.__openCommandPalette?.()}
          className={`md:hidden ${iconButton}`}
          aria-label="Search"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={iconButton}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5V2m0 22v-3m7-7h3M2 12h3m12.95 7.95 2.12 2.12M4.93 4.93 7.05 7.05m0 9.9-2.12 2.12m12.02-12.02 2.12-2.12M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20 15.5A8.5 8.5 0 0 1 9.5 5c0-.5.03-1 .1-1.49A8.5 8.5 0 1 0 20 15.5Z" />
            </svg>
          )}
        </button>

        {/* Welcome tour */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('domax_onboarding_completed')
              window.location.reload()
            }
          }}
          className={`hidden md:flex ${iconButton}`}
          aria-label="Start welcome tour"
          title="Start welcome tour"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
          </svg>
        </button>
      </div>
    </header>
  )
}
