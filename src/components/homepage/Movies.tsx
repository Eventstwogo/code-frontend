// 'use client';

// import Link from "next/link";
// import MovieCard from "../movies";

// export default function MovieGridPage() {
//   // ✅ The data lives here with the parent
//   const movies = [
//     {
//       title: "The Dark Knight",
//       image: "/images/movie1.jfif",
//       duration: 120,
//     },
//     {
//       title: "Inception",
//       image: "/images/movie2.jfif",
//       duration: 152,
//     },
//     {
//       title: "Interstellar",
//       image: "/images/movie3.jfif",
//       duration: 148,
//     },
//     {
//       title: "Tenet",
//       image: "/images/movie4.jfif",
//       duration: 169,
//     },
//     {
//       title: "oppenhiemer",
//       image: "/images/movie5.jfif",
//       duration: 150,
//     },
//   ];

//   return (
//     <section className="max-w-6xl mx-auto py-20 mt-10 mb-10 px-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-900">Movies</h2>
//         <Link
//           href="/trending"
//           className="text-base text-purple-600 hover:underline"
//         >
//           View All
//         </Link>
//       </div>

//      <div
//   className="
//     flex gap-4 overflow-x-auto
//     sm:flex-nowrap
//     md:flex-nowrap
//     lg:grid lg:grid-cols-4 xl:grid-cols-5
//     scrollbar-hide px-1 pb-6
//  "
//    style={{
//     scrollbarColor: '#a855f7 #e5e7eb', // Optional: custom scrollbar color
//     scrollbarWidth: 'auto',            // Optional: for Firefox
//   }}
// >
//   {movies.map((movie, index) => (
//     <div
//       key={index}
//      className="
//     flex-shrink-0
//     min-w-[220px]
//     h-[320px]
//     lg:min-w-0 lg:h-auto
//     rounded-lg
//     overflow-hidden
//   "
//     >
//       <MovieCard
//         title={movie.title}
//         image={movie.image}
//         duration={movie.duration}
//       />
//     </div>
//   ))}
// </div>


//     </section>
//   );
// }


'use client';

import { useRef, useEffect, useState } from 'react';
import MovieCard from "../movies";

export default function MovieGridPage() {
  const movies = [
    { title: "The Dark Knight", image: "/images/movie1.jfif", duration: 120 },
    { title: "Inception", image: "/images/movie2.jfif", duration: 152 },
    { title: "Interstellar", image: "/images/movie3.jfif", duration: 148 },
    { title: "Tenet", image: "/images/movie4.jfif", duration: 169 },
    { title: "Oppenheimer", image: "/images/movie5.jfif", duration: 150 },
  ];

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
        <h2 className="text-2xl font-bold text-gray-900">Movies</h2>
        <a href="/trending" className="text-base text-purple-600 hover:underline">
          View All
        </a>
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
