import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Plagiarism Detection — Domax',
  description: 'Ensure academic integrity with advanced plagiarism detection tools that check against billions of sources.',
}

export default function PlagiarismPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Detection">
              Plagiarism Detection
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Ensure academic integrity with instant similarity checking. Protect your class standards with advanced plagiarism detection that checks against billions of sources.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Comprehensive Checking</h2>
                <p className="text-gray-600 mb-4">
                  Our plagiarism detection system checks student papers against a vast database of academic sources, web content, and previously submitted papers. Get detailed similarity reports with highlighted matches.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Check against billions of web pages and academic sources</li>
                  <li>Compare with previously submitted papers in your class or teacher pod</li>
                  <li>Get detailed similarity reports with match percentages</li>
                  <li>Highlight exact matches and paraphrased content</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Instant Results</h3>
                    <p className="text-gray-600 text-sm">Get plagiarism reports in seconds, not hours, with our fast detection engine.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Source Links</h3>
                    <p className="text-gray-600 text-sm">View direct links to matched sources for easy verification and investigation.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Pod Database</h3>
                    <p className="text-gray-600 text-sm">Compare against papers previously submitted across your teacher pod.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Batch Checking</h3>
                    <p className="text-gray-600 text-sm">Check multiple papers simultaneously for efficient processing.</p>
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



