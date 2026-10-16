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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Plagiarism Detection
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Ensure academic integrity with instant similarity checking. Protect your class standards with advanced plagiarism detection that checks against billions of sources.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Comprehensive Checking</h2>
                <p className="text-ink-2 mb-4">
                  Our plagiarism detection system checks student papers against a vast database of academic sources, web content, and previously submitted papers. Get detailed similarity reports with highlighted matches.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Check against billions of web pages and academic sources</li>
                  <li>Compare with previously submitted papers in your class or teacher pod</li>
                  <li>Get detailed similarity reports with match percentages</li>
                  <li>Highlight exact matches and paraphrased content</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Instant Results</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Get plagiarism reports in seconds, not hours, with our fast detection engine.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Source Links</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">View direct links to matched sources for easy verification and investigation.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Pod Database</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Compare against papers previously submitted across your teacher pod.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Batch Checking</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Check multiple papers simultaneously for efficient processing.</p>
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



