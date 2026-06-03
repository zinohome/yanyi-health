# 研翌数据科技 官网改版 — 设计文档

> 日期：2026-06-03
> 技术栈：Payload CMS 3 + Next.js (App Router) + shadcn/ui + Tailwind v4 + PostgreSQL
> 状态：设计待用户最终评审

---

## 1. 背景与目标

北京研翌数据科技有限公司（Yanyi Data Technology，yanyi-health.com）官网全新改版。

**核心目标**：做一个专业的公司官网，重点呈现 **AI 场景、技术底座、技术能力**，体现公司的专业能力与技术深度。

**核心受众（双线叙事）**：
- **投资人/融资方** — 看愿景、市场、技术护城河、团队、产品想象空间
- **企业/机构 B 端客户** — 看行业场景、可落地能力、合规与私有化、专业度

技术底座是同时打动两类受众的桥梁，是全站的"硬实力"核心。

---

## 2. 关键决策记录（Decisions Log）

| 决策项 | 结论 |
|---|---|
| 核心受众 | 投资人 + 企业/机构 B 端（双线并重）|
| 语言 | 中英双语，一期同时上（Payload localization）|
| 网站规模 | 多页完整官网 |
| 技术底座呈现 | **只讲能力、不露仓库名**；用"人体四域"隐喻架构图；可选平台品牌名（如 EvoMetaX，待定）|
| Payload↔Next.js 集成 | **方案 A**：Payload 3 内嵌同一个 Next.js 应用，Local API 直连取数 |
| CMS 模块 | 资讯/Blog、产品/解决方案、案例、合作伙伴、团队、招聘、表单留资 |
| 营销页编辑自由度 | **区块积木**：Pages + Blocks 页面构建器，可自由增删/排序/填内容 |
| 联系/获客 | 商务咨询表单（入库 + 邮件通知）+ 联系信息 |
| 视觉风格 | 科技蓝 + **明暗双模切换**（next-themes）|
| 内容填充 | **由 Claude 预写并 seed 进 Payload（双语）**，用户只需审核/微调 |
| 真实信息缺口 | 先用**清晰标注的占位**（[待替换]），用户后续替换 |

---

## 3. 保密边界（不上官网）

- 具体财务/成本数据（BOM、ASR 单价、试点账本、客单价定价区间）
- 内部提示词、YAML 人格配置、内部代码路径、commit hash、测试数量
- 私有 GitHub 仓库名（CozyEngineV2/CozyMemory/RTVoice/CozyNanoBot）及实现细节
- 未公开的真实客户名、内部试点规模数字、内部 SLA 口径
- 内部战略表述（"我们不做什么"、护城河来源等）

技术底座一律用**能力语言**对外：人格化引擎 / 长期记忆与画像 / 实时语音 / 工具与 MCP 执行 / 知识图谱 RAG / 私有化部署。

---

## 4. 站点地图 / 信息架构

```
首页 /                       双线叙事，区块拼装
技术底座 /technology         四域架构 + 能力详解（全站硬实力核心）
产品矩阵 /products           5 大产品概览（按 AI 场景分组）
  └ /products/[slug]         产品详情：EvoMate / SelfCEO / 保智通 / 青禾智护 / IndustriaX
关于我们 /about              愿景、使命、发展历程、团队（能力画像）
加入我们 /careers            招聘岗位（CMS）
资讯 /blog + /blog/[slug]    公司动态 / 技术博客 / 行业观点
联系我们 /contact            商务咨询表单 + 联系信息
```

**顶部导航**：技术 · 产品 · 关于 · 资讯 · 联系 ＋ 语言切换(中/EN) ＋ 明暗切换 ＋ CTA「商务咨询/预约 Demo」

**默认决策（可调整）**：
- "AI 场景"作为首页重点区块 + 产品页按场景分组呈现；暂不单独建 `/scenarios` 顶级页（未来可加）。
- 产品详情页用统一模板。
- 团队先放 4–6 个基于角色的能力画像占位。

---

## 5. Payload 数据模型

### 5.1 Collections

| Collection | 关键字段 | 说明 |
|---|---|---|
| `pages` | title, slug, `layout: Blocks[]`, seo | 区块化营销页（首页/技术/关于…）|
| `posts` | title, slug, cover, excerpt, category, content, author, publishedAt, seo | 资讯/Blog |
| `products` | name, slug, tagline, logo, scenario, problem, features[], audience, gallery, order, seo | 产品/解决方案 |
| `cases` | title, client(可匿名), industry, summary, content, metrics[], relatedProduct, logo | 案例 |
| `partners` | name, logo, url, tier | 合作伙伴 |
| `team` | name, role, photo, bio, order | 团队（能力画像，注意隐私）|
| `jobs` | title, dept, location, type, description, requirements, status | 招聘岗位 |
| `formSubmissions` | name, company, email, phone, intent, message, createdAt | 表单留资（后台只读 + 邮件通知）|
| `media` | upload (图片/视频) | 媒体库 |
| `categories` | name, slug | 文章分类（可选）|
| `users` | Payload auth | 后台管理员 |

### 5.2 Globals

- `siteSettings`：logo、公司名、联系方式（邮箱/电话/微信二维码/地址）、社交、默认 SEO、ICP 备案号
- `header`：导航菜单项、CTA 按钮
- `footer`：分栏链接、版权、备案

### 5.3 Blocks 区块库（营销页积木，全部支持中英双语）

`Hero` · `价值主张/Slogan` · `技术架构图（四域，标签可编辑）` · `能力卡片网格` · `AI 场景展示` · `产品矩阵（拉 products）` · `数据指标` · `精选案例（拉 cases）` · `合作伙伴墙（拉 partners）` · `图文左右块` · `发展历程/路线图 Timeline` · `团队预览（拉 team）` · `FAQ` · `CTA 转化条` · `通用富文本 RichText`

---

## 6. 页面设计

### 6.1 首页（区块顺序）

1. **Hero**：科技蓝发光背景 + 主标题「用 AI + HI，打造懂情感、懂健康的智能伙伴」+ 双 CTA（预约 Demo / 了解技术）
2. **价值主张**：slogan「科技为爱而生，让健康与品质同行」+ 3–4 条卖点
3. **技术底座架构图** ⭐：动态四域图（🧠思考 · 🤝执行 · 👂👄语音 · 🧬记忆），可展开能力
4. **核心技术能力**：能力卡（人格化引擎 / 长期记忆与画像 / 实时语音 / 工具与 MCP 执行 / 知识图谱 RAG / 私有化部署）
5. **AI 场景**：行业卡（健康康养 / 保险 / 校园心理 / 工业）
6. **产品矩阵**：5 大产品卡（自动拉 products）
7. **数据指标**：`<300ms 响应`、`~1000 并发`、`多模型不锁定`、`可私有化`
8. **精选案例 / 合作伙伴墙**（CMS，占位）
9. **CTA 转化条**：商务咨询 / 预约 Demo

### 6.2 技术底座页 `/technology`

四域架构深讲 + 每域能力详解 + 技术差异化（人格一致性 / 混合记忆 / 低延迟语音 / MCP 生态 / 多模型 / 私有化）+ 适用场景。**全部能力语言，不出现仓库名。**

### 6.3 产品矩阵页 `/products` + 详情 `/products/[slug]`

概览按 AI 场景分组 → 5 张产品卡 → 详情页统一模板（定位 / 痛点 / 能力 / 场景 / 受众 / 截图）。保密数字不放。

5 个产品：EvoMate（AI 健康智能体+具身陪伴）、SelfCEO（身心一体陪伴）、保智通 InsureVertex AI（港险代理人智能助手）、青禾智护 SproutGuard（校园青少年心理健康）、IndustriaX（工业 AI 应用底座）。

### 6.4 关于我们 `/about`

愿景使命 + 发展历程时间线 + 团队（能力画像，规避隐私）。

### 6.5 加入我们 `/careers`

招聘岗位列表（CMS）+ 投递入口。

### 6.6 资讯/Blog `/blog` + `/blog/[slug]`

列表（分类筛选）+ 详情（富文本/区块）。

### 6.7 联系我们 `/contact`

商务咨询表单 + 邮箱/微信二维码/地址/地图。

---

## 7. 内容填充与 Seed 计划

由 Claude 基于 BP/产品资料预写全部内容（中英双语），写一个 **seed 脚本**（Payload Local API）灌入数据库。用户打开后台即为"审核/微调"。

**Claude 直接写**：首页全部文案、技术底座、5 个产品文案、AI 场景、可公开数据指标、关于我们叙事、3–5 篇资讯初稿、FAQ、页脚、SEO。

**先放占位、需用户替换（[待替换]标注）**：
- 真实联系方式（邮箱/电话/微信二维码/地址）、**ICP 备案号**
- 真实团队成员姓名/头衔/照片（先放能力画像占位）
- 真实客户/案例名称与成效数字（先用匿名化，如"某头部港险机构"）
- 合作伙伴真实 logo

---

## 8. 设计系统（科技蓝 + 明暗双模）

- **配色**：主色科技蓝（`#2D7FF9`/`#1E6BFF` 一族）。深色＝深蓝黑底 + 霓虹蓝发光 + 网格/粒子线条；浅色＝白底 + 蓝点缀 + 大量留白。
- **组件**：shadcn/ui + Tailwind v4；`next-themes` 主题切换。
- **字体**：中文（思源黑体 / HarmonyOS Sans 类）＋ 英文（Geist / Inter）。
- **动效**：克制的滚动渐显、架构图微动效、发光渐变。专业不浮夸。

---

## 9. 双语 i18n

- 路由：`/[locale]`（`zh` 默认 / `en`）。
- UI 静态文案：`next-intl` 字典。
- 内容：Payload **localization**（locales: zh/en），字段级双语，后台一键切语言编辑。
- Header 语言切换器。

---

## 10. 表单流程

shadcn Form + zod 校验 → Next.js **Server Action** → 写入 Payload `formSubmissions` → 邮件通知（SMTP/Resend）→ 前端成功提示。防滥用：honeypot + 频率限制。

---

## 11. 架构与部署

- **单一 Next.js + Payload 3 应用**（方案 A），Local API 直连。
- **数据库**：PostgreSQL（Payload postgres adapter）。
- **媒体**：本地 或 S3/OSS。
- **部署**：Docker（已有经验）/ 也可 Vercel + 外接 Postgres。
- **SEO**：Metadata API + `sitemap.xml` + `robots.txt` + OG 图 + 结构化数据 + ICP 备案位。

---

## 12. 范围外 / 未来

- 多语言扩展（除中英外）
- `/scenarios` 独立场景页
- 在线 Demo / 产品试用嵌入
- 部分技术仓库转公开后的开源展示模块

---

## 13. 待用户提供清单（上线前替换占位）

1. 联系方式：邮箱、电话、微信二维码图、办公地址
2. ICP 备案号（及公安备案，如适用）
3. 公司 logo 源文件（含深/浅色版本）
4. 团队成员真实信息（如需真人展示）或确认用能力画像
5. 真实客户/案例授权（名称 + 可公开成效）或确认用匿名案例
6. 合作伙伴 logo 及授权
7. 表单通知接收邮箱 + 邮件服务（SMTP/Resend）凭据
8. 可公开的真实性能/规模数字（确认哪些可对外）
