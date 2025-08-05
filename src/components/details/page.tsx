"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useStore from "@/lib/Zustand";

export default function MovieDetails({event, selectedDate}) {
  console.log(selectedDate);
  console.log(event)
  const [activeTab, setActiveTab] = useState("Synopsis");
  const router = useRouter();
  const { userId } = useStore();

  const tabs = ["Synopsis"];

  const handleBookTickets = () => {
    if (userId) {
      // User is authenticated, navigate to book now page with selected date
      const dateParam = selectedDate ? `?date=${getFormattedDate(selectedDate)}&&slug_id=${event?.slot_id || ''}` : '';
      router.push(`/book/${event?.event_slug || ''}${dateParam}`);
    } else {
      // User is not authenticated, navigate to login page
      router.push('/login');
    }
  };

  const getFormattedDate = (dateItem) => {
    if (!dateItem || !event) return '';
    
    // Get the current year and month from event start date
    const eventDate = new Date(event?.start_date || new Date());
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    
    // Create date with selected day
    const selectedDateObj = new Date(year, month, parseInt(dateItem.date));
    selectedDateObj.setDate(selectedDateObj.getDate() + 1)
    return selectedDateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
  };


  return (
    <section className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Event Details</h2>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-8 border-b mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-medium text-black overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "hover:text-black text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Synopsis" && (
          <>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
             {event?.extra_data?.description}
            </p>

            {/* Info */}
            <div className="mb-6 space-y-2 sm:space-y-3">
              {event?.extra_data?.ageRestriction && (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-medium text-gray-800">Age Restriction:</span>
                  <span className="text-sm sm:text-base text-gray-600">{event?.extra_data?.ageRestriction}</span>
                </div>
              )}
              {event?.extra_data?.language && (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-medium text-gray-800">Language:</span>
                  <span className="text-sm sm:text-base text-gray-600">{event?.extra_data?.language}</span>
                </div>
              )}
              {event?.hash_tags && (
                <div className="flex items-start gap-2">
                  <span className="text-sm sm:text-base font-medium text-gray-800">Tags:</span>
                  <span className="text-sm sm:text-base text-gray-600">{event?.hash_tags}</span>
                </div>
              )}
            </div>

            {/* Cast Grid - Hidden for now as no cast data */}
            {/* <h3 className="font-semibold mb-2 text-lg sm:text-xl">Cast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
             
            </div> */}
          </>
        )}
      </div>

      {/* Right Sidebar Card */}
      <aside className="w-full lg:w-[350px] xl:w-[400px] lg:self-start">
        <div className="bg-white shadow-lg border rounded-lg p-4 sm:p-6 sticky top-4">
          <div className="mb-6">
            <h4 className="font-bold text-xl sm:text-2xl mb-2 text-gray-900">{event?.event_title || 'Event Title'}</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <BsCalendar2EventFill className="text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Event Dates</p>
                  <p className="text-sm text-gray-600">{event?.start_date || 'TBD'} to {event?.end_date || 'TBD'}</p>
                </div>
              </div>
              
              {event?.extra_data?.address && (
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Location</p>
                    <p className="text-sm text-gray-600">{event?.extra_data?.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Description */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
               {event?.extra_data?.description}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={handleBookTickets}
            className="w-full bg-purple-500 text-white py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg"
          >
            BOOK TICKETS
          </button>
        </div>
      </aside>
    </section>
  );
}
