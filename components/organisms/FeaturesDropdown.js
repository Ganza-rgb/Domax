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

export default function FeaturesDropdown() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <GradientHeading as="h2" className="text-3xl sm:text-4xl" highlightText="scale">
            Simple to start. Built to scale.
          </GradientHeading>
          <p className="lede mt-4">
            Start grading smarter from day one with AI-powered feedback, intuitive rubrics, and seamless integrations. Every feature designed to save you time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-[#E3E8EF] bg-[#E3E8EF]">
            {featureCards.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 sm:p-7 hover:bg-[#FBFCFE] transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F7FF] text-[#005ffe] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A3059] mt-1">{feature.title}</h3>
                  <p className="text-[15px] text-[#4A5D75] leading-relaxed">{feature.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-[#E3E8EF] p-6 sm:p-8 flex flex-col gap-8">
            <div>
              <p className="eyebrow mb-4">Instant setup</p>
              <dl className="grid grid-cols-2 border-t border-[#E3E8EF]">
                <div className="pt-4">
                  <dd className="text-4xl font-semibold text-[#0A3059] font-headline tracking-tight tabular-nums">2 min</dd>
                  <dt className="text-sm text-[#4A5D75] mt-1">Average setup time</dt>
                </div>
                <div className="pt-4 pl-5 border-l border-[#E3E8EF]">
                  <dd className="text-4xl font-semibold text-[#005ffe] font-headline tracking-tight tabular-nums">80%</dd>
                  <dt className="text-sm text-[#4A5D75] mt-1">Time saved per assignment</dt>
                </div>
              </dl>
            </div>

            <ol className="space-y-5">
              {workflowSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full border border-[#CFD8E3] text-[#0A3059] text-sm font-semibold flex items-center justify-center flex-shrink-0 tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#0A3059]">{step.title}</p>
                    <p className="text-sm text-[#4A5D75] leading-relaxed mt-0.5">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
