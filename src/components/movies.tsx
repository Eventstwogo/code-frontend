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
      className="bg-white rounded-xl shadow-md overflow-hidden border cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col"
      style={{ width: '230px', height: '370px' }}
      onClick={handleCardClick}
    >
      <div className="relative" style={{ height: '250px' }}>
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between" style={{ height: '100px' }}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold hover:text-purple-600 transition-colors line-clamp-2 leading-tight flex-1 pr-2">
            {displayTitle}
          </h3>
      
        </div>

        <div className="mt-auto">
          <button 
            onClick={handleBookNowClick}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition w-full font-semibold text-sm cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
