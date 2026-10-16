'use client'

import { useEffect } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useDashboardState } from '@/states/useDashboardState'
import { useUserState } from '@/states/useUserState'
import { useThemeState } from '@/states/useThemeState'
import { RestartOnboardingButton } from '@/components/dashboard/OnboardingHelper'

function Toggle({ id, checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-[var(--sky-text)] cursor-pointer">
          {label}
        </label>
        {description && <p className="text-sm text-[var(--sky-subtle)] mt-0.5">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-10 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-[#005ffe]' : 'bg-[var(--sky-panel-border)]'
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { setCurrentSection } = useDashboardState()
  const { teacher, updatePreferences } = useUserState()
  const { isDark, setTheme } = useThemeState()

  useEffect(() => {
    setCurrentSection('settings')
  }, [setCurrentSection])

  return (
    <div className="space-y-6 max-w-3xl">
      <WorkspaceHeader
        meta="Settings"
        title="Settings"
        subtitle="Changes save automatically."
      />

      <Panel meta="Account" title="Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="settings-name" className={labelClass}>Full name</label>
            <input id="settings-name" type="text" value={teacher.name} readOnly className={fieldClass} />
          </div>
          <div>
            <label htmlFor="settings-school" className={labelClass}>School code</label>
            <input id="settings-school" type="text" value={teacher.schoolCode} readOnly className={fieldClass} />
          </div>
        </div>
        <p className="text-xs text-[var(--sky-subtle)] mt-3">Profile details are managed by your school administrator.</p>
      </Panel>

      <Panel meta="Marking" title="Preferences">
        <div className="divide-y divide-[var(--sky-panel-border)]">
          <Toggle
            id="pref-notifications"
            checked={teacher.preferences.notifications}
            onChange={(value) => updatePreferences({ notifications: value })}
            label="Email me when Domax is unsure about an answer"
            description="A daily summary of answers that need a closer look."
          />
          <Toggle
            id="pref-autorelease"
            checked={teacher.preferences.autoRelease}
            onChange={(value) => updatePreferences({ autoRelease: value })}
            label="Auto-release submissions with confidence above 95%"
            description="Off by default. When off, every script waits for you to finalize it."
          />
        </div>
      </Panel>

      <Panel meta="Display" title="Appearance">
        <Toggle
          id="pref-dark"
          checked={isDark}
          onChange={(value) => setTheme(value ? 'dark' : 'light')}
          label="Dark theme"
          description="Applies to the workspace only."
        />
      </Panel>

      <Panel meta="Help & support" title="Welcome tour">
        <p className="text-sm text-[var(--sky-subtle)] mb-3">
          Restart the welcome tour to see the essential features again.
        </p>
        <RestartOnboardingButton />
      </Panel>
    </div>
  )
}
