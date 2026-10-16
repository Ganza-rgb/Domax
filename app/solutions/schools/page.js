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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Teacher Pods
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Scale grading efficiency across your trusted circle of teachers. Share wallets, rubrics, and analytics inside small pods while we keep pricing simple and teacher-first.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Pod Programs</h2>
                <p className="text-ink-2 mb-4">
                  Domax offers special pricing and features for teacher pods—no district paperwork required. Bundle credits, share rubrics, and view pod-level analytics. Contact us for pod pricing.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Volume-friendly wallets for 3–25 teachers</li>
                  <li>Pod dashboard for lead teachers or coordinators</li>
                  <li>Shared rubric library with version control</li>
                  <li>Dedicated success coaching and onboarding</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Pod Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Pod Dashboard</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Monitor usage, manage co-teachers, and view pod-level analytics from one central location.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Shared Resources</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Create a library of rubrics and templates that your pod can access and reuse.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Shared Wallets</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Load one wallet and distribute credits across every teacher in the pod.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Priority Support</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Dedicated support team and faster response times for pod leads.</p>
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



