// `meta` is still accepted but not shown: the breadcrumb already says where
// you are, and a label above every title added noise.
export default function WorkspaceHeader({ title, subtitle, actions }) {
  return (
    <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[1.875rem] sm:text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] text-[var(--sky-text)]">
          {title}
        </h1>
        {subtitle && <p className="text-[15px] text-[var(--sky-subtle)] mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
    </header>
  )
}
