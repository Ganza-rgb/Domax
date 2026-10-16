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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Analytics Dashboard
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Track student performance, identify trends, and make data-driven decisions. Get insights into class-wide patterns and individual student progress.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Comprehensive Insights</h2>
                <p className="text-ink-2 mb-4">
                  Our analytics dashboard provides detailed insights into student performance, grading efficiency, and class trends. Visualize data with charts, graphs, and reports.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>View class-wide performance metrics and distributions</li>
                  <li>Track individual student progress over time</li>
                  <li>Identify common areas where students struggle</li>
                  <li>Export reports for administrative purposes</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Performance Trends</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Track how class performance changes over time with visual trend analysis.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Rubric Analysis</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">See which rubric criteria students struggle with most across all assignments.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Grading Efficiency</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Monitor how much time you save and track your grading productivity.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Custom Reports</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Generate custom reports for specific time periods, assignments, or student groups.</p>
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










