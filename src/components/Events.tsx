'use client';

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
export default function Page({event}) {
  // 1️⃣ Events Data
  const events = [
    {
      name: 'Live Music Night',
      image: '/images/events2.jfif',
      location: 'Hitech City, Hyderabad',
      price: '999/-',
    },
    {
      name: 'Food Carnival',
      image: '/images/events1.jfif',
      location: 'Banjara Hills',
      price: '799/-',
    },
    {
      name: 'Tech Expo',
      image: '/images/events3.jfif',
      location: 'Madhapur',
      price: 'Free',
    },
  
  ];

  // 2️⃣ Like State
  const [likedEvents, setLikedEvents] = useState(
    Array(events.length).fill(false)
  );

  const toggleLike = (index) => {
    const updated = [...likedEvents];
    updated[index] = !updated[index];
    setLikedEvents(updated);
  };

  // 3️⃣ Inline EventCard Component
  const EventCard = ({ event_title, card_image, extra_data, price, isLiked, onLike }) => (
    <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-200 flex-shrink-0">
      {/* Banner Image */}
      <div className="relative">
        <img
          src={card_image}
          alt={event_title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-4 text-sm font-bold">
        <p className="font-semibold flex items-center justify-between">
          <span className="text-black">{event_title}</span>
          <button
            onClick={onLike}
            className={`text-lg hover:scale-110 transition ${isLiked ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <FaHeart />
          </button>
        </p>

        <p className="text-sm font-semibold mt-1">
          <span className="text-black">LOCATION:</span>{' '}
          <span className="text-gray-800">{extra_data.address}</span>
        </p>


        <div className="flex gap-2 mt-4">
          <button className="flex-1 text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-100 transition">
            ADD TO LIST
          </button>
          <button className="flex-1 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );

  // 4️⃣ Render Page
  return (
    <div className="pt-16 max-w-6xl mx-auto my-20 py-20 px-4">
    <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Events&Festival</h1>
        <Link href="/events" className="text-base text-purple-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="grid md:grid-cols-3  grid-cols-1 gap-6 snap-x snap-mandatory scroll-smooth">
        {event.map((event, index) => (
          <EventCard
            key={index}
            {...event}
            isLiked={likedEvents[index]}
            onLike={() => toggleLike(index)}
          />
        ))}
      </div>
    </div>
  );
}
