import { cn } from '@/lib/utils'

type Blob = {
  color: string
  size: string
  top: string
  left: string
  anim: string
  opacity: number
}

const BLOBS: Blob[] = [
  { color: 'var(--primary)', size: '42rem', top: '-12%', left: '-8%', anim: 'drift1 24s', opacity: 0.5 },
  { color: 'var(--accent)', size: '34rem', top: '-6%', left: '58%', anim: 'drift2 28s', opacity: 0.42 },
  { color: 'color-mix(in oklch, var(--primary) 70%, var(--accent))', size: '40rem', top: '34%', left: '22%', anim: 'drift3 32s', opacity: 0.4 },
  { color: 'var(--accent)', size: '26rem', top: '50%', left: '70%', anim: 'drift1 26s', opacity: 0.34 },
]

/** 流动极光渐变背景（Stripe / Linear 风）：柔和色块缓缓漂浮 */
export function AuroraField({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="aurora-blob absolute rounded-full blur-[110px]"
          style={
            {
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              opacity: b.opacity,
              background: `radial-gradient(circle, ${b.color}, transparent 62%)`,
              '--blob-anim': b.anim,
              animationDelay: `${i * -4}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
