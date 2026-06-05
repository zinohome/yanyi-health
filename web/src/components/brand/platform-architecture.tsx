import { cn } from '@/lib/utils'

type Item = { zh: string; en: string }
const L = (locale: string) => (i: Item) => (locale === 'en' ? i.en : i.zh)

const APP: Item[] = [
  { zh: '围产期心理', en: 'Perinatal' },
  { zh: '母婴安全', en: 'Maternal' },
  { zh: '儿童青少年', en: 'Youth' },
  { zh: '成人身心', en: 'Adult' },
  { zh: '运动营养', en: 'Sports' },
  { zh: '老年照护', en: 'Elderly' },
]
const AGENT: Item[] = [
  { zh: '孕产 Agent', en: 'Maternity' },
  { zh: '高危随访', en: 'Follow-up' },
  { zh: '心理健康', en: 'Mental health' },
  { zh: '营养 / 康复', en: 'Nutrition' },
  { zh: '老年照护', en: 'Eldercare' },
  { zh: '医护协同', en: 'Care team' },
]
const ENGINE: Item[] = [
  { zh: '长期记忆', en: 'Long-term Memory' },
  { zh: '多模态状态建模', en: 'Multimodal Modeling' },
  { zh: '风险分层与异常识别', en: 'Risk Tiering' },
  { zh: 'AI Agent 编排', en: 'Agent Orchestration' },
  { zh: '可解释 AI 与治理', en: 'Explainable AI' },
]
const DATA: Item[] = [
  { zh: '对话', en: 'Dialogue' },
  { zh: '打卡', en: 'Check-ins' },
  { zh: '检查报告', en: 'Reports' },
  { zh: '体征', en: 'Vitals' },
  { zh: '睡眠 / 运动', en: 'Sleep/Move' },
  { zh: '营养', en: 'Nutrition' },
  { zh: '情绪 / 量表', en: 'Mood/Scales' },
]
const GOV: Item[] = [
  { zh: '审核知识库', en: 'Reviewed KB' },
  { zh: '风险分层', en: 'Risk tiering' },
  { zh: '可解释', en: 'Explainable' },
  { zh: '权限隔离', en: 'Isolation' },
  { zh: '私有化部署', en: 'Private deploy' },
  { zh: '全链路审计', en: 'Full audit' },
]

const CX = 40
const CW = 770 // content width
const RAILX = 826
const RAILW = 134
const ARROW_X = CX + CW / 2

/** 层间向下流动箭头（普通辅助函数，避免在 render 内定义组件类型） */
function arrow(y1: number, y2: number) {
  return (
    <g>
      <line x1={ARROW_X} y1={y1} x2={ARROW_X} y2={y2 - 7} stroke="var(--primary)" strokeWidth="1.5" className="flow-line" opacity="0.7" />
      <path d={`M ${ARROW_X - 5} ${y2 - 8} L ${ARROW_X} ${y2 - 1} L ${ARROW_X + 5} ${y2 - 8} Z`} fill="var(--primary)" opacity="0.8" />
    </g>
  )
}

/** 层标签（普通辅助函数） */
function layerLabel(en: boolean, y: number, zh: string, enL: string, color = 'var(--primary)') {
  return (
    <text x={CX + 16} y={y - 8} fontSize="11" fontWeight="600" letterSpacing="1.5" fill={color} fontFamily="var(--font-mono)">
      {en ? enL : zh}
    </text>
  )
}

function chips(items: Item[], t: (i: Item) => string, y: number, h: number, opts?: { engine?: boolean }) {
  const n = items.length
  const pad = 16
  const gap = 10
  const w = (CW - pad * 2 - gap * (n - 1)) / n
  const x0 = CX + pad
  return items.map((it, i) => {
    const x = x0 + i * (w + gap)
    return (
      <g key={i}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="9"
          fill={opts?.engine ? 'color-mix(in oklch, var(--primary) 16%, var(--card))' : 'var(--background)'}
          stroke={opts?.engine ? 'color-mix(in oklch, var(--primary) 45%, transparent)' : 'var(--border)'}
          strokeWidth="1"
        />
        <text
          x={x + w / 2}
          y={y + h / 2 + 4}
          textAnchor="middle"
          fontSize={opts?.engine ? 13.5 : 12.5}
          fontWeight={opts?.engine ? 600 : 500}
          fill="var(--foreground)"
        >
          {t(it)}
        </text>
      </g>
    )
  })
}

/** 专业分层平台架构图：应用 → Agent → 引擎 → 数据 ＋ 治理纵贯栏 */
export function PlatformArchitecture({ locale, className }: { locale: string; className?: string }) {
  const t = L(locale)
  const en = locale === 'en'
  const band = (zh: string, enL: string) => (en ? enL : zh)

  // 各层 y 坐标
  const b1 = 64
  const b2 = 190
  const b3 = 316 // engine (taller)
  const b4 = 486
  const H1 = 96
  const HE = 150

  return (
    <svg viewBox="0 0 1000 620" className={cn('w-full', className)} role="img" aria-label="EvoMetaX 平台架构">
      <defs>
        <linearGradient id="pa-engine" x1={CX} y1={b3} x2={CX + CW} y2={b3 + HE} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="color-mix(in oklch, var(--primary) 22%, var(--card))" />
          <stop offset="1" stopColor="color-mix(in oklch, var(--accent) 18%, var(--card))" />
        </linearGradient>
        <filter id="pa-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="var(--primary)" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* 治理纵贯栏 */}
      <rect x={RAILX} y={b1 - 24} width={RAILW} height={598 - (b1 - 24)} rx="14" fill="color-mix(in oklch, var(--accent) 10%, var(--card))" stroke="color-mix(in oklch, var(--accent) 40%, transparent)" />
      <text x={RAILX + RAILW / 2} y={b1 - 4} textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1" fill="var(--accent)" fontFamily="var(--font-mono)">
        {band('安全与治理', 'GOVERNANCE')}
      </text>
      {GOV.map((g, i) => {
        const gy = b1 + 18 + i * 82
        return (
          <g key={i}>
            <rect x={RAILX + 12} y={gy} width={RAILW - 24} height="48" rx="8" fill="var(--background)" stroke="var(--border)" />
            <text x={RAILX + RAILW / 2} y={gy + 28} textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--foreground)">
              {t(g)}
            </text>
          </g>
        )
      })}

      {/* 应用层 */}
      {layerLabel(en, b1 + 8, '应用层 · 生命全周期解决方案', 'APPLICATIONS · SOLUTIONS')}
      <rect x={CX} y={b1 + 16} width={CW} height={H1} rx="14" fill="var(--card)" stroke="var(--border)" />
      {chips(APP, t, b1 + 36, 56)}

      {arrow(b1 + 16 + H1, b2 + 16)}

      {/* Agent 层 */}
      {layerLabel(en, b2 + 8, 'AI Agent 工作流', 'AI AGENT WORKFLOWS')}
      <rect x={CX} y={b2 + 16} width={CW} height={H1} rx="14" fill="var(--card)" stroke="var(--border)" />
      {chips(AGENT, t, b2 + 36, 56)}

      {arrow(b2 + 16 + H1, b3 + 16)}

      {/* 核心引擎层 */}
      {layerLabel(en, b3 + 8, 'EvoMetaX 核心引擎', 'EVOMETAX CORE ENGINE')}
      <g filter="url(#pa-glow)">
        <rect x={CX} y={b3 + 16} width={CW} height={HE} rx="16" fill="url(#pa-engine)" stroke="color-mix(in oklch, var(--primary) 45%, transparent)" strokeWidth="1.5" />
      </g>
      <text x={CX + 16} y={b3 + 44} fontSize="14" fontWeight="700" fill="var(--foreground)">
        {band('EvoMetaX 长期状态智能引擎', 'EvoMetaX — Long-term State Engine')}
      </text>
      {chips(ENGINE, t, b3 + 60, 74, { engine: true })}

      {arrow(b4 + 16, b3 + 16 + HE + 0)}

      {/* 数据层 */}
      {layerLabel(en, b4 + 8, '多模态数据接入', 'MULTIMODAL DATA')}
      <rect x={CX} y={b4 + 16} width={CW} height={H1} rx="14" fill="var(--card)" stroke="var(--border)" />
      {chips(DATA, t, b4 + 36, 56)}
    </svg>
  )
}
