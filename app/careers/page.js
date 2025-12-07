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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Careers">
              Careers
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Join the Domax team and help transform education with AI-powered grading technology. We're building the future of automated feedback and assessment.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#0A3059] mb-6">Open Positions</h2>
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <div key={index} className="p-6 bg-[#f0f7ff] rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A3059] mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
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

            <section className="p-8 bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] rounded-2xl">
              <h2 className="text-2xl font-semibold text-[#0A3059] mb-4">Why Work at Domax?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Mission-Driven</h3>
                  <p className="text-gray-600 text-sm">Help educators save time and improve student outcomes with cutting-edge technology.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Remote-First</h3>
                  <p className="text-gray-600 text-sm">Work from anywhere with flexible schedules and a supportive team culture.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Growth Opportunities</h3>
                  <p className="text-gray-600 text-sm">Fast-growing company with opportunities to take on new challenges and advance your career.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A3059] mb-2">Competitive Benefits</h3>
                  <p className="text-gray-600 text-sm">Health insurance, equity, unlimited PTO, and professional development budget.</p>
                </div>
              </div>
            </section>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Don't see a position that fits? We'd still love to hear from you.</p>
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










