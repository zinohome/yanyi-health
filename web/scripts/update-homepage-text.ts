import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 幂等地更新首页文案（每次启动都跑，覆写为代码指定值）：
 *  1) hero 块：title / subtitle（zh + en）
 *  2) contentMedia "我们解决的问题"：body（zh + en）
 *
 * 设计原则：
 *  - 按 slug 精确查询（与前台 getPage 一致），找不到 → 抛错（不静默跳过）
 *  - 写入后「回读」并断言，日志直接打印实际落库值，杜绝"假成功"
 */

const ZH_HERO_TITLE = '专注医疗健康AI智能体\n以专业医学护航全周期身心健康'
const EN_HERO_TITLE = 'Focused healthcare AI agents, delivering professional medical guidance for whole-life wellbeing'

const ZH_HERO_SUBTITLE =
  '依托AI智能体、长效记忆系统、多模态状态建模、风险分层及专家协同体系，助力医疗机构与科研平台，推动专业医疗服务能力走出院内、覆盖院外，实现从单次问诊到长周期健康管理的升级。'
const EN_HERO_SUBTITLE =
  'Built on AI agents, persistent memory, multimodal modeling, risk tiering and expert collaboration, we help healthcare institutions and research platforms extend professional medical capabilities beyond the clinic — from a single visit to long-term health management.'

const ZH_PROBLEM_BODY =
  '医疗机构专注于疾病诊断与临床治疗，大众大量健康状态管理需求，仍普遍存在于院外场景：产检间隙、术后康复、儿童成长、青少年情绪疏导、成人压力与睡眠调理、运动康复、老年独居及慢病日常照护等。\n\n此类健康诉求无法依靠单次问诊解决，需要长期追踪、持续干预、风险分层识别、专业健康科普与专家协同支撑。研翌科技以AI智能体、长效记忆系统为核心，填补院外连续健康状态管理的服务空白。'
const EN_PROBLEM_BODY =
  'Healthcare institutions focus on diagnosis and clinical treatment, while broad health management needs remain in out-of-clinic settings: between prenatal checkups, post-surgery recovery, child development, adolescent emotional support, adult stress and sleep, rehabilitation, and daily care for seniors and chronic patients.\n\nThese needs cannot be resolved through single visits — they require long-term tracking, continuous intervention, risk stratification, health education and expert collaboration. Yanyi Technology uses AI agents and persistent memory systems to fill the gap in continuous out-of-clinic health management.'

type Block = {
  id?: string
  blockType?: string
  title?: string
  subtitle?: string
  body?: string
}

const tag = '[update-homepage-text]'

async function findHome(payload: Awaited<ReturnType<typeof getPayload>>, locale: 'zh' | 'en') {
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale,
    depth: 0,
    limit: 1,
  })
  return res.docs[0]
}

async function run() {
  const payload = await getPayload({ config })

  const zhPage = await findHome(payload, 'zh')
  if (!zhPage) {
    // 不静默跳过：抛错让 auto-init 失败、容器日志醒目可见
    throw new Error(`${tag} 未找到 slug='home' 的页面（pages 集合）`)
  }
  const pageId = zhPage.id
  const zhLayout = ((zhPage.layout ?? []) as Block[]).map((b) => ({ ...b }))

  console.log(`${tag} 命中首页 id=${pageId}，layout 块数=${zhLayout.length}`)
  const beforeHero = zhLayout.find((b) => b.blockType === 'hero')
  console.log(`${tag} 改前 hero.title(zh) = ${JSON.stringify(beforeHero?.title)}`)

  // 定位 hero / contentMedia(我们解决的问题)
  const heroIdx = zhLayout.findIndex((b) => b.blockType === 'hero')
  const problemIdx = zhLayout.findIndex(
    (b) => b.blockType === 'contentMedia' && b.title === '我们解决的问题',
  )
  if (heroIdx === -1) throw new Error(`${tag} 首页未找到 hero 块`)
  if (problemIdx === -1) console.warn(`${tag} ⚠ 未找到 "我们解决的问题" contentMedia 块（跳过其 body 更新）`)

  // ——— zh ———
  zhLayout[heroIdx] = { ...zhLayout[heroIdx], title: ZH_HERO_TITLE, subtitle: ZH_HERO_SUBTITLE }
  if (problemIdx !== -1) zhLayout[problemIdx] = { ...zhLayout[problemIdx], body: ZH_PROBLEM_BODY }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'zh',
    data: { layout: zhLayout } as never,
  })

  // 回读断言 zh
  const zhAfter = await payload.findByID({ collection: 'pages', id: pageId, locale: 'zh', depth: 0 })
  const zhAfterHero = ((zhAfter.layout ?? []) as Block[]).find((b) => b.blockType === 'hero')
  console.log(`${tag} 改后 hero.title(zh) = ${JSON.stringify(zhAfterHero?.title)}`)
  if (zhAfterHero?.title !== ZH_HERO_TITLE) {
    throw new Error(`${tag} ❌ zh 写入未生效！回读值与期望不一致`)
  }
  console.log(`${tag} ✅ zh 写入已校验`)

  // ——— en（按 id 对齐就地写入）———
  const enPage = await payload.findByID({ collection: 'pages', id: pageId, locale: 'en', depth: 0 })
  const enLayout = ((enPage.layout ?? []) as Block[]).map((b) => ({ ...b }))
  const enHeroIdx = enLayout.findIndex((b) => b.blockType === 'hero')
  const enProblemIdx = enLayout.findIndex((b) => b.id === zhLayout[problemIdx]?.id)
  if (enHeroIdx !== -1) {
    enLayout[enHeroIdx] = { ...enLayout[enHeroIdx], title: EN_HERO_TITLE, subtitle: EN_HERO_SUBTITLE }
  }
  if (problemIdx !== -1 && enProblemIdx !== -1) {
    enLayout[enProblemIdx] = { ...enLayout[enProblemIdx], body: EN_PROBLEM_BODY }
  }

  await payload.update({
    collection: 'pages',
    id: pageId,
    locale: 'en',
    data: { layout: enLayout } as never,
  })

  const enAfter = await payload.findByID({ collection: 'pages', id: pageId, locale: 'en', depth: 0 })
  const enAfterHero = ((enAfter.layout ?? []) as Block[]).find((b) => b.blockType === 'hero')
  console.log(`${tag} 改后 hero.title(en) = ${JSON.stringify(enAfterHero?.title)}`)

  console.log(`${tag} ✅ done`)
  process.exit(0)
}

run().catch((e) => {
  console.error(`${tag} ❌`, e)
  process.exit(1)
})
