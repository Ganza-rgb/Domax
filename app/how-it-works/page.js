import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import PageHero from '@/components/site/PageHero'
import ClosingCta from '@/components/site/ClosingCta'
import Reveal from '@/components/site/Reveal'
import {
  CaptureVisual,
  PageCheckVisual,
  FirstReadVisual,
  ReviewQueueVisual,
  ReleaseVisual,
} from '@/components/site/ProductVisuals'

export const metadata = {
  title: 'How it works — Domax',
  description:
    'How Domax takes a pile of handwritten answer scripts to marks a teacher has signed: capture, page checks, a first read against the marking scheme, review, and release.',
}

const stages = [
  {
    label: 'Capture',
    title: 'A header sheet, then a photo.',
    body: [
      'Each script starts with a header sheet carrying a code for the student, the exam, and the number of pages. Students write their answers as they always have.',
      'Afterwards, photograph each script with a phone or run the pile through a scanner. Blurred, dark or cut-off pages are caught on the spot, and capture keeps working offline. Pages upload when the school’s connection allows.',
    ],
    Visual: CaptureVisual,
  },
  {
    label: 'Check',
    title: 'Every page accounted for.',
    body: [
      'Before any marking, each page is matched to its script using the header sheet. A missing, repeated or out-of-place page stops that script and comes to you.',
      'A missing page is never treated as a blank answer, and Domax never guesses whose page it is.',
    ],
    Visual: PageCheckVisual,
  },
  {
    label: 'Read',
    title: 'A first read against your scheme.',
    body: [
      'Add the marking scheme you already use. Domax suggests a mark for each point in it, and shows the words in the answer each mark was given for.',
      'It transcribes what the student actually wrote. A wrong answer stays wrong; it isn’t quietly tidied up. Multiple choice and short numeric answers are checked against your key.',
    ],
    Visual: FirstReadVisual,
  },
  {
    label: 'Review',
    title: 'Riskiest first, then the rest.',
    body: [
      'Your queue is sorted so the answers most likely to need your judgement come first. Diagrams and long working are yours to mark; Domax only organises them.',
      'Accept, change, or mark it yourself, and note why if you change it. If anything goes wrong along the way, the answer comes to you. Domax never fills in a default mark.',
    ],
    Visual: ReviewQueueVisual,
  },
  {
    label: 'Release',
    title: 'Signed, released, recorded.',
    body: [
      'Nothing reaches a student until you sign. Students then see their marked scripts for free with their class code, and you download a mark sheet set out for CAMIS.',
      'Every suggestion, change and signature is kept, so a teacher hearing an appeal can see exactly what happened.',
    ],
    Visual: ReleaseVisual,
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        kicker="How it works"
        title="It can suggest a mark. Only a teacher can give one."
        lede="Here is everything that happens between a pile of handwritten scripts and marks you’ve signed."
      />

      <Reveal>
        <ol className="container-custom space-y-20 sm:space-y-28 pb-24 sm:pb-32">
          {stages.map((stage, index) => (
            <li
              key={stage.label}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="text-[13px] font-semibold text-accent tabular-nums">
                  {String(index + 1).padStart(2, '0')} · {stage.label}
                </p>
                <h2 className="mt-3 text-[clamp(1.875rem,3.4vw,2.75rem)]">{stage.title}</h2>
                {stage.body.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] text-ink-2 leading-relaxed mt-4 max-w-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <stage.Visual />
              </div>
            </li>
          ))}
        </ol>

        <section className="bg-canvas py-24 sm:py-28">
          <div data-reveal className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20">
            <div>
              <p className="kicker">Limits</p>
              <h2 className="mt-3">What Domax won’t do yet.</h2>
            </div>
            <div className="space-y-5 text-[17px] text-ink-2 leading-relaxed">
              <p>
                We only suggest marks for a type of question once our pilots show Domax agrees with
                experienced teachers at least as closely as two teachers agree with each other. Until then,
                that type of question is marked by the teacher, with Domax only organising the scripts.
              </p>
              <p>
                Primary school scripts aren’t supported yet. Young children’s handwriting is the hardest to
                read reliably.
              </p>
              <div className="pt-2">
                <Button href="/data-protection" variant="secondary" size="lg">
                  How we handle student data
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="pt-24 sm:pt-28">
        <ClosingCta />
      </div>
      <Footer />
    </main>
  )
}
