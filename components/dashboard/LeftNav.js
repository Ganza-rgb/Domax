'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'

const navItems = [
  { label: 'Home', href: '/dashboard', section: 'home' },
  { label: 'Exams', href: '/dashboard/exams', section: 'exams' },
  { label: 'Submissions', href: '/dashboard/submissions', section: 'submissions' },
  { label: 'Students', href: '/dashboard/students', section: 'students' },
  { label: 'Past Papers', href: '/dashboard/past-papers', section: 'past-papers' },
  { label: 'Billing', href: '/dashboard/billing', section: 'billing' },
  { label: 'Settings', href: '/dashboard/settings', section: 'settings' },
]

export default function LeftNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentSection, setCurrentSection } = useDashboardState()

  const handleNavigate = (item) => {
    setCurrentSection(item.section)
    router.push(item.href)
  }

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 border-r border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
      <div className="px-6 pt-8 pb-6 border-b border-[var(--sky-panel-border)]">
        <p className="sky-label">Workspace</p>
        <h2 className="text-2xl font-semibold text-[var(--sky-text)] mt-3">Domax Teacher</h2>
        <p className="text-sm text-[var(--sky-subtle)] mt-1">Action-driven grading cockpit</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || currentSection === item.section
          return (
            <button
              key={item.section}
              type="button"
              onClick={() => handleNavigate(item)}
              className={`w-full text-left px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#005ffe] to-[#0047cc] text-white shadow-[0_20px_40px_-25px_rgba(0,71,204,0.8)]'
                  : 'text-[var(--sky-text)] hover:bg-[var(--sky-surface)]'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="px-4 pb-6 space-y-3">
        <Link
          href="/dashboard/submissions"
          className="block rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] px-4 py-3 text-sm text-[var(--sky-text)] font-semibold hover:border-[#005ffe]"
        >
          Jump to grading queue
        </Link>
        <p className="text-xs text-[var(--sky-subtle)] px-1">
          Use the palette (<kbd className="px-1.5 py-0.5 rounded bg-[var(--sky-surface)]">⌘K</kbd>) to open anything faster.
        </p>
      </div>
    </aside>
  )
}

