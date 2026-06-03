import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@yanyi-health.com'
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Yanyi@2026'

async function run() {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: EMAIL } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`Admin already exists: ${EMAIL}`)
  } else {
    await payload.create({
      collection: 'users',
      data: { email: EMAIL, password: PASSWORD },
    })
    console.log(`Created admin: ${EMAIL} / ${PASSWORD}`)
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
