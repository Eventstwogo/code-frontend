"use client";
import React, { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";

const movies = [
  {
    title: "Titanic",
    image: "/images/titanic-poster.jpg",
    trailer: "https://ww7.vcdnlare.com/v/KdKmR5YJ3MvOyJ2?sid=6229&t=hls",
  },
  {
    title: "Batman",
    image: "/images/batman.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    title: "ms dhoni",
    image: "/images/dhoni.jpg",
    trailer: "https://www.youtube.com/embed/1NE7xmlcZPI?start=62",
  },
  {
    title: "hari hara veera mallu",
    image: "/images/pavan.jpg",
    trailer: "https://www.youtube.com/embed/Ow98GXfIyXA?start=161",
  },
  {
    title: "Inception",
    image: "/images/inception.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    title: "Oppenheimer",
    image: "/images/oppenheimer.jpg",
    trailer: "https://www.youtube.com/embed/bK6ldnjE3Y0",
  },
   {
    title: "Inception",
    image: "/images/inception.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
];

interface MovieTrailerSectionProps {
  images: any[];
}

export default function MovieTrailerSection({images}: MovieTrailerSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);



  return (
    <section className="text-purple-500 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold">Related Images</h2>
      </div>

      {/* Cards */}
      {images && images.length > 0 ? (
        <>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 lg:gap-6 scroll-smooth pb-4 sm:pb-6 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100"
          >
            {images?.map((imageUrl: any, index: number) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[180px] sm:w-[220px] lg:w-[250px] h-[240px] sm:h-[300px] lg:h-[360px] rounded-lg lg:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <img
                  src={imageUrl}
                  alt={`Event image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          
          {/* Scroll indicator for mobile */}
          {images.length > 2 && (
            <p className="text-xs text-gray-500 mt-2 sm:hidden text-center">
              ← Scroll to see more images →
            </p>
          )}
        </>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-base sm:text-lg">No images available for this event</p>
        </div>
      )}

      {/* Modal */}
      {activeTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl aspect-video relative">
            <iframe
              width="100%"
              height="100%"
              src={activeTrailer}
              title="Movie Trailer"
              className="rounded-lg lg:rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setActiveTrailer(null)}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-white bg-red-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base hover:bg-red-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      
    </section>
  );
}
