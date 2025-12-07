'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'
import { useUserState } from '@/states/useUserState'

const filters = ['All', 'P6', 'S3', 'S6']

export default function PastPapersList() {
  const { pastPapers } = useUserState()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? pastPapers : pastPapers.filter((paper) => paper.level === activeFilter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === filter
                ? 'bg-[#005ffe] text-white shadow-lg'
                : 'bg-[var(--sky-surface)] text-[var(--sky-text)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((paper) => (
          <div key={paper.id} className="sky-card flex flex-col gap-3">
            <div>
              <p className="sky-label">{paper.level}</p>
              <h3 className="text-lg font-semibold text-[var(--sky-text)]">{paper.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-[var(--sky-surface)] text-xs font-semibold text-[var(--sky-text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--sky-subtle)]">
              <span>{paper.pages} pages</span>
              <div className="flex gap-2">
                <Button variant="outline" size="xs">
                  Download
                </Button>
                <Button variant="primary" size="xs">
                  Assign
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

