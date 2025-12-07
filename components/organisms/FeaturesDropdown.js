'use client'

import GradientHeading from '@/components/atoms/GradientHeading'

const featureCards = [
  {
    title: 'Grade faster. With AI.',
    copy:
      'Automate scoring and deliver consistent, actionable feedback in seconds so you can focus on teaching.',
    accent: 'from-[#005ffe] via-[#3775ff] to-[#003aa8]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Annotate smarter. In-document.',
    copy:
      'Highlight, comment, and suggest directly on student work with AI-assisted context for every note.',
    accent: 'from-[#00cd90] via-[#11bfa5] to-[#009b78]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Scale effortlessly. Batch process.',
    copy:
      'Handle hundreds of submissions simultaneously with smart automations, LMS integrations, and role-based access.',
    accent: 'from-[#ff9f43] via-[#ff8143] to-[#ff5b2b]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    title: 'Protect your data automatically.',
    copy:
      'Enterprise-grade security, audit logs, and SOC2-ready compliance keep student data protected everywhere.',
    accent: 'from-[#0A3059] via-[#132b4d] to-[#04122b]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const workflowSteps = [
  {
    title: 'Upload in seconds',
    copy: 'Drop in DOCX, PDF, or Google Docs. Domax converts, classifies, and organizes automatically.',
  },
  {
    title: 'Apply smart rubrics',
    copy: 'Reuse your rubrics or spin up AI-assisted templates tailored to each class.',
  },
  {
    title: 'Deliver actionable feedback',
    copy: 'Share annotated papers, analytics, and insights in one click.',
  },
]

const pricingFeatures = [
  'AI-powered grading',
  'Rubric builder',
  'In-document annotations',
  'Batch processing',
  'LMS integrations',
  'Plagiarism detection',
  'Analytics dashboard',
  '14-day free trial',
]

export default function FeaturesDropdown() {
  return (
    <section className="py-20 bg-[#eff3ff]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <GradientHeading as="h2" className="text-4xl lg:text-5xl mb-6" highlightText="scale">
            Simple to start. Built to scale.
          </GradientHeading>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Start grading smarter from day one with AI-powered feedback, intuitive rubrics, and seamless integrations. Every feature designed to save you time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureCards.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border-2 border-[#e0e4ff] bg-white p-6 sm:p-7 shadow-[0_30px_70px_-40px_rgba(10,48,89,0.25)] hover:border-[#005ffe] transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#f0f7ff] text-[#005ffe] flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A3059]">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white border-2 border-[#e0e4ff] shadow-[0_40px_90px_-45px_rgba(10,48,89,0.35)] p-6 sm:p-8 flex flex-col gap-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-[#e8f2ff] p-6 border border-[#d8ddff]">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">INSTANT SETUP</p>
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#0A3059]">2 min</p>
                  <p className="text-sm text-gray-500 mt-1">Average setup time</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-[#005ffe]">80%</p>
                  <p className="text-sm text-gray-500 mt-1">Time saved per assignment</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f7ff] text-[#005ffe] font-semibold flex items-center justify-center flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#0A3059]">{step.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Features Section */}
        <div className="mt-16 bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#eceeff] shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00cd90] to-[#2DD4BF] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[#0A3059] text-center">
              Everything you need to grade smarter
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {pricingFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#005ffe] flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[#0A3059] font-semibold text-sm lg:text-base leading-tight">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
