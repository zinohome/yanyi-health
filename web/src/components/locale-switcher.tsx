'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const next = locale === 'zh' ? 'en' : 'zh'

  const swap = () => {
    const segs = pathname.split('/')
    segs[1] = next
    router.push(segs.join('/') || `/${next}`)
  }

  return (
    <Button variant="ghost" size="sm" onClick={swap} aria-label="切换语言 / Switch language">
      {locale === 'zh' ? 'EN' : '中文'}
    </Button>
  )
}
