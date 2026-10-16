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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              AI Grading
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Automate paper grading with AI-powered feedback that delivers consistent, actionable comments in seconds. Cut grading time by 80% while ensuring every student receives personalized, constructive feedback.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">How It Works</h2>
                <p className="text-ink-2 mb-4">
                  Our AI grading system uses advanced natural language processing to understand context, evaluate student work against your rubric, and generate detailed feedback that helps students improve.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Upload student papers in PDF, DOCX, or other supported formats</li>
                  <li>Apply your custom rubric or use our AI-generated suggestions</li>
                  <li>Receive instant grading with detailed feedback and annotations</li>
                  <li>Review and adjust scores before finalizing</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Consistent Scoring</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">AI ensures every paper is graded using the same criteria, eliminating bias and inconsistency.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Personalized Feedback</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Each student receives tailored comments that address their specific strengths and areas for improvement.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Rubric-Based</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Grading follows your rubric exactly, ensuring alignment with your course objectives.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Fast Turnaround</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Grade papers in seconds instead of hours, giving students faster feedback.</p>
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

