'use client'

import * as React from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { LogoMark } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const t = useTranslations('nav')
  const tb = useTranslations('brand')
  const locale = useLocale()
  const base = `/${locale}`
  const [open, setOpen] = React.useState(false)

  const items = [
    { href: base, label: t('home') },
    { href: `${base}/solutions`, label: t('solutions') },
    { href: `${base}/technology`, label: t('technology') },
    { href: `${base}/clinical-research`, label: t('clinical') },
    { href: `${base}/safety`, label: t('safety') },
    { href: `${base}/about`, label: t('about') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={base} className="flex items-center gap-2.5 tracking-tight">
          <LogoMark className="size-8" />
          <span className="font-display text-lg font-semibold">{tb('name')}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
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

        <div className="flex items-center gap-1.5">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={`${base}/contact`}>{t('cta')}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="菜单 / Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-border/70 lg:hidden',
          open ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
        style={{ transition: 'max-height 0.3s ease' }}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {it.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mt-2 w-full">
            <Link href={`${base}/contact`} onClick={() => setOpen(false)}>
              {t('cta')}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
