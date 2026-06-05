'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  // 仅在客户端水合后为 true：服务端快照返回 false，客户端返回 true。
  // 用 useSyncExternalStore 取代 useEffect(setState) 的挂载守卫，避免水合不一致与级联渲染。
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="切换主题 / Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && resolvedTheme === 'dark' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  )
}
