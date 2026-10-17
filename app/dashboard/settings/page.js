'use client'

import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { Panel, fieldClass, labelClass, TickMark } from '@/components/dashboard/ui'
import { useUserState } from '@/states/useUserState'
import { useThemeState } from '@/states/useThemeState'
import { RestartOnboardingButton } from '@/components/dashboard/OnboardingHelper'
import BillingOverview from '@/components/dashboard/BillingOverview'
import { useWorkspace } from '@/states/useWorkspaceState'
import { useState } from 'react'

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
  const { teacher, updatePreferences } = useUserState()
  const { isDark, setTheme } = useThemeState()
  const { resetExampleWorkspace } = useWorkspace()
  const [resetDone, setResetDone] = useState(false)

  return (
    <div className="space-y-6 max-w-4xl">
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

      <Panel title="Marking">
        <div className="divide-y divide-[var(--sky-panel-border)]">
          <Toggle
            id="pref-notifications"
            checked={teacher.preferences.notifications}
            onChange={(value) => updatePreferences({ notifications: value })}
            label="Email me when Domax is unsure about an answer"
            description="A daily summary of answers that need a closer look."
          />
          {/* Not a setting: a teacher signs every released mark, always. */}
          <div className="flex items-start gap-3 py-4">
            <TickMark className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[var(--sky-text)]">You sign every mark</p>
              <p className="text-sm text-[var(--sky-subtle)] mt-0.5">
                Domax never releases a mark on its own, however sure it is. This can’t be switched off.
              </p>
            </div>
          </div>
        </div>
      </Panel>

      <section aria-labelledby="billing-heading" className="space-y-4">
        <h2 id="billing-heading" className="text-xl font-semibold tracking-[-0.02em]">Billing</h2>
        <BillingOverview />
      </section>

      <Panel meta="Display" title="Appearance">
        <Toggle
          id="pref-dark"
          checked={isDark}
          onChange={(value) => setTheme(value ? 'dark' : 'light')}
          label="Dark theme"
          description="Applies to the workspace only."
        />
      </Panel>

      <Panel title="Example workspace">
        <p className="text-sm text-[var(--sky-subtle)] mb-3">
          This prototype keeps your classes, rubrics and exams in this browser only. Resetting brings back the example exams and removes anything you added.
        </p>
        <button
          type="button"
          onClick={() => {
            resetExampleWorkspace()
            setResetDone(true)
          }}
          className="h-9 px-4 rounded-full border border-[var(--sky-panel-border)] text-sm font-semibold hover:bg-[var(--sky-surface)]"
        >
          Reset to the example workspace
        </button>
        {resetDone && <p className="text-sm text-[var(--vscode-green)] mt-2" role="status">Example workspace restored.</p>}
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
