import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Case Studies — Domax',
  description: 'How teachers are using Domax to mark their classes.',
}

// The previous version of this page listed made-up teachers and results.
// Add real write-ups here once teachers have agreed to be named.
export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl text-ink mb-5">Case studies</h1>
            <p className="lede">
              We’re writing these up with the teachers who have been marking with Domax, in their own
              words and with their own numbers. The first ones aren’t ready yet.
            </p>
            <p className="text-[17px] text-ink-2 leading-relaxed mt-5">
              If you use Domax and would be willing to tell us how it has gone, good or bad, we’d like to
              hear from you.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Tell us how it’s going
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
