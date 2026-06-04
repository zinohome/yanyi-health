import { cn } from '@/lib/utils'

type Domain = { role?: string | null; name?: string | null; id?: string | null }

// 四角节点坐标（viewBox 1000x460）
const POS = [
  { cx: 196, cy: 112 }, // 大脑
  { cx: 804, cy: 112 }, // 小脑
  { cx: 196, cy: 348 }, // 嘴耳
  { cx: 804, cy: 348 }, // 记忆
]

export function FourDomainDiagram({
  domains,
  centerLabel,
  className,
}: {
  domains: Domain[]
  centerLabel: string
  className?: string
}) {
  const items = (domains ?? []).slice(0, 4)
  const cx = 500
  const cy = 230
  const color = (i: number) => (i === 1 || i === 2 ? 'var(--accent)' : 'var(--primary)')

  return (
    <svg viewBox="0 0 1000 460" className={cn('w-full', className)} role="img" aria-label={centerLabel}>
      <defs>
        <linearGradient id="fd-core" x1="380" y1="184" x2="620" y2="276" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <filter id="fd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="var(--primary)" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* 连接线 + 数据流 */}
      {items.map((_, i) => (
        <g key={`l${i}`}>
          <line x1={cx} y1={cy} x2={POS[i].cx} y2={POS[i].cy} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={cx} y1={cy} x2={POS[i].cx} y2={POS[i].cy} stroke={color(i)} strokeWidth="1.5" className="flow-line" opacity="0.75" />
        </g>
      ))}

      {/* 四域节点 */}
      {items.map((d, i) => {
        const p = POS[i]
        const x = p.cx - 116
        const y = p.cy - 44
        return (
          <g key={d.id ?? i}>
            <rect x={x} y={y} width="232" height="88" rx="16" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
            <rect x={x} y={y + 16} width="4" height="56" rx="2" fill={color(i)} />
            <text x={x + 24} y={p.cy - 8} fontSize="15" fontWeight="700" fill={color(i)} fontFamily="var(--font-mono)" letterSpacing="1">
              {d.role ?? ''}
            </text>
            <text x={x + 24} y={p.cy + 22} fontSize="22" fontWeight="600" fill="var(--foreground)">
              {d.name ?? ''}
            </text>
          </g>
        )
      })}

      {/* 中心核心 */}
      <g filter="url(#fd-glow)">
        <rect x="380" y="184" width="240" height="92" rx="20" fill="url(#fd-core)" />
      </g>
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="24" fontWeight="700" fill="white">
        {centerLabel}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize="13" fontWeight="500" fill="white" fillOpacity="0.85" letterSpacing="2" fontFamily="var(--font-mono)">
        EvoMetaX
      </text>
    </svg>
  )
}
