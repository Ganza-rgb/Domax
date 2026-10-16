import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Partners — Domax',
  description: 'Partner with Domax to bring AI-powered grading to more teachers and their learning communities.',
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Partners
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Partner with Domax to bring AI-powered grading to teacher communities everywhere. We collaborate with LMS providers, curriculum creators, tutoring collectives, and sponsors who want to keep teachers focused on teaching.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Partnership Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">LMS Integration Partners</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Integrate Domax directly into your learning management system and offer automated grading to your users.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Reseller Program</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Become a Domax reseller and earn commissions by bringing automated grading to your network.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Technology Partners</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Integrate Domax API into your education technology platform and enhance your offerings.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Teacher Collective Partners</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Bundle Domax for regional teacher circles, exam clubs, or professional associations with dedicated success managers.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Benefits of Partnering</h2>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Competitive revenue sharing and commission structures</li>
                  <li>Dedicated partner support and resources</li>
                  <li>Co-marketing opportunities and materials</li>
                  <li>Early access to new features and products</li>
                  <li>Technical integration support and documentation</li>
                </ul>
              </section>

              <div className="mt-12 text-center">
                <Button href="/contact" variant="primary" size="lg">
                  Become a Partner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}



