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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Documentation
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Complete documentation for Domax grading platform. Learn how to use all features, integrate with our API, and get the most out of automated grading.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Getting Started</h2>
                <div className="space-y-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Quick Start Guide</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Get up and running with Domax in under 5 minutes. Learn the basics of uploading papers, creating rubrics, and grading assignments.</p>
                    <Button href="/docs/quick-start" variant="outline" size="sm">Read Guide</Button>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">API Reference</h3>
                    <p className="text-ink-2 text-sm leading-relaxed mb-4">Complete API documentation with endpoints, authentication, request/response examples, and code samples.</p>
                    <Button href="/docs/api" variant="outline" size="sm">View API Docs</Button>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Guides & Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Creating Rubrics</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Step-by-step guide to building effective rubrics for your assignments.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Batch Processing</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Learn how to efficiently grade multiple papers at once.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">LMS Integration</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Connect Domax with Canvas, Moodle, Blackboard, and more.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Best Practices</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Tips and strategies for getting the best results from AI grading.</p>
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










