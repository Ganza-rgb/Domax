'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardState } from '@/states/useDashboardState'
import WorkspaceHeader from '@/components/dashboard/WorkspaceHeader'
import Button from '@/components/atoms/Button'

export default function UploadPage() {
  const router = useRouter()
  const { setCurrentSection } = useDashboardState()
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }, [])

  const handleFiles = async (files) => {
    const validFiles = files.filter(
      (file) => file.type === 'application/pdf' || file.type.includes('wordprocessingml') || file.type === 'text/plain'
    )

    if (validFiles.length === 0) {
      alert('Please upload PDF, DOCX, or TXT files only')
      return
    }

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

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        meta="Document upload"
        title="Upload student papers"
        subtitle="Upload PDF, DOCX, or TXT files to start grading"
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/dashboard/submissions')}
          >
            View submissions
          </Button>
        }
      />

      {/* Upload area */}
      <div
        data-tour="upload-button"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`sky-card border-2 border-dashed transition-all ${
          isDragging
            ? 'border-[#005ffe] bg-[var(--sky-surface)]'
            : 'border-[var(--sky-panel-border)]'
        }`}
      >
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#005ffe] to-[#0047cc] flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[var(--sky-text)] mb-2">
            {isDragging ? 'Drop files here' : 'Drag and drop files here'}
          </h3>
          <p className="text-sm text-[var(--sky-subtle)] mb-6">
            Or click to browse. Supports PDF, DOCX, TXT files
          </p>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <Button variant="primary" size="sm" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Choose files'}
            </Button>
          </label>
        </div>
      </div>

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="sky-card">
          <h3 className="text-lg font-semibold text-[var(--sky-text)] mb-4">Uploaded files</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 rounded-2xl border border-[var(--sky-panel-border)] bg-[var(--sky-surface)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#005ffe]/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#005ffe]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--sky-text)]">{file.name}</p>
                    <p className="text-xs text-[var(--sky-subtle)]">
                      {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
                    Uploaded
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/submissions/${file.id}`)}
                  >
                    Grade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => router.push('/dashboard/rubrics')}
          className="sky-card text-left hover:border-[#005ffe] transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#005ffe]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#005ffe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10M7 12h5M7 17h7M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
              </svg>
            </div>
            <h4 className="font-semibold text-[var(--sky-text)]">Create rubric</h4>
          </div>
          <p className="text-sm text-[var(--sky-subtle)]">Set up grading criteria before uploading</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/exams')}
          className="sky-card text-left hover:border-[#005ffe] transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#00cd90]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#00cd90]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 6h14M5 12h14M5 18h14M7 12l3 3 7-7" />
              </svg>
            </div>
            <h4 className="font-semibold text-[var(--sky-text)]">Create exam</h4>
          </div>
          <p className="text-sm text-[var(--sky-subtle)]">Set up a new exam or assignment</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/submissions')}
          className="sky-card text-left hover:border-[#005ffe] transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#FF9F43]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#FF9F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm7 0v5h5" />
              </svg>
            </div>
            <h4 className="font-semibold text-[var(--sky-text)]">View submissions</h4>
          </div>
          <p className="text-sm text-[var(--sky-subtle)]">Review and grade uploaded papers</p>
        </button>
      </div>
    </div>
  )
}
