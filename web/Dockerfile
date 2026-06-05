# syntax=docker/dockerfile:1
# 研翌科技官网生产镜像（Next.js 16 standalone + Payload CMS）
# 需在 next.config.ts 中设置 output: 'standalone'（已设置）。

FROM node:22.17.0-alpine AS base
# sharp / Payload 在 alpine 上需要 libc6-compat
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- 依赖层 ----------
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund || (rm -rf node_modules && npm ci --no-audit --no-fund); \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else npm install --no-audit --no-fund; \
  fi

# ---------- 构建层 ----------
FROM base AS builder
WORKDIR /app
# 开启 standalone 输出（next.config 依据该变量决定）
ENV NEXT_STANDALONE=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 构建期不连接数据库（页面均为 force-dynamic；PAYLOAD_SECRET/DATABASE_URL 缺省为空字符串）
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------- 运行层 ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# 公共目录
COPY --from=builder /app/public ./public

# standalone 产物（含被 tracing 的 node_modules 与 server.js）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Payload 上传目录（建议在 compose 中挂载为持久化卷）
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/zh').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# server.js 由 next build 的 standalone 输出生成
CMD ["node", "server.js"]
