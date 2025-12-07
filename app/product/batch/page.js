import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Batch Processing — Domax',
  description: 'Grade hundreds of papers simultaneously with automated workflows and intelligent batch processing.',
}

export default function BatchPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Processing">
              Batch Processing
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Grade hundreds of papers simultaneously with automated workflows. Handle large class sizes efficiently and deliver consistent feedback to all students.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Process Multiple Papers at Once</h2>
                <p className="text-gray-600 mb-4">
                  Upload entire class sets, apply your rubric, and let Domax process all papers automatically. Review results, make adjustments, and release grades in bulk.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Upload multiple files or entire folders at once</li>
                  <li>Apply the same rubric to all papers automatically</li>
                  <li>Process hundreds of papers in minutes</li>
                  <li>Review and adjust grades before releasing to students</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Bulk Upload</h3>
                    <p className="text-gray-600 text-sm">Upload entire folders or zip files containing all student submissions at once.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Progress Tracking</h3>
                    <p className="text-gray-600 text-sm">Monitor batch processing progress in real-time with detailed status updates.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Bulk Actions</h3>
                    <p className="text-gray-600 text-sm">Review, adjust, and release grades for multiple papers with a single action.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">LMS Integration</h3>
                    <p className="text-gray-600 text-sm">Automatically sync grades and feedback to your LMS after processing.</p>
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










