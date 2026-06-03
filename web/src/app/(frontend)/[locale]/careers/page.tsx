import Link from 'next/link'
import { MapPin, Briefcase } from 'lucide-react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { getJobs, getSiteSettings } from '@/lib/payload'
import { localeHref } from '@/lib/utils'
import type { Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

const deptLabel: Record<string, { zh: string; en: string }> = {
  engineering: { zh: '研发', en: 'Engineering' },
  ai: { zh: '算法', en: 'AI' },
  product: { zh: '产品', en: 'Product' },
  design: { zh: '设计', en: 'Design' },
  business: { zh: '商务', en: 'Business' },
  operations: { zh: '运营', en: 'Operations' },
}
const typeLabel: Record<string, { zh: string; en: string }> = {
  fulltime: { zh: '全职', en: 'Full-time' },
  intern: { zh: '实习', en: 'Internship' },
  parttime: { zh: '兼职', en: 'Part-time' },
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('careers')
  const jobs = await getJobs(locale as Locale)
  const settings = await getSiteSettings(locale as Locale)
  const en = locale === 'en'

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section>
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">{t('empty')}</p>
            {settings?.email ? (
              <Button asChild className="mt-6">
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {jobs.map((j, i) => (
              <Reveal key={j.id} delay={i * 60}>
                <details className="group rounded-2xl border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{j.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {j.department ? (
                          <span className="inline-flex items-center gap-1">
                            <Briefcase className="size-3.5" />
                            {en ? deptLabel[j.department]?.en : deptLabel[j.department]?.zh}
                          </span>
                        ) : null}
                        {j.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            {j.location}
                          </span>
                        ) : null}
                        {j.type ? (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                            {en ? typeLabel[j.type]?.en : typeLabel[j.type]?.zh}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">+</span>
                  </summary>
                  {j.description ? (
                    <div className="prose-tech mt-5 border-t border-border pt-5 text-sm">
                      <LexicalRichText data={j.description as never} />
                    </div>
                  ) : null}
                  <Button asChild size="sm" className="mt-5">
                    <Link href={localeHref(locale, '/contact')}>{t('apply')}</Link>
                  </Button>
                </details>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
