'use client'

import { useRef, useState } from 'react'
import { WsButton as Button, Notice, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace, MATERIAL_KINDS } from '@/states/useWorkspaceState'
import { putPage, getPage, deletePage } from '@/lib/deviceStore'
import { extractText } from '@/lib/extractText'

const MAX_BYTES = 25 * 1024 * 1024
const kindLabel = (value) => MATERIAL_KINDS.find((k) => k.value === value)?.label || value
const sizeLabel = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`)
const guessKind = (name) => (/memo|guide|scheme|answer|marking/i.test(name) ? 'memo' : /note/i.test(name) ? 'notes' : 'paper')
const newMaterialId = () => `mat-${Math.random().toString(36).slice(2, 9)}`

export const materialKey = (id) => `material:${id}`

/**
 * The exam paper, the memo and any notes the teacher wants the marking
 * assistant to know about. Files stay on this device until the teacher
 * chooses to share one with a class.
 */
export default function Materials({ exam, onShare }) {
  const { addMaterial, updateMaterial, removeMaterial, setMarkingNotes, setPassMark } = useWorkspace()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const [notes, setNotes] = useState(exam.markingNotes || '')
  const [syncedNotes, setSyncedNotes] = useState(exam.markingNotes || '')
  const materials = exam.materials || []

  if ((exam.markingNotes || '') !== syncedNotes) {
    setSyncedNotes(exam.markingNotes || '')
    setNotes(exam.markingNotes || '')
  }

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    setMessage(null)
    const skipped = []
    for (const file of files) {
      if (file.size > MAX_BYTES) {
        skipped.push(`${file.name} is over 25 MB`)
        continue
      }
      try {
        const id = newMaterialId()
        const text = await extractText(file)
        await putPage(materialKey(id), file)
        addMaterial(exam.id, { id, name: file.name, kind: guessKind(file.name), size: file.size, mime: file.type || 'application/octet-stream', hasText: Boolean(text), text })
      } catch {
        skipped.push(`${file.name} could not be saved on this device`)
      }
    }
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
    setMessage(skipped.length ? { tone: 'caution', text: skipped.join('. ') + '.' } : null)
  }

  const open = async (material) => {
    const blob = await getPage(materialKey(material.id)).catch(() => null)
    if (!blob) {
      setMessage({ tone: 'caution', text: `${material.name} isn’t on this device. It may have been added from another browser.` })
      return
    }
    window.open(URL.createObjectURL(blob), '_blank', 'noopener')
  }

  const remove = async (material) => {
    await deletePage(materialKey(material.id)).catch(() => {})
    removeMaterial(exam.id, material.id)
  }

  const memoCount = materials.filter((m) => m.kind === 'memo' || m.kind === 'notes').length

  return (
    <Panel
      title="Exam materials"
      meta="Paper, memo and notes"
      data-tour="exam-materials"
    >
      <p className="text-[15px] text-[var(--sky-subtle)] leading-relaxed">
        Attach the paper you set, the full answers and any notes. They stay with the exam, help you mark faster, and give the marking assistant
        what it needs to be accurate.
      </p>

      {message && (
        <div className="mt-4">
          <Notice tone={message.tone} onDismiss={() => setMessage(null)}>{message.text}</Notice>
        </div>
      )}

      {materials.length > 0 && (
        <ul className="mt-4 divide-y divide-[var(--sky-panel-border)] rounded-xl border border-[var(--sky-panel-border)]">
          {materials.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-[var(--sky-text)]">{m.name}</p>
                <p className="text-xs text-[var(--sky-subtle)]">
                  {kindLabel(m.kind)} · {sizeLabel(m.size)}
                  {m.hasText ? ' · text read for the assistant' : ''}
                </p>
              </div>
              <label className="sr-only" htmlFor={`kind-${m.id}`}>Type of {m.name}</label>
              <select id={`kind-${m.id}`} className={`${fieldClass} !h-9 !w-auto text-sm`} value={m.kind} onChange={(e) => updateMaterial(exam.id, m.id, { kind: e.target.value })}>
                {MATERIAL_KINDS.map((k) => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
              <div className="flex items-center gap-1.5">
                <Button size="xs" variant="secondary" onClick={() => open(m)}>Open</Button>
                {onShare && (m.kind === 'paper' || m.kind === 'memo' || m.kind === 'reference') && (
                  <Button size="xs" variant="secondary" onClick={() => onShare(m)}>{m.sharedAt ? 'Shared · update' : 'Share with class'}</Button>
                )}
                <Button size="xs" variant="ghost" onClick={() => remove(m)} aria-label={`Remove ${m.name}`}>Remove</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <input ref={inputRef} type="file" multiple accept=".pdf,.txt,.md,.csv,.doc,.docx,.png,.jpg,.jpeg,.webp" className="sr-only" id={`materials-${exam.id}`} onChange={(e) => handleFiles(e.target.files)} />
        <Button size="md" variant="secondary" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? 'Saving…' : materials.length ? 'Add more files' : 'Add paper, memo or notes'}
        </Button>
        <p className="mt-2 text-xs text-[var(--sky-subtle)]">PDF, Word, text or photos, up to 25 MB each. Stored on this device.</p>
      </div>

      <div className="mt-6">
        <label htmlFor={`notes-${exam.id}`} className={labelClass}>Notes for marking</label>
        <textarea
          id={`notes-${exam.id}`}
          rows={4}
          className={`${fieldClass} !h-auto py-2.5`}
          placeholder="e.g. Accept “haemolysis” or “bursting”. Do not penalise spelling in Q1. Half marks for correct method with a wrong final answer."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => notes !== (exam.markingNotes || '') && setMarkingNotes(exam.id, notes)}
        />
        <p className="mt-1.5 text-xs text-[var(--sky-subtle)]">Saved when you click away. The assistant reads these before it suggests any mark.</p>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <label htmlFor={`pass-${exam.id}`} className={labelClass}>Pass mark (%)</label>
          <input
            id={`pass-${exam.id}`}
            type="number"
            min={1}
            max={100}
            className={`${fieldClass} !w-24`}
            value={exam.passMark ?? 50}
            onChange={(e) => setPassMark(exam.id, e.target.value)}
          />
        </div>
        <p className="text-xs text-[var(--sky-subtle)] max-w-xs pb-2.5">
          {memoCount === 0 ? 'No memo or notes yet: the assistant will have only the rubric to go on.' : `${memoCount} memo or notes file${memoCount === 1 ? '' : 's'} attached.`}
        </p>
      </div>
    </Panel>
  )
}
