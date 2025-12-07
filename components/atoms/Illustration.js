'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

/**
 * Illustration component for displaying illustrations with proper optimization
 * 
 * @param {string} src - Path to illustration (from /public/illustrations/)
 * @param {string} alt - Alt text for accessibility
 * @param {number} width - Width of illustration
 * @param {number} height - Height of illustration
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} priority - Whether to prioritize loading
 */
export default function Illustration({
  src,
  alt = 'Illustration',
  width,
  height,
  className = '',
  style = {},
  priority = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Handle SVG files differently (they might be inline)
  const isSVG = src?.endsWith('.svg')

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height, ...style }}
        {...props}
      >
        <span className="text-gray-400 text-sm">Illustration not found</span>
      </div>
    )
  }

  return (
    <div
      className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''} ${className}`}
      style={{ width, height, ...style }}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          objectFit: 'contain',
          ...style,
        }}
      />
    </div>
  )
}

/**
 * Inline SVG illustration component
 * Use this when you need to customize SVG colors or styles
 */
export function InlineIllustration({ src, alt = 'Illustration', className = '', ...props }) {
  const [svgContent, setSvgContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch SVG content for inline rendering
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        setSvgContent(text)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [src])

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} {...props} />
    )
  }

  if (!svgContent) {
    return null
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  )
}

