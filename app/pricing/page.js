import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import PageHero from '@/components/site/PageHero'
import ClosingCta from '@/components/site/ClosingCta'
import Reveal from '@/components/site/Reveal'
import { Tick } from '@/components/site/ProductVisuals'
import { EXAM_PRICES, BATCH_MINIMUM_RWF, formatRwf } from '@/lib/site'

export const metadata = {
  title: 'Pricing — Domax',
  description:
    'Domax charges per student, per subject exam, with a page allowance for each level. Public schools can be covered by a sponsor. Students never pay.',
}

// Worked example: one O-Level school year.
const example = { students: 600, subjects: 5, terms: 3 }
const examplePrice = EXAM_PRICES.find((level) => level.key === 'o-level').price
const exampleExams = example.students * example.subjects * example.terms
const exampleTotal = exampleExams * examplePrice

const included = [
  'Page and identity checks on every script',
  'Suggested marks with the evidence shown',
  'Teacher review and sign-off',
  'Mark sheets set out for CAMIS',
  'Free results for every student',
]

const payers = [
  { title: 'Universities & polytechnics', copy: 'Pay per exam directly, invoiced per batch.' },
  { title: 'Private secondary schools', copy: 'Pay per exam directly, invoiced per term.' },
  {
    title: 'Public schools',
    copy: 'Covered by a sponsor at a published cost-plus price, so the school and its students pay nothing.',
    href: '/solutions/sponsors',
  },
]

const faqs = [
  {
    q: 'What counts as one exam?',
    a: 'One student’s complete script for one subject paper, however many questions it has. A class of 40 sitting one paper is 40 exams.',
  },
  {
    q: 'What if a script is longer than the page allowance?',
    a: 'Longer or unusually complex exams are charged at a higher rate, which we agree with you before the assessment. You’ll know the price before anything is marked.',
  },
  {
    q: 'Who pays at a public school?',
    a: 'We think it should be a sponsor, such as a district, an NGO or a development partner, rather than the school. The sponsor pays a published cost-plus price per exam, and we show them our margin.',
  },
  {
    q: 'Do students ever pay?',
    a: 'No. Students see their own marked scripts, and anything their teacher shares with them, for free. That is written into every contract, and access never depends on whether an invoice has been paid.',
  },
  {
    q: 'What does a pilot cost?',
    a: 'We agree that with each pilot site in writing before it starts. The point of a pilot is to find out whether Domax is worth paying for, so we don’t ask you to commit to a full term up front.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        kicker="Pricing"
        title="Pay per exam. Students never pay."
        lede="One price for one student’s script in one subject, with a page allowance for each level. These are pilot prices; we confirm them with each site once we’ve measured what marking really costs."
      />

      <Reveal>
        <div className="container-custom">
          <ul data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXAM_PRICES.map((level) => (
              <li key={level.key} className="rounded-[24px] border border-line p-7 sm:p-8 flex flex-col">
                <h2 className="text-xl leading-tight">{level.label}</h2>
                <p className="mt-8 font-headline text-[clamp(2.75rem,5vw,3.5rem)] font-semibold tracking-[-0.045em] leading-none text-ink tabular-nums">
                  {formatRwf(level.price)}
                </p>
                <p className="text-[15px] text-ink-2 mt-3">per student, per exam</p>
                <p className="mt-8 pt-5 border-t border-line text-[15px] text-ink">
                  Up to <span className="font-semibold tabular-nums">{level.includedPages}</span> pages included
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] text-ink-3">
            Minimum per batch: {formatRwf(BATCH_MINIMUM_RWF)}. Primary levels aren’t available yet.
          </p>
        </div>

        <section className="container-custom py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div data-reveal className="rounded-[24px] bg-canvas p-7 sm:p-10">
            <h2 className="text-2xl">Every exam includes</h2>
            <ul className="mt-6 space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] text-ink">
                  <Tick className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="on-dark rounded-[24px] bg-[#071A33] p-7 sm:p-10 text-white flex flex-col">
            <p className="text-[13px] font-semibold text-[#8db8ff]">An example year</p>
            <p className="text-[17px] text-white/75 leading-relaxed mt-4">
              A secondary school with {example.students} O-Level students, {example.subjects} subjects marked
              through Domax, {example.terms} terms: {new Intl.NumberFormat('en-US').format(exampleExams)} exams.
            </p>
            <p className="mt-auto pt-10 font-headline text-[clamp(2.5rem,5vw,3.75rem)] font-semibold tracking-[-0.045em] leading-none tabular-nums">
              {formatRwf(exampleTotal)}
            </p>
            <p className="text-[15px] text-white/60 mt-3">
              a year if the school pays directly. At a public school, we’d rather a sponsor paid.
            </p>
          </div>
        </section>

        <section className="container-custom pb-20 sm:pb-28">
          <h2 data-reveal className="max-w-2xl">Who pays depends on where you teach.</h2>
          <ul data-reveal data-reveal-stagger className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {payers.map((item) => (
              <li key={item.title} className="rounded-[20px] border border-line p-7">
                <h3 className="text-xl">{item.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-2">{item.copy}</p>
                {item.href && (
                  <Link href={item.href} className="link inline-block mt-4 text-[15px]">
                    For sponsors
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="container-custom pb-24 sm:pb-28 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <h2 data-reveal>Questions</h2>
          <div data-reveal className="border-t border-line">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-line-strong flex items-center justify-center text-ink-2 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-[17px] text-ink-2 leading-relaxed pb-6 pr-12">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      <ClosingCta />
      <Footer />
    </main>
  )
}
