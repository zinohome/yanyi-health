import 'dotenv/config'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const items: { slug: string; file: string; zh: string; en: string }[] = [
  { slug: 'maternal-care', file: 'maternal-care.jpg', zh: '母婴关怀', en: 'Maternal & infant care' },
  { slug: 'perinatal-mental-health', file: 'perinatal-mental-health.jpg', zh: '围产期身心支持', en: 'Perinatal well-being' },
  { slug: 'youth-mental-health', file: 'youth-mental-health.jpg', zh: '青少年心理健康', en: 'Youth mental health' },
  { slug: 'adult-wellness', file: 'adult-wellness.jpg', zh: '成人身心健康', en: 'Adult well-being' },
  { slug: 'sports-nutrition', file: 'sports-nutrition.jpg', zh: '运动健康与营养', en: 'Sports & nutrition' },
  { slug: 'elderly-care', file: 'elderly-care.jpg', zh: '老年照护与陪伴', en: 'Elderly care & companionship' },
]

async function run() {
  const payload = await getPayload({ config })
  for (const it of items) {
    const filePath = path.resolve(process.cwd(), 'public/scenes', it.file)

    // 清理同名旧媒体（便于重复执行）
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: it.zh } },
      limit: 50,
      locale: 'zh',
    })
    for (const m of existing.docs) await payload.delete({ collection: 'media', id: m.id })

    const media = await payload.create({
      collection: 'media',
      locale: 'zh',
      filePath,
      data: { alt: it.zh },
    })
    await payload.update({ collection: 'media', id: media.id, locale: 'en', data: { alt: it.en } })

    const prod = await payload.find({
      collection: 'products',
      where: { slug: { equals: it.slug } },
      limit: 1,
    })
    if (prod.docs[0]) {
      await payload.update({ collection: 'products', id: prod.docs[0].id, data: { cover: media.id } })
      console.log('cover set:', it.slug)
    } else {
      console.log('no solution for slug:', it.slug)
    }
  }
  console.log('✅ covers attached')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
