import './globals.css'
import { Inter, Fraunces, Caveat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

// Headings: a serif with some character, so the site doesn't read as one
// more Inter/Poppins SaaS template.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Only used for the teacher's pen marks on the sample script.
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata = {
  title: 'Domax — marking help for teachers',
  description:
    'Upload your students\' scripts and marking scheme. Domax suggests a mark and a comment for every answer, and you review them before anything reaches a student.',
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
    title: 'Domax — marking help for teachers',
    description:
      'Domax marks a first pass of your students\' scripts against your scheme. You check it, change what you disagree with, and release.',
    type: 'website',
    url: 'https://domax.com',
    siteName: 'Domax',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domax — marking help for teachers',
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

