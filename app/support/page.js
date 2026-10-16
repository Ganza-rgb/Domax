import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Support — Domax',
  description: 'Get help and support for Domax. Contact our support team or access resources.',
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Support
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              We're here to help. Get the support you need to make the most of Domax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="p-6 bg-white border border-line rounded-xl">
                <h3 className="text-[17px] font-semibold text-ink mb-1.5">Help Center</h3>
                <p className="text-ink-2 text-sm leading-relaxed mb-4">Browse our knowledge base for answers to common questions and tutorials.</p>
                <Button href="/help" variant="outline" size="sm">Visit Help Center</Button>
              </div>
              <div className="p-6 bg-white border border-line rounded-xl">
                <h3 className="text-[17px] font-semibold text-ink mb-1.5">Documentation</h3>
                <p className="text-ink-2 text-sm leading-relaxed mb-4">Complete guides and API documentation for developers and power users.</p>
                <Button href="/docs" variant="outline" size="sm">View Docs</Button>
              </div>
              <div className="p-6 bg-white border border-line rounded-xl">
                <h3 className="text-[17px] font-semibold text-ink mb-1.5">Contact Support</h3>
                <p className="text-ink-2 text-sm leading-relaxed mb-4">Reach out to our support team for personalized assistance.</p>
                <Button href="/contact" variant="outline" size="sm">Contact Us</Button>
              </div>
              <div className="p-6 bg-white border border-line rounded-xl">
                <h3 className="text-[17px] font-semibold text-ink mb-1.5">System Status</h3>
                <p className="text-ink-2 text-sm leading-relaxed mb-4">Check the current status of all Domax services and systems.</p>
                <Button href="/status" variant="outline" size="sm">Check Status</Button>
              </div>
            </div>

            <div className="p-8 bg-canvas border border-line rounded-2xl">
              <h2 className="text-[1.375rem] font-semibold text-ink mb-3">Contact Information</h2>
              <div className="space-y-3 text-ink-2">
                <p><strong>Email:</strong> support@domax.com</p>
                <p><strong>Response Time:</strong> We typically respond within 24 hours</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










