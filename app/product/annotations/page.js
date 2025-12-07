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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Annotations">
              In-Document Annotations
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Add comments, highlights, and suggestions directly on student papers. Give personalized guidance that helps students understand exactly what to improve.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Rich Annotation Tools</h2>
                <p className="text-gray-600 mb-4">
                  Our annotation system lets you provide detailed feedback directly on student papers. Highlight text, add comments, suggest improvements, and mark specific areas that need attention.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Highlight text with color-coded categories (strength, weakness, suggestion)</li>
                  <li>Add inline comments and suggestions at specific locations</li>
                  <li>Use quick comment templates for common feedback</li>
                  <li>Students see annotations exactly where you placed them</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Visual Feedback</h3>
                    <p className="text-gray-600 text-sm">Students see your annotations exactly where you placed them, making feedback clear and actionable.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Comment Templates</h3>
                    <p className="text-gray-600 text-sm">Save time with reusable comment templates for common feedback scenarios.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Voice Comments</h3>
                    <p className="text-gray-600 text-sm">Record voice comments for more personal, detailed feedback when needed.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Multi-Format Support</h3>
                    <p className="text-gray-600 text-sm">Annotate PDFs, Word documents, and other common file formats seamlessly.</p>
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










