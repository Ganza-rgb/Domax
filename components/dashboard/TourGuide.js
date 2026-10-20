'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'

const tourSteps = [
  {
    id: 'welcome',
    path: '/dashboard',
    target: null,
    title: 'Welcome to Domax',
    description: 'Every exam goes through four steps: prepare, collect the scripts, mark, and release. This short tour shows where each one starts.',
    position: 'center',
  },
  {
    id: 'sidebar',
    path: '/dashboard',
    target: '[data-tour="sidebar-menu"]',
    title: 'Five places, that’s all',
    description: 'Today shows what needs you now. Exams, Rubrics and Classes hold your work. Settings holds your account.',
    position: 'right',
  },
  {
    id: 'class',
    path: '/dashboard/classes',
    target: '[data-tour="new-class-button"]',
    title: 'Start with a class',
    description: 'Add your students once, or import the list from CAMIS, Urubuto or a spreadsheet. Domax uses it to tell you whose script is missing.',
    position: 'bottom',
  },
  {
    id: 'rubric',
    path: '/dashboard/rubrics',
    target: '[data-tour="create-rubric-button"]',
    title: 'Write your marking scheme once',
    description: 'Rubrics are saved in your library and reused next term. Each change is kept as a new version.',
    position: 'bottom',
  },
  {
    id: 'exam',
    path: '/dashboard/exams',
    target: '[data-tour="create-exam-button"]',
    title: 'Then create the exam',
    description: 'Pick the class and the rubric, print the answer sheets, and Domax walks you through the rest.',
    position: 'bottom',
  },
  {
    id: 'complete',
    path: '/dashboard',
    target: null,
    title: 'You’re ready',
    description: 'You can restart this tour any time from Settings.',
    position: 'center',
  },
]

export default function TourGuide() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [targetElement, setTargetElement] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const overlayRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    // Check if tour should be shown
    const completed = localStorage.getItem('domax_onboarding_completed')
    if (!completed) {
      // Delay to ensure DOM is ready and page is loaded
      const timer = setTimeout(() => {
        setIsVisible(true)
        setCurrentStep(0)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const step = tourSteps[currentStep]
    if (!step) return

    // Navigate to the step's path if needed
    if (step.path && pathname !== step.path) {
      router.push(step.path)
      // Wait for navigation
      setTimeout(() => {
        highlightTarget(step)
      }, 500)
    } else {
      highlightTarget(step)
    }
  }, [currentStep, isVisible, pathname, router])

  // Update positions on scroll/resize
  useEffect(() => {
    if (!isVisible) return

    const updatePositions = () => {
      const step = tourSteps[currentStep]
      if (step && step.target) {
        const element = document.querySelector(step.target)
        if (element) {
          // Only update if element position changed significantly
          const rect = element.getBoundingClientRect()
          if (targetElement) {
            const oldRect = targetElement.getBoundingClientRect()
            if (Math.abs(rect.top - oldRect.top) > 5 || Math.abs(rect.left - oldRect.left) > 5) {
              setTargetElement(element)
            }
          }
          positionTooltip(element, step.position)
        }
      } else if (!step.target) {
        positionTooltip(null, step.position)
      }
    }

    // Update immediately
    updatePositions()

    window.addEventListener('scroll', updatePositions, true)
    window.addEventListener('resize', updatePositions)

    return () => {
      window.removeEventListener('scroll', updatePositions, true)
      window.removeEventListener('resize', updatePositions)
    }
  }, [isVisible, currentStep, targetElement])

  const highlightTarget = (step) => {
    if (!step.target) {
      setTargetElement(null)
      // Position tooltip in center for steps without target
      setTimeout(() => {
        positionTooltip(null, step.position)
      }, 100)
      return
    }

    // Wait a bit longer for elements to render
    setTimeout(() => {
      const element = document.querySelector(step.target)
      if (element) {
        setTargetElement(element)
        positionTooltip(element, step.position)
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        // Element not found, try again after a delay
        setTimeout(() => {
          const retryElement = document.querySelector(step.target)
          if (retryElement) {
            setTargetElement(retryElement)
            positionTooltip(retryElement, step.position)
            retryElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          } else {
            setTargetElement(null)
            positionTooltip(null, step.position)
          }
        }, 500)
      }
    }, 300)
  }

  const positionTooltip = (element, position) => {
    const tooltipWidth = 320
    const tooltipHeight = 240 // Increased to account for buttons
    const spacing = 20

    let top = 0
    let left = 0

    if (position === 'center' || !element) {
      top = window.innerHeight / 2 - tooltipHeight / 2
      left = window.innerWidth / 2 - tooltipWidth / 2
    } else {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      
      switch (position) {
        case 'top':
          top = rect.top - tooltipHeight - spacing
          left = rect.left + rect.width / 2 - tooltipWidth / 2
          // If tooltip would go off top, position it below instead
          if (top < 16) {
            top = rect.bottom + spacing
          }
          break
        case 'bottom':
          top = rect.bottom + spacing
          left = rect.left + rect.width / 2 - tooltipWidth / 2
          // If tooltip would go off bottom, position it above instead
          if (top + tooltipHeight > viewportHeight - 16) {
            top = rect.top - tooltipHeight - spacing
          }
          break
        case 'left':
          top = rect.top + rect.height / 2 - tooltipHeight / 2
          left = rect.left - tooltipWidth - spacing
          // If tooltip would go off left, position it to the right instead
          if (left < 16) {
            left = rect.right + spacing
          }
          break
        case 'right':
          top = rect.top + rect.height / 2 - tooltipHeight / 2
          left = rect.right + spacing
          // If tooltip would go off right, position it to the left instead
          if (left + tooltipWidth > viewportWidth - 16) {
            left = rect.left - tooltipWidth - spacing
          }
          break
        default:
          top = rect.bottom + spacing
          left = rect.left + rect.width / 2 - tooltipWidth / 2
      }

      // Keep tooltip within viewport with padding
      top = Math.max(20, Math.min(top, viewportHeight - tooltipHeight - 20))
      left = Math.max(20, Math.min(left, viewportWidth - tooltipWidth - 20))
    }

    setTooltipPosition({ top, left })
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setIsTransitioning(true)
      setTargetElement(null)
      // Fade out, then change step, then fade in
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 200)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true)
      setTargetElement(null)
      // Fade out, then change step, then fade in
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 200)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem('domax_onboarding_completed', 'true')
    setIsVisible(false)
    setTargetElement(null)
  }

  if (!isVisible) {
    // Debug: Check if tour should be visible
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const completed = localStorage.getItem('domax_onboarding_completed')
      // Uncomment to debug:
      // console.log('Tour Guide Debug:', { isVisible, completed, currentStep })
    }
    return null
  }

  const step = tourSteps[currentStep]
  if (!step) return null

  const isFirst = currentStep === 0
  const isLast = currentStep === tourSteps.length - 1

  return (
    <>
      {/* Spotlight overlay - darkens everything except target */}
      {(() => {
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const radius = Math.max(rect.width, rect.height) / 2 + 40
          
          return (
            <div
              ref={overlayRef}
              className={`fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                background: `radial-gradient(circle at ${centerX}px ${centerY}px, transparent 0px, transparent ${radius}px, rgba(0, 0, 0, 0.6) ${radius + 30}px, rgba(0, 0, 0, 0.6) 100%)`,
              }}
            />
          )
        } else {
          // Full overlay for center steps (no target)
          return (
            <div
              ref={overlayRef}
              className={`fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            />
          )
        }
      })()}

      {/* Highlight border around target element with bouncing animation */}
      {targetElement &&
        (() => {
          const rect = targetElement.getBoundingClientRect()
          return createPortal(
            <div
              key={`highlight-${currentStep}`}
              className={`fixed z-[9999] pointer-events-none transition-all duration-500 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                top: `${rect.top - 6}px`,
                left: `${rect.left - 6}px`,
                width: `${rect.width + 12}px`,
                height: `${rect.height + 12}px`,
                borderRadius: '16px',
                border: '3px solid #005ffe',
                boxShadow: '0 0 0 4px rgba(0, 95, 254, 0.3), 0 0 0 8px rgba(0, 95, 254, 0.15), 0 0 30px rgba(0, 95, 254, 0.5)',
                animation: isTransitioning ? 'none' : 'bounce-border 2s ease-in-out infinite',
              }}
            />,
            document.body
          )
        })()}

      {/* Tooltip */}
      {createPortal(
        <div
          ref={tooltipRef}
          className={`fixed z-[10000] w-80 bg-[var(--sky-panel)] border-2 border-[#005ffe] rounded-2xl shadow-2xl p-6 transition-all duration-500 ${
            isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
          }`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1.5">
              {tourSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-6 bg-[#005ffe]'
                      : idx < currentStep
                      ? 'w-1.5 bg-[#005ffe]/50'
                      : 'w-1.5 bg-[var(--sky-surface)]'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-[var(--sky-subtle)] hover:text-[var(--sky-text)] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={`mb-4 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-lg font-semibold text-[var(--sky-text)] mb-2">{step.title}</h3>
            <p className="text-sm text-[var(--sky-subtle)] leading-relaxed">{step.description}</p>
          </div>

          {/* Action button */}
          {step.action && (
            <div className="mb-4">
              <button
                type="button"
                onClick={step.action.onClick}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#005ffe] to-[#0047cc] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
              >
                {step.action.label}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm text-[var(--sky-subtle)] hover:text-[var(--sky-text)] transition-colors"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-semibold text-[var(--sky-text)] border border-[var(--sky-panel-border)] rounded-xl hover:bg-[var(--sky-surface)] transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#005ffe] to-[#0047cc] rounded-xl hover:shadow-lg transition-all"
              >
                {isLast ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

