import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'How it works — Domax',
  description:
    'How Domax takes a pile of handwritten answer scripts to marks a teacher has signed: capture, page checks, a first read against the marking scheme, review, and release.',
}

const stages = [
  {
    title: 'Before the exam: print a header sheet',
    body: [
      'Each script gets a header sheet with a code that identifies the student, the exam, and how many pages the script should have. Students write their answers as they normally would.',
      'The header sheet is how Domax knows whose work a page is. It never has to guess from a name scrawled at the top.',
    ],
  },
  {
    title: 'Capture the scripts',
    body: [
      'Photograph each script with a phone or put the pile through a scanner. Domax checks each picture as you take it and asks for a retake straight away if a page is blurred, too dark, or cut off.',
      'Capture works without a connection. Pages upload when the school’s connection is available.',
    ],
  },
  {
    title: 'Every page is accounted for',
    body: [
      'Before any marking, Domax matches each page to its script. If a page is missing, appears twice, or looks like it belongs to someone else, it stops and shows you. A missing page is never treated as a blank answer.',
    ],
  },
  {
    title: 'A first read against your marking scheme',
    body: [
      'You add the marking scheme you already use. Domax reads each answer and suggests a mark for every point in the scheme, along with the part of the answer the mark was given for.',
      'It reads what the student wrote, including their mistakes. A wrong answer stays wrong in the transcription; it isn’t quietly tidied up.',
      'Multiple choice and short numeric answers are checked against the key. Diagrams and long working get a suggestion only. A teacher marks those.',
    ],
  },
  {
    title: 'You review, riskiest first',
    body: [
      'Answers are sorted so the ones most likely to need your judgement come first. Each one shows the student’s handwriting beside the suggested marks. Accept, change, or mark it yourself, and note why if you change it.',
      'If anything goes wrong along the way, like an unreadable page or a failed connection, the answer comes to you. Domax never fills in a default mark.',
    ],
  },
  {
    title: 'Sign, release, and record',
    body: [
      'Nothing reaches a student until you sign it. Once you release, students see their marked scripts for free with their class code, and you download mark sheets set out for entry into CAMIS.',
      'Every suggestion, change and signature is kept in a record, so if a student appeals, the teacher hearing it can see exactly what happened.',
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">How Domax works</h1>
            <p className="lede mt-5">
              Domax is built around one rule: it can suggest a mark, but only a teacher can give one.
              Here is what happens between a pile of handwritten scripts and marks you’ve signed.
            </p>
          </div>

          <ol className="mt-14 max-w-3xl border-t border-line">
            {stages.map((stage, index) => (
              <li key={stage.title} className="grid grid-cols-1 sm:grid-cols-[4rem_1fr] gap-2 sm:gap-6 py-9 border-b border-line">
                <p className="text-sm text-ink-3 tabular-nums pt-1.5">{index + 1}</p>
                <div>
                  <h2 className="text-2xl">{stage.title}</h2>
                  {stage.body.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] text-ink-2 leading-relaxed mt-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 max-w-2xl">
            <h2 className="text-2xl">What Domax won’t do yet</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-3">
              We only offer suggested marks for a type of question once our pilots show they agree with
              experienced teachers at least as well as two teachers agree with each other. Until then,
              that type of question is marked by the teacher, with Domax only organising the scripts.
              Primary school scripts aren’t supported yet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/pilot" variant="primary" size="lg">
                Request a pilot
              </Button>
              <Link
                href="/data-protection"
                className="text-[15px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                How we handle student data
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
