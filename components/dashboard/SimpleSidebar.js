'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

const icons = {
  home: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  exams: 'M5 6h14M5 12h14M5 18h14M7 12l3 3 7-7',
  submissions: 'M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm7 0v5h5',
  rubrics: 'M7 7h10M7 12h5M7 17h7M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  courses: 'M4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2Zm8 0v10M4 7h16',
  assignments: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z',
  students: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm-10 9v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1',
  papers: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z',
  analytics: 'M3 3v18h18M7 16l4-4 4 4 4-4',
  billing: 'M3 9h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Zm0-3h18v3H3V5Zm4 8h4',
  codes: 'M15 7a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L11 17H9v2H7v2H4a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 1 1 21 9Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
}

// Grouped by what the teacher is doing, not alphabetically.
const navGroups = [
  {
    label: 'Marking',
    items: [
      { label: 'Home', href: '/dashboard', section: 'home', icon: 'home' },
      { label: 'Submissions', href: '/dashboard/submissions', section: 'submissions', icon: 'submissions' },
      { label: 'Exams', href: '/dashboard/exams', section: 'exams', icon: 'exams' },
      { label: 'Upload', href: '/dashboard/upload', section: 'upload', icon: 'upload' },
      { label: 'Rubrics', href: '/dashboard/rubrics', section: 'rubrics', icon: 'rubrics' },
    ],
  },
  {
    label: 'Classes',
    items: [
      { label: 'Students', href: '/dashboard/students', section: 'students', icon: 'students' },
      { label: 'Courses', href: '/dashboard/courses', section: 'courses', icon: 'courses' },
      { label: 'Assignments', href: '/dashboard/assignments', section: 'assignments', icon: 'assignments' },
      { label: 'Past papers', href: '/dashboard/past-papers', section: 'past-papers', icon: 'papers' },
    ],
  },
  {
    label: 'Insights',
    items: [{ label: 'Analytics', href: '/dashboard/analytics', section: 'analytics', icon: 'analytics' }],
  },
  {
    label: 'Account',
    items: [
      { label: 'Billing', href: '/dashboard/billing', section: 'billing', icon: 'billing' },
      { label: 'Access codes', href: '/dashboard/entitlements', section: 'entitlements', icon: 'codes' },
      { label: 'Settings', href: '/dashboard/settings', section: 'settings', icon: 'settings' },
    ],
  },
]

const allItems = navGroups.flatMap((group) => group.items)
const mobilePrimary = ['home', 'submissions', 'exams', 'upload']

const Icon = ({ name, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
)

function isActivePath(pathname, href) {
  // Home is only active on exactly /dashboard
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function SimpleSidebar() {
  const pathname = usePathname()
  const { setCurrentSection } = useDashboardState()
  const { teacher } = useUserState()
  const [isExpanded, setIsExpanded] = useState(true)
  const [moreOpen, setMoreOpen] = useState(false)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sidebarExpanded')
    if (saved !== null) {
      setIsExpanded(saved === 'true')
    }
  }, [])

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', isExpanded.toString())
  }, [isExpanded])

  // Close the mobile sheet with Escape
  useEffect(() => {
    if (!moreOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [moreOpen])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const moreActive = allItems.some((item) => !mobilePrimary.includes(item.section) && isActivePath(pathname, item.href))

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        data-tour="sidebar-menu"
        className={`hidden lg:flex flex-col bg-[var(--sky-panel)] border-r border-[var(--sky-panel-border)] transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-60' : 'w-16'
        }`}
      >
        {/* Brand + collapse toggle */}
        <div className={`flex items-center h-14 border-b border-[var(--sky-panel-border)] transition-all duration-300 ${
          isExpanded ? 'px-4 justify-between' : 'justify-center'
        }`}>
          <Link
            href="/"
            aria-label="Domax home"
            className={`flex items-end -space-x-1 overflow-hidden rounded-md transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
            }`}
          >
            <Image src="/favicon.svg" alt="" width={28} height={28} className="h-6 w-6 flex-shrink-0" />
            <span className="text-[15px] font-bold tracking-tight text-[var(--sky-text)]">OMAX</span>
          </Link>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isExpanded}
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)] transition-colors flex-shrink-0"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Workspace" className="flex-1 py-3 overflow-y-auto">
          {navGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex > 0 ? 'mt-4' : ''}>
              <p
                className={`px-5 mb-1 text-[12px] font-medium text-[var(--sky-subtle)] whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0'
                }`}
              >
                {group.label}
              </p>
              <ul className="space-y-0.5 px-2">
                {group.items.map((item) => {
                  const isActive = isActivePath(pathname, item.href)
                  return (
                    <li key={item.section}>
                      <Link
                        href={item.href}
                        onClick={() => setCurrentSection(item.section)}
                        aria-current={isActive ? 'page' : undefined}
                        title={!isExpanded ? item.label : undefined}
                        className={`w-full flex items-center h-9 rounded-md transition-all duration-200 relative ${
                          isExpanded ? 'px-3 gap-3' : 'justify-center'
                        } ${
                          isActive
                            ? 'bg-[var(--action-accent-soft)] text-[var(--action-accent)] font-semibold'
                            : 'text-[var(--sky-subtle)] font-medium hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
                        }`}
                      >
                        <Icon name={item.icon} className="w-[18px] h-[18px] flex-shrink-0" />
                        <span
                          className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                            isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Signed-in teacher */}
        <div className="border-t border-[var(--sky-panel-border)] p-2">
          <Link
            href="/dashboard/settings"
            title={!isExpanded && teacher?.name ? teacher.name : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isExpanded ? 'px-2 gap-3 h-12' : 'justify-center h-10'
            } text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)] rounded-md`}
          >
            <div className="w-8 h-8 rounded-full bg-[#0A3059] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {teacher?.avatar || teacher?.name?.slice(0, 2)?.toUpperCase() || 'DT'}
            </div>
            <div
              className={`flex-1 min-w-0 text-left transition-all duration-300 ${
                isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
              }`}
            >
              <p className="text-sm font-semibold text-[var(--sky-text)] truncate">
                {teacher?.name || 'User'}
              </p>
              <p className="text-xs text-[var(--sky-subtle)] truncate">
                {teacher?.email || 'user@example.com'}
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile bottom navigation: four primary destinations + "More" */}
      <nav aria-label="Workspace" className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--sky-panel)] border-t border-[var(--sky-panel-border)] z-40 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-stretch justify-around h-16 px-1">
          {mobilePrimary
            .map((section) => allItems.find((item) => item.section === section))
            .filter(Boolean)
            .map((item) => {
              const isActive = isActivePath(pathname, item.href)
              return (
                <Link
                  key={item.section}
                  href={item.href}
                  onClick={() => setCurrentSection(item.section)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
                    isActive ? 'text-[var(--action-accent)]' : 'text-[var(--sky-subtle)]'
                  }`}
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={moreOpen}
            className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
              moreActive ? 'text-[var(--action-accent)]' : 'text-[var(--sky-subtle)]'
            }`}
          >
            <Icon name="more" className="w-5 h-5" />
            <span className="text-[11px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile "More" sheet — every section, grouped like the desktop sidebar */}
      {moreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true" aria-label="All sections">
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(10,22,38,0.45)]"
            aria-label="Close"
            onClick={() => setMoreOpen(false)}
          />
          <div className="relative w-full max-h-[80vh] overflow-y-auto rounded-t-2xl bg-[var(--sky-panel)] border-t border-[var(--sky-panel-border)] px-3 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-sm font-semibold text-[var(--sky-text)]">All sections</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="h-8 px-2 rounded-md text-sm text-[var(--sky-subtle)] hover:text-[var(--sky-text)]"
              >
                Close
              </button>
            </div>
            {navGroups.map((group) => (
              <div key={group.label} className="mt-2">
                <p className="px-2 mb-1 text-[12px] font-medium text-[var(--sky-subtle)]">{group.label}</p>
                <ul className="grid grid-cols-2 gap-1">
                  {group.items.map((item) => {
                    const isActive = isActivePath(pathname, item.href)
                    return (
                      <li key={item.section}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            setCurrentSection(item.section)
                            setMoreOpen(false)
                          }}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-2.5 h-11 px-3 rounded-lg text-sm ${
                            isActive
                              ? 'bg-[var(--action-accent-soft)] text-[var(--action-accent)] font-semibold'
                              : 'text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
                          }`}
                        >
                          <Icon name={item.icon} className="w-[18px] h-[18px]" />
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
