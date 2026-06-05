# 生产部署（Docker）

研翌科技官网：Next.js 16（standalone）+ Payload CMS + PostgreSQL。

## 1. 准备环境变量

```bash
cp .env.example .env.production
# 编辑 .env.production：
#  - PAYLOAD_SECRET：openssl rand -base64 32
#  - POSTGRES_PASSWORD：设置强密码
#  - DATABASE_URL：host 用 compose 服务名 postgres，例如
#      postgresql://yanyi:强密码@postgres:5432/yanyi_web
#  - NEXT_PUBLIC_SITE_URL：正式域名 https://www.yanyi-health.com
#  - SMTP_*：如需表单邮件通知
```

> `.env.production` 已被 .gitignore 忽略，不会进入仓库或镜像。

## 2. 构建并启动

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

- `postgres`：数据持久化在 `pgdata` 卷
- `web`：standalone 运行，上传文件持久化在 `media` 卷，对外暴露 `3000`
- 两者均带 healthcheck；`web` 等待数据库 healthy 后启动

## 3. 首次初始化（建表 + 内容 + 管理员）

容器内执行（一次性）：

```bash
# 写入种子内容（站点设置 / 解决方案 / 团队 / 案例 / 文章 / 页面）
docker compose -f docker-compose.prod.yml exec web \
  node --import=tsx/esm src/seed/index.ts

# 创建后台管理员（按脚本提示或环境变量）
docker compose -f docker-compose.prod.yml exec web \
  node --import=tsx/esm scripts/create-admin.ts
```

> 说明：seed/脚本为 TS，运行需镜像内含 `tsx`。当前镜像 standalone 默认仅含运行期依赖；
> 如需在容器内跑种子脚本，请改用「本地连生产库」执行一次，或在 builder 阶段保留 tsx 后单独运行。
> 推荐做法：首次部署时在一台能访问生产库的机器上，设置生产 `DATABASE_URL` 后本地执行
> `npm run seed` 与 `tsx scripts/create-admin.ts`，之后内容由后台维护。

## 4. 反向代理（建议）

在 `web` 前置 Nginx/Caddy 终止 TLS，并将 `Host`、`X-Forwarded-*` 透传：

```
# Caddy 示例
www.yanyi-health.com {
    reverse_proxy 127.0.0.1:3000
}
```

## 5. 日常运维

```bash
docker compose -f docker-compose.prod.yml logs -f web   # 查看日志
docker compose -f docker-compose.prod.yml pull           # 拉取基础镜像更新
docker compose -f docker-compose.prod.yml up -d --build   # 重新构建发布
docker compose -f docker-compose.prod.yml down            # 停止（保留卷）
```

后台地址：`/admin`。前台：`/zh`、`/en`。
