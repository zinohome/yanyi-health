import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { ProductCard } from '@/components/product-card'
import { getProducts } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export const dynamic = 'force-dynamic'

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('solutions')
  const products = await getProducts(locale as Locale)

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
              <ProductCard product={p} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
