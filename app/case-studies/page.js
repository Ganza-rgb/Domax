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
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Case Studies
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Real stories from teachers using Domax to transform their grading workflows and save time while improving feedback quality.
            </p>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <div key={index} className="p-8 bg-white border border-line rounded-xl">
                  <div className="mb-6">
                    <p className="eyebrow mb-2">{study.cohort}</p>
                    <h2 className="text-2xl font-semibold text-ink mb-2">{study.name}</h2>
                    <p className="text-ink-2">{study.role}</p>
                  </div>
                  <blockquote className="text-lg text-ink mb-6 border-l-2 border-accent pl-5">
                    "{study.quote}"
                  </blockquote>
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((metric, metricIndex) => (
                      <span key={metricIndex} className="px-3 py-1.5 bg-white border border-line rounded-md text-sm font-semibold text-ink">
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



