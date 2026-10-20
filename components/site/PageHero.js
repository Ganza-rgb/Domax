/**
 * Opening block for inner pages: a kicker, a large heading, an intro and
 * optional actions, over the same soft blue wash as the homepage hero.
 */
export default function PageHero({ kicker, title, lede, children, align = 'left' }) {
  const centered = align === 'center'
  return (
    <section className="relative pt-32 sm:pt-40 pb-14 sm:pb-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(60%_70%_at_30%_0%,#E8F0FF_0%,rgba(232,240,255,0)_100%)]"
      />
      <div className={`container-custom relative ${centered ? 'text-center' : ''}`}>
        <div className={centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.04em] text-ink mt-4">{title}</h1>
          {lede && <p className={`lede mt-6 ${centered ? 'mx-auto' : ''} max-w-2xl`}>{lede}</p>}
          {children && (
            <div className={`mt-9 flex flex-wrap items-center gap-3 ${centered ? 'justify-center' : ''}`}>{children}</div>
          )}
        </div>
      </div>
    </section>
  )
}
