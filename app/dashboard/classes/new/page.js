'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, Panel, fieldClass, labelClass } from '@/components/dashboard/ui'
import { useWorkspace } from '@/states/useWorkspaceState'

export default function NewClassPage() {
  const router = useRouter()
  const { createClass } = useWorkspace()
  const [form, setForm] = useState({ name: '', level: 'O-Level', under16: true })

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return
    const id = createClass({ name: form.name.trim(), level: form.level, under16: form.under16 })
    router.push(`/dashboard/classes/${id}`)
  }

  return (
    <div className="max-w-xl space-y-6">
      <WorkspaceHeader title="New class" subtitle="You’ll add the students on the next screen." />
      <Panel>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="class-name" className={labelClass}>Name</label>
            <input id="class-name" autoFocus className={`${fieldClass} h-12 text-base`} placeholder="e.g. S3 Blue" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="class-level" className={labelClass}>Level</label>
            <select id="class-level" className={`${fieldClass} h-12 text-base`} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              <option>O-Level</option>
              <option>A-Level</option>
              <option>University & polytechnic</option>
            </select>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-5 h-5" checked={form.under16} onChange={(e) => setForm({ ...form, under16: e.target.checked })} />
            <span>
              <span className="block text-[15px] font-medium">Most students are under 16</span>
              <span className="block text-sm text-[var(--sky-subtle)]">Rwandan law asks for consent through the school before their results go online.</span>
            </span>
          </label>
          <Button type="submit" size="lg" disabled={!form.name.trim()}>Create class</Button>
        </form>
      </Panel>
    </div>
  )
}
