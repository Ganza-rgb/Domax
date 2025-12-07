'use client'

import { useCallback, useEffect, useMemo, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import { useThemeState } from '@/states/useThemeState'

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
  { label: 'Go to Analytics', href: '/dashboard/analytics', category: 'Navigation' },
  { label: 'Go to Billing', href: '/dashboard/billing', category: 'Navigation' },
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
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const openPalette = useCallback(() => setIsOpen(true), [])
  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  const filteredCommands = useMemo(() => {
    if (!query) return commands
    const lowerQuery = query.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.category.toLowerCase().includes(lowerQuery)
    )
  }, [query])

  const handleCommand = useCallback(
    (command) => {
      const section = command.href.replace('/dashboard', '').replace('/', '') || 'home'
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center px-4 pt-32"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePalette()
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-lg border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-xl">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[var(--sky-panel-border)] px-4 py-3">
          <svg
            className="w-5 h-5 text-[var(--sky-subtle)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:outline-none"
          />
          <kbd className="px-2 py-1 text-xs font-mono rounded bg-[var(--sky-surface)] text-[var(--sky-subtle)]">
            ESC
          </kbd>
        </div>

        {/* Commands list */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--sky-subtle)]">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(
                filteredCommands.reduce((acc, cmd) => {
                  if (!acc[cmd.category]) acc[cmd.category] = []
                  acc[cmd.category].push(cmd)
                  return acc
                }, {})
              ).map(([category, cmds]) => (
                <div key={category} className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-[var(--sky-subtle)] uppercase">
                    {category}
                  </div>
                  {cmds.map((command) => (
                    <button
                      key={command.label}
                      type="button"
                      onClick={() => handleCommand(command)}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--sky-text)] hover:bg-[var(--sky-surface)] focus:bg-[var(--sky-surface)] focus:outline-none"
                    >
                      {command.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--sky-panel-border)] px-4 py-2 flex items-center justify-between text-xs text-[var(--sky-subtle)]">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="hover:text-[var(--sky-text)]"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </div>
  )
}

