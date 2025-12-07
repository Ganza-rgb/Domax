'use client'

import { useId } from 'react'

/**
 * Gradient Heading Component with Underline
 * 
 * @param {string} children - The heading text (can include JSX for gradient parts)
 * @param {string} as - HTML tag to render (h1, h2, h3, h4, h5, h6)
 * @param {string} className - Additional CSS classes
 * @param {string} highlightText - Text to highlight with gradient (optional, if not provided, will highlight last word)
 * @param {boolean} highlightAll - If true, highlights all text instead of just a portion
 */
export default function GradientHeading({
  children,
  as: Component = 'h1',
  className = '',
  highlightText = null,
  highlightAll = false,
  ...props
}) {
  // If children is a string, we need to process it
  // If it's JSX, we'll use it as-is
  const renderContent = () => {
    if (typeof children !== 'string') {
      // Already JSX, return as-is
      return children
    }

    const text = children

    if (highlightAll) {
      // Highlight entire text
      return (
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] bg-clip-text text-transparent">
            {text}
          </span>
          <UnderlineSVG />
        </span>
      )
    }

    if (highlightText) {
      // Highlight specific text
      const parts = text.split(highlightText)
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] bg-clip-text text-transparent">
                {highlightText}
              </span>
              <UnderlineSVG />
            </span>
            {parts[1]}
          </>
        )
      }
    }

    // Default: highlight last word
    const words = text.split(' ')
    const lastWord = words.pop()
    const restOfText = words.join(' ')

    return (
      <>
        {restOfText && `${restOfText} `}
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-[#00cd90] to-[#2DD4BF] bg-clip-text text-transparent">
            {lastWord}
          </span>
          <UnderlineSVG />
        </span>
      </>
    )
  }

  return (
    <Component
      className={`font-bold text-[#0A3059] leading-[1.1] tracking-tight ${className}`}
      {...props}
    >
      {renderContent()}
    </Component>
  )
}

/**
 * Underline SVG Component
 */
function UnderlineSVG({ className = '' }) {
  const gradientId = useId()

  return (
    <svg
      className={`absolute -bottom-2 left-0 w-full ${className}`}
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M2 9C50 3 150 3 198 9"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00cd90" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

