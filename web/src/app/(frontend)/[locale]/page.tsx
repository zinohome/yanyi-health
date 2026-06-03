import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const base = `/${locale}`

  return (
    <section className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          AI + HI · 自研技术底座
        </span>
        <h1 className="max-w-4xl bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          {t('heroTitle')}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t('heroSubtitle')}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`${base}/contact`}>{t('ctaPrimary')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`${base}/technology`}>{t('ctaSecondary')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
