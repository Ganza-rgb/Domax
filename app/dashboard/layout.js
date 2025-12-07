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
              <div className="flex h-screen bg-[var(--sky-surface)] text-[var(--sky-text)] overflow-hidden">
                {/* Left Sidebar - VS Code style */}
                <SimpleSidebar />
                
                {/* Main content area */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Top bar */}
                  <SimpleTopBar />
                  
                  {/* Main content */}
                  <div className="flex-1 flex overflow-hidden">
                    <main className="flex-1 overflow-y-auto bg-[var(--sky-panel)] p-4 lg:p-6 pb-20 lg:pb-6">
                      {children}
                    </main>
                    
                    {/* Right panel - VS Code style */}
                    <aside className="hidden lg:block w-64 border-l border-[var(--sky-panel-border)] bg-[var(--sky-panel)] overflow-y-auto">
                      <SimpleRightPanel />
                    </aside>
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

