"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";

export default function MovieDetails() {
  const [activeTab, setActiveTab] = useState("Synopsis");

  const tabs = ["Synopsis", "Cast", "Videos", "Posters"];
  const cast = [
    { name: "Nagarjuna Akkineni", image: "/images/nagarjuna.jpg" },
    { name: "Dhanush", image: "/images/dhanush.jpg" },
    { name: "Rashmika Mandanna", image: "/images/rashmika.jpg" },
    { name: "Jim Sarbh", image: "/images/jim.jpg" },
    { name: "Dalip Tahil", image: "/images/dalip.jpg" },
    { name: "Hareesh Peradi", image: "/images/hareesh.jpg" },
    { name: "Sayaji Shinde", image: "/images/sayaji.jpg" },
    { name: "Saurav Khurana", image: "/images/saurav.jpg" },
  ];

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
              The story follows a beggar, a businessman, and a government
              official whose lives collide in a gripping tale of ambition,
              greed, and moral conflict.
            </p>

            {/* Info */}
            <ul className="text-xl text-gray-600 mb-6 space-y-2">
              <li>🔞 UA13+</li>
              <li>🌐 Tamil, Telugu, Hindi, Kannada, Malayalam</li>
              <li>🎭 Drama, Crime</li>
            </ul>

            {/* Cast Grid */}
            <h3 className="font-semibold mb-2 text-xl">Cast</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {cast.map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs">{member.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar Card - Full height */}
      <aside className="w-full md:w-[400px] self-stretch">
        <div className="bg-white shadow-md border rounded-md p-4 h-full flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-2xl mb-1">TITANIC: The movie</h4>
            <p className="text-xl text-gray-600 mb-3">Movie</p>
            <p className="text-lg text-gray-600 flex items-center gap-2 mb-1">
              <BsCalendar2EventFill className="text-gray-500" />
              21 Jun – 29 Jun | 1 PM onwards
            </p>
            <p className="text-lg text-gray-600 flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-gray-500" />
              Prasadh inox, Hitechcity
            </p>
            <div className="text-base font-medium mb-4">
              Starts from <span className="text-black font-bold">₹899</span>
            </div>

            {/* Additional Description */}
            <p className="text-sm text-gray-700 mb-4">
              Experience the timeless romance and thrilling escape from disaster
              in the remastered Titanic. Reserve your seats now to witness this
              emotional cinematic journey on the big screen once again.
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
