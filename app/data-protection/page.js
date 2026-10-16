import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import PageHero from '@/components/site/PageHero'
import ClosingCta from '@/components/site/ClosingCta'
import Reveal from '@/components/site/Reveal'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
  title: 'Student data — Domax',
  description:
    'How Domax handles students’ scripts and marks under Rwanda’s Law 058/2021 on the protection of personal data and privacy.',
}

const sections = [
  {
    title: 'The law we work under',
    body: [
      'Domax handles students’ scripts and marks under Rwanda’s Law No. 058/2021 on the protection of personal data and privacy, overseen by the National Cyber Security Authority (NCSA).',
      'Before any pilot uses real student data, we will have registered with NCSA, completed a data protection impact assessment, and signed a data-sharing agreement with the school or institution.',
    ],
  },
  {
    title: 'Where scripts are stored',
    body: [
      'Scripts, marks and records are stored in Rwanda. If any processing has to happen outside Rwanda, it only happens with NCSA’s authorisation and a written contract with the company doing it.',
    ],
  },
  {
    title: 'What AI sees',
    body: [
      'Students are identified by a code on the header sheet, not by name. Names are masked before any page is sent to an AI model.',
      'We only use AI services on paid terms that forbid them from training on your data.',
    ],
  },
  {
    title: 'Children',
    body: [
      'Most secondary school students are under 16. For them, we work through the school: parents are told what Domax does and consent is arranged before any real scripts are used. University and polytechnic students are told directly.',
    ],
  },
  {
    title: 'How long we keep things',
    body: [
      'Scripts are kept long enough for students to see their results and for appeals to be settled, then deleted unless the school asks us to keep them under its own records policy. Pilot data is deleted or anonymised when the pilot ends.',
    ],
  },
  {
    title: 'Students’ rights',
    body: [
      'Students can always see their own marked scripts, for free. They can ask why a mark was given, and an appeal always goes to a teacher, who can see what Domax suggested and what the marking teacher decided.',
      'If we ever have a data breach, we tell NCSA and the affected institutions within 48 hours.',
    ],
  },
]

export default function DataProtectionPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        kicker="Student data"
        title="Exam scripts are personal data. Most are written by children."
        lede="This page says plainly what we do with them, and what we have promised never to do."
      />

      <Reveal>
        <div className="container-custom pb-20 sm:pb-24">
          <ol data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <li key={section.title} className="rounded-[24px] border border-line p-7 sm:p-9">
                <p className="text-[13px] font-semibold text-accent tabular-nums">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="text-2xl mt-3">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] text-ink-2 leading-relaxed mt-3">
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ol>

          <p data-reveal className="mt-12 max-w-2xl text-[17px] text-ink-2 leading-relaxed">
            Questions about student data go to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="link">
              {CONTACT_EMAIL}
            </a>
            . Our <Link href="/privacy" className="link">privacy policy</Link> covers the rest of the site.
          </p>
        </div>
      </Reveal>

      <ClosingCta />
      <Footer />
    </main>
  )
}
