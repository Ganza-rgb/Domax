'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import { WsButton as Button, Notice, Panel } from '@/components/dashboard/ui'

const ACCEPTED = '.pdf,.docx,.txt'

export default function UploadPage() {
  const { setCurrentSection } = useDashboardState()
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setCurrentSection('upload')
  }, [setCurrentSection])

  const handleFiles = async (files) => {
    const validFiles = files.filter(
      (file) => file.type === 'application/pdf' || file.type.includes('wordprocessingml') || file.type === 'text/plain'
    )

    const rejected = files.length - validFiles.length
    if (validFiles.length === 0) {
      setError('Please upload PDF, DOCX, or TXT files only.')
      return
    }
    setError(rejected > 0 ? `${rejected} file${rejected > 1 ? 's were' : ' was'} skipped — only PDF, DOCX, or TXT are supported.` : null)

    setUploading(true)
    // TODO: Implement actual upload API
    setTimeout(() => {
      setUploadedFiles((prev) => [
        ...prev,
        ...validFiles.map((file) => ({
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploaded',
          uploadedAt: new Date().toISOString(),
        })),
      ])
      setUploading(false)
    }, 1500)
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(Array.from(e.dataTransfer.files))
  }

  const handleFileSelect = (e) => {
    handleFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  const openPicker = () => {
    if (!uploading) inputRef.current?.click()
  }

  const checklist = [
    {
      title: 'Your marking scheme is in Domax',
      body: 'Suggestions are made against it, point by point.',
      action: { href: '/dashboard/rubrics', label: 'Rubrics' },
    },
    {
      title: 'Every script has its header sheet',
      body: 'It tells Domax whose script it is and how many pages to expect.',
    },
    {
      title: 'One file per student’s script',
      body: 'Pages in order, nothing cut off at the edges.',
    },
  ]

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        title="Upload"
        subtitle="PDF, DOCX or TXT files for now. Photo capture of handwritten scripts is on the way."
        actions={
          <Button variant="secondary" size="sm" href="/dashboard/submissions">
            View submissions
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          {/* Drop zone — click or press Enter/Space to browse */}
          <div
            data-tour="upload-button"
            role="button"
            tabIndex={0}
            aria-label="Upload files: drop files here or press Enter to browse"
            aria-busy={uploading}
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openPicker()
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed transition-colors cursor-pointer ${
              isDragging
                ? 'border-[var(--action-accent)] bg-[var(--action-accent-soft)]'
                : 'border-[var(--sky-panel-border)] bg-[var(--sky-panel)] hover:border-[var(--action-accent)]'
            }`}
          >
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-6 text-center">
              {/* A small pile of scripts */}
              <svg viewBox="0 0 64 64" className="w-16 h-16 mb-5" aria-hidden="true">
                <rect x="16" y="12" width="32" height="42" rx="4" fill="var(--sky-surface)" stroke="var(--sky-panel-border)" strokeWidth="1.5" transform="rotate(-9 32 33)" />
                <rect x="16" y="11" width="32" height="42" rx="4" fill="var(--sky-surface)" stroke="var(--sky-panel-border)" strokeWidth="1.5" transform="rotate(5 32 32)" />
                <rect x="16" y="10" width="32" height="42" rx="4" fill="var(--sky-panel)" stroke="var(--sky-subtle)" strokeOpacity="0.5" strokeWidth="1.5" />
                <path d="M23 20h18M23 26h18M23 32h12" stroke="var(--sky-subtle)" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="46" cy="46" r="9" fill="var(--action-accent)" />
                <path d="M46 50.5v-9m-3.5 3.5L46 41.5l3.5 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-headline text-xl font-semibold tracking-[-0.02em] text-[var(--sky-text)]">
                {uploading ? 'Uploading…' : isDragging ? 'Drop to upload' : 'Drop a class’s scripts here'}
              </p>
              <p className="text-sm text-[var(--sky-subtle)] mt-1.5 mb-6">or choose them from your computer · PDF, DOCX or TXT</p>
              <span
                aria-hidden="true"
                className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold text-white ${uploading ? 'bg-[#005ffe]/50' : 'bg-[#005ffe]'}`}
              >
                {uploading ? 'Uploading…' : 'Choose files'}
              </span>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPTED}
                onChange={handleFileSelect}
                className="sr-only"
                tabIndex={-1}
                disabled={uploading}
              />
            </div>
          </div>

          {error && <Notice tone="caution" onDismiss={() => setError(null)}>{error}</Notice>}

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <Panel title="Uploaded this session" bodyClassName="!px-0 !pb-0">
              <ul className="divide-y divide-[var(--sky-panel-border)] border-t border-[var(--sky-panel-border)]">
                {uploadedFiles.map((file) => (
                  <li key={file.id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--sky-text)]">{file.name}</p>
                      <p className="text-xs text-[var(--sky-subtle)] tabular-nums">
                        {(file.size / 1024).toFixed(1)} KB · {new Date(file.uploadedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--sky-subtle)] whitespace-nowrap">Received · processing not yet available</span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-[var(--sky-panel-border)]">
                <Link href="/dashboard/submissions" className="text-sm font-medium text-[var(--action-accent)] hover:underline rounded">
                  Go to the review queue
                </Link>
              </div>
            </Panel>
          )}
        </div>

        {/* Before you upload */}
        <Panel title="Before you upload">
          <ol className="space-y-5">
            {checklist.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--sky-panel-border)] text-[12px] font-semibold text-[var(--sky-subtle)] flex items-center justify-center tabular-nums">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--sky-text)]">{item.title}</p>
                  <p className="text-[13px] text-[var(--sky-subtle)] mt-0.5 leading-relaxed">{item.body}</p>
                  {item.action && (
                    <Link href={item.action.href} className="inline-block mt-1.5 text-[13px] font-medium text-[var(--action-accent)] hover:underline rounded">
                      {item.action.label}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  )
}
