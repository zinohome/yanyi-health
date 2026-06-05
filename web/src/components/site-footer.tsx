import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { LogoMark } from '@/components/brand/logo'

export async function SiteFooter() {
  const t = await getTranslations('footer')
  const tn = await getTranslations('nav')
  const locale = await getLocale()
  const base = `/${locale}`

  const items = [
    { href: base, label: tn('home') },
    { href: `${base}/solutions`, label: tn('solutions') },
    { href: `${base}/technology`, label: tn('technology') },
    { href: `${base}/clinical-research`, label: tn('clinical') },
    { href: `${base}/safety`, label: tn('safety') },
    { href: `${base}/about`, label: tn('about') },
    { href: `${base}/resources`, label: tn('resources') },
    { href: `${base}/contact`, label: tn('contact') },
  ]

  return (
    <footer className="border-t border-border/70 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <span className="font-display text-base font-semibold">{t('company')}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t('slogan')}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {it.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© 2026 {t('company')}. {t('rights')}.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              {t('icp')}
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802047148"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 opacity-70 transition-opacity hover:opacity-100"
            >
              {/* 公安备案警徽（内置 SVG，后续可替换为官方 PNG） */}
              <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-primary" fill="currentColor" aria-hidden>
                <path d="M12 2 4 5v6c0 4.6 3.2 8.5 8 9.3 4.8-.8 8-4.7 8-9.3V5l-8-3z" opacity="0.85" />
                <path d="M12 6.5l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4L12 6.5z" fill="var(--background)" />
              </svg>
              {t('police')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
