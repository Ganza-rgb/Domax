'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import {
  ReviewScreen,
  CaptureVisual,
  PageCheckVisual,
  FirstReadVisual,
  ReviewQueueVisual,
  ReleaseVisual,
  Tick,
} from '@/components/site/ProductVisuals'
import { useMotion, revealOnScroll, gsap, ScrollTrigger, EASE } from '@/lib/motion'

const stages = [
  {
    label: 'Capture',
    title: 'Photograph the pile.',
    copy: 'A phone or a scanner is enough. Blurred, dark or cut-off pages are caught while you’re still holding the paper, and capture keeps working when the connection doesn’t.',
    Visual: CaptureVisual,
  },
  {
    label: 'Check',
    title: 'Every page accounted for.',
    copy: 'A header sheet on each script says whose it is and how many pages it should have. A missing, repeated or swapped page stops the batch and comes to you. It is never guessed.',
    Visual: PageCheckVisual,
  },
  {
    label: 'Read',
    title: 'A first read against your scheme.',
    copy: 'Domax suggests a mark for every point in the marking scheme you already use, and shows the words in the answer each mark was given for. It reads what the student wrote, mistakes included.',
    Visual: FirstReadVisual,
  },
  {
    label: 'Review',
    title: 'The hard ones come first.',
    copy: 'Your queue is sorted by how much each answer needs you. Diagrams and long working are yours to mark. Clear answers take a glance and a tap.',
    Visual: ReviewQueueVisual,
  },
  {
    label: 'Release',
    title: 'Signed, released, recorded.',
    copy: 'Nothing reaches a student until you sign. Then they see their marked script for free, and you download a mark sheet set out for CAMIS.',
    Visual: ReleaseVisual,
  },
]

const promises = [
  { title: 'A teacher signs every mark', copy: 'Domax suggests. Only a teacher can give a mark, and nothing is released without a signature.' },
  { title: 'Students never pay', copy: 'Seeing their own marked scripts is free for every student, whoever pays for the marking.' },
  { title: 'Names never reach AI', copy: 'Students are identified by the code on their header sheet. Names are masked before any page is read.' },
  { title: 'Scripts stay in Rwanda', copy: 'Stored in Rwanda and handled under Law 058/2021, with parents informed through the school.' },
  { title: 'Every mark can be explained', copy: 'Appeals go to a teacher, who can see what was suggested, where the evidence was, and what changed.' },
]

const audiences = [
  {
    title: 'Universities & polytechnics',
    copy: 'Long scripts, large cohorts, lecturer time at a premium. Where our pilots begin.',
    href: '/solutions/universities',
  },
  {
    title: 'Secondary schools',
    copy: 'O-Level and A-Level assessments, with consent arranged through the school.',
    href: '/solutions/schools',
  },
  {
    title: 'Sponsors & districts',
    copy: 'Fund marking for public schools at a published cost-plus price. Schools pay nothing.',
    href: '/solutions/sponsors',
  },
]

const pilotPhases = [
  { when: 'Weeks 1–4', title: 'Agreements and past scripts', copy: 'Data-sharing agreement signed, consent arranged, past scripts collected and double-marked by two of your teachers.' },
  { when: 'Weeks 5–8', title: 'Measured, with nothing at stake', copy: 'Domax marks the same past scripts. We compare it with your teachers, question type by question type.' },
  { when: 'Weeks 9–12', title: 'One real assessment', copy: 'Your teachers mark a live assessment with Domax and sign every mark. We time it against marking by hand.' },
]

export default function Home() {
  const page = useRef(null)
  const [stage, setStage] = useState(0)

  useMotion(page, (scope) => {
    gsap.from('[data-hero-line]', { autoAlpha: 0, y: 30, duration: 0.9, ease: EASE, stagger: 0.09 })
    revealOnScroll(scope)
    scope.querySelectorAll('[data-stage]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => self.isActive && setStage(Number(el.dataset.stage)),
      })
    })
  })

  const StageVisual = stages[stage].Visual

  return (
    <main ref={page} className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(60%_60%_at_50%_0%,#E8F0FF_0%,rgba(232,240,255,0)_100%)]" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <p data-hero-line className="kicker rounded-full border border-line bg-white px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00cd90]" aria-hidden="true" />
              Now choosing pilot sites in Rwanda
            </p>
            <h1 data-hero-line className="display text-ink mt-7">
              Domax reads the scripts first. You decide every mark.
            </h1>
            <p data-hero-line className="lede mt-7 max-w-2xl mx-auto">
              Photograph your students’ handwritten scripts. Domax checks every page, suggests a mark for
              each answer against your marking scheme, and shows you the evidence. Nothing is released
              until you sign.
            </p>
            <div data-hero-line className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/pilot" size="2xl">Request a pilot</Button>
              <Button href="/how-it-works" variant="secondary" size="2xl">See how it works</Button>
            </div>
          </div>

          <div className="mt-16 sm:mt-20 max-w-[68rem] mx-auto">
            <ReviewScreen />
            <p className="mt-5 text-center text-[13px] text-ink-3">
              The review screen. Select a marking point to see what it was given for.
            </p>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="on-dark bg-[#071A33] text-white">
        <div className="container-custom py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-24 items-end">
            <h2 data-reveal className="text-white text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.04em]">
              At the end of every term, the marking lands on one desk. Usually after dark.
            </h2>
            <div data-reveal data-reveal-stagger className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-headline text-[clamp(3.5rem,8vw,6rem)] leading-none font-semibold tracking-[-0.05em] text-white">38</p>
                <p className="text-[15px] text-white/65 mt-3 leading-snug">secondary students for every teacher</p>
              </div>
              <div>
                <p className="font-headline text-[clamp(3.5rem,8vw,6rem)] leading-none font-semibold tracking-[-0.05em] text-white">65</p>
                <p className="text-[15px] text-white/65 mt-3 leading-snug">primary pupils for every teacher</p>
              </div>
              <p className="col-span-2 text-[12px] text-white/45">Pupil–teacher ratios in Rwanda, 2024 education statistics.</p>
            </div>
          </div>
          <p data-reveal className="mt-16 max-w-2xl text-[19px] leading-relaxed text-white/75">
            Marking is unpaid overtime, and some teachers pay colleagues out of their own pocket to keep
            up. Domax takes the first read and the paperwork. The judgement stays with the teacher.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32">
        <div className="container-custom">
          <div data-reveal className="max-w-3xl">
            <p className="kicker">How it works</p>
            <h2 className="mt-3">From a pile of paper to marks you’ve signed.</h2>
          </div>

          <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
            <ol>
              {stages.map((item, index) => (
                <li
                  key={item.label}
                  data-stage={index}
                  className={`lg:min-h-[70vh] flex flex-col justify-center py-8 lg:py-0 border-t border-line lg:border-0 transition-opacity duration-500 ${
                    stage === index ? 'lg:opacity-100' : 'lg:opacity-35'
                  }`}
                >
                  <p className="text-[13px] font-semibold text-accent tabular-nums">
                    {String(index + 1).padStart(2, '0')} · {item.label}
                  </p>
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.03em] mt-3">{item.title}</h3>
                  <p className="text-[17px] text-ink-2 leading-relaxed mt-4 max-w-md">{item.copy}</p>
                  <div className="mt-8 lg:hidden">
                    <item.Visual />
                  </div>
                </li>
              ))}
            </ol>
            <div className="hidden lg:block">
              <div className="sticky top-[calc(50vh-17rem)]">
                <div key={stage} className="animate-[stage-in_0.5s_cubic-bezier(0.22,1,0.36,1)]">
                  <StageVisual />
                </div>
                <div className="flex gap-1.5 mt-5 justify-center" aria-hidden="true">
                  {stages.map((item, index) => (
                    <span key={item.label} className={`h-1 rounded-full transition-all duration-300 ${stage === index ? 'w-8 bg-ink' : 'w-3 bg-line-strong'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-custom">
          <div data-reveal className="max-w-3xl">
            <p className="kicker">Written into every contract</p>
            <h2 className="mt-3">Promises we made before marking a single script.</h2>
          </div>
          <ul data-reveal data-reveal-stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promises.map((item) => (
              <li key={item.title} className="rounded-[20px] bg-white p-7 border border-line">
                <Tick className="w-6 h-6" />
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-2">{item.copy}</p>
              </li>
            ))}
            <li className="rounded-[20px] bg-[#071A33] p-7 flex flex-col justify-between on-dark">
              <p className="text-white text-xl font-headline font-semibold tracking-[-0.02em] leading-snug">
                The full detail, in plain words.
              </p>
              <Link href="/data-protection" className="link mt-6">How we handle student data</Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-24 sm:py-32">
        <div className="container-custom">
          <div data-reveal className="max-w-3xl">
            <p className="kicker">Who it’s for</p>
            <h2 className="mt-3">Built for the people who carry the marking.</h2>
          </div>
          <div data-reveal data-reveal-stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {audiences.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-[20px] border border-line p-7 sm:p-8 min-h-[16rem] flex flex-col hover:border-ink/25 transition-colors"
              >
                <span className="text-[13px] text-ink-3 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl mt-10">{item.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed mt-2">{item.copy}</p>
                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
                  Read more
                  <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-ink-3 max-w-2xl">
            Primary school marking comes later. Young children’s handwriting is the hardest to read
            reliably, and we’d rather get it right than get it early.
          </p>
        </div>
      </section>

      {/* Pilot */}
      <section className="on-dark bg-[#071A33] text-white py-24 sm:py-32">
        <div className="container-custom">
          <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <div>
              <p className="kicker !text-white/60">The pilot</p>
              <h2 className="mt-3 text-white">Twelve weeks. Measured, not promised.</h2>
            </div>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-lg">
              We don’t ask you to take accuracy on trust. Domax only offers suggested marks for the types
              of question where it agrees with your teachers as closely as they agree with each other.
            </p>
          </div>
          <ol data-reveal data-reveal-stagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {pilotPhases.map((phase, index) => (
              <li key={phase.when} className="relative pt-8">
                <span aria-hidden="true" className={`absolute top-[5px] left-0 h-px bg-white/20 ${index === pilotPhases.length - 1 ? 'w-full' : 'w-[calc(100%+2rem)]'}`} />
                <span aria-hidden="true" className="absolute top-0 left-0 w-[11px] h-[11px] rounded-full bg-[#071A33] border-2 border-[#8db8ff]" />
                <p className="text-[13px] font-semibold text-[#8db8ff]">{phase.when}</p>
                <h3 className="text-white text-xl mt-3">{phase.title}</h3>
                <p className="text-[15px] text-white/65 leading-relaxed mt-2">{phase.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[15px] text-white/60">
            At the end you get the results, good or bad: time saved, how often teachers changed a mark,
            and agreement by question type.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="py-28 sm:py-36">
        <div data-reveal className="container-custom text-center">
          <h2 className="display text-ink max-w-4xl mx-auto">Be one of the first pilot sites.</h2>
          <p className="lede mt-6 max-w-xl mx-auto">
            Tell us about your institution, the subjects you’d like to try, and roughly how many scripts
            you mark each term.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/pilot" size="2xl">Request a pilot</Button>
            <Button href="/pricing" variant="secondary" size="2xl">See pricing</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
