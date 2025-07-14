"use client";
import { useState } from "react";
import { FaClock, FaHeart } from "react-icons/fa";

// MovieCard Component
function MovieCard({ title, image, duration }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden border">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover rounded-t-xl"
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold">{title}</h3>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`text-lg hover:scale-110 transition ${
              isLiked ? "text-purple-600" : "text-gray-400"
            }`}
          >
            <FaHeart />
          </button>
        </div>

        <div className="flex items-center text-xs text-gray-600 gap-1">
          <FaClock className="text-sm" />
          <span>{duration} MIN</span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <button className="text-purple-600 font-semibold hover:underline">
            ADD TO LIST
          </button>
          <button className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600 transition">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// Parent Component
export default function MovieGrid() {
  const movies = [
    {
      title: "Batman Begins",
      image: "/images/batman.jpg",
      duration: 120,
    },
    {
      title: "The Dark Knight",
      image: "/images/dark-knight.jpg",
      duration: 152,
    },
    {
      title: "Inception",
      image: "/images/inception.jpg",
      duration: 148,
    },
    {
      title: "Interstellar",
      image: "/images/interstellar.jpg",
      duration: 169,
    },
    {
      title: "Tenet",
      image: "/images/tenet.jpg",
      duration: 150,
    },
    {
      title: "Oppenheimer",
      image: "/images/oppenheimer.jpg",
      duration: 180,
    },
  ];

  return (
    <div className="  gap-6 p-6 w-full grid grid-cols-6">

      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          image={movie.image}
          duration={movie.duration}
        />
      ))}
    </div>
  );
}
