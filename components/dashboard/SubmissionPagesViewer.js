'use client'

export default function SubmissionPagesViewer({ pages = [], activePage, onSelectPage }) {
  if (!pages.length) {
    return (
      <div className="sky-card border-dashed text-center text-sm text-[var(--sky-subtle)]">
        No pages detected for this submission.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {pages.map((page) => {
        const isActive = page.id === activePage
        return (
          <button
            key={page.id}
            type="button"
            onClick={() => onSelectPage(page.id)}
            className={`rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition-all ${
              isActive
                ? 'border-[#005ffe] bg-[#005ffe]/10 text-[var(--sky-text)]'
                : 'border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[var(--sky-text)] hover:border-[#b9c6ff]'
            }`}
          >
            <div className="h-32 rounded-xl bg-[var(--sky-surface)]/60 border border-dashed border-[var(--sky-panel-border)] flex items-center justify-center text-[var(--sky-subtle)] text-[10px]">
              {page.label}
            </div>
            <p className="mt-2 text-[var(--sky-text)]">{page.label}</p>
          </button>
        )
      })}
    </div>
  )
}

