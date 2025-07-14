'use client';

import Link from "next/link";
import MovieCard from "../movies";

export default function MovieGridPage() {
  // ✅ The data lives here with the parent
const sportsEvents = [
  {
    title: "Premier League Match",
    image: "/images/sport3.jpg",
    duration: 90,
  },
  {
    title: "NBA Finals",
    image: "/images/sport1.jfif",
    duration: 48,
  },
  {
    title: "Cricket World Cup",
    image: "/images/sport2.jpg",
    duration: 300,
  },
  {
    title: "Grand Slam Tennis",
    image: "/images/sport3.jpg",
    duration: 180,
  },
  {
    title: "Formula 1 Race",
    image: "/images/sport4.jpg",
    duration: 120,
  },
];


  return (
    <section className="max-w-6xl mx-auto py-20 my-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Sports</h2>
        <Link
          href="/trending"
          className="text-base text-purple-600 hover:underline"
        >
          View All
        </Link>
      </div>

   <div
  className="
    flex gap-4 overflow-x-auto
    sm:flex-nowrap
    md:flex-nowrap
    lg:grid lg:grid-cols-4 xl:grid-cols-5
    scrollbar-hide
    px-1 pb-6
     scrollbar-thin  scrollbar-track-gray-200
  "
    
>
  {sportsEvents.map((event, index) => (
  <div
  key={index}
  className="
    flex-shrink-0
    min-w-[220px]
    h-[320px]
    lg:min-w-0 lg:h-auto
    rounded-lg
    overflow-hidden
  "
>
      <MovieCard
        title={event.title}
        image={event.image}
        duration={event.duration}
      />
    </div>
  ))}
</div>

    </section>
  );
}
