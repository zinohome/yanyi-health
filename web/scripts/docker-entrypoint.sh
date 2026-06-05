#!/bin/sh
# 研翌科技官网容器入口：自动初始化（幂等）后启动 Next。
set -e
cd /app

echo "[entrypoint] 自动初始化数据（幂等）…"
# 仅初始化阶段用非 production：Payload 的 schema push 被硬性限制在非 production
# （见 @payloadcms/db-postgres/connect.js）。空库首启即可自动建表；之后无变更会跳过。
NODE_ENV=development node --import=tsx/esm scripts/auto-init.ts

PORT="${PORT:-3000}"
echo "[entrypoint] 启动 Next，监听 0.0.0.0:${PORT}"
exec node_modules/.bin/next start -H 0.0.0.0 -p "${PORT}"
