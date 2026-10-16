import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'In-Document Annotations — Domax',
  description: 'Add comments, highlights, and suggestions directly on student papers with our powerful annotation tools.',
}

export default function AnnotationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              In-Document Annotations
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Add comments, highlights, and suggestions directly on student papers. Give personalized guidance that helps students understand exactly what to improve.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Rich Annotation Tools</h2>
                <p className="text-ink-2 mb-4">
                  Our annotation system lets you provide detailed feedback directly on student papers. Highlight text, add comments, suggest improvements, and mark specific areas that need attention.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Highlight text with color-coded categories (strength, weakness, suggestion)</li>
                  <li>Add inline comments and suggestions at specific locations</li>
                  <li>Use quick comment templates for common feedback</li>
                  <li>Students see annotations exactly where you placed them</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Visual Feedback</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Students see your annotations exactly where you placed them, making feedback clear and actionable.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Comment Templates</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Save time with reusable comment templates for common feedback scenarios.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Voice Comments</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Record voice comments for more personal, detailed feedback when needed.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Multi-Format Support</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Annotate PDFs, Word documents, and other common file formats seamlessly.</p>
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










