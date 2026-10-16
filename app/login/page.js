'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Button from '@/components/atoms/Button'
import { ReviewQueueVisual, Tick } from '@/components/site/ProductVisuals'
import { useMotion, gsap, EASE } from '@/lib/motion'
import { CONTACT_EMAIL } from '@/lib/site'

const inputClass =
  'w-full h-12 px-4 bg-white border border-line-strong rounded-xl text-[15px] text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10'

export default function LoginPage() {
  const router = useRouter()
  const page = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useMotion(page, () => {
    gsap.from('[data-enter]', { autoAlpha: 0, y: 18, duration: 0.7, ease: EASE, stagger: 0.07 })
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.ok && !result.error) {
        router.push('/dashboard')
        return
      }
      setError('That email and password don’t match an account. Check them and try again.')
    } catch {
      setError('We couldn’t reach the sign-in service. Check your connection and try again.')
    }
    setIsLoading(false)
  }

  return (
    <div ref={page} className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
      {/* Form */}
      <div className="flex flex-col px-6 sm:px-10 py-8">
        <Link data-enter href="/" className="inline-flex items-end -space-x-1 self-start" aria-label="Domax home">
          <Image src="/favicon.svg" alt="" width={40} height={40} className="h-7 w-7" priority />
          <span className="text-lg font-bold tracking-tight text-[#0A3059]">OMAX</span>
        </Link>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-[400px]">
            <h1 data-enter className="text-[clamp(2.25rem,4vw,3rem)] leading-[1] tracking-[-0.04em] text-ink">
              Log in to Domax
            </h1>
            <p data-enter className="text-ink-2 text-[17px] mt-4">
              Pick up where you left off with your class’s scripts.
            </p>

            <form data-enter onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="you@school.rw"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
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
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${inputClass} pr-12`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'login-error' : undefined}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 w-12 flex items-center justify-center rounded-r-xl text-ink-3 hover:text-ink"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.7 9.7 0 0112 5c4.5 0 8.3 2.9 9.5 7a10 10 0 01-3 4.6M6.6 6.6A10 10 0 002.5 12c1.3 4.1 5 7 9.5 7a9.6 9.6 0 004.4-1" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.5 12C3.7 7.9 7.5 5 12 5s8.3 2.9 9.5 7c-1.2 4.1-5 7-9.5 7s-8.3-2.9-9.5-7z" />
                          <circle cx="12" cy="12" r="3" strokeWidth={1.8} />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <p id="login-error" role="alert" className="rounded-xl bg-critical-soft text-critical text-sm px-4 py-3">
                  {error}
                </p>
              )}

              <Button type="submit" size="xl" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in…' : 'Log in'}
              </Button>

              <p className="text-sm text-ink-3">
                Forgot your password?{' '}
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Password reset')}`} className="link">
                  Email us
                </a>{' '}
                and we’ll reset it.
              </p>
            </form>

            <p data-enter className="mt-10 pt-6 border-t border-line text-[15px] text-ink-2">
              Not a pilot site yet?{' '}
              <Link href="/pilot" className="link">
                Request a pilot
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Product panel */}
      <aside className="hidden lg:flex flex-col justify-center gap-10 bg-[#071A33] on-dark px-14 xl:px-20 py-16">
        <div data-enter className="max-w-md">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-[#8db8ff]">
            <Tick className="w-4 h-4" /> Teacher-signed marking
          </p>
          <p className="mt-4 font-headline text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            The hard answers come first. The judgement stays yours.
          </p>
        </div>
        <div data-enter className="max-w-xl [&>div]:!bg-white/[0.06]">
          <ReviewQueueVisual />
        </div>
      </aside>
    </div>
  )
}
