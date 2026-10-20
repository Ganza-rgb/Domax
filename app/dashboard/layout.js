'use client'

import SimpleSidebar from '@/components/dashboard/SimpleSidebar'
import SimpleTopBar from '@/components/dashboard/SimpleTopBar'
import SimpleCommandPalette from '@/components/dashboard/SimpleCommandPalette'
import TourGuide from '@/components/dashboard/TourGuide'
import { WorkspaceStateProvider } from '@/states/useWorkspaceState'
import { UserStateProvider } from '@/states/useUserState'
import { ThemeStateProvider } from '@/states/useThemeState'

export default function DashboardLayout({ children }) {
  return (
    <ThemeStateProvider>
      <UserStateProvider>
        <WorkspaceStateProvider>
          <div data-workspace className="flex h-screen bg-[var(--sky-surface)] text-[var(--sky-text)] overflow-hidden">
            <SimpleSidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <SimpleTopBar />
              <main id="workspace-main" className="flex-1 overflow-y-auto bg-[var(--sky-surface)] px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:pt-7 lg:pb-10">
                <div className="mx-auto max-w-[1180px]">{children}</div>
              </main>
            </div>
          </div>

          {/* Ctrl/Cmd+K: find an exam, class, student or rubric */}
          <SimpleCommandPalette />

          {/* First-visit tour */}
          <TourGuide />
        </WorkspaceStateProvider>
      </UserStateProvider>
    </ThemeStateProvider>
  )
}
