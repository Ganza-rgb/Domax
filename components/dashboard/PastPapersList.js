'use client'

import { useState } from 'react'
import { useUserState } from '@/states/useUserState'
import { WsButton as Button, EmptyState, Segmented, StatusPill } from './ui'

const filters = ['All', 'P6', 'S3', 'S6']

export default function PastPapersList() {
  const { pastPapers } = useUserState()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? pastPapers : pastPapers.filter((paper) => paper.level === activeFilter)

  return (
    <div className="space-y-4">
      <Segmented
        label="Filter by level"
        value={activeFilter}
        onChange={setActiveFilter}
        options={filters.map((filter) => ({
          value: filter,
          label: filter,
          count: filter === 'All' ? pastPapers.length : pastPapers.filter((p) => p.level === filter).length,
        }))}
      />

      {filtered.length === 0 ? (
        <EmptyState title="No papers for this level" body="Try another level." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--sky-surface)] text-left text-xs text-[var(--sky-subtle)]">
                <th scope="col" className="px-5 py-2 font-medium">Paper</th>
                <th scope="col" className="px-3 py-2 font-medium">Level</th>
                <th scope="col" className="px-3 py-2 font-medium">Type</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Pages</th>
                <th scope="col" className="px-5 py-2"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sky-panel-border)]">
              {filtered.map((paper) => (
                <tr key={paper.id}>
                  <td className="px-5 py-3 font-semibold text-[var(--sky-text)]">{paper.title}</td>
                  <td className="px-3 py-3 text-[var(--sky-subtle)]">{paper.level}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {paper.tags.map((tag) => (
                        <StatusPill key={tag}>{tag}</StatusPill>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-[var(--sky-text)]">{paper.pages}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" size="xs" disabled title="Paper files are not available yet">
                        Download
                      </Button>
                      <Button variant="secondary" size="xs" disabled title="Assigning papers is not available yet">
                        Assign
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
