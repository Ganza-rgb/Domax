'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'

// Simple icons - VS Code style
const icons = {
  home: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  exams: 'M5 6h14M5 12h14M5 18h14M7 12l3 3 7-7',
  submissions: 'M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm7 0v5h5',
  rubrics: 'M7 7h10M7 12h5M7 17h7M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  courses: 'M4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2Zm8 0v10M4 7h16',
  assignments: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z',
  students: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm-10 9v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1',
  analytics: 'M3 3v18h18M7 16l4-4 4 4 4-4',
  billing: 'M3 9h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Zm0-3h18v3H3V5Zm4 8h4',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z',
}

const navItems = [
  { label: 'Home', href: '/dashboard', section: 'home', icon: 'home' },
  { label: 'Upload', href: '/dashboard/upload', section: 'upload', icon: 'upload' },
  { label: 'Exams', href: '/dashboard/exams', section: 'exams', icon: 'exams' },
  { label: 'Submissions', href: '/dashboard/submissions', section: 'submissions', icon: 'submissions' },
  { label: 'Rubrics', href: '/dashboard/rubrics', section: 'rubrics', icon: 'rubrics' },
  { label: 'Courses', href: '/dashboard/courses', section: 'courses', icon: 'courses' },
  { label: 'Assignments', href: '/dashboard/assignments', section: 'assignments', icon: 'assignments' },
  { label: 'Students', href: '/dashboard/students', section: 'students', icon: 'students' },
  { label: 'Analytics', href: '/dashboard/analytics', section: 'analytics', icon: 'analytics' },
  { label: 'Billing', href: '/dashboard/billing', section: 'billing', icon: 'billing' },
  { label: 'Settings', href: '/dashboard/settings', section: 'settings', icon: 'settings' },
]

const Icon = ({ name, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={icons[name]} />
  </svg>
)

export default function SimpleSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const { teacher } = useUserState()
  const [isExpanded, setIsExpanded] = useState(true)

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

  const handleNavigate = (item) => {
    setCurrentSection(item.section)
    router.push(item.href)
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Desktop Sidebar - VS Code style with toggle */}
      <aside
        data-tour="sidebar-menu"
        className={`hidden lg:flex flex-col bg-[var(--sky-panel)] border-r border-[var(--sky-panel-border)] transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Top section - Menu toggle */}
        <div className={`flex items-center h-12 border-b border-[var(--sky-panel-border)] transition-all duration-300 ${
          isExpanded ? 'px-4 justify-between' : 'justify-center'
        }`}>
          <button
            type="button"
            onClick={toggleSidebar}
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            className="flex items-center justify-center w-8 h-8 rounded text-[var(--sky-text)] hover:bg-[var(--sky-surface)] transition-colors flex-shrink-0"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <span
            className={`text-sm font-semibold text-[var(--sky-text)] whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
            }`}
          >
            Domax
          </span>
        </div>

        {/* Navigation items - VS Code style */}
        <nav className="flex-1 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            // Special handling for home route - only active when exactly /dashboard
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <button
                key={item.section}
                type="button"
                onClick={() => handleNavigate(item)}
                title={!isExpanded ? item.label : undefined}
                className={`w-full flex items-center h-12 transition-all duration-200 relative group ${
                  isExpanded ? 'px-4 gap-3' : 'justify-center'
                } ${
                  isActive
                    ? 'text-[#005ffe]'
                    : 'text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#005ffe]" />
                )}
                <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                    isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom section - User profile */}
        <div className="border-t border-[var(--sky-panel-border)] p-2">
          <button
            type="button"
            title={!isExpanded && teacher?.name ? teacher.name : undefined}
            className={`w-full flex items-center transition-all duration-200 ${
              isExpanded ? 'px-2 gap-3 h-12' : 'justify-center h-10'
            } text-[var(--sky-subtle)] hover:text-[var(--sky-text)] hover:bg-[var(--sky-surface)] rounded`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005ffe] to-[#0047cc] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
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
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Most important pages */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--sky-panel)] border-t border-[var(--sky-panel-border)] z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            navItems.find((i) => i.section === 'home'),
            navItems.find((i) => i.section === 'upload'),
            navItems.find((i) => i.section === 'submissions'),
            navItems.find((i) => i.section === 'exams'),
            navItems.find((i) => i.section === 'analytics'),
          ]
            .filter(Boolean)
            .map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => handleNavigate(item)}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    isActive
                      ? 'text-[#005ffe]'
                      : 'text-[var(--sky-subtle)]'
                  }`}
                >
                  <Icon name={item.icon} className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              )
            })}
        </div>
      </nav>
    </>
  )
}

