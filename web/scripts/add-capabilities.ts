import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 幂等地往指定 capabilityGrid 网格追加一项（按网格标题定位，不动其它内容）。
 * - 我们的核心能力 → 实时语音交互
 * - 合作方向 → 老年照护与慢病管理
 *
 * 关键点：Payload 本地化数组按 id 对齐。
 *  1) 先确保 zh 有该行（无则追加并更新），拿到行 id；
 *  2) 再「就地写入」en 的本地化字段——该行在 en 里其实已存在（读取时回退显示 zh），
 *     所以不能用"是否存在"判断，必须按 id 找到后写入英文值，否则英文会回退成中文。
 */
const TARGETS = [
  {
    grid: '我们的核心能力',
    icon: 'mic',
    zhT: '实时语音交互',
    enT: 'Real-time voice',
    zhD: '流式语音识别与合成，支持自然语音陪伴、随访问诊与多端接入。',
    enD: 'Streaming ASR & TTS for natural voice companionship, follow-up and multi-channel access.',
  },
  {
    grid: '合作方向',
    icon: 'users',
    zhT: '老年照护与慢病管理',
    enT: 'Elderly & chronic care',
    zhD: '独居老人日常状态记录、用药复诊提醒、情绪陪伴与家庭—社区协同。',
    enD: 'Daily check-ins, medication & follow-up reminders, companionship and family-community coordination.',
  },
]

type Cap = { id?: string; icon?: string; title?: string; description?: string }
type Block = { id?: string; blockType?: string; title?: string; capabilities?: Cap[] }

async function run() {
  const payload = await getPayload({ config })

  for (const target of TARGETS) {
    const all = await payload.find({ collection: 'pages', locale: 'zh', depth: 0, limit: 100 })
    const page = all.docs.find((p) =>
      ((p.layout as Block[] | undefined) ?? []).some(
        (b) => b.blockType === 'capabilityGrid' && b.title === target.grid,
      ),
    )
    if (!page) {
      console.log('skip (grid not found):', target.grid)
      continue
    }

    // 1) 确保 zh 有该行
    let zhDoc = page
    let zhBlock = (zhDoc.layout as Block[]).find(
      (b) => b.blockType === 'capabilityGrid' && b.title === target.grid,
    )!
    let row = (zhBlock.capabilities ?? []).find((c) => c.title === target.zhT)
    if (!row) {
      const zhLayout = (zhDoc.layout as Block[]).map((b) => ({
        ...b,
        capabilities: b.capabilities ? [...b.capabilities] : b.capabilities,
      }))
      const blk = zhLayout.find((b) => b.id === zhBlock.id)!
      blk.capabilities = [
        ...(blk.capabilities ?? []),
        { icon: target.icon, title: target.zhT, description: target.zhD },
      ]
      await payload.update({ collection: 'pages', id: page.id, locale: 'zh', data: { layout: zhLayout } as never })
      zhDoc = await payload.findByID({ collection: 'pages', id: page.id, locale: 'zh', depth: 0 })
      zhBlock = (zhDoc.layout as Block[]).find((b) => b.id === blk.id)!
      row = (zhBlock.capabilities ?? []).find((c) => c.title === target.zhT)
      console.log('zh appended:', target.grid, '→', target.zhT)
    } else {
      console.log('zh already has:', target.grid, '→', target.zhT)
    }
    const newId = row?.id
    if (!newId) {
      console.log('warn: 未取到行 id:', target.grid)
      continue
    }

    // 2) 就地写入 en 英文值（按 id 定位）
    const enDoc = await payload.findByID({ collection: 'pages', id: page.id, locale: 'en', depth: 0 })
    const enLayout = (enDoc.layout as Block[]).map((b) => ({
      ...b,
      capabilities: b.capabilities ? b.capabilities.map((c) => ({ ...c })) : b.capabilities,
    }))
    const enBlock = enLayout.find((b) => b.id === zhBlock.id)!
    const enRow = (enBlock.capabilities ?? []).find((c) => c.id === newId)
    if (enRow) {
      enRow.icon = target.icon
      enRow.title = target.enT
      enRow.description = target.enD
    } else {
      enBlock.capabilities = [
        ...(enBlock.capabilities ?? []),
        { id: newId, icon: target.icon, title: target.enT, description: target.enD },
      ]
    }
    await payload.update({ collection: 'pages', id: page.id, locale: 'en', data: { layout: enLayout } as never })
    console.log('✅ en 写入完成:', target.grid, '→', target.enT)
  }

  console.log('✅ done')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
