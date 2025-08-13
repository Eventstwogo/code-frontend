// "use client";

// import Image from "next/image";
// import React from "react";

// type MovieHeroProps = {
//   title: string;
//   runtime: string;
//   releaseDate: string;
//   description: string;
//   poster: string;
//   backgroundImage: string;
//   statusTag?: string;
// };

// export default function MovieHero({
//   title,
//   runtime,
//   releaseDate,
//   description,
//   poster,
//   backgroundImage,
//   statusTag = "NOW SHOWING",
// }: MovieHeroProps) {
//   return (
//     <section className="relative w-full h-[500px] text-white">
//       {/* Background Image */}
//       <Image
//         src={backgroundImage}
//         alt={`${title} Background`}
//         fill
//         className="object-cover z-0"
//       />

//       {/* Bottom Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

//       {/* Content */}
//       <div className="relative z-20 flex items-end h-full px-8 pb-6 gap-6">
//         {/* Movie Poster */}
//         <div className="flex-shrink-0">
//           <Image
//             src={poster}
//             alt={`${title} Poster`}
//             width={220}
//             height={280}
//             className="rounded-md shadow-lg"
//           />
//         </div>

//         {/* Info */}
//         <div>
//           {/* Badge */}
//           {statusTag && (
//             <div className="mb-1">
//               <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                 {statusTag}
//               </span>
//             </div>
//           )}

//           {/* Title */}
//           <h1 className="text-2xl md:text-8xl font-bold mb-1">{title}</h1>

//           {/* Details */}
//           <p className="text-2xl text-gray-200 mb-2">
//             {runtime} <span className="items">|</span> {releaseDate}
//           </p>

//           <p className="text-m text-gray-300 mb-4">{description}</p>

//           {/* Buttons */}
//           <div className="flex gap-4 text-sm">
//             <button className="flex items-center gap-2 px-8 py-1 border border-purple-500 rounded hover:bg-white hover:text-black transition">
//               ▶ Trailer
//             </button>
//             <button className="flex items-center gap-2 px-8 py-1 border border-purple-500 rounded hover:bg-white hover:text-black transition">
//               ♥ Watchlist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="absolute bottom-0 left-0 w-full bg-black text-white px-8 py-3 text-sm border-t border-gray-700">
//         <strong>Times & Tickets</strong>{" "}
//         <span className="text-red-400 ml-2">+ Add cinemas</span>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";

type MovieHeroProps = {
  title: string;
  runtime: string;
  releaseDate: string; // format should be like '2025-07-22'
  description: string;
  poster: string;
  backgroundImage: string;
  location?: string; // Optional location prop
};

export default function MovieHero({
  title,

  releaseDate,
  description,
  poster,
  backgroundImage,
  location
}: MovieHeroProps) {
  const statusTag = useMemo(() => {
    const today = new Date();
    const release = new Date(releaseDate);

    // Remove time for accurate comparison
    today.setHours(0, 0, 0, 0);
    release.setHours(0, 0, 0, 0);

    return release <= today ? "NOW SHOWING" : "COMING SOON";
  }, [releaseDate]);

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={`${title} Background`}
        fill
        className="object-cover z-0"
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

      {/* Content Container - ensures everything stays within bounds */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between h-full">
        {/* Main Content */}
        <div className="flex flex-col sm:flex-row items-end justify-between h-full px-4 sm:px-6 lg:px-8 pt-4 pb-16 sm:pb-20 gap-4 sm:gap-6">
          {/* Movie Poster */}
          <div className="flex-shrink-0 self-center sm:self-end">
            <Image
              src={poster}
              alt={`${title} Poster`}
              width={120}
              height={150}
              className="rounded-md shadow-lg sm:w-[140px] sm:h-[180px] lg:w-[160px] lg:h-[200px] xl:w-[180px] xl:h-[230px]"
            />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1 max-w-full">
            {/* Badge */}
            <div className="mb-1 sm:mb-2">
              <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {statusTag}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 leading-tight">{title}</h1>

            {/* Details */}
            <div className="flex items-start gap-3 mb-3">
                            <BsCalendar2EventFill className="text-purple-500 mt-1 flex-shrink-0" />
                            <div>
                             
                              <p className="text-sm text-white">{releaseDate}</p>
                            </div>
                          </div>
    {location && (
                <div className="flex items-start gap-3 mb-3">
                  <FaMapMarkerAlt className="text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                   
                    <p className="text-sm text-white">{location}</p>
                  </div>
                </div>
              )}
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-2 line-clamp-2 sm:line-clamp-3 max-w-2xl">{description}</p>

          </div>
        </div>

        {/* Bottom Bar - positioned within the section */}
        
      </div>
    </section>
  );
}
