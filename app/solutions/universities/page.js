import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Assessment Teams — Domax',
  description: 'Advanced workflows for teacher assessment teams that need APIs, SSO, and deeper security.',
}

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Teams">
              Assessment Teams
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Advanced workflows for teacher assessment teams that need custom integrations, security reviews, and centralized controls—without waiting on central rollouts.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Advanced Features</h2>
                <p className="text-gray-600 mb-4">
                  Domax offers comprehensive solutions for assessment squads, including SSO integration, custom LMS connectors, advanced analytics, and dedicated account management.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Single Sign-On (SSO) integration with your identity provider</li>
                  <li>Custom LMS integrations for any learning management system</li>
                  <li>Team-level analytics and reporting</li>
                  <li>Dedicated account manager and priority support</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Team Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Custom Integrations</h3>
                    <p className="text-gray-600 text-sm">Work with our engineers to build custom integrations with your existing systems.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Data Security</h3>
                    <p className="text-gray-600 text-sm">Enterprise-grade security with FERPA compliance and data residency options.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Scalable Pricing</h3>
                    <p className="text-gray-600 text-sm">Flexible pricing models that scale with your assessment team’s needs and budget.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Training & Support</h3>
                    <p className="text-gray-600 text-sm">Comprehensive training programs and dedicated support for your graders and reviewers.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/contact" variant="primary" size="lg">
                  Talk to an integrations lead
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



