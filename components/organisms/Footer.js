import Link from 'next/link'
import Image from 'next/image'
import { CONTACT_EMAIL } from '@/lib/site'

const footerSections = [
  {
    title: 'Domax',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/data-protection', label: 'Student data' },
      { href: '/about', label: 'About' },
    ],
  },
  {
    title: 'Who it’s for',
    links: [
      { href: '/solutions/universities', label: 'Universities & polytechnics' },
      { href: '/solutions/schools', label: 'Secondary schools' },
      { href: '/solutions/sponsors', label: 'Sponsors & districts' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { href: '/pilot', label: 'Request a pilot' },
      { href: '/contact', label: 'Contact' },
      { href: '/login', label: 'Log in' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
      { href: '/cookie-policy', label: 'Cookie policy' },
      { href: '/acceptable-use', label: 'Acceptable use' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F6F8FA] text-[#0A3059] border-t border-[#E3E8EF]">
      <div className="container-custom py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-end -space-x-1 mb-4" aria-label="Domax home">
              <Image src="/favicon.svg" alt="" width={40} height={40} className="h-7 w-7" />
              <span className="text-lg font-bold tracking-tight text-[#0A3059]">OMAX</span>
            </Link>
            <p className="text-sm text-[#4A5D75] leading-relaxed max-w-xs">
              Marking help for teachers in Rwanda. Domax does the first read of every script; teachers
              decide the marks.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block mt-4 text-sm text-[#4A5D75] hover:text-[#005ffe]">
              {CONTACT_EMAIL}
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[13px] font-semibold text-[#0A3059] mb-3.5">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#4A5D75] hover:text-[#005ffe] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#E3E8EF] text-sm text-[#5B6B82]">
          © {currentYear} Domax
        </div>
      </div>
    </footer>
  )
}
