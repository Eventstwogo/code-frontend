'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaStar, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface FeaturedEvent {
  event_id?: number;
  event_title?: string;
  card_image?: string;
  banner_image?: string;
  event_slug?: string;
  event_date?: string;
  category_name?: string;
  subcategory_name?: string;
  extra_data?: {
    description?: string;
    address?: string;
    price?: string;
    rating?: number;
    duration?: string;
    ageRestriction?: string;
  };
  is_featured?: boolean;
}

interface FeaturedCardsProps {
  events: FeaturedEvent[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const FeaturedCard = ({ event }: { event: FeaturedEvent }) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const displaySlug = event.event_slug || 
    (event.event_title ? event.event_title.toLowerCase().replace(/\s+/g, '-') : 'unknown-event');

  const handleCardClick = () => {
    router.push(`/event/${encodeURIComponent(displaySlug)}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/event/${displaySlug}?event=${displaySlug}`);
  };

 

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col relative"
      style={{ width: '230px', height: '400px' }}
      onClick={handleCardClick}
    >
      {/* Featured Badge */}
      
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <FaStar className="w-3 h-3" />
          FEATURED
        </div>


      {/* Like Button */}
      

      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ height: '240px' }}>
        <Image
          src={event.banner_image || event.card_image || '/images/placeholder.svg'}
          alt={event.event_title || 'Featured Event'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.svg';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Event Info */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-300">
            {event.event_title || 'Untitled Event'}
          </h3>

          {/* Categories and Rating */}
         

          {/* Description */}
      
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-3">
          {/* Price */}
      

          {/* Buttons */}
          <div className="flex gap-3">
   
            <button 
              onClick={handleBookNowClick}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedCards({ 
  events, 
  title = "Featured Events", 
  showViewAll = true,
  viewAllLink = "/featured"
}: FeaturedCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const overflowing = el.scrollWidth > el.clientWidth;
      setIsOverflowing(overflowing);

      if (overflowing) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        setScrollProgress((el.scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    checkOverflow();

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    };

    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkOverflow);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [events]);

  if (!events || events.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No featured events available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            Discover our handpicked selection of premium events
          </p>
        </div>
      
      </div>

      {/* Cards Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {events.map((event, index) => (
            <div key={event.event_id || index} className="flex-shrink-0">
              <FeaturedCard event={event} />
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        {isOverflowing && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-1 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Mobile View All Button */}
   
    </section>
  );
}