"use client"

import { memo } from "react"

interface YouTubeVideo {
  id: number
  title: string
  description: string
  videoId: string  // YouTube video ID (e.g., dQw4w9WgXcQ)
}

// 替换为你的YouTube视频ID
const youTubeVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: "厦门联合备件有限公司",
    description: "Xiamen Union Spares Ltd. - 专业工业设备备件供应商",
    videoId: "bEvZFN-FID8"  // 你的YouTube视频ID
  }
]

function VideoSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video Introduction
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our products and services through video
          </p>
        </div>

        <div className="flex justify-center items-center max-w-5xl mx-auto">
          {youTubeVideos.map((video) => (
            <div
              key={video.id}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                  {video.title}
                </h3>
                <p className="text-lg text-gray-600 text-center">
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
