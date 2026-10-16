import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Rubric Builder — Domax',
  description: 'Create, customize, and apply rubrics that ensure consistent, fair grading across all your assignments.',
}

export default function RubricsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Rubric Builder
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Create, customize, and apply rubrics that ensure consistent, fair grading across all your assignments. Design reusable rubrics in minutes and apply them to any assignment.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Build Custom Rubrics</h2>
                <p className="text-ink-2 mb-4">
                  Our intuitive rubric builder lets you create detailed grading criteria with weighted categories, point values, and descriptive feedback options. Save and reuse rubrics across courses and semesters.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Create rubrics with multiple criteria and weighted categories</li>
                  <li>Set point values and performance levels for each criterion</li>
                  <li>Add descriptive feedback templates for quick comments</li>
                  <li>Save and reuse rubrics across assignments and courses</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Weighted Categories</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Assign different weights to criteria based on their importance in your grading scheme.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Template Library</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Start with pre-built rubric templates for common assignment types.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">AI Suggestions</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Get AI-powered suggestions for rubric criteria based on your assignment description.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Easy Sharing</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Share rubrics with colleagues or export them for use in other platforms.</p>
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










