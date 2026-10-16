import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
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

const faqs = [
  {
    q: 'What counts as one exam?',
    a: 'One student’s complete script for one subject paper, however many questions it has. A class of 40 sitting one paper is 40 exams.',
  },
  {
    q: 'What if a script is longer than the page allowance?',
    a: 'Scripts over the allowance for their level are charged at a higher rate for long or complex exams, which we agree with you before the assessment. You’ll know the price before anything is marked.',
  },
  {
    q: 'Who pays at a public school?',
    a: 'We think it should be a sponsor, such as a district, an NGO or a development partner, rather than the school. The sponsor pays a published cost-plus price per exam, and we show them our margin.',
  },
  {
    q: 'Do students ever pay?',
    a: 'No. Students see their own marked scripts and any material their teacher shares with them for free. That is written into every contract, and access never depends on whether an invoice has been paid.',
  },
  {
    q: 'What does a pilot cost?',
    a: 'We agree that with each pilot site in writing before it starts. The point of a pilot is to find out whether Domax is worth paying for, so we don’t expect you to commit to a full term up front.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">Pricing</h1>
            <p className="lede mt-5">
              You pay per exam marked: one student’s script in one subject. Each level includes a set
              number of pages. Students never pay.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
            <div>
              <table className="w-full text-left">
                <caption className="sr-only">Price per exam by level</caption>
                <thead>
                  <tr className="border-b border-ink text-sm text-ink-3">
                    <th scope="col" className="font-normal pb-3">Level</th>
                    <th scope="col" className="font-normal pb-3">Pages included</th>
                    <th scope="col" className="font-normal pb-3 text-right">Per exam</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAM_PRICES.map((level) => (
                    <tr key={level.key} className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 font-normal text-[17px] text-ink">{level.label}</th>
                      <td className="py-4 pr-4 text-[15px] text-ink-2 tabular-nums">Up to {level.includedPages}</td>
                      <td className="py-4 text-right text-[17px] font-semibold text-ink tabular-nums">
                        {formatRwf(level.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-5 space-y-1.5 text-sm text-ink-3 leading-relaxed">
                <li>Minimum per batch: {formatRwf(BATCH_MINIMUM_RWF)}.</li>
                <li>Primary levels aren’t available yet.</li>
                <li>
                  These are pilot prices. We’ll confirm them with each site once we’ve measured what
                  marking really costs.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-[#FAF8F4] border border-[#ECE7DE] p-6 sm:p-7 self-start">
              <h2 className="text-xl">An example year</h2>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
                A secondary school with {example.students} O-Level students, {example.subjects} subjects
                marked through Domax, {example.terms} terms a year: that’s{' '}
                {new Intl.NumberFormat('en-US').format(exampleExams)} exams.
              </p>
              <p className="mt-4 text-3xl font-headline text-ink tabular-nums">{formatRwf(exampleTotal)}</p>
              <p className="text-sm text-ink-3 mt-1">a year, if the school pays directly</p>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-4">
                At a public school, we’d rather that came from a sponsor so the school pays nothing.
              </p>
            </div>
          </div>

          <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
            <div className="bg-white p-6 sm:p-7">
              <h2 className="text-xl">Universities & polytechnics</h2>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
                Pay per exam directly. Long scripts and lecturer time make the case clearest here.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-7">
              <h2 className="text-xl">Private secondary schools</h2>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
                Pay per exam directly, invoiced per term.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-7">
              <h2 className="text-xl">Public schools</h2>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
                Covered by a sponsor at a published cost-plus price. The school and its students pay
                nothing.{' '}
                <Link href="/solutions/sponsors" className="text-accent underline underline-offset-2">
                  For sponsors
                </Link>
              </p>
            </div>
          </section>

          <section className="mt-20 max-w-3xl">
            <h2 className="text-3xl">Questions</h2>
            <dl className="mt-6 border-t border-line">
              {faqs.map((item) => (
                <div key={item.q} className="py-6 border-b border-line">
                  <dt className="text-lg font-semibold text-ink">{item.q}</dt>
                  <dd className="text-[17px] text-ink-2 leading-relaxed mt-2">{item.a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <Button href="/pilot" variant="primary" size="lg">
                Request a pilot
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
