import type { CaseHighlightsBlock as T, Case } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { getCases } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export async function CaseHighlights({ block, locale }: { block: T; locale: string }) {
  const all = await getCases(locale as Locale)
  const selected = (block.cases ?? []) as (number | Case)[]
  const ids = selected.map((c) => (typeof c === 'object' ? c.id : c))
  const cases = (ids.length ? all.filter((c) => ids.includes(c.id)) : all).slice(0, 6)

  if (cases.length === 0) return null

  return (
    <Section className="border-y border-border/50 bg-card/20">
      <SectionHeader eyebrow="CASES" title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal
            key={c.id}
            delay={(i % 3) * 80}
            className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7"
          >
            {c.client ? <span className="eyebrow text-primary/80">{c.client}</span> : null}
            <h3 className="font-display mt-2 text-lg font-semibold">{c.title}</h3>
            {c.summary ? (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {c.summary}
              </p>
            ) : null}
            {c.metrics && c.metrics.length > 0 ? (
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-6">
                {c.metrics.slice(0, 3).map((m, j) => (
                  <div key={m.id ?? j}>
                    <div className="font-display text-xl font-bold text-gradient">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
