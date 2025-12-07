import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'

export const metadata = {
  title: 'Cookie Policy — Domax',
  description: 'Information about how Domax uses cookies and similar tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Policy">
              Cookie Policy
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">1. What Are Cookies</h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">2. How We Use Cookies</h2>
                <p className="mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">3. Third-Party Cookies</h2>
                <p className="mb-4">
                  We may use third-party services that set cookies on your device, such as analytics providers and payment processors. These cookies are subject to the respective third parties' privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">4. Managing Cookies</h2>
                <p className="mb-4">
                  You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>See what cookies you have and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific sites</li>
                  <li>Block all cookies</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">5. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about our use of cookies, please contact us at privacy@domax.com or through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










