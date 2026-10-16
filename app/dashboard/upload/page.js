'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'
import { Notice, Panel } from '@/components/dashboard/ui'

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

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Document upload"
        title="Upload student papers"
        subtitle="Upload PDF, DOCX, or TXT files to start grading"
        actions={
          <Button variant="secondary" size="sm" href="/dashboard/submissions">
            View submissions
          </Button>
        }
      />

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
        className={`rounded-xl border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? 'border-[var(--action-accent)] bg-[var(--action-accent-soft)]'
            : 'border-[var(--sky-panel-border)] bg-[var(--sky-panel)] hover:border-[var(--action-accent)]'
        }`}
      >
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--action-accent-soft)] text-[var(--action-accent)] flex items-center justify-center mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </div>
          <p className="text-base font-semibold text-[var(--sky-text)]">
            {uploading ? 'Uploading…' : isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </p>
          <p className="text-sm text-[var(--sky-subtle)] mt-1 mb-5">Or click to browse. Supports PDF, DOCX, TXT files</p>
          <span
            aria-hidden="true"
            className={`inline-flex h-9 items-center rounded-md px-3.5 text-sm font-semibold text-white ${uploading ? 'bg-[#005ffe]/50' : 'bg-[#005ffe]'}`}
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
        <Panel meta="This session" title="Uploaded files" bodyClassName="!px-0 !pb-0">
          <ul className="divide-y divide-[var(--sky-panel-border)] border-t border-[var(--sky-panel-border)]">
            {uploadedFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[var(--action-accent-soft)] text-[var(--action-accent)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--sky-text)]">{file.name}</p>
                    <p className="text-xs text-[var(--sky-subtle)] tabular-nums">
                      {(file.size / 1024).toFixed(1)} KB · {new Date(file.uploadedAt).toLocaleTimeString()}
                    </p>
                  </div>
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

      {/* Next steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: '/dashboard/rubrics', title: 'Create rubric', body: 'Set up grading criteria before uploading' },
          { href: '/dashboard/exams', title: 'Create exam', body: 'Set up a new exam or assignment' },
          { href: '/dashboard/submissions', title: 'View submissions', body: 'Review and grade uploaded papers' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-[var(--sky-panel-border)] bg-[var(--sky-panel)] p-4 hover:border-[var(--action-accent)] transition-colors"
          >
            <p className="text-sm font-semibold text-[var(--sky-text)] group-hover:text-[var(--action-accent)]">
              {item.title} <span aria-hidden="true">→</span>
            </p>
            <p className="text-sm text-[var(--sky-subtle)] mt-0.5">{item.body}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
