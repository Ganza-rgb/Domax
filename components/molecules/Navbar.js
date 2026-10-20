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
    { label: 'How it works', href: '/how-it-works' },
    {
      label: 'Who it’s for',
      hasDropdown: true,
      items: [
        {
          title: 'Universities & polytechnics',
          description: 'Long scripts, large cohorts. Where pilots start.',
          href: '/solutions/universities',
        },
        {
          title: 'Secondary schools',
          description: 'O-Level and A-Level assessments.',
          href: '/solutions/schools',
        },
        {
          title: 'Sponsors & districts',
          description: 'Fund marking for public schools.',
          href: '/solutions/sponsors',
        },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Student data', href: '/data-protection' },
    { label: 'About', href: '/about' },
  ]

  // A plain bar: white, with a hairline that only appears once content
  // scrolls underneath it.
  const containerClasses = scrolled ? 'border-[#E3E8EF]' : 'border-transparent'
  const desktopLinkBase =
    'h-9 px-3 text-[15px] transition-colors flex items-center gap-1'
  const desktopLinkColor = 'text-[#4A5D75] hover:text-[#0A3059]'

  const toggleDropdown = (label) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current)
    }
    setActiveDropdown((current) => (current === label ? null : label))
  }

  // Close an open menu with Escape, or when keyboard focus leaves it.
  const handleDropdownKeyDown = (event) => {
    if (event.key === 'Escape') {
      setActiveDropdown(null)
    }
  }
  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveDropdown(null)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      aria-label="Main"
    >
      <div className={`bg-white border-b transition-colors ${containerClasses}`}>
        <div className="container-custom text-[#0A3059]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-end -space-x-1 rounded-md" aria-label="Domax home">
              <Image
                src="/favicon.svg"
                alt=""
                width={40}
                height={40}
                className="h-7 w-7"
                priority
              />
              <span className="text-lg font-bold tracking-tight text-[#0A3059]">
                OMAX
              </span>
            </Link>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                  onKeyDown={item.hasDropdown ? handleDropdownKeyDown : undefined}
                  onBlur={item.hasDropdown ? handleDropdownBlur : undefined}
                >
                  {item.hasDropdown ? (
                    <button
                      type="button"
                      className={`${desktopLinkBase} ${desktopLinkColor} ${activeDropdown === item.label ? 'text-[#0A3059]' : ''}`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 ${
                        item.items.length > 4 ? 'w-[min(640px,calc(100vw-3rem))]' : 'w-[340px]'
                      }`}
                    >
                      <div className="bg-white rounded-lg border border-[#E3E8EF] shadow-pop p-2">
                        <div className={`grid gap-0.5 ${item.items.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="group rounded-md px-3.5 py-3 hover:bg-[#F6F8FA] transition-colors"
                            >
                              <p className="text-sm font-semibold text-[#0A3059]">{subItem.title}</p>
                              {subItem.description && (
                                <p className="text-[13px] text-[#5B6B82] mt-0.5 leading-snug">{subItem.description}</p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                href="/login"
                className="h-9 px-3 inline-flex items-center text-[15px] text-[#0A3059] hover:text-[#005ffe] transition-colors"
              >
                Log in
              </Link>
              <Button href="/pilot" variant="primary" size="sm">
                Request a pilot
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-1 rounded-lg transition-colors text-[#0A3059] hover:bg-[#F6F8FA]"
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
          <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 overflow-y-auto max-h-screen shadow-pop border-b border-[#E3E8EF]">
            {/* Menu Header with close button */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-[#E3E8EF]">
              <Link href="/" className="flex items-end -space-x-1" aria-label="Domax home" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/favicon.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="h-7 w-7"
                  priority
                />
                <span className="text-lg font-bold tracking-tight text-[#0A3059]">OMAX</span>
              </Link>
              <button
                className="p-2 -mr-1 rounded-lg text-[#0A3059] hover:bg-[#F6F8FA]"
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
            <div className="px-3 py-3 space-y-0.5">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 text-base font-medium text-[#0A3059] cursor-pointer list-none hover:bg-[#F6F8FA] rounded-lg transition-colors">
                        {item.label}
                        <svg className="w-5 h-5 text-[#0A3059]/60 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mb-2 ml-3 pl-3 border-l border-[#E3E8EF] space-y-0.5">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-3 py-2.5 text-[15px] text-[#4A5D75] hover:text-[#0A3059] hover:bg-[#F6F8FA] rounded-lg transition-colors"
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
                      className="block px-3 py-3 text-base font-medium text-[#0A3059] hover:bg-[#F6F8FA] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 mt-4 border-t border-[#E3E8EF] grid grid-cols-2 gap-2">
                <Button href="/login" variant="secondary" size="lg" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Button>
                <Button href="/pilot" variant="primary" size="lg" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Request a pilot
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
