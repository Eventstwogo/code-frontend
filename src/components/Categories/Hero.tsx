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
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface TitanicHeroProps {
  event: any[];
}

export default function TitanicHero({event}: TitanicHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const goToPrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const goToNext = () => {
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  if (!event || event.length === 0) {
    return (
      <div className="w-full h-[45vh] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] overflow-hidden">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
      
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
          speed={800}  
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {event?.map((movie: any, index: number) => {
          const displaySlug =
            movie.event_slug ||
            (movie.event_title
              ? movie.event_title.toLowerCase().replace(/\s+/g, "-")
              : "unknown-event");
          
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Individual slide background image - Blurred */}
                <div className="absolute inset-0">
                  <Image
                    src={movie.banner_image}
                    alt={`${movie.event_title} background`}
                    fill
                    className="object-cover blur-xl scale-110"
                    priority={index === 0}
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-white/20" />
                  {/* Additional gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/90" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full">
                  <div className="flex items-center h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-20 items-center w-full">
                      
                      {/* Left Content */}
                      <div className="text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 relative z-10">
                        <div className="space-y-3 sm:space-y-4 md:space-y-6">
                          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                            {movie.event_title}
                          </h1>
                          
                          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                            {movie.category_name && (
                              <span className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                {movie.category_name}
                              </span>
                            )}
                            {movie.subcategory_name && (
                              <span className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                {movie.subcategory_name}
                              </span>
                            )}
                            {movie.event_date && (
                              <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                {new Date(movie.event_date).toLocaleDateString()}
                              </span>
                            )}
                            {movie.extra_data?.ageRestriction && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                {movie.extra_data.ageRestriction}
                              </span>
                            )}
                          </div>

                          {movie.extra_data?.description && (
                            <p className="text-gray-600 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 font-bold">
                              {movie.extra_data.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 sm:pt-6">
                          <Link
                            href={`/event/${displaySlug}?event=${displaySlug}`}
                            className="bg-black hover:bg-gray-800 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-sm sm:text-base md:text-lg"
                          >
                  View details
                          </Link>
                        </div>
                      </div>

                      {/* Right Image - Smaller Size */}
                      <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">
                          <div className="aspect-[3/4] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                            <Image
                              src={movie.card_image}
                              alt={movie.event_title}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                            {/* Subtle overlay for better image quality */}
                            <div className="absolute inset-0 bg-black/5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows */}
      {event.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <IoChevronBack className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <IoChevronForward className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Dots Pagination */}
      {/* {event.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5 sm:space-x-2">
          {event.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
