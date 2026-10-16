'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const hasMeaningfulValue = (value) => {
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some((item) => hasMeaningfulValue(item))
  }
  return Boolean(value)
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    special: false,
    lowercase: false,
    uppercase: false,
    number: false,
  })

  const testimonials = [
    {
      quote: "Domax has transformed how I grade papers. What used to take hours now takes minutes, and my students get better feedback.",
      author: "Sarah M.",
      role: "Senior Literature Teacher",
      avatar: "S"
    },
    {
      quote: "The analytics dashboard gives me insights I never had before. I can see exactly where my students struggle and adjust my teaching.",
      author: "Dr. James K.",
      role: "Exam Marker & TA",
      avatar: "J"
    },
    {
      quote: "Best investment I've made for my teaching career. The time saved allows me to focus on what matters - teaching.",
      author: "Maria L.",
      role: "Curriculum Lead",
      avatar: "M"
    },
    {
      quote: "The rubric builder is incredibly intuitive. I can create custom rubrics in minutes and reuse them across classes.",
      author: "Robert T.",
      role: "Digital Literacy Coach",
      avatar: "R"
    },
    {
      quote: "My students love the detailed annotations. They can see exactly what needs improvement and how to enhance their work.",
      author: "Emily C.",
      role: "Primary Teacher",
      avatar: "E"
    }
  ]

  const features = [
    {
      title: 'Automated Grading',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'In-Document Annotations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: 'Analytics Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Custom Rubrics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'LMS Integration',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
        </svg>
      )
    }
  ]

const roleOptions = [{ value: 'teacher', label: 'Teacher', description: 'Individual educators & TAs' }]
const teachingRoleOptions = [
  { value: 'subject-teacher', label: 'Subject Teacher' },
  { value: 'class-teacher', label: 'Class Teacher' },
  { value: 'head-of-department', label: 'Head of Department' },
  { value: 'discipline-teacher', label: 'Discipline/M&E Teacher' },
]
const subjectOptions = [
  'Mathematics',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Kinyarwanda',
  'French',
  'ICT / Computer Science',
]
const subjectLevelOptions = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
const languageOptions = ['English', 'French', 'Kinyarwanda', 'Swahili']
const schoolOptions = [
  { value: 'kigali-high', label: 'Kigali High School' },
  { value: 'lycee-sainte', label: 'Lycée Sainte Famille' },
  { value: 'efa-nyanza', label: 'EFA Nyanza' },
  { value: 'maranyundo', label: 'Maranyundo Girls School' },
  { value: 'apaper', label: 'APAER Kigali' },
]

const createSubjectEntry = () => ({
  id: crypto.randomUUID(),
  subject: '',
  levels: [],
  streams: '',
})

const wizardSteps = [
  {
    id: 'identity',
    label: 'Identity',
    title: 'Create your Domax account',
    subtitle: 'Start with your basic details so we can secure your workspace.',
    description: 'Account basics',
  },
  {
    id: 'roles',
    label: 'School & roles',
    title: 'Map your professional identity',
    subtitle: 'Tell us where you teach and the responsibilities you cover.',
    description: 'Workplace & responsibilities',
  },
  {
    id: 'subjects',
    label: 'Subjects',
    title: 'Define your teaching scope',
    subtitle: 'Add every subject, level, and stream you support.',
    description: 'Subjects & coverage',
  },
  {
    id: 'workflow',
    label: 'Workflow',
    title: 'Share workload and preferences',
    subtitle: 'We tune the assistant to match your teaching reality.',
    description: 'Teaching metadata & consent',
  },
]

const [step, setStep] = useState(1)
const [selectedRole, setSelectedRole] = useState('teacher')
const [formData, setFormData] = useState({
  fullName: '',
  phone: '',
  gender: '',
  teacher: {
    classCode: '',
    teacherId: '',
    schoolId: '',
    schoolName: '',
    useCustomSchool: false,
    customSchoolName: '',
    roles: [],
    subjects: [createSubjectEntry()],
    yearsExperience: '',
    preferredLanguage: '',
    weeklyLoad: '',
    classSize: '',
    enableAssistant: true,
  },
})

const [onboardingSessionId, setOnboardingSessionId] = useState(null)
const [saveState, setSaveState] = useState({ status: 'idle', timestamp: null })
const [actionNotice, setActionNotice] = useState(null)

const totalSteps = wizardSteps.length
const activeWizardStep = wizardSteps[Math.min(step - 1, totalSteps - 1)]
const teacherData = formData.teacher
const hasValidSubjects = teacherData.subjects.some(
  (subject) => subject.subject && subject.levels && subject.levels.length > 0
)

  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)
  const autosaveControllerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Left side (form) animation
      if (leftSideRef.current) {
        const children = Array.from(leftSideRef.current.children)
        gsap.fromTo(children, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }

      // Right side (features/testimonials) animation
      if (rightSideRef.current) {
        const content = rightSideRef.current.querySelector('.relative.z-10')
        if (content) {
          const children = Array.from(content.children)
          gsap.fromTo(children,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          )
        }
      }
    }, 50)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const cached = window.localStorage.getItem('domax:onboardingId')
    if (cached) {
      setOnboardingSessionId(cached)
    }
  }, [])

  const checkPasswordRequirements = (pwd) => {
    setPasswordRequirements({
      length: pwd.length >= 12,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
    })
  }

  const handlePasswordChange = (e) => {
    const pwd = e.target.value
    setPassword(pwd)
    checkPasswordRequirements(pwd)
  }

  const handleRoleSelection = (value) => {
    setSelectedRole(value)
  }

  const updateRoleField = (role, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value,
      },
    }))
  }

  const handleSchoolSelection = (value) => {
    const selectedSchool = schoolOptions.find((school) => school.value === value)
    setFormData((prev) => ({
      ...prev,
      teacher: {
        ...prev.teacher,
        schoolId: value,
        schoolName: selectedSchool?.label || '',
        useCustomSchool: false,
        customSchoolName: '',
      },
    }))
  }

  const toggleCustomSchool = () => {
    setFormData((prev) => ({
      ...prev,
      teacher: {
        ...prev.teacher,
        useCustomSchool: !prev.teacher.useCustomSchool,
        schoolId: '',
        schoolName: '',
      },
    }))
  }

  const toggleTeachingRole = (roleValue) => {
    setFormData((prev) => {
      const current = prev.teacher.roles || []
      const exists = current.includes(roleValue)
      const updated = exists ? current.filter((item) => item !== roleValue) : [...current, roleValue]
      return {
        ...prev,
        teacher: {
          ...prev.teacher,
          roles: updated,
        },
      }
    })
  }

  const handleSubjectFieldChange = (subjectId, field, value) => {
    setFormData((prev) => {
      const updatedSubjects = prev.teacher.subjects.map((subject) =>
        subject.id === subjectId ? { ...subject, [field]: value } : subject
      )
      return {
        ...prev,
        teacher: {
          ...prev.teacher,
          subjects: updatedSubjects,
        },
      }
    })
  }

  const toggleSubjectLevel = (subjectId, level) => {
    setFormData((prev) => {
      const updatedSubjects = prev.teacher.subjects.map((subject) => {
        if (subject.id !== subjectId) return subject
        const exists = subject.levels.includes(level)
        const levels = exists ? subject.levels.filter((item) => item !== level) : [...subject.levels, level]
        return { ...subject, levels }
      })
      return {
        ...prev,
        teacher: {
          ...prev.teacher,
          subjects: updatedSubjects,
        },
      }
    })
  }

  const addSubjectEntry = () => {
    setFormData((prev) => ({
      ...prev,
      teacher: {
        ...prev.teacher,
        subjects: [...prev.teacher.subjects, createSubjectEntry()],
      },
    }))
  }

  const removeSubjectEntry = (subjectId) => {
    setFormData((prev) => {
      const remaining = prev.teacher.subjects.filter((subject) => subject.id !== subjectId)
      return {
        ...prev,
        teacher: {
          ...prev.teacher,
          subjects: remaining.length > 0 ? remaining : [createSubjectEntry()],
        },
      }
    })
  }

  const persistCurrentStep = useCallback(
    async (reason = 'autosave', options = {}) => {
      const accountPayload = {
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        email,
        passwordConfigured: password.length >= 12,
      }
      const rolePayload = formData[selectedRole] || {}
      const normalizedRolePayload = (() => {
        if (!rolePayload) return rolePayload
        const normalizedSubjects = Array.isArray(rolePayload.subjects)
          ? rolePayload.subjects
              .map((subject) => ({
                subject: subject.subject,
                levels: subject.levels || [],
                streams: subject.streams,
              }))
              .filter((subject) => subject.subject || (subject.levels && subject.levels.length > 0) || subject.streams)
          : undefined
        return {
          ...rolePayload,
          ...(normalizedSubjects ? { subjects: normalizedSubjects } : {}),
          ...(rolePayload.useCustomSchool
            ? { schoolName: rolePayload.customSchoolName }
            : { schoolName: rolePayload.schoolName }),
        }
      })()
      const hasAccountData = hasMeaningfulValue(accountPayload)
      const hasRoleData = hasMeaningfulValue(normalizedRolePayload)
      if (!hasAccountData && !hasRoleData) {
        return null
      }
      setSaveState((prev) => ({ ...prev, status: 'saving' }))
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: options.signal,
          body: JSON.stringify({
            sessionId: onboardingSessionId,
            role: selectedRole,
            step,
            finalize: options.finalize || false,
            reason,
            data: {
              account: accountPayload,
              roleData: normalizedRolePayload,
            },
          }),
        })
        const result = await response.json()
        if (response.ok && result.sessionId) {
          setSaveState({ status: 'saved', timestamp: result.savedAt })
          if (!onboardingSessionId && typeof window !== 'undefined') {
            window.localStorage.setItem('domax:onboardingId', result.sessionId)
            setOnboardingSessionId(result.sessionId)
          }
        } else if (!response.ok) {
          setSaveState({ status: 'error', timestamp: null })
        }
        return result
      } catch (error) {
        if (error.name === 'AbortError') {
          return null
        }
        setSaveState({ status: 'error', timestamp: null })
        throw error
      }
    },
    [formData, email, password.length, onboardingSessionId, selectedRole, step]
  )

  useEffect(() => {
    const accountSnapshot = {
      fullName: formData.fullName,
      phone: formData.phone,
      email,
    }
    const rolePayload = formData[selectedRole] || {}
    const shouldPersist = hasMeaningfulValue(accountSnapshot) || hasMeaningfulValue(rolePayload)
    if (!shouldPersist) {
      return
    }
    if (autosaveControllerRef.current) {
      autosaveControllerRef.current.abort()
    }
    const controller = new AbortController()
    autosaveControllerRef.current = controller
    const timer = setTimeout(() => {
      persistCurrentStep('autosave', { signal: controller.signal }).catch(() => {})
    }, 800)
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [formData, email, selectedRole, persistCurrentStep])

  const ensureProfessionalStep = () => {
    if (teacherData.useCustomSchool && !teacherData.customSchoolName.trim()) {
      setActionNotice({
        type: 'error',
        message: 'Enter your school name so we can set up the workspace.',
      })
      return false
    }
    if (!teacherData.useCustomSchool && !teacherData.schoolId) {
      setActionNotice({
        type: 'error',
        message: 'Select your school or choose “My school is not listed”.',
      })
      return false
    }
    if ((teacherData.roles || []).length === 0) {
      setActionNotice({
        type: 'error',
        message: 'Select at least one teaching role.',
      })
      return false
    }
    return true
  }

  const ensureSubjectsStep = () => {
    if (!hasValidSubjects) {
      setActionNotice({
        type: 'error',
        message: 'Add at least one subject and choose the levels you teach.',
      })
      return false
    }
    return true
  }

  const validateStep = (currentStep) => {
    if (currentStep === 2) {
      return ensureProfessionalStep()
    }
    if (currentStep === 3) {
      return ensureSubjectsStep()
    }
    if (currentStep === totalSteps) {
      if (!ensureProfessionalStep()) return false
      if (!ensureSubjectsStep()) return false
      if (!agreedToTerms) {
        setActionNotice({
          type: 'error',
          message: 'Please agree to the terms and policies.',
        })
        return false
      }
    }
    return true
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setActionNotice(null)

    if (step < totalSteps) {
      const isValid = validateStep(step)
      if (!isValid) {
        return
      }
      await persistCurrentStep('step-advance')
      setStep((prev) => Math.min(totalSteps, prev + 1))
      return
    }

    if (!validateStep(step)) {
      return
    }

    setIsLoading(true)
    try {
      await persistCurrentStep('finalize', { finalize: true })
      setActionNotice({
        type: 'success',
        message: 'Account created. We’ll email you once your workspace is live.',
      })
    } catch (error) {
      setActionNotice({
        type: 'error',
        message: 'We could not save your onboarding info. Please retry.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderProfessionalIdentity = () => (
    <section className="space-y-5">
      <p className="eyebrow">Professional identity</p>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">Choose school</label>
        <select
          value={teacherData.useCustomSchool ? '' : teacherData.schoolId}
          onChange={(e) => handleSchoolSelection(e.target.value)}
          disabled={teacherData.useCustomSchool}
          className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
        >
          <option value="">Select a school</option>
          {schoolOptions.map((school) => (
            <option key={school.value} value={school.value}>
              {school.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3 mt-3">
          <Button type="button" variant="ghost" size="sm" onClick={toggleCustomSchool}>
            {teacherData.useCustomSchool ? 'Select from list' : 'My school is not listed'}
          </Button>
          {teacherData.schoolName && !teacherData.useCustomSchool && (
            <span className="text-[13px] text-ink-2">Selected: {teacherData.schoolName}</span>
          )}
        </div>
        {teacherData.useCustomSchool && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-ink mb-1.5">
              Enter school name
            </label>
            <input
              type="text"
              value={teacherData.customSchoolName}
              onChange={(e) => updateRoleField('teacher', 'customSchoolName', e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
              placeholder="e.g., Green Valley STEM Academy"
            />
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-2">Teaching role(s)</p>
        <div className="flex flex-wrap gap-3">
          {teachingRoleOptions.map((role) => {
            const checked = teacherData.roles.includes(role.value)
            return (
              <label
                key={role.value}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
                  checked ? 'border-[#005ffe] bg-[#F0F7FF]' : 'border-line hover:border-line-strong'
                }`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#005ffe]"
                  checked={checked}
                  onChange={() => toggleTeachingRole(role.value)}
                />
                <span className="text-sm text-ink">{role.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Class / invite code <span className="font-normal text-ink-3">(optional)</span>
        </label>
        <input
          type="text"
          value={teacherData.classCode}
          onChange={(e) => updateRoleField('teacher', 'classCode', e.target.value)}
          className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
          placeholder="Leave blank to auto-generate"
        />
        <p className="text-[13px] text-ink-3 mt-1.5">
          Share this code with students to unlock their free Domax past-paper portal.
        </p>
      </div>
    </section>
  )

  const renderSubjectsSection = () => (
    <section className="space-y-5">
      <p className="eyebrow">Subjects they teach</p>
      <div className="space-y-4 max-h-[22rem] overflow-y-auto pr-1 sm:pr-2">
        {teacherData.subjects.map((subjectEntry, index) => (
          <div key={subjectEntry.id} className="rounded-xl border border-line p-4 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-ink mb-1.5">Subject</label>
                <select
                  value={subjectEntry.subject}
                  onChange={(e) => handleSubjectFieldChange(subjectEntry.id, 'subject', e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
                >
                  <option value="">Select subject</option>
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              {teacherData.subjects.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubjectEntry(subjectEntry.id)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-ink mb-2">Levels</p>
              <div className="flex flex-wrap gap-3">
                {subjectLevelOptions.map((level) => (
                  <label key={`${subjectEntry.id}-${level}`} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#005ffe]"
                      checked={subjectEntry.levels.includes(level)}
                      onChange={() => toggleSubjectLevel(subjectEntry.id, level)}
                    />
                    <span className="text-sm text-ink">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Streams <span className="font-normal text-ink-3">(optional)</span>
              </label>
              <input
                type="text"
                value={subjectEntry.streams}
                onChange={(e) => handleSubjectFieldChange(subjectEntry.id, 'streams', e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
                placeholder="e.g., Blue, Senior Arts"
              />
            </div>
            {index === teacherData.subjects.length - 1 && (
              <p className="text-[13px] text-ink-3">Levels and streams help us personalize rubrics.</p>
            )}
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addSubjectEntry}>
        Add another subject
      </Button>
    </section>
  )

  const renderTeachingMetadataSection = () => (
    <section className="space-y-5">
      <p className="eyebrow">Teaching metadata</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Years of experience</label>
          <input
            type="number"
            min="0"
            value={teacherData.yearsExperience}
            onChange={(e) => updateRoleField('teacher', 'yearsExperience', e.target.value)}
            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
            placeholder="e.g., 5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Preferred teaching language</label>
          <select
            value={teacherData.preferredLanguage}
            onChange={(e) => updateRoleField('teacher', 'preferredLanguage', e.target.value)}
            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
          >
            <option value="">Select language</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Weekly teaching load</label>
          <input
            type="number"
            min="0"
            value={teacherData.weeklyLoad}
            onChange={(e) => updateRoleField('teacher', 'weeklyLoad', e.target.value)}
            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
            placeholder="Hours per week"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Approximate class size</label>
          <input
            type="number"
            min="0"
            value={teacherData.classSize}
            onChange={(e) => updateRoleField('teacher', 'classSize', e.target.value)}
            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
            placeholder="e.g., 45"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-line bg-[#F6F8FA] px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#005ffe]"
          checked={teacherData.enableAssistant}
          onChange={(e) => updateRoleField('teacher', 'enableAssistant', e.target.checked)}
        />
        <div>
          <p className="text-sm font-semibold text-[#0A3059]">Enable Domax AI Assistant?</p>
          <p className="text-[13px] text-ink-2 mt-0.5">Get grading nudges, wallet alerts, and live planning help.</p>
        </div>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Teacher ID <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input
            type="text"
            value={teacherData.teacherId}
            onChange={(e) => updateRoleField('teacher', 'teacherId', e.target.value)}
            className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
            placeholder="Internal staff ID"
          />
        </div>
        <div className="rounded-xl border border-line bg-[#F6F8FA] p-4 text-sm text-ink-2">
          <p className="font-semibold text-[#0A3059] mb-1">Student access</p>
          <p>Students never pay. Once you set or share a class code, they get free read-only portals.</p>
        </div>
      </div>
    </section>
  )

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <div className="space-y-5">
            <p className="eyebrow">Basic identity</p>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Full name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
                placeholder="e.g., Aline Uwase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Phone number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
                placeholder="+250 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Gender <span className="font-normal text-ink-3">(optional)</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg text-[15px] text-ink placeholder-[#5B6B82] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] disabled:bg-[#F6F8FA] disabled:text-ink-3 pr-11"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 w-11 flex items-center justify-center rounded-r-lg text-ink-3 hover:text-ink"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5" aria-live="polite">
                {[
                  { key: 'length', text: 'At least 12 characters' },
                  { key: 'special', text: 'One special character' },
                  { key: 'lowercase', text: 'One lowercase letter' },
                  { key: 'uppercase', text: 'One uppercase letter' },
                  { key: 'number', text: 'One number' },
                ].map((req) => (
                  <div key={req.key} className="flex items-center text-sm">
                    <svg
                      className={`w-4 h-4 mr-2 ${
                        passwordRequirements[req.key] ? 'text-[#007A56]' : 'text-[#9AA8BA]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {passwordRequirements[req.key] ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    <span className={passwordRequirements[req.key] ? 'text-ink' : 'text-ink-3'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-ink mb-2.5">Choose your role</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roleOptions.map((option) => {
                const isActive = selectedRole === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleRoleSelection(option.value)}
                    className={`text-left rounded-xl border px-4 py-3 transition-all ${
                      isActive ? 'border-[#005ffe] bg-[#F0F7FF] ring-1 ring-[#005ffe]' : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#0A3059]">{option.label}</p>
                    <p className="text-[13px] text-ink-2 mt-0.5">{option.description}</p>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 rounded-xl bg-[#F6F8FA] border border-line px-4 py-3 text-[13px] text-ink-2">
              Students don’t create accounts here. Share your Domax class code and they’ll access past papers and feedback for free.
            </div>
          </div>
        </>
      )
    }

    if (step === 2) {
      return (
        <>
          <div className="rounded-xl border border-line bg-[#F6F8FA] px-4 py-3 text-sm text-ink-2">
            <span className="font-semibold text-[#0A3059]">Role:</span>{' '}
            {roleOptions.find((role) => role.value === selectedRole)?.label}
          </div>
          {renderProfessionalIdentity()}
        </>
      )
    }

    if (step === 3) {
      return (
        <>
          <div className="rounded-xl border border-line bg-[#F6F8FA] px-4 py-3 text-sm text-ink-2">
            <p className="font-semibold text-[#0A3059]">Subject planner</p>
            <p>List every subject + level combo you cover. Scroll the list if it grows.</p>
          </div>
          {renderSubjectsSection()}
        </>
      )
    }

    return (
      <>
        {renderTeachingMetadataSection()}
        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#005ffe]"
            required
          />
          <label htmlFor="terms" className="ml-3 text-sm text-ink-2 leading-relaxed">
            I agree to the{' '}
            <Link href="/terms" className="text-[#005ffe] hover:underline">
              Terms of Service
            </Link>
            ,{' '}
            <Link href="/acceptable-use" className="text-[#005ffe] hover:underline">
              Acceptable Use Policy
            </Link>{' '}
            and confirm that I have read the{' '}
            <Link href="/privacy" className="text-[#005ffe] hover:underline">
              Domax Privacy Policy
            </Link>
            .
          </label>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Signup Form */}
      <div ref={leftSideRef} className="flex-1 flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 py-12 opacity-100">
          <div className="w-full max-w-[440px]">
            {/* Logo */}
            <Link href="/" className="inline-flex items-end -space-x-1 mb-12 rounded-md" aria-label="Domax home">
              <Image
                src="/favicon.svg"
                alt=""
                width={40}
                height={40}
                className="h-7 w-7"
                priority
              />
              <span className="text-lg font-bold tracking-tight text-[#0A3059]">OMAX</span>
            </Link>

            <div className="mb-6 sm:mb-8">
              <p className="eyebrow mb-3">
                Step {step} of {totalSteps}
              </p>
              <h1 className="text-[1.75rem] sm:text-[2.25rem] font-medium text-[#0A3059] mb-2 leading-[1.15] tracking-[-0.02em]">
                {activeWizardStep.title}
              </h1>
              <p className="text-ink-2 text-base">{activeWizardStep.subtitle}</p>
              {saveState.status === 'saving' && <p className="text-xs text-ink-3 mt-2" role="status">Saving…</p>}
              {saveState.status === 'saved' && saveState.timestamp && (
                <p className="text-xs text-positive mt-2" role="status">
                  Autosaved at {new Date(saveState.timestamp).toLocaleTimeString()}
                </p>
              )}
              {saveState.status === 'error' && (
                <p className="text-xs text-critical mt-2" role="status">Autosave failed. We&apos;ll keep retrying.</p>
              )}
            </div>

            <nav aria-label="Signup progress" className="mb-8">
              <ol className="grid grid-cols-4 gap-1.5">
                {wizardSteps.map((wizardStep, index) => {
                  const wizardIndex = index + 1
                  const isActive = wizardIndex === step
                  const isComplete = wizardIndex < step
                  return (
                    <li key={wizardStep.id} aria-current={isActive ? 'step' : undefined}>
                      <span
                        className={`block h-1 rounded-full transition-colors ${
                          isActive
                            ? 'bg-[#005ffe]'
                            : isComplete
                              ? 'bg-[#0A3059]'
                              : 'bg-[#E3E8EF]'
                        }`}
                      />
                      <p
                        className={`mt-2 text-xs font-semibold ${
                          isActive ? 'text-[#005ffe]' : isComplete ? 'text-ink' : 'text-ink-3'
                        }`}
                      >
                        <span className="sr-only">Step {wizardIndex}: </span>{wizardStep.label}
                      </p>
                      <p className="text-xs text-ink-3 hidden md:block">
                        {wizardStep.description}
                      </p>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {renderStepContent()}

              {actionNotice && (
                <div
                  role={actionNotice.type === 'error' ? 'alert' : 'status'}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    actionNotice.type === 'error'
                      ? 'border-[#F7C6D1] bg-critical-soft text-[#B0123A]'
                      : 'border-[#BFEBDD] bg-positive-soft text-positive'
                  }`}
                >
                  <p className="font-semibold">{actionNotice.message}</p>
                  {actionNotice.detail && <p className="text-xs mt-1">{actionNotice.detail}</p>}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {step === totalSteps ? (isLoading ? 'Creating account...' : 'Create account') : 'Next'}
                </Button>
              </div>
            </form>

            {/* Log In Link */}
            <div className="mt-8 pt-6 border-t border-line text-center">
              <p className="text-sm text-ink-2">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-[#005ffe] hover:text-[#0047cc] transition-colors"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Static Content + Auto-sliding Testimonials */}
      <div ref={rightSideRef} className="hidden lg:flex flex-1 flex-col bg-[#F0F7FF] border-l border-line p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,205,144,0.35),rgba(0,205,144,0))]" />
          <div className="absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,95,254,0.25),rgba(0,95,254,0))]" />
        </div>
        
          {/* GSAP staggers the three direct children of this .relative.z-10 column. */}
          <div className="relative z-10 max-w-md mx-auto w-full flex-1 flex flex-col justify-center px-4">
          {/* Static Content */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-[1.75rem] font-medium text-[#0A3059] mb-3">
              What you get with a Domax account
            </h2>
            <p className="text-base text-ink-2 mb-8">
              Join thousands of educators who save hours every week with Domax.
            </p>

            {/* Features List */}
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A3059] flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-[15px] text-[#0A3059] font-medium">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Testimonials */}
          <div className="relative h-56" aria-live="polite">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <figure className="bg-white rounded-xl p-6 border border-line">
                  <blockquote className="text-ink text-base leading-relaxed mb-5">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E8F0FF] flex items-center justify-center text-[#0A3059] font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-[#0A3059] font-semibold">{testimonial.author}</p>
                      <p className="text-ink-2 text-[13px]">{testimonial.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'w-8 h-2 bg-[#005ffe] rounded-full'
                    : 'w-2 h-2 bg-[#CFD8E3] rounded-full hover:bg-[#5B6B82]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentTestimonial ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
