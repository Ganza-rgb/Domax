'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/atoms/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownTimeout = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show navbar
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false)
      }

      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const navItems = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    {
      label: 'Product',
      hasDropdown: true,
      items: [
        {
          title: 'AI Grading',
          description: 'Automate scoring with Domax intelligence.',
          href: '/product/ai-grading',
        },
        {
          title: 'Rubric Builder',
          description: 'Design reusable rubrics in minutes.',
          href: '/product/rubrics',
        },
        {
          title: 'Annotations',
          description: 'Comment, highlight, and suggest inline.',
          href: '/product/annotations',
        },
        {
          title: 'Batch Processing',
          description: 'Grade hundreds of papers simultaneously.',
          href: '/product/batch',
        },
        {
          title: 'Analytics',
          description: 'Track class performance and trends.',
          href: '/product/analytics',
        },
        {
          title: 'LMS Integration',
          description: 'Sync with Canvas, Moodle, and more.',
          href: '/product/integrations',
        },
        {
          title: 'Plagiarism Detection',
          description: 'Ensure academic integrity automatically.',
          href: '/product/plagiarism',
        },
      ],
    },
    {
      label: 'Use Cases',
      hasDropdown: true,
      items: [
        {
          title: 'Solo Teachers',
          description: 'Grade faster with AI rubrics, annotations, and insights.',
          href: '/solutions/teachers',
        },
        {
          title: 'Student Access Codes',
          description: 'Give learners free portals for past papers and assignments.',
          href: '/dashboard/past-papers',
        },
        {
          title: 'Integrations & API',
          description: 'Connect Domax to your LMS or class stack.',
          href: '/solutions/api',
        },
      ],
    },
    {
      label: 'Resources',
      hasDropdown: true,
      items: [
        {
          title: 'Documentation',
          description: 'Everything you need to build on Domax.',
          href: '/docs',
        },
        {
          title: 'Blog',
          description: 'Product updates, guides, and insights.',
          href: '/blog',
        },
        {
          title: 'Case Studies',
          description: 'See how leading teachers use Domax.',
          href: '/case-studies',
        },
        {
          title: 'Help Center',
          description: 'Get answers fast from our support team.',
          href: '/help',
        },
      ],
    },
  ]

  const isDarkMode = !scrolled
  const containerClasses = isDarkMode
    ? 'bg-[#0A3059]/95 text-white border-white/10 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.65)]'
    : 'bg-white/95 text-[#0A3059] border-white shadow-[0_25px_65px_-40px_rgba(10,48,89,0.35)]'
  const desktopLinkBase =
    'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-[15px] font-medium transition-colors flex items-center gap-1'
  const desktopLinkColor = isDarkMode ? 'text-white/85 hover:text-white' : 'text-[#0A3059]/80 hover:text-[#0A3059]'
  const outlineBtnClasses = isDarkMode
    ? 'text-white/90 border border-white/30 hover:border-white/50 hover:bg-white/5'
    : 'text-[#0A3059] border border-[#dfe7f5] hover:border-[#0A3059]/40 hover:bg-[#f5f7fb]'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={`${containerClasses} backdrop-blur-lg rounded-2xl mt-2 sm:mt-3 lg:mt-4 border transition-all duration-300`}
        >
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16 px-2 sm:px-3 lg:px-4">
            {/* Logo */}
            <Link href="/" className="flex items-end -space-x-1">
              <Image
                src="/favicon.svg"
                alt="Domax Logo"
                width={40}
                height={40}
                className="h-8 w-8"
                priority
              />
              <span
                className={`text-lg sm:text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0A3059]'
                  }`}
              >
                OMAX
              </span>
            </Link>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <button className={`${desktopLinkBase} ${desktopLinkColor}`}>
                      {item.label}
                      <svg
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${desktopLinkBase} ${desktopLinkColor}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[min(700px,calc(100vw-3rem))]">
                      <div className="relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-[#e4e8f5] rotate-45 shadow-[0_20px_45px_-20px_rgba(10,48,89,0.35)]"></div>
                        <div className="relative bg-white rounded-3xl border border-[#e4e8f5] shadow-[0_45px_120px_-60px_rgba(10,48,89,0.45)] p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="group rounded-xl p-4 hover:bg-[#f5f7fb] transition-colors"
                              >
                                <p className="text-sm font-semibold text-[#0A3059]">{subItem.title}</p>
                                {subItem.description && (
                                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{subItem.description}</p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <Button href="/login" variant="primary-blue" size="sm">
                Login
              </Button>
              <Button href="/signup" variant="primary-blue" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-[#0A3059] hover:bg-[#f0f7ff]'
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 overflow-y-auto max-h-screen shadow-xl border-b border-gray-100">
            {/* Menu Header with close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/favicon.svg"
                  alt="Domax Logo"
                  width={32}
                  height={32}
                  className="h-6 w-6"
                  priority
                />
                <span className="text-lg font-bold text-[#0A3059]">DOMAX</span>
              </Link>
              <button
                className="p-2 text-[#0A3059]"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-base font-medium text-[#0A3059] cursor-pointer list-none hover:bg-[#f5f7fb] rounded-lg transition-colors">
                        {item.label}
                        <svg className="w-5 h-5 text-[#0A3059]/60 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mt-1 ml-4 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm text-[#0A3059]/80 hover:text-[#0A3059] hover:bg-[#f5f7fb] rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-[#0A3059] hover:bg-[#f5f7fb] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                <Button href="/login" variant="primary-blue" size="md" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Button>
                <Button href="/signup" variant="primary-blue" size="md" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
