"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";

export default function MovieDetails({event}) {
  console.log(event)
  const [activeTab, setActiveTab] = useState("Synopsis");

  const tabs = ["Synopsis"];


  return (
    <section className="flex flex-col md:flex-row gap-6 px-6 py-10">
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-4">Movie details</h2>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-4 text-2xl font-medium text-black ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Synopsis" && (
          <>
            <p className="text-2xl text-gray-700 mb-4 max-w-3xl">
             {event.extra_data.description}
            </p>

            {/* Info */}
            <ul className="text-xl text-gray-600 mb-6 space-y-2">
              <li>{event.extra_data.ageRestriction}</li>
              <li>{event.extra_data.language}</li>
              <li>{event.hash_tags}</li>
            </ul>

            {/* Cast Grid */}
            <h3 className="font-semibold mb-2 text-xl">Cast</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
             
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar Card - Full height */}
      <aside className="w-full md:w-[400px] self-stretch">
        <div className="bg-white shadow-md border rounded-md p-4 h-full flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-2xl mb-1">{event.event_title}</h4>
            <p className="text-xl text-gray-600 mb-3"></p>
            <p className="text-lg text-gray-600 flex items-center gap-2 mb-1">
              <BsCalendar2EventFill className="text-gray-500" />
              21 Jun – 29 Jun | 1 PM onwards
            </p>
            <p className="text-lg text-gray-600 flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-gray-500" />
             {event.extra_data.address}
            </p>
            <div className="text-base font-medium mb-4">
              Starts from <span className="text-black font-bold">₹899</span>
            </div>

            {/* Additional Description */}
            <p className="text-sm text-gray-700 mb-4">
             {event.extra_data.description}
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-purple-500 text-white py-3 rounded-md text-sm font-semibold mt-auto">
            BOOK TICKETS
          </button>
        </div>
      </aside>
    </section>
  );
}
