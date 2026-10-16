import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import PageHero from '@/components/site/PageHero'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
  title: 'Contact — Domax',
  description: 'Get in touch with the Domax team.',
}

const routes = [
  {
    title: 'Interested in a pilot?',
    copy: 'Use the pilot request form so we have what we need to reply properly.',
    action: { href: '/pilot', label: 'Request a pilot' },
  },
  {
    title: 'Already a pilot site?',
    copy: 'Email us, or speak to the Domax contact named in your pilot agreement.',
  },
  {
    title: 'A question about student data?',
    copy: 'Read how we handle scripts and marks, or email us with anything it doesn’t answer.',
    action: { href: '/data-protection', label: 'Student data' },
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        kicker="Contact"
        title="Talk to the people building Domax."
        lede="We’re a small team, and the same people read every message. Email is the quickest way to reach us."
      >
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-headline text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent"
        >
          {CONTACT_EMAIL}
        </a>
      </PageHero>

      <div className="container-custom pb-24 sm:pb-32">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => (
            <li key={route.title} className="rounded-[24px] border border-line p-7 flex flex-col">
              <h2 className="text-xl leading-tight">{route.title}</h2>
              <p className="text-[16px] text-ink-2 leading-relaxed mt-2">{route.copy}</p>
              {route.action && (
                <Link href={route.action.href} className="link mt-auto pt-5 text-[15px]">
                  {route.action.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
