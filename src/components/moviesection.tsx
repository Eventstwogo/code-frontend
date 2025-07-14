"use client";

import Image from "next/image";
import React from "react";

type MovieHeroProps = {
  title: string;
  runtime: string;
  releaseDate: string;
  description: string;
  poster: string;
  backgroundImage: string;
  statusTag?: string;
};

export default function MovieHero({
  title,
  runtime,
  releaseDate,
  description,
  poster,
  backgroundImage,
  statusTag = "NOW SHOWING",
}: MovieHeroProps) {
  return (
    <section className="relative w-full h-[500px] text-white">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={`${title} Background`}
        fill
        className="object-cover z-0"
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-end h-full px-8 pb-6 gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <Image
            src={poster}
            alt={`${title} Poster`}
            width={220}
            height={280}
            className="rounded-md shadow-lg"
          />
        </div>

        {/* Info */}
        <div>
          {/* Badge */}
          {statusTag && (
            <div className="mb-1">
              <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {statusTag}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-8xl font-bold mb-1">{title}</h1>

          {/* Details */}
          <p className="text-2xl text-gray-200 mb-2">
            {runtime} <span className="items">|</span> {releaseDate}
          </p>

          <p className="text-m text-gray-300 mb-4">{description}</p>

          {/* Buttons */}
          <div className="flex gap-4 text-sm">
            <button className="flex items-center gap-2 px-8 py-1 border border-purple-500 rounded hover:bg-white hover:text-black transition">
              ▶ Trailer
            </button>
            <button className="flex items-center gap-2 px-8 py-1 border border-purple-500 rounded hover:bg-white hover:text-black transition">
              ♥ Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black text-white px-8 py-3 text-sm border-t border-gray-700">
        <strong>Times & Tickets</strong>{" "}
        <span className="text-red-400 ml-2">+ Add cinemas</span>
      </div>
    </section>
  );
}
