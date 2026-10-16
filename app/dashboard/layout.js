'use client'

import SimpleSidebar from '@/components/dashboard/SimpleSidebar'
import SimpleTopBar from '@/components/dashboard/SimpleTopBar'
import SimpleRightPanel from '@/components/dashboard/SimpleRightPanel'
import SimpleCommandPalette from '@/components/dashboard/SimpleCommandPalette'
import TourGuide from '@/components/dashboard/TourGuide'
import { DashboardStateProvider } from '@/states/useDashboardState'
import { ExamStateProvider } from '@/states/useExamState'
import { SubmissionStateProvider } from '@/states/useSubmissionState'
import { UserStateProvider } from '@/states/useUserState'
import { ThemeStateProvider } from '@/states/useThemeState'

export default function DashboardLayout({ children }) {
  return (
    <ThemeStateProvider>
      <DashboardStateProvider>
        <UserStateProvider>
          <ExamStateProvider>
            <SubmissionStateProvider>
              <div data-workspace className="flex h-screen bg-[var(--sky-surface)] text-[var(--sky-text)] overflow-hidden">
                {/* Left Sidebar - VS Code style */}
                <SimpleSidebar />
                
                {/* Main content area */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Top bar */}
                  <SimpleTopBar />
                  
                  {/* Main content */}
                  <div className="flex-1 flex overflow-hidden">
                    <main id="workspace-main" className="flex-1 overflow-y-auto bg-[var(--sky-surface)] px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:pt-7 lg:pb-10">
                      <div className="mx-auto max-w-[1280px]">{children}</div>
                    </main>

                    {/* Context panel — renders only when something is selected */}
                    <SimpleRightPanel />
                  </div>
                </div>
              </div>
              
              {/* Command Palette - Overlay */}
              <SimpleCommandPalette />
              
              {/* Interactive Tour Guide - For new users */}
              <TourGuide />
            </SubmissionStateProvider>
          </ExamStateProvider>
        </UserStateProvider>
      </DashboardStateProvider>
    </ThemeStateProvider>
  )
}

