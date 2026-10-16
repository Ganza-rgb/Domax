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
        {/* Paper stays paper in either theme. No scan images exist in the data
            yet, so the sheet is labelled rather than faked. */}
        <div className="paper relative aspect-[3/4] w-full rounded-md border border-[#E7E0D3] shadow-[0_8px_20px_-14px_rgba(10,48,89,0.45)] flex flex-col items-center justify-center gap-1 text-center px-6">
          <span aria-hidden="true" className="absolute left-8 top-0 bottom-0 w-px bg-[#EBB3B3]" />
          <p className="relative text-sm font-semibold text-[#0A3059] bg-[#fdfcf8] px-2">{current?.label}</p>
          <p className="relative text-xs text-[#5B6B82] bg-[#fdfcf8] px-2">The scanned page will appear here.</p>
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
              <span className="block aspect-[3/4] rounded-sm border border-[#E7E0D3] bg-[#fdfcf8] mb-1" aria-hidden="true" />
              {page.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
