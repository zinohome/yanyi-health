import 'dotenv/config'
import { getPayload, type CollectionSlug } from 'payload'
import config from '../payload.config'
import { attachIds } from './helpers'
import {
  buildSiteSettings,
  categories,
  buildProducts,
  buildCases,
  buildTeam,
  buildJobs,
  buildPosts,
} from './content'
import {
  buildHome,
  buildTechnology,
  buildAbout,
  buildClinical,
  buildSafety,
  buildResources,
} from './pages'

async function main() {
  const payload = await getPayload({ config })

  // 创建 zh，再注入 id 后用 en 更新本地化字段
  async function create(collection: CollectionSlug, zh: Record<string, unknown>, en: Record<string, unknown>) {
    const doc = await payload.create({ collection, locale: 'zh', data: zh as never })
    const enData = attachIds(en, doc)
    await payload.update({ collection, id: doc.id, locale: 'en', data: enData as never })
    return doc
  }

  async function clear(collection: CollectionSlug) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }

  const collectionsToClear: CollectionSlug[] = [
    'pages',
    'products',
    'posts',
    'cases',
    'team',
    'jobs',
    'categories',
  ]
  for (const c of collectionsToClear) await clear(c)
  console.log('cleared existing content')

  // 分类
  const catMap: Record<string, number> = {}
  for (const cat of categories) {
    const doc = await create('categories', { slug: cat.slug, ...cat.build('zh') }, { slug: cat.slug, ...cat.build('en') })
    catMap[cat.slug] = doc.id as number
  }

  // 解决方案（捕获 id 用于首页分组）
  const zhProducts = buildProducts('zh')
  const enProducts = buildProducts('en')
  const solutionIds: Record<string, number> = {}
  for (let i = 0; i < zhProducts.length; i++) {
    const doc = await create('products', zhProducts[i], enProducts[i])
    solutionIds[zhProducts[i].slug] = doc.id as number
  }
  const ids = {
    health: [
      'maternal-care',
      'perinatal-mental-health',
      'youth-mental-health',
      'adult-wellness',
      'sports-nutrition',
      'elderly-care',
    ].map((s) => solutionIds[s]),
    industry: ['insurevertex-ai', 'industriax'].map((s) => solutionIds[s]),
  }

  // 案例
  const zhCases = buildCases('zh')
  const enCases = buildCases('en')
  for (let i = 0; i < zhCases.length; i++) await create('cases', zhCases[i], enCases[i])

  // 团队
  const zhTeam = buildTeam('zh')
  const enTeam = buildTeam('en')
  for (let i = 0; i < zhTeam.length; i++) await create('team', zhTeam[i], enTeam[i])

  // 招聘
  const zhJobs = buildJobs('zh')
  const enJobs = buildJobs('en')
  for (let i = 0; i < zhJobs.length; i++) await create('jobs', zhJobs[i], enJobs[i])

  // 资讯
  const zhPosts = buildPosts('zh')
  const enPosts = buildPosts('en')
  for (let i = 0; i < zhPosts.length; i++) {
    const { categoryKey: zk, ...zh } = zhPosts[i]
    const { categoryKey: _ek, ...en } = enPosts[i]
    void _ek
    await create('posts', { ...zh, category: catMap[zk] }, { ...en, category: catMap[zk] })
  }

  // 页面
  const pages = [
    [buildHome('zh', ids), buildHome('en', ids)],
    [buildTechnology('zh'), buildTechnology('en')],
    [buildAbout('zh'), buildAbout('en')],
    [buildClinical('zh'), buildClinical('en')],
    [buildSafety('zh'), buildSafety('en')],
    [buildResources('zh'), buildResources('en')],
  ] as const
  for (const [zh, en] of pages) await create('pages', zh, en)

  // 全局：站点设置
  await payload.updateGlobal({ slug: 'site-settings', locale: 'zh', data: buildSiteSettings('zh') as never })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: buildSiteSettings('en') as never })

  console.log('✅ Seed complete')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
