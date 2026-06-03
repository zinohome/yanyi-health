# P1 — 项目地基 & 脚手架 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭起一个可运行的 Next.js + Payload 3 应用：`/admin` 可登录、PostgreSQL 连通、shadcn + 科技蓝设计令牌就位、明暗双模可切换、中英 `/zh` `/en` 路由可访问、基础 Header/Footer 布局渲染。

**Architecture:** 方案 A——Payload 3 内嵌进同一个 Next.js（App Router）应用。`src/app/(payload)/` 由 Payload 拥有（admin + api，不本地化）；前台放在 `src/app/(frontend)/[locale]/`，用 next-intl 做 UI 文案本地化、Payload `localization` 做内容本地化。

**Tech Stack:** Next.js 15 (App Router) · Payload 3 · @payloadcms/db-postgres · PostgreSQL 16 · Tailwind CSS v4 · shadcn/ui · next-themes · next-intl · TypeScript · pnpm · Vitest · Docker Compose

**前置约定：**
- 运行环境 Node 20+，包管理器 pnpm。
- 项目代码根目录：`web/`（与现有 `reference/` `docs/` `github/` 并列，避免污染资料目录）。下文所有路径相对仓库根。
- 提交：本仓库当前不是 git 仓库；Task 0 会 `git init`。执行到 commit 步骤前若用户未授权提交，可跳过 commit 步骤、仅保留代码改动。

---

## 文件结构（本计划产出）

```
web/
├── docker-compose.yml              # 本地 PostgreSQL
├── .env                            # DATABASE_URL / PAYLOAD_SECRET（gitignore）
├── .env.example                    # 示例
├── package.json
├── next.config.mjs                 # 接入 withPayload + next-intl 插件
├── tsconfig.json
├── postcss.config.mjs              # Tailwind v4
├── components.json                 # shadcn 配置
├── vitest.config.mts
├── src/
│   ├── payload.config.ts           # Payload 主配置（db + localization + collections）
│   ├── payload-types.ts            # 自动生成
│   ├── collections/
│   │   ├── Users.ts
│   │   └── Media.ts
│   ├── i18n/
│   │   ├── routing.ts              # next-intl 路由（locales zh/en）
│   │   └── request.ts              # next-intl 请求配置
│   ├── messages/
│   │   ├── zh.json                 # UI 文案字典
│   │   └── en.json
│   ├── middleware.ts               # next-intl 中间件
│   ├── app/
│   │   ├── (payload)/              # Payload admin + api（create-payload-app 生成）
│   │   │   ├── admin/[[...segments]]/page.tsx
│   │   │   ├── api/...
│   │   │   ├── layout.tsx
│   │   │   └── custom.scss
│   │   └── (frontend)/
│   │       ├── globals.css         # Tailwind + 科技蓝令牌 + 明暗变量
│   │       └── [locale]/
│   │           ├── layout.tsx      # NextIntlClientProvider + ThemeProvider + Header/Footer
│   │           └── page.tsx        # 首页占位
│   ├── components/
│   │   ├── ui/                     # shadcn 组件
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── locale-switcher.tsx
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   └── lib/
│       └── utils.ts                # shadcn cn()
└── __tests__/
    └── smoke.test.ts
```

---

### Task 0: 仓库与本地数据库

**Files:**
- Create: `.gitignore`
- Create: `web/docker-compose.yml`
- Create: `web/.env.example`

- [ ] **Step 1: 初始化 git（如用户授权）**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git init
```

- [ ] **Step 2: 写根 `.gitignore`**

Create `.gitignore`:

```gitignore
node_modules/
web/node_modules/
web/.next/
web/.env
*.log
.DS_Store
web/build/
```

- [ ] **Step 3: 本地 PostgreSQL（docker-compose）**

Create `web/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: yanyi
      POSTGRES_PASSWORD: yanyi_dev_pw
      POSTGRES_DB: yanyi_web
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

- [ ] **Step 4: 写 `web/.env.example`**

Create `web/.env.example`:

```bash
DATABASE_URL=postgres://yanyi:yanyi_dev_pw@localhost:5432/yanyi_web
PAYLOAD_SECRET=replace-with-long-random-string
```

- [ ] **Step 5: 启动数据库并验证**

Run: `cd web && docker compose up -d && docker compose ps`
Expected: `postgres` 容器状态 `running`，端口 `5432` 映射。

---

### Task 1: 脚手架 Payload 3 应用

**Files:**
- Create: `web/` 整个 Payload blank 项目

- [ ] **Step 1: 用 create-payload-app 生成 blank 项目到 web/**

Run:

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
npx create-payload-app@latest web -t blank --use-pnpm --db postgres --no-deps
```

Expected: 在 `web/` 生成含 `src/app/(payload)/`、`src/collections/Users.ts`、`src/collections/Media.ts`、`src/payload.config.ts` 的项目骨架。

> 若 CLI 交互式询问，选择：template = blank，database = PostgreSQL。

- [ ] **Step 2: 安装依赖**

Run: `cd web && pnpm install`
Expected: 安装成功，无致命错误。

- [ ] **Step 3: 写 `.env`**

Create `web/.env`（复制 example 并填入随机密钥）:

```bash
DATABASE_URL=postgres://yanyi:yanyi_dev_pw@localhost:5432/yanyi_web
PAYLOAD_SECRET=dev-secret-change-me-0123456789abcdef
```

- [ ] **Step 4: 提交脚手架**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "chore: scaffold Payload 3 + Next.js app in web/"
```

---

### Task 2: PostgreSQL 适配器 + 首次启动 + 建管理员

**Files:**
- Modify: `web/src/payload.config.ts`

- [ ] **Step 1: 确认 postgres 适配器配置**

确保 `web/src/payload.config.ts` 的 `db` 为：

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

// 在 buildConfig({...}) 内：
db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URL },
}),
```

- [ ] **Step 2: 启动开发服务器**

Run: `cd web && pnpm dev`
Expected: 终端输出本地地址（默认 `http://localhost:3000`），Payload 自动建表无报错。

- [ ] **Step 3: 验证 admin 可访问并创建第一个管理员**

打开 `http://localhost:3000/admin`，填写邮箱/密码创建首个用户。
Expected: 成功进入 Payload 后台 Dashboard，可见 `Users`、`Media` 两个集合。

- [ ] **Step 4: 生成类型并提交**

Run: `cd web && pnpm payload generate:types`
Then:

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: connect postgres adapter, admin panel boots"
```

---

### Task 3: Tailwind v4 + shadcn + 科技蓝设计令牌 + 明暗变量

**Files:**
- Create: `web/postcss.config.mjs`
- Create: `web/src/app/(frontend)/globals.css`
- Create: `web/components.json`
- Create: `web/src/lib/utils.ts`
- Modify: `web/package.json`（脚本/依赖）

- [ ] **Step 1: 安装 Tailwind v4 与工具依赖**

Run:

```bash
cd web && pnpm add -D tailwindcss @tailwindcss/postcss && pnpm add clsx tailwind-merge class-variance-authority lucide-react tailwindcss-animate
```

- [ ] **Step 2: PostCSS 配置**

Create `web/postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 3: 全局样式 + 科技蓝令牌 + 明暗变量**

Create `web/src/app/(frontend)/globals.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.15 0.02 250);
  --primary: oklch(0.55 0.20 255);          /* 科技蓝 ~#2D7FF9 */
  --primary-foreground: oklch(0.99 0 0);
  --muted: oklch(0.96 0.01 250);
  --muted-foreground: oklch(0.50 0.02 250);
  --border: oklch(0.90 0.01 250);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.02 250);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.16 0.03 255);        /* 深蓝黑 */
  --foreground: oklch(0.97 0.01 250);
  --primary: oklch(0.65 0.21 255);           /* 霓虹蓝 */
  --primary-foreground: oklch(0.12 0.02 255);
  --muted: oklch(0.24 0.03 255);
  --muted-foreground: oklch(0.70 0.02 250);
  --border: oklch(0.30 0.03 255);
  --card: oklch(0.20 0.03 255);
  --card-foreground: oklch(0.97 0.01 250);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --radius-lg: var(--radius);
}

body { background: var(--background); color: var(--foreground); }
```

- [ ] **Step 4: shadcn 工具函数与配置**

Create `web/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `web/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/(frontend)/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 5: 添加基础 shadcn 组件**

Run: `cd web && pnpm dlx shadcn@latest add button dropdown-menu navigation-menu sheet`
Expected: 在 `web/src/components/ui/` 生成 `button.tsx` 等文件。

- [ ] **Step 6: 提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: tailwind v4 + shadcn + tech-blue tokens with dark mode"
```

---

### Task 4: next-themes 主题切换

**Files:**
- Create: `web/src/components/theme-provider.tsx`
- Create: `web/src/components/theme-toggle.tsx`

- [ ] **Step 1: 安装 next-themes**

Run: `cd web && pnpm add next-themes`

- [ ] **Step 2: ThemeProvider 封装**

Create `web/src/components/theme-provider.tsx`:

```tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 3: 主题切换按钮**

Create `web/src/components/theme-toggle.tsx`:

```tsx
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="切换主题"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  )
}
```

> ThemeProvider 将在 Task 7 的 `[locale]/layout.tsx` 中包裹应用，配置 `attribute="class" defaultTheme="dark" enableSystem`。

- [ ] **Step 4: 提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: next-themes provider and theme toggle"
```

---

### Task 5: next-intl 中英路由

**Files:**
- Create: `web/src/i18n/routing.ts`
- Create: `web/src/i18n/request.ts`
- Create: `web/src/middleware.ts`
- Create: `web/src/messages/zh.json`
- Create: `web/src/messages/en.json`
- Modify: `web/next.config.mjs`

- [ ] **Step 1: 安装 next-intl**

Run: `cd web && pnpm add next-intl`

- [ ] **Step 2: 路由配置**

Create `web/src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
})
```

- [ ] **Step 3: 请求配置**

Create `web/src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as "zh" | "en")) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 4: 中间件（仅匹配前台，排除 admin/api）**

Create `web/src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // 不拦截 admin、api、_next、静态资源
  matcher: ["/((?!admin|api|_next|_payload|.*\\..*).*)"],
}
```

- [ ] **Step 5: 文案字典**

Create `web/src/messages/zh.json`:

```json
{
  "nav": { "technology": "技术", "products": "产品", "about": "关于", "blog": "资讯", "contact": "联系", "cta": "商务咨询" },
  "footer": { "rights": "版权所有", "company": "北京研翌数据科技有限公司" },
  "home": { "title": "用 AI + HI，打造懂情感、懂健康的智能伙伴" }
}
```

Create `web/src/messages/en.json`:

```json
{
  "nav": { "technology": "Technology", "products": "Products", "about": "About", "blog": "Insights", "contact": "Contact", "cta": "Contact Sales" },
  "footer": { "rights": "All rights reserved", "company": "Yanyi Data Technology" },
  "home": { "title": "AI + HI — companions that understand emotion and health" }
}
```

- [ ] **Step 6: next.config 接入 next-intl 与 Payload**

Overwrite `web/next.config.mjs`:

```js
import { withPayload } from "@payloadcms/next/withPayload"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withPayload(withNextIntl(nextConfig))
```

- [ ] **Step 7: 提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: next-intl zh/en routing with middleware"
```

---

### Task 6: Payload 内容本地化

**Files:**
- Modify: `web/src/payload.config.ts`

- [ ] **Step 1: 在 buildConfig 中加入 localization**

在 `web/src/payload.config.ts` 的 `buildConfig({...})` 内添加：

```ts
localization: {
  locales: [
    { label: "中文", code: "zh" },
    { label: "English", code: "en" },
  ],
  defaultLocale: "zh",
  fallback: true,
},
```

- [ ] **Step 2: 重启并验证后台出现语言切换**

Run: `cd web && pnpm dev`
打开 `http://localhost:3000/admin`，进入任一文档（如新建 Media 描述字段时）。
Expected: 后台右上出现 locale 切换（zh/en）。

- [ ] **Step 3: 重新生成类型并提交**

Run: `cd web && pnpm payload generate:types`
Then:

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: enable Payload content localization zh/en"
```

---

### Task 7: 前台基础布局（Header / Footer / 首页占位）

**Files:**
- Create: `web/src/app/(frontend)/[locale]/layout.tsx`
- Create: `web/src/app/(frontend)/[locale]/page.tsx`
- Create: `web/src/components/site-header.tsx`
- Create: `web/src/components/site-footer.tsx`
- Create: `web/src/components/locale-switcher.tsx`

- [ ] **Step 1: 语言切换器**

Create `web/src/components/locale-switcher.tsx`:

```tsx
"use client"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const next = locale === "zh" ? "en" : "zh"
  const swap = () => {
    const segs = pathname.split("/")
    segs[1] = next
    router.push(segs.join("/") || "/")
  }
  return (
    <Button variant="ghost" size="sm" onClick={swap} aria-label="切换语言">
      {locale === "zh" ? "EN" : "中文"}
    </Button>
  )
}
```

- [ ] **Step 2: Header**

Create `web/src/components/site-header.tsx`:

```tsx
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleSwitcher } from "@/components/locale-switcher"

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations("nav")
  const base = `/${locale}`
  const items = [
    { href: `${base}/technology`, label: t("technology") },
    { href: `${base}/products`, label: t("products") },
    { href: `${base}/about`, label: t("about") },
    { href: `${base}/blog`, label: t("blog") },
    { href: `${base}/contact`, label: t("contact") },
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={base} className="text-lg font-bold text-primary">研翌数据</Link>
        <nav className="hidden gap-6 md:flex">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="text-sm text-muted-foreground hover:text-foreground">{it.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
          <Button asChild size="sm"><Link href={`${base}/contact`}>{t("cta")}</Link></Button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Footer**

Create `web/src/components/site-footer.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export async function SiteFooter() {
  const t = await getTranslations("footer")
  return (
    <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
      <p>© 2026 {t("company")}. {t("rights")}.</p>
      <p className="mt-1 opacity-60">[ICP 备案号 待替换]</p>
    </footer>
  )
}
```

- [ ] **Step 4: locale 布局（包裹 ThemeProvider + NextIntl + Header/Footer）**

Create `web/src/app/(frontend)/[locale]/layout.tsx`:

```tsx
import "../globals.css"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <SiteHeader locale={locale} />
            <main className="min-h-[60vh]">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: 首页占位**

Create `web/src/app/(frontend)/[locale]/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export default async function HomePage() {
  const t = await getTranslations("home")
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-muted-foreground">科技为爱而生，让健康与品质同行。</p>
    </section>
  )
}
```

- [ ] **Step 6: 验证前台**

Run: `cd web && pnpm dev`
- 访问 `http://localhost:3000/zh` → 中文首页 + 中文导航
- 访问 `http://localhost:3000/en` → 英文首页 + 英文导航
- 点击 EN/中文按钮切换语言；点击主题按钮切换明暗
- 访问 `http://localhost:3000/admin` → 后台仍正常
Expected: 全部通过。

- [ ] **Step 7: 提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "feat: localized frontend layout with header, footer, theme + locale switch"
```

---

### Task 8: 测试基建（Vitest 冒烟测试）

**Files:**
- Create: `web/vitest.config.mts`
- Create: `web/__tests__/smoke.test.ts`
- Modify: `web/package.json`（test 脚本）

- [ ] **Step 1: 安装 Vitest**

Run: `cd web && pnpm add -D vitest`

- [ ] **Step 2: 写失败的冒烟测试**

Create `web/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { routing } from "../src/i18n/routing"

describe("i18n routing", () => {
  it("supports zh and en with zh default", () => {
    expect(routing.locales).toEqual(["zh", "en"])
    expect(routing.defaultLocale).toBe("zh")
  })
})
```

- [ ] **Step 3: 配置 Vitest**

Create `web/vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: { environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
```

加入 `web/package.json` scripts：`"test": "vitest run"`

- [ ] **Step 4: 运行测试**

Run: `cd web && pnpm test`
Expected: PASS（1 passed）。

- [ ] **Step 5: 提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "test: add vitest smoke test for i18n routing"
```

---

### Task 9: P1 验收

- [ ] **Step 1: 全量验收清单**

Run: `cd web && pnpm dev`，逐项确认：
- [ ] `http://localhost:3000/admin` 可登录、Dashboard 正常、内容 locale 可切换
- [ ] `http://localhost:3000/zh` 与 `/en` 均渲染，导航/文案随语言变化
- [ ] 语言切换按钮工作；明暗主题切换工作且科技蓝生效
- [ ] `pnpm test` 通过
- [ ] `pnpm build` 成功（Run: `cd web && pnpm build`，Expected: 构建无错误）

- [ ] **Step 2: 最终提交**

```bash
cd /Users/zhangjun/CursorProjects/yanyi-health
git add -A && git commit -m "chore: P1 foundation complete — admin + i18n + theme + layout"
```

---

## 自查（Self-Review）

- **Spec 覆盖**：P1 对应 spec 第 11 节（架构/部署：Next+Payload3+Postgres）、第 8 节（科技蓝+明暗）、第 9 节（双语 i18n）、第 5 节地基（Users/Media/全局结构入口）。产品/区块/内容/表单/SEO 属 P2–P7，不在本计划范围。
- **占位扫描**：仅 Footer 的 `[ICP 备案号 待替换]` 为 spec 第 13 节明确约定的"待用户替换占位"，非计划缺陷。
- **类型一致性**：`routing.locales`=`["zh","en"]` 在 i18n、middleware、layout、测试中一致；`ThemeProvider`/`ThemeToggle`/`LocaleSwitcher`/`SiteHeader`/`SiteFooter` 命名贯穿一致。
- **依赖顺序**：Task 5/6（i18n）先于 Task 7（布局消费 next-intl）；Task 3/4（主题）先于 Task 7（布局消费 ThemeProvider）。无前向引用未定义符号。
