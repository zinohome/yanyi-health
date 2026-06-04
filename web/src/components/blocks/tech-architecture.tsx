import type { TechArchitectureBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'
import { PlatformArchitecture } from '@/components/brand/platform-architecture'
import { FourDomainDiagram } from '@/components/brand/four-domain-diagram'

export function TechArchitecture({ block, locale }: { block: T; locale: string }) {
  const domains = block.domains ?? []
  const coreLabel = locale === 'en' ? 'Core Engine' : '核心引擎'
  return (
    <Section className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />
      <div className="relative">
        <SectionHeader eyebrow="TECHNOLOGY FOUNDATION" title={block.title} subtitle={block.subtitle} align="center" />

        {/* 分层平台架构图 */}
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="card-glow rounded-3xl border border-border bg-card/40 p-4 backdrop-blur sm:p-8">
            <PlatformArchitecture locale={locale} />
          </div>
        </Reveal>

        {/* 四域协同简图 */}
        <Reveal delay={60} className="mx-auto mt-20 max-w-4xl">
          <div className="mb-4 text-center">
            <span className="eyebrow text-primary">{locale === 'en' ? 'FOUR DOMAINS' : '四域协同'}</span>
          </div>
          <div className="card-glow rounded-3xl border border-border bg-card/40 p-4 backdrop-blur sm:p-8">
            <FourDomainDiagram domains={domains} centerLabel={coreLabel} />
          </div>
        </Reveal>

        {/* 四域详解卡片 */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <Reveal
              key={d.id ?? i}
              delay={i * 90}
              className="card-glow card-tint group relative rounded-2xl border border-border bg-card/80 p-6 backdrop-blur"
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
