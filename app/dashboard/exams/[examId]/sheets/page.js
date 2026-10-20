'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import QRCode from 'qrcode'
import { useWorkspace } from '@/states/useWorkspaceState'
import { encodePageCode } from '@/lib/scriptCodes'

/*
 * Printable answer sheets: one page per answer page per student, each with
 * its own code. The code is the only thing Domax uses to know whose page a
 * photo is, so students write on these instead of plain paper.
 */
export default function AnswerSheets() {
  const { examId } = useParams()
  const { findExam, findClass, markSheetsPrinted, loaded } = useWorkspace()
  const exam = findExam(examId)
  const cls = exam ? findClass(exam.classId) : null
  const [codes, setCodes] = useState({})

  useEffect(() => {
    if (!exam || !cls) return
    let cancelled = false
    const jobs = cls.students.flatMap((s) =>
      Array.from({ length: exam.pagesPerScript }, (_, i) => {
        const text = encodePageCode({ examId: exam.id, studentId: s.id, page: i + 1, total: exam.pagesPerScript })
        return QRCode.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }).then((svg) => [text, svg])
      })
    )
    Promise.all(jobs).then((pairs) => {
      if (!cancelled) setCodes(Object.fromEntries(pairs))
    })
    return () => {
      cancelled = true
    }
  }, [exam?.id, cls?.id, exam?.pagesPerScript, cls?.students.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) return null
  if (!exam || !cls) {
    return (
      <div className="fixed inset-0 z-[60] bg-[var(--sky-surface)] flex items-center justify-center">
        <Link href="/dashboard/exams" className="text-[var(--action-accent)] font-semibold">Back to exams</Link>
      </div>
    )
  }

  const total = cls.students.length * exam.pagesPerScript
  const ready = Object.keys(codes).length === total

  return (
    <div className="print-sheets fixed inset-0 z-[60] overflow-y-auto bg-[var(--sky-surface)] text-[var(--sky-text)] print:bg-white">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[var(--sky-panel-border)] bg-[var(--sky-panel)] print:hidden">
        <div>
          <p className="font-semibold">{exam.title} · answer sheets</p>
          <p className="text-sm text-[var(--sky-subtle)]">
            {cls.students.length} students × {exam.pagesPerScript} pages = {total} sheets
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/exams/${exam.id}`} className="inline-flex items-center h-10 px-4 rounded-full border border-[var(--sky-panel-border)] text-sm font-semibold">
            Back
          </Link>
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              markSheetsPrinted(exam.id)
              window.print()
            }}
            className="h-10 px-5 rounded-full bg-[var(--action-accent)] text-white text-sm font-semibold disabled:opacity-50"
          >
            {ready ? 'Print' : 'Preparing codes…'}
          </button>
        </div>
      </header>

      <div className="py-6 px-4 flex flex-col items-center gap-6 print:p-0 print:gap-0">
        {cls.students.map((s) =>
          Array.from({ length: exam.pagesPerScript }, (_, i) => {
            const page = i + 1
            const text = encodePageCode({ examId: exam.id, studentId: s.id, page, total: exam.pagesPerScript })
            return (
              <section
                key={text}
                className="answer-sheet bg-white text-[#0b1f3a] w-full max-w-[210mm] aspect-[210/297] shadow-[0_8px_24px_-16px_rgba(10,48,89,0.4)] p-[12mm] flex flex-col print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm]"
              >
                <div className="flex items-start justify-between gap-6 border-b-2 border-[#0b1f3a] pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#5b6b82]">{exam.title}</p>
                    <p className="text-2xl font-semibold mt-1">{s.name}</p>
                    <p className="text-sm mt-1">
                      {cls.name} · Page {page} of {exam.pagesPerScript}
                    </p>
                    {page === 1 && <p className="text-xs text-[#5b6b82] mt-3 max-w-[90mm]">Write only your answers on these pages. Do not write on or fold the code.</p>}
                  </div>
                  <div className="w-[30mm] h-[30mm] flex-shrink-0" aria-label={`Page code for ${s.name}, page ${page}`} dangerouslySetInnerHTML={{ __html: codes[text] || '' }} />
                </div>
                <div
                  className="flex-1 mt-4"
                  style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 8.5mm, #dfe5ee 8.5mm, #dfe5ee 9mm)' }}
                  aria-hidden="true"
                />
                <p className="text-[10px] text-[#8a94a6] text-right mt-2">Domax · {s.name} · page {page}/{exam.pagesPerScript}</p>
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}
