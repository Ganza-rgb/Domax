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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Support">
              Support
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We're here to help. Get the support you need to make the most of Domax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Help Center</h3>
                <p className="text-gray-600 text-sm mb-4">Browse our knowledge base for answers to common questions and tutorials.</p>
                <Button href="/help" variant="outline" size="sm">Visit Help Center</Button>
              </div>
              <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Documentation</h3>
                <p className="text-gray-600 text-sm mb-4">Complete guides and API documentation for developers and power users.</p>
                <Button href="/docs" variant="outline" size="sm">View Docs</Button>
              </div>
              <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Contact Support</h3>
                <p className="text-gray-600 text-sm mb-4">Reach out to our support team for personalized assistance.</p>
                <Button href="/contact" variant="outline" size="sm">Contact Us</Button>
              </div>
              <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                <h3 className="text-lg font-semibold text-[#0A3059] mb-2">System Status</h3>
                <p className="text-gray-600 text-sm mb-4">Check the current status of all Domax services and systems.</p>
                <Button href="/status" variant="outline" size="sm">Check Status</Button>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] rounded-2xl">
              <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Contact Information</h2>
              <div className="space-y-3 text-gray-700">
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










