import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Domax — AI-Powered Automated Grading Platform for Educators',
  description:
    'Grade papers faster with AI-powered feedback, rubric-based scoring, and in-document annotations. Save 80% of your grading time while delivering consistent, actionable feedback to every student. Trusted by 10,000+ educators worldwide.',
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
    title: 'Domax — AI-Powered Automated Grading Platform',
    description:
      'Grade papers faster with AI-powered feedback. Save 80% of your grading time while delivering consistent, actionable feedback. Trusted by 10,000+ educators worldwide.',
    type: 'website',
    url: 'https://domax.com',
    siteName: 'Domax',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domax — AI-Powered Automated Grading Platform',
    description:
      'Grade papers faster with AI-powered feedback. Save 80% of your grading time while delivering consistent, actionable feedback.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

