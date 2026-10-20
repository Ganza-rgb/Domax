'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { EmptyState, WsButton as Button } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'
import { StepBar, examStatus } from '@/components/workspace/examStatus'
import { PrepareStep, CollectStep, MarkStep, ReleaseStep, ExamActivity } from '@/components/workspace/ExamSteps'

export default function ExamPage() {
  const { examId } = useParams()
  const { findExam, findClass, findRubric, progressOf, loaded } = useWorkspace()
  const exam = findExam(examId)
  const progress = exam ? progressOf(exam) : null
  const [viewing, setViewing] = useState(null)

  // Open on the step named in the link (?step=collect), else on the step the exam is at.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('step')
    if (['prepare', 'collect', 'mark', 'release'].includes(requested)) setViewing(requested)
  }, [])

  if (!exam) {
    return loaded ? (
      <EmptyState title="This exam isn’t here" body="It may have been created on another device. Exams are kept on the device they were made on in this prototype." action={<Button href="/dashboard/exams">All exams</Button>} />
    ) : null
  }

  const cls = findClass(exam.classId)
  const rubric = findRubric(exam.rubricId)
  const step = viewing || (progress.step === 'done' ? 'release' : progress.step)
  const status = examStatus(exam, progress, cls)

  return (
    <div className="space-y-6">
      <WorkspaceHeader title={exam.title} subtitle={`${cls?.name || 'No class'} · ${status.line}`} />

      <StepBar current={progress.step} viewing={step} onSelect={setViewing} />

      {step === 'prepare' && <PrepareStep exam={exam} cls={cls} rubric={rubric} progress={progress} />}
      {step === 'collect' && <CollectStep exam={exam} cls={cls} progress={progress} />}
      {step === 'mark' && <MarkStep exam={exam} progress={progress} />}
      {step === 'release' && <ReleaseStep exam={exam} cls={cls} progress={progress} />}

      <ExamActivity exam={exam} cls={cls} />
    </div>
  )
}
