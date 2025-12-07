import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'For Teachers — Domax',
  description: 'Save hours every week with AI-powered grading designed specifically for individual teachers and educators.',
}

export default function TeachersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Teachers">
              For Teachers
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Save hours every week with AI-powered grading designed specifically for individual teachers. Get back your evenings and weekends while delivering better feedback to your students.
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Perfect for Individual Educators</h2>
                <p className="text-gray-600 mb-4">
                  Whether you teach one class or multiple courses, Domax helps you grade faster and more consistently. Start with our free trial and see the difference in your first week.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Simple setup - get started in under 5 minutes</li>
                  <li>Affordable pricing starting at $9.99/month</li>
                  <li>Grade papers for multiple classes in one platform</li>
                  <li>Free 14-day trial with no credit card required</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Why Teachers Love Domax</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Time Savings</h3>
                    <p className="text-gray-600 text-sm">Save 10-15 hours per week on grading, giving you more time for lesson planning and student interaction.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Better Feedback</h3>
                    <p className="text-gray-600 text-sm">Provide more detailed, consistent feedback than you could manually, helping students improve faster.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Easy to Use</h3>
                    <p className="text-gray-600 text-sm">Intuitive interface that requires no training - start grading smarter from day one.</p>
                  </div>
                  <div className="p-6 bg-[#f0f7ff] rounded-2xl">
                    <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Flexible Pricing</h3>
                    <p className="text-gray-600 text-sm">Pay only for what you need with transparent, affordable pricing that fits your budget.</p>
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










