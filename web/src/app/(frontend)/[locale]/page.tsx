import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { RenderBlocks } from '@/components/blocks'
import { getPage } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = await getPage('home', locale as Locale)
  if (page) {
    return <RenderBlocks blocks={page.layout} locale={locale} />
  }

  // 内容未填充时的占位首屏（seed 后会被 CMS 区块替换）
  const t = await getTranslations('home')
  return (
    <section className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
        <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight text-gradient sm:text-6xl">
          {t('heroTitle')}
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">{t('heroSubtitle')}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/${locale}/contact`}>{t('ctaPrimary')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${locale}/technology`}>{t('ctaSecondary')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
