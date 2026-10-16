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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Batch Processing
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Grade hundreds of papers simultaneously with automated workflows. Handle large class sizes efficiently and deliver consistent feedback to all students.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Process Multiple Papers at Once</h2>
                <p className="text-ink-2 mb-4">
                  Upload entire class sets, apply your rubric, and let Domax process all papers automatically. Review results, make adjustments, and release grades in bulk.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Upload multiple files or entire folders at once</li>
                  <li>Apply the same rubric to all papers automatically</li>
                  <li>Process hundreds of papers in minutes</li>
                  <li>Review and adjust grades before releasing to students</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Bulk Upload</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Upload entire folders or zip files containing all student submissions at once.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Progress Tracking</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Monitor batch processing progress in real-time with detailed status updates.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Bulk Actions</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Review, adjust, and release grades for multiple papers with a single action.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">LMS Integration</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Automatically sync grades and feedback to your LMS after processing.</p>
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










