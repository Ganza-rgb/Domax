import Link from 'next/link'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata = {
  title: 'Contact — Domax',
  description: 'Get in touch with the Domax team.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl text-ink">Contact</h1>
            <p className="lede mt-5">
              We’re a small team, and the same people read every message. Email is the best way to
              reach us.
            </p>

            <dl className="mt-12 border-t border-line">
              <div className="py-6 border-b border-line">
                <dt className="text-sm text-ink-3">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="py-6 border-b border-line">
                <dt className="text-sm text-ink-3">Interested in a pilot?</dt>
                <dd className="mt-1 text-[17px] text-ink-2 leading-relaxed">
                  Use the{' '}
                  <Link href="/pilot" className="text-accent underline underline-offset-2">
                    pilot request form
                  </Link>{' '}
                  so we have the details we need to reply properly.
                </dd>
              </div>
              <div className="py-6 border-b border-line">
                <dt className="text-sm text-ink-3">Already a pilot site?</dt>
                <dd className="mt-1 text-[17px] text-ink-2 leading-relaxed">
                  Email us, or speak to the Domax contact named in your pilot agreement.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
