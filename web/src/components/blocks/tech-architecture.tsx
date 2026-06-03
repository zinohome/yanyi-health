import type { TechArchitectureBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'

export function TechArchitecture({ block }: { block: T }) {
  const domains = block.domains ?? []
  return (
    <Section className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />
      <div className="relative">
        <SectionHeader eyebrow="TECHNOLOGY FOUNDATION" title={block.title} subtitle={block.subtitle} align="center" />

        <div className="mx-auto mt-14 flex justify-center">
          <Reveal className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-card/70 px-6 py-3 backdrop-blur glow">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Icon name="layers" className="size-4" />
            </span>
            <span className="font-display font-semibold tracking-tight">EvoMetaX · 自研 AI 技术底座</span>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <Reveal
              key={d.id ?? i}
              delay={i * 90}
              className="card-glow group relative rounded-2xl border border-border bg-card/80 p-6 backdrop-blur"
            >
              <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon name={d.icon} className="size-6" />
              </div>
              {d.role ? <div className="eyebrow text-primary/80">{d.role}</div> : null}
              <h3 className="font-display mt-1 text-lg font-semibold">{d.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
            </Reveal>
          ))}
        </div>

        {block.note ? (
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground">{block.note}</p>
        ) : null}
      </div>
    </Section>
  )
}
