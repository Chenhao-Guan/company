"use client"

import { useState, memo } from "react"

interface Video {
  id: number
  title: string
  description: string
  src: string
  poster: string
}

const videos: Video[] = [
  {
    id: 1,
    title: "产品展示",
    description: "了解我们的高质量工业备件产品",
    src: "/video/video1.mp4",
    poster: "/image/video1-poster.jpg"
  },
  {
    id: 2,
    title: "生产流程",
    description: "严格的质量控制体系",
    src: "/video/video2.mp4",
    poster: "/image/video2-poster.jpg"
  },
  {
    id: 3,
    title: "公司介绍",
    description: "厦门联合备件有限公司",
    src: "/video/video3.mp4",
    poster: "/image/video3-poster.jpg"
  }
]

function VideoSection() {
  const [_playingStates, setPlayingStates] = useState<Record<number, boolean>>({})

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            视频展示
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            通过视频了解我们的产品和服务
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video bg-black">
                <video
                  id={`video-${video.id}`}
                  className="w-full h-full"
                  poster={video.poster}
                  preload="none"
                  controls
                  onPlay={() => setPlayingStates(prev => ({ ...prev, [video.id]: true }))}
                  onPause={() => setPlayingStates(prev => ({ ...prev, [video.id]: false }))}
                >
                  <source src={video.src} type="video/mp4" />
                  您的浏览器不支持视频播放
                </video>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(VideoSection)
