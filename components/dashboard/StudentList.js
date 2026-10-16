'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useUserState } from '@/states/useUserState'
import { useDashboardState } from '@/states/useDashboardState'
import { WsButton as Button, SearchField } from './ui'

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  avg: (a, b) => a.avgScore - b.avgScore,
  level: (a, b) => a.level.localeCompare(b.level),
}

function SortHeader({ id, sort, onSort, children, className = '' }) {
  const active = sort.key === id
  return (
    <th
      scope="col"
      className={`px-3 py-2 font-medium ${className}`}
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button type="button" onClick={() => onSort(id)} className={`inline-flex items-center gap-1 rounded hover:text-[var(--sky-text)] ${active ? 'text-[var(--sky-text)]' : ''}`}>
        {children}
        <span aria-hidden="true" className="text-[10px]">{active ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}</span>
      </button>
    </th>
  )
}

export default function StudentList() {
  const { students } = useUserState()
  const { selectedStudent, setSelectedStudent, updatePanel } = useDashboardState()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })

  const handleSelect = (studentId) => {
    setSelectedStudent(studentId)
    const student = students.find((item) => item.id === studentId)
    if (student) {
      updatePanel({ type: 'student', payload: student })
    }
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = students.filter(
      (student) => !q || student.name.toLowerCase().includes(q) || student.level.toLowerCase().includes(q)
    )
    const sorted = [...filtered].sort(sorters[sort.key])
    return sort.dir === 'asc' ? sorted : sorted.reverse()
  }, [students, query, sort])

  const toggleSort = (key) =>
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'avg' ? 'desc' : 'asc' }))

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchField value={query} onChange={setQuery} placeholder="Search by name or level" label="Search students" className="sm:w-72" />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled title="Roster import is not available yet">
            Import roster
          </Button>
          <Button variant="secondary" size="sm" disabled title="Adding students is not available yet">
            Add student
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--sky-panel-border)]">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
              <SortHeader id="name" sort={sort} onSort={toggleSort} className="pl-4">Student</SortHeader>
              <SortHeader id="level" sort={sort} onSort={toggleSort}>Level</SortHeader>
              <SortHeader id="avg" sort={sort} onSort={toggleSort} className="text-right">Average</SortHeader>
              <th scope="col" className="px-3 py-2 font-medium">Trend</th>
              <th scope="col" className="px-3 py-2 font-medium">Last active</th>
              <th scope="col" className="px-4 py-2"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sky-panel-border)]">
            {rows.map((student) => {
              const isSelected = selectedStudent === student.id
              const negative = String(student.trend).startsWith('-')
              return (
                <tr
                  key={student.id}
                  onClick={() => handleSelect(student.id)}
                  className={`cursor-pointer ${isSelected ? 'bg-[var(--action-accent-soft)]' : 'hover:bg-[var(--sky-surface)]'}`}
                >
                  <td className="pl-4 pr-3 py-2.5">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleSelect(student.id)
                      }}
                      className="font-semibold text-[var(--sky-text)] text-left rounded"
                    >
                      {student.name}
                    </button>
                  </td>
                  <td className="px-3 py-2.5 text-[var(--sky-subtle)]">{student.level}</td>
                  <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-[var(--sky-text)]">{student.avgScore}%</td>
                  <td className={`px-3 py-2.5 tabular-nums font-medium ${negative ? 'text-[var(--vscode-red)]' : 'text-[var(--vscode-green)]'}`}>
                    {student.trend}
                  </td>
                  <td className="px-3 py-2.5 text-[var(--sky-subtle)]">{student.lastActive}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Link
                      href={`/dashboard/students/${student.id}`}
                      onClick={(event) => event.stopPropagation()}
                      className="text-[13px] font-medium text-[var(--action-accent)] hover:underline rounded"
                    >
                      Profile
                    </Link>
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-[var(--sky-subtle)]">
                  {students.length === 0 ? 'No students yet.' : `No students match “${query}”.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
