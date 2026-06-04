import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product, Media } from '@/payload-types'
import { Icon } from '@/lib/icons'
import { AbstractCover } from '@/components/brand/abstract-cover'
import { localeHref } from '@/lib/utils'

const scenarioLabel: Record<string, { zh: string; en: string }> = {
  maternal: { zh: '母婴安全', en: 'Maternal & Child' },
  perinatal: { zh: '围产期心理', en: 'Perinatal Mental Health' },
  youth: { zh: '儿童青少年心理', en: 'Youth Mental Health' },
  adult: { zh: '成人身心健康', en: 'Adult Wellness' },
  sports: { zh: '运动与营养代谢', en: 'Sports & Nutrition' },
  elderly: { zh: '老年照护与慢病', en: 'Elderly & Chronic Care' },
  industry: { zh: '产业拓展', en: 'Industry' },
}

const scenarioTone: Record<string, 'blue' | 'warm' | 'mix'> = {
  maternal: 'warm',
  perinatal: 'warm',
  youth: 'warm',
  adult: 'mix',
  sports: 'blue',
  elderly: 'warm',
  industry: 'blue',
}

export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const tag = product.scenario ? scenarioLabel[product.scenario] : null
  const tone = (product.scenario && scenarioTone[product.scenario]) || 'mix'
  const cover = (typeof product.cover === 'object' ? product.cover : null) as Media | null

  return (
    <Link
      href={localeHref(locale, `/solutions/${product.slug}`)}
      className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* 封面：上传图优先，否则品牌抽象图 */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {cover?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.url}
            alt={cover.alt ?? product.name}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <AbstractCover seed={product.slug ?? product.name ?? 'p'} tone={tone} className="transition-transform duration-700 group-hover:scale-105" />
        )}
        {/* 品牌冷暖叠色（统一风格、增温） */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
          style={{ background: 'linear-gradient(130deg, var(--primary), transparent 55%, var(--accent))' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl border border-border/60 bg-background/80 text-primary backdrop-blur">
          <Icon name={product.icon} className="size-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{product.name}</h3>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
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
      </div>
    </Link>
  )
}
