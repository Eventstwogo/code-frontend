

'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules'; // removed Navigation since you want no arrows

export default function HeroSection({ movies }) {
  return (
    <div className="w-full h-[60vh] mx-auto">
      <Swiper
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
 modules={[Autoplay,Pagination]}
        className="mySwiper rounded-lg overflow-hidden h-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full mx-auto rounded-lg overflow-hidden shadow-lg">
              {/* Background Image */}
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                fill // full container fit
                className="object-fit h-full bg-black"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute  bottom-0 p-6 text-white text-left">
                {movie.isOnSale && (
                  <span className="inline-block bg-red-600 text-xs font-bold px-3 py-1 rounded uppercase text-start mb-2">
                    Tickets on sale
                  </span>
                )}
                <h2 className="text-2xl font-bold mb-1 text-start">{movie.title}</h2>
                <p className="text-sm mb-4">{movie.description}</p> 
                <button className="bg-red-600 hover:bg-red-700 text-xs font-bold px-4 py-2 rounded">
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
