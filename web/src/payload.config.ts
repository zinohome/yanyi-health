import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Cases } from './collections/Cases'
import { Partners } from './collections/Partners'
import { Team } from './collections/Team'
import { Jobs } from './collections/Jobs'
import { FormSubmissions } from './collections/FormSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { Header, Footer } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· 研翌科技',
    },
  },
  collections: [
    Pages,
    Posts,
    Categories,
    Products,
    Cases,
    Partners,
    Team,
    Jobs,
    FormSubmissions,
    Media,
    Users,
  ],
  globals: [SiteSettings, Header, Footer],
  editor: lexicalEditor(),
  // 邮件：配置 SMTP 后启用（否则仅写控制台，不影响功能）
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromName: '研翌科技官网',
        defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@yanyi-health.com',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [
      { label: '中文', code: 'zh' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'zh',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
