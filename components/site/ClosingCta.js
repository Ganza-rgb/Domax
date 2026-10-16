import Button from '@/components/atoms/Button'

/** The dark closing band used at the end of inner pages. */
export default function ClosingCta({
  title = 'Be one of the first pilot sites.',
  copy = 'Tell us about your institution, the subjects you’d like to try, and roughly how many scripts you mark each term.',
}) {
  return (
    <section className="container-custom pb-24 sm:pb-28">
      <div className="on-dark rounded-[28px] bg-[#071A33] px-7 py-14 sm:px-14 sm:py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
        <div className="max-w-xl">
          <h2 className="text-white text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-0.035em]">{title}</h2>
          <p className="text-white/70 text-[17px] leading-relaxed mt-5">{copy}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/pilot" variant="inverse" size="2xl">
            Request a pilot
          </Button>
        </div>
      </div>
    </section>
  )
}
