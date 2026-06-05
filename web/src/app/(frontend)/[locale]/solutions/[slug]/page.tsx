import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  const painPoints = (product.painPoints ?? []) as { value?: string | null; id?: string | null }[]
  const workflow = (product.workflow ?? []) as { title?: string | null; description?: string | null; id?: string | null }[]
  const highlights = (product.highlights ?? []) as { title?: string | null; description?: string | null; id?: string | null }[]

  return (
    <>
      {/* Hero —— 与 PageHero 视觉统一：tech-grid + 单个柔光球 + 渐变标题 */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/3 size-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 62%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Link
            href={localeHref(locale, '/solutions')}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {t('backToSolutions')}
          </Link>
          <div className="max-w-3xl">
            <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon name={product.icon} className="size-7" />
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-balance text-gradient sm:text-5xl">
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

      {/* 封面 + 概述 */}
      <Section className="py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="card-glow relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
            {cover?.url ? (
              <Image
                fill
                src={cover.url}
                alt={cover.alt ?? product.name}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            ) : (
              <AbstractCover seed={product.slug ?? 'p'} tone={coverTone} />
            )}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
              style={{ background: 'linear-gradient(130deg, var(--primary), transparent 55%, var(--accent))' }}
            />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow text-primary">{locale === 'en' ? 'OVERVIEW' : '方案概述'}</span>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              {product.overview || product.summary}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 挑战 / 痛点 */}
      {product.problem || painPoints.length > 0 ? (
        <Section className="border-y border-border/50 bg-card/20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow text-primary">{locale === 'en' ? 'CHALLENGES' : '挑战'}</span>
              {product.problem ? (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{product.problem}</p>
              ) : null}
            </div>
            {painPoints.length > 0 ? (
              <div className="flex flex-col gap-3">
                {painPoints.map((p, i) => (
                  <Reveal
                    key={p.id ?? i}
                    delay={i * 60}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-sm text-foreground/90">{p.value}</span>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* 方案闭环 */}
      {workflow.length > 0 ? (
        <Section>
          <span className="eyebrow text-primary">{locale === 'en' ? 'HOW IT WORKS' : '方案闭环'}</span>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map((w, i) => (
              <Reveal key={w.id ?? i} delay={i * 70} className="relative">
                <div className="card-glow card-tint flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                  <span className="font-mono text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display mt-2 text-base font-semibold">{w.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{w.description}</p>
                </div>
                {i < workflow.length - 1 ? (
                  <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-primary/50 lg:block">
                    →
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 核心功能 */}
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

      {/* 价值 / 成效 */}
      {highlights.length > 0 ? (
        <Section>
          <span className="eyebrow text-primary">{locale === 'en' ? 'VALUE' : '价值与成效'}</span>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal
                key={h.id ?? i}
                delay={i * 80}
                className="rounded-2xl border border-border bg-card p-7 text-center"
              >
                <h3 className="font-display text-lg font-semibold text-gradient-warm">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.description}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 适用对象 */}
      {audience.length > 0 ? (
        <Section className="border-t border-border/50">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-primary">{t('audience')}</span>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
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

      <Section className="text-center">
        <Button asChild size="lg">
          <Link href={localeHref(locale, '/contact')}>{tn('cta')}</Link>
        </Button>
      </Section>
    </>
  )
}
