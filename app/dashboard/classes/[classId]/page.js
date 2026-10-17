'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Panel, TickMark, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'

// Reads a simple spreadsheet export: a header row, then one student per row.
// Recognised columns: name, CAMIS, Urubuto, registration number.
function parseRoster(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (lines.length < 2) return { rows: [], error: 'The file needs a header row and at least one student.' }
  const split = (line) => line.split(/[,;\t]/).map((cell) => cell.replace(/^"|"$/g, '').trim())
  const header = split(lines[0]).map((h) => h.toLowerCase())
  const col = (...names) => header.findIndex((h) => names.some((n) => h.includes(n)))
  const nameCol = col('name', 'izina', 'student')
  if (nameCol < 0) return { rows: [], error: 'No “name” column found. Add a header row with a Name column.' }
  const camisCol = col('camis', 'sdms')
  const urubutoCol = col('urubuto')
  const regCol = col('reg', 'registration', 'matric')
  const rows = lines
    .slice(1)
    .map(split)
    .filter((cells) => cells[nameCol])
    .map((cells) => ({
      name: cells[nameCol],
      camis: camisCol >= 0 ? cells[camisCol] : '',
      urubuto: urubutoCol >= 0 ? cells[urubutoCol] : '',
      regNo: regCol >= 0 ? cells[regCol] : '',
    }))
  return { rows, error: rows.length ? '' : 'No students found under the header row.' }
}

export default function ClassPage() {
  const { classId } = useParams()
  const { findClass, addStudents, removeStudent, recordConsent, exams, loaded } = useWorkspace()
  const cls = findClass(classId)
  const [student, setStudent] = useState({ name: '', camis: '', urubuto: '', regNo: '' })
  const [importNote, setImportNote] = useState('')
  const [consent, setConsent] = useState({ recordedBy: '', basis: 'Written notice to parents through the school' })

  if (!cls) {
    return loaded ? <EmptyState title="This class isn’t here" body="It may have been made on another device." action={<Button href="/dashboard/classes">All classes</Button>} /> : null
  }

  const hasMarks = (studentId) => exams.some((exam) => exam.classId === cls.id && (exam.scripts?.[studentId] || exam.marks?.[studentId]))

  const add = (event) => {
    event.preventDefault()
    if (!student.name.trim()) return
    addStudents(cls.id, [student])
    setStudent({ name: '', camis: '', urubuto: '', regNo: '' })
  }

  const importFile = async (file) => {
    if (!file) return
    const { rows, error } = parseRoster(await file.text())
    if (error) {
      setImportNote(error)
      return
    }
    addStudents(cls.id, rows)
    setImportNote(`Added ${rows.length} student${rows.length === 1 ? '' : 's'} from ${file.name}.`)
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader title={cls.name} subtitle={`${cls.level} · ${cls.students.length} students`} />

      {cls.under16 && (
        <Panel title="Consent">
          {cls.consent ? (
            <div className="flex items-start gap-3">
              <TickMark className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-[15px]">
                Recorded {new Date(cls.consent.recordedOn).toLocaleDateString()} by {cls.consent.recordedBy}.
                <span className="block text-sm text-[var(--sky-subtle)]">{cls.consent.basis}</span>
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (consent.recordedBy.trim()) recordConsent(cls.id, consent)
              }}
              className="space-y-4"
            >
              <p className="text-[15px] text-[var(--sky-subtle)]">
                These students are under 16. Before their results are released, the school records how parents were told and agreed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consent-by" className={labelClass}>Recorded by</label>
                  <input id="consent-by" className={fieldClass} placeholder="e.g. Head teacher" value={consent.recordedBy} onChange={(e) => setConsent({ ...consent, recordedBy: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="consent-basis" className={labelClass}>How parents were told</label>
                  <input id="consent-basis" className={fieldClass} value={consent.basis} onChange={(e) => setConsent({ ...consent, basis: e.target.value })} />
                </div>
              </div>
              <Button type="submit" size="md" disabled={!consent.recordedBy.trim()}>Record consent</Button>
            </form>
          )}
        </Panel>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6 items-start">
        <Panel title="Students" bodyClassName="!px-0 !pb-0">
          {cls.students.length === 0 ? (
            <div className="px-5 pb-5"><EmptyState title="No students yet" body="Add them one by one, or import a spreadsheet." /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-y border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                    <th scope="col" className="px-5 py-2 font-medium">Name</th>
                    <th scope="col" className="px-3 py-2 font-medium">CAMIS / SDMS</th>
                    <th scope="col" className="px-3 py-2 font-medium">Urubuto</th>
                    <th scope="col" className="px-3 py-2 font-medium">Reg. no.</th>
                    <th scope="col" className="px-5 py-2"><span className="sr-only">Remove</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--sky-panel-border)]">
                  {cls.students.map((s) => (
                    <tr key={s.id}>
                      <td className="px-5 py-2.5 font-medium">{s.name}</td>
                      <td className="px-3 py-2.5 tabular-nums text-[var(--sky-subtle)]">{s.ids?.camis || '–'}</td>
                      <td className="px-3 py-2.5 tabular-nums text-[var(--sky-subtle)]">{s.ids?.urubuto || '–'}</td>
                      <td className="px-3 py-2.5 tabular-nums text-[var(--sky-subtle)]">{s.ids?.regNo || '–'}</td>
                      <td className="px-5 py-2.5 text-right">
                        {hasMarks(s.id) ? (
                          <span className="text-xs text-[var(--sky-subtle)]" title="This student has scripts or marks in an exam">In an exam</span>
                        ) : (
                          <button type="button" onClick={() => removeStudent(cls.id, s.id)} className="text-xs text-[var(--vscode-red)] hover:underline">Remove</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Add a student">
            <form onSubmit={add} className="space-y-3">
              <div>
                <label htmlFor="stu-name" className={labelClass}>Name</label>
                <input id="stu-name" className={fieldClass} value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="stu-camis" className={labelClass}>CAMIS / SDMS ID</label>
                  <input id="stu-camis" className={fieldClass} value={student.camis} onChange={(e) => setStudent({ ...student, camis: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="stu-urubuto" className={labelClass}>Urubuto ID</label>
                  <input id="stu-urubuto" className={fieldClass} value={student.urubuto} onChange={(e) => setStudent({ ...student, urubuto: e.target.value })} />
                </div>
              </div>
              <div>
                <label htmlFor="stu-reg" className={labelClass}>Registration no. <span className="font-normal text-[var(--sky-subtle)]">(universities)</span></label>
                <input id="stu-reg" className={fieldClass} value={student.regNo} onChange={(e) => setStudent({ ...student, regNo: e.target.value })} />
              </div>
              <Button type="submit" size="md" disabled={!student.name.trim()}>Add student</Button>
            </form>
          </Panel>

          <Panel title="Import a list">
            <p className="text-sm text-[var(--sky-subtle)]">
              A CSV export from CAMIS, Urubuto or a spreadsheet, with a header row. Columns Domax looks for: Name, CAMIS, Urubuto, Registration.
            </p>
            <label className="mt-4 inline-flex items-center min-h-10 px-4 rounded-full border border-[var(--sky-panel-border)] text-sm font-semibold cursor-pointer hover:bg-[var(--sky-surface)]">
              Choose a CSV file
              <input type="file" accept=".csv,text/csv,.txt" className="sr-only" onChange={(e) => { importFile(e.target.files?.[0]); e.target.value = '' }} />
            </label>
            {importNote && <p role="status" className="text-sm mt-3">{importNote}</p>}
          </Panel>
        </div>
      </div>
    </div>
  )
}
