export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://domax.com'

  const routes = [
    '',
    '/how-it-works',
    '/solutions/universities',
    '/solutions/schools',
    '/solutions/sponsors',
    '/pricing',
    '/data-protection',
    '/about',
    '/pilot',
    '/contact',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.7,
  }))
}
