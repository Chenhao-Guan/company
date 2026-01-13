#!/bin/bash

################################################################################
# 厦门联信备件有限公司网站 - 阿里云 ECS 自动部署脚本
#
# 使用方法:
#   1. 将此脚本上传到服务器
#   2. chmod +x deploy.sh
#   3. ./deploy.sh
################################################################################

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "请使用 root 用户或 sudo 运行此脚本"
        exit 1
    fi
}

# 检测操作系统
detect_os() {
    if [ -f /etc/redhat-release ]; then
        OS="centos"
        info "检测到 CentOS/RHEL 系统"
    elif [ -f /etc/debian_version ]; then
        OS="ubuntu"
        info "检测到 Ubuntu/Debian 系统"
    else
        error "不支持的操作系统"
        exit 1
    fi
}

# 安装 Node.js 18.x
install_nodejs() {
    info "开始安装 Node.js 18.x..."

    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -ge 18 ]; then
            info "Node.js 已安装，版本: $(node -v)"
            return
        fi
    fi

    if [ "$OS" = "centos" ]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
        yum install -y nodejs
    else
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi

    info "Node.js 安装完成，版本: $(node -v)"
    info "npm 版本: $(npm -v)"
}

# 安装 PM2
install_pm2() {
    info "安装 PM2 进程管理器..."

    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
        info "PM2 安装完成，版本: $(pm2 -v)"
    else
        info "PM2 已安装，版本: $(pm2 -v)"
    fi
}

# 安装 Nginx
install_nginx() {
    info "安装 Nginx..."

    if command -v nginx &> /dev/null; then
        info "Nginx 已安装"
        return
    fi

    if [ "$OS" = "centos" ]; then
        yum install -y nginx
    else
        apt-get update
        apt-get install -y nginx
    fi

    # 启动并设置开机自启
    systemctl start nginx
    systemctl enable nginx

    info "Nginx 安装并启动完成"
}

# 配置防火墙
configure_firewall() {
    info "配置防火墙..."

    if [ "$OS" = "centos" ]; then
        if command -v firewall-cmd &> /dev/null; then
            firewall-cmd --permanent --add-service=http
            firewall-cmd --permanent --add-service=https
            firewall-cmd --reload
            info "firewalld 已配置"
        fi
    else
        if command -v ufw &> /dev/null; then
            ufw allow 80/tcp
            ufw allow 443/tcp
            ufw allow 22/tcp
            info "ufw 已配置"
        fi
    fi

    warn "请确保阿里云安全组已开放 80、443 端口！"
}

# 安装项目依赖
install_dependencies() {
    info "安装项目依赖..."

    if [ ! -d "node_modules" ]; then
        npm install
        info "依赖安装完成"
    else
        info "node_modules 已存在，跳过安装"
    fi
}

# 配置环境变量
setup_env() {
    info "配置环境变量..."

    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            warn "已创建 .env 文件，请编辑配置："
            warn "  vim .env"
            warn ""
            warn "重要配置项："
            warn "  - JWT_SECRET (必须修改为32位以上随机字符串)"
            warn "  - ADMIN_PASSWORD (建议修改)"
            warn "  - SMTP 配置（用于邮件发送）"
            echo ""
            read -p "是否现在编辑 .env 文件？(y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                vim .env
            fi
        else
            error ".env.example 文件不存在"
            exit 1
        fi
    else
        info ".env 文件已存在"
    fi
}

# 构建项目
build_project() {
    info "构建 Next.js 项目..."

    # 创建数据库目录
    mkdir -p database

    npm run build

    info "项目构建完成"
}

# 启动应用（使用 PM2）
start_app() {
    info "启动 Next.js 应用..."

    # 停止旧的进程
    pm2 delete xiamen-union 2>/dev/null || true

    # 启动新进程
    pm2 start npm --name "xiamen-union" -- start

    # 保存 PM2 配置
    pm2 save

    # 设置开机自启
    pm2 startup systemd -u root --hp /root

    info "应用启动成功"
    pm2 status
}

# 配置 Nginx
configure_nginx() {
    info "配置 Nginx 反向代理..."

    # 获取域名
    read -p "请输入您的域名 (例如: xiamenunion.com): " DOMAIN

    if [ -z "$DOMAIN" ]; then
        warn "未输入域名，使用默认配置"
        DOMAIN="example.com"
    fi

    # 创建 Nginx 配置文件
    cat > /etc/nginx/conf.d/xiamen-union.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # 日志文件
    access_log /var/log/nginx/xiamen-union-access.log;
    error_log /var/log/nginx/xiamen-union-error.log;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 静态文件缓存
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # 图片缓存
    location /image {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 视频缓存
    location /video {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # 测试配置
    nginx -t

    # 重启 Nginx
    systemctl restart nginx

    info "Nginx 配置完成"
}

# 安装 SSL 证书（可选）
install_ssl() {
    echo ""
    read -p "是否安装 SSL 证书 (HTTPS)？(y/n) " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        info "安装 Certbot..."

        if [ "$OS" = "centos" ]; then
            yum install -y certbot python3-certbot-nginx
        else
            apt-get install -y certbot python3-certbot-nginx
        fi

        # 获取域名
        read -p "请输入您的域名 (例如: xiamenunion.com): " DOMAIN

        if [ -z "$DOMAIN" ]; then
            warn "未输入域名，跳过 SSL 安装"
            return
        fi

        # 获取邮箱
        read -p "请输入您的邮箱 (用于证书到期提醒): " EMAIL

        if [ -z "$EMAIL" ]; then
            warn "未输入邮箱，跳过 SSL 安装"
            return
        fi

        info "申请 SSL 证书..."
        certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL

        # 设置自动续期
        (crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet") | crontab -

        info "SSL 证书安装完成，已配置自动续期"
        info "访问地址: https://$DOMAIN"
    else
        info "跳过 SSL 安装"
        info "访问地址: http://$DOMAIN"
    fi
}

# 显示部署信息
show_info() {
    echo ""
    echo "=========================================="
    echo -e "${GREEN}部署完成！${NC}"
    echo "=========================================="
    echo ""
    echo "服务状态："
    echo "  • Nginx:      $(systemctl is-active nginx)"
    echo "  • PM2 应用:   $(pm2 status | grep xiamen-union | awk '{print $10}')"
    echo ""
    echo "常用命令："
    echo "  • 查看应用日志:   pm2 logs xiamen-union"
    echo "  • 重启应用:       pm2 restart xiamen-union"
    echo "  • 查看 Nginx 日志: tail -f /var/log/nginx/xiamen-union-access.log"
    echo ""
    echo "下一步："
    echo "  1. 配置域名 DNS 解析指向服务器 IP"
    echo "  2. 确保阿里云安全组开放 80、443 端口"
    echo "  3. 访问网站测试"
    echo ""
    echo "=========================================="
}

# 主函数
main() {
    echo ""
    echo "=========================================="
    echo "  厦门联信备件有限公司网站 - 自动部署脚本"
    echo "=========================================="
    echo ""

    check_root
    detect_os

    read -p "是否开始部署？(y/n) " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        info "取消部署"
        exit 0
    fi

    # 执行部署步骤
    install_nodejs
    install_pm2
    install_nginx
    configure_firewall
    install_dependencies
    setup_env
    build_project
    start_app
    configure_nginx
    install_ssl
    show_info

    echo ""
    info "所有步骤已完成！"
}

# 运行主函数
main
