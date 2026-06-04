import { Mail, MessageCircle, MapPin } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/section'
import { ContactForm } from '@/components/contact-form'
import { getSiteSettings } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  const settings = await getSiteSettings(locale as Locale)
  const qr = (typeof settings?.wechatQR === 'object' ? settings?.wechatQR : null) as Media | null
  const wechatId = settings?.wechatId
  const email = settings?.email
  const address = settings?.address

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">{t('infoTitle')}</h2>
              <ul className="mt-6 flex flex-col gap-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">{t('emailLabel')}</div>
                    <div className="font-medium">{email || '[邮箱 待提供]'}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-5 text-primary" />
                  <div>
                    <div className="text-muted-foreground">{t('wechatLabel')}</div>
                    <div className="font-medium">{wechatId || '—'}</div>
                  </div>
                </li>
                {address ? (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-primary" />
                    <div>
                      <div className="text-muted-foreground">{t('addressLabel')}</div>
                      <div className="font-medium">{address}</div>
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
              <div className="mx-auto size-40 overflow-hidden rounded-xl border border-border bg-muted">
                {qr?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qr.url} alt="WeChat QR" className="size-full object-cover" />
                ) : (
                  <div className="tech-grid grid size-full place-items-center px-3 text-center text-xs text-muted-foreground">
                    {wechatId ? `微信：${wechatId}` : '[微信二维码 待替换]'}
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{t('wechatLabel')}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
