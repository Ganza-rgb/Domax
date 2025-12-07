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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Partners">
              Partners
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Partner with Domax to bring AI-powered grading to teacher communities everywhere. We collaborate with LMS providers, curriculum creators, tutoring collectives, and sponsors who want to keep teachers focused on teaching.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Partnership Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">LMS Integration Partners</h3>
                    <p className="text-gray-600 text-sm mb-4">Integrate Domax directly into your learning management system and offer automated grading to your users.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Reseller Program</h3>
                    <p className="text-gray-600 text-sm mb-4">Become a Domax reseller and earn commissions by bringing automated grading to your network.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Technology Partners</h3>
                    <p className="text-gray-600 text-sm mb-4">Integrate Domax API into your education technology platform and enhance your offerings.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Teacher Collective Partners</h3>
                    <p className="text-gray-600 text-sm mb-4">Bundle Domax for regional teacher circles, exam clubs, or professional associations with dedicated success managers.</p>
                    <Button href="/contact" variant="outline" size="sm">Learn More</Button>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Benefits of Partnering</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
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



