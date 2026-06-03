'use server'

import { getPayloadClient } from '@/lib/payload'

export type ContactState = { ok: boolean; error?: boolean } | null

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 蜜罐：机器人会填这个隐藏字段
  if (formData.get('website')) return { ok: true }

  const name = String(formData.get('name') || '').trim()
  if (!name) return { ok: false, error: true }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: {
        name,
        company: String(formData.get('company') || '') || undefined,
        email: String(formData.get('email') || '') || undefined,
        phone: String(formData.get('phone') || '') || undefined,
        intent: (String(formData.get('intent') || 'business') as
          | 'business'
          | 'trial'
          | 'investment'
          | 'careers'
          | 'other'),
        message: String(formData.get('message') || '') || undefined,
      },
    })

    // 邮件通知：配置 SMTP/Resend 后启用（见 payload.config email 适配器）
    // try { await payload.sendEmail({ to: NOTIFY_EMAIL, subject: '新的商务咨询', text: ... }) } catch {}

    return { ok: true }
  } catch (err) {
    console.error('submitContact failed', err)
    return { ok: false, error: true }
  }
}
