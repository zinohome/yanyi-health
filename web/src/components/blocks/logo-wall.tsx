import type { LogoWallBlock as T, Partner, Media } from '@/payload-types'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { getPartners } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export async function LogoWall({ block, locale }: { block: T; locale: string }) {
  const all = await getPartners(locale as Locale)
  const selected = (block.partners ?? []) as (number | Partner)[]
  const ids = selected.map((p) => (typeof p === 'object' ? p.id : p))
  const partners = ids.length ? all.filter((p) => ids.includes(p.id)) : all

  if (partners.length === 0) return null

  return (
    <Section className="py-16">
      {block.title ? (
        <Reveal className="eyebrow mb-10 block text-center text-muted-foreground">
          {block.title}
        </Reveal>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {partners.map((p, i) => {
          const logo = (typeof p.logo === 'object' ? p.logo : null) as Media | null
          return (
            <Reveal key={p.id} delay={i * 50} className="opacity-70 transition-opacity hover:opacity-100">
              {logo?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo.url} alt={p.name ?? ''} className="h-8 w-auto object-contain grayscale" />
              ) : (
                <span className="font-display text-lg font-semibold text-muted-foreground">{p.name}</span>
              )}
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
