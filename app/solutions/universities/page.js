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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Assessment Teams
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Advanced workflows for teacher assessment teams that need custom integrations, security reviews, and centralized controls—without waiting on central rollouts.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Advanced Features</h2>
                <p className="text-ink-2 mb-4">
                  Domax offers comprehensive solutions for assessment squads, including SSO integration, custom LMS connectors, advanced analytics, and dedicated account management.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Single Sign-On (SSO) integration with your identity provider</li>
                  <li>Custom LMS integrations for any learning management system</li>
                  <li>Team-level analytics and reporting</li>
                  <li>Dedicated account manager and priority support</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Team Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Custom Integrations</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Work with our engineers to build custom integrations with your existing systems.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Data Security</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Enterprise-grade security with FERPA compliance and data residency options.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Scalable Pricing</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Flexible pricing models that scale with your assessment team’s needs and budget.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Training & Support</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Comprehensive training programs and dedicated support for your graders and reviewers.</p>
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



