

'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules'; // removed Navigation since you want no arrows
import { useRouter } from 'next/navigation';
export default function HeroSection({ movies }) {
  const router=useRouter()

 const handleBookNowClick = (movie, e) => {
  e.stopPropagation();

  const displaySlug = movie.event_slug || (
    movie.event_title ? movie.event_title.toLowerCase().replace(/\s+/g, '-') : "unknown-event"
  );

  router.push(`/event/${displaySlug}?event=${displaySlug}`);
};

  return (
    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto px-2 sm:px-4 md:px-6">
      <Swiper
slidesPerView='auto'
        
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
          spaceBetween={30}
        modules={[Autoplay,Pagination]}
        className="mySwiper rounded-lg overflow-hidden h-full"
      >
        {movies?.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full mx-auto rounded-lg overflow-hidden shadow-lg">
              {/* Background Image */}
              <Image
                src={movie.banner_image}
                alt={movie.event_title}
                fill
                className="object-cover h-full bg-black"
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 p-3 sm:p-4 md:p-6 text-white text-left">
                {movie.isOnSale && (
                  <span className="inline-block bg-red-600 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded uppercase text-start mb-2">
                    Tickets on sale
                  </span>
                )}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-start line-clamp-2">
                  {movie.event_title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {movie.description}
                </p> 
                <button 
                  className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded transition-colors duration-200" 
                  onClick={(e) => handleBookNowClick(movie,e)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
