import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'
import type { Locale } from '@/i18n/routing'

export const getPayloadClient = cache(async () => getPayload({ config }))

type Lang = Locale

export const getPage = cache(async (slug: string, locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
})

export const getProducts = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    sort: 'order',
    depth: 1,
    limit: 50,
  })
  return res.docs
})

export const getProduct = cache(async (slug: string, locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
})

export const getCases = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'cases',
    where: { status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    sort: 'order',
    depth: 1,
    limit: 50,
  })
  return res.docs
})

export const getPartners = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'partners',
    locale,
    fallbackLocale: 'zh',
    sort: 'order',
    depth: 1,
    limit: 100,
  })
  return res.docs
})

export const getTeam = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'team',
    locale,
    fallbackLocale: 'zh',
    sort: 'order',
    depth: 1,
    limit: 100,
  })
  return res.docs
})

export const getPosts = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    sort: '-publishedAt',
    depth: 1,
    limit: 50,
  })
  return res.docs
})

export const getPost = cache(async (slug: string, locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    depth: 2,
    limit: 1,
  })
  return res.docs[0] ?? null
})

export const getJobs = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'jobs',
    where: { status: { equals: 'published' } },
    locale,
    fallbackLocale: 'zh',
    sort: 'order',
    depth: 1,
    limit: 100,
  })
  return res.docs
})

export const getSiteSettings = cache(async (locale: Lang) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'zh', depth: 1 })
})
