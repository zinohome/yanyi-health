import { Mail, MapPin } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/page-hero'
import { Section } from '@/components/section'
import { ContactForm } from '@/components/contact-form'
import { getSiteSettings } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

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
          </div>
        </div>
      </Section>
    </>
  )
}
