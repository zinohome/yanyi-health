import Image from 'next/image'
import type { ContentMediaBlock as T, Media } from '@/payload-types'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { AbstractCover } from '@/components/brand/abstract-cover'
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
          <div className="card-glow relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
            {media?.url ? (
              <Image
                fill
                src={media.url}
                alt={media.alt ?? ''}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <AbstractCover seed={block.title ?? 'content'} tone="mix" />
            )}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
              style={{ background: 'linear-gradient(130deg, var(--primary), transparent 55%, var(--accent))' }}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
