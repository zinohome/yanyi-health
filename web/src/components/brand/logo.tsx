import { cn } from '@/lib/utils'

/** 品牌标记（E2）：圆角渐变球 + 白色字母 Y + 顶部火花点 —— 蓝→紫→珊瑚 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn('size-8', className)} role="img" aria-label="研翌科技">
      <defs>
        <linearGradient id="yy-mark" x1="6" y1="6" x2="74" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ff7a5b" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="22" fill="url(#yy-mark)" />
      {/* 字母 Y */}
      <g stroke="#fff" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d="M28 30 L40 45" />
        <path d="M52 30 L40 45" />
        <path d="M40 45 L40 60" />
      </g>
      {/* 顶部火花点 */}
      <circle cx="40" cy="22" r="3.2" fill="#fff" />
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
