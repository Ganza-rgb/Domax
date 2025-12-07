import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Button from '@/components/atoms/Button'

export const metadata = {
  title: 'Case Studies — Domax',
  description: 'Real stories from teachers using Domax to transform grading workflows.',
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      cohort: 'Teacher Pod · Kigali Lit Circle',
      role: 'Professor of English',
      name: 'Dr. Sarah Johnson',
      result: 'Saves 12 hours per week',
      quote: 'Domax has completely transformed how I grade. I can now provide detailed feedback to all 150 students without spending my entire weekend grading.',
      metrics: ['80% time reduction', '150 students per semester', '12 hours saved weekly'],
    },
    {
      cohort: 'Community History Collective',
      role: 'History Teacher',
      name: 'Michael Chen',
      result: 'Grades 200+ papers per week',
      quote: 'The batch processing feature is a game-changer. I can grade an entire class set in the time it used to take me to grade three papers.',
      metrics: ['200+ papers weekly', '5 classes', '95% accuracy rate'],
    },
    {
      cohort: 'Regional Examiner Hub',
      role: 'Assessment Lead',
      name: 'Dr. Patricia Williams',
      result: 'Teacher network rollout',
      quote: 'We rolled Domax out across our entire examiner hub. The consistency in grading and quality of feedback has improved dramatically.',
      metrics: ['25 graders', '5,000+ submissions', 'Network-wide adoption'],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Studies">
              Case Studies
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Real stories from teachers using Domax to transform their grading workflows and save time while improving feedback quality.
            </p>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <div key={index} className="p-8 bg-[#f0f7ff] rounded-2xl">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#005ffe] mb-1">{study.cohort}</p>
                    <h2 className="text-2xl font-bold text-[#0A3059] mb-2">{study.name}</h2>
                    <p className="text-gray-600">{study.role}</p>
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic border-l-4 border-[#005ffe] pl-4">
                    "{study.quote}"
                  </blockquote>
                  <div className="flex flex-wrap gap-4">
                    {study.metrics.map((metric, metricIndex) => (
                      <span key={metricIndex} className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-[#0A3059]">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/contact" variant="primary" size="lg">
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}



