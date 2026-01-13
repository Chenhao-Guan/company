#!/bin/bash

# 部署脚本 - 用于阿里云服务器
# 使用方法: ./deploy.sh [environment]
# 示例: ./deploy.sh production

set -e  # 遇到错误时退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
APP_NAME="xiamen-union-spares"
APP_DIR="/var/www/$APP_NAME"
GIT_REPO="${GIT_REPO:-}"  # 从环境变量或手动设置
BRANCH="${BRANCH:-main}"
NODE_VERSION="${NODE_VERSION:-20}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  厦门联备网站部署脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}请使用 sudo 运行此脚本${NC}"
    exit 1
fi

# 1. 检查并安装依赖
echo -e "\n${YELLOW}[1/7] 检查系统依赖...${NC}"
command -v git >/dev/null 2>&1 || { echo -e "${RED}Git 未安装，正在安装...${NC}"; apt-get update && apt-get install -y git; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js 未安装，请先安装 Node.js $NODE_VERSION${NC}"; exit 1; }

# 2. 创建应用目录
echo -e "\n${YELLOW}[2/7] 创建应用目录...${NC}"
mkdir -p $APP_DIR
mkdir -p $APP_DIR/logs

# 3. 拉取代码
echo -e "\n${YELLOW}[3/7] 拉取最新代码...${NC}"
if [ -d "$APP_DIR/.git" ]; then
    echo "更新现有仓库..."
    cd $APP_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    if [ -z "$GIT_REPO" ]; then
        echo -e "${RED}错误: 请设置 GIT_REPO 环境变量${NC}"
        echo "示例: export GIT_REPO=https://github.com/your-username/your-repo.git"
        exit 1
    fi
    echo "克隆仓库..."
    git clone -b $BRANCH $GIT_REPO $APP_DIR
    cd $APP_DIR
fi

# 4. 安装依赖
echo -e "\n${YELLOW}[4/7] 安装 Node.js 依赖...${NC}"
cd $APP_DIR
npm ci --production=false

# 5. 环境变量配置
echo -e "\n${YELLOW}[5/7] 检查环境变量...${NC}"
if [ ! -f "$APP_DIR/.env.local" ]; then
    if [ -f "$APP_DIR/.env.example" ]; then
        cp "$APP_DIR/.env.example" "$APP_DIR/.env.local"
        echo -e "${YELLOW}警告: .env.local 已创建，请配置以下变量:${NC}"
        echo "  - CONTACT_EMAIL"
        echo "  - CONTACT_CC_EMAIL (可选)"
        echo "  - SMTP_HOST (如果使用邮件功能)"
        echo "  - SMTP_USER (如果使用邮件功能)"
        echo "  - SMTP_PASS (如果使用邮件功能)"
    else
        echo -e "${YELLOW}警告: .env.example 不存在，跳过环境变量配置${NC}"
    fi
fi

# 6. 构建应用
echo -e "\n${YELLOW}[6/7] 构建应用...${NC}"
npm run build

# 7. 使用 PM2 启动/重启应用
echo -e "\n${YELLOW}[7/7] 启动应用...${NC}"
command -v pm2 >/dev/null 2>&1 || {
    echo -e "${YELLOW}PM2 未安装，正在安装...${NC}"
    npm install -g pm2
}

if pm2 list | grep -q "$APP_NAME"; then
    echo "重启现有应用..."
    pm2 restart $APP_NAME
    pm2 save
else
    echo "启动新应用..."
    if [ -f "$APP_DIR/deploy/ecosystem.config.js" ]; then
        pm2 start $APP_DIR/deploy/ecosystem.config.js
    else
        pm2 start npm --name "$APP_NAME" -- start
    fi
    pm2 save
    pm2 startup | tail -n 1 | sudo bash  # 设置开机自启
fi

# 显示应用状态
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成!${NC}"
echo -e "${GREEN}========================================${NC}"
pm2 list

echo -e "\n${YELLOW}应用日志查看:${NC}"
echo "  pm2 logs $APP_NAME"
echo "  pm2 logs $APP_NAME --lines 100"

echo -e "\n${YELLOW}应用管理命令:${NC}"
echo "  pm2 restart $APP_NAME  # 重启"
echo "  pm2 stop $APP_NAME     # 停止"
echo "  pm2 monit              # 监控"
