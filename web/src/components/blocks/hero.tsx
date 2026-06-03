import Link from 'next/link'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import { localeHref } from '@/lib/utils'

export function Hero({ block, locale }: { block: HeroBlockType; locale: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_-10%,black,transparent_70%)]" />
      <div
        className="pointer-events-none absolute -top-48 left-1/2 size-[48rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 62%)' }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
        {block.eyebrow ? (
          <Reveal
            as="span"
            className="eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-4 py-1.5 text-muted-foreground backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {block.eyebrow}
          </Reveal>
        ) : null}
        <Reveal
          as="h1"
          delay={80}
          className="font-display max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gradient sm:text-6xl lg:text-7xl"
        >
          {block.title}
        </Reveal>
        {block.subtitle ? (
          <Reveal
            as="p"
            delay={160}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {block.subtitle}
          </Reveal>
        ) : null}
        <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
          {block.primaryCta?.label ? (
            <Button asChild size="lg">
              <Link href={localeHref(locale, block.primaryCta.href)}>{block.primaryCta.label}</Link>
            </Button>
          ) : null}
          {block.secondaryCta?.label ? (
            <Button asChild size="lg" variant="outline">
              <Link href={localeHref(locale, block.secondaryCta.href)}>
                {block.secondaryCta.label}
              </Link>
            </Button>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
