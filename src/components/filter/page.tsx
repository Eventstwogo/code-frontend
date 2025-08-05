"use client";

import { FaFilter } from "react-icons/fa";
import React, { useState } from "react";

type DateItem = {
  day: string;
  date: string;
 
};

type MovieDateSelectorProps = {
  dates: DateItem[];
  filters?: string[];
  onDateSelect?: (selectedDate: DateItem, index: number) => void;
  onWatchNow?: () => void;
};

export default function MovieDateSelector({
  dates,
  filters = ["After 5 PM", "Recliners"],
  onDateSelect,
  onWatchNow,
}: MovieDateSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDateClick = (date: DateItem, index: number) => {
    setSelectedIndex(index);
    if (onDateSelect) {
      onDateSelect(date, index);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white shadow-md rounded-md">
      {/* Date Selector */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Date</h3>
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDateClick(d, i)}
              className={`flex flex-col items-center justify-center min-w-[48px] sm:min-w-[56px] h-14 sm:h-16 rounded-md focus:outline-none transition-all duration-200 flex-shrink-0 ${
                selectedIndex === i
                  ? "bg-purple-500 text-white shadow-lg"
                  : "text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span className="text-sm sm:text-lg font-bold">{d.date}</span>
              <span className="text-xs sm:text-sm">{d.day}</span>
            </button>
          ))}
        </div>
        
        {/* Scroll indicator for mobile */}
        {dates.length > 5 && (
          <p className="text-xs text-gray-500 mt-2 sm:hidden">
            ← Scroll to see more dates →
          </p>
        )}
      </div>
    </div>
  );
}
