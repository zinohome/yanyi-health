'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const emptySubscribe = () => () => {}

// 自动模式时间规则：06:00–18:59 亮色，19:00–05:59 暗色
const timeTheme = () => {
  const h = new Date().getHours()
  return h >= 19 || h < 6 ? 'dark' : 'light'
}
const isManual = () => {
  try {
    return localStorage.getItem('theme-manual') === '1'
  } catch {
    return false
  }
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  // 仅在客户端水合后为 true：服务端快照返回 false，客户端返回 true。
  // 用 useSyncExternalStore 取代 useEffect(setState) 的挂载守卫，避免水合不一致与级联渲染。
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  // 自动模式：未手动选择时，按时间同步；长时间停留/切回页面时复检（跨越昼夜分界）
  React.useEffect(() => {
    if (!isManual()) setTheme(timeTheme())
    const sync = () => {
      if (!isManual()) setTheme(timeTheme())
    }
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [setTheme])

  const toggle = () => {
    // 用户手动切换后，记录标记，之后尊重手动选择、不再按时间覆盖
    try {
      localStorage.setItem('theme-manual', '1')
    } catch {
      /* ignore */
    }
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button variant="ghost" size="icon" aria-label="切换主题 / Toggle theme" onClick={toggle}>
      {mounted && resolvedTheme === 'dark' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  )
}
