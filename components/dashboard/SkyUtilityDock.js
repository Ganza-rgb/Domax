'use client'

import { useRouter } from 'next/navigation'

const actionIcons = {
  grade: 'M5 20l4-4h6l4 4M12 4l3 6h-6l3-6Zm0 6v6',
  exam: 'M5 5h14v14H5V5Zm0 4h14M9 3v4M15 3v4',
  billing: 'M3 8h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Zm0-3h18v3H3V5Zm4 8h4',
}

const actions = [
  { label: 'Grade next', icon: 'grade', href: '/dashboard/submissions' },
  { label: 'New exam', icon: 'exam', href: '/dashboard/exams' },
  { label: 'Top-up', icon: 'billing', href: '/dashboard/billing' },
]

const Icon = ({ name, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={actionIcons[name]} />
  </svg>
)

export default function SkyUtilityDock() {
  const router = useRouter()

  return (
    <>
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => router.push(action.href)}
            className="rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-4 py-3 text-left text-[var(--sky-text)] shadow-[var(--sky-shadow)] hover:border-[#005ffe]"
          >
            <Icon name={action.icon} className="h-5 w-5" />
            <p className="text-xs font-semibold mt-1">{action.label}</p>
          </button>
        ))}
      </div>

      <div className="lg:hidden fixed inset-x-4 bottom-24 z-40 rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] px-3 py-2 flex items-center justify-between shadow-[var(--sky-shadow)] gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => router.push(action.href)}
            className="flex-1 rounded-2xl px-3 py-2 text-[var(--sky-text)] text-center"
          >
            <Icon name={action.icon} className="h-5 w-5 mx-auto" />
            <span className="text-[11px] font-semibold block mt-0.5">{action.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

