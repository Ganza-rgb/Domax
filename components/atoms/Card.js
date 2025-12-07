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
  const baseStyles = 'rounded-2xl bg-white transition-all duration-300'

  const variants = {
    default: 'border border-gray-200 shadow-[0_25px_65px_-40px_rgba(16,20,58,0.4)]',
    elevated: 'border border-[#eceeff] shadow-[0_25px_65px_-40px_rgba(16,20,58,0.4)] hover:-translate-y-1',
    dark: 'bg-[#04081d] border border-white/10 text-white',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200',
  }

  const hoverStyles = hover && variant !== 'dark' ? 'hover:shadow-xl hover:border-gray-300' : ''
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
