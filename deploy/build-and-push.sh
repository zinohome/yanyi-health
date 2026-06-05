#!/usr/bin/env bash
# 构建并推送研翌科技官网镜像到 Harbor（linux/amd64）。
#
# 用法：
#   ./deploy/build-and-push.sh            # 用 deploy/VERSION 当前版本构建，成功后自动 +1 写回
#   ./deploy/build-and-push.sh 0.1.30     # 指定版本（不改 VERSION 文件）
#   ./deploy/build-and-push.sh --no-bump  # 用 VERSION 构建但不自增
#
# 前置：先登录 Harbor
#   docker login harbor.naivehero.top:8443
#
# 说明：
#   - 构建机需为 linux/amd64（与服务器一致）；本机即 x86_64，直接原生构建。
#   - 同时打 v<version> 与 latest 两个 tag；docker-compose 默认引用 :latest。
set -euo pipefail

REGISTRY="harbor.naivehero.top:8443"
IMAGE="${REGISTRY}/web/yyweb"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION_FILE="${ROOT}/deploy/VERSION"

BUMP=1
ARG="${1:-}"
if [ "${ARG}" = "--no-bump" ]; then
  BUMP=0
  VERSION="$(tr -d '[:space:]' < "${VERSION_FILE}")"
elif [ -n "${ARG}" ]; then
  BUMP=0
  VERSION="${ARG#v}"
else
  VERSION="$(tr -d '[:space:]' < "${VERSION_FILE}")"
fi

TAG="v${VERSION}"
echo "==> 构建 ${IMAGE}:${TAG}（上下文：${ROOT}/web）"

docker build \
  -f "${ROOT}/deploy/Dockerfile" \
  -t "${IMAGE}:${TAG}" \
  -t "${IMAGE}:latest" \
  "${ROOT}/web"

echo "==> 推送 ${IMAGE}:${TAG} 与 :latest"
docker push "${IMAGE}:${TAG}"
docker push "${IMAGE}:latest"

echo "✅ 已推送：${IMAGE}:${TAG} 和 ${IMAGE}:latest"

# 自动自增 patch 版本，写回 VERSION，供下次构建使用
if [ "${BUMP}" = "1" ]; then
  MAJOR="${VERSION%%.*}"
  REST="${VERSION#*.}"
  MINOR="${REST%%.*}"
  PATCH="${REST#*.}"
  NEXT="${MAJOR}.${MINOR}.$((PATCH + 1))"
  printf '%s\n' "${NEXT}" > "${VERSION_FILE}"
  echo "↻ 下次版本：${NEXT}（已写入 deploy/VERSION）"
fi
