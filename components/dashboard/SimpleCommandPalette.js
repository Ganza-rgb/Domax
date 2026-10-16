'use client'

import { useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import { useThemeState } from '@/states/useThemeState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'
import { useUserState } from '@/states/useUserState'

// Context to allow opening from anywhere
const CommandPaletteContext = createContext(null)

export function useCommandPalette() {
  return useContext(CommandPaletteContext)
}

const commands = [
  { label: 'Go to Home', href: '/dashboard', category: 'Navigation' },
  { label: 'Upload Papers', href: '/dashboard/upload', category: 'Navigation' },
  { label: 'Go to Exams', href: '/dashboard/exams', category: 'Navigation' },
  { label: 'Go to Submissions', href: '/dashboard/submissions', category: 'Navigation' },
  { label: 'Go to Rubrics', href: '/dashboard/rubrics', category: 'Navigation' },
  { label: 'Go to Courses', href: '/dashboard/courses', category: 'Navigation' },
  { label: 'Go to Assignments', href: '/dashboard/assignments', category: 'Navigation' },
  { label: 'Go to Students', href: '/dashboard/students', category: 'Navigation' },
  { label: 'Go to Past papers', href: '/dashboard/past-papers', category: 'Navigation' },
  { label: 'Go to Analytics', href: '/dashboard/analytics', category: 'Navigation' },
  { label: 'Go to Billing', href: '/dashboard/billing', category: 'Navigation' },
  { label: 'Go to Access codes', href: '/dashboard/entitlements', category: 'Navigation' },
  { label: 'Go to Settings', href: '/dashboard/settings', category: 'Navigation' },
  { label: 'Upload Documents', href: '/dashboard/upload', category: 'Actions' },
  { label: 'Create Rubric', href: '/dashboard/rubrics', category: 'Actions' },
  { label: 'Create Exam', href: '/dashboard/exams', category: 'Actions' },
  { label: 'Create Course', href: '/dashboard/courses', category: 'Actions' },
  { label: 'Top-up Wallet', href: '/dashboard/billing', category: 'Actions' },
]

export default function SimpleCommandPalette() {
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const { toggleTheme, isDark } = useThemeState()
  const { exams } = useExamState()
  const { submissions } = useSubmissionState()
  const { students } = useUserState()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef(null)

  const openPalette = useCallback(() => setIsOpen(true), [])
  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  // Records from the workspace are searchable alongside commands
  const records = useMemo(
    () => [
      ...students.map((student) => ({
        label: student.name,
        detail: `${student.level} · avg ${student.avgScore}%`,
        href: `/dashboard/students/${student.id}`,
        category: 'Students',
      })),
      ...submissions.map((submission) => ({
        label: submission.student.name,
        detail: submission.student.classRoom,
        href: `/dashboard/submissions/${submission.id}`,
        category: 'Submissions',
      })),
      ...exams.map((exam) => ({
        label: exam.title,
        detail: exam.level,
        href: `/dashboard/exams/${exam.id}`,
        category: 'Exams',
      })),
    ],
    [students, submissions, exams]
  )

  const filteredCommands = useMemo(() => {
    if (!query) return commands
    const lowerQuery = query.toLowerCase()
    const matches = (item) =>
      item.label.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      (item.detail || '').toLowerCase().includes(lowerQuery)
    return [...records.filter(matches), ...commands.filter(matches)]
  }, [query, records])

  // Grouped for display; the flat order above drives keyboard navigation
  const grouped = useMemo(() => {
    const groups = []
    filteredCommands.forEach((cmd, index) => {
      let group = groups.find((g) => g.category === cmd.category)
      if (!group) {
        group = { category: cmd.category, items: [] }
        groups.push(group)
      }
      group.items.push({ ...cmd, index })
    })
    return groups
  }, [filteredCommands])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleCommand = useCallback(
    (command) => {
      const section = command.href.split('/')[2] || 'home'
      setCurrentSection(section)
      router.push(command.href)
      closePalette()
    },
    [router, setCurrentSection, closePalette]
  )

  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (event.key === 'Escape' && isOpen) {
        closePalette()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, closePalette])

  // Expose open function globally for button clicks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__openCommandPalette = openPalette
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.__openCommandPalette
      }
    }
  }, [openPalette])

  // Keep the highlighted option in view
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(filteredCommands.length - 1, i + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const command = filteredCommands[activeIndex]
      if (command) handleCommand(command)
    }
  }

  if (!isOpen) return null

  const activeId = filteredCommands[activeIndex] ? `palette-option-${activeIndex}` : undefined

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(10,22,38,0.45)] flex items-start justify-center px-4 pt-[12vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePalette()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search and commands"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)]"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[var(--sky-panel-border)] px-4 h-12">
          <svg
            className="w-[18px] h-[18px] text-[var(--sky-subtle)] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search students, scripts, exams or commands…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={activeId}
            aria-label="Search"
            className="flex-1 bg-transparent text-[15px] text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[11px] rounded border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-subtle)]">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div id="palette-list" ref={listRef} role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-[var(--sky-subtle)]">
              Nothing matches “{query}”.
            </div>
          ) : (
            grouped.map(({ category, items }) => (
              <div key={category} className="mb-1 last:mb-0" role="presentation">
                <div className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--sky-subtle)]">
                  {category}
                </div>
                {items.map((command) => {
                  const active = command.index === activeIndex
                  return (
                    <button
                      key={`${category}-${command.label}-${command.href}`}
                      id={`palette-option-${command.index}`}
                      data-index={command.index}
                      role="option"
                      aria-selected={active}
                      type="button"
                      onMouseMove={() => setActiveIndex(command.index)}
                      onClick={() => handleCommand(command)}
                      className={`mx-2 flex w-[calc(100%-1rem)] items-center justify-between gap-3 rounded-md px-3 h-9 text-left text-sm ${
                        active ? 'bg-[var(--action-accent-soft)] text-[var(--sky-text)]' : 'text-[var(--sky-text)]'
                      }`}
                    >
                      <span className="truncate">{command.label}</span>
                      {command.detail && (
                        <span className="truncate text-xs text-[var(--sky-subtle)]">{command.detail}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--sky-panel-border)] px-4 h-10 flex items-center justify-between text-xs text-[var(--sky-subtle)]">
          <div className="flex items-center gap-4">
            <span><kbd className="font-sans">↑↓</kbd> Navigate</span>
            <span><kbd className="font-sans">↵</kbd> Open</span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="hover:text-[var(--sky-text)] rounded"
          >
            {isDark ? 'Light theme' : 'Dark theme'}
          </button>
        </div>
      </div>
    </div>
  )
}
