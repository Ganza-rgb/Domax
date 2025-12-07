'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import RightPanel from '@/components/dashboard/RightPanel'
import { useDashboardState } from '@/states/useDashboardState'
import { useThemeState } from '@/states/useThemeState'
import { useUserState } from '@/states/useUserState'
import { usePathname, useRouter } from 'next/navigation'

const iconPaths = {
  home: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z',
  exams: 'M5 6h14M5 12h14M5 18h14M7 12l3 3 7-7',
  submissions: 'M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm7 0v5h5',
  students: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm-10 9v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1',
  papers: 'M6 4h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 0v5h5',
  billing: 'M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Zm0-4h18v4H3V5Zm6 9h6',
  search: 'M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z',
  sun: 'M12 5V2m0 22v-3m7-7h3M2 12h3m12.95 7.95 2.12 2.12M4.93 4.93 7.05 7.05m0 9.9-2.12 2.12m12.02-12.02 2.12-2.12M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z',
  moon: 'M20 15.5A8.5 8.5 0 0 1 9.5 5c0-.5.03-1 .1-1.49A8.5 8.5 0 1 0 20 15.5Z',
  insights: 'M4 6h16M4 12h10M4 18h7',
}

const navItems = [
  { label: 'Home', href: '/dashboard', section: 'home', icon: 'home' },
  { label: 'Exams', href: '/dashboard/exams', section: 'exams', icon: 'exams' },
  { label: 'Submissions', href: '/dashboard/submissions', section: 'submissions', icon: 'submissions' },
  { label: 'Students', href: '/dashboard/students', section: 'students', icon: 'students' },
  { label: 'Past Papers', href: '/dashboard/past-papers', section: 'past-papers', icon: 'papers' },
  { label: 'Billing', href: '/dashboard/billing', section: 'billing', icon: 'billing' },
]

const featureMenuItems = [
  { label: 'Exams', description: 'Plan & publish papers', href: '/dashboard/exams', icon: 'exams' },
  { label: 'Submissions', description: 'Grade & finalize scripts', href: '/dashboard/submissions', icon: 'submissions' },
  { label: 'Students', description: 'Monitor learner progress', href: '/dashboard/students', icon: 'students' },
  { label: 'Past papers', description: 'Assign resources quickly', href: '/dashboard/past-papers', icon: 'papers' },
  { label: 'Billing', description: 'Wallet & costs', href: '/dashboard/billing', icon: 'billing' },
  { label: 'Settings', description: 'Workspace preferences', href: '/dashboard/settings', icon: 'home' },
]

const CommandIcon = ({ name, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={iconPaths[name]} />
  </svg>
)

export default function SkyCommandBar() {
  const { currentSection, setCurrentSection } = useDashboardState()
  const { teacher } = useUserState()
  const { toggleTheme, isDark } = useThemeState()
  const router = useRouter()
  const pathname = usePathname()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleNavigate = useCallback(
    (item) => {
      setCurrentSection(item.section)
      router.push(item.href)
    },
    [router, setCurrentSection]
  )

  const paletteCommands = useMemo(
    () => [
      ...navItems.map((item) => ({
        label: `Go to ${item.label}`,
        description: `${item.label} workspace`,
        action: () => handleNavigate(item),
      })),
      {
        label: 'Top-up wallet',
        description: 'Open billing & usage panel',
        action: () => router.push('/dashboard/billing'),
      },
      {
        label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
        description: 'Toggle Domax Sky theme',
        action: () => toggleTheme(),
      },
    ],
    [handleNavigate, isDark, router, toggleTheme]
  )

  const filteredCommands = paletteCommands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setInsightsOpen(false)
        setAppsOpen(false)
        setUserMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const stats = [
    { label: 'Balance', value: `${teacher?.balancePages?.toLocaleString?.() ?? '—'} pages` },
    { label: 'Today', value: `${teacher?.usage?.today ?? 0} pages graded` },
  ]

  const NavButton = ({ item }) => {
    const isActive = currentSection === item.section || pathname === item.href
    return (
      <button
        type="button"
        onClick={() => handleNavigate(item)}
        className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${
          isActive
            ? 'bg-gradient-to-r from-[#005ffe] to-[#0047cc] text-white shadow-lg'
            : 'text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
        }`}
      >
        <CommandIcon name={item.icon} className="h-4 w-4" />
        <span className="hidden sm:inline">{item.label}</span>
      </button>
    )
  }

  const teacherInitials = teacher?.avatar || teacher?.name?.slice(0, 2) || 'DT'

  return (
    <>
      <div className="fixed inset-x-4 bottom-5 z-40 lg:top-6 lg:bottom-auto">
        <div className="relative flex items-center gap-3 rounded-[32px] border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)] px-4 py-3 flex-nowrap overflow-visible">
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <NavButton key={item.section} item={item} />
            ))}
          </div>
          <div className="flex items-center gap-3 flex-none sticky right-0">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex flex-1 min-w-0 items-center gap-3 rounded-2xl border border-[var(--sky-panel-border)] px-3 py-2 text-left text-sm text-[var(--sky-subtle)]"
            >
              <CommandIcon name="search" className="h-4 w-4 flex-none" />
              <span className="flex-1 min-w-0 truncate text-[var(--sky-subtle)] hidden sm:block">Search or jump to anything</span>
              <span className="flex-1 min-w-0 truncate text-[var(--sky-subtle)] sm:hidden">Search</span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[var(--sky-surface)]/80 px-2 py-0.5 text-[10px] font-semibold text-[var(--sky-text)]">
                ⌘K
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-3 text-xs text-[var(--sky-subtle)] whitespace-nowrap">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col text-right">
                  <span className="sky-label">{stat.label}</span>
                  <span className="font-semibold text-[var(--sky-text)]">{stat.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl border border-[var(--sky-panel-border)] px-3 py-2 text-[var(--sky-text)]"
              aria-label="Toggle theme"
            >
              <CommandIcon name={isDark ? 'sun' : 'moon'} className="h-4 w-4" />
            </button>
            <div className="relative flex-none">
              <button
                type="button"
                onClick={() => setAppsOpen((prev) => !prev)}
                className="rounded-2xl border border-[var(--sky-panel-border)] px-3 py-2 text-[var(--sky-text)]"
                aria-label="Open Domax menu"
              >
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, idx) => (
                    <span key={idx} className="h-1.5 w-1.5 rounded bg-[var(--sky-text)]/80" />
                  ))}
                </div>
              </button>
              {appsOpen && (
                <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 lg:top-full lg:bottom-auto lg:mt-3 w-72 rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)] p-4 space-y-3 z-50">
                  <div className="absolute left-1/2 lg:left-1/2 bottom-[-0.5rem] lg:top-[-0.5rem] -translate-x-1/2 rotate-45 w-4 h-4 border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] lg:bottom-auto" />
                  <p className="text-sm font-semibold text-[var(--sky-text)] text-center">Domax spaces</p>
                  <div className="grid grid-cols-2 gap-3">
                    {featureMenuItems.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          router.push(item.href)
                          setAppsOpen(false)
                        }}
                        className="rounded-2xl border border-[var(--sky-panel-border)] px-3 py-3 text-left hover:border-[#005ffe]"
                      >
                        <p className="text-sm font-semibold text-[var(--sky-text)] flex items-center gap-2">
                          <CommandIcon name={item.icon} className="h-4 w-4" />
                          {item.label}
                        </p>
                        <p className="text-xs text-[var(--sky-subtle)] mt-1">{item.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative flex-none">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-[var(--sky-panel-border)] px-3 py-2 text-left"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--vscode-accent)] text-xs font-semibold text-white">
                  {teacherInitials}
                </span>
                <div className="hidden xl:flex flex-col">
                  <span className="text-sm font-semibold text-[var(--sky-text)]">{teacher?.name}</span>
                  <span className="text-[10px] text-[var(--sky-subtle)]">{teacher?.email}</span>
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 bottom-full mb-3 lg:top-full lg:bottom-auto lg:mt-3 w-60 rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)] p-4 space-y-2 z-50">
                  <div className="absolute right-6 bottom-[-0.5rem] lg:top-[-0.5rem] rotate-45 w-4 h-4 border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] lg:bottom-auto" />
                  <p className="text-sm font-semibold text-[var(--sky-text)]">{teacher?.name}</p>
                  <p className="text-xs text-[var(--sky-subtle)]">{teacher?.email}</p>
                  <div className="h-px bg-[var(--sky-panel-border)] my-2" />
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard/settings')}
                    className="w-full text-left text-sm text-[var(--sky-text)] hover:text-[#005ffe]"
                  >
                    Account settings
                  </button>
                  <button
                    type="button"
                    className="w-full text-left text-sm text-[var(--sky-text)] hover:text-[#005ffe]"
                  >
                    Switch workspace
                  </button>
                  <button
                    type="button"
                    className="w-full text-left text-sm text-[#e11d48] hover:text-[#ff4d6d]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="lg:hidden rounded-2xl border border-[var(--sky-panel-border)] px-3 py-2 text-[var(--sky-text)]"
              onClick={() => setInsightsOpen(true)}
            >
              <CommandIcon name="insights" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {(appsOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setAppsOpen(false)
            setUserMenuOpen(false)
          }}
          aria-hidden="true"
        />
      )}

      {paletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center px-4 py-24">
          <div className="w-full max-w-2xl rounded-[32px] border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)] p-5 space-y-3">
            <div className="flex items-center gap-3 border border-[var(--sky-panel-border)] rounded-2xl px-4">
              <CommandIcon name="search" className="h-4 w-4 text-[var(--sky-subtle)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent py-3 text-sm text-[var(--sky-text)] placeholder:text-[var(--sky-subtle)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPaletteOpen(false)}
                className="text-xs text-[var(--sky-subtle)] hover:text-[var(--sky-text)]"
              >
                Escape
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-2">
              {filteredCommands.length === 0 && (
                <p className="text-center text-xs text-[var(--sky-subtle)] py-6">No matching commands.</p>
              )}
              {filteredCommands.map((command) => (
                <button
                  key={command.label}
                  type="button"
                  onClick={() => {
                    command.action()
                    setPaletteOpen(false)
                    setQuery('')
                  }}
                  className="w-full text-left rounded-2xl border border-transparent hover:border-[var(--sky-panel-border)] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[var(--sky-text)]">{command.label}</p>
                  <p className="text-xs text-[var(--sky-subtle)]">{command.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {insightsOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0" onClick={() => setInsightsOpen(false)} aria-hidden="true" />
          <div className="relative inset-x-0 bottom-0 rounded-t-[32px] border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-[var(--sky-shadow)] p-5 space-y-4 max-h-[85vh] mt-auto">
            <div className="flex items-center justify-between">
              <p className="sky-label text-[var(--sky-text)]">Insights</p>
              <button type="button" className="text-xs text-[var(--sky-subtle)]" onClick={() => setInsightsOpen(false)}>
                Close
              </button>
            </div>
            <RightPanel variant="overlay" />
          </div>
        </div>
      )}
    </>
  )
}

