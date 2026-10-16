'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      title: 'A first read of every script',
      description: 'Suggested marks for each point in your marking scheme, with the evidence shown beside them.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Your marking scheme',
      description: 'Domax marks against the scheme you already use, not one of its own.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'You sign every mark',
      description: 'Nothing reaches a student until a teacher has reviewed and signed it.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: 'Every page accounted for',
      description: 'Missing, repeated or swapped pages are flagged before any marking starts.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Ready for CAMIS',
      description: 'Download mark sheets set out for entry into CAMIS.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
        </svg>
      )
    }
  ]

  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
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

      // Right side (features) animation
      if (rightSideRef.current) {
        const content = rightSideRef.current.querySelector('div > div')
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div ref={leftSideRef} className="flex-1 flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 py-12 opacity-100">
          <div className="w-full max-w-[400px]">
            {/* Logo */}
            <Link href="/" className="inline-flex items-end -space-x-1 mb-14 rounded-md" aria-label="Domax home">
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

            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-[2rem] sm:text-[2.5rem] font-medium text-[#0A3059] mb-3 leading-[1.1] tracking-[-0.025em]">
                Welcome back!
              </h1>
              <p className="text-ink-2 text-base">
                Log in and continue grading your students' papers.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0A3059] mb-1.5"
                >
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
                  className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg placeholder-[#5B6B82] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#0A3059] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-line-strong rounded-lg placeholder-[#5B6B82] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-[#005ffe]/20 focus:border-[#005ffe] transition-all pr-11"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 w-11 flex items-center justify-center rounded-r-lg text-ink-3 hover:text-ink"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#005ffe] hover:text-[#0047cc] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-line text-center">
              <p className="text-sm text-ink-2">
                Not a pilot site yet?{' '}
                <Link
                  href="/pilot"
                  className="font-semibold text-[#005ffe] hover:text-[#0047cc] transition-colors"
                >
                  Request a pilot
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auto-sliding Features */}
      <div ref={rightSideRef} className="hidden lg:flex flex-1 items-center justify-center bg-[#F0F7FF] border-l border-line p-12 relative overflow-hidden">
      {/* Decorative layer. The GSAP call selects this element (first `div > div`)
          and fades it to full opacity, so the wash itself is kept soft. */}
      <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,205,144,0.12),rgba(0,205,144,0))]" />
          <div className="absolute -bottom-40 -left-24 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,95,254,0.10),rgba(0,95,254,0))]" />
        </div>
        
        <div className="relative z-10 max-w-md w-full">
          <div className="relative h-72" aria-live="polite">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentFeature ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#0A3059] flex items-center justify-center text-white mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0A3059] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[17px] text-ink-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`transition-all duration-300 ${
                  index === currentFeature
                    ? 'w-8 h-2 bg-[#005ffe] rounded-full'
                    : 'w-2 h-2 bg-[#CFD8E3] rounded-full hover:bg-[#5B6B82]'
                }`}
                aria-label={`Go to feature ${index + 1}`}
                aria-current={index === currentFeature ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
