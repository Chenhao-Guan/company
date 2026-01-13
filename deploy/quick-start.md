# 快速部署指南

## 📦 已创建的文件

```
deploy/
├── deploy.sh              # 主部署脚本（首次部署使用）
├── update.sh              # 更新脚本（代码更新使用）
├── nginx-template.conf    # Nginx 配置模板（参考）
└── README.md              # 详细部署文档
```

---

## 🚀 快速开始

### 1️⃣ 上传代码到服务器

```bash
# 打包（在本地执行）
cd /home/guan/company
tar -czf xiamen-union.tar.gz --exclude=node_modules --exclude=.next .

# 上传
scp xiamen-union.tar.gz root@your-server-ip:/root/

# 或使用 Git
# git clone <your-repo> /root/xiamen-union-spares
```

### 2️⃣ 登录服务器

```bash
ssh root@your-server-ip
```

### 3️⃣ 解压并运行部署脚本

```bash
cd /root
mkdir -p xiamen-union-spares
tar -xzf xiamen-union.tar.gz -C xiamen-union-spares
cd xiamen-union-spares

# 运行部署脚本
./deploy/deploy.sh
```

### 4️⃣ 配置域名 DNS

在阿里云域名控制台添加解析：
- A 记录: @ → 你的服务器IP
- A 记录: www → 你的服务器IP

---

## 🔄 后续更新

```bash
cd /root/xiamen-union-spares
./deploy/update.sh
```

---

## 📝 部署前检查清单

- [ ] 已购买阿里云 ECS（2核4GB以上）
- [ ] 安全组已开放 80、443 端口
- [ ] 已购买域名（如需要）
- [ ] 已准备好 SMTP 邮箱配置（联系表单功能）

---

## 🔑 重要提示

1. 部署时会要求配置 `.env` 文件
2. **必须修改** `JWT_SECRET` 为32位以上随机字符串
3. 建议修改 `ADMIN_PASSWORD`
4. SMTP 配置用于联系表单邮件发送

---

## 📖 详细文档

查看完整部署指南：`deploy/README.md`
