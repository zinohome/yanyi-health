import { cn } from '@/lib/utils'

function Orbit({
  size,
  duration,
  reverse,
  color,
  dot,
}: {
  size: string
  duration: string
  reverse?: boolean
  color: string
  dot: string
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ width: size, height: size, animation: `spin ${duration} linear infinite${reverse ? ' reverse' : ''}` }}
    >
      <div
        className={cn('absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full', dot)}
        style={{ background: color, boxShadow: `0 0 14px 3px ${color}` }}
      />
    </div>
  )
}

/**
 * 「科技·为爱而生」核心视觉（炫光版）：
 * 多层不同速度/方向的轨道环 + 沿轨运行的发光节点 + 旋转扫描光束 + 跳动暖心。
 */
export function AuroraCore({ className }: { className?: string }) {
  const particles = [
    { top: '14%', left: '30%', d: '0s' },
    { top: '22%', left: '74%', d: '0.8s' },
    { top: '70%', left: '20%', d: '1.6s' },
    { top: '80%', left: '68%', d: '0.4s' },
    { top: '46%', left: '88%', d: '1.2s' },
    { top: '58%', left: '10%', d: '2s' },
  ]

  return (
    <div className={cn('aurora-core pointer-events-none absolute', className)} aria-hidden>
      {/* 蓝色科技光晕 */}
      <div
        className="absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />

      {/* 旋转扫描光束（环形 radar） */}
      <div
        className="absolute left-1/2 top-1/2 size-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0 60%, color-mix(in oklch, var(--primary) 55%, transparent) 82%, transparent 94% 100%)',
          animation: 'spin 12s linear infinite',
          maskImage: 'radial-gradient(closest-side, transparent 55%, #000 60%)',
          WebkitMaskImage: 'radial-gradient(closest-side, transparent 55%, #000 60%)',
        }}
      />

      {/* 静态轨道环 */}
      <div className="absolute left-1/2 top-1/2 size-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/40" style={{ animation: 'spin 90s linear infinite' }} />
      <div className="absolute left-1/2 top-1/2 size-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35" />
      <div className="absolute left-1/2 top-1/2 size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/45" />

      {/* 轨道节点（不同速度/方向） */}
      <Orbit size="94%" duration="26s" color="var(--primary)" dot="size-3" />
      <Orbit size="94%" duration="34s" reverse color="var(--accent)" dot="size-2" />
      <Orbit size="66%" duration="18s" reverse color="var(--accent)" dot="size-2.5" />
      <Orbit size="40%" duration="11s" color="var(--primary)" dot="size-2" />

      {/* 星点闪烁 */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full bg-primary/70"
          style={{ top: p.top, left: p.left, animation: 'twinkle 3s ease-in-out infinite', animationDelay: p.d }}
        />
      ))}

      {/* 暖心（爱）跳动 */}
      <div
        className="animate-breathe absolute left-1/2 top-1/2 size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[55px]"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 62%)' }}
      />
      {/* 核心点 */}
      <div
        className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'var(--accent)', boxShadow: '0 0 28px 8px color-mix(in oklch, var(--accent) 80%, transparent)' }}
      />
    </div>
  )
}
