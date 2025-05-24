export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-1/4 bg-pink-100 rounded-full animate-pulse"></div>
          </div>
          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Overall Score Skeleton */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Scores Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Product Details Skeleton */}
        <div className="border-t pt-8 grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
