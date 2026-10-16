'use client'

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
    'inline-flex items-center justify-center gap-2 font-semibold rounded-md whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ffe] disabled:opacity-50 disabled:cursor-not-allowed'

  // One action color (brand blue). Teal is kept as a secondary brand action
  // with navy text — white text on teal is 2.1:1 and fails contrast.
  const variants = {
    primary: 'bg-[#005ffe] text-white hover:bg-[#0047cc]',
    secondary:
      'bg-white text-[#0A3059] border border-[#CFD8E3] hover:border-[#0A3059]/35 hover:bg-[#F6F8FA]',
    outline:
      'border border-[var(--action-accent)] text-[var(--action-accent)] hover:bg-[var(--action-accent-soft)]',
    ghost: 'text-[var(--sky-text)] hover:bg-[var(--action-accent-soft)]',
    'primary-blue': 'bg-[#00cd90] text-[#0A3059] hover:bg-[#2DD4BF]',
    dark: 'bg-[#0A3059] text-white hover:bg-[#0d3d6f]',
    light: 'bg-[#F0F7FF] text-[#0A3059] hover:bg-white',
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

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
