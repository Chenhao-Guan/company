/**
 * PM2 配置文件
 * 用于管理 Next.js 应用的进程
 *
 * 使用方法:
 *   pm2 start ecosystem.config.js
 *   pm2 restart xiamen-union-spares
 *   pm2 stop xiamen-union-spares
 *   pm2 logs xiamen-union-spares
 */

module.exports = {
  apps: [
    {
      name: 'xiamen-union-spares',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/xiamen-union-spares',
      instances: 1, // Next.js standalone 模式可以使用 'max' 或 CPU 核心数
      exec_mode: 'fork', // Next.js 不支持 cluster 模式
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/www/xiamen-union-spares/logs/error.log',
      out_file: '/var/www/xiamen-union-spares/logs/out.log',
      log_file: '/var/www/xiamen-union-spares/logs/combined.log',
      time: true,
      merge_logs: true,
      // 优雅关闭
      kill_timeout: 5000,
      wait_ready: true,
      // 健康检查
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
}
