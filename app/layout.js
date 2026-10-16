import './globals.css'
import { Inter, Bricolage_Grotesque, Caveat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

// Display face for headings: a grotesque with some warmth in its curves.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Only used for students' handwriting inside the script illustrations.
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata = {
  title: 'Domax — marking help for teachers in Rwanda',
  description:
    'Photograph your students\' handwritten scripts. Domax checks every page, suggests a mark for each answer against your marking scheme, and you sign off every mark before it reaches a student.',
  keywords: [
    'automated grading',
    'AI grading software',
    'paper correction online',
    'essay grading software',
    'automated essay feedback',
    'rubric grading tool',
    'student paper review system',
    'batch grading',
    'LMS integration',
    'plagiarism detection',
    'education technology',
    'grading automation',
  ],
  authors: [{ name: 'Domax' }],
  openGraph: {
    title: 'Domax — marking help for teachers in Rwanda',
    description:
      'Domax marks a first pass of your students\' scripts against your scheme. You check it, change what you disagree with, and release.',
    type: 'website',
    url: 'https://domax.com',
    siteName: 'Domax',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domax — marking help for teachers in Rwanda',
    description:
      'Domax marks a first pass of your students\' scripts against your scheme. You check it, change what you disagree with, and release.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${caveat.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

