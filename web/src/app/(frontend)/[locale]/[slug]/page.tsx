import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/components/blocks'
import { getPage } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await getPage(slug, locale as Locale)
  if (!page) return {}
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
  }
}

export default async function CMSPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const page = await getPage(slug, locale as Locale)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} locale={locale} />
}
