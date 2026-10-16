'use client'

import { useEffect, useMemo } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import ExamList from '@/components/dashboard/ExamList'
import ExamDetails from '@/components/dashboard/ExamDetails'
import { WsButton as Button, Panel, StatGroup } from '@/components/dashboard/ui'
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
        hint: 'Monitoring right now',
      },
      {
        label: 'Drafts',
        value: exams.filter((exam) => exam.status === 'draft').length,
        hint: 'Need scheduling',
      },
      {
        label: 'Awaiting review',
        value: exams.reduce((acc, exam) => acc + exam.stats.needsReview, 0),
        hint: 'Scripts pending manual oversight',
        tone: exams.some((exam) => exam.stats.needsReview > 0) ? 'caution' : 'neutral',
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
          <>
            <Button variant="secondary" size="sm" disabled title="Importing exams is not available yet">
              Import exam
            </Button>
            <Button
              variant="secondary"
              size="sm"
              data-tour="create-exam-button"
              disabled
              title="Exam creation is not available yet"
            >
              Create exam
            </Button>
          </>
        }
      />

      <StatGroup items={statusBoard} />

      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6 items-start">
        <Panel meta="Exam spaces" title="Playbook" bodyClassName="!px-2 !pb-2">
          <ExamList />
        </Panel>

        <Panel>
          <ExamDetails exam={activeExam} onOpenSubmission={handleOpenSubmission} />
        </Panel>
      </div>
    </div>
  )
}
