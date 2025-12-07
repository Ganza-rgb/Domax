import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'Acceptable Use Policy — Domax',
  description: 'Domax acceptable use policy and guidelines for using our platform.',
}

export default function AcceptableUsePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Policy">
              Acceptable Use Policy
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">1. Introduction</h2>
                <p className="mb-4">
                  This Acceptable Use Policy ("Policy") outlines the rules and guidelines for using Domax's AI-powered grading platform. By using our service, you agree to comply with this Policy. Violations may result in suspension or termination of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">2. Educational Use Only</h2>
                <p className="mb-4">
                  Domax is designed exclusively for legitimate educational purposes. You may use our platform to:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Grade student assignments, exams, and coursework</li>
                  <li>Provide feedback on educational materials</li>
                  <li>Analyze student performance for teaching purposes</li>
                  <li>Manage grading workflows for educational institutions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">3. Prohibited Activities</h2>
                <p className="mb-4">You may not use Domax to:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Process content that violates copyright, intellectual property, or privacy laws</li>
                  <li>Grade or process materials that contain illegal, harmful, or offensive content</li>
                  <li>Attempt to reverse engineer, decompile, or extract source code from our platform</li>
                  <li>Use automated scripts or bots to abuse or overload our systems</li>
                  <li>Share account credentials or allow unauthorized access to your account</li>
                  <li>Use the service for any commercial purpose outside of educational institutions</li>
                  <li>Violate any applicable laws, regulations, or educational policies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">4. Content Standards</h2>
                <p className="mb-4">
                  All content uploaded to Domax must:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Be related to legitimate educational assessment activities</li>
                  <li>Comply with applicable privacy laws (FERPA, GDPR, etc.)</li>
                  <li>Respect student privacy and confidentiality</li>
                  <li>Not contain personally identifiable information unless properly authorized</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">5. Account Security</h2>
                <p className="mb-4">
                  You are responsible for maintaining the security of your account. You must:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Use a strong, unique password</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Not share your account credentials with others</li>
                  <li>Use two-factor authentication when available</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">6. Data Protection</h2>
                <p className="mb-4">
                  When using Domax, you must ensure compliance with all applicable data protection laws, including:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>FERPA (Family Educational Rights and Privacy Act) in the United States</li>
                  <li>GDPR (General Data Protection Regulation) in the European Union</li>
                  <li>Local privacy and data protection regulations in your jurisdiction</li>
                  <li>Institutional policies regarding student data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">7. Violations and Enforcement</h2>
                <p className="mb-4">
                  Violations of this Policy may result in:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Immediate suspension or termination of your account</li>
                  <li>Removal of prohibited content</li>
                  <li>Legal action if violations involve illegal activities</li>
                  <li>Reporting to relevant educational authorities when appropriate</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">8. Reporting Violations</h2>
                <p className="mb-4">
                  If you become aware of any violation of this Policy, please report it immediately to our support team at support@domax.com or through our contact page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">9. Changes to This Policy</h2>
                <p className="mb-4">
                  We reserve the right to modify this Policy at any time. We will notify users of significant changes via email or through our platform. Continued use of Domax after changes constitutes acceptance of the updated Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">10. Contact Information</h2>
                <p className="mb-4">
                  For questions about this Acceptable Use Policy, please contact us at legal@domax.com or through our contact page.
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




