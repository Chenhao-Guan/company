#!/bin/bash

################################################################################
# 厦门联信备件有限公司网站 - 代码更新脚本
#
# 使用方法（项目目录下运行）:
#   ./deploy/update.sh
################################################################################

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 拉取最新代码
pull_code() {
    info "拉取最新代码..."

    git pull

    info "代码更新完成"
}

# 安装依赖
install_dependencies() {
    info "检查依赖..."

    if [ "package.json" -nt "node_modules" ] || [ ! -d "node_modules" ]; then
        info "安装新依赖..."
        npm install
    else
        info "依赖无需更新"
    fi
}

# 重新构建
rebuild() {
    info "重新构建项目..."

    npm run build

    info "项目构建完成"
}

# 重启应用
restart_app() {
    info "重启应用..."

    pm2 restart xiamen-union

    info "应用重启成功"
}

# 显示状态
show_status() {
    echo ""
    echo "=========================================="
    pm2 status
    echo "=========================================="
    echo ""
    info "更新完成！"
    echo ""
    echo "查看日志: pm2 logs xiamen-union"
}

# 主函数
main() {
    echo ""
    echo "=========================================="
    echo "  更新厦门联信备件网站"
    echo "=========================================="
    echo ""

    pull_code
    install_dependencies
    rebuild
    restart_app
    show_status
}

# 运行主函数
main
