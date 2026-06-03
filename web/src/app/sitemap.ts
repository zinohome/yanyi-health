import type { MetadataRoute } from 'next'
import { getProducts, getPosts } from '@/lib/payload'
import { SITE_URL, LOCALES } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/technology', '/products', '/about', '/blog', '/careers', '/contact']

  const products = await getProducts('zh')
  const posts = await getPosts('zh')

  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const p of staticPaths) {
      entries.push({ url: `${SITE_URL}/${locale}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })
    }
    for (const pr of products) {
      entries.push({ url: `${SITE_URL}/${locale}/products/${pr.slug}`, changeFrequency: 'monthly', priority: 0.6 })
    }
    for (const po of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${po.slug}`,
        lastModified: po.publishedAt ? new Date(po.publishedAt) : undefined,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return entries
}
