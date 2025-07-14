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
    <div className="flex items-center justify-between px-6 py-8 bg-white shadow-md rounded-md">
      {/* Left Side - Date and Filters */}
      <div className="flex items-center gap-6 flex-wrap">
        {/* Date Selector */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDateClick(d, i)}
              className={`flex flex-col items-center justify-center w-12 h-16 rounded-md focus:outline-none transition-all duration-200 ${
                selectedIndex === i
                  ? "bg-purple-500 text-white"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              
              <span className="text-lg font-bold">{d.date}</span>
              <span className="text-sm">{d.day}</span>
            </button>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 ml-4 flex-wrap">
          <button className="flex items-center gap-1 px-3 py-1 border border-2 border-purple-500 rounded-md text-sm">
            <FaFilter className="text-xs" />
            Filters
          </button>
          {filters.map((filter, index) => (
            <button
              key={index}
              className="px-3 py-1 border border-2 border-purple-500 rounded-md text-sm"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - Watch Now Button */}
      <div>
        <button
          onClick={onWatchNow}
          className="bg-purple-500 text-white px-5 py-2 rounded-md text-sm font-semibold"
        >
          WATCH NOW
        </button>
      </div>
    </div>
  );
}
