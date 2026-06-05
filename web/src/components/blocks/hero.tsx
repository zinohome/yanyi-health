import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import { AuroraField } from '@/components/aurora-field'
import { localeHref } from '@/lib/utils'

export function Hero({ block, locale }: { block: HeroBlockType; locale: string }) {
  return (
    <section className="relative overflow-hidden">
      {/* 氛围层：流动极光 + 精密栅格 + 顶部柔光 */}
      <AuroraField className="[mask-image:radial-gradient(ellipse_at_50%_40%,black_60%,transparent_92%)]" />
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-28 text-center sm:px-6 sm:pb-32 sm:pt-36 lg:pt-40">
        {block.eyebrow ? (
          <Reveal
            as="div"
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {block.eyebrow}
          </Reveal>
        ) : null}

        <Reveal
          as="h1"
          delay={80}
          className="font-display max-w-4xl text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.02em] text-balance text-gradient-warm sm:text-6xl lg:text-[4.5rem]"
        >
          {block.title}
        </Reveal>

        {block.subtitle ? (
          <Reveal
            as="p"
            delay={160}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {block.subtitle}
          </Reveal>
        ) : null}

        <Reveal delay={240} className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
          {block.primaryCta?.label ? (
            <Button asChild size="lg" className="group">
              <Link href={localeHref(locale, block.primaryCta.href)}>
                {block.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
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

        <Reveal delay={320} className="mt-16 flex items-center justify-center gap-4 sm:gap-5">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50 sm:w-16" />
          <span className="font-display text-gradient-warm text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">
            {locale === 'en' ? 'Technology, born for love' : '科技，为爱而生'}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/50 sm:w-16" />
        </Reveal>
      </div>
    </section>
  )
}
