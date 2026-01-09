// LOADING SKELETON COMPONENT

// frontend/src/components/LoadingSkeleton.jsx

const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      {/* Main Weather Card Skeleton */}
      <div className="bg-linear-gradient-to-br from-gray-300 to-gray-400 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left">
            <div className="h-8 bg-white/30 rounded-lg w-48 mb-4 mx-auto md:mx-0"></div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-24 h-24 bg-white/30 rounded-full"></div>
              <div>
                <div className="h-16 bg-white/30 rounded-lg w-32 mb-2"></div>
                <div className="h-6 bg-white/30 rounded-lg w-40"></div>
              </div>
            </div>
            <div className="h-6 bg-white/30 rounded-lg w-36 mt-4 mx-auto md:mx-0"></div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/20 rounded-xl px-6 py-3 w-40">
              <div className="h-4 bg-white/30 rounded mb-2"></div>
              <div className="h-6 bg-white/30 rounded"></div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3 w-40">
              <div className="h-4 bg-white/30 rounded mb-2"></div>
              <div className="h-6 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;