export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yanyi-health.com'
).replace(/\/$/, '')

export const LOCALES = ['zh', 'en'] as const
