'use client'

/**
 * Display heading with an emphasised phrase.
 *
 * The name is kept for compatibility with existing callers. The emphasis used
 * to be a teal gradient with a hand-drawn underline; teal text measures
 * ~2:1 on white, so the phrase is now set in the brand blue instead.
 *
 * @param {string} children - The heading text (can include JSX)
 * @param {string} as - HTML tag to render (h1, h2, h3, h4, h5, h6)
 * @param {string} className - Additional CSS classes
 * @param {string} highlightText - Phrase to emphasise (defaults to the last word)
 * @param {boolean} highlightAll - Emphasise the whole heading
 */
export default function GradientHeading({
  children,
  as: Component = 'h1',
  className = '',
  highlightText = null,
  highlightAll = false,
  ...props
}) {
  const renderContent = () => {
    if (typeof children !== 'string') {
      return children
    }

    const text = children

    if (highlightAll) {
      return <Emphasis>{text}</Emphasis>
    }

    if (highlightText) {
      const parts = text.split(highlightText)
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <Emphasis>{highlightText}</Emphasis>
            {parts[1]}
          </>
        )
      }
    }

    // Default: emphasise the last word
    const words = text.split(' ')
    const lastWord = words.pop()
    const restOfText = words.join(' ')

    return (
      <>
        {restOfText && `${restOfText} `}
        <Emphasis>{lastWord}</Emphasis>
      </>
    )
  }

  return (
    <Component
      className={`font-semibold text-[#0A3059] leading-[1.1] tracking-[-0.025em] ${className}`}
      {...props}
    >
      {renderContent()}
    </Component>
  )
}

function Emphasis({ children }) {
  return <span className="text-[#005ffe]">{children}</span>
}
