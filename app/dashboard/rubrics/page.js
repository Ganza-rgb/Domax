'use client'

import { useState } from 'react'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, EmptyState, Notice, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'

const emptyRubric = () => ({ name: '', description: '', criteria: [{ name: '', maxScore: 10, weight: 1 }] })

export default function RubricsPage() {
  const [rubrics, setRubrics] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newRubric, setNewRubric] = useState(emptyRubric)
  const [error, setError] = useState(null)

  // TODO: Load rubrics from API

  const handleAddCriterion = () => {
    setNewRubric({
      ...newRubric,
      criteria: [...newRubric.criteria, { name: '', maxScore: 10, weight: 1 }],
    })
  }

  const handleCreateRubric = () => {
    if (!newRubric.name || newRubric.criteria.some((c) => !c.name)) {
      setError('Give the rubric a name and name every criterion.')
      return
    }

    // TODO: Save rubric via API
    setRubrics([...rubrics, { ...newRubric, id: Date.now() }])
    setNewRubric(emptyRubric())
    setError(null)
    setShowCreateForm(false)
  }

  const cancel = () => {
    setShowCreateForm(false)
    setError(null)
  }

  const totalPoints = newRubric.criteria.reduce((sum, c) => sum + (Number(c.maxScore) || 0), 0)

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Rubric management"
        title="Rubrics"
        subtitle="Marking schemes you can reuse across classes and terms."
        actions={
          <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)} data-tour="create-rubric-button" disabled={showCreateForm}>
            Create rubric
          </Button>
        }
      />

      {showCreateForm && (
        <Panel meta="New" title="New rubric" data-tour="rubric-form">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rubric-name" className={labelClass}>Rubric name</label>
                <input
                  id="rubric-name"
                  type="text"
                  value={newRubric.name}
                  onChange={(e) => setNewRubric({ ...newRubric, name: e.target.value })}
                  placeholder="e.g., Essay Writing Rubric"
                  aria-invalid={Boolean(error && !newRubric.name)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="rubric-description" className={labelClass}>
                  Description <span className="font-normal text-[var(--sky-subtle)]">(optional)</span>
                </label>
                <input
                  id="rubric-description"
                  type="text"
                  value={newRubric.description}
                  onChange={(e) => setNewRubric({ ...newRubric, description: e.target.value })}
                  placeholder="Brief description of this rubric"
                  className={fieldClass}
                />
              </div>
            </div>

            <fieldset>
              <legend className="flex w-full items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--sky-text)]">Grading criteria</span>
                <span className="text-xs text-[var(--sky-subtle)] tabular-nums">{totalPoints} points total</span>
              </legend>
              <div className="overflow-hidden rounded-lg border border-[var(--sky-panel-border)]">
                <div className="hidden sm:grid grid-cols-[1fr_6rem_2.5rem] gap-3 bg-[var(--sky-surface)] px-3 py-2 text-xs text-[var(--sky-subtle)]">
                  <span>Criterion</span>
                  <span>Max points</span>
                  <span className="sr-only">Remove</span>
                </div>
                <ul className="divide-y divide-[var(--sky-panel-border)]">
                  {newRubric.criteria.map((criterion, idx) => (
                    <li key={idx} className="grid grid-cols-[1fr_6rem_2.5rem] items-center gap-3 px-3 py-2">
                      <label className="sr-only" htmlFor={`criterion-${idx}`}>Criterion {idx + 1} name</label>
                      <input
                        id={`criterion-${idx}`}
                        type="text"
                        value={criterion.name}
                        onChange={(e) => {
                          const updated = [...newRubric.criteria]
                          updated[idx].name = e.target.value
                          setNewRubric({ ...newRubric, criteria: updated })
                        }}
                        placeholder={`Criterion ${idx + 1}, e.g. Use of evidence`}
                        aria-invalid={Boolean(error && !criterion.name)}
                        className={`${fieldClass} h-9`}
                      />
                      <label className="sr-only" htmlFor={`criterion-${idx}-points`}>Criterion {idx + 1} max points</label>
                      <input
                        id={`criterion-${idx}-points`}
                        type="number"
                        value={criterion.maxScore}
                        onChange={(e) => {
                          const updated = [...newRubric.criteria]
                          updated[idx].maxScore = Number(e.target.value)
                          setNewRubric({ ...newRubric, criteria: updated })
                        }}
                        min="1"
                        className={`${fieldClass} h-9 text-right tabular-nums`}
                      />
                      {newRubric.criteria.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = newRubric.criteria.filter((_, i) => i !== idx)
                            setNewRubric({ ...newRubric, criteria: updated })
                          }}
                          aria-label={`Remove criterion ${idx + 1}`}
                          className="w-9 h-9 flex items-center justify-center rounded-md text-[var(--sky-subtle)] hover:text-[var(--vscode-red)] hover:bg-[var(--sky-surface)]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      ) : (
                        <span />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="secondary" size="sm" onClick={handleAddCriterion} className="mt-3">
                Add criterion
              </Button>
            </fieldset>

            {error && <Notice tone="caution">{error}</Notice>}

            <div className="flex justify-end gap-2 border-t border-[var(--sky-panel-border)] pt-4">
              <Button variant="secondary" size="sm" onClick={cancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreateRubric}>
                Save rubric
              </Button>
            </div>
          </div>
        </Panel>
      )}

      <Panel meta="Library" title="Your rubrics" data-tour="rubric-list">
        {rubrics.length === 0 ? (
          <EmptyState
            title="No rubrics yet"
            body="Rubrics keep marking consistent across scripts and classes."
            action={!showCreateForm && (
              <Button variant="primary" size="sm" onClick={() => setShowCreateForm(true)}>
                Create your first rubric
              </Button>
            )}
          />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rubrics.map((rubric) => (
              <li key={rubric.id} className="rounded-lg border border-[var(--sky-panel-border)] p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] font-semibold text-[var(--sky-text)]">{rubric.name}</h3>
                  <span className="text-xs text-[var(--sky-subtle)] tabular-nums whitespace-nowrap">
                    {rubric.criteria.reduce((sum, c) => sum + (Number(c.maxScore) || 0), 0)} pts
                  </span>
                </div>
                {rubric.description && <p className="text-sm text-[var(--sky-subtle)] mt-1">{rubric.description}</p>}
                <ul className="mt-3 space-y-1 text-sm">
                  {rubric.criteria.map((c, i) => (
                    <li key={i} className="flex justify-between gap-3 text-[var(--sky-text)]">
                      <span className="truncate">{c.name}</span>
                      <span className="tabular-nums text-[var(--sky-subtle)]">{c.maxScore}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
