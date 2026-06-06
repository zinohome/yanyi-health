import { cn } from '@/lib/utils'

/** 品牌标记（A3）：字母 Y（尖端收成芒）+ 顶部小星芒 —— 研翌 × AI 星芒，蓝→紫→珊瑚 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn('size-8', className)} role="img" aria-label="研翌科技">
      <defs>
        <linearGradient id="yy-mark" x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="0.5" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ff7a5b" />
        </linearGradient>
      </defs>
      {/* 背后大星芒（淡）：增强「AI 星芒」气质 */}
      <path d="M40 8 Q43 20 55 23 Q43 26 40 38 Q37 26 25 23 Q37 20 40 8 Z" fill="url(#yy-mark)" opacity="0.22" />
      {/* 字母 Y */}
      <g stroke="url(#yy-mark)" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M24 26 L40 44" />
        <path d="M56 26 L40 44" />
        <path d="M40 44 L40 66" />
      </g>
      {/* 右上小星芒 */}
      <path d="M58 10 Q60 15 65 17 Q60 19 58 24 Q56 19 51 17 Q56 15 58 10 Z" fill="url(#yy-mark)" />
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
