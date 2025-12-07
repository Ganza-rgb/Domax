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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Integrations">
              API & Integrations
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Build custom integrations with Domax API. Automate grading workflows, sync with your systems, and create powerful integrations that fit your unique needs.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">RESTful API</h2>
                <p className="text-gray-600 mb-4">
                  Our comprehensive REST API allows you to integrate Domax into your existing workflows. Upload papers, trigger grading, retrieve results, and manage rubrics programmatically.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>RESTful API with comprehensive documentation</li>
                  <li>Webhook support for real-time notifications</li>
                  <li>OAuth 2.0 authentication for secure access</li>
                  <li>Rate limiting and usage analytics</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">API Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Paper Management</h3>
                    <p className="text-gray-600 text-sm">Upload, retrieve, and manage student papers through API endpoints.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Grading Automation</h3>
                    <p className="text-gray-600 text-sm">Trigger grading jobs, check status, and retrieve results programmatically.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Rubric Management</h3>
                    <p className="text-gray-600 text-sm">Create, update, and manage rubrics via API for dynamic rubric creation.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Webhooks</h3>
                    <p className="text-gray-600 text-sm">Receive real-time notifications when grading is complete or events occur.</p>
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










