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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Builder">
              Rubric Builder
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Create, customize, and apply rubrics that ensure consistent, fair grading across all your assignments. Design reusable rubrics in minutes and apply them to any assignment.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Build Custom Rubrics</h2>
                <p className="text-gray-600 mb-4">
                  Our intuitive rubric builder lets you create detailed grading criteria with weighted categories, point values, and descriptive feedback options. Save and reuse rubrics across courses and semesters.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Create rubrics with multiple criteria and weighted categories</li>
                  <li>Set point values and performance levels for each criterion</li>
                  <li>Add descriptive feedback templates for quick comments</li>
                  <li>Save and reuse rubrics across assignments and courses</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Weighted Categories</h3>
                    <p className="text-gray-600 text-sm">Assign different weights to criteria based on their importance in your grading scheme.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Template Library</h3>
                    <p className="text-gray-600 text-sm">Start with pre-built rubric templates for common assignment types.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">AI Suggestions</h3>
                    <p className="text-gray-600 text-sm">Get AI-powered suggestions for rubric criteria based on your assignment description.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Easy Sharing</h3>
                    <p className="text-gray-600 text-sm">Share rubrics with colleagues or export them for use in other platforms.</p>
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










