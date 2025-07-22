'use client';

import { useRef, useEffect, useState } from 'react';
import MovieCard from "../movies";
import Link from "next/link";
export default function MovieGridPage({movies,categoryName}) {


  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const overflowing = el.scrollWidth > el.clientWidth;
      setIsOverflowing(overflowing);

      if (overflowing) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        setScrollProgress((el.scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    checkOverflow();

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    };

    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkOverflow);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-20 mt-10 mb-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{categoryName}</h2>
        <Link href="/trending" className="text-base text-purple-600 hover:underline">
          View All
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto
          px-1 pb-6
          lg:grid lg:grid-cols-4 xl:grid-cols-5
          scrollbar-thin  scrollbar-track-gray-200
        "
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="
              flex-shrink-0 min-w-[220px] h-[320px]
              lg:min-w-0 lg:h-auto
              rounded-lg overflow-hidden
            "
          >
            <MovieCard {...movie} />
          </div>
        ))}
      </div>

   
    </section>
  );
}
