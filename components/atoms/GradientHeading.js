/**
 * Page/section heading.
 *
 * The name is kept for compatibility with existing callers. It used to
 * colour the last word (or `highlightText`) in brand blue; every heading on
 * the site doing that was one of the clearest "generated template" signals,
 * so headings now render as plain text. `highlightText` and `highlightAll`
 * are still accepted and ignored so callers don't need to change.
 *
 * @param {React.ReactNode} children - The heading text
 * @param {string} as - HTML tag to render (h1, h2, h3, h4, h5, h6)
 * @param {string} className - Additional CSS classes
 */
export default function GradientHeading({
  children,
  as: Component = 'h1',
  className = '',
  highlightText: _highlightText,
  highlightAll: _highlightAll,
  ...props
}) {
  return (
    <Component className={`text-[#0A3059] ${className}`} {...props}>
      {children}
    </Component>
  )
}
