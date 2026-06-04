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

  const company = String(formData.get('company') || '')
  const email = String(formData.get('email') || '')
  const phone = String(formData.get('phone') || '')
  const intent = String(formData.get('intent') || 'business') as
    | 'business'
    | 'trial'
    | 'investment'
    | 'careers'
    | 'other'
  const message = String(formData.get('message') || '')

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: {
        name,
        company: company || undefined,
        email: email || undefined,
        phone: phone || undefined,
        intent,
        message: message || undefined,
      },
    })

    // 邮件通知（配置 SMTP 后生效；失败不影响提交）
    try {
      await payload.sendEmail({
        to: process.env.NOTIFY_EMAIL || 'perffie@163.com',
        replyTo: email || undefined,
        subject: `【官网留资】${intent} · ${name}`,
        text: [
          `姓名：${name}`,
          `机构/公司：${company || '-'}`,
          `邮箱：${email || '-'}`,
          `电话：${phone || '-'}`,
          `合作方向：${intent}`,
          `留言：${message || '-'}`,
        ].join('\n'),
      })
    } catch (mailErr) {
      console.error('notify email failed', mailErr)
    }

    return { ok: true }
  } catch (err) {
    console.error('submitContact failed', err)
    return { ok: false, error: true }
  }
}
