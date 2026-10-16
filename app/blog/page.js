import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/organisms/Footer'
import GradientHeading from '@/components/atoms/GradientHeading'
import Link from 'next/link'

export const metadata = {
  title: 'Blog — Domax',
  description: 'Latest news, tips, and insights about AI-powered grading, education technology, and teaching best practices.',
}

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'How AI Grading Saves Teachers 10+ Hours Per Week',
      excerpt: 'Learn how educators are using AI-powered grading to reclaim their evenings and weekends while providing better feedback to students.',
      date: '2024-01-15',
      category: 'Teaching Tips',
    },
    {
      title: 'Building Effective Rubrics: A Complete Guide',
      excerpt: 'Discover best practices for creating rubrics that ensure fair, consistent grading and help students understand expectations.',
      date: '2024-01-10',
      category: 'Best Practices',
    },
    {
      title: 'The Future of Automated Grading in Higher Education',
      excerpt: 'Exploring how AI grading technology is transforming the way teacher collectives handle large-scale assessment and feedback.',
      date: '2024-01-05',
      category: 'Education Technology',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-5">
              Blog
            </h1>
            <p className="lede mb-12 pb-12 border-b border-line">
              Latest news, tips, and insights about AI-powered grading, education technology, and teaching best practices.
            </p>

            <div className="divide-y divide-line">
              {blogPosts.map((post, index) => (
                <article key={index} className="py-8 first:pt-0 transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[13px] font-semibold text-accent">{post.category}</span>
                    <span className="text-sm text-ink-3" aria-hidden="true">•</span>
                    <time className="text-[13px] text-ink-3" dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <h2 className="text-[1.5rem] leading-snug font-medium text-ink mb-2">{post.title}</h2>
                  <p className="text-ink-2 leading-relaxed mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-accent text-sm font-semibold hover:text-accent-strong inline-flex items-center gap-1">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}



