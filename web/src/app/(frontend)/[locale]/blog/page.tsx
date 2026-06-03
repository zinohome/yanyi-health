import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { getPosts } from '@/lib/payload'
import { localeHref } from '@/lib/utils'
import type { Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const posts = await getPosts(locale as Locale)

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t('empty')}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => {
              const cover = (typeof p.cover === 'object' ? p.cover : null) as Media | null
              return (
                <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
                  <Link
                    href={localeHref(locale, `/blog/${p.slug}`)}
                    className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      {cover?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover.url}
                          alt={cover.alt ?? p.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="tech-grid size-full opacity-60" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.publishedAt ? (
                        <span className="font-mono text-xs text-muted-foreground">
                          {new Date(p.publishedAt).toLocaleDateString(
                            locale === 'en' ? 'en-US' : 'zh-CN',
                          )}
                        </span>
                      ) : null}
                      <h3 className="font-display mt-2 text-lg font-semibold leading-snug group-hover:text-primary">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {p.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-auto pt-4 text-sm font-medium text-primary">
                        {t('readMore')} →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        )}
      </Section>
    </>
  )
}
