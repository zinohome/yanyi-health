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
import { fontSans, fontDisplay, fontMono } from '@/fonts'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '研翌科技 · Yanyi Technology',
    template: '%s · 研翌科技',
  },
  description: '科技为爱而生，让健康与品质同行。研翌科技以自研 AI 技术底座赋能多场景智能体。',
  openGraph: {
    type: 'website',
    siteName: '研翌科技 · Yanyi Technology',
    title: '研翌科技 · AI + HI 健康智能体',
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
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <head>
        {/* 在 next-themes 之前运行：未手动选择主题时，按访客本地时间预置 theme
            （06:00–18:59 亮色 / 19:00–05:59 暗色），随后 next-themes 读取即套用，零闪烁。
            同时标记 JS 可用（用于 reveal 动画的渐进增强）。 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var m=localStorage.getItem('theme-manual')==='1';if(!m){var h=new Date().getHours();localStorage.setItem('theme',(h>=19||h<6)?'dark':'light');}}catch(e){}document.documentElement.classList.add('js');})();",
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
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
