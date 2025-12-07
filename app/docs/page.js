import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Documentation — Domax',
  description: 'Complete documentation for Domax grading platform, including API reference, guides, and tutorials.',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Documentation">
              Documentation
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Complete documentation for Domax grading platform. Learn how to use all features, integrate with our API, and get the most out of automated grading.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Getting Started</h2>
                <div className="space-y-4">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Quick Start Guide</h3>
                    <p className="text-gray-600 text-sm mb-4">Get up and running with Domax in under 5 minutes. Learn the basics of uploading papers, creating rubrics, and grading assignments.</p>
                    <Button href="/docs/quick-start" variant="outline" size="sm">Read Guide</Button>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">API Reference</h3>
                    <p className="text-gray-600 text-sm mb-4">Complete API documentation with endpoints, authentication, request/response examples, and code samples.</p>
                    <Button href="/docs/api" variant="outline" size="sm">View API Docs</Button>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Guides & Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Creating Rubrics</h3>
                    <p className="text-gray-600 text-sm">Step-by-step guide to building effective rubrics for your assignments.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Batch Processing</h3>
                    <p className="text-gray-600 text-sm">Learn how to efficiently grade multiple papers at once.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">LMS Integration</h3>
                    <p className="text-gray-600 text-sm">Connect Domax with Canvas, Moodle, Blackboard, and more.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Best Practices</h3>
                    <p className="text-gray-600 text-sm">Tips and strategies for getting the best results from AI grading.</p>
                  </div>
                </div>
              </section>

              <div className="mt-12 text-center">
                <Button href="/help" variant="primary" size="lg">
                  Need Help?
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










