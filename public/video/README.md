# 视频文件目录

## 如何添加视频

1. 将视频文件（MP4格式）放入此目录
2. 建议命名：
   - video1.mp4
   - video2.mp4
   - video3.mp4

3. 视频封面图放在 `/public/image/` 目录：
   - video1-poster.jpg
   - video2-poster.jpg
   - video3-poster.jpg

## 视频格式建议

- **格式**: MP4 (H.264编码)
- **分辨率**: 1280x720 或 1920x1080
- **比特率**: 1-3 Mbps (平衡质量和文件大小)
- **时长**: 建议 30秒 - 3分钟

## 视频压缩工具推荐

- HandBrake (免费, 开源)
- FFmpeg (命令行工具)
- 在线工具: CloudConvert, FreeConvert

## 性能优化

视频组件已配置以下优化：
- `preload="none"` - 不预加载，节省带宽
- 封面图占位 - 未播放时显示图片
- 用户手动点击播放 - 减少自动加载
