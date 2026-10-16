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
    'relative inline-flex items-center justify-center font-semibold rounded-lg whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ffe] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'

  // One action color (brand blue). Teal is kept as a secondary brand action
  // with navy text — white text on teal is 2.1:1 and fails contrast.
  const variants = {
    primary:
      'bg-[#005ffe] text-white hover:bg-[#0047cc] active:scale-[0.98]',
    secondary:
      'bg-white text-[#0A3059] border border-[#CFD8E3] hover:border-[#0A3059]/35 hover:bg-[#F6F8FA] active:scale-[0.98]',
    outline:
      'border border-[var(--action-accent)] text-[var(--action-accent)] hover:bg-[var(--action-accent-soft)] active:scale-[0.98]',
    ghost:
      'text-[var(--sky-text)] hover:bg-[var(--action-accent-soft)] active:scale-[0.98]',
    'primary-blue':
      'bg-[#00cd90] text-[#0A3059] hover:bg-[#2DD4BF] active:scale-[0.98]',
    dark:
      'bg-[#0A3059] text-white hover:bg-[#0d3d6f] active:scale-[0.98]',
    light:
      'bg-[#F0F7FF] text-[#0A3059] hover:bg-white active:scale-[0.98]',
  }

  // Fixed heights keep buttons aligned with inputs in toolbars and forms.
  const sizes = {
    xs: 'min-h-7 px-2.5 text-xs',
    sm: 'min-h-9 px-3.5 text-sm',
    md: 'min-h-10 px-4 text-sm',
    lg: 'min-h-11 px-5 text-[15px]',
    xl: 'min-h-12 px-6 text-base',
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
      <Link href={href} className={`${classes} group`} onClick={onClick} {...props}>
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
