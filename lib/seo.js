/**
 * SEO utility functions for generating structured data and metadata
 */

export function generateStructuredData(type, data) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Domax',
        url: 'https://domax.com',
        logo: 'https://domax.com/logo.png',
        description:
          'Automated student paper correction and review platform for educators',
        sameAs: [
          'https://twitter.com/domax',
          'https://linkedin.com/company/domax',
        ],
        ...data,
      }

    case 'Product':
      return {
        ...baseStructuredData,
        '@type': 'SoftwareApplication',
        name: 'Domax',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '29.00',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '150',
        },
        ...data,
      }

    case 'FAQ':
      return {
        ...baseStructuredData,
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      }

    case 'BlogPosting':
      return {
        ...baseStructuredData,
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || 'Domax Team',
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        ...data,
      }

    default:
      return baseStructuredData
  }
}

export function generateMetadata(pageData) {
  const siteName = 'Domax'
  const defaultDescription =
    'Domax helps classroom teachers automate grading, annotate in-document, and deliver fast, actionable feedback to every student.'

  return {
    title: pageData.title
      ? `${pageData.title} — ${siteName}`
      : `${siteName} — Smart Student Paper Review & Automated Grading`,
    description: pageData.description || defaultDescription,
    keywords: pageData.keywords || [
      'automated grading',
      'paper correction online',
      'essay grading software',
      'automated essay feedback',
      'rubric grading tool',
      'student paper review system',
    ],
    openGraph: {
      title: pageData.title || `${siteName} — Smart Student Paper Review`,
      description: pageData.description || defaultDescription,
      type: pageData.type || 'website',
      url: pageData.url || 'https://domax.com',
      siteName,
      images: [
        {
          url: pageData.image || 'https://domax.com/og-image.png',
          width: 1200,
          height: 630,
          alt: pageData.title || siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title || `${siteName} — Smart Student Paper Review`,
      description: pageData.description || defaultDescription,
      images: [pageData.image || 'https://domax.com/og-image.png'],
    },
    robots: {
      index: pageData.noindex !== true,
      follow: pageData.nofollow !== true,
    },
  }
}



