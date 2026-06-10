"use client"

import { memo } from "react"

interface YouTubeVideo {
  id: number
  title: string
  description: string
  videoId: string
}

const youTubeVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: "厦门联合备件有限公司",
    description: "Xiamen Union Spares Ltd. — Precision Spare Parts Manufacturing",
    videoId: "bEvZFN-FID8",
  },
]

function VideoSection() {
  return (
    <section className="py-24 bg-[hsl(var(--background))] relative">
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[hsl(var(--primary))]" />
          <span className="spec-label text-[hsl(var(--primary))]">FACTORY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-12 tracking-tight">
          Facility overview.
        </h2>

        {youTubeVideos.map((video) => (
          <div key={video.id} className="border border-[hsl(var(--border))] overflow-hidden">
            <div className="relative aspect-video bg-[hsl(var(--muted))]">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="px-6 py-5 border-t border-[hsl(var(--border))] bg-white">
              <h3 className="text-sm font-bold text-[hsl(var(--foreground))] mb-1">
                {video.title}
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default memo(VideoSection)
