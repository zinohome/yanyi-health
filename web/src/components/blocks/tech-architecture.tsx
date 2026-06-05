import type { TechArchitectureBlock as T } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/lib/icons'
import { PlatformArchitecture } from '@/components/brand/platform-architecture'
import { DomainArchitecture } from '@/components/brand/domain-architecture'

type Kind = 'brain' | 'cerebellum' | 'voice' | 'memory'
const KIND_BY_ICON: Record<string, Kind> = {
  brain: 'brain',
  wrench: 'cerebellum',
  mic: 'voice',
  database: 'memory',
}
// 小脑、嘴耳用暖色，大脑、记忆用蓝色（冷暖交替）
const ACCENT: Record<Kind, boolean> = { brain: false, cerebellum: true, voice: true, memory: false }

export function TechArchitecture({ block, locale }: { block: T; locale: string }) {
  const domains = block.domains ?? []
  return (
    <Section className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />
      <div className="relative">
        <SectionHeader eyebrow="TECHNOLOGY FOUNDATION" title={block.title} subtitle={block.subtitle} align="center" />

        {/* 分层平台架构图（移动端保持最小宽度，横向滑动查看） */}
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="card-glow rounded-3xl border border-border bg-card/40 p-4 backdrop-blur sm:p-8">
            <PlatformArchitecture locale={locale} />
          </div>
        </Reveal>

        {/* 四域详解 —— 每个域配一张架构图 */}
        <div className="mx-auto mt-20 flex max-w-5xl flex-col gap-8">
          {domains.map((d, i) => {
            const kind = (d.icon && KIND_BY_ICON[d.icon]) || 'brain'
            const accent = ACCENT[kind]
            return (
              <Reveal
                key={d.id ?? i}
                delay={(i % 2) * 80}
                className="card-glow card-tint rounded-3xl border border-border bg-card/70 p-6 backdrop-blur sm:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                  {/* 左：能力说明 */}
                  <div className="lg:w-[38%] lg:shrink-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-12 place-items-center rounded-xl"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${accent ? 'var(--accent)' : 'var(--primary)'} 12%, transparent)`,
                          color: accent ? 'var(--accent)' : 'var(--primary)',
                        }}
                      >
                        <Icon name={d.icon} className="size-6" />
                      </span>
                      <div>
                        {d.role ? (
                          <div
                            className="eyebrow"
                            style={{ color: accent ? 'var(--accent)' : 'var(--primary)' }}
                          >
                            {d.role}
                          </div>
                        ) : null}
                        <h3 className="font-display text-xl font-semibold">{d.name}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  </div>

                  {/* 右：该域架构图（移动端纵向步骤流，桌面横向 SVG） */}
                  <div className="min-w-0 flex-1 rounded-2xl border border-border/70 bg-background/40 p-4 sm:p-5">
                    <DomainArchitecture kind={kind} locale={locale} accent={accent} />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {block.note ? (
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground">{block.note}</p>
        ) : null}
      </div>
    </Section>
  )
}
