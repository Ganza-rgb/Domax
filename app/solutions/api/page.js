import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'API & Integrations — Domax',
  description: 'Build custom integrations with Domax API. Automate grading workflows and connect with your existing systems.',
}

export default function APIPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              API & Integrations
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Build custom integrations with Domax API. Automate grading workflows, sync with your systems, and create powerful integrations that fit your unique needs.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">RESTful API</h2>
                <p className="text-ink-2 mb-4">
                  Our comprehensive REST API allows you to integrate Domax into your existing workflows. Upload papers, trigger grading, retrieve results, and manage rubrics programmatically.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>RESTful API with comprehensive documentation</li>
                  <li>Webhook support for real-time notifications</li>
                  <li>OAuth 2.0 authentication for secure access</li>
                  <li>Rate limiting and usage analytics</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">API Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Paper Management</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Upload, retrieve, and manage student papers through API endpoints.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Grading Automation</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Trigger grading jobs, check status, and retrieve results programmatically.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Rubric Management</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Create, update, and manage rubrics via API for dynamic rubric creation.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Webhooks</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Receive real-time notifications when grading is complete or events occur.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/docs" variant="primary" size="lg">
                  View API Documentation
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










