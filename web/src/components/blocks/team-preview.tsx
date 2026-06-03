import type { TeamPreviewBlock as T, Team as TeamMember, Media } from '@/payload-types'
import { Section, SectionHeader } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { getTeam } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export async function TeamPreview({ block, locale }: { block: T; locale: string }) {
  const all = await getTeam(locale as Locale)
  const selected = (block.members ?? []) as (number | TeamMember)[]
  const ids = selected.map((m) => (typeof m === 'object' ? m.id : m))
  const members = ids.length ? all.filter((m) => ids.includes(m.id)) : all

  if (members.length === 0) return null

  return (
    <Section>
      <SectionHeader eyebrow="TEAM" title={block.title} subtitle={block.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m, i) => {
          const photo = (typeof m.photo === 'object' ? m.photo : null) as Media | null
          return (
            <Reveal
              key={m.id}
              delay={(i % 4) * 70}
              className="card-glow rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-4 size-20 overflow-hidden rounded-full border border-border bg-primary/10">
                {photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt={m.name ?? ''} className="size-full object-cover" />
                ) : (
                  <div className="tech-grid size-full" />
                )}
              </div>
              <h3 className="font-display font-semibold">{m.name}</h3>
              {m.role ? <p className="mt-1 text-sm text-primary/90">{m.role}</p> : null}
              {m.bio ? (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
              ) : null}
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
