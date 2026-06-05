import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 仅更新站点设置中的联系邮箱（不动其它字段）。
 * 用法（容器内）：
 *   NEW_EMAIL=contact@yanyi-ai.com node --import=tsx/esm scripts/update-email.ts
 * 不传 NEW_EMAIL 时默认 contact@yanyi-ai.com。
 */
const EMAIL = process.env.NEW_EMAIL || 'contact@yanyi-ai.com'

async function run() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({ slug: 'site-settings', data: { email: EMAIL } })
  console.log('✅ 站点设置邮箱已更新为：', EMAIL)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
