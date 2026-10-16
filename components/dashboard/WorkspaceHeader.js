export default function WorkspaceHeader({ title, subtitle, actions, meta }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {meta && <p className="sky-label mb-1.5">{meta}</p>}
        <h1 className="text-[1.625rem] sm:text-[1.875rem] leading-tight font-semibold tracking-[-0.02em] text-[var(--sky-text)]">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[var(--sky-subtle)] mt-1.5 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
    </header>
  )
}
