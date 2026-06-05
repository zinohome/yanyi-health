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
          {/* 公安备案（带官方警徽）在左，ICP 备案在右，中间四个空格分隔 */}
          <p className="leading-relaxed">
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802047148"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 align-middle opacity-70 transition-opacity hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/beian-gongan.png"
                alt="公安备案"
                loading="lazy"
                decoding="async"
                className="h-[18px] w-auto shrink-0"
              />
              {t('police')}
            </a>
            {'    '}
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="align-middle opacity-70 transition-opacity hover:opacity-100"
            >
              {t('icp')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
