'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ffe] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'

  const variants = {
    primary:
      'bg-gradient-to-r from-[#005ffe] to-[#0047cc] text-white hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-white text-[#0A3059] border border-[#d6e2ff] hover:bg-[#f4f7ff] active:scale-[0.98]',
    outline:
      'border border-[var(--action-accent)] text-[var(--action-accent)] hover:bg-[var(--action-accent-soft)] active:scale-[0.98]',
    ghost:
      'text-[var(--sky-text)] hover:bg-[var(--sky-surface)]/70 active:scale-[0.98]',
    'primary-blue':
      'bg-gradient-to-r from-[#00cd90] to-[#2dd4bf] text-white hover:brightness-110 active:scale-[0.98]',
    dark:
      'bg-[#0A3059] text-white hover:bg-[#0d3d6f] active:scale-[0.98]',
    light:
      'bg-[#f1f5ff] text-[#0A3059] hover:bg-white active:scale-[0.98]',
  }

  const sizes = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-base',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  // Skeleton flash effect component (bunny.net style)
  const SkeletonFlash = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-out" 
           style={{ width: '200%', height: '200%' }} />
    </div>
  )

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={`${classes} group`}>
        <SkeletonFlash />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${classes} group`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <SkeletonFlash />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
