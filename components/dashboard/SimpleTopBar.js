'use client'

import { usePathname } from 'next/navigation'
import { useUserState } from '@/states/useUserState'
import { useThemeState } from '@/states/useThemeState'

const pageTitles = {
  '/dashboard': 'Home',
  '/dashboard/upload': 'Upload',
  '/dashboard/exams': 'Exams',
  '/dashboard/submissions': 'Submissions',
  '/dashboard/rubrics': 'Rubrics',
  '/dashboard/courses': 'Courses',
  '/dashboard/assignments': 'Assignments',
  '/dashboard/students': 'Students',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/billing': 'Billing',
  '/dashboard/settings': 'Settings',
}

export default function SimpleTopBar() {
  const pathname = usePathname()
  const { teacher } = useUserState()
  const { toggleTheme, isDark } = useThemeState()

  const pageTitle = pageTitles[pathname] || 'Dashboard'
  const basePath = pathname.split('/').slice(0, 3).join('/')

  return (
    <header className="h-12 border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)] flex items-center justify-between px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[var(--sky-subtle)]">Domax</span>
        <span className="text-[var(--sky-subtle)]">/</span>
        <span className="text-[var(--sky-text)] font-medium">{pageTitle}</span>
      </div>

      {/* Right side - Stats and actions */}
      <div className="flex items-center gap-4">
        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-4 text-xs text-[var(--sky-subtle)]">
          <span>
            Balance: <span className="text-[var(--sky-text)] font-semibold">{teacher?.balancePages || 0} pages</span>
          </span>
          <span>
            Today: <span className="text-[var(--sky-text)] font-semibold">{teacher?.usage?.today || 0} graded</span>
          </span>
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-[var(--sky-surface)] text-[var(--sky-subtle)] hover:text-[var(--sky-text)]"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5V2m0 22v-3m7-7h3M2 12h3m12.95 7.95 2.12 2.12M4.93 4.93 7.05 7.05m0 9.9-2.12 2.12m12.02-12.02 2.12-2.12M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 15.5A8.5 8.5 0 0 1 9.5 5c0-.5.03-1 .1-1.49A8.5 8.5 0 1 0 20 15.5Z" />
            </svg>
          )}
        </button>

        {/* Command palette trigger */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined' && window.__openCommandPalette) {
              window.__openCommandPalette()
            }
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-xs text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:border-[#005ffe]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--sky-panel)] text-[10px] font-mono">⌘K</kbd>
        </button>

        {/* Tour guide trigger - for testing */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('domax_onboarding_completed')
              window.location.reload()
            }
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-xs text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:border-[#005ffe]"
          title="Start welcome tour"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Tour</span>
        </button>
      </div>
    </header>
  )
}

