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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Center">
              Help Center
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Find answers to common questions, learn how to use Domax features, and get the support you need.
            </p>

            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <section key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-semibold text-[#0A3059] mb-6">{category.title}</h2>
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => (
                      <details key={itemIndex} className="p-6 bg-[#f0f7ff] rounded-2xl">
                        <summary className="font-semibold text-[#0A3059] cursor-pointer list-none">
                          {item.q}
                        </summary>
                        <p className="mt-4 text-gray-600">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] rounded-2xl text-center">
              <h2 className="text-2xl font-bold text-[#0A3059] mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-6">Our support team is here to assist you.</p>
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










