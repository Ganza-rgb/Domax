export default function WorkspaceHeader({ title, subtitle, actions, meta }) {
  return (
    <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        {meta && <p className="sky-label">{meta}</p>}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--sky-text)]">{title}</h1>
        {subtitle && <p className="text-sm sm:text-base text-[var(--sky-subtle)] mt-2">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  )
}

