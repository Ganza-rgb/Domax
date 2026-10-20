export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  variant = 'default',
  ...props
}) {
  const baseStyles = 'rounded-lg bg-white transition-colors duration-150'

  const variants = {
    default: 'border border-[#E3E8EF]',
    elevated: 'border border-[#E3E8EF] shadow-card',
    dark: 'bg-[#0A3059] border border-white/10 text-white',
    gradient: 'bg-[#F6F8FA] border border-[#E3E8EF]',
  }

  const hoverStyles = hover && variant !== 'dark' ? 'hover:border-[#CFD8E3]' : ''
  const glassStyles = glass ? 'bg-white/90' : ''

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${glassStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}
