import type { ProductMatrixBlock as T, Product } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { ProductCard } from '@/components/product-card'
import { getProducts } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export async function ProductMatrix({ block, locale }: { block: T; locale: string }) {
  const all = await getProducts(locale as Locale)
  const selected = (block.products ?? []) as (number | Product)[]
  const ids = selected.map((p) => (typeof p === 'object' ? p.id : p))
  const products = ids.length ? all.filter((p) => ids.includes(p.id)) : all

  return (
    <Section>
      <SectionHeader eyebrow="PRODUCTS" title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
            <ProductCard product={p} locale={locale} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
