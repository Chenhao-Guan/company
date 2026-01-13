# 视频说明

**重要更新**: 现在使用 YouTube 托管视频，不再使用本地视频文件。

## 为什么使用 YouTube？

1. **带宽友好**: YouTube 免费提供全球 CDN，节省你的服务器带宽
2. **性能优异**: 自动优化视频质量，适配不同网络环境
3. **无需压缩**: 直接上传原始视频，YouTube 自动处理
4. **无限流量**: 不用担心多个用户同时观看

## 如何添加视频

### 1. 上传视频到 YouTube

- 登录 YouTube 账号
- 上传你的视频文件
- 设置视频隐私为"公开"或"不公开（有链接者可知）"

### 2. 获取视频 ID

从 YouTube 视频链接中提取 ID：
```
完整链接: https://www.youtube.com/watch?v=dQw4w9WgXcQ
视频 ID: dQw4w9WgXcQ
```

### 3. 更新代码

在 `components/video-section.tsx` 中替换视频 ID：

```typescript
const youTubeVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: "你的视频标题",
    description: "视频描述",
    videoId: "你的YouTube视频ID"  // 替换这里
  }
]
```

## YouTube 上传建议

- **格式**: MP4, MOV, AVI 等常见格式
- **分辨率**: 1920x1080 (1080p) 或 1280x720 (720p)
- **时长**: 建议 30秒 - 5分钟
- **大小**: 单个视频最大 256GB（完全够用）
- **缩略图**: YouTube 会自动生成，也可以自定义

## 本地视频文件（已弃用）

如果未来需要恢复本地视频：
1. 将视频文件放入此目录
2. 修改 `components/video-section.tsx` 使用 `<video>` 标签
3. 注意：本地视频会占用服务器带宽，不推荐
