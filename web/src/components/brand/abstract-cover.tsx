import { cn } from '@/lib/utils'

type Tone = 'blue' | 'warm' | 'mix'

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const toneStops: Record<Tone, [string, string]> = {
  blue: ['var(--primary)', 'var(--primary)'],
  warm: ['var(--accent)', 'var(--accent)'],
  mix: ['var(--primary)', 'var(--accent)'],
}

/**
 * 确定性生成的品牌抽象封面（星座 / 神经网络母题）。
 * 同一 seed 永远生成同一图（避免 SSR/CSR 抖动），冷暖随 tone。
 */
export function AbstractCover({
  seed,
  tone = 'mix',
  className,
}: {
  seed: string
  tone?: Tone
  className?: string
}) {
  const rnd = mulberry32(hash(seed))
  const uid = `c${hash(seed + tone).toString(36)}`
  const [c1, c2] = toneStops[tone]

  const W = 400
  const H = 300
  const n = 6 + Math.floor(rnd() * 3)
  const nodes = Array.from({ length: n }, () => ({
    x: 40 + rnd() * (W - 80),
    y: 36 + rnd() * (H - 72),
    r: 2 + rnd() * 3.5,
  }))

  // 连接最近的若干节点
  const edges: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    let best = -1
    let bestD = Infinity
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const d = (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2
      if (d < bestD) {
        bestD = d
        best = j
      }
    }
    if (best > i) edges.push([i, best])
    if (rnd() > 0.55) {
      const k = Math.floor(rnd() * nodes.length)
      if (k !== i) edges.push([i, k])
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('size-full', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--card)" />
          <stop offset="1" stopColor="var(--card)" />
        </linearGradient>
        <radialGradient id={`${uid}-g1`} cx="22%" cy="18%" r="60%">
          <stop offset="0" stopColor={c1} stopOpacity="0.42" />
          <stop offset="1" stopColor={c1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-g2`} cx="84%" cy="88%" r="60%">
          <stop offset="0" stopColor={c2} stopOpacity="0.4" />
          <stop offset="1" stopColor={c2} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${uid}-bg)`} />
      <rect width={W} height={H} fill={`url(#${uid}-g1)`} />
      <rect width={W} height={H} fill={`url(#${uid}-g2)`} />

      {/* 精密栅格 */}
      <g stroke="var(--border)" strokeOpacity="0.4">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2={H} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 50} x2={W} y2={(i + 1) * 50} />
        ))}
      </g>

      {/* 连线 */}
      <g stroke={c1} strokeOpacity="0.5" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* 节点 */}
      {nodes.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r + 4} fill={i % 3 === 0 ? c2 : c1} opacity="0.18" />
          <circle cx={p.x} cy={p.y} r={p.r} fill={i % 3 === 0 ? c2 : c1} />
        </g>
      ))}
    </svg>
  )
}
