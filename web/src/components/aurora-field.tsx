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
  { color: 'var(--primary)', size: '38rem', top: '-14%', left: '-6%', anim: 'drift1 15s', opacity: 0.72 },
  { color: 'var(--accent)', size: '30rem', top: '-8%', left: '60%', anim: 'drift2 17s', opacity: 0.6 },
  { color: 'color-mix(in oklch, var(--primary) 65%, var(--accent))', size: '34rem', top: '30%', left: '24%', anim: 'drift3 19s', opacity: 0.6 },
  { color: 'var(--accent)', size: '24rem', top: '44%', left: '72%', anim: 'drift1 14s', opacity: 0.5 },
]

/** 流动极光渐变背景（Stripe / Linear 风）：柔和色块明显地漂浮流动 */
export function AuroraField({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="aurora-blob absolute rounded-full blur-[70px]"
          style={
            {
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              opacity: b.opacity,
              background: `radial-gradient(circle, ${b.color}, transparent 60%)`,
              '--blob-anim': b.anim,
              animationDelay: `${i * -3}s`,
              willChange: 'transform',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
