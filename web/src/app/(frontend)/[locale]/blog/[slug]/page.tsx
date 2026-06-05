import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Section } from '@/components/section'
import { getPost } from '@/lib/payload'
import { localeHref } from '@/lib/utils'
import type { Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale as Locale)
  if (!post) return {}
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || undefined,
  }
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const post = await getPost(slug, locale as Locale)
  if (!post) notFound()

  const cover = (typeof post.cover === 'object' ? post.cover : null) as Media | null

  return (
    <article>
      <Section className="py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href={localeHref(locale, '/blog')}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t('backToBlog')}
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            {post.publishedAt ? (
              <span>
                {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-CN')}
              </span>
            ) : null}
            {post.author ? <span>· {post.author}</span> : null}
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </Section>

      {cover?.url ? (
        <Section className="py-0">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={cover.url} alt={cover.alt ?? post.title} className="w-full object-cover" />
          </div>
        </Section>
      ) : null}

      <Section className="py-12">
        <div className="prose-tech mx-auto max-w-3xl">
          {post.content ? <LexicalRichText data={post.content as never} /> : null}
        </div>
      </Section>
    </article>
  )
}
