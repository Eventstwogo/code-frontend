'use client';

import Image from 'next/image';
import Link from 'next/link';
// data/trendingItems.ts
export const trendingItems = [
  {
    title: "Titanic",
    imageUrl: "/images/hero.jfif",
  },
  {
    title: "Perth's International Summer",
    imageUrl: "/images/trending2.png",
  },
  {
    title: "Family Fun Day",
    imageUrl: "/images/trending3.png",
  },
  {
    title: "Premier League Live",
    imageUrl: "/images/trending 4.png",
  },
  {
    title: "Wonderla Theme Park",
    imageUrl: "/images/trending 5.png",
  },
  {
    title: "Afterparties by Night",
    imageUrl: "/images/trending 6.png",
  },
];

export default function TrendingNow() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 mb-14">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Trending Now</h1>
        <Link href="/trending" className="text-base text-purple-600 hover:underline">
          View All
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {trendingItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
           
          </div>
        ))}
      </div>
    </section>
  );
}
