# 阿里云服务器部署指南

本文档说明如何将厦门联备网站部署到阿里云服务器。

## 目录

- [服务器准备](#服务器准备)
- [域名配置](#域名配置)
- [部署应用](#部署应用)
- [配置 Nginx](#配置-nginx)
- [SSL 证书配置](#ssl-证书配置)
- [维护和监控](#维护和监控)
- [故障排查](#故障排查)

## 服务器准备

### 1. 购买阿里云服务器

推荐配置：
- **CPU**: 2核心或以上
- **内存**: 4GB 或以上
- **带宽**: 5Mbps 或以上
- **系统**: Ubuntu 22.04 LTS 或 20.04 LTS

### 2. 安装系统依赖

登录服务器后，执行以下命令：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装基础工具
sudo apt install -y curl wget git vim build-essential

# 安装 Node.js 20 (推荐使用 nvm 或 NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node --version  # 应该显示 v20.x.x
npm --version   # 应该显示 10.x.x

# 安装 PM2 (进程管理器)
sudo npm install -g pm2

# 安装 Nginx
sudo apt install -y nginx

# 安装 Certbot (SSL 证书)
sudo apt install -y certbot python3-certbot-nginx
```

### 3. 配置防火墙

```bash
# 允许 SSH
sudo ufw allow 22/tcp

# 允许 HTTP 和 HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

### 4. 配置 Git 访问

**方式一: 使用 HTTPS**

```bash
# 无需额外配置，但在部署时需要输入凭据
```

**方式二: 使用 SSH 密钥 (推荐)**

```bash
# 在服务器上生成 SSH 密钥
ssh-keygen -t ed25519 -C "your-email@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 将公钥添加到 GitHub/GitLab 的 SSH keys 中
```

## 域名配置

### 1. 购买域名

在阿里云或其他域名注册商购买域名。

### 2. 配置 DNS 解析

在阿里云控制台添加 DNS 记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A       | @       | 你的服务器 IP | 600 |
| A       | www     | 你的服务器 IP | 600 |

等待 DNS 生效（通常需要几分钟到几小时）。

## 部署应用

### 1. 克隆代码到服务器

```bash
# 克隆代码仓库
git clone <your-repo-url> /var/www/xiamen-union-spares

# 进入目录
cd /var/www/xiamen-union-spares

# 查看部署脚本
ls -la deploy/
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp deploy/.env.example .env.local

# 编辑环境变量
vim .env.local
```

**必须配置的变量：**
- `CONTACT_EMAIL` - 联系表单的主要收件邮箱
- `SMTP_HOST`、`SMTP_USER`、`SMTP_PASS` - 邮件服务器配置（如需邮件功能）

### 3. 执行部署脚本

```bash
# 设置 Git 仓库地址
export GIT_REPO=<your-repo-url>

# 可选：设置分支 (默认为 main)
export BRANCH=main

# 执行部署脚本
sudo bash deploy/deploy.sh
```

部署脚本会自动：
1. 检查系统依赖
2. 拉取最新代码
3. 安装 Node.js 依赖
4. 构建应用
5. 使用 PM2 启动应用

## 配置 Nginx

### 1. 复制 Nginx 配置文件

```bash
# 复制配置文件
sudo cp deploy/nginx.conf /etc/nginx/sites-available/xiamen-union-spares

# 编辑配置文件，修改域名
sudo vim /etc/nginx/sites-available/xiamen-union-spares
```

**需要修改的内容：**
- `server_name` - 改为你的域名 (如 `example.com www.example.com`)
- SSL 证书路径 (在配置 SSL 证书后更新)

### 2. 创建软链接并测试配置

```bash
# 创建软链接启用站点
sudo ln -s /etc/nginx/sites-available/xiamen-union-spares /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试 Nginx 配置
sudo nginx -t

# 如果测试通过，重载配置
sudo nginx -s reload
```

## SSL 证书配置

### 使用 Let's Encrypt 免费证书

```bash
# 安装证书（会自动配置 Nginx）
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 按提示输入邮箱并同意服务条款

# 测试证书续期
sudo certbot renew --dry-run
```

Certbot 会自动：
1. 验证域名所有权
2. 颁发 SSL 证书
3. 更新 Nginx 配置以使用 HTTPS

### 手动续期证书

证书有效期为 90 天，建议设置自动续期：

```bash
# 添加定时任务
sudo crontab -e

# 添加以下行（每天凌晨 2 点检查并续期）
0 2 * * * certbot renew --quiet --post-hook "nginx -s reload"
```

## 维护和监控

### 查看 PM2 应用状态

```bash
# 查看所有应用
pm2 list

# 查看应用详细信息
pm2 show xiamen-union-spares

# 查看实时日志
pm2 logs xiamen-union-spares

# 查看最近 100 行日志
pm2 logs xiamen-union-spares --lines 100

# 实时监控
pm2 monit
```

### 应用管理

```bash
# 重启应用
pm2 restart xiamen-union-spares

# 停止应用
pm2 stop xiamen-union-spares

# 删除应用
pm2 delete xiamen-union-spares

# 保存 PM2 配置（确保开机自启）
pm2 save
```

### 更新应用

当有新代码需要部署时：

```bash
# 方式一：使用部署脚本
cd /var/www/xiamen-union-spares
sudo bash deploy/deploy.sh

# 方式二：手动更新
cd /var/www/xiamen-union-spares
git pull origin main
npm install
npm run build
pm2 restart xiamen-union-spares
```

### 查看系统资源

```bash
# 查看 CPU 和内存使用
top

# 查看磁盘使用
df -h

# 查看 Nginx 访问日志
sudo tail -f /var/log/nginx/xiamen-union-spares-access.log

# 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/xiamen-union-spares-error.log
```

## 故障排查

### 应用无法启动

```bash
# 1. 检查 PM2 日志
pm2 logs xiamen-union-spares --err

# 2. 手动运行应用查看错误
cd /var/www/xiamen-union-spares
npm run start

# 3. 检查端口是否被占用
sudo netstat -tlnp | grep 3000

# 4. 检查环境变量
cat .env.local
```

### Nginx 502 Bad Gateway

```bash
# 1. 检查 Next.js 应用是否运行
pm2 list

# 2. 检查 Nginx 配置
sudo nginx -t

# 3. 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/xiamen-union-spares-error.log

# 4. 检查防火墙
sudo ufw status
```

### 域名无法访问

```bash
# 1. 检查 DNS 解析
nslookup your-domain.com

# 2. 检查 Nginx 配置
sudo nginx -t

# 3. 检查防火墙
sudo ufw status

# 4. 检查阿里云安全组规则
# 确保在阿里云控制台开放了 80 和 443 端口
```

### SSL 证书问题

```bash
# 1. 重新申请证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com --force-renewal

# 2. 检查证书有效期
sudo certbot certificates

# 3. 查看 Certbot 日志
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

## 安全建议

1. **定期更新系统**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **配置 SSH 密钥登录**
   ```bash
   # 禁用密码登录
   sudo vim /etc/ssh/sshd_config
   # 修改 PasswordAuthentication no
   sudo systemctl restart sshd
   ```

3. **设置 fail2ban 防止暴力破解**
   ```bash
   sudo apt install -y fail2ban
   ```

4. **定期备份数据**
   ```bash
   # 备份应用和配置
   tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/xiamen-union-spares
   ```

5. **监控服务器资源**
   - 使用阿里云云监控
   - 配置告警规则（CPU、内存、磁盘使用率）

## 性能优化

1. **启用 HTTP/2** - 已在 Nginx 配置中启用
2. **配置 CDN** - 可将静态资源放到阿里云 CDN
3. **数据库优化** - 如使用数据库，考虑使用阿里云 RDS
4. **启用缓存** - Next.js 已配置 ISR 和静态资源缓存
5. **图片优化** - 使用 WebP 格式，已配置

## 联系支持

如遇到问题，请检查：
1. PM2 日志: `pm2 logs xiamen-union-spares`
2. Nginx 日志: `/var/log/nginx/`
3. 系统日志: `sudo journalctl -xe`

---

**部署完成后访问**: https://your-domain.com
