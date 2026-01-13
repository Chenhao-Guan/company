# 阿里云 ECS 部署指南

厦门联信备件有限公司网站 - 自动部署脚本使用说明

---

## 📋 目录

1. [前置准备](#前置准备)
2. [首次部署](#首次部署)
3. [代码更新](#代码更新)
4. [常用命令](#常用命令)
5. [故障排查](#故障排查)

---

## 前置准备

### 1. 购买阿里云 ECS

- **规格**: 至少 2核4GB
- **操作系统**: Ubuntu 20.04/22.04 或 CentOS 7/8
- **带宽**: 3-5 Mbps

### 2. 配置安全组

登录阿里云控制台 → ECS → 安全组 → 配置规则

| 协议 | 端口 | 授权对象 | 说明 |
|------|------|----------|------|
| TCP | 22 | 0.0.0.0/0 | SSH（可选限制你的IP） |
| TCP | 80 | 0.0.0.0/0 | HTTP |
| TCP | 443 | 0.0.0.0/0 | HTTPS |

⚠️ **不要开放 3000 端口！**

### 3. 购买域名（可选）

- 阿里云：https://wanwang.aliyun.com
- 配置 DNS 解析指向 ECS 公网 IP

---

## 首次部署

### 步骤 1: 上传代码到服务器

**方式一：使用 SCP 上传**

```bash
# 在本地打包项目
cd /home/guan/company
tar -czf xiamen-union.tar.gz --exclude=node_modules --exclude=.next .

# 上传到服务器
scp xiamen-union.tar.gz root@your-server-ip:/root/

# 登录服务器
ssh root@your-server-ip

# 解压
cd /root
mkdir -p xiamen-union-spares
tar -xzf xiamen-union.tar.gz -C xiamen-union-spares
cd xiamen-union-spares
```

**方式二：使用 Git 克隆**

```bash
# 登录服务器
ssh root@your-server-ip

# 克隆代码
git clone <your-repo-url> /root/xiamen-union-spares
cd xiamen-union-spares
```

### 步骤 2: 运行部署脚本

```bash
# 赋予执行权限
chmod +x deploy/deploy.sh

# 运行部署脚本
./deploy/deploy.sh
```

脚本会自动完成以下操作：
1. ✅ 安装 Node.js 18.x
2. ✅ 安装 PM2 进程管理器
3. ✅ 安装 Nginx
4. ✅ 配置防火墙
5. ✅ 安装项目依赖
6. ✅ 配置环境变量
7. ✅ 构建项目
8. ✅ 启动应用
9. ✅ 配置 Nginx 反向代理
10. ✅ 安装 SSL 证书（可选）

### 步骤 3: 配置域名 DNS

登录阿里云控制台 → 域名 → DNS 解析

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| A | @ | 你的服务器IP |
| A | www | 你的服务器IP |

---

## 代码更新

当需要更新代码时，运行更新脚本：

```bash
cd /root/xiamen-union-spares
./deploy/update.sh
```

更新脚本会自动：
1. 拉取最新代码（git pull）
2. 安装新依赖（如需要）
3. 重新构建项目
4. 重启应用

---

## 常用命令

### PM2 应用管理

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs xiamen-union

# 查看实时日志
pm2 logs xiamen-union --lines 100

# 重启应用
pm2 restart xiamen-union

# 停止应用
pm2 stop xiamen-union

# 监控
pm2 monit
```

### Nginx 管理

```bash
# 测试配置文件
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx

# 重新加载配置（不中断服务）
sudo systemctl reload nginx

# 查看 Nginx 状态
sudo systemctl status nginx

# 查看访问日志
sudo tail -f /var/log/nginx/xiamen-union-access.log

# 查看错误日志
sudo tail -f /var/log/nginx/xiamen-union-error.log
```

### 系统管理

```bash
# 查看端口占用
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80

# 查看磁盘空间
df -h

# 查看内存使用
free -h

# 查看系统资源
htop
```

---

## 故障排查

### 问题 1: 访问网站显示 "无法访问"

**可能原因：**
- DNS 未生效
- 安全组未开放端口
- Nginx 未启动

**解决方案：**
```bash
# 1. 检查 DNS 解析
ping your-domain.com

# 2. 检查安全组
# 阿里云控制台 → ECS → 安全组

# 3. 检查 Nginx
sudo systemctl status nginx
sudo systemctl start nginx

# 4. 检查端口监听
sudo netstat -tlnp | grep :80
```

### 问题 2: 502 Bad Gateway

**可能原因：**
- Next.js 应用未启动
- 端口 3000 未监听

**解决方案：**
```bash
# 检查 PM2 状态
pm2 status

# 如果应用未运行
pm2 start npm --name "xiamen-union" -- start
pm2 save

# 查看应用日志
pm2 logs xiamen-union --err
```

### 问题 3: SSL 证书申请失败

**可能原因：**
- 域名未解析到服务器
- 80 端口未开放

**解决方案：**
```bash
# 1. 确认域名解析
nslookup your-domain.com

# 2. 确认 80 端口开放
sudo netstat -tlnp | grep :80

# 3. 手动申请证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 问题 4: 更新后网站样式错乱

**解决方案：**
```bash
# 清除浏览器缓存
# 或重启应用
pm2 restart xiamen-union

# 重启 Nginx
sudo systemctl restart nginx
```

---

## 环境变量配置

编辑 `.env` 文件配置以下关键参数：

```bash
# 数据库路径
DATABASE_PATH=/root/xiamen-union-spares/database/xiamen-union.db

# JWT 密钥（必须修改为32位以上随机字符串）
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# 管理员密码
ADMIN_PASSWORD=admin123

# 联系邮箱
CONTACT_EMAIL=info@xiamenunion.com

# SMTP 邮件配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Xiamen Union Spares <info@xiamenunion.com>"
```

---

## 备份建议

### 数据库备份

```bash
# 创建备份脚本
cat > /root/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /root/xiamen-union-spares/database/xiamen-union.db /root/backup/xiamen-union-$DATE.db
# 保留最近30天的备份
find /root/backup -name "xiamen-union-*.db" -mtime +30 -delete
EOF

chmod +x /root/backup.sh

# 添加定时任务
crontab -e
# 添加: 0 2 * * * /root/backup.sh
```

---

## 监控建议

### 安装监控工具

```bash
# 安装 Nginx 访客统计（可选）
# 或使用阿里云云监控服务
```

---

## 联系支持

如有问题，请查看：
- PM2 日志：`pm2 logs xiamen-union`
- Nginx 日志：`/var/log/nginx/xiamen-union-error.log`
- 系统日志：`journalctl -xe`

---

**部署完成后访问地址：**
- HTTP: http://your-domain.com
- HTTPS: https://your-domain.com（如已安装SSL）
