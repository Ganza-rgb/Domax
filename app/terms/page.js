import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'Terms of Service — Domax',
  description: 'Domax terms of service and user agreement.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Service">
              Terms of Service
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using Domax, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">2. Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily use Domax for personal, non-commercial educational purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">3. User Accounts</h2>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">4. Service Availability</h2>
                <p className="mb-4">
                  We strive to maintain high availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the service at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">5. Payment Terms</h2>
                <p className="mb-4">
                  Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. You may cancel your subscription at any time, and access will continue until the end of the billing period.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">6. Limitation of Liability</h2>
                <p className="mb-4">
                  Domax shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">7. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us at legal@domax.com or through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










