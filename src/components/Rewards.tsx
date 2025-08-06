'use client';

import Image from 'next/image';
import Link from 'next/link';
// data/trendingItems.ts
export const trendingItems = [
  {
  
    imageUrl: "/images/reward1.png",
  },
  {
   
    imageUrl:"/images/reward2.png",
  },
  {
    
    imageUrl: "/images/reward3.png",
  },
  {
  
    imageUrl:"/images/reward4.png",
  },
  {
   
    imageUrl: "/images/reward1.png",
  }
];

export default function Offers() {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
          Offers & Rewards
        </h1>
        <Link 
          href="/trending" 
          className="text-sm sm:text-base text-purple-600 hover:underline whitespace-nowrap ml-2"
        >
          View All
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {trendingItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
              <Image
                src={item.imageUrl}
                alt={item.title || `Offer ${index + 1}`}
                fill
                className="object-cover w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Optional overlay with title */}
            {item.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <h3 className="text-white text-xs sm:text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
