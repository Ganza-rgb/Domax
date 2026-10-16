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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              For Teachers
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Save hours every week with AI-powered grading designed specifically for individual teachers. Get back your evenings and weekends while delivering better feedback to your students.
            </p>

            <div className="prose max-w-none">
              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Perfect for Individual Educators</h2>
                <p className="text-ink-2 mb-4">
                  Whether you teach one class or multiple courses, Domax helps you grade faster and more consistently. Start with our free trial and see the difference in your first week.
                </p>
                <ul className="list-disc pl-5 text-ink-2 space-y-2 marker:text-ink-3">
                  <li>Simple setup - get started in under 5 minutes</li>
                  <li>Affordable pricing starting at $9.99/month</li>
                  <li>Grade papers for multiple classes in one platform</li>
                  <li>Free 14-day trial with no credit card required</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-[1.375rem] font-medium text-ink mb-3">Why Teachers Love Domax</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Time Savings</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Save 10-15 hours per week on grading, giving you more time for lesson planning and student interaction.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Better Feedback</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Provide more detailed, consistent feedback than you could manually, helping students improve faster.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Easy to Use</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">You can mark your first class the day you sign up. There’s no training course to sit through.</p>
                  </div>
                  <div className="p-6 bg-white border border-line rounded-xl">
                    <h3 className="text-[17px] font-semibold text-ink mb-1.5">Flexible Pricing</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">Pay only for what you need with transparent, affordable pricing that fits your budget.</p>
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










