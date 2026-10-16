'use client'

import { useRef } from 'react'
import { useMotion, revealOnScroll } from '@/lib/motion'

/**
 * Wrap server-rendered page content to give its `[data-reveal]` elements the
 * standard on-scroll reveal. Renders a plain div; content is fully visible
 * without JavaScript or with reduced motion.
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useMotion(ref, revealOnScroll)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
