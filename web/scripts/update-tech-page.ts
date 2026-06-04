import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { attachIds } from '../src/seed/helpers'
import { buildTechnology } from '../src/seed/pages'

async function run() {
  const payload = await getPayload({ config })
  await payload.delete({ collection: 'pages', where: { slug: { equals: 'technology' } } })
  const zh = buildTechnology('zh')
  const en = buildTechnology('en')
  const doc = await payload.create({ collection: 'pages', locale: 'zh', data: zh as never })
  await payload.update({ collection: 'pages', id: doc.id, locale: 'en', data: attachIds(en, doc) as never })
  console.log('✅ technology page updated')
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
