#!/bin/bash
#
# 厦门联备网站 - 一键部署脚本
#
# 使用方法：
# 1. SSH 登录服务器: ssh root@47.243.16.202
# 2. 复制粘贴此脚本内容并执行
#

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置变量
APP_NAME="xiamen-union-spares"
APP_DIR="/var/www/$APP_NAME"
GIT_REPO="https://github.com/Chenhao-Guan/company.git"
DOMAIN="unionspares.net"

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  厦门联备网站 - 自动部署脚本         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo -e "${BLUE}域名: ${DOMAIN}${NC}"
echo -e "${BLUE}服务器: $(hostname)${NC}"
echo -e "${BLUE}时间: $(date)${NC}"
echo ""

# 检查是否为 root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}错误: 请使用 root 用户运行此脚本${NC}"
    exit 1
fi

# 步骤 1: 更新系统并安装依赖
echo -e "\n${YELLOW}[1/9] 更新系统并安装依赖...${NC}"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq

# 安装基础工具
apt-get install -y curl wget git vim build-essential ufw > /dev/null 2>&1

# 安装 Node.js 20
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" -lt 18 ]; then
    echo "安装 Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
    apt-get install -y nodejs > /dev/null 2>&1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# 安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo "安装 PM2..."
    npm install -g pm2 > /dev/null 2>&1
fi
echo -e "${GREEN}✓ PM2 $(pm2 -v)${NC}"

# 安装 Nginx
if ! command -v nginx &> /dev/null; then
    echo "安装 Nginx..."
    apt-get install -y nginx > /dev/null 2>&1
fi
echo -e "${GREEN}✓ Nginx $(nginx -v 2>&1 | cut -d'/' -f2)${NC}"

# 安装 Certbot
if ! command -v certbot &> /dev/null; then
    echo "安装 Certbot..."
    apt-get install -y certbot python3-certbot-nginx > /dev/null 2>&1
fi
echo -e "${GREEN}✓ Certbot 已安装${NC}"

# 步骤 2: 配置防火墙
echo -e "\n${YELLOW}[2/9] 配置防火墙...${NC}"
ufw allow 22/tcp > /dev/null 2>&1
ufw allow 80/tcp > /dev/null 2>&1
ufw allow 443/tcp > /dev/null 2>&1
ufw --force enable > /dev/null 2>&1
echo -e "${GREEN}✓ 防火墙已配置${NC}"

# 步骤 3: 克隆/更新代码
echo -e "\n${YELLOW}[3/9] 获取应用代码...${NC}"
if [ -d "$APP_DIR/.git" ]; then
    echo "更新现有仓库..."
    cd $APP_DIR
    git fetch origin > /dev/null 2>&1
    git checkout main > /dev/null 2>&1
    git pull origin main > /dev/null 2>&1
else
    echo "克隆仓库..."
    rm -rf $APP_DIR
    git clone -q -b main $GIT_REPO $APP_DIR
fi
echo -e "${GREEN}✓ 代码已准备${NC}"

# 步骤 4: 安装依赖
echo -e "\n${YELLOW}[4/9] 安装项目依赖...${NC}"
cd $APP_DIR
npm ci --silent
echo -e "${GREEN}✓ 依赖已安装${NC}"

# 步骤 5: 配置环境变量
echo -e "\n${YELLOW}[5/9] 配置环境变量...${NC}"
if [ ! -f "$APP_DIR/.env.local" ]; then
    if [ -f "$APP_DIR/deploy/.env.example" ]; then
        cp $APP_DIR/deploy/.env.example $APP_DIR/.env.local
        echo -e "${YELLOW}⚠ .env.local 已创建，请稍后配置邮件设置${NC}"
    fi
else
    echo -e "${GREEN}✓ .env.local 已存在${NC}"
fi

# 步骤 6: 构建应用
echo -e "\n${YELLOW}[6/9] 构建应用...${NC}"
cd $APP_DIR
npm run build > /tmp/build.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 构建成功${NC}"
else
    echo -e "${RED}✗ 构建失败，查看日志: cat /tmp/build.log${NC}"
    exit 1
fi

# 步骤 7: 配置 Nginx
echo -e "\n${YELLOW}[7/9] 配置 Nginx...${NC}"
cat > /etc/nginx/sites-available/$APP_NAME << 'EOF'
upstream xiamen_union_spares_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;

    server_name unionspares.net www.unionspares.net;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://xiamen_union_spares_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|webp|avif|svg|woff|woff2|ttf|otf|eot)$ {
        proxy_pass http://xiamen_union_spares_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t > /dev/null 2>&1
systemctl reload nginx
echo -e "${GREEN}✓ Nginx 已配置${NC}"

# 步骤 8: 启动应用
echo -e "\n${YELLOW}[8/9] 启动应用...${NC}"
cd $APP_DIR

if pm2 list | grep -q "$APP_NAME"; then
    echo "重启现有应用..."
    pm2 restart $APP_NAME > /dev/null 2>&1
else
    echo "启动新应用..."
    pm2 start npm --name "$APP_NAME" -- start > /dev/null 2>&1
fi

pm2 save > /dev/null 2>&1

# 设置 PM2 开机自启
pm2 startup systemd -hp /root --user root > /dev/null 2>&1 || true

echo -e "${GREEN}✓ 应用已启动${NC}"

# 步骤 9: 等待应用就绪
echo -e "\n${YELLOW}[9/9] 检查应用状态...${NC}"
sleep 3

if pm2 list | grep -q "$APP_NAME.*online"; then
    echo -e "${GREEN}✓ 应用运行正常${NC}"
else
    echo -e "${RED}✗ 应用启动失败${NC}"
    pm2 logs $APP_NAME --lines 20 --nostream
    exit 1
fi

# 完成！
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        部署完成！                      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}应用状态:${NC}"
pm2 list
echo ""
echo -e "${BLUE}访问地址:${NC}"
echo -e "  HTTP:  http://$DOMAIN"
echo -e "  HTTP:  http://www.$DOMAIN"
echo -e "  IP:    http://47.243.16.202"
echo ""
echo -e "${YELLOW}下一步操作:${NC}"
echo -e "  1. 配置 DNS: 添加 A 记录指向 47.243.16.202"
echo -e "  2. 申请 SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo -e "  3. 配置邮件: vim $APP_DIR/.env.local"
echo ""
echo -e "${BLUE}常用命令:${NC}"
echo -e "  查看日志: ${GREEN}pm2 logs $APP_NAME${NC}"
echo -e "  重启应用: ${GREEN}pm2 restart $APP_NAME${NC}"
echo -e "  查看状态: ${GREEN}pm2 list${NC}"
echo ""
