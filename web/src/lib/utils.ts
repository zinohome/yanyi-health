import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 给站内相对路径加上语言前缀；外链原样返回 */
export function localeHref(locale: string, href?: string | null) {
  if (!href) return `/${locale}`
  if (/^https?:\/\//.test(href) || href.startsWith('#') || href.startsWith('mailto:')) return href
  return `/${locale}${href.startsWith('/') ? '' : '/'}${href}`
}
