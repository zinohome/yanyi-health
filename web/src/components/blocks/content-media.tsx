import type { ContentMediaBlock as T, Media } from '@/payload-types'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function ContentMedia({ block }: { block: T }) {
  const media = (typeof block.media === 'object' ? block.media : null) as Media | null
  const right = block.mediaPosition !== 'left'
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal className={cn('order-1', right ? 'lg:order-1' : 'lg:order-2')}>
          {block.title ? (
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {block.title}
            </h2>
          ) : null}
          {block.body ? (
            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {block.body}
            </p>
          ) : null}
        </Reveal>
        <Reveal
          delay={120}
          className={cn('order-2', right ? 'lg:order-2' : 'lg:order-1')}
        >
          <div className="card-glow overflow-hidden rounded-2xl border border-border bg-card">
            {media?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.url} alt={media.alt ?? ''} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="tech-grid aspect-[4/3] w-full" />
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
