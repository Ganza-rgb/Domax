import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'About — Domax',
  description: 'Why Domax exists, where it is now, and the rules it is built on.',
}

const principles = [
  {
    title: 'A teacher gives every mark',
    copy: 'Domax suggests. Teachers decide, and sign. We don’t release AI-only marks, and we aren’t working towards it.',
  },
  {
    title: 'Students never pay for their own results',
    copy: 'Whoever pays for marking, students see their marked scripts for free. Access never depends on whether an invoice has been paid.',
  },
  {
    title: 'Pages are checked, not guessed',
    copy: 'Which student a page belongs to, and whether a script is complete, is worked out from the header sheet, never inferred by AI.',
  },
  {
    title: 'We publish what we measure',
    copy: 'We don’t quote other companies’ accuracy figures or promise time savings we haven’t measured. When our pilots produce numbers, we’ll publish them, including the bad ones.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">About Domax</h1>
            <p className="lede mt-5">
              Domax helps teachers in Rwanda mark handwritten exam scripts, without taking the marking
              out of their hands.
            </p>

            <div className="mt-12 space-y-5 text-[17px] text-ink-2 leading-relaxed">
              <h2 className="text-2xl text-ink">Why</h2>
              <p>
                In Rwanda there are about 38 secondary students for every teacher, and about 65 in
                primary. At the end of every term, the marking lands on those teachers, mostly in
                evenings nobody pays them for. Some pay colleagues out of their own pocket to help.
              </p>
              <p>
                Reading handwriting and checking it against a marking scheme is something software can
                now help with, cheaply. What it can’t do is take responsibility for a student’s result.
                So Domax does the first read and the paperwork, and leaves the judgement to the teacher.
              </p>

              <h2 className="text-2xl text-ink pt-6">Where we are</h2>
              <p>
                We’re at the start. We’re setting up our first pilots with a university or polytechnic
                and a secondary school, beginning with past scripts where nothing is at stake. We’ll only
                offer suggested marks for the types of question where the pilots show Domax agrees with
                experienced teachers.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl">What we hold ourselves to</h2>
            <dl className="mt-6 border-t border-line">
              {principles.map((item) => (
                <div key={item.title} className="py-5 border-b border-line">
                  <dt className="text-lg font-semibold text-ink">{item.title}</dt>
                  <dd className="text-[17px] text-ink-2 leading-relaxed mt-1.5">{item.copy}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="/pilot" variant="primary" size="lg">
              Request a pilot
            </Button>
            <Link
              href="/contact"
              className="text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
