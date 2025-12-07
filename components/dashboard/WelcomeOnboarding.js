'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/atoms/Button'

const onboardingSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Domax! 👋',
    description: "Let's get you started with the essential features. This will only take a minute.",
    icon: '👋',
    action: null,
  },
  {
    id: 'upload',
    title: 'Upload your first paper',
    description: 'Start by uploading student papers. We support PDF, DOCX, and TXT formats.',
    icon: '📄',
    action: { label: 'Go to Upload', href: '/dashboard/upload' },
  },
  {
    id: 'rubric',
    title: 'Create a grading rubric',
    description: 'Set up your grading criteria to ensure consistent and fair scoring.',
    icon: '📋',
    action: { label: 'Create Rubric', href: '/dashboard/rubrics' },
  },
  {
    id: 'exam',
    title: 'Create an exam',
    description: 'Organize your papers by creating exams or assignments for your classes.',
    icon: '📝',
    action: { label: 'Create Exam', href: '/dashboard/exams' },
  },
  {
    id: 'grade',
    title: 'Start grading',
    description: 'Review and grade submissions. Our AI helps with suggestions, but you have full control.',
    icon: '✅',
    action: { label: 'View Submissions', href: '/dashboard/submissions' },
  },
  {
    id: 'complete',
    title: "You're all set! 🎉",
    description: "You've learned the basics. Explore the dashboard and start grading papers!",
    icon: '🎉',
    action: null,
  },
]

export default function WelcomeOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('domax_onboarding_completed')
    if (!completed) {
      setIsVisible(true)
    } else {
      setIsCompleted(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem('domax_onboarding_completed', 'true')
    setIsVisible(false)
    setIsCompleted(true)
  }

  const handleAction = (action) => {
    if (action?.href) {
      router.push(action.href)
      // Auto-advance after navigation
      setTimeout(() => {
        if (currentStep < onboardingSteps.length - 1) {
          setCurrentStep(currentStep + 1)
        }
      }, 500)
    }
  }

  if (!isVisible || isCompleted) return null

  const step = onboardingSteps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === onboardingSteps.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-[var(--sky-surface)]">
          <div
            className="h-full bg-gradient-to-r from-[#005ffe] to-[#0047cc] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#005ffe] to-[#0047cc] flex items-center justify-center text-4xl">
              {step.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-[var(--sky-text)] text-center mb-3">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-[var(--sky-subtle)] text-center mb-6 leading-relaxed">
            {step.description}
          </p>

          {/* Action button (if available) */}
          {step.action && (
            <div className="mb-6">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => handleAction(step.action)}
              >
                {step.action.label}
              </Button>
            </div>
          )}

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {onboardingSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-8 bg-[#005ffe]'
                    : idx < currentStep
                    ? 'w-2 bg-[#005ffe]/50'
                    : 'w-2 bg-[var(--sky-surface)]'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-2 text-sm text-[var(--sky-subtle)] hover:text-[var(--sky-text)] transition-colors"
            >
              Skip tour
            </button>

            <div className="flex items-center gap-3">
              {!isFirst && (
                <Button variant="outline" size="sm" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <Button variant="primary" size="sm" onClick={handleNext}>
                {isLast ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




