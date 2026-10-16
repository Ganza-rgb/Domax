'use client'

/**
 * Page navigator for a scanned script. Pages currently have no image source
 * in the data, so each page is shown as a labelled sheet.
 */
export default function SubmissionPagesViewer({ pages = [], activePage, onSelectPage }) {
  if (!pages.length) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--sky-panel-border)] px-4 py-8 text-center text-sm text-[var(--sky-subtle)]">
        No pages detected for this submission.
      </div>
    )
  }

  const index = Math.max(0, pages.findIndex((page) => page.id === activePage))
  const current = pages[index]

  return (
    <div className="space-y-3">
      {/* Current page */}
      <div className="rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] p-3">
        <div className="aspect-[3/4] w-full rounded-md bg-[var(--sky-panel)] border border-[var(--sky-panel-border)] flex flex-col items-center justify-center gap-1 text-[var(--sky-subtle)]">
          <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm7 0v5h5" />
          </svg>
          <p className="text-sm font-medium text-[var(--sky-text)]">{current?.label}</p>
          <p className="text-xs">Scan preview unavailable</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectPage(pages[index - 1].id)}
            disabled={index === 0}
            className="h-8 px-2.5 rounded-md border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[13px] font-medium text-[var(--sky-text)] hover:bg-[var(--sky-surface)] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <p className="text-[13px] text-[var(--sky-subtle)] tabular-nums" aria-live="polite">
            Page {index + 1} of {pages.length}
          </p>
          <button
            type="button"
            onClick={() => onSelectPage(pages[index + 1].id)}
            disabled={index === pages.length - 1}
            className="h-8 px-2.5 rounded-md border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[13px] font-medium text-[var(--sky-text)] hover:bg-[var(--sky-surface)] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2" role="group" aria-label="Pages">
        {pages.map((page) => {
          const isActive = page.id === activePage
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onSelectPage(page.id)}
              aria-pressed={isActive}
              className={`rounded-md border px-1.5 py-1.5 text-center text-[11px] font-medium transition-all ${
                isActive
                  ? 'border-[var(--action-accent)] bg-[var(--action-accent-soft)] text-[var(--action-accent)]'
                  : 'border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-[var(--sky-subtle)] hover:border-[var(--action-accent)]'
              }`}
            >
              <span className="block aspect-[3/4] rounded-sm bg-[var(--sky-surface)] mb-1" aria-hidden="true" />
              {page.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
