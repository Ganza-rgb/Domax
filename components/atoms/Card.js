'use client'

import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  variant = 'default',
  ...props
}) {
  const baseStyles = 'rounded-xl bg-white transition-all duration-300'

  const variants = {
    default: 'border border-[#E3E8EF]',
    elevated: 'border border-[#E3E8EF] shadow-card hover:-translate-y-1',
    dark: 'bg-[#0A3059] border border-white/10 text-white',
    gradient: 'bg-[#F6F8FA] border border-[#E3E8EF]',
  }

  const hoverStyles = hover && variant !== 'dark' ? 'hover:shadow-card-hover hover:border-[#CFD8E3]' : ''
  const glassStyles = glass ? 'backdrop-blur-md bg-white/80 border-white/20' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${glassStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
