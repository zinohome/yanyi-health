import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/payload-types'
import { Icon } from '@/lib/icons'
import { localeHref } from '@/lib/utils'

const scenarioLabel: Record<string, { zh: string; en: string }> = {
  health: { zh: '健康康养', en: 'Health' },
  insurance: { zh: '保险', en: 'Insurance' },
  education: { zh: '校园心理', en: 'Education' },
  industry: { zh: '工业', en: 'Industry' },
  platform: { zh: '技术底座', en: 'Platform' },
}

export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const tag = product.scenario ? scenarioLabel[product.scenario] : null
  return (
    <Link
      href={localeHref(locale, `/products/${product.slug}`)}
      className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon name={product.icon} className="size-6" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="font-display mt-5 text-xl font-semibold">{product.name}</h3>
      {product.tagline ? (
        <p className="mt-1.5 text-sm font-medium text-primary/90">{product.tagline}</p>
      ) : null}
      {product.summary ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.summary}
        </p>
      ) : null}
      {tag ? (
        <span className="eyebrow mt-auto pt-5 text-muted-foreground">
          {locale === 'en' ? tag.en : tag.zh}
        </span>
      ) : null}
    </Link>
  )
}
