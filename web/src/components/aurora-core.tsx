import { cn } from '@/lib/utils'

/**
 * 「科技·为爱而生」核心视觉：
 * 蓝色科技同心环（科技/结构）+ 暖色心核光晕（爱/温度）。
 */
export function AuroraCore({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute', className)} aria-hidden>
      {/* 蓝色科技光晕 */}
      <div
        className="absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
        style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
      />
      {/* 暖色心核（爱） */}
      <div
        className="animate-breathe absolute left-1/2 top-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 62%)' }}
      />
      {/* 科技同心环 */}
      <svg
        viewBox="0 0 400 400"
        className="animate-spin-slow absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        <circle cx="200" cy="200" r="80" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" stroke="var(--primary)" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="200" cy="200" r="180" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="200" cy="120" r="3.5" fill="var(--accent)" />
        <circle cx="330" cy="200" r="2.5" fill="var(--primary)" />
        <circle cx="200" cy="380" r="2.5" fill="var(--primary)" />
      </svg>
      {/* 中心点 */}
      <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_6px_var(--accent)]" />
    </div>
  )
}
