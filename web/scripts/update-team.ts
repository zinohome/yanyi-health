import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { buildTeam } from '../src/seed/content'

async function run() {
  const payload = await getPayload({ config })
  // 清空并重建团队
  await payload.delete({ collection: 'team', where: { id: { exists: true } } })
  const zh = buildTeam('zh')
  const en = buildTeam('en')
  for (let i = 0; i < zh.length; i++) {
    const doc = await payload.create({ collection: 'team', locale: 'zh', data: zh[i] as never })
    await payload.update({ collection: 'team', id: doc.id, locale: 'en', data: en[i] as never })
  }
  console.log(`✅ team updated (${zh.length})`)
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
