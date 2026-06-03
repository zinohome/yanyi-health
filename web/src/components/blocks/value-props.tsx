import type { ValuePropsBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'

export function ValueProps({ block }: { block: T }) {
  const items = block.items ?? []
  return (
    <Section>
      <SectionHeader title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal
            key={it.id ?? i}
            delay={i * 80}
            className="card-glow rounded-2xl border border-border bg-card p-7"
          >
            <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon name={it.icon} className="size-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
