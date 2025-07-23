'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaClock, FaHeart } from "react-icons/fa";

interface MovieCardProps {
  event_title?: string;
  card_image?: string;
  event_slug?: string;
  // Legacy props for backward compatibility
  title?: string;
  image?: string;
  duration?: number;
}

export default function MovieCard({ 
  event_title, 
  card_image, 
  event_slug,
  title,
  image,
  duration
}: MovieCardProps) {
  // Use new props if available, otherwise fall back to legacy props
  const displayTitle = event_title || title || "Unknown Event";
  const displayImage = card_image || image || "/images/default.jpg";
  const displaySlug = event_slug || (title ? title.toLowerCase().replace(/\s+/g, '-') : "unknown-event");
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    console.log('hello')
    router.push(`/event/${encodeURIComponent(displaySlug)}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    setIsLiked(!isLiked);
  };

  const handleAddToListClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking button
    // Add your add to list logic here

  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking button
    // Navigate to booking page or handle booking logic
    router.push(`/event/${displaySlug}?event=${displaySlug}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden border cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
      onClick={handleCardClick}
    >
      <img
        src={displayImage}
        alt={displayTitle}
        className="w-full h-72 object-cover rounded-t-xl"
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold hover:text-purple-600 transition-colors">
            {displayTitle}
          </h3>
          <button
            onClick={handleLikeClick}
            className={`text-lg hover:scale-110 transition ${
              isLiked ? "text-purple-600" : "text-gray-400"
            }`}
          >
            <FaHeart />
          </button>
        </div>

        <div className="flex justify-between items-center text-xs">
          <button 
            onClick={handleAddToListClick}
            className="text-purple-600 font-semibold hover:underline"
          >
            ADD TO LIST
          </button>
          <button 
            onClick={handleBookNowClick}
            className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600 transition"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
