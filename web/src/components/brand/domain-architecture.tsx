import { cn } from '@/lib/utils'

type Kind = 'brain' | 'cerebellum' | 'voice' | 'memory'
type Stage = { label: string; items: string[] }

const pick = (locale: string) => (zh: string, en: string) => (locale === 'en' ? en : zh)

function config(kind: Kind, locale: string): Stage[] {
  const t = pick(locale)
  switch (kind) {
    case 'brain':
      return [
        { label: t('输入', 'Input'), items: [t('用户消息', 'User message')] },
        { label: t('编排', 'Orchestrate'), items: [t('意图识别', 'Intent')] },
        { label: t('并行召回', 'Recall'), items: [t('知识库', 'Knowledge'), t('用户画像', 'Profile'), t('会话记忆', 'Memory')] },
        { label: t('组装', 'Assemble'), items: [t('人格 + 上下文', 'Persona + Context')] },
        { label: t('输出', 'Output'), items: [t('LLM 生成', 'LLM'), t('工具路由', 'Tool routing')] },
      ]
    case 'cerebellum':
      return [
        { label: t('来自大脑', 'From Brain'), items: [t('工具调用', 'Tool call')] },
        { label: t('MCP 网关', 'MCP Gateway'), items: ['MCP Server'] },
        { label: t('工具 · 热插拔', 'Tools · hot-plug'), items: [t('检索', 'Search'), t('计算', 'Compute'), t('外部系统', 'External')] },
        { label: t('回传', 'Return'), items: [t('执行结果', 'Result')] },
      ]
    case 'voice':
      return [
        { label: t('音频输入', 'Audio in'), items: [t('麦克风流', 'Mic stream')] },
        { label: t('流式 ASR', 'Streaming ASR'), items: [t('语音 → 文本', 'Speech → Text')] },
        { label: t('大脑', 'Brain'), items: [t('对话理解', 'Dialogue')] },
        { label: t('流式 TTS', 'Streaming TTS'), items: [t('文本 → 语音', 'Text → Speech')] },
        { label: t('音频输出', 'Audio out'), items: [t('扬声器流', 'Speaker')] },
      ]
    case 'memory':
      return [
        { label: t('统一 API', 'Unified API'), items: [t('记忆服务', 'Memory service')] },
        { label: t('三大引擎', 'Engines'), items: [t('会话记忆', 'Conversation'), t('用户画像', 'Profile'), t('知识图谱', 'Knowledge graph')] },
        { label: t('存储', 'Stores'), items: [t('向量库', 'Vector'), t('图数据库', 'Graph'), t('关系库', 'SQL')] },
        { label: t('输出', 'Output'), items: [t('记忆上下文', 'Memory context')] },
      ]
  }
}

const STAGE_W = 168
const GAP_X = 48
const BOX_H = 46
const GAP_Y = 14
const TOP = 30

export function DomainArchitecture({
  kind,
  locale,
  accent = false,
  className,
}: {
  kind: Kind
  locale: string
  accent?: boolean
  className?: string
}) {
  const stages = config(kind, locale)
  const color = accent ? 'var(--accent)' : 'var(--primary)'
  const maxItems = Math.max(...stages.map((s) => s.items.length))
  const maxTotal = maxItems * BOX_H + (maxItems - 1) * GAP_Y
  const midY = TOP + maxTotal / 2
  const width = stages.length * STAGE_W + (stages.length - 1) * GAP_X
  const height = TOP + maxTotal + 12

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('w-full', className)} role="img">
      <defs>
        <marker id={`dm-${kind}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={color} opacity="0.85" />
        </marker>
      </defs>

      {/* 阶段间箭头 */}
      {stages.slice(0, -1).map((_, i) => {
        const x1 = i * (STAGE_W + GAP_X) + STAGE_W
        const x2 = (i + 1) * (STAGE_W + GAP_X)
        return (
          <line
            key={`a${i}`}
            x1={x1 + 4}
            y1={midY}
            x2={x2 - 6}
            y2={midY}
            stroke={color}
            strokeWidth="1.6"
            className="flow-line"
            markerEnd={`url(#dm-${kind})`}
            opacity="0.8"
          />
        )
      })}

      {stages.map((s, i) => {
        const sx = i * (STAGE_W + GAP_X)
        const total = s.items.length * BOX_H + (s.items.length - 1) * GAP_Y
        const y0 = TOP + (maxTotal - total) / 2
        return (
          <g key={i}>
            <text x={sx + STAGE_W / 2} y={16} textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1" fill={color} fontFamily="var(--font-mono)">
              {s.label}
            </text>
            {s.items.map((it, j) => {
              const by = y0 + j * (BOX_H + GAP_Y)
              return (
                <g key={j}>
                  <rect x={sx} y={by} width={STAGE_W} height={BOX_H} rx="10" fill="var(--card)" stroke="color-mix(in oklch, var(--border) 100%, transparent)" strokeWidth="1.4" />
                  <rect x={sx} y={by + 12} width="3" height={BOX_H - 24} rx="1.5" fill={color} />
                  <text x={sx + STAGE_W / 2 + 4} y={by + BOX_H / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--foreground)">
                    {it}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
