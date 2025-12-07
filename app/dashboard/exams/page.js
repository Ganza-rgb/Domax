'use client'

import { useEffect, useMemo } from 'react'
import Button from '@/components/atoms/Button'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import ExamList from '@/components/dashboard/ExamList'
import ExamDetails from '@/components/dashboard/ExamDetails'
import { useDashboardState } from '@/states/useDashboardState'
import { useExamState } from '@/states/useExamState'
import { useSubmissionState } from '@/states/useSubmissionState'

export default function ExamsPage() {
  const { setCurrentSection, updatePanel } = useDashboardState()
  const { exams, activeExamId, findExamById } = useExamState()
  const { setActiveSubmissionId } = useSubmissionState()

  useEffect(() => {
    setCurrentSection('exams')
    if (activeExamId) {
      const exam = findExamById(activeExamId)
      if (exam) {
        updatePanel({ type: 'exam', payload: exam })
      }
    } else if (exams.length > 0) {
      updatePanel({ type: 'exam', payload: exams[0] })
    }
  }, [setCurrentSection, activeExamId, findExamById, updatePanel, exams])

  const activeExam = findExamById(activeExamId) || exams[0]

  const handleOpenSubmission = (submission) => {
    setActiveSubmissionId(submission.id)
    updatePanel({ type: 'submission', payload: submission })
  }

  const statusBoard = useMemo(
    () => [
      {
        label: 'Live exams',
        value: exams.filter((exam) => exam.status === 'in-progress').length,
        sub: 'Monitoring right now',
      },
      {
        label: 'Drafts',
        value: exams.filter((exam) => exam.status === 'draft').length,
        sub: 'Need scheduling',
      },
      {
        label: 'Awaiting review',
        value: exams.reduce((acc, exam) => acc + exam.stats.needsReview, 0),
        sub: 'Scripts pending manual oversight',
      },
    ],
    [exams]
  )

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Exams manager"
        title="Plan, monitor, and close out exams"
        subtitle={`${exams.length} upcoming + ongoing`}
        actions={
          <Button variant="primary" size="sm" data-tour="create-exam-button">
            Create exam
          </Button>
        }
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusBoard.map((stat) => (
          <article key={stat.label} className="sky-card">
            <p className="sky-label">{stat.label}</p>
            <p className="text-3xl font-semibold text-[var(--sky-text)] mt-3">{stat.value}</p>
            <p className="text-xs text-[var(--sky-subtle)] mt-2">{stat.sub}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-5">
        <article className="sky-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="sky-label">Exam spaces</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">Playbook</h3>
            </div>
            <Button variant="outline" size="sm">
              Import
            </Button>
          </div>
          <div className="mt-5">
            <ExamList onCreateExam={() => {}} />
          </div>
        </article>

        <article className="sky-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="sky-label">{activeExam ? activeExam.level : 'Exam'}</p>
              <h3 className="text-xl font-semibold text-[var(--sky-text)]">
                {activeExam ? activeExam.title : 'Select an exam'}
              </h3>
            </div>
            <Button variant="ghost" size="sm">
              Export progress
            </Button>
          </div>
          <ExamDetails exam={activeExam} onOpenSubmission={handleOpenSubmission} />
        </article>
      </section>
    </div>
  )
}
