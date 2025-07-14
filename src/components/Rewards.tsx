'use client';

import Image from 'next/image';
import Link from 'next/link';
// data/trendingItems.ts
export const trendingItems = [
  {
    title: "Titanic",
    imageUrl: "/images/reward1.jpg",
  },
  {
    title: "Perth's International Summer",
    imageUrl:"/images/reward2.jpg",
  },
  {
    title: "Family Fun Day",
    imageUrl: "/images/reward3.jpg",
  },
  {
    title: "Premier League Live",
    imageUrl:"/images/reward4.jpg",
  },
  {
    title: "Wonderla Theme Park",
    imageUrl: "/images/reward1.jpg",
  }
];

export default function Offers() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Offers & Rewards</h1>
        <Link href="/trending" className="text-base text-purple-600 hover:underline">
          View All
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {trendingItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-80">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-fit w-full"
              />
            </div>
           
          </div>
        ))}
      </div>
    </section>
  );
}
