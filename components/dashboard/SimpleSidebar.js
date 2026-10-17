'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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

// Five places, named the way a teacher would say them. Each exam carries its
// own steps (prepare, collect, mark, release), so they don't need sections here.
const navItems = [
  { label: 'Today', href: '/dashboard', icon: 'home' },
  { label: 'Exams', href: '/dashboard/exams', icon: 'exams' },
  { label: 'Rubrics', href: '/dashboard/rubrics', icon: 'rubrics' },
  { label: 'Classes', href: '/dashboard/classes', icon: 'students' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
]

const Icon = ({ name, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
)

function isActivePath(pathname, href) {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function SimpleSidebar() {
  const pathname = usePathname()
  const { teacher } = useUserState()
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebarExpanded')
      if (saved !== null) setIsExpanded(saved === 'true')
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('sidebarExpanded', isExpanded.toString())
    } catch {}
  }, [isExpanded])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        data-tour="sidebar-menu"
        className={`hidden lg:flex flex-col bg-[var(--sky-panel)] border-r border-[var(--sky-panel-border)] transition-[width] duration-300 ease-in-out ${
          isExpanded ? 'w-56' : 'w-16'
        }`}
      >
        <div className={`flex items-center h-14 border-b border-[var(--sky-panel-border)] ${isExpanded ? 'px-4 justify-between' : 'justify-center'}`}>
          <Link
            href="/"
            aria-label="Domax home"
            className={`flex items-end -space-x-1 overflow-hidden rounded-md transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}
          >
            <Image src="/favicon.svg" alt="" width={28} height={28} className="h-6 w-6 flex-shrink-0" />
            <span className="text-[15px] font-bold tracking-tight text-[var(--sky-text)]">OMAX</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
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

        <nav aria-label="Workspace" className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    title={!isExpanded ? item.label : undefined}
                    className={`w-full flex items-center h-10 rounded-lg transition-colors ${isExpanded ? 'px-3 gap-3' : 'justify-center'} ${
                      isActive
                        ? 'bg-[var(--action-accent-soft)] text-[var(--action-accent)] font-semibold'
                        : 'text-[var(--sky-subtle)] font-medium hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
                    }`}
                  >
                    <Icon name={item.icon} className="w-[19px] h-[19px] flex-shrink-0" />
                    <span className={`text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-[var(--sky-panel-border)] p-2">
          <Link
            href="/dashboard/settings"
            title={!isExpanded && teacher?.name ? teacher.name : undefined}
            className={`w-full flex items-center ${isExpanded ? 'px-2 gap-3 h-12' : 'justify-center h-10'} text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)] rounded-lg`}
          >
            <div className="w-8 h-8 rounded-full bg-[#0A3059] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {teacher?.avatar || 'DT'}
            </div>
            <div className={`flex-1 min-w-0 text-left transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'}`}>
              <p className="text-sm font-semibold text-[var(--sky-text)] truncate">{teacher?.name}</p>
              <p className="text-xs text-[var(--sky-subtle)] truncate">{teacher?.school}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Phone: all five places as tabs at the bottom */}
      <nav aria-label="Workspace" className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--sky-panel)] border-t border-[var(--sky-panel-border)] z-40 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-stretch justify-around h-16 px-1">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${isActive ? 'text-[var(--action-accent)]' : 'text-[var(--sky-subtle)]'}`}
              >
                <Icon name={item.icon} className="w-5 h-5" />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
