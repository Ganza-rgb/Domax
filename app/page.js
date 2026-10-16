'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'

const steps = [
  {
    title: 'Photograph the scripts',
    copy: 'Use a phone or a scanner. Blurry or cut-off pages are caught while you’re still holding the paper, and capture keeps working without a connection.',
  },
  {
    title: 'Every page is checked',
    copy: 'A header sheet on each script tells Domax whose it is and how many pages it should have. Missing, repeated or swapped pages are shown to you, never guessed.',
  },
  {
    title: 'A first read against your scheme',
    copy: 'Each answer gets a suggested mark for every point in your marking scheme, with the part of the answer it was given for. Anything unclear goes to you.',
  },
  {
    title: 'You review and sign off',
    copy: 'Work through the answers in order of risk. Accept a mark, change it, or mark it yourself. Nothing is released until you sign.',
  },
  {
    title: 'Release and record',
    copy: 'Students see their marked scripts for free, and you get mark sheets set out for entry into CAMIS.',
  },
]

const audiences = [
  {
    title: 'Universities & polytechnics',
    copy: 'Long scripts, large cohorts, and lecturers whose time is expensive. This is where our pilots start.',
    href: '/solutions/universities',
  },
  {
    title: 'Secondary schools',
    copy: 'O-Level and A-Level assessments, with student data handled through the school and parents told up front.',
    href: '/solutions/schools',
  },
  {
    title: 'Sponsors & districts',
    copy: 'Fund marking support for public schools at a published cost-plus price, so schools and students pay nothing.',
    href: '/solutions/sponsors',
  },
]

const commitments = [
  'No mark reaches a student until a teacher has signed it.',
  'Students never pay to see their own results.',
  'Student names are masked before any page is read by AI.',
  'Scripts are stored in Rwanda, under Law 058/2021.',
  'Appeals go to a teacher, who can see exactly why a mark was suggested.',
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,32rem)] gap-14 lg:gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] text-ink">
              Domax reads the scripts first. You decide every mark.
            </h1>
            <p className="lede mt-6">
              Photograph your students’ answer scripts. Domax checks every page is in the right place,
              suggests a mark for each answer against your marking scheme, and shows you where in the
              answer it found the evidence. You approve or change each one before anything is released.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/pilot" variant="primary" size="xl">
                Bring Domax to your institution
              </Button>
              <Link
                href="/how-it-works"
                className="text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                How it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-3">
              We’re choosing our first pilot sites in Rwanda now: universities, polytechnics and
              secondary schools.
            </p>
          </div>

          <ReviewCard />
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-24 border-t border-line">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl">From a pile of paper to marks you’ve signed</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-4">
              Domax works with the scripts you already have: handwritten, on paper, in English,
              French or Kinyarwanda.
            </p>
          </div>
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink pt-5">
                <p className="text-sm text-ink-3 tabular-nums">{index + 1}</p>
                <h3 className="text-lg mt-1">{step.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-2.5">{step.copy}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/how-it-works"
            className="inline-block mt-10 text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            Read the full walkthrough
          </Link>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-20 sm:py-24 bg-[#FAF8F4] border-y border-[#ECE7DE]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl">What we’ve promised before we’ve marked a single script</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-5">
              These go into every contract we sign, with schools, universities and sponsors alike.
            </p>
            <Link
              href="/data-protection"
              className="inline-block mt-6 text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              How we handle student data
            </Link>
          </div>
          <ul className="divide-y divide-[#E4DED3] border-y border-[#E4DED3]">
            {commitments.map((item) => (
              <li key={item} className="py-4 text-[17px] text-ink leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-20 sm:py-24">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl">Who it’s for</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
            {audiences.map((audience) => (
              <Link key={audience.href} href={audience.href} className="group bg-white p-6 sm:p-7 hover:bg-canvas transition-colors">
                <h3 className="text-xl group-hover:text-accent">{audience.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-3">{audience.copy}</p>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-3">
            Primary school marking will come later. Young children’s handwriting is the hardest to read
            reliably, and we would rather get it right than get it early.
          </p>
        </div>
      </section>

      {/* Pilot */}
      <section className="py-20 sm:py-24 border-t border-line">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl">How a pilot works</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-5">
              We don’t ask you to take accuracy on trust. A pilot runs for about a term. It starts on
              past scripts, where nothing is at stake, and only moves to a live assessment once the
              numbers say it should.
            </p>
          </div>
          <ol className="space-y-7">
            <li>
              <h3 className="text-lg">Past scripts first</h3>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-1.5">
                Two of your experienced teachers mark a set of past scripts independently, and Domax
                marks the same set. We compare Domax against them, and them against each other. Teachers
                are paid for this time.
              </p>
            </li>
            <li>
              <h3 className="text-lg">Then one real assessment</h3>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-1.5">
                Your teachers mark one live assessment with Domax and sign off every mark. We time the
                work against marking by hand.
              </p>
            </li>
            <li>
              <h3 className="text-lg">You get the results, either way</h3>
              <p className="text-[15px] text-ink-2 leading-relaxed mt-1.5">
                Time saved, how often teachers changed a suggested mark, and how close Domax came to
                your markers, broken down by question type. If it isn’t good enough for a type of
                question, we won’t offer it for that type.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Close */}
      <section className="pb-24 sm:pb-28">
        <div className="container-custom">
          <div className="rounded-lg bg-[#0A3059] text-white px-6 py-12 sm:px-12 sm:py-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl text-white">Want to be one of the first pilot sites?</h2>
              <p className="text-white/75 mt-4 leading-relaxed">
                Tell us about your institution, the subjects you’d like to try, and roughly how many
                scripts you mark each term. We’ll get back to you to talk it through.
              </p>
            </div>
            <Button href="/pilot" variant="primary-blue" size="xl">
              Request a pilot
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* The review screen in miniature: a scanned answer beside the marking scheme.
   Selecting a scheme point highlights the part of the answer it was given for. */
const MAX_MARK = 6

const schemePoints = [
  { id: 'burst', text: 'Cell swells and bursts', awarded: true },
  { id: 'osmosis', text: 'Water enters by osmosis', awarded: true },
  { id: 'membrane', text: 'Across a partially permeable membrane', awarded: true },
  { id: 'wall', text: 'No cell wall to resist bursting', awarded: true },
  { id: 'direction', text: 'Water moves from dilute to concentrated solution', awarded: false, note: 'Direction stated, but not in terms of solution concentration' },
  { id: 'term', text: 'Names haemolysis', awarded: false, note: 'Not found in answer' },
]

function Evidence({ id, active, children }) {
  return (
    <span
      className={`rounded-sm transition-colors ${
        active === id ? 'bg-[#FFE58A] outline outline-2 outline-[#F2C200]' : ''
      }`}
    >
      {children}
    </span>
  )
}

function ReviewCard() {
  const [active, setActive] = useState('osmosis')
  const [signed, setSigned] = useState(false)
  const suggested = schemePoints.filter((point) => point.awarded).length

  return (
    <figure className="w-full max-w-[32rem] mx-auto lg:mx-0">
      <div className="bg-white border border-line rounded-lg shadow-pop overflow-hidden">
        <div className="flex items-baseline justify-between gap-4 px-4 sm:px-5 py-3 border-b border-line text-xs text-ink-3">
          <span>S4 Biology · Question 4</span>
          <span className="tabular-nums">Script 0412 · page 2 of 5</span>
        </div>

        {/* Scanned answer */}
        <div
          className="px-5 sm:px-6 py-4 bg-[#FCFBF7] border-b border-line"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0, transparent 33px, #E3EAF2 33px, #E3EAF2 34px)',
          }}
        >
          <p className="font-hand text-[1.35rem] leading-[34px] text-[#1F2E57]">
            4. The cell will <Evidence id="burst" active={active}>swell up and burst</Evidence> because{' '}
            <Evidence id="osmosis" active={active}>water moves into it by osmosis</Evidence>{' '}
            <Evidence id="membrane" active={active}>through the partially permeable membrane</Evidence>.
            Water goes{' '}
            <Evidence id="direction" active={active}>from a high concentration to a low one</Evidence>.{' '}
            <Evidence id="wall" active={active}>Animal cells have no cell wall</Evidence> to stop them bursting.
          </p>
        </div>

        {/* Marking scheme */}
        <div className="px-4 sm:px-5 py-4">
          <p className="text-xs text-ink-3 mb-2">Marking scheme · select a point to see its evidence</p>
          <ul className="space-y-0.5">
            {schemePoints.map((point) => (
              <li key={point.id}>
                <button
                  type="button"
                  onClick={() => setActive(point.id)}
                  aria-pressed={active === point.id}
                  className={`w-full flex items-start gap-2.5 text-left rounded px-2 py-1.5 text-sm transition-colors ${
                    active === point.id ? 'bg-canvas' : 'hover:bg-canvas'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-px w-4 flex-shrink-0 font-semibold ${point.awarded ? 'text-positive' : 'text-ink-3'}`}
                  >
                    {point.awarded ? '✓' : '–'}
                  </span>
                  <span className="flex-1">
                    <span className={point.awarded ? 'text-ink' : 'text-ink-2'}>{point.text}</span>
                    <span className="sr-only">{point.awarded ? ' (awarded)' : ' (not awarded)'}</span>
                    {point.note && active === point.id && (
                      <span className="block text-xs text-ink-3 mt-0.5">{point.note}</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-line bg-canvas min-h-[3.75rem]" aria-live="polite">
          {signed ? (
            <>
              <p className="text-sm text-positive">Signed at {suggested}/{MAX_MARK}. Released with the rest of the class.</p>
              <button type="button" onClick={() => setSigned(false)} className="text-sm text-ink-3 underline underline-offset-2 hover:text-ink">
                Undo
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-ink">
                Suggested <span className="font-semibold tabular-nums">{suggested} / {MAX_MARK}</span>
              </p>
              <Button size="sm" onClick={() => setSigned(true)}>
                Sign this mark
              </Button>
            </>
          )}
        </div>
      </div>

      <figcaption className="mt-4 text-xs text-ink-3">
        One answer in the review screen. Select a marking point to see what it was given for.
      </figcaption>
    </figure>
  )
}
