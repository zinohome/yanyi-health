import '../globals.css'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '研翌数据科技 · Yanyi Data Technology',
    template: '%s · 研翌数据科技',
  },
  description: '科技为爱而生，让健康与品质同行。研翌数据科技以自研 AI 技术底座赋能多场景智能体。',
  openGraph: {
    type: 'website',
    siteName: '研翌数据科技 · Yanyi Data Technology',
    title: '研翌数据科技 · AI + HI 健康智能体',
    description: '以自研 AI 技术底座，打造懂情感、懂健康的智能伙伴。',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { languages: { zh: `${SITE_URL}/zh`, en: `${SITE_URL}/en` } },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Manrope:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap';document.head.appendChild(l);})();",
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <div className="grain-overlay" aria-hidden />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
