# 研翌数据科技 官网 (Yanyi Data Technology Website)

基于 **Payload CMS 3 + Next.js (App Router) + shadcn/ui + Tailwind v4 + PostgreSQL** 的公司官网。中英双语、明暗双模、科技蓝、区块化页面构建器。

## 技术栈

- **Next.js 16** App Router（前台 + Payload 后台同一应用）
- **Payload CMS 3** + PostgreSQL（`@payloadcms/db-postgres`），内容本地化 zh/en
- **next-intl** 双语路由（`/zh` `/en`）
- **Tailwind CSS v4 + shadcn/ui**，`next-themes` 明暗双模
- 字体：Sora / Manrope / JetBrains Mono（运行时异步加载）

## 本地开发

```bash
# 1. 启动数据库
docker compose up -d

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env   # 填入 DATABASE_URL / PAYLOAD_SECRET / NEXT_PUBLIC_SITE_URL

# 4. 开发服务器
npm run dev            # http://localhost:3000  ·  后台 /admin

# 5. 创建管理员（首次）
NODE_OPTIONS="--import=tsx/esm" npx tsx scripts/create-admin.ts

# 6. 灌入示例内容（双语）
npm run seed
```

## 常用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm run seed` | 重新灌入双语示例内容（会清空后重灌） |
| `npm run generate:types` | 生成 Payload 类型 |
| `npm run test` | 单元测试（Vitest） |

## 内容管理

- 后台 `/admin`：营销页（Pages，区块构建器）、产品、资讯、案例、合作伙伴、团队、招聘、表单留资。
- 营销页由可复用**区块**拼装（Hero / 技术架构 / 能力 / 场景 / 产品矩阵 / 案例 / 数据 / FAQ / CTA …），所有文案中英双语可编辑。

## 上线前待替换（占位内容）

详见 `docs/superpowers/specs` 设计文档「待用户提供清单」：
联系方式、ICP 备案号、公司 logo、真实团队信息、真实客户/案例授权、合作伙伴 logo、表单通知邮箱与邮件服务。

## 部署

单一 Next.js 应用，需 PostgreSQL。支持 Docker / Vercel(+外接 Postgres)。媒体可接 S3/OSS。
