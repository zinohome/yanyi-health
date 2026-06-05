#!/usr/bin/env bash
# 构建并推送研翌科技官网镜像到 Harbor。
# 用法：
#   ./deploy/build-and-push.sh [tag]      # 默认 tag=latest
# 前置：先登录 Harbor（自签 CA 需先配置 docker 信任）
#   docker login harbor.naivehero.top:8443
set -euo pipefail

REGISTRY="harbor.naivehero.top:8443"
IMAGE="${REGISTRY}/web/yyweb"
TAG="${1:-latest}"

# 仓库根目录（本脚本位于 deploy/ 下）
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> 构建镜像 ${IMAGE}:${TAG}（上下文：${ROOT}/web）"
docker build \
  -f "${ROOT}/deploy/Dockerfile" \
  -t "${IMAGE}:${TAG}" \
  "${ROOT}/web"

echo "==> 推送 ${IMAGE}:${TAG}"
docker push "${IMAGE}:${TAG}"

echo "✅ 完成：${IMAGE}:${TAG}"
