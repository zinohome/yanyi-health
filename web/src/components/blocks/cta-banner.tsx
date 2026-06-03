import Link from 'next/link'
import type { CtaBannerBlock as T } from '@/payload-types'
import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { localeHref } from '@/lib/utils'

export function CtaBanner({ block, locale }: { block: T; locale: string }) {
  return (
    <Section>
      <Reveal className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-16 text-center sm:px-12">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {block.title}
          </h2>
          {block.subtitle ? (
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{block.subtitle}</p>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
