import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Careers — Domax',
  description: 'Join the Domax team and help transform education with AI-powered grading technology.',
}

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Careers
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Join the Domax team and help transform education with AI-powered grading technology. We're building the future of automated feedback and assessment.
            </p>

            <section className="mb-12">
              <h2 className="text-[1.375rem] font-medium text-ink mb-5">Open Positions</h2>
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <div key={index} className="p-6 bg-white border border-line rounded-xl hover:shadow-card-hover transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-ink mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-ink-2">
                          <span>{position.department}</span>
                          <span>•</span>
                          <span>{position.location}</span>
                          <span>•</span>
                          <span>{position.type}</span>
                        </div>
                      </div>
                      <Button href="/contact" variant="outline" size="md">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 bg-canvas border border-line rounded-2xl">
              <h2 className="text-[1.375rem] font-medium text-ink mb-3">Why Work at Domax?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-1.5">Mission-Driven</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">Work on something teachers use every week, and hear from them directly about what works.</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-1.5">Remote-First</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">Work from anywhere with flexible schedules and a supportive team culture.</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-1.5">Growth Opportunities</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">Fast-growing company with opportunities to take on new challenges and advance your career.</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink mb-1.5">Competitive Benefits</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">Health insurance, equity, unlimited PTO, and professional development budget.</p>
                </div>
              </div>
            </section>

            <div className="mt-12 text-center">
              <p className="text-ink-2 mb-6">Don't see a position that fits? We'd still love to hear from you.</p>
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}










