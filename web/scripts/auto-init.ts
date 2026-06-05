import 'dotenv/config'
import { execFileSync } from 'node:child_process'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/**
 * 容器自动初始化（幂等，仅首启灌入）。
 * - 等待数据库就绪并由 Payload push 建表（需 PAYLOAD_DB_PUSH=1）
 * - 若 solutions 为空 → 灌入内容 + 封面 + 站点设置
 * - 始终确保后台管理员存在
 * 已有内容时不会覆盖后台编辑（避免每次重启清库）。
 */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function run(script: string) {
  console.log(`[auto-init] ▶ ${script}`)
  execFileSync('node', ['--import=tsx/esm', script], {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
  })
}

async function connectWithRetry(retries = 40, delayMs = 2000) {
  let lastErr: unknown
  for (let i = 1; i <= retries; i++) {
    try {
      return await getPayload({ config })
    } catch (err) {
      lastErr = err
      console.log(`[auto-init] 数据库未就绪，重试 ${i}/${retries} …`)
      await sleep(delayMs)
    }
  }
  throw lastErr
}

async function main() {
  const payload = await connectWithRetry()

  let total = 0
  try {
    const res = await payload.find({ collection: 'products', limit: 1, depth: 0 })
    total = res.totalDocs
  } catch {
    total = 0 // 表可能尚未建立
  }

  if (total > 0) {
    console.log(`[auto-init] 已检测到内容（${total} 套解决方案），跳过灌入`)
  } else {
    console.log('[auto-init] 空库 → 开始灌入内容 / 封面 / 站点设置')
    run('src/seed/index.ts')
    run('scripts/attach-covers.ts')
    run('scripts/update-settings.ts')
  }

  // 管理员幂等确保（脚本内部已判断是否已存在）
  run('scripts/create-admin.ts')

  console.log('[auto-init] ✅ 完成')
  process.exit(0)
}

main().catch((err) => {
  console.error('[auto-init] ❌ 失败：', err)
  process.exit(1)
})
