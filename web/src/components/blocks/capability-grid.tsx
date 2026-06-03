import type { CapabilityGridBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'

export function CapabilityGrid({ block }: { block: T }) {
  const caps = block.capabilities ?? []
  return (
    <Section className="border-y border-border/50 bg-card/20">
      <SectionHeader eyebrow="CAPABILITIES" title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {caps.map((c, i) => (
          <Reveal
            key={c.id ?? i}
            delay={(i % 3) * 80}
            className="group relative bg-background p-7 transition-colors hover:bg-card"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon name={c.icon} className="size-5" />
              </span>
              <h3 className="font-display text-base font-semibold">{c.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
