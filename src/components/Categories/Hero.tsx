// "use client";
 
// import Image from "next/image";

// import React from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Autoplay, Pagination } from 'swiper/modules';
// export const movies = [
//   {
//     title: "Titanic",
//     description: `A 17-year-old aristocrat falls in love with a kind but poor artist aboard the unsinkable Titanic. When the ship collides with an iceberg, the young lovers' journey is transformed into a breathtaking race for survival. Winner of 11 Academy Awards.`,
//     imageUrl: "/images/hero.jfif",
//     subtitles: true,
//     watched: true,
//     year: 1997,
//     ageRating: "14+",
//     duration: "195 mins",
//     genre: "Romance Movie",
//     cast: ["Kate Winslet", "Leonardo DiCaprio", "Billy Zane"]
//   },
//   {
//     title: "Inception",
//     description: `A skilled thief is given a chance at redemption if he can successfully perform an impossible heist: planting an idea into a target's subconscious.`,
//     imageUrl: "/images/inception.jpg",
//     subtitles: true,
//     watched: false,
//     year: 2010,
//     ageRating: "13+",
//     duration: "148 mins",
//     genre: "Action / Sci-Fi",
//     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
//   },
//   {
//     title: "The Lion King",
//     description: `After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.`,
//     imageUrl: "/images/lion-king.jpg",
//     subtitles: true,
//     watched: true,
//     year: 1994,
//     ageRating: "PG",
//     duration: "88 mins",
//     genre: "Animation / Drama",
//     cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
//   },
//   {
//     title: "Interstellar",
//     description: `A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on another planet.`,
//     imageUrl: "/images/interstellar.jpg",
//     subtitles: true,
//     watched: false,
//     year: 2014,
//     ageRating: "13+",
//     duration: "169 mins",
//     genre: "Sci-Fi / Adventure",
//     cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
//   },
//   {
//     title: "Avengers: Endgame",
//     description: `After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.`,
//     imageUrl: "/images/endgame.jpg",
//     subtitles: true,
//     watched: true,
//     year: 2019,
//     ageRating: "13+",
//     duration: "181 mins",
//     genre: "Action / Superhero",
//     cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"]
//   }
// ];

// export default function TitanicHero() {

//   return (
//      <Swiper
//         centeredSlides
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//  modules={[Autoplay,Pagination]}
//         className="mySwiper rounded-lg overflow-hidden h-full"
//       >
// <section className="relative w-full h-[60vh] text-white overflow-hidden">

//       {/* Background Image */}
// <Image

//         src="/images/hero.jfif"

//         alt="Titanic"

//         fill

//         className="inset-0 w-full h-full object-cover z-0"

//       />
 
//       {/* Gradient Overlay: Light to Dark from Left */}
// <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
 
//       {/* Content */}
// <div className="relative z-20 mx-auto h-full flex flex-col justify-end p-8 px-6">
// <h1 className="text-5xl font-bold mb-4">TITANIC</h1>
// <p className="text-lg max-w-2xl mb-6">

//           A 17-year-old aristocrat falls in love with a kind but poor artist aboard the unsinkable Titanic. When the ship collides with an iceberg, the young lovers' journey is transformed into a breathtaking race for survival. Winner of 11 Academy Awards.
// </p>
 
//         {/* CTA Button */}
// <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-fit">

//           Start Watching
// </button>
 
//         {/* Movie Info */}
// <div className="flex items-center gap-4 text-sm text-gray-300 mt-6 flex-wrap">
// <span className="border px-2 py-0.5 border-gray-400 rounded">SUBTITLES</span>
// <span className="border px-2 py-0.5 border-gray-400 rounded">WATCHED</span>
// <span>1997</span>
// <span>14+</span>
// <span>195 mins</span>
// <span>Romance Movie</span>
// <span>

//             Cast:{" "}
// <span className="text-white font-medium">

//               Kate Winslet, Leonardo DiCaprio, Billy Zane
// </span>
// </span>
// </div>
// </div>
// </section>
// </Swiper>

//   );

// }

 
"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
// Dummy movie data

export default function TitanicHero({event}) {



  return (
    <Swiper
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}

      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="rounded-lg overflow-hidden h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-full"
    >
      {event?.map((movie, index) => {
       
        const displaySlug =
          movie.event_slug ||
          (movie.event_title
            ? movie.event_title.toLowerCase().replace(/\s+/g, "-")
            : "unknown-event");
        return(
        <SwiperSlide key={index}>
          <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] text-white overflow-hidden">
            {/* Background Image */}
            <Image
              src={movie.banner_image}
              alt={movie.event_title}
              fill
              className="inset-0 w-full h-full object-cover z-0"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-20 mx-auto h-full flex flex-col justify-end items-start p-4 sm:p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">{movie.event_title}</h1>
              <p className="text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mb-4 sm:mb-5 md:mb-6 text-left line-clamp-3 sm:line-clamp-none">{movie.extra_data.description}</p>

              {/* CTA Button */}
             <Link
  href={`/event/${displaySlug}?event=${displaySlug}`}
  className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded pointer-events-auto w-fit flex items-center justify-center h-8"
>
  BOOK NOW
</Link>

              {/* Movie Info */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-300 mt-3 sm:mt-4 md:mt-6 flex-wrap">
                <span>{movie.year}</span>
                <span>{movie.extra_data.ageRestriction}</span>
                <span>{movie.duration}</span>
                <span className="hidden sm:inline">{movie.hash_tags}</span>
              </div>
            </div>
          </section>
        </SwiperSlide>)
})}
    </Swiper>
  );
}
