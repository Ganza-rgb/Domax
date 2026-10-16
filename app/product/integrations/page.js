import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'LMS Integrations — Domax',
  description: 'Send marks and assignments between Domax and Canvas, Blackboard, Moodle or Google Classroom.',
}

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              LMS Integrations
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              If your school already uses Canvas, Blackboard, Moodle or Google Classroom, Domax can pull assignments in from it and send marks back, so you don’t enter them twice.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Connect Your LMS</h2>
                <p className="text-ink-2 mb-4">
                  Domax integrates with all major learning management systems, allowing you to import assignments, sync grades, and deliver feedback without switching platforms.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>One-click integration with Canvas, Blackboard, Moodle, and Google Classroom</li>
                  <li>Automatic grade sync after grading is complete</li>
                  <li>Import assignments and student submissions directly</li>
                  <li>Students receive feedback in their familiar LMS interface</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Supported Platforms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Canvas</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Works through Canvas LTI and the Canvas API, so marks land in the gradebook.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Blackboard</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Connect via Blackboard Learn API for automatic grade transfer.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Moodle</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Integrate with Moodle using standard LTI protocols.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Google Classroom</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Sync grades and feedback directly to Google Classroom assignments.</p>
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










