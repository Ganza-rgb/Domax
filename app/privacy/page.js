import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'Privacy Policy — Domax',
  description: 'Domax privacy policy and data protection practices.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Policy">
              Privacy Policy
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Domax ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered grading platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">2. Information We Collect</h2>
                <p className="mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Account information (name, email address, class or community)</li>
                  <li>Student papers and assignments uploaded for grading</li>
                  <li>Rubrics and grading criteria</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Provide, maintain, and improve our grading services</li>
                  <li>Process and grade student papers using AI technology</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement industry-standard security measures to protect your data, including encryption, secure data storage, and access controls. We are FERPA compliant and follow best practices for educational data protection.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">5. Data Retention</h2>
                <p className="mb-4">
                  We retain your data for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time by contacting us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">6. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy, please contact us at privacy@domax.com or through our contact page.
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



