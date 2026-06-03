import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import { getProduct } from '@/lib/payload'
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
  const product = await getProduct(slug, locale as Locale)
  if (!product) return {}
  return {
    title: product.meta?.title || product.name,
    description: product.meta?.description || product.summary || undefined,
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tn = await getTranslations('nav')
  const product = await getProduct(slug, locale as Locale)
  if (!product) notFound()

  const cover = (typeof product.cover === 'object' ? product.cover : null) as Media | null
  const features = product.features ?? []

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/3 size-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 62%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href={localeHref(locale, '/products')}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t('backToProducts')}
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {product.summary}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {cover?.url ? (
        <Section className="py-12">
          <div className="card-glow overflow-hidden rounded-3xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover.url} alt={cover.alt ?? product.name} className="w-full object-cover" />
          </div>
        </Section>
      ) : null}

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

      {features.length > 0 ? (
        <Section className="border-y border-border/50 bg-card/20">
          <span className="eyebrow text-primary">{t('capabilities')}</span>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal
                key={f.id ?? i}
                delay={(i % 2) * 80}
                className="card-glow rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {product.audience ? (
        <Section className="py-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
            <span className="eyebrow text-primary">{t('audience')}</span>
            <p className="mt-3 text-base text-muted-foreground">{product.audience}</p>
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
