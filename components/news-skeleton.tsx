import { Skeleton } from "@/components/ui/skeleton"

export function NewsCardSkeleton() {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-56 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category skeleton */}
        <Skeleton className="h-5 w-24 rounded" />

        {/* Title skeleton */}
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-3/4 rounded" />

        {/* Date and author skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Excerpt skeleton */}
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />

        {/* Tags skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
      </div>
    </article>
  )
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  )
}
