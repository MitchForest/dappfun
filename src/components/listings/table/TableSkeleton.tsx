'use client';

export function TableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="py-4 px-4 w-16">
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </td>
          <td className="py-4 px-4 w-80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-48 bg-gray-200 rounded" />
              </div>
            </div>
          </td>
          <td className="py-4 px-4 w-32">
            <div className="h-7 w-20 bg-gray-200 rounded-full" />
          </td>
          <td className="py-4 px-4 w-48">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-7 h-7 rounded-full bg-gray-200 ring-[1.5px] ring-white" />
              ))}
            </div>
          </td>
          <td className="py-4 px-4 w-48">
            <div className="flex -space-x-1">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="w-7 h-7 rounded-full bg-gray-200 ring-[1.5px] ring-white" />
              ))}
            </div>
          </td>
          <td className="py-4 px-4 w-32">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </td>
          <td className="py-4 px-4 w-32">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
} 