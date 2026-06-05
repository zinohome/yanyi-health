# 研翌科技官网 · 生产部署（Harbor + 1panel + Caddy）

完整镜像，容器首启**自动建表 + 灌入内容 + 创建管理员**（幂等，不会覆盖后台编辑），不会部署出空网站。

## 目录产物

| 文件 | 说明 |
|------|------|
| `Dockerfile` | 生产镜像（完整镜像，支持容器内自动初始化）。构建上下文为 `web/` |
| `build-and-push.sh` | 构建并推送到 `harbor.naivehero.top:8443/web/yyweb` |
| `docker-compose.yml` | 1panel 风格编排：`1panel-network` + `/data/yyweb/` + postgres + web + caddy |
| `Caddyfile` | Caddy 反代 + 自动 HTTPS 示例 |
| `.env.example` | 环境变量样例 |

## 一、构建并推送镜像

```bash
# 1) 登录 Harbor（自签证书需先让 docker 信任该仓库）
docker login harbor.naivehero.top:8443

# 2) 构建并推送（默认 tag=latest）
./deploy/build-and-push.sh
# 或指定 tag：./deploy/build-and-push.sh v1.0.0
```

> 镜像内已带源码与 tsx，仅用于「首启自动初始化」；运行用 `next start`。

## 二、服务器准备目录与配置

```bash
sudo mkdir -p /data/yyweb/data/postgres \
              /data/yyweb/data/media \
              /data/yyweb/data/caddy/data \
              /data/yyweb/data/caddy/config

# 放置编排与配置（可直接拷贝本目录文件）
sudo cp deploy/docker-compose.yml /data/yyweb/
sudo cp deploy/Caddyfile          /data/yyweb/
sudo cp deploy/.env.example       /data/yyweb/.env
# 编辑 /data/yyweb/.env，填入 PAYLOAD_SECRET / 数据库密码 / 域名 / SMTP 等
# 编辑 /data/yyweb/Caddyfile，把域名换成实际域名
```

确保 1panel 网络存在（一般已存在）：

```bash
docker network inspect 1panel-network >/dev/null 2>&1 || docker network create 1panel-network
```

## 三、启动

```bash
cd /data/yyweb
docker compose up -d
# 跟踪首启自动初始化日志
docker compose logs -f web
```

首启会看到 `[auto-init] 空库 → 开始灌入内容 …` 与 `Created admin: …`；
完成后访问：

- 前台：`https://你的域名/zh`、`/en`
- 后台：`https://你的域名/admin`（账号见 `.env` 的 `SEED_ADMIN_*`）

> 之后重启不会重复灌入（检测到已有内容即跳过），后台编辑安全保留。

## 四、更新发布与版本回滚

镜像版本由 `deploy/VERSION` 维护，从 `v0.1.26` 起每次构建自动 `patch +1`。
`docker-compose.yml` 中 web 镜像为 `:${IMAGE_TAG:-latest}`，由服务器 `.env` 的
`IMAGE_TAG` 控制（默认 `latest`）。

```bash
# 1) 本地构建并推送（自动用 VERSION 当前号，打 v.. 与 latest，然后 +1）
./deploy/build-and-push.sh
#    指定版本：./deploy/build-and-push.sh 0.2.0

# 2) 服务器更新到最新
cd /data/yyweb && docker compose pull web && docker compose up -d web
```

**按版本部署 / 回滚**：在服务器 `/data/yyweb/.env` 设置 `IMAGE_TAG`，再 `up -d`：

```bash
# 精确部署某版本
echo 'IMAGE_TAG=v0.1.26' >> /data/yyweb/.env   # 或编辑该行
cd /data/yyweb && docker compose pull web && docker compose up -d web

# 回滚到上一个版本，同理把 IMAGE_TAG 改回旧版本号即可
```

## 数据与持久化

| 数据 | 宿主路径 |
|------|----------|
| PostgreSQL | `/data/yyweb/data/postgres` |
| 上传媒体 | `/data/yyweb/data/media` |
| Caddy 证书/配置 | `/data/yyweb/data/caddy/{data,config}` |

## 备注

- `PAYLOAD_DB_PUSH=1` 让容器自动同步表结构（首启必需）；若后续改用迁移，置 `0`。
- web 不对宿主暴露端口，统一经 Caddy（80/443）入口反代到内网 `web:3000`。
- 重新灌库（谨慎，会清空内容）：进入 web 容器执行 `node --import=tsx/esm src/seed/index.ts`。
