# syntax=docker/dockerfile:1
# 研翌科技官网 · 生产镜像（harbor.naivehero.top:8443/web/yyweb）
# 构建上下文必须是 web/：
#   docker build -f deploy/Dockerfile -t harbor.naivehero.top:8443/web/yyweb:latest web
# 该镜像为「完整镜像」：保留源码与全部依赖，以便容器内 tsx 自动初始化数据，
# 并用 next start 启动（非 standalone）。

FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ---------- 依赖（含 devDependencies：tsx 用于自动初始化）----------
FROM base AS deps
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
# 优先用锁文件做可复现安装；锁文件与运行环境 npm 版本漂移时回退到 npm install
RUN \
  if [ -f package-lock.json ]; then npm ci || npm install; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile || yarn; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && (pnpm i --frozen-lockfile || pnpm i); \
  else npm install; \
  fi

# ---------- 构建 ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 非 standalone（不设置 NEXT_STANDALONE），用 next start 启动
RUN npm run build

# ---------- 运行 ----------
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 完整依赖 + 构建产物 + 源码（自动初始化脚本需要源码与 tsx）
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs

# 上传目录（compose 中挂载持久卷）
RUN mkdir -p /app/media && chmod +x scripts/docker-entrypoint.sh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=5 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-3000}/zh" >/dev/null 2>&1 || exit 1

# 入口：幂等自动初始化（首启灌入内容 + 管理员）后启动 Next
ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]
