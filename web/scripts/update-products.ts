import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { attachIds } from '../src/seed/helpers'
import { buildProducts } from '../src/seed/content'

async function run() {
  const payload = await getPayload({ config })
  const zh = buildProducts('zh')
  const en = buildProducts('en')
  for (let i = 0; i < zh.length; i++) {
    const slug = zh[i].slug
    const found = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
    const existing = found.docs[0]
    if (!existing) {
      console.log('skip (not found):', slug)
      continue
    }
    // 就地更新（不传 cover，保留已设封面与文档 ID）
    const updated = await payload.update({ collection: 'products', id: existing.id, locale: 'zh', data: zh[i] as never })
    await payload.update({ collection: 'products', id: existing.id, locale: 'en', data: attachIds(en[i], updated) as never })
    console.log('updated:', slug)
  }
  console.log('✅ solutions content updated')
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
