'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'

export default function RubricsPage() {
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const [rubrics, setRubrics] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newRubric, setNewRubric] = useState({
    name: '',
    description: '',
    criteria: [{ name: '', maxScore: 10, weight: 1 }],
  })

  useEffect(() => {
    setCurrentSection('rubrics')
    // TODO: Load rubrics from API
  }, [setCurrentSection])

  const handleAddCriterion = () => {
    setNewRubric({
      ...newRubric,
      criteria: [...newRubric.criteria, { name: '', maxScore: 10, weight: 1 }],
    })
  }

  const handleCreateRubric = () => {
    if (!newRubric.name || newRubric.criteria.some((c) => !c.name)) {
      alert('Please fill in all required fields')
      return
    }
    // TODO: Save rubric via API
    setRubrics([...rubrics, { ...newRubric, id: Date.now() }])
    setNewRubric({ name: '', description: '', criteria: [{ name: '', maxScore: 10, weight: 1 }] })
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Rubric management"
        title="Create and manage rubrics"
        subtitle="Build reusable grading criteria for consistent scoring"
        actions={
          <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)} data-tour="create-rubric-button">
            Create rubric
          </Button>
        }
      />

      {showCreateForm && (
        <section className="sky-card space-y-4" data-tour="rubric-form">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--sky-text)]">New Rubric</h3>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="text-[var(--sky-subtle)] hover:text-[var(--sky-text)]"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">Rubric name *</label>
            <input
              type="text"
              value={newRubric.name}
              onChange={(e) => setNewRubric({ ...newRubric, name: e.target.value })}
              placeholder="e.g., Essay Writing Rubric"
              className="w-full px-4 py-3 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--sky-text)] mb-2">Description</label>
            <textarea
              value={newRubric.description}
              onChange={(e) => setNewRubric({ ...newRubric, description: e.target.value })}
              placeholder="Brief description of this rubric..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] text-[var(--sky-text)] focus:outline-none focus:border-[#005ffe]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-[var(--sky-text)]">Grading criteria *</label>
              <Button variant="outline" size="sm" onClick={handleAddCriterion}>
                Add criterion
              </Button>
            </div>
            <div className="space-y-3">
              {newRubric.criteria.map((criterion, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]"
                >
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={(e) => {
                      const updated = [...newRubric.criteria]
                      updated[idx].name = e.target.value
                      setNewRubric({ ...newRubric, criteria: updated })
                    }}
                    placeholder="Criterion name"
                    className="flex-1 px-3 py-2 rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-sm focus:outline-none focus:border-[#005ffe]"
                  />
                  <input
                    type="number"
                    value={criterion.maxScore}
                    onChange={(e) => {
                      const updated = [...newRubric.criteria]
                      updated[idx].maxScore = Number(e.target.value)
                      setNewRubric({ ...newRubric, criteria: updated })
                    }}
                    placeholder="Points"
                    min="1"
                    className="w-24 px-3 py-2 rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] text-sm focus:outline-none focus:border-[#005ffe]"
                  />
                  {newRubric.criteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = newRubric.criteria.filter((_, i) => i !== idx)
                        setNewRubric({ ...newRubric, criteria: updated })
                      }}
                      className="p-2 text-[var(--sky-subtle)] hover:text-[var(--vscode-red)]"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" onClick={handleCreateRubric}>
              Save Rubric
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
          </div>
        </section>
      )}

      <section className="sky-card" data-tour="rubric-list">
        <p className="sky-label">Your Rubrics</p>
        {rubrics.length === 0 ? (
          <p className="text-sm text-[var(--sky-subtle)] mt-3">No rubrics created yet. Click "Create rubric" to begin.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rubrics.map((rubric) => (
              <div key={rubric.id} className="rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)] p-4">
                <h3 className="text-lg font-semibold text-[var(--sky-text)]">{rubric.name}</h3>
                <p className="text-sm text-[var(--sky-subtle)] mt-1">{rubric.description}</p>
                <p className="text-xs text-[var(--sky-subtle)] mt-2">{rubric.criteria.length} criteria</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
