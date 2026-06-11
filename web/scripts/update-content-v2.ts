import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 幂等地更新以下内容（每次启动都跑，覆写为代码指定值）：
 *  1) technology 页 EvoMetaX capabilityGrid：五大→六大（追加"隐私安全与合规架构"）
 *  2) safety 页 ctaBanner title："做家庭" → "做个人健康"
 *  3) safety 页 定位卡片："做家庭" → "做个人健康"
 *  4) 母婴安全 AI Agent：summary 加入七项能力清单，features 扩展到 7 项
 *  5) 运动健康：name/overview/summary/problem 更新
 *  6) InsureVertex：name/overview/tagline/summary/problem 更新
 *  7) IndustriaX：name/overview/tagline/summary/problem 更新
 */

const tag = '[update-content-v2]'

type Block = { id?: string; blockType?: string; title?: string; subtitle?: string; capabilities?: Cap[] }
type Cap = { id?: string; icon?: string; title?: string; description?: string }
type Product = { id: number; name?: string; tagline?: string; summary?: string; problem?: string; overview?: string; features?: Feat[] }
type Feat = { id?: string; title?: string; detail?: string; description?: string }

// ─── 常量 ─────────────────────────────────────────────────────────────────────

// EvoMetaX 六大模块完整列表（覆写模式，不做 append，避免 locale fallback 导致重复）
const EVOMETAX_ZH_CAPS = [
  { icon: 'database', title: '长期记忆', description: '理解历史轨迹、当前状态、变化趋势与个体化基线。' },
  { icon: 'layers', title: '多模态状态建模', description: '融合对话、打卡、检查、体征、睡眠、运动、营养、情绪等。' },
  { icon: 'workflow', title: 'AI Agent 工作流', description: '孕产、随访、产后、新生儿、心理、营养、康复、照护等专属 Agent。' },
  { icon: 'gauge', title: '风险分层与异常识别', description: '低风险科普 / 中风险随访 / 高风险就医 / 危机干预。' },
  { icon: 'shield', title: '可解释 AI 与医疗治理', description: '医院审核知识库、专家规则、建议依据、版本管理、全链路留痕。' },
  { icon: 'lock', title: '隐私安全与合规架构', description: '权限隔离、记忆隔离、数据脱敏、私有化部署与全链路审计，满足医疗数据合规要求。' },
]
const EVOMETAX_EN_CAPS = [
  { icon: 'database', title: 'Long-term memory', description: 'History, current state, trends and personalized baselines.' },
  { icon: 'layers', title: 'Multimodal modeling', description: 'Fuses dialogue, check-ins, reports, vitals, sleep, exercise, nutrition and mood.' },
  { icon: 'workflow', title: 'Agent workflows', description: 'Dedicated agents for maternity, follow-up, postpartum, mental health, nutrition, rehab and care.' },
  { icon: 'gauge', title: 'Risk tiering', description: 'Education / follow-up / referral / crisis intervention.' },
  { icon: 'shield', title: 'Explainable governance', description: 'Reviewed knowledge, expert rules, cited advice, versioning and full audit.' },
  { icon: 'lock', title: 'Privacy, security & compliance', description: 'Permission & memory isolation, data masking, private deployment and full-chain audit to meet healthcare data compliance.' },
]

const SAFETY_TITLE_ZH = '做专家的智能助手，做个人健康的长期支持'
const SAFETY_TITLE_EN = "The expert's assistant, the long-term support for personal health"
const POSITION_DESC_ZH = '做专家的智能助手，做个人健康的长期支持系统，做院外连续管理的 AI 基础设施。'
const POSITION_DESC_EN = "The expert's assistant, the long-term support for personal health, the infrastructure for out-of-clinic care."

const SPORTS = {
  zhName: '运动健康与营养代谢 AI Agent',
  enName: 'Sports & Nutrition AI Agent',
  zhOverview: '面向运动健康、主动健康与智慧营养场景，我们打造"运动健康与营养代谢 AI Agent"，围绕运动机能监测、营养代谢评估、个性化运动营养干预、健康长期状态跟踪、运动性疾病与损伤预警、智能配餐与营养品适配六大能力，帮助用户建立连续、动态、个性化的健康管理闭环。',
  enOverview: 'For active health and smart nutrition, our Sports & Nutrition AI Agent delivers six capabilities: fitness monitoring, metabolic assessment, personalized intervention, long-term health tracking, injury and sports-disease alerts, and intelligent meal & supplement planning — building a continuous, dynamic, personalized health management loop.',
  zhSummary: '面向运动医学、营养代谢与科研转化场景，融合多模态健康数据与长期机能档案，提供个性化运动营养建议、训练恢复分析、风险预警和专业个人运动健康&营养代谢 AI 助手。',
  enSummary: 'For sports medicine, metabolic nutrition and research translation — fusing multimodal health data with long-term performance profiles to deliver personalized sports-nutrition advice, training-recovery analysis, risk alerts and a professional personal sports-health & metabolic AI assistant.',
  zhProblem: '运动与营养数据零散、缺乏长期纵向理解。我们用长期记忆与多模态建模沉淀可研究、可干预的机能档案，建立连续、动态、个性化的健康管理闭环。',
  enProblem: 'Sports and nutrition data are fragmented and lack longitudinal understanding. We use memory and multimodal modeling to build researchable profiles and a continuous, dynamic, personalized health management loop.',
}

const INSURE = {
  zhName: '保智通 InsureVertex AI Agent',
  enName: 'InsureVertex AI Agent',
  zhOverview: '面向保险、财富管理等专业金融服务场景，我们打造金融服务 AI Agent，围绕专业知识问答、AI 销售训练、客户洞察分析与个性化方案生成，帮助金融从业人员提升专业服务能力和客户经营效率。该方案基于专业知识库、长期记忆与 Agent 工作流，能够为代理人、理财顾问、客户经理等角色提供产品知识解读、销售话术训练、客户需求分析、场景化沟通建议和定制化方案辅助。通过"学习—训练—沟通—方案—复盘"的闭环，金融服务 AI Agent 可持续提升团队的专业表达、客户转化、方案匹配和长期经营能力。',
  enOverview: "For insurance, wealth management and professional financial services, our Financial Services AI Agent covers professional Q&A, AI sales training, customer insight analysis and personalized proposal generation — helping financial professionals improve service quality and client management efficiency. Built on a professional knowledge base, long-term memory and agent workflows, it supports agents, advisors and relationship managers with product knowledge, sales coaching, client-needs analysis, contextual communication guidance and proposal assistance. The \"learn–train–communicate–propose–review\" loop continuously raises team capability in professional expression, conversion, proposal matching and long-term client development.",
  zhTagline: '技术底座的行业拓展：保险与财富管理专业金融服务 AI Agent',
  enTagline: 'Industry extension: AI Agent for insurance and wealth management',
  zhSummary: '面向保险、财富管理等专业金融服务场景，构建"知识问答—销售训练—客户洞察—方案生成"的 Agent 工作流，帮助金融从业人员提升专业表达、客户经营与方案转化能力。',
  enSummary: 'For insurance, wealth management and professional financial services — an Agent workflow spanning knowledge Q&A, sales training, customer insight and proposal generation, helping financial professionals improve professional expression, client management and conversion.',
  zhProblem: '金融从业人员面临专业知识快速更新、培训成本高、展业口径不一致等挑战。同一套技术底座在强监管行业落地负责任 AI：可追溯、可治理、人类监督前置。',
  enProblem: 'Financial professionals face rapidly evolving knowledge, high training costs and inconsistent client messaging. The same foundation deploys responsible, auditable, human-supervised AI in regulated industries.',
}

const MATERNAL = {
  zhSummary: '从孕妇建册/医院建档开始，覆盖孕期、分娩、产后恢复、新生儿照护与 0–1 岁成长发育，提供孕周科普 · 产检提醒与准备 · 报告解释辅助 · 血压/血糖/体重/胎动记录 · 饮食运动睡眠提醒 · 异常症状主动追问 · 分层就医引导等全程支持。',
  enSummary: 'From hospital registration through pregnancy, delivery, postpartum recovery, newborn care and 0–1 development — weekly education, checkup reminders & prep, report interpretation, BP/glucose/weight/fetal-movement logging, diet/exercise/sleep reminders, proactive symptom follow-up, and tiered referral guidance.',
  zhFeatures: [
    { title: '孕周科普与产检提醒准备', description: '建档后按孕周推送科普内容，并提前提醒产检时间与注意事项。' },
    { title: '报告解释辅助', description: '产检报告关键指标解读与异常提示，帮助孕妇理解检查结果。' },
    { title: '多维健康记录', description: '血压、血糖、体重、胎动、饮食、运动、睡眠等结构化打卡与趋势追踪。' },
    { title: '异常症状主动追问', description: '对录入的异常症状主动追问细节，辅助早期风险识别。' },
    { title: '分层就医引导', description: '根据风险分级给出居家观察、门诊复查或急诊就医的分层建议。' },
    { title: '高危随访与分层管理', description: '高危孕产妇随访提醒，医护端分层管理看板。' },
    { title: '产后与新生儿照护', description: '分娩准备、产后恢复、母乳喂养、新生儿照护与 0–1 岁发育提醒。' },
  ],
  enFeatures: [
    { title: 'Weekly education & checkup prep', description: 'Week-based education and advance checkup reminders with preparation tips after registration.' },
    { title: 'Report interpretation', description: 'Key indicator explanation and anomaly flagging on prenatal reports to help mothers understand results.' },
    { title: 'Multi-dimensional health logging', description: 'Structured logging of BP, glucose, weight, fetal movement, diet, exercise and sleep with trend tracking.' },
    { title: 'Proactive symptom follow-up', description: 'Proactively follows up on reported symptoms to capture details and support early risk detection.' },
    { title: 'Tiered referral guidance', description: 'Tiered guidance — home observation, outpatient review or emergency visit — based on risk level.' },
    { title: 'High-risk follow-up & tiering', description: 'Follow-up reminders for high-risk pregnancies and a tiered management dashboard for clinicians.' },
    { title: 'Postpartum & newborn care', description: 'Delivery prep, postpartum recovery, breastfeeding, newborn care and 0–1 development guidance.' },
  ],
}

const INDUSTRIA = {
  zhName: 'IndustriaX 产业智能应用场景',
  enName: 'IndustriaX',
  zhOverview: '用 AI 重构市场感知、工程研发与业务决策效率，提升中国先进制造业的市场快速精准反应力，解决中国制造业从「制造效率」走向研发效率 · 业务决策效率 · 市场快速反应力的问题。',
  enOverview: 'Rebuilding market sensing, R&D and business-decision efficiency with AI — improving rapid, precise market response for advanced Chinese manufacturing, moving the industry beyond production efficiency toward R&D efficiency, decision efficiency and market agility.',
  zhTagline: 'AI 技术底座的跨行业拓展：面向先进制造业的产业智能 AI 应用场景',
  enTagline: 'Cross-industry AI extension: intelligent AI applications for advanced manufacturing',
  zhSummary: 'AI 技术底座的跨行业拓展：面向先进制造业的产业智能 AI 应用场景。用 AI 重构市场感知、工程研发与业务决策效率，提升中国先进制造业的市场快速精准反应力。',
  enSummary: 'Cross-industry extension of the AI foundation: intelligent AI applications for advanced manufacturing. Rebuilding market sensing, R&D and business-decision efficiency to improve rapid, precise market response.',
  zhProblem: '中国制造业亟需从「制造效率」走向研发效率 · 业务决策效率 · 市场快速反应力。工业知识分散，经验难以沉淀。我们用 AI 把分散知识变为可复用资产，支持私有化部署与安全合规。',
  enProblem: "Chinese manufacturing needs to move beyond production efficiency toward R&D efficiency, decision efficiency and market agility. Industrial knowledge is scattered; we turn it into reusable assets with private, compliant deployment.",
}

// ─── 辅助函数 ─────────────────────────────────────────────────────────────────

async function findPage(payload: Awaited<ReturnType<typeof getPayload>>, slug: string, locale: 'zh' | 'en') {
  const res = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, locale, depth: 0, limit: 1 })
  return res.docs[0]
}

async function findProduct(payload: Awaited<ReturnType<typeof getPayload>>, slug: string, locale: 'zh' | 'en') {
  const res = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, locale, depth: 0, limit: 1 })
  return res.docs[0] as Product | undefined
}

// ─── 1. EvoMetaX 六大技术模块 ──────────────────────────────────────────────────
// 覆写模式：始终将 capabilities 重置为完整的 6 项，避免 locale fallback 导致重复追加

async function addSixthModule(payload: Awaited<ReturnType<typeof getPayload>>) {
  const zhPage = await findPage(payload, 'technology', 'zh')
  if (!zhPage) { console.warn(`${tag} ⚠ technology 页未找到`); return }

  const zhLayout = (zhPage.layout ?? []) as Block[]
  const gridBlock = zhLayout.find((b) => b.blockType === 'capabilityGrid' && (b.title ?? '').includes('EvoMetaX'))
  if (!gridBlock) { console.warn(`${tag} ⚠ EvoMetaX capabilityGrid 未找到`); return }

  // 1) zh：整体覆写为 6 项（capabilities 数组非 localized，此处会删除旧行、重建新行）
  const newZhLayout = zhLayout.map((b) =>
    b.id !== gridBlock.id ? b : { ...b, title: 'EvoMetaX 六大技术模块', capabilities: EVOMETAX_ZH_CAPS },
  )
  await payload.update({ collection: 'pages', id: zhPage.id, locale: 'zh', data: { layout: newZhLayout } as never })

  // 2) 回读 zh，拿到刚生成的 capabilities 行 id —— en 更新必须带上这些 id，
  //    否则 Payload 找不到匹配行会「删除重建」，连带级联删除 zh 的 title/description（中文表格变空）。
  const zhAfter = await payload.findByID({ collection: 'pages', id: zhPage.id, locale: 'zh', depth: 0 })
  const zhGrid = ((zhAfter.layout ?? []) as Block[]).find((b) => b.id === gridBlock.id)
  const capIds = (zhGrid?.capabilities ?? []).map((c) => c.id)
  if (capIds.length !== EVOMETAX_EN_CAPS.length) {
    throw new Error(`${tag} ❌ EvoMetaX 行 id 数量(${capIds.length}) 与 en 模块数(${EVOMETAX_EN_CAPS.length}) 不一致`)
  }

  // 3) en：带上同一批行 id「就地更新」，只补 en 的 title/description，保留 zh 文本
  const enCapsWithIds = EVOMETAX_EN_CAPS.map((c, i) => ({ id: capIds[i], ...c }))
  const enPage = await payload.findByID({ collection: 'pages', id: zhPage.id, locale: 'en', depth: 0 })
  const newEnLayout = ((enPage.layout ?? []) as Block[]).map((b) =>
    b.id !== gridBlock.id ? b : { ...b, title: 'Six EvoMetaX modules', capabilities: enCapsWithIds },
  )
  await payload.update({ collection: 'pages', id: zhPage.id, locale: 'en', data: { layout: newEnLayout } as never })

  // 4) 回读断言：zh 第 6 项必须有中文 title（防止再次空表）
  const verify = await payload.findByID({ collection: 'pages', id: zhPage.id, locale: 'zh', depth: 0 })
  const vGrid = ((verify.layout ?? []) as Block[]).find((b) => b.id === gridBlock.id)
  const vCaps = vGrid?.capabilities ?? []
  console.log(`${tag} EvoMetaX zh 回读：${vCaps.length} 项，标题=${JSON.stringify(vCaps.map((c) => c.title))}`)
  if (vCaps.length !== 6 || vCaps.some((c) => !c.title)) {
    throw new Error(`${tag} ❌ EvoMetaX zh 写入异常：期望 6 项且均有中文标题`)
  }
  console.log(`${tag} ✅ EvoMetaX 六大模块覆写完成（zh 文本已校验）`)
}

// ─── 2 & 3. Safety 页 ─────────────────────────────────────────────────────────

async function updateSafetyPage(payload: Awaited<ReturnType<typeof getPayload>>) {
  const zhPage = await findPage(payload, 'safety', 'zh')
  if (!zhPage) { console.warn(`${tag} ⚠ safety 页未找到`); return }

  const zhLayout = (zhPage.layout ?? []) as Block[]
  let changed = false
  const newZhLayout = zhLayout.map((b) => {
    // ctaBanner
    if (b.blockType === 'ctaBanner' && (b.title ?? '').includes('做专家')) {
      changed = true
      return { ...b, title: SAFETY_TITLE_ZH }
    }
    // valueProps 里的定位卡片（blockType: 'valueProps'）
    if (b.blockType === 'valueProps') {
      const items = (b as { items?: { id?: string; title?: string; description?: string }[] }).items ?? []
      const newItems = items.map((item) =>
        item.title === '定位' ? { ...item, description: POSITION_DESC_ZH } : item
      )
      return { ...b, items: newItems }
    }
    return b
  })
  if (changed) {
    await payload.update({ collection: 'pages', id: zhPage.id, locale: 'zh', data: { layout: newZhLayout } as never })

    const enPage = await payload.findByID({ collection: 'pages', id: zhPage.id, locale: 'en', depth: 0 })
    const newEnLayout = ((enPage.layout ?? []) as Block[]).map((b) => {
      if (b.blockType === 'ctaBanner' && (b.title ?? '').includes("expert's")) {
        return { ...b, title: SAFETY_TITLE_EN }
      }
      if (b.blockType === 'valueProps') {
        const items = (b as { items?: { id?: string; title?: string; description?: string }[] }).items ?? []
        const newItems = items.map((item) =>
          item.title === 'Position' ? { ...item, description: POSITION_DESC_EN } : item
        )
        return { ...b, items: newItems }
      }
      return b
    })
    await payload.update({ collection: 'pages', id: zhPage.id, locale: 'en', data: { layout: newEnLayout } as never })
    console.log(`${tag} ✅ safety 页文案更新完成`)
  } else {
    console.log(`${tag} safety 页已是新文案，跳过`)
  }
}

// ─── 通用 product 更新 ─────────────────────────────────────────────────────────

async function updateProduct(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  zh: Partial<Product>,
  en: Partial<Product>,
) {
  const zhDoc = await findProduct(payload, slug, 'zh')
  if (!zhDoc) { console.warn(`${tag} ⚠ product slug=${slug} 未找到`); return }

  await payload.update({ collection: 'products', id: zhDoc.id, locale: 'zh', data: zh as never })
  await payload.update({ collection: 'products', id: zhDoc.id, locale: 'en', data: en as never })
  console.log(`${tag} ✅ product[${slug}] 更新完成`)
}

// ─── solutions 排序：运动健康置顶，其余顺延 ──────────────────────────────────────
// order 字段非 localized，按 slug 直接覆写即可
const SOLUTION_ORDER: Record<string, number> = {
  'sports-nutrition': 1,
  'perinatal-mental-health': 2,
  'maternal-care': 3,
  'youth-mental-health': 4,
  'adult-wellness': 5,
  'elderly-care': 6,
  'insurevertex-ai': 7,
  'industriax': 8,
}

async function updateSolutionOrder(payload: Awaited<ReturnType<typeof getPayload>>) {
  for (const [slug, order] of Object.entries(SOLUTION_ORDER)) {
    const doc = await findProduct(payload, slug, 'zh')
    if (!doc) { console.warn(`${tag} ⚠ 排序：product slug=${slug} 未找到`); continue }
    await payload.update({ collection: 'products', id: doc.id, data: { order } as never })
  }
  console.log(`${tag} ✅ solutions 排序更新完成（运动健康置顶）`)
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function run() {
  const payload = await getPayload({ config })

  await addSixthModule(payload)
  await updateSafetyPage(payload)

  // 母婴安全
  await updateProduct(payload, 'maternal-care',
    { summary: MATERNAL.zhSummary, features: MATERNAL.zhFeatures as never },
    { summary: MATERNAL.enSummary, features: MATERNAL.enFeatures as never },
  )

  // 运动健康
  await updateProduct(payload, 'sports-nutrition',
    { name: SPORTS.zhName, overview: SPORTS.zhOverview, summary: SPORTS.zhSummary, problem: SPORTS.zhProblem },
    { name: SPORTS.enName, overview: SPORTS.enOverview, summary: SPORTS.enSummary, problem: SPORTS.enProblem },
  )

  // 保智通
  await updateProduct(payload, 'insurevertex-ai',
    { name: INSURE.zhName, overview: INSURE.zhOverview, tagline: INSURE.zhTagline, summary: INSURE.zhSummary, problem: INSURE.zhProblem },
    { name: INSURE.enName, overview: INSURE.enOverview, tagline: INSURE.enTagline, summary: INSURE.enSummary, problem: INSURE.enProblem },
  )

  // IndustriaX
  await updateProduct(payload, 'industriax',
    { name: INDUSTRIA.zhName, overview: INDUSTRIA.zhOverview, tagline: INDUSTRIA.zhTagline, summary: INDUSTRIA.zhSummary, problem: INDUSTRIA.zhProblem },
    { name: INDUSTRIA.enName, overview: INDUSTRIA.enOverview, tagline: INDUSTRIA.enTagline, summary: INDUSTRIA.enSummary, problem: INDUSTRIA.enProblem },
  )

  // solutions 排序
  await updateSolutionOrder(payload)

  console.log(`${tag} ✅ all done`)
  process.exit(0)
}

run().catch((e) => {
  console.error(`${tag} ❌`, e)
  process.exit(1)
})
