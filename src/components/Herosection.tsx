"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface HeroSectionProps {
  movies: any[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const handleBookNowClick = (movie: any, e: any) => {
    e.stopPropagation();

    const displaySlug =
      movie.event_slug ||
      (movie.event_title
        ? movie.event_title.toLowerCase().replace(/\s+/g, "-")
        : "unknown-event");

    router.push(`/event/${displaySlug}?event=${displaySlug}`);
  };

  const goToPrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const goToNext = () => {
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {movies.map((movie: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Individual slide background image - Blurred */}
              <div className="absolute inset-0">
                <Image
                  src={movie.card_image}
                  alt={`${movie.event_title} background`}
                  fill
                  className="object-cover blur-xl scale-110"
                  priority={index === 0}
                />
                {/* Overlay for better contrast */}
                <div className="absolute inset-0 bg-white/30" />
                {/* Additional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-white/90" />
              </div>
              <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full">
                <div className="flex items-center h-full py-4 sm:py-6 md:py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-20 items-center w-full">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1 relative z-10">
                      <div className="space-y-3 sm:space-y-4 md:space-y-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight drop-shadow-sm">
                          {movie.event_title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
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
                        </div>

                        {movie.description && (
                          <p className="text-gray-700 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 font-medium drop-shadow-sm">
                            {movie.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 sm:pt-6">
                        <button
                          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm sm:text-base md:text-lg cursor-pointer"
                          onClick={(e) => handleBookNowClick(movie, e)}
                        >
                          View details
                        </button>
                      </div>
                    </div>

                    {/* Right Image - Smaller Size */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] xl:max-w-[280px]">
                        <div className="aspect-[5/6] sm:aspect-[4/5] relative rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl lg:shadow-2xl bg-gray-100">
                          <Image
                            src={movie.card_image || "/images/placeholder.svg"}
                            alt={movie.event_title || "Event image"}
                            fill
                            className="object-cover object-center transition-opacity duration-300"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            sizes="(max-width: 320px) 180px, (max-width: 360px) 180px, (max-width: 475px) 140px, (max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, (max-width: 1280px) 240px, 280px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder.svg";
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
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-black hover:text-gray-300 p-2 sm:p-3 transition-all duration-300 hover:scale-110"
          >
            <IoChevronBack className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-black hover:text-gray-300 p-2 sm:p-3 transition-all duration-300 hover:scale-110"
          >
            <IoChevronForward className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>
        </>
      )}

      {/* Dots Pagination */}
      {/* {movies.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5 sm:space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`  rounded-full transition-all duration-300 w-[10px] h-[10px]  ${
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
