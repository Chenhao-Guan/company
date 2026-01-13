#!/bin/bash

# 远程服务器部署脚本
# 在本地机器上运行此脚本，它会自动连接到服务器并执行部署

set -e

# 服务器配置（请在执行前修改这些值）
SERVER_HOST="47.243.16.202"
SERVER_USER="root"
APP_NAME="xiamen-union-spares"
APP_DIR="/var/www/$APP_NAME"
GIT_REPO="https://github.com/Chenhao-Guan/company.git"
BRANCH="main"
NODE_VERSION="20"

echo "=========================================="
echo "  厦门联备 - 远程自动部署"
echo "=========================================="
echo "服务器: $SERVER_HOST"
echo "仓库: $GIT_REPO"
echo "=========================================="

# 使用 SSH 连接到服务器并执行部署
ssh $SERVER_USER@$SERVER_HOST 'bash -s' <<EOF
set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\${GREEN}[1/8] 更新系统并安装依赖...\${NC}"
export DEBIAN_FRONTEND=noninteractive
apt-get update

# 检查并安装 Node.js 20
if ! command -v node &> /dev/null; then
    echo "安装 Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js 已安装: \$(node --version)"
fi

# 检查并安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo "安装 PM2..."
    npm install -g pm2
else
    echo "PM2 已安装"
fi

# 检查并安装 Nginx
if ! command -v nginx &> /dev/null; then
    echo "安装 Nginx..."
    apt-get install -y nginx
else
    echo "Nginx 已安装"
fi

# 检查并安装 Certbot
if ! command -v certbot &> /dev/null; then
    echo "安装 Certbot..."
    apt-get install -y certbot python3-certbot-nginx
else
    echo "Certbot 已安装"
fi

echo -e "\${GREEN}[2/8] 配置防火墙...\${NC}"
if ! command -v ufw &> /dev/null; then
    apt-get install -y ufw
fi

# 允许必要端口
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# 如果防火墙未启用，则启用
ufw --force enable

echo -e "\${GREEN}[3/8] 创建应用目录...\${NC}"
mkdir -p $APP_DIR
mkdir -p $APP_DIR/logs

echo -e "\${GREEN}[4/8] 克隆/更新代码...\${NC}"
if [ -d "$APP_DIR/.git" ]; then
    echo "更新现有仓库..."
    cd $APP_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    echo "克隆仓库..."
    apt-get install -y git
    git clone -b $BRANCH $GIT_REPO $APP_DIR
    cd $APP_DIR
fi

echo -e "\${GREEN}[5/8] 安装依赖...\${NC}"
cd $APP_DIR
npm ci

echo -e "\${GREEN}[6/8] 配置环境变量...\${NC}"
if [ ! -f "$APP_DIR/.env.local" ]; then
    if [ -f "$APP_DIR/deploy/.env.example" ]; then
        cp $APP_DIR/deploy/.env.example $APP_DIR/.env.local
        echo -e "\${YELLOW}警告: .env.local 已创建，请手动配置邮件等设置\${NC}"
    fi
fi

echo -e "\${GREEN}[7/8] 构建应用...\${NC}"
cd $APP_DIR
npm run build

echo -e "\${GREEN}[8/8] 启动应用...\${NC}"
cd $APP_DIR

if pm2 list | grep -q "$APP_NAME"; then
    echo "重启现有应用..."
    pm2 restart $APP_NAME
else
    echo "启动新应用..."
    if [ -f "$APP_DIR/deploy/ecosystem.config.js" ]; then
        pm2 start $APP_DIR/deploy/ecosystem.config.js
    else
        pm2 start npm --name "$APP_NAME" -- start
    fi
fi

pm2 save

# 设置 PM2 开机自启
pm2 startup systemd -hp $HOME --user root | tail -n 1 | bash || true

echo -e "\${GREEN}========================================\${NC}"
echo -e "\${GREEN}  应用部署成功!\${NC}"
echo -e "\${GREEN}========================================\${NC}"
pm2 list

echo ""
echo -e "\${YELLOW}应用日志: pm2 logs $APP_NAME\${NC}"
echo -e "\${YELLOW}应用状态: pm2 list\${NC}"
echo -e "\${YELLOW}实时监控: pm2 monit\${NC}"
EOF

echo ""
echo "=========================================="
echo "  本地部署完成"
echo "=========================================="
echo ""
echo "下一步："
echo "1. 配置 Nginx: ssh root@$SERVER_HOST"
echo "2. 编辑配置: vim /etc/nginx/sites-available/xiamen-union-spares"
echo "3. 启用站点: ln -s /etc/nginx/sites-available/xiamen-union-spares /etc/nginx/sites-enabled/"
echo "4. 测试配置: nginx -t"
echo "5. 重载配置: nginx -s reload"
echo ""
