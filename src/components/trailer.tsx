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

export default function MovieTrailerSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = dir === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className=" text-purple-500 py-10 px-6 md:px-12">
      {/* Header & Arrows */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">ICONIC SCENES</h2>
        <div className="flex gap-2">
          
          
        </div>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth pb-6"
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[250px] h-[360px] rounded-xl overflow-hidden shadow-xl group"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex items-center justify-center">
              <button
                onClick={() => setActiveTrailer(movie.trailer)}
                className="flex items-center gap-2 bg-purple-600 text-white text-sm px-4 py-2 rounded-full hover:bg-yellow-500 transition"
              >
                <FaPlay className="text-xs" /> Play Trailer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeTrailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video relative">
            <iframe
              width="100%"
              height="100%"
              src={activeTrailer}
              title="Movie Trailer"
              className="rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setActiveTrailer(null)}
              className="absolute -top-4 -right-4 text-white bg-red-600 px-3 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <button className="bg-purple-500 px-6 py-2 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
          Explore All Movies!
        </button>
      </div>
    </section>
  );
}
