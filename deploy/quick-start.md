# 快速部署指南

这是一份简化的部署步骤，帮助你快速将网站部署到阿里云服务器。

## 前提条件

- 已购买阿里云服务器（推荐配置：2核4GB，Ubuntu 22.04）
- 已购买域名并配置 DNS 解析到服务器 IP

## 第一步：服务器初始化

SSH 登录到你的服务器：

```bash
ssh root@your-server-ip

# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PM2 和 Nginx
sudo npm install -g pm2
sudo apt install -y nginx

# 安装 Certbot (用于 SSL 证书)
sudo apt install -y certbot python3-certbot-nginx
```

## 第二步：部署应用

```bash
# 1. 克隆代码
git clone <your-repo-url> /var/www/xiamen-union-spares
cd /var/www/xiamen-union-spares

# 2. 配置环境变量
cp deploy/.env.example .env.local
vim .env.local  # 填写邮件配置等

# 3. 设置 Git 仓库地址并执行部署
export GIT_REPO=<your-repo-url>
sudo bash deploy/deploy.sh
```

## 第三步：配置 Nginx

```bash
# 1. 复制并编辑 Nginx 配置
sudo cp deploy/nginx.conf /etc/nginx/sites-available/xiamen-union-spares
sudo vim /etc/nginx/sites-available/xiamen-union-spares

# 修改以下两行为你的域名：
# server_name your-domain.com www.your-domain.com;

# 2. 启用站点
sudo ln -s /etc/nginx/sites-available/xiamen-union-spares /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # 可选

# 3. 测试并重载
sudo nginx -t
sudo nginx -s reload
```

## 第四步：配置 SSL 证书

```bash
# 申请 Let's Encrypt 免费证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 按提示输入邮箱并同意服务条款
```

## 第五步：验证部署

```bash
# 检查应用状态
pm2 list

# 查看日志
pm2 logs xiamen-union-spares

# 访问你的域名
# https://your-domain.com
```

## 常用命令

```bash
# 更新应用
cd /var/www/xiamen-union-spares
git pull
npm install
npm run build
pm2 restart xiamen-union-spares

# 查看日志
pm2 logs xiamen-union-spares
tail -f /var/log/nginx/xiamen-union-spares-error.log

# 重启服务
pm2 restart xiamen-union-spares
sudo nginx -s reload
```

## 故障排查

**502 Bad Gateway**: 检查 PM2 应用是否运行
```bash
pm2 list
pm2 restart xiamen-union-spares
```

**域名无法访问**: 检查 DNS 和 Nginx 配置
```bash
nslookup your-domain.com
sudo nginx -t
```

**SSL 证书问题**: 重新申请证书
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com --force-renewal
```

## 阿里云安全组配置

确保在阿里云控制台开放以下端口：
- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)

---

**完整文档**: 查看 [deploy/README.md](./README.md) 获取更多详细信息。
