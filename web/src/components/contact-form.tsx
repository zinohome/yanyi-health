'use client'

import { useActionState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

import { submitContact, type ContactState } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'

const fieldClass =
  'w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-[3px] focus:ring-ring/30'

export function ContactForm() {
  const t = useTranslations('contact')
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, null)

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-card p-12 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <p className="text-lg font-medium">{t('success')}</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold">{t('formTitle')}</h2>

      {/* 蜜罐 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">
            {t('name')} <span className="text-primary">*</span>
          </span>
          <input name="name" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">{t('company')}</span>
          <input name="company" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">{t('email')}</span>
          <input type="email" name="email" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">{t('phone')}</span>
          <input name="phone" className={fieldClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">{t('intent')}</span>
        <select name="intent" defaultValue="business" className={fieldClass}>
          <option value="business">{t('intents.business')}</option>
          <option value="trial">{t('intents.trial')}</option>
          <option value="investment">{t('intents.investment')}</option>
          <option value="careers">{t('intents.careers')}</option>
          <option value="other">{t('intents.other')}</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">{t('message')}</span>
        <textarea name="message" rows={4} className={fieldClass} />
      </label>

      {state?.error ? <p className="text-sm text-destructive">{t('error')}</p> : null}

      <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full sm:w-auto sm:self-start">
        {pending ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}
