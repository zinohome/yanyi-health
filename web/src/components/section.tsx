import * as React from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal
          as="span"
          className="eyebrow inline-flex items-center gap-2 text-primary"
        >
          <span className="inline-block h-px w-6 bg-primary" />
          {eyebrow}
        </Reveal>
      ) : null}
      {title ? (
        <Reveal
          as="h2"
          delay={60}
          className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {title}
        </Reveal>
      ) : null}
      {subtitle ? (
        <Reveal
          as="p"
          delay={120}
          className={cn(
            'max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </Reveal>
      ) : null}
    </div>
  )
}
