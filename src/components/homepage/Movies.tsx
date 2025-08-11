'use client';

import { useRef, useEffect, useState } from 'react';
import MovieCard from "../movies";
import Link from "next/link";
interface MovieGridPageProps {
  movies: any[];
  categoryName: string;
  slug: string;
}

export default function MovieGridPage({movies, categoryName, slug}: MovieGridPageProps) {


  const scrollRef = useRef<HTMLDivElement>(null);
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
    <section className="w-full max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {categoryName}
        </h2>
        <Link 
          href={`/${slug}`} 
          className="text-base text-purple-600 hover:underline whitespace-nowrap"
        >
          View All
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 movie-grid-scroll"
      >
        {movies.map((movie: any, index: number) => (
          <div
            key={index}
            className="flex-shrink-0"
          >
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
