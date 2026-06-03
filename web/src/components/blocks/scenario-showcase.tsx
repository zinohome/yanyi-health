import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ScenarioShowcaseBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'
import { localeHref } from '@/lib/utils'

export function ScenarioShowcase({ block, locale }: { block: T; locale: string }) {
  const items = block.scenarios ?? []
  return (
    <Section>
      <SectionHeader eyebrow="AI SCENARIOS" title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((s, i) => {
          const href = s.link?.href ? localeHref(locale, s.link.href) : null
          const Card = (
            <Reveal
              delay={(i % 2) * 90}
              className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
              />
              <div className="relative flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                {href ? (
                  <ArrowUpRight className="ml-auto size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                ) : null}
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              {s.link?.label ? (
                <span className="relative mt-5 text-sm font-medium text-primary">{s.link.label}</span>
              ) : null}
            </Reveal>
          )
          return href ? (
            <Link key={s.id ?? i} href={href} className="block">
              {Card}
            </Link>
          ) : (
            <div key={s.id ?? i}>{Card}</div>
          )
        })}
      </div>
    </Section>
  )
}
