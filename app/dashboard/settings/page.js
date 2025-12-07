'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'
import { RestartOnboardingButton } from '@/components/dashboard/OnboardingHelper'

export default function SettingsPage() {
  const { setCurrentSection } = useDashboardState()
  const { teacher, updatePreferences } = useUserState()

  useEffect(() => {
    setCurrentSection('settings')
  }, [setCurrentSection])

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Settings"
        title="Personalize your workspace"
        subtitle="Controls apply across every exam and submission."
      />
      <div className="sky-card space-y-5">
        <div>
          <p className="sky-label">Profile</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm font-semibold text-[#0A3059]">Full name</label>
              <input
                type="text"
                value={teacher.name}
                readOnly
                className="mt-2 w-full rounded-2xl border border-[#eef1ff] bg-[#f8fbff] px-4 py-3 text-sm text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0A3059]">School code</label>
              <input
                type="text"
                value={teacher.schoolCode}
                readOnly
                className="mt-2 w-full rounded-2xl border border-[#eef1ff] bg-[#f8fbff] px-4 py-3 text-sm text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#eef1ff] pt-5">
          <p className="sky-label">Preferences</p>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 text-sm text-[#0A3059]">
              <input
                type="checkbox"
                checked={teacher.preferences.notifications}
                onChange={(event) => updatePreferences({ notifications: event.target.checked })}
                className="rounded border-[#dfe3ff] text-[#005ffe] focus:ring-[#005ffe]"
              />
              Email me when AI confidence is below 70%
            </label>
            <label className="flex items-center gap-3 text-sm text-[#0A3059]">
              <input
                type="checkbox"
                checked={teacher.preferences.autoRelease}
                onChange={(event) => updatePreferences({ autoRelease: event.target.checked })}
                className="rounded border-[#dfe3ff] text-[#005ffe] focus:ring-[#005ffe]"
              />
              Auto-release submissions with confidence above 95%
            </label>
          </div>
        </div>

        <div className="border-t border-[#eef1ff] pt-5">
          <p className="sky-label">Help & Support</p>
          <div className="mt-3">
            <p className="text-sm text-[var(--sky-subtle)] mb-3">
              Restart the welcome tour to see the essential features again.
            </p>
            <RestartOnboardingButton />
          </div>
        </div>

        <Button variant="primary" size="sm">
          Save settings
        </Button>
      </div>
    </div>
  )
}
