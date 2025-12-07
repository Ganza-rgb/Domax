'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'

export function useOnboarding() {
  const [isCompleted, setIsCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('domax_onboarding_completed') === 'true'
    }
    return false
  })

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('domax_onboarding_completed', 'true')
      setIsCompleted(true)
    }
  }

  const restartOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('domax_onboarding_completed')
      setIsCompleted(false)
      // Reload to show tour
      window.location.reload()
    }
  }

  return {
    isCompleted,
    completeOnboarding,
    restartOnboarding,
  }
}

export function RestartOnboardingButton() {
  const { restartOnboarding } = useOnboarding()
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--sky-subtle)]">Restart welcome tour?</span>
        <Button variant="primary" size="sm" onClick={restartOnboarding}>
          Yes
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={() => setShowConfirm(true)}>
      Restart welcome tour
    </Button>
  )
}

