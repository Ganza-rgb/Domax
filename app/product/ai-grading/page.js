import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'AI Grading — Domax',
  description: 'Automate paper grading with AI-powered feedback that delivers consistent, actionable comments in seconds.',
}

export default function AIGradingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Grading">
              AI Grading
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Automate paper grading with AI-powered feedback that delivers consistent, actionable comments in seconds. Cut grading time by 80% while ensuring every student receives personalized, constructive feedback.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">How It Works</h2>
                <p className="text-gray-600 mb-4">
                  Our AI grading system uses advanced natural language processing to understand context, evaluate student work against your rubric, and generate detailed feedback that helps students improve.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Upload student papers in PDF, DOCX, or other supported formats</li>
                  <li>Apply your custom rubric or use our AI-generated suggestions</li>
                  <li>Receive instant grading with detailed feedback and annotations</li>
                  <li>Review and adjust scores before finalizing</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Consistent Scoring</h3>
                    <p className="text-gray-600 text-sm">AI ensures every paper is graded using the same criteria, eliminating bias and inconsistency.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Personalized Feedback</h3>
                    <p className="text-gray-600 text-sm">Each student receives tailored comments that address their specific strengths and areas for improvement.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Rubric-Based</h3>
                    <p className="text-gray-600 text-sm">Grading follows your rubric exactly, ensuring alignment with your course objectives.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Fast Turnaround</h3>
                    <p className="text-gray-600 text-sm">Grade papers in seconds instead of hours, giving students faster feedback.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/signup" variant="primary" size="lg">
                  Start Free Trial
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

