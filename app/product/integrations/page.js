import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'LMS Integrations — Domax',
  description: 'Seamlessly sync with Canvas, Blackboard, Moodle, Google Classroom, and other learning management systems.',
}

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Integrations">
              LMS Integrations
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Seamlessly sync with Canvas, Blackboard, Moodle, Google Classroom, and more. Sync grades and assignments automatically without leaving your LMS.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Connect Your LMS</h2>
                <p className="text-gray-600 mb-4">
                  Domax integrates with all major learning management systems, allowing you to import assignments, sync grades, and deliver feedback without switching platforms.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>One-click integration with Canvas, Blackboard, Moodle, and Google Classroom</li>
                  <li>Automatic grade sync after grading is complete</li>
                  <li>Import assignments and student submissions directly</li>
                  <li>Students receive feedback in their familiar LMS interface</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Supported Platforms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Canvas</h3>
                    <p className="text-gray-600 text-sm">Full integration with Canvas LTI and API for seamless grade syncing.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Blackboard</h3>
                    <p className="text-gray-600 text-sm">Connect via Blackboard Learn API for automatic grade transfer.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Moodle</h3>
                    <p className="text-gray-600 text-sm">Integrate with Moodle using standard LTI protocols.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Google Classroom</h3>
                    <p className="text-gray-600 text-sm">Sync grades and feedback directly to Google Classroom assignments.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/signup" variant="primary" size="lg">
                  Start Free Trial
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










