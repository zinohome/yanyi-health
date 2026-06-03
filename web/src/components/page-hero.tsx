export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/3 size-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 62%)' }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {eyebrow ? (
          <span className="eyebrow inline-flex items-center gap-2 text-primary">
            <span className="inline-block h-px w-6 bg-primary" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance text-gradient sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
