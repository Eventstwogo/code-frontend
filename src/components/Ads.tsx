'use client';

import React from 'react';

export default function Horizantalcard({ image }) {
  return (
    <div className=" flex items-center justify-center px-4 ">
      <div className="snap-start max-w-6xl w-full h-30 rounded-xl relative  shadow-lg overflow-hidden">
        
        {/* Optional Background Image */}
        {image && (
          <img
            src='/images/ads.png'
            alt="Advertisement"
            className="absolute inset-0 w-full h-full object-fit "
          />
        )}

        {/* Text Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
            Advertisement
          </h2>
        </div>
      </div>
    </div>
  );
}
