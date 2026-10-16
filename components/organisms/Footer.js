'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { href: '/product/ai-grading', label: 'AI Grading' },
        { href: '/product/rubrics', label: 'Rubric Builder' },
        { href: '/product/annotations', label: 'Annotations' },
        { href: '/product/batch', label: 'Batch Processing' },
        { href: '/product/analytics', label: 'Analytics' },
        { href: '/product/integrations', label: 'LMS Integration' },
        { href: '/product/plagiarism', label: 'Plagiarism Detection' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { href: '/solutions/teachers', label: 'For Teachers' },
        { href: '/solutions/schools', label: 'For Schools' },
        { href: '/solutions/universities', label: 'For Universities' },
        { href: '/solutions/api', label: 'API & Integrations' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '/docs', label: 'Documentation' },
        { href: '/blog', label: 'Blog' },
        { href: '/case-studies', label: 'Case Studies' },
        { href: '/help', label: 'Help Center' },
        { href: '/status', label: 'Status' },
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/careers', label: 'Careers' },
        { href: '/contact', label: 'Contact' },
        { href: '/partners', label: 'Partners' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookie-policy', label: 'Cookie Policy' },
        { href: '/gdpr', label: 'GDPR' },
      ]
    },
  ]

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/domax',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/domax',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/domax',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
  ]

  return (
    <footer className="bg-[#F6F8FA] text-[#0A3059] border-t border-[#E3E8EF]">
      <div className="container-custom py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_repeat(5,1fr)] gap-x-8 gap-y-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-end -space-x-1 mb-4" aria-label="Domax home">
              <Image
                src="/favicon.svg"
                alt=""
                width={40}
                height={40}
                className="h-7 w-7"
              />
              <span
                className={`text-lg font-bold tracking-tight text-[#0A3059]`}
              >
                OMAX
              </span>
            </Link>
            <p className="text-sm text-[#4A5D75] mb-6 leading-relaxed max-w-xs">
              The AI-powered grading platform that saves educators time while delivering personalized, actionable feedback to students.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-[#4A5D75] hover:bg-[#0A3059] hover:text-white transition-all duration-300 border border-[#E3E8EF]"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Columns */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-[13px] font-semibold text-[#0A3059] mb-3.5 font-body tracking-normal">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-[#4A5D75] hover:text-[#005ffe] transition-all duration-300"
                    >
                      <span>{link.label}</span>
                      <svg
                        className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E3E8EF]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[#5B6B82]">
              © {currentYear} Domax, Inc. All rights reserved.
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/status"
                className="group flex items-center gap-1.5 text-[#5B6B82] hover:text-[#005ffe] transition-all duration-300"
              >
                <span>Status</span>
                <svg
                  className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/support"
                className="group flex items-center gap-1.5 text-[#5B6B82] hover:text-[#005ffe] transition-all duration-300"
              >
                <span>Support</span>
                <svg
                  className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
