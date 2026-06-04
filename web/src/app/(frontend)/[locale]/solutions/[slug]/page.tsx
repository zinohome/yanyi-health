import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import { AbstractCover } from '@/components/brand/abstract-cover'
import { getProduct } from '@/lib/payload'
import { localeHref } from '@/lib/utils'
import type { Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

const scenarioTone: Record<string, 'blue' | 'warm' | 'mix'> = {
  maternal: 'warm',
  perinatal: 'warm',
  youth: 'warm',
  adult: 'mix',
  sports: 'blue',
  elderly: 'warm',
  industry: 'blue',
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const product = await getProduct(slug, locale as Locale)
  if (!product) return {}
  return {
    title: product.meta?.title || product.name,
    description: product.meta?.description || product.summary || undefined,
  }
}

export default async function SolutionDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('solutions')
  const tn = await getTranslations('nav')
  const product = await getProduct(slug, locale as Locale)
  if (!product) notFound()

  const cover = (typeof product.cover === 'object' ? product.cover : null) as Media | null
  const coverTone = (product.scenario && scenarioTone[product.scenario]) || 'mix'
  const features = product.features ?? []
  const audience = (product.audience ?? []) as { value?: string | null; id?: string | null }[]

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="aurora pointer-events-none absolute inset-0 opacity-60" />
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href={localeHref(locale, '/solutions')}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t('backToSolutions')}
          </Link>
          <div className="max-w-2xl">
            <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon name={product.icon} className="size-7" />
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {product.name}
            </h1>
            {product.tagline ? (
              <p className="mt-3 text-lg font-medium text-primary/90">{product.tagline}</p>
            ) : null}
            {product.summary ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.summary}</p>
            ) : null}
          </div>
        </div>
      </section>

      <Section className="py-12">
        <div className="card-glow aspect-[21/9] overflow-hidden rounded-3xl border border-border">
          {cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.url} alt={cover.alt ?? product.name} className="size-full object-cover" />
          ) : (
            <AbstractCover seed={product.slug ?? product.name ?? 'p'} tone={coverTone} />
          )}
        </div>
      </Section>

      {product.problem ? (
        <Section className="py-12">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow text-primary">{t('problem')}</span>
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
              {product.problem}
            </p>
          </div>
        </Section>
      ) : null}

      {audience.length > 0 ? (
        <Section className="py-10">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow text-primary">{t('audience')}</span>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {audience.map((a, i) => (
                <span
                  key={a.id ?? i}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground"
                >
                  {a.value}
                </span>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {features.length > 0 ? (
        <Section className="border-y border-border/50 bg-card/20">
          <span className="eyebrow text-primary">{t('capabilities')}</span>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal
                key={f.id ?? i}
                delay={(i % 2) * 80}
                className="card-glow card-tint rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="text-center">
        <Button asChild size="lg">
          <Link href={localeHref(locale, '/contact')}>{tn('cta')}</Link>
        </Button>
      </Section>
    </>
  )
}
