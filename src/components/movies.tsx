'use client';

import { useState } from "react";
import { FaClock, FaHeart } from "react-icons/fa";

export default function MovieCard({ title, image, duration }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded-t-xl"
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
