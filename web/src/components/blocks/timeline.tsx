import type { TimelineBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'

export function Timeline({ block }: { block: T }) {
  const milestones = block.milestones ?? []
  return (
    <Section>
      <SectionHeader eyebrow="ROADMAP" title={block.title} subtitle={block.subtitle} />
      <div className="relative mt-14 pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
        <div className="flex flex-col gap-10">
          {milestones.map((m, i) => (
            <Reveal key={m.id ?? i} delay={i * 80} className="relative">
              <span className="absolute -left-8 top-1.5 grid size-4 place-items-center rounded-full border-2 border-primary bg-background">
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              {m.period ? (
                <span className="font-mono text-sm font-medium text-primary">{m.period}</span>
              ) : null}
              <h3 className="font-display mt-1 text-lg font-semibold">{m.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {m.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
