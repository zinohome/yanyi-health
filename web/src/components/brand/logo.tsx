import { cn } from '@/lib/utils'

/** 品牌标记：蓝→暖渐变圆角方块 + 抽象「节点·心核」（科技·为爱而生） */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('size-8', className)} role="img" aria-label="研翌科技">
      <defs>
        <linearGradient id="yy-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="11" fill="url(#yy-mark)" />
      {/* 轨道环（科技） */}
      <circle cx="20" cy="20" r="11" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="1.6" />
      {/* 轨道节点 */}
      <circle cx="20" cy="9" r="2.1" fill="white" />
      <circle cx="31" cy="20" r="1.7" fill="white" fillOpacity="0.9" />
      {/* 心核（爱） */}
      <circle cx="20" cy="20" r="3.6" fill="white" />
    </svg>
  )
}

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string
  wordmark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-8" />
      {wordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight">研翌科技</span>
      ) : null}
    </span>
  )
}
