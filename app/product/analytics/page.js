import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Analytics Dashboard — Domax',
  description: 'Track student performance, identify trends, and make data-driven decisions with comprehensive analytics.',
}

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Dashboard">
              Analytics Dashboard
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Track student performance, identify trends, and make data-driven decisions. Get insights into class-wide patterns and individual student progress.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Comprehensive Insights</h2>
                <p className="text-gray-600 mb-4">
                  Our analytics dashboard provides detailed insights into student performance, grading efficiency, and class trends. Visualize data with charts, graphs, and reports.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>View class-wide performance metrics and distributions</li>
                  <li>Track individual student progress over time</li>
                  <li>Identify common areas where students struggle</li>
                  <li>Export reports for administrative purposes</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Performance Trends</h3>
                    <p className="text-gray-600 text-sm">Track how class performance changes over time with visual trend analysis.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Rubric Analysis</h3>
                    <p className="text-gray-600 text-sm">See which rubric criteria students struggle with most across all assignments.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Grading Efficiency</h3>
                    <p className="text-gray-600 text-sm">Monitor how much time you save and track your grading productivity.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Custom Reports</h3>
                    <p className="text-gray-600 text-sm">Generate custom reports for specific time periods, assignments, or student groups.</p>
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










