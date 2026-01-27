const BookCardShimmer = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="relative aspect-3/4 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1 gap-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default function BooksShimmerGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardShimmer key={index} />
      ))}
    </div>
  );
};
