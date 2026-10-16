import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">Student data</h1>
            <p className="lede mt-5">
              Exam scripts are personal data, and most of them are written by children. This page says
              plainly what we do with them.
            </p>
          </div>

          <div className="mt-14 max-w-3xl border-t border-line">
            {sections.map((section) => (
              <section key={section.title} className="py-9 border-b border-line">
                <h2 className="text-2xl">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] text-ink-2 leading-relaxed mt-3">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[15px] text-ink-2 leading-relaxed">
            Questions about student data go to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            . Our full <Link href="/privacy" className="text-accent underline underline-offset-2">privacy policy</Link> covers
            the rest of the site.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
