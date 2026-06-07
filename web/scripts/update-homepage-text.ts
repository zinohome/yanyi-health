import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 幂等地更新首页文案（每次启动都跑，覆写为代码指定值）：
 *  1) hero 块：title / subtitle（zh + en）
 *  2) contentMedia "我们解决的问题"：body（zh + en）
 */

const ZH_HERO_TITLE = '专注医疗健康AI智能体，以专业医学护航全周期身心健康'
const EN_HERO_TITLE = 'Focused healthcare AI agents, delivering professional medical guidance for whole-life wellbeing'

const ZH_HERO_SUBTITLE =
  '依托AI智能体、长效记忆系统、多模态状态建模、风险分层及专家协同体系，助力医疗机构与科研平台，推动专业医疗服务能力走出院内、覆盖院外，实现从单次问诊到长周期健康管理的升级。'
const EN_HERO_SUBTITLE =
  'Built on AI agents, persistent memory, multimodal modeling, risk tiering and expert collaboration, we help healthcare institutions and research platforms extend professional medical capabilities beyond the clinic — from a single visit to long-term health management.'

const ZH_PROBLEM_BODY =
  '医疗机构专注于疾病诊断与临床治疗，大众大量健康状态管理需求，仍普遍存在于院外场景：产检间隙、术后康复、儿童成长、青少年情绪疏导、成人压力与睡眠调理、运动康复、老年独居及慢病日常照护等。\n\n此类健康诉求无法依靠单次问诊解决，需要长期追踪、持续干预、风险分层识别、专业健康科普与专家协同支撑。研翌科技以AI智能体、长效记忆系统为核心，填补院外连续健康状态管理的服务空白。'
const EN_PROBLEM_BODY =
  'Healthcare institutions focus on diagnosis and clinical treatment, while broad health management needs remain in out-of-clinic settings: between prenatal checkups, post-surgery recovery, child development, adolescent emotional support, adult stress and sleep, rehabilitation, and daily care for seniors and chronic patients.\n\nThese needs cannot be resolved through single visits — they require long-term tracking, continuous intervention, risk stratification, health education and expert collaboration. Yanyi Technology uses AI agents and persistent memory systems to fill the gap in continuous out-of-clinic health management.'

type Block = { id?: string; blockType?: string; title?: string; subtitle?: string; body?: string }

async function run() {
  const payload = await getPayload({ config })

  // 找到首页（按 slug）
  const pages = await payload.find({ collection: 'pages', locale: 'zh', depth: 0, limit: 100 })
  const page = pages.docs.find((p) => (p as { slug?: string }).slug === 'home')
  if (!page) {
    console.log('[update-homepage-text] 未找到首页，跳过')
    process.exit(0)
  }

  const layout = (page.layout ?? []) as Block[]
  const heroBlock = layout.find((b) => b.blockType === 'hero')
  const problemBlock = layout.find((b) => b.blockType === 'contentMedia' && b.title === '我们解决的问题')

  // ——— 更新 zh ———
  const zhLayout = layout.map((b) => ({ ...b }))

  const zhHero = zhLayout.find((b) => b.blockType === 'hero')
  if (zhHero) {
    zhHero.title = ZH_HERO_TITLE
    zhHero.subtitle = ZH_HERO_SUBTITLE
  }

  const zhProblem = zhLayout.find((b) => b.blockType === 'contentMedia' && (b.title === '我们解决的问题' || b.id === problemBlock?.id))
  if (zhProblem) {
    zhProblem.body = ZH_PROBLEM_BODY
  }

  await payload.update({ collection: 'pages', id: page.id, locale: 'zh', data: { layout: zhLayout } as never })
  console.log('[update-homepage-text] zh 写入完成')

  // ——— 更新 en ———
  const enPage = await payload.findByID({ collection: 'pages', id: page.id, locale: 'en', depth: 0 })
  const enLayout = ((enPage.layout ?? []) as Block[]).map((b) => ({ ...b }))

  const enHero = enLayout.find((b) => b.blockType === 'hero')
  if (enHero) {
    enHero.title = EN_HERO_TITLE
    enHero.subtitle = EN_HERO_SUBTITLE
  }

  const enProblem = enLayout.find((b) => b.blockType === 'contentMedia' && b.id === problemBlock?.id)
  if (enProblem) {
    enProblem.body = EN_PROBLEM_BODY
  }

  await payload.update({ collection: 'pages', id: page.id, locale: 'en', data: { layout: enLayout } as never })
  console.log('[update-homepage-text] en 写入完成')

  console.log('[update-homepage-text] ✅ done')
  process.exit(0)
}

run().catch((e) => {
  console.error('[update-homepage-text] ❌', e)
  process.exit(1)
})
