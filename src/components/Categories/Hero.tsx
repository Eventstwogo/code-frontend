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

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  if (!event || event.length === 0) {
    return (
      <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-purple-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[70vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden hero-mobile-layout hero-xs-layout hero-xxs-layout"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Event showcase carousel"
    >
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
          pauseOnMouseEnter: true,
        }}
        speed={800}  
        loop={true}
        grabCursor={true}
        touchRatio={1}
        touchAngle={45}
        threshold={10}
        resistance={true}
        resistanceRatio={0.85}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
        breakpoints={{
          320: {
            touchRatio: 1.5,
            threshold: 5,
            resistanceRatio: 0.9,
          },
          475: {
            touchRatio: 1.3,
            threshold: 7,
            resistanceRatio: 0.87,
          },
          640: {
            touchRatio: 1,
            threshold: 10,
            resistanceRatio: 0.85,
          },
        }}
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
                    src={movie.banner_image || movie.card_image || '/images/placeholder.svg'}
                    alt={`${movie.event_title || 'Event'} background`}
                    fill
                    className="object-cover blur-xl scale-110 transition-opacity duration-500"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = movie.card_image || '/images/placeholder.svg';
                    }}
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-white/20" />
                  {/* Additional gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/90" />
                </div>
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full hero-xs-spacing hero-xxs-spacing">
                  <div className="flex items-center justify-center h-full py-4 sm:py-6 md:py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center w-full max-w-7xl hero-mobile-content hero-xs-content hero-xxs-content">
                      
                      {/* Left Content */}
                      <div className="text-center md:text-left space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 order-2 md:order-1 relative z-10">
                        <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 leading-tight px-1 sm:px-2 md:px-0 hero-xs-text hero-xxs-text">
                            {movie.event_title}
                          </h1>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 text-xs sm:text-sm text-gray-600 px-1 sm:px-2 md:px-0">
                            {movie.category_name && (
                              <span className="bg-gray-100 text-gray-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs whitespace-nowrap">
                                {movie.category_name}
                              </span>
                            )}
                            {movie.subcategory_name && (
                              <span className="bg-gray-100 text-gray-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs whitespace-nowrap">
                                {movie.subcategory_name}
                              </span>
                            )}
                            {movie.event_date && (
                              <span className="bg-blue-100 text-blue-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs whitespace-nowrap">
                                {new Date(movie.event_date).toLocaleDateString()}
                              </span>
                            )}
                            {movie.extra_data?.ageRestriction && (
                              <span className="bg-yellow-100 text-yellow-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs whitespace-nowrap">
                                {movie.extra_data.ageRestriction}
                              </span>
                            )}
                          </div>

                          {movie.extra_data?.description && (
                            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0 font-medium px-1 sm:px-2 md:px-0">
                              {movie.extra_data.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-1.5 sm:pt-2 md:pt-4 lg:pt-6">
                          <Link
                            href={`/event/${displaySlug}?event=${displaySlug}`}
                            className="bg-black hover:bg-gray-800 text-white font-semibold px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-xs sm:text-sm md:text-base lg:text-lg hero-xs-button"
                          >
                            View details
                          </Link>
                        </div>
                      </div>

                      {/* Right Image - Responsive Size */}
                      <div className="order-1 md:order-2 flex justify-center md:justify-end items-center">
                        <div className="relative w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[360px] hero-mobile-image hero-xs-image hero-xxs-image mx-auto md:mx-0">
                          <div className="aspect-[3/4] relative rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl lg:shadow-2xl bg-gray-100">
                            <Image
                              src={movie.card_image || '/images/placeholder.svg'}
                              alt={movie.event_title || 'Event image'}
                              fill
                              className="object-cover object-center transition-opacity duration-300"
                              priority={index === 0}
                              loading={index === 0 ? 'eager' : 'lazy'}
                              sizes="(max-width: 360px) 140px, (max-width: 475px) 160px, (max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, (max-width: 1280px) 260px, 300px"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder.svg';
                              }}
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
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 text-black hover:text-gray-800 p-1.5 sm:p-2 md:p-3   transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Previous slide"
          >
            <IoChevronBack className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 text-black hover:text-gray-800 p-1.5 sm:p-2 md:p-3  transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Next slide"
          >
            <IoChevronForward className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </>
      )}

      {/* Dots Pagination */}
      {event.length > 1 && event.length <= 5 && (
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-1.5 md:space-x-2">
          {event.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === activeIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
