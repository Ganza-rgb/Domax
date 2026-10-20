import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import PageHero from '@/components/site/PageHero'
import ClosingCta from '@/components/site/ClosingCta'
import Reveal from '@/components/site/Reveal'
import { Tick } from '@/components/site/ProductVisuals'

export const metadata = {
  title: 'About — Domax',
  description: 'Why Domax exists, where it is now, and the rules it is built on.',
}

// Where Domax is on its way to general availability. Update `current` as
// each stage completes.
const roadmap = [
  { title: 'Legal and data groundwork', copy: 'NCSA registration, a data protection impact assessment, storage in Rwanda, and agreements with pilot sites.' },
  { title: 'Past scripts, nothing at stake', copy: 'Domax marks consented past scripts alongside two experienced teachers, so we can measure agreement by question type.' },
  { title: 'One live assessment', copy: 'Teachers mark a real assessment with Domax and sign every mark. We measure the time it takes against marking by hand.' },
  { title: 'A full term', copy: 'A paid term at the first sites, with results reported to the institution and its sponsor.' },
  { title: 'More institutions', copy: 'Only once the numbers hold across subjects and at least three institutions, including one rural school.' },
]
const current = 0

const principles = [
  { title: 'A teacher gives every mark', copy: 'Domax suggests. Teachers decide, and sign. We don’t release AI-only marks, and we aren’t working towards it.' },
  { title: 'Students never pay for their own results', copy: 'Whoever pays for marking, students see their marked scripts for free. Access never depends on whether an invoice has been paid.' },
  { title: 'Pages are checked, not guessed', copy: 'Which student a page belongs to, and whether a script is complete, comes from the header sheet. It is never inferred by AI.' },
  { title: 'We publish what we measure', copy: 'No borrowed accuracy figures, no promised savings we haven’t measured. When pilots produce numbers, we’ll publish them, including the bad ones.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        kicker="About Domax"
        title="Marking help for teachers in Rwanda, with the marking left in their hands."
      />

      <Reveal>
        <section className="container-custom pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <h2 data-reveal>Why we started</h2>
          <div data-reveal className="space-y-5 text-[19px] text-ink-2 leading-relaxed">
            <p>
              In Rwanda there are about 38 secondary students for every teacher, and about 65 in primary.
              At the end of every term the marking lands on those teachers, mostly in evenings nobody pays
              them for. Some pay colleagues out of their own pocket to keep up.
            </p>
            <p>
              Reading handwriting and checking it against a marking scheme is something software can now
              help with, cheaply. What it can’t do is take responsibility for a student’s result. So Domax
              does the first read and the paperwork, and leaves the judgement to the teacher.
            </p>
          </div>
        </section>

        <section className="bg-canvas py-20 sm:py-28">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div data-reveal>
              <h2>Where we are</h2>
              <p className="text-[17px] text-ink-2 leading-relaxed mt-5 max-w-sm">
                We’re at the start, and we’d rather say so. Each stage has to pass before the next begins.
              </p>
            </div>
            <ol data-reveal data-reveal-stagger className="relative">
              {roadmap.map((stage, index) => {
                const done = index < current
                const now = index === current
                return (
                  <li key={stage.title} className="relative pl-12 pb-10 last:pb-0">
                    {index < roadmap.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[11px] top-7 bottom-0 w-px bg-line-strong" />
                    )}
                    <span className="absolute left-0 top-0.5" aria-hidden="true">
                      {done ? (
                        <Tick className="w-6 h-6" />
                      ) : (
                        <span
                          className={`block w-6 h-6 rounded-full border-2 ${
                            now ? 'border-accent bg-white shadow-[0_0_0_5px_rgba(0,95,254,0.12)]' : 'border-line-strong bg-white'
                          }`}
                        />
                      )}
                    </span>
                    <p className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xl font-headline font-semibold tracking-[-0.02em] text-ink">{stage.title}</span>
                      {now && (
                        <span className="rounded-full bg-accent-soft text-accent-strong text-[12px] font-semibold px-2.5 py-0.5">
                          Now
                        </span>
                      )}
                    </p>
                    <p className="text-[16px] text-ink-2 leading-relaxed mt-1.5 max-w-lg">{stage.copy}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="container-custom py-20 sm:py-28">
          <h2 data-reveal className="max-w-2xl">What we hold ourselves to</h2>
          <ul data-reveal data-reveal-stagger className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((item) => (
              <li key={item.title} className="rounded-[24px] border border-line p-7 sm:p-9">
                <Tick className="w-6 h-6" />
                <h3 className="text-xl mt-5">{item.title}</h3>
                <p className="text-[16px] text-ink-2 leading-relaxed mt-2">{item.copy}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <ClosingCta />
      <Footer />
    </main>
  )
}
