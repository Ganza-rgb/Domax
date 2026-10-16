'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import { PAGE_PRICES } from '@/lib/pricing'

const numberFormatter = new Intl.NumberFormat('en-US')
const formatRwf = (value) => `RWF ${numberFormatter.format(value)}`

const steps = [
  {
    title: 'Upload the scripts',
    copy: 'Drop in the whole class set as PDF or Word files, then add your marking scheme. You can start from one of our rubric templates if you don’t have one written down.',
  },
  {
    title: 'Domax marks a first pass',
    copy: 'Every answer gets a suggested mark and a short comment, each tied to a line in your scheme. Answers it isn’t sure about are flagged for you instead of guessed.',
  },
  {
    title: 'You check it and release',
    copy: 'Go through the pile, change anything you disagree with, and release when you’re happy. Students only see marks you’ve approved.',
  },
]

const levels = [
  { key: 'primary', label: 'Primary & lower secondary' },
  { key: 'o-level', label: 'O-Level' },
  { key: 'a-level', label: 'A-Level' },
]

// Worked example shown under the price table.
const exampleClass = { students: 40, pagesEach: 4, level: 'o-level' }
const exampleCost =
  exampleClass.students * exampleClass.pagesEach * PAGE_PRICES[exampleClass.level]

const otherFeatures = [
  { name: 'Rubric builder', href: '/product/rubrics', copy: 'Write a marking scheme once and reuse it every term, or share it with your department.' },
  { name: 'Annotations', href: '/product/annotations', copy: 'Highlight and comment on the script itself, the way you would with a pen.' },
  { name: 'Class analytics', href: '/product/analytics', copy: 'See which questions most of the class dropped marks on, so you know what to reteach.' },
  { name: 'Plagiarism checks', href: '/product/plagiarism', copy: 'Answers that look copied from each other or from the web are pointed out before you release.' },
  { name: 'Batch uploads', href: '/product/batch', copy: 'Upload several classes at once and let them mark while you do something else.' },
  { name: 'LMS sync', href: '/product/integrations', copy: 'If your school uses Canvas, Moodle or Google Classroom, marks can go straight back there.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,30rem)] gap-14 lg:gap-20 items-center">
          <div className="max-w-xl">
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.6rem] text-ink">
              Mark a class set in an evening, not a weekend.
            </h1>
            <p className="lede mt-6">
              Upload your students’ scripts and your marking scheme. Domax suggests a mark and a
              comment for every answer. You go through them, change what you disagree with, and
              nothing reaches a student until you say so.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/signup" variant="primary" size="xl">
                Try it free for 14 days
              </Button>
              <Link
                href="#how-it-works"
                className="text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-3">
              No card needed. After the trial, from {formatRwf(PAGE_PRICES.primary)} a page. Students never pay.
            </p>
          </div>

          <MarkedScript />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24 border-t border-line">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl max-w-xl">What happens to a pile of scripts</h2>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink pt-5">
                <p className="text-sm text-ink-3 tabular-nums">Step {index + 1}</p>
                <h3 className="text-xl mt-1.5">{step.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-3">{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-14 max-w-2xl text-[15px] text-ink-2 leading-relaxed border-l-2 border-[#C62828] pl-5">
            Domax is there to do the first read, not to have the last word. Every mark it suggests can
            be changed, and you can see which line of your scheme it was based on.
          </p>
        </div>
      </section>

      {/* Students */}
      <section className="py-20 sm:py-24 bg-[#FAF8F4] border-y border-[#ECE7DE]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl">Your students get in for free</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-5">
              Each class you set up gets its own access code. Students enter it once and can then see
              every script you release to that class, with your marks and comments on it, plus any
              past papers you choose to share.
            </p>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-4">
              You pay for the marking. Reading it back costs them nothing.
            </p>
          </div>

          <div className="justify-self-center lg:justify-self-start w-full max-w-sm">
            <div className="rounded-md border-2 border-dashed border-[#D9D1C3] bg-white px-7 py-6 rotate-[1deg]">
              <p className="text-sm text-ink-3">Class code for S3 Biology</p>
              <p className="mt-2 font-mono text-3xl sm:text-4xl font-semibold tracking-[0.12em] text-ink">
                S3B-7KQ2
              </p>
              <p className="mt-4 pt-4 border-t border-line text-sm text-ink-2 leading-relaxed">
                Write it on the board or send it to the class group. It works for the whole term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl">Pay for the pages you mark</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-5">
              There are no seats and no yearly contract. You top up a wallet, and each marked page
              comes out of it. Credits don’t expire, so a quiet month costs nothing.
            </p>
            <Link
              href="/pricing"
              className="inline-block mt-6 text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              Work out what a term would cost
            </Link>
          </div>

          <div>
            <table className="w-full text-left">
              <caption className="sr-only">Price per marked page by level</caption>
              <thead>
                <tr className="border-b border-ink text-sm text-ink-3">
                  <th scope="col" className="font-normal pb-3">Level</th>
                  <th scope="col" className="font-normal pb-3 text-right">Per page</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level) => (
                  <tr key={level.key} className="border-b border-line">
                    <th scope="row" className="py-4 font-normal text-[17px] text-ink">{level.label}</th>
                    <td className="py-4 text-right text-[17px] font-semibold text-ink tabular-nums">
                      {formatRwf(PAGE_PRICES[level.key])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-sm text-ink-3 leading-relaxed">
              For example: {exampleClass.students} O-Level scripts of {exampleClass.pagesEach} pages
              each comes to {formatRwf(exampleCost)}.
            </p>
          </div>
        </div>
      </section>

      {/* The rest */}
      <section className="py-20 sm:py-24 border-t border-line">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl">What else is in there</h2>
          <dl className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {otherFeatures.map((feature) => (
              <div key={feature.name} className="py-5 border-b border-line">
                <dt>
                  <Link href={feature.href} className="text-[17px] font-semibold text-ink hover:text-accent">
                    {feature.name}
                  </Link>
                </dt>
                <dd className="text-[15px] text-ink-2 leading-relaxed mt-1">{feature.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Close */}
      <section className="pb-24 sm:pb-28">
        <div className="container-custom">
          <div className="rounded-lg bg-[#0A3059] text-white px-6 py-12 sm:px-12 sm:py-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl text-white">Try it on your next set of scripts.</h2>
              <p className="text-white/75 mt-4 leading-relaxed">
                The first 14 days are free. If you’d rather see it working first, we’re happy to walk
                you through it on a call.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Button href="/signup" variant="primary-blue" size="xl">
                Start free trial
              </Button>
              <Button href="/contact" variant="light" size="xl">
                Book a walkthrough
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* A single marked answer, drawn as a script with pen marks, plus the review
   slip a teacher sees in Domax. The mark can be adjusted and accepted. */
const SUGGESTED_MARK = 4
const MAX_MARK = 6

function Tick() {
  return (
    <span aria-hidden="true" className="font-hand text-[#C62828] text-2xl leading-none inline-block -rotate-6 mx-0.5 select-none">
      ✓
    </span>
  )
}

function MarkedScript() {
  const [mark, setMark] = useState(SUGGESTED_MARK)
  const [accepted, setAccepted] = useState(false)

  const changeMark = (delta) => {
    setAccepted(false)
    setMark((current) => Math.min(MAX_MARK, Math.max(0, current + delta)))
  }

  return (
    <figure className="w-full max-w-[30rem] mx-auto lg:mx-0">
      {/* The script */}
      <div className="relative bg-[#FFFDF8] border border-[#E7E0D3] rounded-sm shadow-[0_24px_48px_-28px_rgba(10,48,89,0.45)] -rotate-1">
        <div className="flex items-baseline justify-between gap-4 px-6 pt-5 pb-3 border-b border-[#EAE4D8] text-xs text-ink-3">
          <span>S3 Biology · End of term test</span>
          <span className="tabular-nums">Candidate 0412</span>
        </div>

        <div className="relative pl-12 pr-6 pt-4 pb-12">
          <span aria-hidden="true" className="absolute left-8 top-0 bottom-0 w-px bg-[#EBB3B3]" />
          <p className="text-[13px] font-semibold text-ink leading-snug">
            4. Explain what happens to a red blood cell placed in distilled water. ({MAX_MARK} marks)
          </p>
          <p
            className="mt-3 text-[15px] text-[#26364A] leading-8"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #E4EBF3 31px, #E4EBF3 32px)',
            }}
          >
            The cell will swell up and burst<Tick /> because water moves into it by osmosis<Tick /> through
            the partially permeable membrane<Tick />. Water goes{' '}
            <span className="underline decoration-wavy decoration-[#C62828] decoration-1 underline-offset-4">
              from a high concentration to a low one
            </span>{' '}
            <span className="font-hand text-[#C62828] text-xl whitespace-nowrap">of what?</span>{' '}
            Animal cells have no cell wall to stop them bursting<Tick />.
          </p>

          <span
            className="absolute right-5 bottom-3 font-hand text-[#C62828] text-[1.75rem] leading-none border-2 border-[#C62828] rounded-[50%] px-3 pt-1 pb-0.5 rotate-[-8deg] tabular-nums"
            aria-label={`Mark: ${mark} out of ${MAX_MARK}`}
          >
            {mark}/{MAX_MARK}
          </span>
        </div>
      </div>

      {/* Review slip */}
      <div className="relative z-10 -mt-4 ml-4 sm:ml-10 bg-white border border-line rounded-md shadow-pop p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-2">{mark === SUGGESTED_MARK ? 'Suggested mark' : 'Your mark'}</p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => changeMark(-1)}
              disabled={mark === 0}
              className="w-7 h-7 rounded border border-line-strong text-ink hover:bg-canvas disabled:opacity-40"
              aria-label="Lower the mark"
            >
              −
            </button>
            <span className="w-12 text-center font-semibold text-ink tabular-nums">
              {mark} / {MAX_MARK}
            </span>
            <button
              type="button"
              onClick={() => changeMark(1)}
              disabled={mark === MAX_MARK}
              className="w-7 h-7 rounded border border-line-strong text-ink hover:bg-canvas disabled:opacity-40"
              aria-label="Raise the mark"
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink leading-relaxed">
          Good: you explained osmosis and why the cell bursts. For full marks, say the water moves from the
          dilute solution outside into the more concentrated cytoplasm, and name the process (haemolysis).
        </p>
        <div className="mt-4 flex items-center gap-3 min-h-9" aria-live="polite">
          {accepted ? (
            <>
              <p className="text-sm text-positive">Saved at {mark}/{MAX_MARK}. It goes out when you release the class.</p>
              <button type="button" onClick={() => setAccepted(false)} className="text-sm text-ink-3 underline underline-offset-2 hover:text-ink">
                Undo
              </button>
            </>
          ) : (
            <Button size="sm" onClick={() => setAccepted(true)}>
              Accept
            </Button>
          )}
        </div>
      </div>

      <figcaption className="mt-4 ml-4 sm:ml-10 text-xs text-ink-3">
        One answer as you’d see it in Domax. Try changing the mark.
      </figcaption>
    </figure>
  )
}
