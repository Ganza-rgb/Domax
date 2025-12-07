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
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <GradientHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8" highlightText="Blog">
              Blog
            </GradientHeading>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Latest news, tips, and insights about AI-powered grading, education technology, and teaching best practices.
            </p>

            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="p-6 bg-[#f0f7ff] rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold text-[#005ffe]">{post.category}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <time className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A3059] mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#005ffe] font-semibold hover:underline inline-flex items-center gap-2">
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



