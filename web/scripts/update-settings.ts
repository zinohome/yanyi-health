import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { buildSiteSettings } from '../src/seed/content'

async function run() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'zh', data: buildSiteSettings('zh') as never })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: buildSiteSettings('en') as never })
  console.log('✅ site settings updated')
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
