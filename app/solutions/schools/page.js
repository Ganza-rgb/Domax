import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Teacher Pods — Domax',
  description: 'Organize teacher pods that share rubrics, credits, and analytics without waiting for central rollouts.',
}

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Pods">
              Teacher Pods
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Scale grading efficiency across your trusted circle of teachers. Share wallets, rubrics, and analytics inside small pods while we keep pricing simple and teacher-first.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Pod Programs</h2>
                <p className="text-gray-600 mb-4">
                  Domax offers special pricing and features for teacher pods—no district paperwork required. Bundle credits, share rubrics, and view pod-level analytics. Contact us for pod pricing.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Volume-friendly wallets for 3–25 teachers</li>
                  <li>Pod dashboard for lead teachers or coordinators</li>
                  <li>Shared rubric library with version control</li>
                  <li>Dedicated success coaching and onboarding</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Pod Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Pod Dashboard</h3>
                    <p className="text-gray-600 text-sm">Monitor usage, manage co-teachers, and view pod-level analytics from one central location.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Shared Resources</h3>
                    <p className="text-gray-600 text-sm">Create a library of rubrics and templates that your pod can access and reuse.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Shared Wallets</h3>
                    <p className="text-gray-600 text-sm">Load one wallet and distribute credits across every teacher in the pod.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Priority Support</h3>
                    <p className="text-gray-600 text-sm">Dedicated support team and faster response times for pod leads.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/contact" variant="primary" size="lg">
                  Plan a pod rollout
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



