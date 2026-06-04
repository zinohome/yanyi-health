import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { buildSiteSettings } from '../src/seed/content'

async function run() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'zh', data: buildSiteSettings('zh') as never })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: buildSiteSettings('en') as never })
  console.log('✅ site settings updated')

  // 若存在微信二维码图，自动上传并设为 wechatQR
  const qrCandidates = ['public/wechat-qr.png', 'public/wechat-qr.jpg', 'public/scenes/wechat-qr.png']
  const qrPath = qrCandidates.map((p) => path.resolve(process.cwd(), p)).find((p) => fs.existsSync(p))
  if (qrPath) {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: '微信二维码' } }, limit: 20, locale: 'zh' })
    for (const m of existing.docs) await payload.delete({ collection: 'media', id: m.id })
    const media = await payload.create({ collection: 'media', locale: 'zh', filePath: qrPath, data: { alt: '微信二维码' } })
    await payload.update({ collection: 'media', id: media.id, locale: 'en', data: { alt: 'WeChat QR' } })
    await payload.updateGlobal({ slug: 'site-settings', data: { wechatQR: media.id } as never })
    console.log('✅ WeChat QR attached:', qrPath)
  } else {
    console.log('ℹ️ 未发现微信二维码图（放到 web/public/wechat-qr.png 后重跑本脚本即可）')
  }
  process.exit(0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
