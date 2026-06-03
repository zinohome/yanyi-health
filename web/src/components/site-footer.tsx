import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

export async function SiteFooter() {
  const t = await getTranslations('footer')
  const tn = await getTranslations('nav')
  const locale = await getLocale()
  const base = `/${locale}`

  const items = [
    { href: `${base}/technology`, label: tn('technology') },
    { href: `${base}/products`, label: tn('products') },
    { href: `${base}/about`, label: tn('about') },
    { href: `${base}/blog`, label: tn('blog') },
    { href: `${base}/contact`, label: tn('contact') },
  ]

  return (
    <footer className="border-t border-border/70 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-bold">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm">研</span>
              <span className="text-lg">{t('company')}</span>
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
        <div className="mt-10 flex flex-col gap-1 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© 2026 {t('company')}. {t('rights')}.</p>
          <p className="opacity-70">{t('icp')}</p>
        </div>
      </div>
    </footer>
  )
}
