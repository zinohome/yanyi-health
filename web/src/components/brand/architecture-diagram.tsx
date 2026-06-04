import { cn } from '@/lib/utils'

type Domain = {
  role?: string | null
  name?: string | null
  id?: string | null
}

const POS = [
  { cx: 196, cy: 148 },
  { cx: 804, cy: 148 },
  { cx: 196, cy: 472 },
  { cx: 804, cy: 472 },
]

/** 四域协同架构图：技术底座核心 + 思考/执行/语音/记忆，数据流动线 */
export function ArchitectureDiagram({
  domains,
  centerLabel,
  centerSub = 'EvoMetaX',
  className,
}: {
  domains: Domain[]
  centerLabel: string
  centerSub?: string
  className?: string
}) {
  const items = (domains ?? []).slice(0, 4)
  const cx = 500
  const cy = 310
  const color = (i: number) => (i === 1 || i === 2 ? 'var(--accent)' : 'var(--primary)')

  return (
    <svg
      viewBox="0 0 1000 620"
      className={cn('w-full', className)}
      role="img"
      aria-label={centerLabel}
    >
      <defs>
        <linearGradient id="arch-core" x1="350" y1="250" x2="650" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <filter id="arch-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="var(--primary)" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* 栅格 */}
      <g stroke="var(--border)" strokeOpacity="0.35">
        {Array.from({ length: 19 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="620" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 50} x2="1000" y2={(i + 1) * 50} />
        ))}
      </g>

      {/* 连接线 + 数据流 */}
      {items.map((_, i) => {
        const p = POS[i]
        return (
          <g key={`l${i}`}>
            <line x1={cx} y1={cy} x2={p.cx} y2={p.cy} stroke="var(--border)" strokeWidth="1.5" />
            <line
              x1={cx}
              y1={cy}
              x2={p.cx}
              y2={p.cy}
              stroke={color(i)}
              strokeWidth="1.5"
              className="flow-line"
            />
          </g>
        )
      })}

      {/* 四域节点 */}
      {items.map((d, i) => {
        const p = POS[i]
        const x = p.cx - 122
        const y = p.cy - 52
        return (
          <g key={d.id ?? i}>
            <rect x={x} y={y} width="244" height="104" rx="16" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
            <rect x={x} y={y + 16} width="4" height="72" rx="2" fill={color(i)} />
            <circle cx={p.cx + 92} cy={p.cy - 28} r="4" fill={color(i)} />
            <text x={x + 22} y={p.cy - 14} fill={color(i)} fontSize="14" fontWeight="600" letterSpacing="0.5">
              {d.role ?? ''}
            </text>
            <text x={x + 22} y={p.cy + 18} fill="var(--foreground)" fontSize="23" fontWeight="600">
              {d.name ?? ''}
            </text>
          </g>
        )
      })}

      {/* 中心核心 */}
      <g filter="url(#arch-glow)">
        <rect x="350" y="248" width="300" height="124" rx="22" fill="url(#arch-core)" />
      </g>
      <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="26" fontWeight="700">
        {centerLabel}
      </text>
      <text
        x={cx}
        y={cy + 26}
        textAnchor="middle"
        fill="white"
        fillOpacity="0.85"
        fontSize="15"
        letterSpacing="2"
        fontFamily="var(--font-mono)"
      >
        {centerSub}
      </text>
    </svg>
  )
}
