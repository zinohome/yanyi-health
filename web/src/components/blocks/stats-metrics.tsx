import type { StatsMetricsBlock as T } from '@/payload-types'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'

export function StatsMetrics({ block }: { block: T }) {
  const stats = block.stats ?? []
  return (
    <Section className="py-16">
      {block.title ? (
        <Reveal
          as="h2"
          className="font-display mb-10 text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {block.title}
        </Reveal>
      ) : null}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.id ?? i}
            delay={i * 80}
            className="bg-background p-8 text-center"
          >
            <div className="font-display text-3xl font-bold text-gradient-warm sm:text-4xl">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
