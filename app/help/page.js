import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Help Center — Domax',
  description: 'Get help with Domax. Find answers to common questions, contact support, and access resources.',
}

export default function HelpPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          q: 'How do I create my first rubric?',
          a: 'Navigate to the Rubrics section, click "Create New Rubric", and follow the step-by-step builder. You can add criteria, set point values, and customize performance levels.',
        },
        {
          q: 'What file formats are supported?',
          a: 'Domax supports PDF, DOCX, TXT, and RTF files. You can upload individual files or batch upload multiple papers at once.',
        },
        {
          q: 'How long does grading take?',
          a: 'Most papers are graded within 30-60 seconds. Batch processing of multiple papers may take a few minutes depending on the number of papers.',
        },
      ],
    },
    {
      title: 'Account & Billing',
      questions: [
        {
          q: 'What is included in the free trial?',
          a: 'The 14-day free trial includes full access to all features with a limit of 50 papers. No credit card required.',
        },
        {
          q: 'Can I cancel anytime?',
          a: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period.',
        },
        {
          q: 'Do you offer student discounts?',
          a: 'Yes, we offer special pricing for students and educators. Contact support for more information.',
        },
      ],
    },
    {
      title: 'Features & Usage',
      questions: [
        {
          q: 'Can I edit AI-generated grades?',
          a: 'Absolutely! All AI-generated grades and feedback can be reviewed and adjusted before finalizing. You have full control over the final scores.',
        },
        {
          q: 'How do LMS integrations work?',
          a: 'Connect your LMS account in Settings, then you can import assignments and automatically sync grades back to your LMS after grading.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes, we use enterprise-grade encryption and follow FERPA compliance standards. Your data is never shared with third parties.',
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Help Center
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Find answers to common questions, learn how to use Domax features, and get the support you need.
            </p>

            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <section key={categoryIndex}>
                  <h2 className="text-[1.375rem] font-medium text-ink mb-5">{category.title}</h2>
                  <div className="border-y border-line divide-y divide-line">
                    {category.questions.map((item, itemIndex) => (
                      <details key={itemIndex} className="group py-1">
                        <summary className="flex items-center justify-between gap-6 py-4 font-semibold text-ink cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-md">
                          {item.q}
                          <span aria-hidden="true" className="w-6 h-6 rounded-full border border-line-strong flex items-center justify-center text-ink-3 flex-shrink-0">
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                              <path d="M2 6h8" />
                              <path d="M6 2v8" className="group-open:hidden" />
                            </svg>
                          </span>
                        </summary>
                        <p className="pb-5 pr-12 text-ink-2 leading-relaxed">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 p-8 sm:p-10 bg-canvas border border-line rounded-2xl text-center">
              <h2 className="text-2xl font-medium text-ink mb-4">Still need help?</h2>
              <p className="text-ink-2 mb-6">Our support team is here to assist you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Contact Support
                </Button>
                <Button href="/docs" variant="outline" size="lg">
                  View Documentation
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










