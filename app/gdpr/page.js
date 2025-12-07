import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'GDPR Compliance — Domax',
  description: 'Domax GDPR compliance information and data protection rights.',
}

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Compliance">
              GDPR Compliance
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">1. Our Commitment</h2>
                <p className="mb-4">
                  Domax is committed to compliance with the General Data Protection Regulation (GDPR) and protecting the privacy rights of individuals in the European Economic Area (EEA).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">2. Your Rights Under GDPR</h2>
                <p className="mb-4">As a data subject under GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
                  <li><strong>Rights Related to Automated Decision Making:</strong> Request human review of automated decisions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">3. Data Processing</h2>
                <p className="mb-4">
                  We process personal data based on legitimate interests, contractual necessity, and consent. We only process data necessary for providing our grading services and improving our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">4. Data Transfers</h2>
                <p className="mb-4">
                  When transferring data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) or adequacy decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">5. Exercising Your Rights</h2>
                <p className="mb-4">
                  To exercise any of your GDPR rights, please contact us at gdpr@domax.com or through our contact page. We will respond to your request within 30 days.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">6. Data Protection Officer</h2>
                <p className="mb-4">
                  For questions or concerns about our GDPR compliance, you can contact our Data Protection Officer at dpo@domax.com.
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










